class Cat {
  constructor(name) {
    this.name = name;
  }
  speak() {
    console.log(this.name + ' makes a noise.');
  }
}

class Lion extends Cat {
  constructor(name, color) {
    super(name); // 这个super指向什么呢？
    // ---这个super指向基类Cat，直接运行则指向constructor()，即：super()==>Cat()
    this.color = color;
  }

  speak() {
    super.speak(); // 这个super又指向什么？
    // ---这个super还是指向基类Cat，调用Cat.speak()，即： super.speak()==>Cat.speak()
    console.log(this.name + ' roars.');
  }
}

let obj = {
  toString() {
    return 'My little pony' + super.toString(); //这里的super又指向什么?
    // ---指向obj.__proto__， 即super.toString()==>obj.__proto__.toString()==>Object.toString()
  }
}

// Test
let a = new Cat('Tom')
console.log(a) // Cat { name: 'Tom' }
a.speak() // Tom makes a noise.

let b = new Lion('Simba', 'orange')
console.log(b) //Lion { name: 'Simba', color: 'orange' }
b.speak() // Simba makes a noise. Simba roars.

console.log(obj.toString()) // My little pony[object Object] (???)
console.log(obj.__proto__.toString()) // [object Object] (!!!)
