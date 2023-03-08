import Employee from "./Employee.js";

class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email);
        this.github = github;
        this.role = "Engineer";
    }

    getRole() {
        return this.role;
    }

    getGithub() {
        return this.github;
    }
};

export default Engineer;