function findAuthorById(authors, id) {
  const found = authors.find((author) => author.id === id)
  return found
}

function findBookById(books, id) {
  const foundBooks = books.find((book) => book.id === id)
  return foundBooks
}

function partitionBooksByBorrowedStatus(books) {
  const booksReturned = books.filter((book) =>
    book.borrows.every((borrow) => borrow.returned === true))
  const booksBorrowed = books.filter((book) =>
    book.borrows.some((borrow) => borrow.returned === false))
  let finalArray = [[...booksBorrowed], [...booksReturned]];
  return finalArray
}

function getBorrowersForBook(book, accounts) {
  return book.borrows
    .map((borrow) => {
      const account = accounts.find((account) => account.id === borrow.id)
      return {...borrow, ...account}
    })
    .slice(0, 10)
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
