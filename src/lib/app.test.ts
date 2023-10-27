import { expect, it } from 'vitest'
import { App } from './app'

it('company_name', () => {
	expect(App.company_name).toBe('sinProject')
})

it('app_name', () => {
	expect(App.app_name).toBe('Back To Domain')
})

it('copyright', () => {
	expect(App.copyright).toBe('© sinProject.')
})
