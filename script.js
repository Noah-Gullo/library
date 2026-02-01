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

    const editButton = document.createElement("button");
    editButton.setAttribute("class", "edit-button");
    editButton.textContent = "Edit";

    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "delete-button");
    deleteButton.textContent = "Delete";    
    deleteButton.addEventListener("click", () => deleteBook(uuid));

    container.appendChild(book);
    document.getElementById(uuid).appendChild(titleText);
    document.getElementById(uuid).appendChild(authorText);
    document.getElementById(uuid).appendChild(pageCountText);
    document.getElementById(uuid).appendChild(checkedContainer);
    checkedContainer.appendChild(hasReadText);
    checkedContainer.appendChild(hasReadBox);
    document.getElementById(uuid).appendChild(editButton);
    document.getElementById(uuid).appendChild(deleteButton);
}

function displayBooks(){
    console.log(myLibrary)
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

function addBook(){
    const title = document.getElementById("title-field").value;
    const author = document.getElementById("author-field").value;
    const pageNum = document.getElementById("page-field").value;
    const hasRead = document.getElementById("has-read").checked;

    addBookToLibrary(title, author, pageNum, hasRead);
}

const addButton = document.querySelector("#new-book-button");
addButton.addEventListener("click", (event) => {
    event.preventDefault();
    document.querySelector("dialog").showModal();
});

const submitButton = document.getElementById("submit-button");
submitButton.addEventListener("click", () => addBook());

for(let i = 0; i < 42; i++){
    addBookToLibrary("title", "author", 100, true);
}