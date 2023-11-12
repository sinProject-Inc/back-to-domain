import { Log } from '$lib/log'
import type { Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
	await Log.http(event)

	const response = await resolve(event)

	return response
}
