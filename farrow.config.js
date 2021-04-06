const { createFarrowConfig } = require('farrow')
const fs = require("fs")

const SERVER_HOST = fs.readFileSync(`/run/secrets/SERVER_HOST`, 'utf-8').trim()
const domain = SERVER_HOST || "localhost:3003"

module.exports = createFarrowConfig({
  server: {
    src: './server',
    dist: './dist/server',
  },
  api: [
    {
      src: `http://${domain}/api/category`,
      dist: `${__dirname}/src/api/category.ts`
    },
    {
      src: `http://${domain}/api/user`,
      dist: `${__dirname}/src/api/user.ts`
    },
    {
      src: `http://${domain}/api/pet`,
      dist: `${__dirname}/src/api/pet.ts`
    },
    {
      src: `http://${domain}/api/order`,
      dist: `${__dirname}/src/api/order.ts`
    }
  ],
})
