let myLibrary = [];

a = new Book(myLibrary.length, "dasda", "dasda", 21, true);
myLibrary.push(a);

function Book(size, title, author, pages, read) {
    this.id = size;
    this.title = title;
    this.author = author;
    this.page = pages;
    this.read = read;
    this.info = function () {
        result = `Title: ${this.title},
                  Author: ${this.author},
                  Pages: ${this.page} pages,
                  Read: `;
        if (this.read) {
            result += "yes";
        } else {
            result += "not yet";
        }
        return result;
    }
}

function addBookToLibrary() {
    title = document.querySelector("#title").value;
    author = document.querySelector("#author").value;
    pages = document.querySelector("#pages").value.toString();
    read = document.querySelector("#read").checked;
    if (title != "" && author != "" && pages != "") {
        new_book = new Book(myLibrary.length, title, author, pages, read);
        myLibrary.push(new_book);
        document.querySelector("#add-form").reset();
        displayBooks();
    } else {
        document.querySelector("#fail-message").textContent = "All field must be filled"
    }
    return false
}

function displayBooks() {
    display_books = document.querySelector('#display-books')
    display_books.textContent = ""
    myLibrary.forEach ( book => {
        new_book = document.createElement('div');
        new_book.classList.add("book");
        const info = book.info().split(',');
        title = document.createElement('div');
        title.textContent = info[0];
        new_book.appendChild(title);
        author = document.createElement('div');
        author.textContent = info[1];
        new_book.appendChild(author);
        pages = document.createElement('div');
        pages.textContent = info[2];
        new_book.appendChild(pages);
        read = document.createElement('div');
        read.textContent = info[3];
        new_book.appendChild(read);
        new_book.setAttribute('id', "book" + book.id.toString())
        display_books.appendChild(new_book);
        remove_btn = addRemoveButton(book.id);
        display_books.appendChild(remove_btn);
    })
}

function addRemoveButton(id) {
    b = document.createElement('div');
    b.classList.add("remove-btn");
    remove_btn = document.createElement('button');
    remove_btn.textContent = "Remove"
    remove_btn.setAttribute("data-id", id.toString())
    remove_btn.addEventListener('click', (event) => {
        document.querySelector("#book" + event.target.dataset.id).remove()
        event.target.remove();
        for (var i = 0; i < myLibrary.length; i++) {
            if (myLibrary[i].id == id) {
                myLibrary.splice(i, 1);
            }
        }
        displayBooks();
    })
    b.appendChild(remove_btn)

    read_btn = document.createElement('button');
    read_btn.textContent = "Read";
    read_btn.setAttribute("data-id", id.toString())
    read_btn.addEventListener('click', (event) => {
        for (var i = 0; i < myLibrary.length; i++) {
            if (myLibrary[i].id == id) {
                if (myLibrary[i].read) {
                    myLibrary[i].read = false;
                } else {
                    myLibrary[i].read = true;
                }
            }
        }
        displayBooks();
    })
    b.appendChild(read_btn)

    return b;
}

function addBookAction() {
    document.querySelector("#add-book").addEventListener('click', (event) => {
        const form = document.querySelector("#add-form");
        if (form.style.display === "none") {
            form.style.display = "block";
            event.target.textContent = "Close";
        }
        else {
            form.style.display = "none";
            event.target.textContent = "Add Book"
        }

    })
}


document.addEventListener("DOMContentLoaded", () => {
    addBookAction()
    displayBooks()
});
