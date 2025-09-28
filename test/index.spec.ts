import { env, createExecutionContext, waitOnExecutionContext, SELF } from 'cloudflare:test';
import { describe, it, expect } from 'vitest';
import worker from '../src/index';

// For now, you'll need to do something like this to get a correctly-typed
// `Request` to pass to `worker.fetch()`.
const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;

describe('Hassio Frontend React App', () => {
	it('serves React app homepage (unit style)', async () => {
		const request = new IncomingRequest('http://example.com');
		// Create an empty context to pass to `worker.fetch()`.
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		// Wait for all `Promise`s passed to `ctx.waitUntil()` to settle before running test assertions
		await waitOnExecutionContext(ctx);
		const html = await response.text();
		expect(html).toContain('Welcome to Hassio Frontend');
		expect(html).toContain('Edge Computing');
		expect(html).toContain('AI-Powered Chat');
		expect(response.headers.get('content-type')).toBe('text/html;charset=UTF-8');
	});

	it('serves React app homepage (integration style)', async () => {
		const response = await SELF.fetch('https://example.com');
		const html = await response.text();
		expect(html).toContain('Welcome to Hassio Frontend');
		expect(html).toContain('Hassio Frontend'); // Sidebar title
		expect(html).toContain('Modern UI'); // Feature card
		expect(response.headers.get('content-type')).toBe('text/html;charset=UTF-8');
	});

	it('serves chat page when requested', async () => {
		const response = await SELF.fetch('https://example.com/chat');
		const html = await response.text();
		expect(html).toContain('AI Chat Assistant');
		expect(html).toContain('Start a conversation');
		expect(response.headers.get('content-type')).toBe('text/html;charset=UTF-8');
	});
});
