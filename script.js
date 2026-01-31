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

    this.flipReadStatus = function(){
        console.log(title + " before " + this.hasRead);
        this.hasRead = !this.hasRead;
        console.log(title + " after " + this.hasRead);
    }
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
    hasReadBox.addEventListener("click", () => currentBook.flipReadStatus());
    container.appendChild(book);
    document.getElementById(uuid).appendChild(titleText);
    document.getElementById(uuid).appendChild(authorText);
    document.getElementById(uuid).appendChild(pageCountText);
    document.getElementById(uuid).appendChild(checkedContainer);
    checkedContainer.appendChild(hasReadText);
    checkedContainer.appendChild(hasReadBox);
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

for(let i = 0; i < 10; i++){
    let read = false;
    if(Math.random() > 0.5){
        read = true;
    }
    const book = addBookToLibrary(i, "Jane Doe", (Math.ceil(Math.random() * 100)), read, crypto.randomUUID)
}