interface Person {
    firstName: string,
    lastName: string
};
let user = {
    firstName: "Jane",
    lastName: "User",
};
function greeter (person : Person):string {
    return "Hello, " + person;
};
document.body.innerHTML = greeter(user);

class Student{
    fullName: string;
    constructor(public firstName: string, public middleInitial: string ,public lastName: string){
        this.fullName = firstName + "" + middleInitial + "" + lastName;
    }
};
let user1 = new Student("Jane", "M.", "User");
greeter(user1);