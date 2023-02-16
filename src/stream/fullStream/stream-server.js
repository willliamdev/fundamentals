import http from "node:http"

const server = http.createServer(async (request, response) => {
  const buffers = []

  // waits for all the content of the request to be loaded
  // :getting full stream

  for await (const chunk of request) {
    buffers.push(chunk)
  }

  console.log(buffers.toString())
  const fullStreamContent = Buffer.concat(buffers).toString()

  console.log(fullStreamContent)

  return response.end(fullStreamContent)
})


server.listen({ port: 3000 })