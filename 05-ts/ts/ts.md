### TS 的作用
1. 提供了类型判断，提升代码的维护性（在编译阶段）
2. 提供了一些便捷的数据类型和数据处理方式（在运行阶段）
### TS 数据类型
#### 包含 JS 的数据类型：
1. 简单数据类型：string, number, boolean, null, undefined, symbol
2. 复杂数据类型：array, object
#### 自有的数据类型
1. enum：枚举，跟对象比较类似，但是元素**不主动赋值或者赋值为number**的枚举会有一个自增的序号
   ````typescript
    enum Test{
       Red,
       Green,
       Yellow
   }
   ````
   ````javascript
    let Test = {
        Red: 0,
        Green: 1,
        Yellow: 2,
        0: "Red",
        1: "Green",
        2: "Yellow",
    }
   ````

2. 元组 tuple： 数组的拓展，允许不同类型的元素（ts的数组只允许相同类型的元素）
3. void
4. never
5. any
### 声明类型
1. 变量声明
2. 函数参数和返回值声明
3. 类声明
### 接口
#### 接口是什么，有什么作用
接口就是定义的一组属性和数据类型对应的结构，对值（变量，函数参数，函数，类）的结构进行类型检查
#### 接口的特点
1. 接口的属性不是全部必须的，可以有可选属性
   ````typescript
    interface PersonObj {
        name: string,
        age?: number
        gender?: 0|1
    }
   ````
2. 接口可以规定只读属性
   ````typescript
    interface PersonObj {
        name: string,
        age?: number
        readonly gender?: 0|1
    }
    let personInfo: PersonObj = {
        name: "jack",
        gender: 0
    }
    personInfo.gender = 1; // Cannot assign to 'gender' because it is a read-only property
   ````
   注：最简单判断该用readonly还是const的方法是看要把它做为变量使用还是做为一个属性。 做为变量使用的话用 const，若做为属性则使用readonly。
3. 接口会对 字面量对象做**额外属性检查**\
   ````typescript
    interface PersonObj {
        name: string;
        age?: number;
        readonly gender?: 0|1;
    }
    function getPersonInfo(personInfo: PersonObj): void{
        return;
    }
    getPersonInfo({name: "jack", height: 175}) // Argument of type '{ name: string; height: number; }' is not assignable to parameter of type 'PersonObj'
    let personInfo: PersonObj = {
        name: "jack",
        gender: 0
    }
    personInfo.gender = 1; // Cannot assign to 'gender' because it is a read-only property
   ````
   绕过额外属性检查：
   ````typescript
    interface PersonObj {
        name: string;
        age?: number;
        readonly gender?: 0 | 1;
    }
    let personInfo = {
        name: "jack",
        height: 175
    }
    function getPersonInfo(personInfo: PersonObj): void {
        return ;
    }
    getPersonInfo(personInfo);
   ````
   
4. 接口可以继承类
5. 
6. 
#### 接口的分类
#### 接口如何使用