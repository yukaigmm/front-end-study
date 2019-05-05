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
module.exports = {
    chunk
}