import { expect, it } from 'vitest'
import dotenv from 'dotenv'

dotenv.config()

it('env test', () => {
	if (process.env['CI']) return

	const ip = process.env['TEST_IP_ADDRESS']

	expect(ip).toBe('127.0.0.1')
})
