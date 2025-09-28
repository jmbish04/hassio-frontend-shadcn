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
				const cssContent = await env.ASSETS.fetch(request);
				return cssContent;
			} catch (error) {
				// Fallback CSS if assets are not available
				return new Response(css, {
					headers: { 'content-type': 'text/css' },
				});
			}
		}
		
		// Handle API routes for chatbot
		if (url.pathname.startsWith('/api/')) {
			return handleApi(request, env);
		}
		
		// Serve the React app for all other routes
		try {
			const appHTML = renderToString(<App />);
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
			const body = await request.json() as any;
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

// Fallback CSS for development
const css = `
/* Basic Tailwind-like reset */
*, ::before, ::after { box-sizing: border-box; border-width: 0; border-style: solid; border-color: #e5e7eb; }
html { line-height: 1.5; -webkit-text-size-adjust: 100%; tab-size: 4; font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif; }
body { margin: 0; line-height: inherit; }
`;
