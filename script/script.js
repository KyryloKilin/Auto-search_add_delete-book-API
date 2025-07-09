 let books = [
//   {
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

let bookNames = [
    "1984",
    "To Kill a Mockingbird",
    "The Great Gatsby",
    "Pride and Prejudice",
    "Moby-Dick",
    "War and Peace",
    "The Catcher in the Rye"
  ];

  function loadBooks() {
    bookNames.forEach(function(bookName){
        getBook(bookName);
    });
  }

const bookAPIUrl = "https://www.googleapis.com/books/v1/volumes?q=";

function getBook(bookName){
let url = bookAPIUrl + bookName;
$.ajax({
    url: url,
    method: "GET",
    success: function(book){
        addBook(book);
    },
    error: function(error){
        alert("Error:" + error.status) 
    }
});
}

function addBook(book){
    let newBook = {};
        newBook.id = books.length + 1,
        newBook.name = book.items[0].volumeInfo.title,
        newBook.author = book.items[0].volumeInfo.authors[0],
        newBook.year = book.items[0].volumeInfo.publishedDate,
        newBook.genre = book.items[0].volumeInfo.categories[0],
        newBook.pages = book.items[0].volumeInfo.pageCount,
        newBook.country = book.items[0].saleInfo.country,
        newBook.language = "EN",

    books.push(newBook);
    updateBooks();
    }

function updateBooks() {
  let booksTable = $("#books");
  booksTable.empty();

  books.forEach(function (book) {
    let tr = `<tr>
      <td>${book.id}</td>
      <td>${book.name}</td>
      <td>${book.author}</td>
      <td>${book.year}</td>
      <td>${book.genre}</td>
      <td>${book.pages}</td>
      <td>${book.country}</td>
      <td>${book.language}</td>
      <td>
        <button class="delete-btn" data-id="${book.id}" data-name="${book.name}">Delete</button>
      </td>
    </tr>`;
    booksTable.append(tr);
  });
}

$(document).ready(function() {
  loadBooks();
  
  $("#addBookButton").click(function() {
      $("#addBookModal").show();
  });

  $("#closeModal").click(function() {
      $("#addBookModal").hide(); 
  });

  $("#submitBook").click(function() {
      let bookName = $("#bookNameInput").val(); 
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
    let bookId = $(this).data("id");
    let bookName = $(this).data("name");

    $("#deleteMessage").text(`Are you sure you want to delete the book "${bookName}"?`);
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

