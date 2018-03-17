const LinkedList = require('./1-3LinkedListExtend')

class Queue extends LinkedList {
  constructor() {
    super()
  }
  shift() {
    if (!this.head) return null
    const nodeToPop = this.head
    if (this.head === this.tail) {
      this.head = null
      this.tail = null
    } else {
      this.head = this.head.next
      this.head.prev = null
    }
    return nodeToPop.value
  }
}

function queueTest() {
  const q = new Queue()

  console.time('Queue push test')
  for (let i = 0; i < 1000000; i++) {
    q.push(i)
  }
  console.timeEnd('Queue push test')

  console.time('Queue shift test')
  for (let i = 0; i < 1000000; i++) {
    q.shift()
  }
  console.timeEnd('Queue shift test')
}

// queueTest() 
/* 
	Queue push test: 194.251ms
	Queue shift test: 17.692ms
*/

function queueTest2() {
  let a = [87, 1, 9, 81, 19, 277, 34, 521, 1255, 75]

  // 这是排序算法，从个位数开始往上，按升序排列进对应的队列中。相同的位数将会排列进相同的队列中，顺序由低一位数决定。当遍历过所有位数之后自然就是升序排列了
  const qs = []

  for (let i = 0; i < 10; i++) { // 每位数可能是0～9
    qs.push(new Queue())
  }

  for (let i = 0; i < 4; i++) { // 此处的i必须大于a中最大数的位数
    for (const n of a) {
      const index = Math.floor(n / Math.pow(10, i) % 10) // 取出a中数字n的第i位数字
      // console.log(i + ":" + index)
      qs[index].push(n)
    }
    // console.log(qs)
    const r = []
    for (const q of qs) {
      let n = q.shift()
      while (n) {
        r.push(n)
        n = q.shift()
      }
    }
    a = r
  }
  console.log(a)
}

queueTest2()