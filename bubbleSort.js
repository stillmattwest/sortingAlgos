//////// STUFF FOR TESTING

const { performance } = require('perf_hooks');
//var unsorted = [2, 5, 8, 1, 10, 3, 11, 4, 5, 8, 15, 3, 2, 20, 1, 32, 13, 40, 17, 11, 7, 6, 26];
// array of 10,000 random numbers between 1 and 1000
// runs on a 10,000 item array in 170 - 190 ms
var unsorted = Array.from({ length: 10000 }, () => Math.floor(Math.random() * 1000));
var unsorted2 = JSON.parse(JSON.stringify(unsorted));
var officialSort = unsorted2.sort((a, b) => a - b);

// bubbleSort is O(n^2) time complexity.

///////// THE ALGORITHM

function bubbleSort(A) {
    let swapCount = 0;
    for (let i = 0; i < A.length; i++) {
        for (let j = A.length - 1; j > i; j--) {
            let current = A[j];
            let next = A[j - 1];
            if (next > current) {
                swapCount++;
                A[j] = next;
                A[j - 1] = current;
            }
        }
    }
    console.log(`swap count: ${swapCount}`); // this can be significantly higher than n. This is part of why bubbleSort is so slow, even for its time complexity.
    return A;
}

/////// STUFF FOR GETTING TEST RESULTS

let t1 = performance.now();
let mySort = bubbleSort(unsorted);
let t2 = performance.now();
let test = JSON.stringify(officialSort) === JSON.stringify(mySort)

// console.log(`officialSort: ${officialSort}`);
// console.log(`bubbleSort:${mySort}`);
console.log(`success: ${test}`);
let totalTime = t2 - t1;
console.log(`total time: ${totalTime}`);
