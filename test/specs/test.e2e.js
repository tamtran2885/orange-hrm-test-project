const LoginPage = require("../pageobjects/login.page");
const HomePage = require("../pageobjects/home.page");
const DeleteUserPage = require("../pageobjects/modals/delete.user.modal");
const AddUserPage = require("../pageobjects/add.user.screen");
const AdminTabScreen = require("../pageobjects/admin.tab.screen");
const {
  UserInfo,
  UserRoleTypes,
  UserStatusTypes,
} = require("../constants/add.user.constants");
const {
  AdminInfo,
  Timer,
  HomePageInfo,
  Message,
} = require("../constants/utils.constants");

describe("My Login application", async () => {
  it("should login with valid credentials", async () => {
    await LoginPage.open();
    await LoginPage.enterUserName(AdminInfo.USERNAME);
    await LoginPage.enterPassword(AdminInfo.PASSWORD);
    await LoginPage.clickLoginBtn();

    // Wait until h5-employee information  element exist
    const pageHeading = await HomePage.pageHeading;
    expect(pageHeading).toHaveText(HomePageInfo.HEADING);
  });

  xit("should not login with invalid credentials", async () => {
    await LoginPage.open();
    await LoginPage.enterUserName("Adminn");
    await LoginPage.enterPassword(UserInfo.PASSWORD);
    await LoginPage.clickLoginBtn();

    await expect(LoginPage.errorMessage).toBeDisplayed();
    await expect(LoginPage.errorMessage).toHaveTextContaining(
      Message.FAILED_LOGIN
    );
  });

  it("Test to add new user", async () => {
    await HomePage.clickAdminLink();
    await AdminTabScreen.clickUserManagementTab();
    await AdminTabScreen.clickUsersOption();
    await AdminTabScreen.clickAddBtn();
    await browser.pause(Timer.SHORT);

    // Select user role as ESS
    const selectedInput = await AddUserPage.SelectedInput;
    await selectedInput[0].click();

    const userRoleOptions = await AddUserPage.options;
    for (i = 0; i < userRoleOptions.length; i++) {
      const userRole = await userRoleOptions[i].getText();
      if (userRole.includes(UserRoleTypes.ESS)) {
        await userRoleOptions[i].click();
        await browser.pause(Timer.SHORT);
        break;
      }
    }

    // enter Status
    await selectedInput[1].click();

    const statusOptions = await AddUserPage.options;
    for (i = 0; i < statusOptions.length; i++) {
      const status = await statusOptions[i].getText();
      if (status.includes(UserStatusTypes.ENABLED)) {
        await statusOptions[i].click();
        await browser.pause(Timer.SHORT);
        break;
      }
    }

    // enter Employee Name
    const inputEmployeeName = await AddUserPage.inputEmployeeName;
    await inputEmployeeName.setValue(UserInfo.HINT);
    await browser.pause(Timer.MEDIUM);

    const hints = await AddUserPage.options;
    const random = Math.floor(Math.random() * hints.length);

    for (let i = 0; i < hints.length; i++) {
      if (i === random) {
        await hints[i].click();
        break;
      }
    }

    // username
    await AddUserPage.enterUserName(UserInfo.USERNAME);
    // await browser.pause(Timer.MEDIUM);

    // enter password
    await AddUserPage.enterPassword(UserInfo.PASSWORD);
    // await browser.pause(Timer.LONG);

    // enter confirmed password
    await AddUserPage.enterConfirmedPassword(UserInfo.CONFIRMED_PASSWORD);
    // await browser.pause(Timer.LONG);

    // click save button
    await AddUserPage.clickSaveBtn();

    // check input value

    // Save successfully
    const notification = AddUserPage.notification;
    await notification.waitForDisplayed();
    expect(notification).toHaveText(Message.SUCCESSFULLY_SAVED);
    await browser.pause(Timer.SHORT);
  });

  it("test to check new user on grid board", async () => {
    await AdminTabScreen.clickUserManagementTab();
    await AdminTabScreen.clickUsersOption();
    await browser.pause(Timer.MEDIUM);
    const userNameCard = await AdminTabScreen.userNameCard;

    let userNameList = [];
    for (let i = 0; i < userNameCard.length; i++) {
      const getUserName = await userNameCard[i].getText();
      userNameList.push(getUserName);
    }

    let valueExist = userNameList.includes(UserInfo.USERNAME);
    expect(valueExist).toEqual(true);
    await browser.pause(Timer.MEDIUM);
  });

  it("Test displaying employee by username search", async () => {
    const inputUsername = await AdminTabScreen.inputUsername;

    await inputUsername.setValue(UserInfo.USERNAME);
    await AdminTabScreen.clickSearchBtn();
    await browser.pause(Timer.MEDIUM);

    const headingResult = await AdminTabScreen.headingResult;
    expect(headingResult).toHaveText("(1) Record Found");
  });

  it("test to check value exist with reset button", async () => {
    await AdminTabScreen.clickResetBtn();
    await browser.pause(Timer.MEDIUM);

    const userNameCard = await AdminTabScreen.userNameCard;

    let userNameList = [];
    for (let i = 0; i < userNameCard.length; i++) {
      const getUserName = await userNameCard[i].getText();
      userNameList.push(getUserName);
    }

    let valueExist = userNameList.includes(UserInfo.USERNAME);
    expect(valueExist).toEqual(true);
    await browser.pause(Timer.SHORT);
  });

  it("test to delete a user", async () => {
    await HomePage.clickAdminLink();
    await AdminTabScreen.clickUserManagementTab();
    await AdminTabScreen.clickUsersOption();
    await browser.pause(Timer.SHORT);
    const userNameCard = await AdminTabScreen.userNameCard;
    const deleteButtons = await AdminTabScreen.deleteBtn;

    for (let i = 0; i < userNameCard.length; i++) {
      const getUserName = await userNameCard[i].getText();
      if (getUserName === UserInfo.USERNAME) {
        console.log(userNameCard[i]);
        await deleteButtons[i].click();
        await browser.pause(Timer.SHORT);
        await DeleteUserPage.agreedBtn.waitForDisplayed();
        await DeleteUserPage.clickAgreedBtn();
        const notification = await AdminTabScreen.notification;
        await notification.waitForDisplayed();
        expect(notification).toHaveText(Message.SUCCESSFULLY_DELETED);
        break;
      }
    }
  });

  it("test to check a user no available after being deleted", async () => {
    const userNameCard = await AdminTabScreen.userNameCard;

    let userNameList = [];
    for (let i = 0; i < userNameCard.length; i++) {
      const getUserName = await userNameCard[i].getText();
      userNameList.push(getUserName);
    }

    let valueExist = userNameList.includes(UserInfo.USERNAME);
    expect(valueExist).not.toEqual(true);
    await browser.pause(Timer.MEDIUM);
  });
});
