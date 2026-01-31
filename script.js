const myLibrary = [];

function Book(title, author, numPages, beenRead, id){
    if(!new.target){
        throw Error("You need to use 'new' to call this constructor");
    }
    
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.beenRead = beenRead;
    this.id = id;
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

        container.appendChild(book);
        document.getElementById(uuid).appendChild(titleText);
        document.getElementById(uuid).appendChild(authorText);
        document.getElementById(uuid).appendChild(pageCountText);
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
    const book = addBookToLibrary("How to Kill a Mockinbird", "Jane Doe", (Math.ceil(Math.random() * 100)), false, crypto.randomUUID)
}