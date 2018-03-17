// 构造一颗二叉树

class Node {
  constructor(value, parent, left, right) {
    this.value = value
    this.parent = parent
    this.left = left
    this.right = right
  }
}

// BST:BinarySearchTree 二叉查找树
/*
 * 左边的节点比它小，右边的节点比它大 
 */
class BinarySearchTree {
  constructor(arr) {
    this.root = null
    if (arr && arr.length > 0) {
      for (let el of arr) {
        this.insert(el)
      }
    }
  }

  insert(value) {
    const nodeToInsert = new Node(value, null, null, null)
    if (!this.root) {
      this.root = nodeToInsert
      return
    }
    let cur = this.root
    while (cur) {
      if (value < cur.value) {
        if (cur.left) {
          cur = cur.left
          continue
        }
        nodeToInsert.parent = cur
        cur.left = nodeToInsert
        return
      } else if (value > cur.value) {
        if (cur.right) {
          cur = cur.right
          continue
        }
        nodeToInsert.parent = cur
        cur.right = nodeToInsert
        return
      } else {
        console.log("不能插入重复的数值。")
        return
      }
    }
  }
  /*
   * 遍历顺序指的是【根结点】出现的位置！！！
   * 一定是先打印左节点，后打印右节点！！！
   */
  // 中序遍历(LDR)：
  // 二分法，快速搜索
  static inOrder(node) {
    if (node) {
      BinarySearchTree.inOrder(node.left)
      console.log(node.value)
      BinarySearchTree.inOrder(node.right)
    }
  }
  // 前序遍历(DLR)：
  static preOrder(node) {
    if (node) {
      console.log(node.value)
      BinarySearchTree.preOrder(node.left)
      BinarySearchTree.preOrder(node.right)
    }
  }

  // 后序遍历(LRD)：
  static postOrder(node) {
    if (node) {
      BinarySearchTree.preOrder(node.left)
      BinarySearchTree.preOrder(node.right)
      console.log(node.value)
    }
  }

  search(value) {
    if (!this.root) return null
    let cur = this.root
    while (cur) {
      if (value > cur.value) {
        cur = cur.right
        continue
      } else if (value < cur.value) {
        cur = cur.left
        continue
      } else {
        return cur
      }
    }
    return null
  }

  static findLeftLeaf(node) {
    if (!node.left) return node
    return BinarySearchTree.findLeftLeaf(node.left)
  }

  static findRightLeaf(node) {
    if (!node.right) return node
    return BinarySearchTree.findRightLeaf(node.right)
  }

  remove(value) {
    /*
     * search for v
     * 	if v is a leaf
     * 	  delete leaf v
     * 	else if v has 1 child
     * 	  bypass v
     * 	else replace v with successor
     */

    /*
     * 删除nodeTR之后，nodeTR.right被提升至原节点的位置，自己的左右节点都不变；
     * nodeTR.left如果存在，则挂在新节点的最左叶子节点下面。
     */

    const nodeTR = this.search(value)
    if (!nodeTR) return false
    let pos = null
    if (nodeTR.parent) {
      if (nodeTR.value < nodeTR.parent.value) {
        pos = 'left'
      } else {
        pos = 'right'
      }

      if (!nodeTR.left && !nodeTR.right) {
        nodeTR.parent[pos] = null
        nodeTR.parent = null
      } else if (!nodeTR.left || !nodeTR.right) {
        const suc = nodeTR.left || nodeTR.right
        nodeTR.parent[pos] = suc
        suc.parent = nodeTR.parent
      } else {
        if (nodeTR.value < nodeTR.parent.value) {
          nodeTR.parent.left = nodeTR.right
          nodeTR.right.parent = nodeTR.parent
          const suc = BinarySearchTree.findLeftLeaf(nodeTR.right)
          suc.left = nodeTR.left
          nodeTR.left.parent = suc
        } else if (nodeTR.value > nodeTR.parent.value) {
          nodeTR.parent.right = nodeTR.left
          nodeTR.left.parent = nodeTR.parent
          const suc = BinarySearchTree.findRightLeaf(nodeTR.left)
          suc.right = nodeTR.right
          nodeTR.right.parent = suc
        }
      }
    } else {
      const suc = BinarySearchTree.findLeftLeaf(nodeTR.right)
      this.root = suc
      suc.right ? (suc.right.parent = suc.parent) : ''
      suc.parent.left = suc.right || null
      suc.parent = null
      suc.left = nodeTR.left
      nodeTR.left.parent = suc
      suc.right = nodeTR.right
      nodeTR.right.parent = suc
    }
    nodeTR.parent = null
    nodeTR.left = null
    nodeTR.right = null
    return true
  }
}

function BSTTest() {
  const arr = [7, 13, 3, 1, 5, 6, 15, 14, 12, 11]
  const bst = new BinarySearchTree(arr)
  // console.log(bst)
  BinarySearchTree.inOrder(bst.root)
  // console.log("***")
  // BinarySearchTree.preOrder(bst.root)
  // console.log("***")
  // BinarySearchTree.postOrder(bst.root)

  // console.log(bst.search(13))

  bst.remove(15)
  console.log("**********")
  // console.log(bst)
  BinarySearchTree.inOrder(bst.root)
}

BSTTest()