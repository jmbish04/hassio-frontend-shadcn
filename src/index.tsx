import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';

// HTML template for serving the React app
const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hassio Frontend</title>
  <link rel="stylesheet" href="/globals.css" />
</head>
<body class="bg-background text-foreground">
  <div id="root">__SSR_CONTENT__</div>
  <script>
    // Client-side hydration would go here in a full implementation
    console.log('Hassio Frontend Loaded');
  </script>
</body>
</html>`;

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const url = new URL(request.url);
		
		// Serve static assets
		if (url.pathname === '/globals.css') {
			try {
				// Try to serve from assets first
				if (env.ASSETS) {
					const cssContent = await env.ASSETS.fetch(request);
					if (cssContent.ok) {
						return cssContent;
					}
				}
			} catch (error) {
				console.log('Assets not available, serving fallback CSS');
			}
			// Always serve fallback CSS if assets fail or not available
			return new Response(css, {
				headers: { 'content-type': 'text/css' },
			});
		}
		
		// Handle API routes for chatbot
		if (url.pathname.startsWith('/api/')) {
			return handleApi(request, env);
		}
		
		// Serve the React app for all other routes
		try {
			const appHTML = renderToString(<App path={url.pathname} />);
			const responseHTML = html.replace('__SSR_CONTENT__', appHTML);
			
			return new Response(responseHTML, {
				headers: {
					'content-type': 'text/html;charset=UTF-8',
				},
			});
		} catch (error) {
			console.error('SSR Error:', error);
			return new Response('Internal Server Error', { status: 500 });
		}
	},
} satisfies ExportedHandler<Env>;

async function handleApi(request: Request, env: Env): Promise<Response> {
	const url = new URL(request.url);
	
	// Handle chat completion endpoint
	if (url.pathname === '/api/chat/completions' && request.method === 'POST') {
		try {
			const body = await request.json<{ messages: { role: string, content: string }[] }>();
			const messages = body.messages || [];
			
			// Use Cloudflare AI for chat completions
			const response = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
				messages,
			});
			
			return Response.json({
				choices: [{
					message: {
						role: 'assistant',
						content: response.response,
					},
				}],
			});
		} catch (error) {
			console.error('API Error:', error);
			return Response.json({ error: 'Internal Server Error' }, { status: 500 });
		}
	}
	
	return new Response('Not Found', { status: 404 });
}

// Fallback CSS for development - includes essential Tailwind classes
const css = `
/* Basic Tailwind-like reset and utilities */
*, ::before, ::after { 
  box-sizing: border-box; 
  border-width: 0; 
  border-style: solid; 
  border-color: #e5e7eb; 
}
html { 
  line-height: 1.5; 
  -webkit-text-size-adjust: 100%; 
  tab-size: 4; 
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif; 
}
body { 
  margin: 0; 
  line-height: inherit; 
  background: hsl(0 0% 100%);
  color: hsl(222.2 84% 4.9%);
}

/* Utility Classes */
.min-h-screen { min-height: 100vh; }
.bg-background { background-color: hsl(0 0% 100%); }
.bg-card { background-color: hsl(0 0% 100%); }
.text-foreground { color: hsl(222.2 84% 4.9%); }
.text-muted-foreground { color: hsl(215.4 16.3% 46.9%); }
.text-primary-foreground { color: hsl(210 40% 98%); }
.bg-primary { background-color: hsl(221.2 83.2% 53.3%); }
.border-border { border-color: hsl(214.3 31.8% 91.4%); }
.flex { display: flex; }
.flex-col { flex-direction: column; }
.flex-1 { flex: 1 1 0%; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }
.w-70 { width: 17.5rem; }
.w-full { width: 100%; }
.h-screen { height: 100vh; }
.border-r { border-right-width: 1px; }
.border-b { border-bottom-width: 1px; }
.border-t { border-top-width: 1px; }
.border { border-width: 1px; }
.shadow-sm { box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05); }
.rounded-lg { border-radius: 0.5rem; }
.rounded-2xl { border-radius: 1rem; }
.p-3 { padding: 0.75rem; }
.p-6 { padding: 1.5rem; }
.p-8 { padding: 2rem; }
.px-4 { padding-left: 1rem; padding-right: 1rem; }
.py-6 { padding-top: 1.5rem; padding-bottom: 1.5rem; }
.py-12 { padding-top: 3rem; padding-bottom: 3rem; }
.mb-0 { margin-bottom: 0px; }
.mb-1 { margin-bottom: 0.25rem; }
.mb-2 { margin-bottom: 0.5rem; }
.mb-3 { margin-bottom: 0.75rem; }
.mb-4 { margin-bottom: 1rem; }
.mb-12 { margin-bottom: 3rem; }
.mr-3 { margin-right: 0.75rem; }
.mt-16 { margin-top: 4rem; }
.mx-auto { margin-left: auto; margin-right: auto; }
.text-xs { font-size: 0.75rem; line-height: 1rem; }
.text-sm { font-size: 0.875rem; line-height: 1.25rem; }
.text-base { font-size: 1rem; line-height: 1.5rem; }
.text-lg { font-size: 1.125rem; line-height: 1.75rem; }
.text-xl { font-size: 1.25rem; line-height: 1.75rem; }
.text-2xl { font-size: 1.5rem; line-height: 2rem; }
.text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
.text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
.text-5xl { font-size: 3rem; line-height: 1; }
.text-6xl { font-size: 3.75rem; line-height: 1; }
.font-medium { font-weight: 500; }
.font-semibold { font-weight: 600; }
.font-bold { font-weight: 700; }
.text-center { text-align: center; }
.leading-tight { line-height: 1.25; }
.leading-relaxed { line-height: 1.625; }
.max-w-2xl { max-width: 42rem; }
.max-w-6xl { max-width: 72rem; }
.grid { display: grid; }
.grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
.gap-8 { gap: 2rem; }
.overflow-y-auto { overflow-y: auto; }
.transition-colors { transition-property: color, background-color, border-color; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
.transition-all { transition-property: all; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
.duration-300 { transition-duration: 300ms; }
.hover\\:bg-accent:hover { background-color: hsl(210 40% 96%); }
.hover\\:text-accent-foreground:hover { color: hsl(222.2 84% 4.9%); }
.hover\\:shadow-md:hover { box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1); }
.hover\\:-translate-y-1:hover { transform: translateY(-0.25rem); }

/* Responsive */
@media (min-width: 768px) {
  .md\\:w-80 { width: 20rem; }
  .md\\:p-8 { padding: 2rem; }
  .md\\:text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
  .md\\:text-6xl { font-size: 3.75rem; line-height: 1; }
  .md\\:text-xl { font-size: 1.25rem; line-height: 1.75rem; }
  .md\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (min-width: 1024px) {
  .lg\\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
}
`;
