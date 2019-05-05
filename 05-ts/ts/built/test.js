;
var user = {
    firstName: "Jane",
    lastName: "User"
};
function greeter(person) {
    return "Hello, " + person;
}
;
document.body.innerHTML = greeter(user);
var Student = (function () {
    function Student(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + "" + middleInitial + "" + lastName;
    }
    return Student;
}());
;
var user1 = new Student("Jane", "M.", "User");
greeter(user1);
//# sourceMappingURL=test.js.map