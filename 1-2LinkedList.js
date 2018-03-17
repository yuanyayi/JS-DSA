// 实现一个链表结构

class Node {
  constructor(value, next) {
    this.value = value
    this.next = next
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

  _findPrevNode(value) {
    if (!this.head) return null
    let cur = this.head
    while (cur.next) {
      if (cur.next.value === value) return cur
      cur = cur.next || null
    }
    return null
  }

  push(value) {
    const nodeToPush = new Node(value, null)
    if (!this.tail) {
      this.head = nodeToPush
      this.tail = nodeToPush
      return
    }
    this.tail.next = nodeToPush
    this.tail = nodeToPush
  }

  remove(value) {
    const nodeToRemove = this._findNode(value)
    if(!nodeToRemove) return false
    const prevNode = this._findPrevNode(value)
    const nextNode = nodeToRemove.next

    if (prevNode && nextNode) {
      prevNode.next = nextNode
      nodeToRemove.next = null
    } else if (!prevNode && nextNode) {
      nodeToRemove.next = null
      this.head = nextNode
    } else if (prevNode && !nextNode) {
      prevNode.next = null
      this.tail = prevNode
    }
  }
}

/*
 * 链表都是引用，所以在修改时仅需要改变引用就好，无需重新分配内存，速度加快。
 * 为了做push功能（从队尾插入）增加一个tail。
 */

// 测试部分不应该出现在这里
function ArrayTests() {
  const arr = new Array(100000)

  for (let i = 0; i < 100000; i++) {
    arr[i] = i
  } //3.083ms

  console.time('Test for array functions');

  // for (let i = 0; i < 100000; i++) {
  //   arr.shift()
  // } // 4290.445ms
  // shift操作非常耗费时间！耗费的时间呈指数增长。

  // for (let i = 0; i < 100000; i++) {
  //   arr.unshift(i)
  // } // 13753.581ms
  // unshift操作非常耗费时间！耗费的时间呈指数增长。

  // for (let i = 0; i < 100000; i++) {
  //   arr.pop()
  // } // 1.594ms

  for (let i = 0; i < 100000; i++) {
    arr.push(i)
  } // 3.624ms
  
  console.timeEnd('Test for array functions');

}

function linkedListTests() {
  const ll = new LinkedList

  console.time('Test for linkedlist push()')
  for (let i = 0; i < 100000; i++) {
    ll.push(i)
  } //51.591ms
  console.timeEnd('Test for linkedlist push()')

  console.time('Test for linkedlist remove()')
  for (let i = 0; i < 100000; i++) {
    ll.remove(0)
  } //30421.185ms
  // ll.remove(10) // 0.165ms
  console.timeEnd('Test for linkedlist remove()')
}

ArrayTests();
linkedListTests();