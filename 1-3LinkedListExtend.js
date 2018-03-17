// 实现一个链表结构

/* 封装一个类要注意将能执行的功能开放出来，内部实现封装进去。无论内部实现如何更改，要让外部表现尽量保持一致。 */

class Node {
  constructor(value, next, prev) {
    this.value = value
    this.next = next
    this.prev = prev
  }
}

class LinkedList {
  constructor() {
    this.head = null
    this.tail = null
  }

  insert(value, afterValue) {
    const nodeToInsert = new Node(value, null)
    if (!this.head) {
      this.head = nodeToInsert
      this.tail = nodeToInsert
      return
    }
    const node = this._findNode(afterValue)
    const originalNext = node.next
    node.next = nodeToInsert
    if (originalNext) {
      nodeToInsert.next = originalNext
      originalNext.prev = nodeToInsert
    } else {
      this.tail = nodeToInsert
    }
  }
  // 私有方法
  _findNode(value) {
    if (!this.head) return null
    let cur = this.head
    while (cur) {
      if (cur.value === value) return cur
      cur = cur.next || null
    }
    return null
  }

  // _findPrevNode(value) {...}
  // ==>(this._findNode.prev)

  push(value) {
    const nodeToPush = new Node(value, null)
    if (!this.tail) {
      this.head = nodeToPush
      this.tail = nodeToPush
      return
    }
    this.tail.next = nodeToPush
    nodeToPush.prev = this.tail
    this.tail = nodeToPush
  }

  pop() {
    if (!this.tail) return null
    const nodeToPop = this.tail
    if (this.tail === this.head) {
      this.tail = null
      this.head = null
    } else {
      this.tail = this.tail.prev
      this.tail.next = null
    }
    return nodeToPop.value
  }

  remove(value) {
    const nodeToRemove = this._findNode(value)
    if (!nodeToRemove) return false
    let prevNode = nodeToRemove.prev
    let nextNode = nodeToRemove.next

    if (prevNode && nextNode) {
      prevNode.next = nextNode
      nextNode.prev = prevNode
      nodeToRemove.next = null
      nodeToRemove.prev = null
    } else if (!prevNode && nextNode) {
      nodeToRemove.next = null
      nextNode.prev = null
      this.head = nextNode
    } else if (prevNode && !nextNode) {
      nodeToRemove.prev = null
      prevNode.next = null
      this.tail = prevNode
    }
    return true
  }

  toString() {
    let cur = this.head
    let str = ''
    while (cur) {
      str += cur.value.toString()
      cur = cur.next || null
    }
    return str
  }
}

module.exports = LinkedList

/*
 * 链表都是引用，所以在修改时仅需要改变引用就好，无需重新分配内存，速度加快。
 * 为了做push功能（从队尾插入）增加一个tail。
 */

// 测试部分不应该出现在这里
// function ArrayTests() {
//   const arr = new Array(100000)

//   for (let i = 0; i < 100000; i++) {
//     arr[i] = i
//   } //3.083ms

//   console.time('Test for array functions');

//   // for (let i = 0; i < 100000; i++) {
//   //   arr.shift()
//   // } // 4290.445ms
//   // shift操作非常耗费时间！耗费的时间呈指数增长。

//   // for (let i = 0; i < 100000; i++) {
//   //   arr.unshift(i)
//   // } // 13753.581ms
//   // unshift操作非常耗费时间！耗费的时间呈指数增长。

//   // for (let i = 0; i < 100000; i++) {
//   //   arr.pop()
//   // } // 1.594ms

//   for (let i = 0; i < 100000; i++) {
//     arr.push(i)
//   } // 3.624ms

//   console.timeEnd('Test for array functions');

// }

// function linkedListTests() {
//   const ll = new LinkedList

//   console.time('Test for linkedlist push()')
//   for (let i = 0; i < 100000; i++) {
//     ll.push(i)
//   } //13.106ms
//   console.timeEnd('Test for linkedlist push()')

//   console.time('Test for linkedlist pop()')
//   for (let i = 0; i < 100000; i++) {
//     ll.pop()
//   } //6.261ms
//   console.timeEnd('Test for linkedlist pop()')

//   console.time('Test for linkedlist remove()')
//   ll.remove(999) // 0.104ms
//   // for (let i = 0; i < 100000; i++) {
//   //   ll.remove(10)
//   // } // 43780.471ms
//   console.timeEnd('Test for linkedlist remove()')
// }

// ArrayTests();
// linkedListTests();

// 当链表提供前后引用时，remove的算法复杂度O(n+1)==>O(n)，减少了一个._findPrevNode的计算量。