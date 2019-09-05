# ECMAScript 基础（一）---- 数据类型以及类型检验
## 一、 ECMAScript 的数据类型划分

​	在ECMAScript中，数据类型分为简单数据类型（基础数据类型）和复杂数据类型。其中，简单数据类型有5种（es6 加入了 Symbol 类型，简单数据类型变为6种），即 String，Number， Boolean， Undefined， Null 。复杂数据类型只有一种，即Object类型。Array、Function等数据类型都是特殊的Object类型。

​	ECMAScript是弱类型的语言，变量在声明时没有类型声明，声明变量之后，变量的数据类型可以改变。

## 二、 ECMAScript 的数据类型检验

### （一） typeof操作符

#### 1. typeof 操作符的返回值

​	在没有语法错误的情况下，typeof的返回值类型为字符串，有7个字符串备选： number， string， boolean， undefined， object， function，symbol。在使用typeof操作符进行数据类型判断时，只可能返回这7个字符串中的一种，不可能有其他的返回值。

​	一般情况下， typeof操作变量是不会报错的，即使typeof操作的变量尚未声明。但是在使用typeof操作符在let和const声明变量之前操作变量，会报语法错误，这是由于let 和const 声明变量时会有”暂存性死区“。

```javascript
console.log(typeof b); //"undefined"
console.log(typeof c); //"undefined"
console.log(typeof d); //Uncaught ReferenceError: d is not defined
var c = "test";
let d = "dtest";
```



#### 2. typeof 返回值对应的数据类型

​	使用typeof操作符操作String， Number， Boolean，Undefined以及Object类型的数据，都返回对应的字符串类型，但是typeof null 会返回object，操作函数会返回function。

​	ECMAScript的数据类型划分，是分为Number，String， Boolean， Undefined， Null， Symbol 6种简单数据类型以及一种复杂数据类型Object。但是在我们平时的开发中，一般会需要知道更细的数据类型，比如Object类型包括Function，Array等。但是typeof操作符只能区分函数和其他的Object类型数据，无法知道更加详细的数据类型，而且typeof null返回的不是数据类型Null对应的类型字符串，因此在实际开发中，typeof操作符的使用具有局限性。

#### 3. typeof操作符的执行原理解析

