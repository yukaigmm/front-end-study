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
module.exports = {
    chunk,
    compact,
    concat,
    difference,
    drop,
    dropRight,
    fill,
}
// differenceBy,differenceWith,dropRightWhile,dropWhile