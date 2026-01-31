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
}


function addBookToLibrary(title, author, numpages, beenRead){
    const newBook = new Book(title, author, numpages, beenRead, crypto.randomUUID());
    myLibrary.push(newBook);
    console.log("Added '" + newBook.getTitle() + "' to the array.");
}

function displayBooks(){
    
}

const book1 = addBookToLibrary("How to Kill a Mockingbird", "Harper Lee", 250, true, crypto.randomUUID());
const book2 = addBookToLibrary("War and Peace", "Leo Toltstoy", 750, false);
const book3 = addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 342, true);