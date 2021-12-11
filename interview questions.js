//#region  interview question 1

// setTimeout(() => console.log('A'), 0)
// console.log('B')

// setTimeout(() => console.log('C'), 100)
// setTimeout(() => console.log('D'), 0)
// let i = 0;

// while (i < 1000000000) { // Assume this takes ~500ms
//   let ignore = Math.sqrt(i)
//   i++
// }
// console.log('E')

// /* MY answer was below but correct answer is B E A D C
// B
// A
// D
// E
// C
// */

//#endregion

const t1 = setTimeout(() => {
  console.log('t1')
}, 1000000)

const t2 = setTimeout(() => {
  console.log('t2')
}, 2000000)

t1.unref()

clearTimeout(t2)