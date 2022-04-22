// ## Acceptance Criteria

// ```md
// GIVEN a command-line application that accepts user input
// WHEN I am prompted for information about my application repository
// THEN a high-quality, professional README.md is generated with the title of my project and sections entitled Description, Table of Contents, Installation, Usage, License, Contributing, Tests, and Questions
// WHEN I enter my project title
// THEN this is displayed as the title of the README
// WHEN I enter a description, installation instructions, usage information, contribution guidelines, and test instructions
// THEN this information is added to the sections of the README entitled Description, Installation, Usage, Contributing, and Tests
// WHEN I choose a license for my application from a list of options
// THEN a badge for that license is added near the top of the README and a notice is added to the section of the README entitled License that explains which license the application is covered under
// WHEN I enter my GitHub username
// THEN this is added to the section of the README entitled Questions, with a link to my GitHub profile
// WHEN I enter my email address
// THEN this is added to the section of the README entitled Questions, with instructions on how to reach me with additional questions
// WHEN I click on the links in the Table of Contents
// THEN I am taken to the corresponding section of the README
init = () => {
    const inquirer = require('inquirer');
const fs = require('fs');

const genReadme = ({userName, userEmail, userProjectTitle, userProjectBio, userDepend, userTest, 
    userReqInfo, userContribution, projectLicense}) => 
        `
        ======= ${userProjectTitle} =======

        ## Table of contents:
        
        1. Github
        2. Email
        3. Description
        4. Installation
        5. Test commands
        6. Repo information
        7. Contributing to the Repo
        
        
        ## Github: 
        
        https://github.com/${userName}
        
        ## email: 
        
        ${userEmail}
        
        ## Description: 
        
        ${userProjectBio}
        
        ## Installation instructions:
        
        Run the following commands in your integrated terminal.
        
        ${userDepend}
        
        ## test commands:
        
        ${userTest}
        
        ## Repo Info:
        
        ${userReqInfo}
        
        ## Contributing to Repo:
        
        ${userContribution}

        ## License:

        ${projectLicense}
        `
    

inquirer
    .prompt([
        {
            type: 'input',
            message: 'What is your Github Username?',
            name: 'userName'
        },
        {
            type: 'input',
            message: 'What is your email address?',
            name: 'userEmail'
        },
        {
            type: 'input',
            message: 'What is the title of your project?',
            name: 'userProjectTitle'
        },
        {
            type: 'input',
            message: 'Please Write a short description of your project.',
            name: 'userProjectBio'
        },
        {
            type: 'input',
            message: 'What command should be run to install dependencies?',
            name: 'userDepend'
        },
        {
            type: 'input',
            message: 'What command should be run to run tests?',
            name: 'userTest'
        },
        {
            type: 'input',
            message: 'What does the user need to know about using the repo?',
            name: 'userReqInfo'
        },
        {
            type: 'input',
            message: 'What does the user need to know about contributing to the repo?',
            name: 'userContribution'
        },
        {
            type: 'list',
            message: 'What kind of license should your project have?',
            choices: ['MIT', 'TIM'],
            name: 'projectLicense'
        }
    ])
        .then((answers) => {
            console.log(answers);
            const userBadge = answers.projectLicense;
            if(answers.projectLicense == 'MIT') {
                answers.projectLicense = `MIT License

                Copyright (c) 2012 ${answers.userName}
                
                Permission is hereby granted, free of charge, to any person obtaining a copy
                of this software and associated documentation files (the "Software"), to deal
                in the Software without restriction, including without limitation the rights
                to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                copies of the Software, and to permit persons to whom the Software is
                furnished to do so, subject to the following conditions:
                
                The above copyright notice and this permission notice shall be included in all
                copies or substantial portions of the Software.
                
                THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
                SOFTWARE.
                ![${userBadge} License Badge](https://img.shields.io/badge/${userBadge}-${answers.userName}-blue?style=for-the-badge&logo=appveyor)`
            };
            // if(answers.projectLicense == '')
            const fillPageContent = genReadme(answers);
            fs.writeFile(`generatedREADME.md`, fillPageContent, (err) => {
                
                err? console.log(err) : console.log("Generating README...")
                
                // if(err){
                //     throw err;
                // }
                // console.log("yay!");
            })
        }
    );
}

init();
