import { exec } from "node:child_process";
import { error } from "node:console";

// Defina a common command for running cucumber tests
const common = `./src/features/*.feature \
--require-module ts-node/register \
--require src/step-definitions/**/**/*.ts \
--require src/utils/cucumber-timeout.ts \
-f json:./reports/report.json \
--format html:./reports/report.html \
--tags "not @ignore"`;

//Define an interface for profiles object 
//It defines an interface where each key is a string and its value is also a string
interface ProfileCommands {
    [key: string]: string;
}

//Define a command strings for different test profiles - consider it as passing diff tags for smoke/regression
//mention tags here
const profiles: ProfileCommands = {
    smoke: `${common} --tags "@smoke"`,
    regression: `${common} --tags "@regression"`,
    login: `${common} --tags "@login"`,
    contactUs: `${common} --tags "@contact-us"`,
}

//Get the third command-line argument and assign it to the profile  - like smoke, regression 
//index starts with 0 - below is 3rd arg
const profile = process.argv[2];

//construct the command string absed on the selected profile
//command is the full command to run the tests for the selected profile
let command = `npx cucumber-js ${profiles[profile as 'smoke' | 'regression' | 'login' | 'contact - us']}`;

//print the constructed command
//console.log(command);

//Execute the command
exec(command, { encoding: 'utf-8' }, (error: Error | null, stdout: string) => {
    //log the o/p of the command
    console.log(stdout);

    //check if there was an error during execution
    if (error) {
        //throw a new error with a simple msg 
        throw new Error('💣💥Some automation test(s) have failed🧨💥 - Kindly Review 💥')
    }
});