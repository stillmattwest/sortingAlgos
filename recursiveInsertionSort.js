///////// STUFF FOR TESTING

const { performance } = require('perf_hooks');
//var unsorted = [2, 5, 8, 1, 10, 3, 11, 4, 5, 8, 15, 3, 2, 20, 1, 32, 13, 40, 17, 11, 7, 6, 26];
// array of 10,000 random numbers between 1 and 1000
var unsorted = Array.from({ length: 1000 }, () => Math.floor(Math.random() * 1000));
var unsorted2 = JSON.parse(JSON.stringify(unsorted));
var officialSort = unsorted2.sort((a, b) => a - b);
// this algorithm won't even run on a 10,000 item array because of the maximum call stack size. 

///////// THE ALGORITHM

function sortingFunction(A) {
    function insertionSort(arr, index) {
        if (index === 0) {
            // no positions below 0, so we're done
            return arr;
        }
        // recurse once for each element
        insertionSort(arr, index - 1);
        let currentElement = A[index];
        let nextIndex = index - 1; // this is the important value. We'll reference this a lot
        // check the array until we find a smaller number or reach the end
        while (currentElement < arr[nextIndex] && nextIndex >= 0) {
            arr[nextIndex + 1] = arr[nextIndex];
            nextIndex--;
        }
        // now we need to insert our temp value into the last position we right-shifted
        // we target nextIndex +1 because we decrement nextIndex at the end of each loop
        arr[nextIndex + 1] = currentElement;
        return arr;
    }
    // replace code below with whatever sort you want
    A = insertionSort(A, A.length - 1);
    // don't forget to return the array
    return A;
};

//////// STUFF FOR GETTING TEST RESULTS

let t1 = performance.now();
let mySort = sortingFunction(unsorted);
let t2 = performance.now();
let test = JSON.stringify(officialSort) === JSON.stringify(mySort);


// console.log(`officialSort: ${officialSort}`);
// console.log(`mySort:${mySort}`)
console.log(`success: ${test}`);
let totalTime = t2 - t1;
console.log(`total time: ${totalTime}`);