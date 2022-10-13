# orange-hrm-test-project

## JS automation test using WebdriverIO

This repository is created to perform UI test automation of [orange hrm project](https://opensource-demo.orangehrmlive.com).

## Problems that need advice:

After receiving the recommendations from the reviewer, this submission is my second attempt with the purpose to improve my skills and understanding about automation testing. Even though I have solved some issues, there are still problems that need your advice:

1. Problems that have been fixed:

- Click methods are grouped in class object to prevent redundancy.
- Login test which is a pre-condition and has been put inside the "before" hook
- Repetitive logic has been grouped into helpers to be reused later.
- Errors in some return statements

2. Problems that need advice:

- In the admin tab page, I have tried to locate the element which identify a "div" containing name of the user. When I tried to locate the element in the browser dev tools, it worked well. The element was located, and the content of "div" element could be retrieved. However, when I use it in the script, the test could not find the element.

```console
// admin.tab.screen.js
get userNameCard() {
    return $$(
      ".card-center>.card-item.card-body-slot>.oxd-table-cell:first-child>.oxd-table-card-cell>.data"
    );
  }
```

- I have tried to use getText() method as your recommendation to return a list of value, but it didn't work. And according to the document, getText() is a method to get content of one element. So I don't know if there is any info that I have missed.

Thank you for considering my queries!

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

## Repository

- https://github.com/tamtran2885/orange-hrm-test-project
