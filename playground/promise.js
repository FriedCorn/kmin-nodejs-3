function getRandomNumber([min, max]) {
    return new Promise((resolve, reject) => {
        const random = Math.floor(Math.random() * (max - min) + min);
        resolve(random);
    });
}
function checkOddNumber(number) {
    return new Promise((resolve, reject) => {
        const isOdd = !!(number % 2);
        resolve([number, isOdd]);
    });
}
// console.log(checkOddNumber(getRandomNumber(1,100)));
getRandomNumber([1, 100])
    .then(checkOddNumber)
    .then(([theNumber, isOdd]) => {
        if (isOdd)
            console.log(`${theNumber} is an odd number`);
        else
            console.log(`${theNumber} is an even number`)
    })
    .catch((error) => {
        console.error(error);
    })
