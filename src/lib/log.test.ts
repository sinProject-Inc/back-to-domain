import { describe, expect, it, vi } from 'vitest'
import { Log } from './log'
import type { RequestEvent } from '@sveltejs/kit'

describe('Test of the Log class', () => {
	it('generates correct log information', async () => {
		const console_spy = vi.spyOn(console, 'info').mockImplementation(() => {})

		const headers = new Headers()
		headers.set('user-agent', 'vitest')

		const mock_event = {
			request: new Request('http://example.com/test?query=1', {
				method: 'GET',
				headers: headers,
			}),
			url: new URL('http://example.com/test?query=1'),
			// eslint-disable-next-line @typescript-eslint/naming-convention
			getClientAddress: (): string => '192.168.1.1',
		}

		await Log.http(mock_event as RequestEvent)

		expect(console_spy).toHaveBeenCalled()

		const log_output = console_spy.mock.calls[0]?.[0]
		expect(log_output).toContain('192.168.1.1 GET /test query=1 vitest')

		// スパイをリセット
		console_spy.mockRestore()
	})
})