​	关于typeof null的问题，[The history of “typeof null”](http://2ality.com/2013/10/typeof-null.html) 一文中有解释，这个是第一版JavaScript实现的时候就存在的bug。在这个版本的JavaScript，数据是用32位存储的，其中包含1-3位的类型标识和数据的实际值。比如：

+ 000 ： 对象

+ 1： 整数

+ 010： 浮点数

+ 100： 字符串

+ 110： 布尔类型

  其中有两个比较特殊的，就是undefined 和 null：

  + undefined 是 −2^30

  + null 是空机器指针，或者一个对象类型标识乘以0

```c
if (JSVAL_IS_VOID(v)) {  // (1) 判断是否为undefined
    type = JSTYPE_VOID;
} else if (JSVAL_IS_OBJECT(v)) {  // (2) 判断是否为对象
    obj = JSVAL_TO_OBJECT(v);
    if (obj &&
        (ops = obj->map->ops,
         ops == &js_ObjectOps
         ? (clasp = OBJ_GET_CLASS(cx, obj),
            clasp->call || clasp == &js_FunctionClass) // (3,4) 判断是否是函数
         : ops->call != 0)) {  // (3)
        type = JSTYPE_FUNCTION;
    } else {
        type = JSTYPE_OBJECT;
    }
} else if (JSVAL_IS_NUMBER(v)) {	//判断是否是数值
    type = JSTYPE_NUMBER;
} else if (JSVAL_IS_STRING(v)) {	//判断字符串
    type = JSTYPE_STRING;
} else if (JSVAL_IS_BOOLEAN(v)) {	//判断布尔值
    type = JSTYPE_BOOLEAN;
}
```
### （二） instanceof 操作符

#### 1. instanceof 操作符的返回值

​	instanceof， 顾名思义，就是检验某个数据是否是另一个数据的实例。instanceof 操作符用法为 **"实例" instanceof “构造函数”**，返回值为布尔值。instanceof操作符的返回值，是根据检验的**构造函数**的prototype属性是否在实例所在的原型链上，如果在，则返回 true， 否则返回 false。

```javascript
function Foo1 () {}
function Foo2 (){}
Foo1.prototype = Foo2.prototype;
let fooInstance = new Foo1();
console.log(fooInstance instanceof  Foo1); //true
console.log(fooInstance instanceof Foo2) //true
console.log(fooInstance instanceof  Object); //true
```

​	以下是一个稍微复杂一点的例子：

```javascript
function Foo1 (){}
function Foo2 (){}
function Foo3 (){}
Foo1.prototype = new Foo2();
Foo2.prototype = new Foo3(); //改变了Foo2.prototype的指向
let fooInstance = new Foo1();
console.log(fooInstance instanceof Foo1); //true
console.log(fooInstance instanceof Foo2) //false
console.log(fooInstance instanceof Foo3) //false
console.log(fooInstance instanceof Object); //true
```

​	Foo1继承自Foo2的实例，但由于Foo2构造函数**在实例化之后**改变了prototype的指向，Foo2 之前声明的实例指向的是 Foo2 此前的prototype, 也就是说， 此时 Foo2 的实例的  [[prototype]]属性不等于 Foo2.prototype， 因此Foo2.prototype不在Foo1的原型链上了，所以验证 fooInstance 是否为 Foo2 和 Foo3 的实例的时候，返回false。实际上，如果把 Foo2.prototype = new Foo3() 这行代码放到实例化 Foo2 之前，则以上验证都会返回true， 因为 Foo2 的实例会指向 Foo2.prototype.

 #### 2. instanceof 操作符的适用范围

​	由于instanceof 操作符是用来检验数据是否为构造函数的实例，因此只能用来检验对象类型的数据，而且不能直接检验出**直接继承**自Object的对象，因为所有的对象类型的数据，都是继承自Object.prototype，因此使用instanceof 操作符总是会返回 true。平时的工作中，instanceof 操作符可以检验比如 Array， Date 等数据类型。

### （三） Object.prototype.toString.call() 方法

####　１.Object.prototype.toString.call() 的返回值

​	Object.prototype.toString.call() 的返回值，类似 [object Number] 这样的字符串，但是和typeof操作符不一样的是，Object.prototype.toString.call() 传入的变量必须是声明过的，否则会报错。

#### 2. Object.prototype.toString.call() 的适用范围

​	几乎适用所有的类型的数据，都能返回对应的数据类型。

```javascript
Object.prototype.toString.call(null)//"[object Null]"
Object.prototype.toString.call(undefined)//"[object Undefined]"
Object.prototype.toString.call(12)//"[object Number]"
Object.prototype.toString.call(aaa)//"[object String]"
Object.prototype.toString.call(false)//"[object Boolean]"
Object.prototype.toString.call(1,2,3)//"[object Array]"
Object.prototype.toString.call([object Object])//"[object Object]"
Object.prototype.toString.call(function a (){return false})//"[object Function]"
Object.prototype.toString.call(function pow() { [native code] })//"[object Function]"
Object.prototype.toString.call(Sat Dec 01 2018 06:58:38 GMT+0800 (中国标准时间))//"[object Date]"
index.html:66 Object.prototype.toString.call(/(?:)/)//"[object RegExp]"
```

### （四）变量值的数据类型检验

​	此处需要重点提出**基本包装类型**的类型检验问题。将一个值赋给变量的时候，解析器必须确定这个值是基本类型值还是引用类型值。这里引出两个概念，基本类型值和引用类型值（其实可以对应基本数据类型和对象数据类型）。

​	**基本类型值**指的是简单的数据段，可以操作保存在变量中的实际的值（按值访问），6 种基本数据类型就是按值访问的。

​	**引用类型值**指的是可能由多个值组成的对象（引用类型的实例），ECMAScript 中，不能直接操作对象的内存空间，在操作对象时，实际上是在操作对象的引用而不是实际的对象（按引用传递）。

​	一般而言，引用类型值由于是引用类型的实例（引用类型：是一种数据结构，用于将数据和功能组合在一起），所以用 typeof 操作符返回的肯定都是 object 或是 function。 但是我们需要注意 : 引用类型里面有一种比较特殊的类型，就是基本包装类型。基本包装类型可以理解成对于除了null 和 undefined 之外的基本数据类型的包装，给基本数据生成了原型链（实际上生成之后马上销毁了）以保证基本数据类型也能访问属性和调用方法，比如 

```javascript
let a = "12";
console.log(a.toString()); //"12"
console.log(a.length); //2
```

​	虽然能访问属性和调用方法，但是这些字面量声明的基本数据类型不能添加属性和方法。因为在String，Array，Boolean类型的数据字面量声明的变量，在访问属性和调用方法的时候，会新建一个对应的包装对象，该包装对象继承自对应的构造函数（构造函数都继承自Object.prototype），在访问属性和调用方法完毕的时候，对应的包装对象就在内存中销毁了，因此给基本类型值的变量添加属性和方法都会不起作用。

```javascript
let a = "12";
a.name = "test"
console.log(a.name); // "undefined"
console.log(typeof a) // "string"
```

​	我们可以直接通过构造函数的方式声明基本包装类型的变量，这样就能添加属性和方法了，但是这样的变量，在使用 typeof 操作符的时候，会返回 "object"。对比上面的 typeof a  返回的 "string"，就能大概明白基本包装类型和对应的基础数据类型的关系了。

```javascript
let b = new String("12");
b.name = "testb";
console.log(b.name) // "testb"
console.log(typeof b) // "object"
```

