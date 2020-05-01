const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const axios = require("axios");


const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

const generalQuestions = [
    {
        type: "input",
        name: "name",
        message: "Enter name of team member"
    },
    {
        type: "input",
        name: "id",
        message: "Enter Tem Member ID"
    },
    {
        type: "input",
        name: "email",
        message: "Enter Email"
    },
]

const employeeTypeQuestion = {
    type: "list",
    name: "role",
    message: "Enter role of team member",
    choices: [
        "Engineer",
        "Intern",
        "Exit"
    ]
}

const managerQuestion = 

{
    type: "input",
    name: "officeNumber",
    message: "Enter office number"
}

const engineerQuestion = {
    type: "input",
    name: "github",
    message: "Enter github username"
}

const internQuestion = {
    type: "input",
    name: "school",
    message: "Enter school name"
}

function menu() {
    // Write code to use inquirer to gather information about the development team members,
    inquirer
        .prompt([...generalQuestions, managerQuestion])
        .then(function (data) {
            const manager = new Manager(data.name, data.id, data.email, data.officeNumber,"Manager");
            employees.push(manager);
            createTeamMember();
        });
}
function createTeamMember() {
    inquirer
        .prompt(employeeTypeQuestion)
        .then(function (data) {
            switch (data.role) {
                case "Engineer":
                    createEngineer();
                    break;
                case "Intern":
                    createIntern();
                    break;
                default:
                    creatHtmlPage();
                    console.log(employees);
            }
        })
}

function createEngineer() {
    inquirer
        .prompt([...generalQuestions, engineerQuestion])
        .then(function (data) {
            const engineer = new Engineer(data.name, data.id, data.email, data.github, data.role)
            employees.push(engineer);
            createTeamMember();
        })
}

function createIntern() {
    inquirer
        .prompt([...generalQuestions, internQuestion])
        .then(function (data) {
            const intern = new Intern(data.name, data.id, data.email, data.school, data.role)
            employees.push(intern);
            createTeamMember();
        })
}

function creatHtmlPage(){
    const template = fs.readFileSync("./templates/main.html")
    fs.writeFileSync("./teamMember.html", template, function(err){
        if (err) throw err;
    })

    console.log("Base page generated!");


    }




render(employees);
menu();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
