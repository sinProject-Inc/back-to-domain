import type { RequestEvent } from '@sveltejs/kit'
import { ClientIP } from './client-ip'

export class Log {
	public static async http(
		event: RequestEvent<Partial<Record<string, string>>, string | null>
	): Promise<void> {
		const timestamp = new Date().toISOString()

		const client_ip = new ClientIP(event.request, event.getClientAddress).value

		const method = event.request.method
		const path = event.url.pathname
		const search_params = event.url.searchParams.toString()
		const user_agent = event.request.headers.get('user-agent')

		// eslint-disable-next-line no-console
		console.info(`[${timestamp}] ${client_ip} ${method} ${path} ${search_params} ${user_agent}`)
	}
}
