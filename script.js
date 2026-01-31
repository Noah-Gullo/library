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

    this.getTitle = function(){
        return this.title;
    }

    this.getAuthor = function(){
        return this.author;
    }

    this.getNumPages = function(){
        return this.numPages;
    }

    this.getBeenRead = function(){
        return this.beenRead;
    }

    this.getId = function(){
        return this.id;
    }
}


function addBookToLibrary(title, author, numpages, beenRead){
    const newBook = new Book(title, author, numpages, beenRead, crypto.randomUUID());
    myLibrary.push(newBook);
    displayBooks();
}

function displayBooks(){
    const card_container = document.getElementById("card-container");
    if(card_container.childElementCount > 0){
        while(card_container.firstChild){
            card_container.removeChild(card_container.lastChild);
        }
    }

    for(let i = 0; i < myLibrary.length; i++){
        const currentBook = myLibrary[i];
        const uuid = currentBook.getId();

        const book = document.createElement("div");
        book.setAttribute("id", uuid);
        book.setAttribute("class", "book");

        const titleText = document.createElement("p");
        titleText.setAttribute("class", "title-text");
        titleText.textContent = currentBook.getAuthor();

        card_container.appendChild(book);
        document.getElementById(uuid).appendChild(titleText);
    }
}

for(let i = 0; i < 10; i++){
    const book = addBookToLibrary("title", i, 100, true, crypto.randomUUID)
}