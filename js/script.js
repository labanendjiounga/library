const myLibrary = [];

function Book(title, author, pages, language, publisher, year, isRead) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.language = language;
  this.publisher = publisher;
  this.year = year;
  this.isRead = isRead;
}

Book.prototype.toggleReadStatus = function () {
  this.isRead ? this.isRead = false : this.isRead = true;
};

function addBookToLibrary(title, author, pages, language, publisher, year, isRead) {
  const book = new Book(title, author, pages, language, publisher, year, isRead);
  myLibrary.push(book);
}

function displayBooks() {
  const myLibraryReversed = myLibrary.toReversed();
  
  myLibraryReversed.forEach(book => {
    const title = document.createElement("p");
    const author = document.createElement("p");
    
    title.classList.toggle("title");
    title.textContent = book.title;
    
    author.classList.toggle("author");
    author.textContent = book.author;
    
    const cardHeader = document.createElement("div");
    cardHeader.appendChild(title);
    cardHeader.appendChild(author);

    const pagesLabel = document.createElement("p");
    const pagesValue = document.createElement("p");
    
    pagesLabel.textContent = "Pages:";
    pagesValue.textContent = book.pages;
    
    const pages = document.createElement("div");
    pages.appendChild(pagesLabel);
    pages.appendChild(pagesValue);

    const languageLabel = document.createElement("p");
    const languageValue = document.createElement("p");

    languageLabel.textContent = "Language:";
    languageValue.textContent = book.language;
    
    const language = document.createElement("div");
    language.appendChild(languageLabel);
    language.appendChild(languageValue);

    const publisherLabel = document.createElement("p");
    const publisherValue = document.createElement("p");

    publisherLabel.textContent = "Publisher:"; 
    publisherValue.textContent = book.publisher;

    const publisher = document.createElement("div");
    publisher.appendChild(publisherLabel);
    publisher.appendChild(publisherValue);

    const yearLabel = document.createElement("p");
    const yearValue = document.createElement("p");

    yearLabel.textContent = "Year:";
    yearValue.textContent = book.year;

    const year = document.createElement("div");
    year.appendChild(yearLabel);
    year.appendChild(yearValue);

    const bookDetails = document.createElement("div");
    bookDetails.classList.toggle("book-details");
    bookDetails.appendChild(pages);
    bookDetails.appendChild(language);
    bookDetails.appendChild(publisher);
    bookDetails.appendChild(year);

    const readStatusButton = document.createElement("button");
    readStatusButton.setAttribute("id", "read-status");
    readStatusButton.setAttribute("data-id", book.id);
    book.isRead ?
      readStatusButton.innerHTML = `<img src="./img/read.svg" alt="Read icon" width="24" height="24">` :
      readStatusButton.innerHTML = `<img src="./img/not-read-yet.svg" alt="Read icon" width="24" height="24">`;

    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("id", "delete");
    deleteButton.setAttribute("data-id", book.id);
    deleteButton.innerHTML = `<img src="./img/delete.svg" alt="Delete icon" width="24" height="24">`;

    const cardFooter = document.createElement("div");
    cardFooter.classList.toggle("card-footer");
    cardFooter.appendChild(readStatusButton);
    cardFooter.appendChild(deleteButton);
    
    const card = document.createElement("div");
    card.classList.toggle("card");
    card.setAttribute("id", book.id);
    card.setAttribute("data-id", book.id);
    card.appendChild(cardHeader);
    card.appendChild(bookDetails);
    card.appendChild(cardFooter);
    
    const main = document.querySelector(".main");
    main.insertBefore(card, main.firstChild);
  });
}

addBookToLibrary("The Rosie Project", "Graeme Simsion", "302", "English", "Simon & Schuster", "2013", false);
addBookToLibrary("The Personal MBA", "Josh Kaufman", "465", "English", "Porfolio / Penguin", "2020", false);
addBookToLibrary("About a boy", "Nick Hornby", "314", "English", "Penguin Group", "2014", false);

displayBooks();

const readStatusButtons = document.querySelectorAll("#read-status");
readStatusButtons.forEach(readStatusButton => {
  myLibrary.forEach(book => {
    readStatusButton.addEventListener("click", () => {
      if(readStatusButton.dataset.id === book.id) {
        if(!book.isRead) {
          readStatusButton.innerHTML = `<img src="./img/read.svg" alt="Read icon" width="24" height="24">`;
          book.toggleReadStatus();
        } else {
          readStatusButton.innerHTML = `<img src="./img/not-read-yet.svg" alt="Read icon" width="24" height="24">`;
          book.toggleReadStatus();
        }
      }
    });
  });
});

const deleteButtons = document.querySelectorAll("#delete");
deleteButtons.forEach(deleteButton => {
  myLibrary.forEach(book => {
    deleteButton.addEventListener("click", () => {
      if((deleteButton.dataset.id === book.id)) {
        myLibrary.pop(book);
        
        const main = document.querySelector(".main");
        const card = document.getElementById(`${book.id}`);
        main.removeChild(card);

        if(main.childElementCount === 0) {
          main.classList.toggle("empty");
          main.textContent = "No book to display. Add a book to display it here.";
        }
      }
    });
  });
});