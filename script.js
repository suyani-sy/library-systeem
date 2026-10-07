let books = JSON.parse(localStorage.getItem("books")) || [
    {
        id: 1,
        title: "The Alchemist",
        author: "Paulo Coelho",
        category: "Fiction",
        status: "Available"
    },
    {
        id: 2,
        title: "Atomic Habits",
        author: "James Clear",
        category: "Self Help",
        status: "Available"
    },
    {
        id: 3,
        title: "Rich Dad Poor Dad",
        author: "Robert Kiyosaki",
        category: "Finance",
        status: "Available"
    }
];



let students = JSON.parse(localStorage.getItem("students")) || [
    {
        id: 1,
        name: "Rahul Sharma",
        email: "rahul@example.com",
        phone: "9876543210"
    },
    {
        id: 2,
        name: "Priya Singh",
        email: "priya@example.com",
        phone: "9876543211"
    }
];


// Get issued books
let issuedBooks = JSON.parse(localStorage.getItem("issuedBooks")) || [];




function saveData() {

    localStorage.setItem(
        "books",
        JSON.stringify(books)
    );

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

    localStorage.setItem(
        "issuedBooks",
        JSON.stringify(issuedBooks)
    );
}




function showSection(sectionId) {

    // Hide all sections
    const sections = document.querySelectorAll(".section");

    sections.forEach(function(section) {
        section.classList.remove("active-section");
    });


    // Show selected section
    document
        .getElementById(sectionId)
        .classList.add("active-section");


    // Remove active class from buttons
    const buttons = document.querySelectorAll(".nav-btn");

    buttons.forEach(function(button) {
        button.classList.remove("active");
    });


    // Find clicked navigation button
    const activeButton = document.querySelector(
        `.nav-btn[onclick="showSection('${sectionId}')"]`
    );

    if (activeButton) {
        activeButton.classList.add("active");
    }


    // Refresh page data
    updateDashboard();
    displayBooks();
    displayStudents();
    displayIssuedBooks();
    updateIssueForm();
}




function updateDashboard() {

    const totalBooks = books.length;

    const issuedCount = books.filter(function(book) {
        return book.status === "Issued";
    }).length;

    const availableCount = books.filter(function(book) {
        return book.status === "Available";
    }).length;


    document.getElementById("totalBooks").textContent =
        totalBooks;

    document.getElementById("availableBooks").textContent =
        availableCount;

    document.getElementById("issuedBooks").textContent =
        issuedCount;

    document.getElementById("totalStudents").textContent =
        students.length;
}




