const myLibrary = [];
const noBookMessage = "No book to display. Please, add a book to display it here.";

function Book(title, author, pages, language, publisher, volume, isRead) {
  if (!new.target) {
    throw new Error("Book must be called with the new operator.");
  }
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.language = language;
  this.publisher = publisher;
  this.volume = volume;
  this.isRead = isRead;
}

Book.prototype.toggleReadStatus = function () {
  this.isRead ? this.isRead = false : this.isRead = true;
};

function addBookToLibrary(title, author, pages, language, publisher, volume, isRead) {
  const book = new Book(title, author, pages, language, publisher, volume, isRead);
  myLibrary.push(book);
}

function displayBooks() {
  const main = document.querySelector(".main");
  if(myLibrary.length === 0) {
    main.classList.toggle("empty");
    main.textContent = noBookMessage;
    return;
  }
  if(main.textContent === noBookMessage) {
    main.classList.toggle("empty");
    main.textContent = "";
  }

  const myLibraryReversed = myLibrary.toReversed();
  
  myLibraryReversed.forEach(book => {
    const title = document.createElement("p");  
    title.classList.toggle("title");
    title.textContent = book.title;
    
    const author = document.createElement("p");
    author.classList.toggle("author");
    author.textContent = book.author;
    
    const cardHeader = document.createElement("div");
    cardHeader.classList.toggle("grid")
    cardHeader.appendChild(title);
    cardHeader.appendChild(author);

    const pagesLabel = document.createElement("p");
    pagesLabel.textContent = "Pages:";

    const pagesValue = document.createElement("p");
    pagesValue.textContent = book.pages;
    
    const pages = document.createElement("div");
    pages.classList.toggle("grid");
    pages.appendChild(pagesLabel);
    pages.appendChild(pagesValue);

    const languageLabel = document.createElement("p");
    languageLabel.textContent = "Language:";

    const languageValue = document.createElement("p");
    languageValue.textContent = book.language;
    
    const language = document.createElement("div");
    language.classList.toggle("grid");
    language.appendChild(languageLabel);
    language.appendChild(languageValue);

    const publisherLabel = document.createElement("p");
    publisherLabel.textContent = "Publisher:"; 

    const publisherValue = document.createElement("p");
    publisherValue.textContent = book.publisher;

    const publisher = document.createElement("div");
    publisher.classList.toggle("grid");
    publisher.appendChild(publisherLabel);
    publisher.appendChild(publisherValue);

    const volumeLabel = document.createElement("p");
    volumeLabel.textContent = "Volume:"; 

    const volumeValue = document.createElement("p");
    volumeValue.textContent = book.volume;

    const volume = document.createElement("div");
    volume.classList.toggle("grid");
    volume.appendChild(volumeLabel);
    volume.appendChild(volumeValue);

    const bookDetails = document.createElement("div");
    bookDetails.classList.toggle("grid");
    bookDetails.classList.toggle("book-details");
    bookDetails.appendChild(pages);
    bookDetails.appendChild(language);
    bookDetails.appendChild(publisher);
    bookDetails.appendChild(volume);

    const readStatusButton = document.createElement("button");
    readStatusButton.setAttribute("id", "toggle-read-status");
    readStatusButton.setAttribute("data-id", book.id);
    book.isRead ?
      readStatusButton.innerHTML = `<img src="./img/read.svg" alt="Read icon" width="24" height="24">` :
      readStatusButton.innerHTML = `<img src="./img/not-read-yet.svg" alt="Read icon" width="24" height="24">`;

    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("id", "delete");
    deleteButton.setAttribute("data-id", book.id);
    deleteButton.innerHTML = `<img src="./img/delete.svg" alt="Delete icon" width="24" height="24">`;

    const cardFooter = document.createElement("div");
    cardFooter.classList.toggle("grid");
    cardFooter.classList.toggle("card-footer");
    cardFooter.appendChild(readStatusButton);
    cardFooter.appendChild(deleteButton);
    
    const card = document.createElement("div");
    card.classList.toggle("grid");
    card.classList.toggle("card");
    card.setAttribute("id", book.id);
    card.setAttribute("data-id", book.id);
    card.appendChild(cardHeader);
    card.appendChild(bookDetails);
    card.appendChild(cardFooter);
    
    main.append(card);
  });
}

function handleReadStatusAndDeleteButtons() {
  const readStatusButtons = document.querySelectorAll("#toggle-read-status");
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
            main.textContent = noBookMessage;
          }
        }
      });
    });
  });
}

addBookToLibrary("The Rosie Project", "Graeme Simsion", "302", "English", "Simon & Schuster", "1", false);
addBookToLibrary("The Personal MBA", "Josh Kaufman", "465", "English", "Porfolio / Penguin", "1", false);
addBookToLibrary("About a boy", "Nick Hornby", "314", "English", "Penguin Group", "1", false);

displayBooks();
handleReadStatusAndDeleteButtons();

const dialog = document.querySelector("dialog");
const newBookButton = document.querySelector("dialog + button");
const closeButton = document.querySelector("dialog button");

newBookButton.addEventListener("click", () => {
  dialog.showModal();
});

closeButton.addEventListener("click", () => {
  dialog.close();
});

const addBookToLibraryButton = document.querySelector(`button[type="submit"]`);
addBookToLibraryButton.addEventListener("click", (e) => {
  const title = document.querySelector(`input[name="title"]`).value;
  const author = document.querySelector(`input[name="author"]`).value;
  const pages = document.querySelector(`input[name="pages"]`).value;
  const language = document.querySelector(`input[name="language"]`).value;
  const publisher = document.querySelector(`input[name="publisher"]`).value;
  const volume = document.querySelector(`input[name="volume"]`).value;
  const readStatus = document.querySelector(`input[name="read-status"]`).checked;

  if(title && author && pages && language && publisher && volume && (!readStatus || readStatus)) {
    e.preventDefault();
    addBookToLibrary(title, author, pages, language, publisher, volume, readStatus);
    
    const main = document.querySelector(".main");
    const cards = document.querySelectorAll(".card");

    if(main.childElementCount > 0) {
      cards.forEach(card => {
        main.removeChild(card);
      });
    }

    displayBooks();
    handleReadStatusAndDeleteButtons();

    document.querySelector(`input[name="title"]`).value = null;
    document.querySelector(`input[name="author"]`).value = null;
    document.querySelector(`input[name="pages"]`).value = null;
    document.querySelector(`input[name="language"]`).value = null;
    document.querySelector(`input[name="publisher"]`).value = null;
    document.querySelector(`input[name="volume"]`).value = 1;
    document.querySelector(`input[name="read-status"]`).checked = false;

    document.querySelector(`input[name="title"]`).focus();
  }
});