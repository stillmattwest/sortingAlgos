/////// STUFF FOR TESTING

// heapsort is a little different than the other sorts. It is a priority-queue that works as a binary heap
const { performance } = require('perf_hooks');
//var unsorted = [2, 5, 8, 1, 10, 3, 11, 4, 5, 8, 15, 3, 2, 20, 1, 32, 13, 40, 17, 11, 7, 6, 26];
// array of 10,000 random numbers between 1 and 1000
// runs on a 10,000 item array in 170 - 190 ms
var unsorted = Array.from({ length: 10000 }, () => Math.floor(Math.random() * 1000));
var unsorted2 = JSON.parse(JSON.stringify(unsorted));
var officialSort = unsorted2.sort((a, b) => a - b);

////////////////// THE ALGORITHM

function HeapSort(A) {
    // we need an array that starts at 1, so we take the 0 element, add it to the end, and x out the zero element
    this.q = A;
    let temp = this.q[0];
    this.q.push(temp);
    this.q[0] = 'x';
    // heapify-down
    this.heapifyDown = () => {
        let q = this.q;
        // iterate through the array right to left
        for (let i = q.length - 1; i > 1; i--) {
            // the ith element is a child node, toward the bottom of the tree
            let childNode = q[i];
            // get the index of the parent node, which is the current node / 2 rounded down
            let parentNodeIndex = Math.floor(i / 2);
            let parentNode = q[parentNodeIndex];
            if (childNode < parentNode) {
                // swap parent node and child node values
                let temp = childNode;
                q[i] = parentNode;
                q[parentNodeIndex] = temp;

            }

        }
    }

    this.extract = () => {
        let q = this.q;
        // grab the value of the root of the heap
        let result = q[1];
        // promote the last member of the heap to root
        q[1] = q.pop();
        // heapify down
        this.heapifyDown();
        return result;
    }

    this.sort = () => {
        // let q = JSON.parse(JSON.stringify(this.q)); // un-comment this if you want to run sort without destroying the heap
        let q = this.q // better run time but the heap will be destroyed by repeated extract calls
        let result = [];
        let len = q.length;
        for (let i = 0; i < len - 1; i++) {
            result.push(this.extract());
        }
        return result;
    }
}


////////////// STUFF FOR GETTING TEST RESULTS

let hs = new HeapSort(unsorted);
// build the heap
hs.heapifyDown();
/// console.log(`heap: ${hs.q}`); // if you want to see the heap itself. Use this with a very small array like [5,4,3,2,1]
let t1 = performance.now();
let mySort = hs.sort();
let t2 = performance.now();

let test = JSON.stringify(officialSort) === JSON.stringify(mySort)

// console.log(`officialSort: ${officialSort}`);
// console.log(`heapSort:${mySort}`);
console.log(`success: ${test}`);
let totalTime = t2 - t1;
console.log(`total time: ${totalTime}`);