function displayBooks(bookList = books) {

    const table = document.getElementById("booksTable");

    table.innerHTML = "";


    if (bookList.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="6" class="empty">
                    No books found.
                </td>
            </tr>
        `;

        return;
    }


    bookList.forEach(function(book) {

        const row = document.createElement("tr");


        let statusClass =
            book.status === "Available"
                ? "available"
                : "issued";


        row.innerHTML = `

            <td>${book.id}</td>

            <td>
                <strong>${book.title}</strong>
            </td>

            <td>${book.author}</td>

            <td>${book.category}</td>

            <td>
                <span class="status ${statusClass}">
                    ${book.status}
                </span>
            </td>

            <td>

                <button
                    class="danger-btn"
                    onclick="deleteBook(${book.id})"
                >
                    Delete
                </button>

            </td>
        `;


        table.appendChild(row);
    });
}


/* =====================================
   SEARCH BOOKS
===================================== */

function searchBooks() {

    const searchText =
        document
            .getElementById("bookSearch")
            .value
            .toLowerCase();


    const filteredBooks = books.filter(function(book) {

        return (
            book.title.toLowerCase().includes(searchText) ||
            book.author.toLowerCase().includes(searchText) ||
            book.category.toLowerCase().includes(searchText)
        );

    });


    displayBooks(filteredBooks);
}


/* =====================================
   OPEN BOOK MODAL
===================================== */

function openBookModal() {

    document.getElementById("bookModal").style.display =
        "flex";
}


/* =====================================
   CLOSE BOOK MODAL
===================================== */

function closeBookModal() {

    document.getElementById("bookModal").style.display =
        "none";
}


/* =====================================
   ADD BOOK
===================================== */

document
    .getElementById("bookForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const title =
            document.getElementById("bookTitle").value.trim();

        const author =
            document.getElementById("bookAuthor").value.trim();

        const category =
            document.getElementById("bookCategory").value.trim();


        // Create new ID
        const newId =
            books.length > 0
                ? Math.max(...books.map(book => book.id)) + 1
                : 1;


        const newBook = {

            id: newId,

            title: title,

            author: author,

            category: category,

            status: "Available"

        };


        books.push(newBook);


        saveData();

        displayBooks();

        updateDashboard();


        // Clear form
        document.getElementById("bookForm").reset();


        // Close modal
        closeBookModal();


        alert("Book added successfully!");
    });


/* =====================================
   DELETE BOOK
===================================== */

function deleteBook(bookId) {

    const book = books.find(function(book) {
        return book.id === bookId;
    });


    if (!book) {
        return;
    }


    // Don't allow deleting issued book
    if (book.status === "Issued") {

        alert(
            "This book is currently issued. Return it before deleting."
        );

        return;
    }


    const confirmDelete =
        confirm(
            `Are you sure you want to delete "${book.title}"?`
        );


    if (!confirmDelete) {
        return;
    }


    books = books.filter(function(book) {
        return book.id !== bookId;
    });


    saveData();

    displayBooks();

    updateDashboard();
}


/* =====================================
   DISPLAY STUDENTS
===================================== */

function displayStudents() {

    const table =
        document.getElementById("studentsTable");


    table.innerHTML = "";


    if (students.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="5">
                    No students found.
                </td>
            </tr>
        `;

        return;
    }


    students.forEach(function(student) {

        const row = document.createElement("tr");


        row.innerHTML = `

            <td>${student.id}</td>

            <td>
                <strong>${student.name}</strong>
            </td>

            <td>${student.email}</td>

            <td>${student.phone}</td>

            <td>

                <button
                    class="danger-btn"
                    onclick="deleteStudent(${student.id})"
                >
                    Delete
                </button>

            </td>
        `;


        table.appendChild(row);
    });
}


/* =====================================
   OPEN STUDENT MODAL
===================================== */

function openStudentModal() {

    document.getElementById("studentModal").style.display =
        "flex";
}


/* =====================================
   CLOSE STUDENT MODAL
===================================== */

function closeStudentModal() {

    document.getElementById("studentModal").style.display =
        "none";
}


/* =====================================
   ADD STUDENT
===================================== */

document
    .getElementById("studentForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const name =
            document
                .getElementById("studentName")
                .value
                .trim();


        const email =
            document
                .getElementById("studentEmail")
                .value
                .trim();


        const phone =
            document
                .getElementById("studentPhone")
                .value
                .trim();


        const newId =
            students.length > 0
                ? Math.max(...students.map(student => student.id)) + 1
                : 1;


        const newStudent = {

            id: newId,

            name: name,

            email: email,

            phone: phone

        };


        students.push(newStudent);


        saveData();

        displayStudents();

        updateDashboard();

        updateIssueForm();


        document
            .getElementById("studentForm")
            .reset();


        closeStudentModal();


        alert("Student added successfully!");
    });


/* =====================================
   DELETE STUDENT
===================================== */

function deleteStudent(studentId) {

    // Check if student has an issued book
    const hasIssuedBook =
        issuedBooks.some(function(issue) {
            return issue.studentId === studentId;
        });


    if (hasIssuedBook) {

        alert(
            "This student has an issued book. Return the book first."
        );

        return;
    }


    const confirmDelete =
        confirm(
            "Are you sure you want to delete this student?"
        );


    if (!confirmDelete) {
        return;
    }


    students = students.filter(function(student) {
        return student.id !== studentId;
    });


    saveData();

    displayStudents();

    updateDashboard();

    updateIssueForm();
}


/* =====================================
   UPDATE ISSUE FORM
===================================== */

