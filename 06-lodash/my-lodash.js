//  Creates an array of elements split into groups the length of size. If array can't be split evenly, the final chunk will be the remaining elements.
const chunk =  (array, size = 1) => {
    let arrLength = Math.ceil(array.length / size);
    let arr = [];
    for(let i = 1; i <= arrLength; i++){
        arr.push(array.slice(i*size - size, i*size));
    };
    return arr;
}

// const chunk = (array, size) => {
//     let count = -1;
//     let arr = [];
//     array.forEach((item, index) => {
//         if(index % size === 0){
//             count++;
//             arr[count] = []
//         }
//         arr[count].push(item);
//     })
//     return arr;
// }

// Creates an array with all falsey values removed. The values false, null, 0, "", undefined, and NaN are falsey.
const compact = (array) => {
    if(!array)return[];
    return array.filter((item) => {
        return !!item;
    })
}

// Creates a new array concatenating array with any additional arrays and/or values.
function concat () {
    return [].concat.apply([],arguments)
}
// flatten
function flatten(){
    let arr = [];
    function getArrItems (array){
        for(let item of array){
            if(item instanceof Array){
                getArrItems(item)
            }else{
                arr.push(item);
            }
        }
    };
    for(let item of arguments){
        if(item instanceof Array){
            getArrItems(item)
        }else{
            arr.push(item)
        }
    };
    return arr;
}

// 
function difference(array, ...values){
    console.log(values);
    let arr = flatten(values);
    console.log(arr);
    return array.filter((item) => {
        return !arr.includes(item);
    })
}

// Creates a slice of array with n elements dropped from the beginning.
function drop(array, n=1){
    if(n > array.length){
        return [];
    }
    return array.slice(n);
}

// Creates a slice of array with n elements dropped from the end.
function dropRight(array, n=1){
    if(n > array.length){
        return [];
    }
    return array.slice(0, array.length-n);
}

// Fills elements of array with value from start up to, but not including, end.
function fill (array, value, start=0, end){
    let fillEnd = end || array.length;
    let arr = [];
    for(let i = 0, len = array.length; i < len; i++){
        if(i >= start && i < fillEnd){
            arr.push(value);
        }else{
            arr.push(array[i])
        }
    }
    return arr;
}

// The inverse of _.toPairs; this method returns an object composed from key-value pairs.
function fromPairs (array){
    let obj = {};
    array.forEach((item) => {
        if(item instanceof Array){
            obj[item[0]]= item[1]
        }
    });
    return obj;
}

// Gets the first element of array.
function head (array) {
    return array[0];
}

// Gets the index at which the first occurrence of value is found in array using SameValueZero for equality comparisons. If fromIndex is negative, it's used as the offset from the end of array.
function indexOf (array, value, start=0){
    return array.indexOf(value, start);
}

// Gets all but the last element of array.
function initial(array){
    return array.slice(0, -1);
}

// Creates an array of unique values that are included in all given arrays using SameValueZero for equality comparisons. The order and references of result values are determined by the first array.
function intersection(array, ...arrays){
    let arr = [];
    for(let item of arrays){
        arr.push(item);
    }
    return array.filter((item) => {
        return arr.every((a) => {
            return a.includes(item);
        })
    })
};
// Converts all elements in array into a string separated by separator.
function join (array, sep=",") {
    return array.join(sep);
}

// Gets the last element of array.
function last(array) {
    return array[array.length - 1];
}

// This method is like _.indexOf except that it iterates over elements of array from right to left.
function lastIndexOf(array, value, index){
    let i = index || array.length -1;
    return array.lastIndexOf(value, i);
}

// Gets the element at index n of array. If n is negative, the nth element from the end is returned.
function nth(array, n){
    return n < 0 ? array[array.length + n] : array[n];
}

// Removes all given values from array using SameValueZero for equality comparisons.
function pull(array, ...values){
    let arr = [];
    for(let item of values){
        arr.push(item);
    };
    return array.filter((item) => {
        return arr.indexOf(item) === -1;
    })
}

// This method is like _.pull except that it accepts an array of values to remove.
function pullAll (array, values){
    for(let i = array.length - 1; i >=0; i--){
        if(values.indexOf(array[i]) !== -1){
            array.splice(i, 1);
        }
    };
    return array;
}

// Removes elements from array corresponding to indexes and returns an array of removed elements.
function pullAt(array, indexes){
    let arr = [];
    for(let i = array.length - 1; i >=0; i--){
        if(indexes.indexOf(i) !== -1){
            arr.unshift(array.splice(i, 1)[0]);
        }
    };
    return arr;
}

// Reverses array so that the first element becomes the last, the second element becomes the second to last, and so on.
function reverse(array) {
    let len = array.length;
    let halfLen = Math.floor(len/2);
    for(let i = 0; i< halfLen; i ++){
        let item = array[i];
        array[i] = array[len - 1 - i];
        array[len - 1-i] = item;
    };
    return array;
}

// Creates a slice of array from start up to, but not including, end.
function slice (array, start=0, end){
    let sliceEnd = end === undefined ? array.length : end;
    return array.slice(start, sliceEnd);
}

// Uses a binary search to determine the lowest index at which value should be inserted into array in order to maintain its sort order.
function sortedIndex (array, value) {
    let sortIndex = 0;
    for(let i = 0, len = array.length; i < len; i++){
        if(value > array[i]){
            sortIndex = i + 1
        }else{
            break;
        }
    }
    return sortIndex;
}

// This method is like _.indexOf except that it performs a binary search on a sorted array.
module.exports = {
    chunk,
    compact,
    concat,
    difference,
    drop,
    dropRight,
    fill,
    flatten,
    fromPairs,
    head,
    indexOf,
    initial,
    intersection,
    join,
    last,
    lastIndexOf,
    nth,
    pull,
    pullAll,
    pullAt,
    reverse,
    slice,
    sortedIndex
}
// differenceBy,differenceWith,dropRightWhile,dropWhile,findIndex,findLastIndex,intersectionBy,intersectionWith,pullAllBy,pullAllWith,remove,sortedIndexBy,sortedLastIndexBy