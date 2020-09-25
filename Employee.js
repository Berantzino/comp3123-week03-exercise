exports.Employee = class {

    constructor(id, firstName, lastName, email, salary) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.salary = salary;
    }

    get fullName() {
        return `${this.firstName} ${this.lastName}`
    }
}