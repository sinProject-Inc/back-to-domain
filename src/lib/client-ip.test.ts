import { describe, expect, it } from 'vitest'
import { ClientIP } from './client-ip'

type Spec = {
	name: string
	forwarded_for: string | null
	get_client_address: () => string
	expected: string
}

const specs: Spec[] = [
	{
		name: 'x-forwarded-forが存在する場合',
		forwarded_for: '192.168.1.1',
		get_client_address: () => '10.0.0.1',
		expected: '192.168.1.1',
	},
	{
		name: 'x-forwarded-forがnullでgetClientAddressが呼ばれる場合',
		forwarded_for: null,
		get_client_address: () => '10.0.0.1',
		expected: '10.0.0.1',
	},
]

describe('Test of the ClientIP class', () => {
	it.each(specs)('$name', ({ forwarded_for, get_client_address, expected }) => {
		const headers = new Headers()

		if (forwarded_for != null) {
			headers.set('x-forwarded-for', forwarded_for)
		}

		// モックのリクエストオブジェクト
		const mock_request = { headers } as Request

		// ClientIPインスタンスの作成
		const client_ip = new ClientIP(mock_request, get_client_address)

		// 期待される値と実際の値を比較
		expect(client_ip.value).toBe(expected)
	})
})
