const myLibrary = [];

function Book(title, author, numPages, hasRead, id){
    if(!new.target){
        throw Error("You need to use 'new' to call this constructor");
    }
    
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.hasRead = hasRead;
    this.id = id;

    this.getId = function(){
        return this.id;
    }

    this.flipReadStatus = function(){
        this.hasRead = !this.hasRead;
    }
}

function deleteBook(uuid){
    for(let i = 0; i < myLibrary.length; i++){
        if(myLibrary[i].getId() === uuid){
            myLibrary.splice(i, 1);
            break;
        }
    }
    displayBooks();
}

function deleteAllBooks(){
    myLibrary.length = 0;
    displayBooks();
}


function addBook(){
    let title = document.getElementById("title-field").value;
    let author = document.getElementById("author-field").value;
    let pageNum = document.getElementById("page-field").value;
    let hasRead = document.getElementById("has-read").checked;

    if(title == ""){
        title = "Title";
    }

    if(author == ""){
        author = "First Last";
    }

    if(pageNum == ""){
        pageNum = "0";
    }

    addBookToLibrary(title, author, pageNum, hasRead);
}

function addBookToLibrary(title, author, numpages, beenRead){
    const newBook = new Book(title, author, numpages, beenRead, crypto.randomUUID());
    myLibrary.push(newBook);
    displayBooks();
}

function addBookToDOM(container, index){
    const currentBook = myLibrary[index];
    const uuid = currentBook.id;

    const book = document.createElement("div");
    book.setAttribute("id", uuid);
    book.setAttribute("class", "book");

    const titleText = document.createElement("p");
    titleText.setAttribute("class", "title-text");
    titleText.textContent = currentBook.title;

    const authorText = document.createElement("p");
    authorText.setAttribute("class", "author-text");
    authorText.textContent = "By: " + currentBook.author;
    
    const pageCountText = document.createElement("p");
    pageCountText.setAttribute("class", "page-count-text");
    pageCountText.textContent = "Page Count: " + currentBook.numPages;
    
    const checkedContainer = document.createElement("div");
    checkedContainer.setAttribute("id", "checked-container");

    const hasReadText = document.createElement("p");
    hasReadText.setAttribute("class", "has-read-text");
    hasReadText.textContent = "Read: ";

    const hasReadBox = document.createElement("input");
    hasReadBox.setAttribute("class", "has-read-box");
    hasReadBox.setAttribute("type", "checkbox");
    hasReadBox.checked = currentBook.hasRead;

    if(currentBook.hasRead){
        book.style.backgroundColor = "#070053";
    }else{
        book.style.backgroundColor = "#003290";
    }

    hasReadBox.addEventListener("click", () => {
        if(!currentBook.hasRead){
            book.style.backgroundColor = "#070053";
        }else{
            book.style.backgroundColor = "#003290";
        }
        currentBook.flipReadStatus();
    });

    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "delete-button");
    deleteButton.textContent = "Delete";    
    deleteButton.addEventListener("click", () => deleteBook(uuid));

    container.appendChild(book);
    book.appendChild(titleText);
    book.appendChild(authorText);
    book.appendChild(pageCountText);
    book.appendChild(checkedContainer);
    checkedContainer.appendChild(hasReadText);
    checkedContainer.appendChild(hasReadBox);
    book.appendChild(deleteButton);
}

function displayBooks(){
    const card_container = document.getElementById("card-container");
    if(card_container.childElementCount > 0){
        while(card_container.firstChild){
            card_container.removeChild(card_container.lastChild);
        }
    }

    for(let i = 0; i < myLibrary.length; i++){
        addBookToDOM(card_container, i);
    }
}

const addButton = document.getElementById("new-book-button");
addButton.addEventListener("click", (event) => {
    event.preventDefault();
    document.querySelector("dialog").showModal();
});

const deleteAllButton = document.getElementById("delete-all-button");
deleteAllButton.addEventListener("click", () => deleteAllBooks());

const submitButton = document.getElementById("submit-button");
submitButton.addEventListener("click", () => addBook());