function updateIssueForm() {

    const studentSelect =
        document.getElementById("issueStudent");

    const bookSelect =
        document.getElementById("issueBook");


    // Reset student dropdown
    studentSelect.innerHTML = `
        <option value="">
            -- Select Student --
        </option>
    `;


    // Add students
    students.forEach(function(student) {

        const option =
            document.createElement("option");


        option.value = student.id;

        option.textContent =
            `${student.name} - ${student.email}`;


        studentSelect.appendChild(option);
    });


    // Reset book dropdown
    bookSelect.innerHTML = `
        <option value="">
            -- Select Available Book --
        </option>
    `;


    // Add available books
    const availableBooks =
        books.filter(function(book) {
            return book.status === "Available";
        });


    availableBooks.forEach(function(book) {

        const option =
            document.createElement("option");


        option.value = book.id;

        option.textContent =
            `${book.title} - ${book.author}`;


        bookSelect.appendChild(option);
    });
}


/* =====================================
   ISSUE BOOK
===================================== */

document
    .getElementById("issueForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const studentId =
            Number(
                document.getElementById("issueStudent").value
            );


        const bookId =
            Number(
                document.getElementById("issueBook").value
            );


        const issueDate =
            document.getElementById("issueDate").value;


        if (!studentId || !bookId || !issueDate) {

            alert("Please fill all fields.");

            return;
        }


        const book =
            books.find(function(book) {
                return book.id === bookId;
            });


        const student =
            students.find(function(student) {
                return student.id === studentId;
            });


        if (!book || !student) {

            alert("Invalid student or book.");

            return;
        }


        // Change book status
        book.status = "Issued";


        // Create issue record
        const newIssue = {

            id:
                issuedBooks.length > 0
                    ? Math.max(
                        ...issuedBooks.map(issue => issue.id)
                    ) + 1
                    : 1,

            bookId: bookId,

            studentId: studentId,

            issueDate: issueDate

        };


        issuedBooks.push(newIssue);


        saveData();


        // Clear form
        document
            .getElementById("issueForm")
            .reset();


        updateDashboard();

        displayBooks();

        displayIssuedBooks();

        updateIssueForm();


        alert(
            `"${book.title}" has been issued to ${student.name}.`
        );
    });


/* =====================================
   DISPLAY ISSUED BOOKS
===================================== */

function displayIssuedBooks() {

    const table =
        document.getElementById("issuedTable");


    table.innerHTML = "";


    if (issuedBooks.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="4">
                    No books are currently issued.
                </td>
            </tr>
        `;

        return;
    }


    issuedBooks.forEach(function(issue) {

        const book =
            books.find(function(book) {
                return book.id === issue.bookId;
            });


        const student =
            students.find(function(student) {
                return student.id === issue.studentId;
            });


        if (!book || !student) {
            return;
        }


        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                <strong>${book.title}</strong>
                <br>
                <small>${book.author}</small>
            </td>

            <td>${student.name}</td>

            <td>${issue.issueDate}</td>

            <td>

                <button
                    class="return-btn"
                    onclick="returnBook(${issue.id})"
                >
                    Return
                </button>

            </td>
        `;


        table.appendChild(row);
    });
}


/* =====================================
   RETURN BOOK
===================================== */

function returnBook(issueId) {

    const issue =
        issuedBooks.find(function(issue) {
            return issue.id === issueId;
        });


    if (!issue) {
        return;
    }


    const book =
        books.find(function(book) {
            return book.id === issue.bookId;
        });


    if (book) {

        book.status = "Available";
    }


    // Remove issue record
    issuedBooks =
        issuedBooks.filter(function(issue) {
            return issue.id !== issueId;
        });


    saveData();


    displayIssuedBooks();

    displayBooks();

    updateDashboard();

    updateIssueForm();


    alert("Book returned successfully!");
}


/* =====================================
   CLOSE MODAL WHEN CLICKING OUTSIDE
===================================== */

window.onclick = function(event) {

    const bookModal =
        document.getElementById("bookModal");

    const studentModal =
        document.getElementById("studentModal");


    if (event.target === bookModal) {

        closeBookModal();
    }


    if (event.target === studentModal) {

        closeStudentModal();
    }
};


/* =====================================
   SET TODAY'S DATE
===================================== */

function setTodayDate() {

    const today =
        new Date().toISOString().split("T")[0];


    document.getElementById("issueDate").value =
        today;
}


/* =====================================
   INITIALIZE WEBSITE
===================================== */

function initializeApp() {

    updateDashboard();

    displayBooks();

    displayStudents();

    displayIssuedBooks();

    updateIssueForm();

    setTodayDate();
}


// Start application
initializeApp();