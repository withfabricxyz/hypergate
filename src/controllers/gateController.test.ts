import { describe, expect, it } from 'bun:test'
import { GateQuery } from '../types'
import { app } from '../app'

const request: GateQuery = {
  asset: 'eip155:1/erc20:0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  accounts: [
    '0xF1f8CAC358a4c86979AFF1bD380498206E8224B6',
    '0xdead000000000dead0000000beef000000000000',
  ],
}

// TODO: Fork base blockchain and test with a local node (specific block)

describe('Balance Check', () => {
    it('fetches balances for erc20', async () => {
      const response = await app
          .handle(new Request('http://localhost/gating/balances', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
          }))
          .then((res) => res.json())


      expect(Number(response['0xF1f8CAC358a4c86979AFF1bD380498206E8224B6'])).toBeGreaterThan(0);
      expect(Number(response['0xdead000000000dead0000000beef000000000000'])).toEqual(0);
    })

    it('fetches an active filtered list', async () => {
      const response = await app
          .handle(new Request('http://localhost/gating/active', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
          }))
          .then((res) => res.json())


      expect(response).toEqual(['0xF1f8CAC358a4c86979AFF1bD380498206E8224B6']);
    })
});