///////// STUFF FOR TESTING

const { performance } = require('perf_hooks');
//var unsorted = [2, 5, 8, 1, 10, 3, 11, 4, 5, 8, 15, 3, 2, 20, 1, 32, 13, 40, 17, 11, 7, 6, 26];
// array of 10,000 random numbers between 1 and 1000
var unsorted = Array.from({ length: 10000 }, () => Math.floor(Math.random() * 1000));
var unsorted2 = JSON.parse(JSON.stringify(unsorted));
var officialSort = unsorted2.sort((a, b) => a - b);

// selection sort goes through the array repeatedly (n times) and sorts as it goes. O(n^2) complexity.

////// THE ALGORITHM

function selectionSort(A) {
    let swapCount = 0;
    for (let i = 0; i < A.length; i++) {
        let min = i;
        for (let j = i; j < A.length; j++) {
            if (A[j] < A[min]) {
                min = j;
            }
        }
        // swapping
        if (min !== i) {
            let temp = A[i];
            A[i] = A[min];
            A[min] = temp;
            swapCount++;
        }
    }

    console.log(`swap count: ${swapCount}`); // this should never be greater than n
    return A;
};

////////// STUFF FOR GETTING TEST RESULTS

let t1 = performance.now();
let mySort = selectionSort(unsorted);
let t2 = performance.now();
let test = JSON.stringify(officialSort) === JSON.stringify(mySort)


// console.log(`officialSort: ${officialSort}`);
// console.log(`mySort:${mySort}`)
console.log(`success: ${test}`);
let totalTime = t2 - t1;
console.log(`total time: ${totalTime}`);