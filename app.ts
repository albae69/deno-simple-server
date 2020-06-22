// import 3rd party library for server
// use abc cause its like express on node
import {
  Application,
  Context,
} from 'https://deno.land/x/abc@v1.0.0-rc10/mod.ts'

// import routes for book controller
import {
  getBook,
  getAllBooks,
  createBook,
  deleteBook,
} from './controllers/books.controllers.ts'

// create a server
const app = new Application()

// get all static file
app.static('/', './public')

// create a routes
app.get('/', async (ctx: Context) => {
  await ctx.file('./public/index.html')
})

// create a book routes
app
  .get('/books', getAllBooks)
  .get('/books/:id', getBook)
  .post('/books/', createBook)
  .delete('/books/:id', deleteBook)

// listen to port
app.start({ port: 3000 })
console.log('server running on port 3000')
