function getTotalBooksCount(books) {
  return books.length
}

function getTotalAccountsCount(accounts) {
  return accounts.length
}

function getBooksBorrowedCount(books) {
  const booksCheckedOut = books.filter((book) =>
    book.borrows.filter((record) => record.returned === false).length > 0)
  return booksCheckedOut.length
}

function getMostCommonGenres(books) {
  const map = {}
  books.forEach((num) => {
    if (map[num.genre]) {
      map[num.genre]++
    } else {
      map[num.genre] = 1
    }
  })
  return Object.entries(map)
    .map(([name, count]) => {
      return {
        name,
        count
      }
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)
}

//returns an array containing five objects or fewer that represents the most popular books in the library
function getMostPopularBooks(books) {
  let popularBooks = []
  // loops through 'books'; creates new objects with 'name' and 'count' keys, and pushes them onto 'popularBooks' array
  const borrows = books.reduce((acc, book) => {
    popularBooks.push({ name: book.title, count: book.borrows.length })
  }, [])
  return topFive(popularBooks);
}

//helper function that sorts 'popularBooks' array and returns the top 5
function topFive(array) {
  let popularBooks = array
    .sort((countA, countB) => (countA.count < countB.count ? 1 : -1))
    .slice(0, 5)
  return popularBooks
}

function getMostPopularAuthors(books, authors) {
  let result = []
  authors.forEach((author) => {
    let theAuthor = {
      name: `${author.name.first} ${author.name.last}`,
      count: 0
    }
    books.forEach((book) => {
      if (book.authorId === author.id) {
        theAuthor.count += book.borrows.length
      }
    })
    result.push(theAuthor)
  })
  return result.sort((a, b) => b.count - a.count).slice(0, 5)
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
