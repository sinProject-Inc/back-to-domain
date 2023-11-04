import type { Handle, RequestEvent } from '@sveltejs/kit'

async function log_access(
	event: RequestEvent<Partial<Record<string, string>>, string | null>
): Promise<void> {
	const timestamp = new Date().toISOString()

	const client_address = event.getClientAddress()

	const method = event.request.method
	const path = event.url.pathname
	const search_params = event.url.searchParams.toString()

	// eslint-disable-next-line no-console
	console.log(`[${timestamp}] ${client_address} ${method} ${path} ${search_params}`)
}

export const handle: Handle = async ({ event, resolve }) => {
	await log_access(event)

	const response = await resolve(event)

	return response
}
