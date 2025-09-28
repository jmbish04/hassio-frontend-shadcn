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
  <style>
    * {
      box-sizing: border-box;
    }
    
    body {
      margin: 0;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: #f8fafc;
    }
    
    #root {
      min-height: 100vh;
    }
  </style>
</head>
<body>
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
