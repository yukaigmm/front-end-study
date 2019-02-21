function greeter (person : number) {
    return "Hello, " + person;
};
let user = "Jane";

document.body.innerHTML = greeter(user);