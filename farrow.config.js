const { createFarrowConfig } = require('farrow')

module.exports = createFarrowConfig({
  server: {
    src: './server',
    dist: './dist/server',
  },
  api: [
    {
      src: 'http://localhost:3003/api/category',
      dist: `${__dirname}/src/api/category.ts`
    },
    {
      src: 'http://localhost:3003/api/user',
      dist: `${__dirname}/src/api/user.ts`
    },
    {
      src: 'http://localhost:3003/api/pet',
      dist: `${__dirname}/src/api/pet.ts`
    }
  ],
})
