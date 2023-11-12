import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { ClientIP } from '$lib/client-ip'

export const GET: RequestHandler = ({ request, getClientAddress: get_client_address }) => {
	const client_ip = new ClientIP(request, get_client_address).value

	return json({ client_ip })
}
