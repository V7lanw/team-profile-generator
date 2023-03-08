import Employee from "./Employee.js";

class Intern extends Employee {
    constructor(name, id, email, school) {
        super(name, id, email);
        this.school = school;
        this.role = "Intern";
    }

    getRole() {
        return this.role;
    }

    getSchool() {
        return this.school;
    }
};

export default Intern;