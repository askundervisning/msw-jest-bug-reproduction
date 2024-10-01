/* eslint-env jest */
import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'

const handlers = [
  http.get('/api/foo', () => {
    return HttpResponse.json({ id: 'tok_1234567890' })
  }),
]

export const server = setupServer(...handlers)

export * from 'msw'
