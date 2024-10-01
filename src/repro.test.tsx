import {
  render,
  screen,
  RenderOptions,
  RenderResult,
} from '@testing-library/react'
import { useEffect, useState } from 'react'

const Component = () => {
  const [res, setRes] = useState<null | { id: string }>(null)
  useEffect(() => {
    const request = new Request('/api/foo')

    fetch(request)
      .then(async (res) => setRes(await res.json()))
      .catch((err) => console.error(err))
  }, [])
  if (res) {
    return <div>HAHAHA {res.id}</div>
  }
  return <div>Hello</div>
}

test('request', async () => {
  render(<Component />)

  await screen.findByText(/HAHAHA/)
})
