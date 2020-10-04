const fs = require('fs');

const book = {
    title: "Toi thay hoa vang tren co xanh",
    author: "Nguyen Nhat Anh",
}

const bookJson = JSON.stringify(book);
// console.log(bookJson, typeof bookJson);

const bookObject = JSON.parse(bookJson);
// console.log(bookObject, typeof bookObject);

fs.writeFileSync("book.json", bookJson);

const bookJsonContent = fs.readFileSync("book.json");
console.log(bookJsonContent.toString());