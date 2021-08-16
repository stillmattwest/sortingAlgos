//////////// STUFF FOR TESTING

const { performance } = require('perf_hooks');
var unsorted = [2, 5, 8, 1, 10, 3, 11, 4, 5, 8, 15, 3, 2, 20, 1, 32, 13, 40, 17, 11, 7, 6, 26];
// array of 10,000 random numbers between 1 and 1000
//var unsorted = Array.from({ length: 10000 }, () => Math.floor(Math.random() * 1000));
var unsorted2 = JSON.parse(JSON.stringify(unsorted));
var officialSort = unsorted2.sort((a, b) => a - b);


///////// THE ALGORITHM

// function sortingFunction(A) {
//     // the merge helper function. This is where the magic happens
//     function merge(left, right) {
//         let result = [];
//         // we're going to shrink our subarrays from the left with Array.shift(). Our loop runs as long as both still have length left
//         while (left.length && right.length) {
//             // pick the smaller among the smallest elements of left and right
//             if (left[0] < right[0]) {
//                 result.push(left.shift());
//             } else {
//                 result.push(right.shift());
//             }
//         }
//         // now we just return result, concatenated with anything left over in left or right (which would be the last element and thus the largest)
//         return [...result, ...left, ...right];
//     }

//     // break array in half
//     if (A.length < 2) {
//         // the array is already trivially small
//         return A;
//     }
//     const midPoint = Math.floor(A.length / 2);
//     const left = A.splice(0, midPoint);
//     // now merge them back together. This is a recursive call
//     return merge(sortingFunction(left), sortingFunction(A));
// };

// lets try this with pointers instead of Array.shift
function sortingFunction(A) {
    // the merge helper function. This is where the magic happens
    function merge(left, right) {
        let result = [];
        let leftPointer = 0;
        let rightPointer = 0;
        while (leftPointer < left.length && rightPointer < right.length) {
            // pick the smaller among the smallest elements of left and right
            if (left[leftPointer] < right[rightPointer]) {
                result.push(left[leftPointer]);
                leftPointer++;
            } else {
                result.push(right[rightPointer]);
                rightPointer++
            }
        }
        // now we just return result, concatenated with anything left over in left or right (which would be the last element and thus the largest)
        let leftArr = left.slice(leftPointer)
        let rightArr = right.slice(rightPointer)
        return [...result, ...leftArr, ...rightArr];
    }

    // break array in half
    if (A.length < 2) {
        // the array is already trivially small
        return A;
    }
    const midPoint = Math.floor(A.length / 2);
    const left = A.splice(0, midPoint);
    // now merge them back together. This is a recursive call
    return merge(sortingFunction(left), sortingFunction(A));
};

////////// STUFF FOR GETTING TEST RESULTS

let t1 = performance.now();
let mySort = sortingFunction(unsorted);
let t2 = performance.now();
let test = JSON.stringify(officialSort) === JSON.stringify(mySort);


console.log(`officialSort: ${officialSort}`);
console.log(`mySort:${mySort}`)
console.log(`success: ${test}`);
let totalTime = t2 - t1;
console.log(`total time: ${totalTime}`);