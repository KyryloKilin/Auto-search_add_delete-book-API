"use strict";

var books = [//   {
  //     id: 1,
  //     name: "1984",
  //     author: "George Orwell",
  //     year: 1949,
  //     genre: "Dystopian",
  //     pages: 328,
  //     country: "United Kingdom",
  //     language: "English",
  //   },
  //   {
  //     id: 2,
  //     name: "1985",
  //     author: "George Orwell",
  //     year: 1949,
  //     genre: "Dystopian",
  //     pages: 328,
  //     country: "United Kingdom",
  //     language: "English",
  //   },
];
var bookNames = ["1984", "To Kill a Mockingbird", "The Great Gatsby", "Pride and Prejudice", "Moby-Dick", "War and Peace", "The Catcher in the Rye"];

function loadBooks() {
  bookNames.forEach(function (bookName) {
    getBook(bookName);
  });
}

var bookAPIUrl = "https://www.googleapis.com/books/v1/volumes?q=";

function getBook(bookName) {
  var url = bookAPIUrl + bookName;
  $.ajax({
    url: url,
    method: "GET",
    success: function success(book) {
      addBook(book);
    },
    error: function error(_error) {
      alert("Error:" + _error.status);
    }
  });
}

function addBook(book) {
  var newBook = {};
  newBook.id = books.length + 1, newBook.name = book.items[0].volumeInfo.title, newBook.author = book.items[0].volumeInfo.authors[0], newBook.year = book.items[0].volumeInfo.publishedDate, newBook.genre = book.items[0].volumeInfo.categories[0], newBook.pages = book.items[0].volumeInfo.pageCount, newBook.country = book.items[0].saleInfo.country, newBook.language = "EN", books.push(newBook);
  updateBooks();
}

function updateBooks() {
  var booksTable = $("#books");
  booksTable.empty();
  books.forEach(function (book) {
    var tr = "<tr>\n      <td>".concat(book.id, "</td>\n      <td>").concat(book.name, "</td>\n      <td>").concat(book.author, "</td>\n      <td>").concat(book.year, "</td>\n      <td>").concat(book.genre, "</td>\n      <td>").concat(book.pages, "</td>\n      <td>").concat(book.country, "</td>\n      <td>").concat(book.language, "</td>\n      <td>\n        <button class=\"delete-btn\" data-id=\"").concat(book.id, "\" data-name=\"").concat(book.name, "\">Delete</button>\n      </td>\n    </tr>");
    booksTable.append(tr);
  });
}

$(document).ready(function () {
  loadBooks();
  $("#addBookButton").click(function () {
    $("#addBookModal").show();
  });
  $("#closeModal").click(function () {
    $("#addBookModal").hide();
  });
  $("#submitBook").click(function () {
    var bookName = $("#bookNameInput").val();

    if (bookName) {
      getBook(bookName);
      $("#addBookModal").hide();
    } else {
      alert("Please enter a book name.");
    }
  });
});
$(document).ready(function () {
  $(document).on("click", ".delete-btn", function () {
    var bookId = $(this).data("id");
    var bookName = $(this).data("name");
    $("#deleteMessage").text("Are you sure you want to delete the book \"".concat(bookName, "\"?"));
    $("#deleteModal").show();
    $("#confirmDelete").off("click").on("click", function () {
      deleteBook(bookId);
      $("#deleteModal").hide();
    });
    $("#cancelDelete").off("click").on("click", function () {
      $("#deleteModal").hide();
    });
  });

  function deleteBook(id) {
    books = books.filter(function (book) {
      return book.id !== id;
    });
    updateBooks();
  }
});