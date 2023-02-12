function findAccountById(accounts, id) {
  const foundId = accounts.find((account) => account.id === id)
  return foundId
}

function sortAccountsByLastName(accounts) {
  accounts.sort((accountA, accountB) => 
    accountA.name.last.toLowerCase () > accountB.name.last.toLowerCase() ? 1 : -1)
  return accounts
}

// a function that returns a number representing the number of timesthe account's ID appears in the books's 'borrows' array
function getTotalNumberOfBorrows(account, books) {
  // create a variable for the id in account using destructuring
  const {id: accountId} = account
  // use the reduce methos on books to accumulate total number of borrows
  return books.reduce((accumulator, book) => {
    // callback function
    return (accumulator + book.borrows
      // use filter method to create new array to only include borrows that have the same id as the account id
      .filter(borrow => borrow.id === accountId)
      // use the reduce method to add 1 for eahc item in the filtered array
      .reduce((accumulatorBorrows, borrow) => accumulatorBorrows +1, 0)
      )
  }, 0)
}

function getBooksPossessedByAccount(account, books, authors) {
  const result = []
  const matchBorrowed = []
  books.forEach ((item) => {
    const borrowed = item.borrows
    const book = {
      id: item.id,
      title: item.title,
      genre: item.genre,
      authorId: item.authorId,
      author: {},
      borrows: {}
    }
    const { id, title, genre, authorId, author, borrows } = book

    borrowed.forEach ((borrow) => {
      if (borrow.id === account.id && borrow.returned === false) {
        result.push(book)
        matchBorrowed.push(borrow)
        book.borrows = matchBorrowed
        book.author = authors.filter((auth) => auth.id === book.authorId) [0]
      }
    })
  })
  return result
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
