const e = 10000000
// 1
console.time('Array test1: [].push()');
let arr1 = []
for (let i = 0; i < e; i++) {
  arr1.push(i)
}
console.timeEnd('Array test1: [].push()');
// 2
console.time('Array test2: new Array[i]=i');
let arr2 = new Array(e)
for (let i = 0; i < e; i++) {
  arr2[i] = i
}
console.timeEnd('Array test2: new Array[i]=i');
// 3
console.time('Array test3: create []s');
for (let i = 0; i < e; i++) {
  var arr3 = []
}
console.timeEnd('Array test3: create []s');
// 4
console.time('Array test4: create new Arrays');
for (let i = 0; i < e; i++) {
  var arr4 = new Array()
}
console.timeEnd('Array test4: create new Arrays');

// Array test1: [].push(): 274.919ms
// Array test2: new Array[i]=i: 84.552ms
// Array test3: create []s: 87.996ms
// Array test4: create new Arrays: 83.143ms