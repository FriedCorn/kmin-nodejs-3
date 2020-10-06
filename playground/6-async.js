// console.log('Starting');

const { waitForDebugger } = require("inspector");

// // Wait 2 seconds before running the function
// setTimeout(() => {
//     console.log('2 Seconds Timer');
// }, 2000);

// setTimeout(() => {
//     console.log("0 Second Timer");
// }, 0);

// setImmediate(() => {
//     console.log("Run immediately");
// });

// console.log('Stopping');


const print = (number) => {
    if (number > 10)
        return;
    isOven = false;
    if (number%2==0) {
        isOven = true;
    }
    const nextNumber = () => {
        console.log(number);
        print(number + 1);
    };

    setTimeout(nextNumber, (isOven) ? 2000 : 1000);
    
}

// print(1);

const wait = (ms, callback) => {
    const done = () => {
        setTimeout(() => {
            console.log("[wait] Done!");
        }, 1000);
    }

    if (ms < 0) {
        callback(true, false);
        done();
        return;
    }

    console.log("[wait] Starting");
    setTimeout(() => {
        callback(false, true);
        done();
    }, ms);
}

wait(1000, (error, done) => {
    // error: true <=> ms < 0
    // done: true <=> ms passed

    if (error) {
        console.log(`Error: ms must be positive number`);
    }
    else if (done) {
        console.log("yeah!");
    }
    // console.log("waited too long!");
});