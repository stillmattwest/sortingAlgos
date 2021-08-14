const { performance } = require('perf_hooks');
//var unsorted = [2, 5, 8, 1, 10, 3, 11, 4, 5, 8, 15, 3, 2, 20, 1, 32, 13, 40, 17, 11, 7, 6, 26];
// array of 10,000 random numbers between 1 and 1000
var unsorted = Array.from({ length: 10000 }, () => Math.floor(Math.random() * 1000));
var unsorted2 = JSON.parse(JSON.stringify(unsorted));
var officialSort = unsorted2.sort((a, b) => a - b);
// runs on a 10,000 item array in around 37 - 38ms
function sortingFunction(A) {
    // all we need is a for loop and a while loop
    // the for loop makes sure we check all array elements
    // the while loop handles the right-shifting
    // we only need to shift right if the element to the left is smaller
    for (let i = 1; i < A.length; i++) {
        let current = A[i];
        let index = i - 1;
        while (index > -1 && current < A[index]) {
            A[index + 1] = A[index]; // shift A[index] to the right
            index--; // we decrement index until it hits the beginning of the array
        }
        // insert current into the array
        A[index + 1] = current;
    }

    return A;
};

let t1 = performance.now();
let mySort = sortingFunction(unsorted);
let t2 = performance.now();
let test = JSON.stringify(officialSort) === JSON.stringify(mySort);


// console.log(`officialSort: ${officialSort}`);
// console.log(`mySort:${mySort}`)
console.log(`success: ${test}`);
let totalTime = t2 - t1;
console.log(`total time: ${totalTime}`);