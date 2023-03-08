import Manager from "./lib/Manager.js";
import Engineer from "./lib/Engineer.js";
import Intern from "./lib/Intern.js";
import inquirer from "inquirer";
import path from "path";
import fs from "fs";
import url from "url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

import render from "./src/page-template.js";


// TODO: Write Code to gather information about the development team members, and render the HTML file.
const idList = [];
const teamMembers = [];

const appMenu = () => {
    const isValid = (answer) => {
        if (answer.trim() !== "") {
            return true;
        }
        return "Please enter at least one character, it cannot be empty.";
    }
    const isEmailValid = (answer) => {
        // TODO: Using paid API here rather than regex. Why? Refer to RFC 5322! 
        // Performance! And too long regex is unreadable and unmaintainable.
        return isValid(answer);
    }

    function addEngineer() {
        inquirer.prompt([
            {
                type: "input",
                name: "engineerName",
                message: "What is the engineer's name?",
                validate: answer => {
                    return isValid(answer);
                }
            },
            {
                type: "input",
                name: "engineerId",
                message: "What is the engineer's ID?",
                validate: answer => {
                    return isValid(answer);
                }
            },
            {
                type: "input",
                name: "engineerEmail",
                message: "What is the engineer's email?",
                validate: answer => {
                    return isEmailValid(answer);
                }
            },
            {
                type: "input",
                name: "engineerGithub",
                message: "What is the engineer's GitHub?",
                validate: answer => {
                    return isValid(answer);
                }
            },
        ]).then(answers => {
            const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
            idList.push(answers.engineerId);
            teamMembers.push(engineer);
            console.log(engineer);
            createTeam();
        });
    }

    function addIntern() {
        inquirer.prompt([
            {
                type: "input",
                name: "internName",
                message: "What is the intern's name?",
                validate: answer => {
                    return isValid(answer);
                }
            },
            {
                type: "input",
                name: "internId",
                message: "What is the intern's ID?",
                validate: answer => {
                    return isValid(answer);
                }
            },
            {
                type: "input",
                name: "internEmail",
                message: "What is the intern's email?",
                validate: answer => {
                    return isEmailValid(answer);
                }
            },
            {
                type: "input",
                name: "internSchool",
                message: "What is the intern's School?",
                validate: answer => {
                    return isValid(answer);
                }
            },
        ]).then(answers => {
            const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
            idList.push(answers.internId);
            teamMembers.push(intern);
            console.log(intern);
            createTeam();
        });
    }

    function buildTeam() {
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR);
        }
        fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
    }

    function createTeam() {
        inquirer.prompt([
            {
                type: "list",
                name: "memberChoice",
                message: "Which type of team member would you like to add?",
                choices: [
                    "Engineer",
                    "Intern",
                    "I don't want to add any more team members"
                ]
            }
        ]).then(userChoice => {
            if (userChoice.memberChoice === "Engineer") {
                addEngineer();
            } else if (userChoice.memberChoice === "Intern") {
                addIntern();
            } else {
                buildTeam();
            }
        });
    }

    function createManager() {
        console.log("Please build your team!");
        inquirer.prompt([
            {
                type: "input",
                name: "managerName",
                message: "What is the team manager's name?",
                validate: answer => {
                    return isValid(answer);
                }
            },
            {
                type: "input",
                name: "managerId",
                message: "What is the team manager's ID?",
                validate: answer => {
                    return isValid(answer);
                }
            },
            {
                type: "input",
                name: "managerEmail",
                message: "What is the team manager's email?",
                validate: answer => {
                    return isEmailValid(answer);
                }
            },
            {
                type: "input",
                name: "managerOfficeNumber",
                message: "What is the team manager's office number?",
                validate: answer => {
                    return isValid(answer);
                }
            }
        ]).then(answers => {
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
            idList.push(answers.managerId);
            teamMembers.push(manager);
            console.log(manager);
            createTeam();
        });
    }

    createManager();
};

appMenu();