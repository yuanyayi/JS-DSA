const LinkedList = require('./1-3LinkedListExtend')

class HashTable {
  constructor() {
    // 常见处理链表重复的代码：
    // 用数组加链表的方式解决储存数据相同的问题。
    // 在链表的一个位置上放置一个数组，如果有重复的数据，则arr.push(n)
    this.arr = new Array(10)
    for (let i = 0; i < 10; i++) {
      this.arr[i] = new LinkedList()
    }
  }
  set(n) {
    const hashCode = this.hashCode(n)
    const linkedlist = this.arr[hashCode]
    linkedlist.push(n)
  }
  get(n) {
    const hashCode = this.hashCode(n)
    const linkedlist = this.arr[hashCode]
    let head = linkedlist.head
    if(!head) return null
    while (head.value !== n) {
      head = head.next
    }

    return head.value
  }
  delete() {
  	// LinkedList暂时不能支持，需要更新。
  }
  hashCode(n) {
    // 实现简单的哈希算法（算法导论相关章节，好多数学【囧】）
    return n % 10
  }

  toString(){
  	let str = ''
  	let r = this.arr.map(function(value,index,arr){
  		console.log(value)
  	})
  	return r
  }
}

// 命名使用驼峰命名法比较好
function hashTableTest(){
	const hashTable = new HashTable()

	hashTable.set(1)
	hashTable.set(2)
	hashTable.set(25)
	hashTable.set(5)
	hashTable.set(9)
	hashTable.set(23)
	hashTable.set(41)
	hashTable.set(3)

	console.log(hashTable.toString())
}

hashTableTest()

/*
// 一个简单的哈希算法：
const result = new Array(50)
const a = [35, 82, 15, 7, 9]
const k = 10
for (let value of a) {
  result[value % k] = value
}
console.log(result)
*/