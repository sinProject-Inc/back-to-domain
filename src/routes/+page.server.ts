import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ getClientAddress: get_client_address }) => {
	const client_address = get_client_address()

	return {
		client_address,
	}
}
