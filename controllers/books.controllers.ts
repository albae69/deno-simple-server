// import 3rd library for routes
import { Context } from 'https://deno.land/x/abc@v1.0.0-rc10/mod.ts'
// import interface for book
import { Book } from '../models/book.model.ts'
// import id generator from std
import { v4 } from 'https://deno.land/std/uuid/mod.ts'

// create a simple array of object book data
let books: Book[] = [
  { id: '1', title: 'this is a deno', author: 'bae', pages: 6 },
  {
    id: '2',
    title: 'a secure runtime javascript and typescript',
    author: 'haqi',
    pages: 9,
  },
  {
    id: '3',
    title: 'against node, wtf im still using javascript while learn this.',
    author: 'bae dev',
    pages: 69,
  },
]

// create a route for get all books
export const getAllBooks = (ctx: Context) => {
  return ctx.json(books, 200)
}

// create a route for get a single book
export const getBook = (ctx: Context) => {
  const { id } = ctx.params
  const book = books.find((b: Book) => b.id === id)
  if (book) {
    return ctx.json(book, 200)
  }
  return ctx.string('no book with id', 404)
}

// createa a route to create a new book with id
export const createBook = async (ctx: Context) => {
  const { title, author, pages } = await ctx.body()

  //   validate data & types data
  const id = v4.generate()
  const book = { id, title, author, pages }
  books.push(book)
  return ctx.json(book, 201)
}

// create a route to delete a book with id
export const deleteBook = (ctx: Context) => {
  const { id } = ctx.params
  const book = books.find((b: Book) => b.id === id)
  if (book) {
    books = books.filter((b: Book) => b.id !== id)
    return ctx.json(book, 200)
  }
  return ctx.string('no book with id', 404)
}
