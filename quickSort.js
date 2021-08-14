/////// STUFF FOR TESTING
const { performance } = require('perf_hooks');
//var unsorted = [2, 5, 8, 1, 10, 3, 11, 4, 5, 8, 15, 3, 2, 20, 1, 32, 13, 40, 17, 11, 7, 6, 26]; // 23 items
// array of 10,000 random numbers between 1 and 1000
var unsorted = Array.from({ length: 10000 }, () => Math.floor(Math.random() * 1000));
var unsorted2 = JSON.parse(JSON.stringify(unsorted));
var officialSort = unsorted2.sort((a, b) => a - b);


///// THE ALGORITHM

function sortingFunction(A, start, end) {

    // the partition function is where we do all the work
    function partition(arr, start, end) {
        // always take the last element as the pivot
        const pivotValue = arr[end]; // this doesn't change during loop
        let pivotIndex = start; // this increments in the loop whenever we do a swap
        for (let i = start; i < end; i++) {
            // The purpose of partition is to place the pivot in the correct spot in the array. To the left, all the numbers should be smaller. To the right, all numbers should be greater or equal.
            if (arr[i] < pivotValue) {
                // swapping elements
                // this part is a little counter-intuitive. If arr[i] is less than the pivotValue, it moves arr[i] all the way to the pivotIndex. This ensures that all values smaller than the pivot end up on the left.
                [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
                // since we don't increment the pivotIndex when a number is larger than the pivot, the numbers to the right of the pivotIndex at the end of the loop will all be larger
                pivotIndex++;
            }
        }

        // swap the element at the pivot index with the one at the end. This puts the pivot in the correct place in the array.
        [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]];
        return pivotIndex;
    }

    if (start >= end) {
        // we've gone through the whole array
        return;
    }

    // partition returns an index value
    let index = partition(A, start, end)

    // here we're dividing our array into two subarrays.
    // one will start at the first element of the array
    // the other will start at the pivot point of the array
    // since we're sending A each time, A will be continually mutating
    sortingFunction(A, start, index - 1);
    sortingFunction(A, index + 1, end)

    return A;
};


/////// STUFF FOR GETTING TEST RESULTS

let t1 = performance.now();
let mySort = sortingFunction(unsorted, 0, unsorted.length - 1);
let t2 = performance.now();
let test = JSON.stringify(officialSort) === JSON.stringify(mySort);


// console.log(`officialSort: ${officialSort}`);
// console.log(`mySort:${mySort}`)
console.log(`success: ${test}`);
let totalTime = t2 - t1;
console.log(`total time: ${totalTime}`);