const LinkedList = require('./1-3LinkedListExtend')

// 栈结构只提供对队尾的处理，增加一个栈尾指针就好。
class Stack {
  constructor() {
    return new LinkedList();
  }
  /* 补充：
  	constructor本身就是内置函数，会返回当前对象的构造函数。
  */
}

//Test
function stackTest() {
	const str = "{{{{{{{{ }}}}}}}}}"
  const stack = new Stack();

  console.time('Stack test push & pop');
  for (let i = 0; i < str.length; i++) {
    const c = str[i]
    if (c === "{") stack.push(i)
    if (c === "}") stack.pop()
    console.log(i+':'+stack.toString()) // 增加输出后的时间：2.235ms
  } //0.189ms
	console.timeEnd('Stack test push & pop');
}

stackTest();