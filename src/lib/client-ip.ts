export class ClientIP {
	public constructor(
		private readonly _request: Request,
		private readonly _get_client_address: () => string
	) {}

	public get value(): string {
		const client_ip = this._request.headers.get('x-forwarded-for') || this._get_client_address()

		// console.log('x-forwarded-for', this._request.headers.get('x-forwarded-for'))
		// console.log('get_client_address', this._get_client_address())

		return client_ip
	}
}
