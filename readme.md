# orange-hrm-test-project

## JS automation test using WebdriverIO

This repository is created to perform UI test automation of [orange hrm project](https://opensource-demo.orangehrmlive.coms).

## Technology and dependencies used:

- WebdriverIO (https://webdriver.io)
- Javascript (https://www.javascript.com/)
- Allure command line (https://www.npmjs.com/package/allure-commandline)
- Allure Reporter (https://webdriver.io/docs/allure-reporter/)

## Install and Set up repository:

- Clone this repository
- Install the dependencies of this project with "npm install"

## Running test suite:

To run our test suite:

- Open terminal
- Navigate to the folder where the project is located.
- Run "npm run test"

## Generate report with allure:

- Run "allure generate allure-results/ && allure open"

## Other Details:

- baseUrl: "https://opensource-demo.orangehrmlive.com"

## Further development:

Due to time constraint, there are some aspects need further inspection and development to improve the project's quality including:

- Most of tests are performed using Implicit Wait which will add time to the test script execution time. In other to troubleshoot this issue, an Explicit Wait should be applied.
- Using regular expression to validate password.

## Repository

- https://github.com/tamtran2885/orange-hrm-test-project
