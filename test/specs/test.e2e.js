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
  it("Should login with valid credentials", async () => {
    await LoginPage.open();
    await LoginPage.enterUserName(AdminInfo.USERNAME);
    await LoginPage.enterPassword(AdminInfo.PASSWORD);
    await LoginPage.clickLoginBtn();

    // Wait until h5-employee information  element exist
    const pageHeading = await HomePage.pageHeading;
    expect(pageHeading).toHaveText(HomePageInfo.HEADING);
  });

  xit("Should not login with invalid credentials", async () => {
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

    // Select status option
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

    // Choose Employee Name
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

    // Enter username
    await AddUserPage.enterUserName(UserInfo.USERNAME);

    // enter password
    await AddUserPage.enterPassword(UserInfo.PASSWORD);

    // enter confirmed password
    await AddUserPage.enterConfirmedPassword(UserInfo.CONFIRMED_PASSWORD);

    // click save button
    await AddUserPage.clickSaveBtn();

    /***** check input values *******/
    const requiredFields = await AddUserPage.requiredFields;

    // check username input value
    if (!AddUserPage.getUserNameInputValue()) {
      expect(requiredFields[3]).toHaveText(Message.REQUIRED);
    }

    if (AddUserPage.getUserNameInputValue().length < 5) {
      expect(requiredFields[3]).toHaveText(Message.USERNAME_MINIMUM_LENGTH);
    }

    // check Employee Name input values
    if (!AddUserPage.getEmployeeNameInputValue()) {
      expect(requiredFields[1]).toHaveText(Message.REQUIRED);
    }

    // check password value
    if (!AddUserPage.getPasswordInputValue()) {
      expect(requiredFields[4]).toHaveText(Message.REQUIRED);
    }

    if (AddUserPage.getPasswordInputValue().length < 9) {
      expect(requiredFields[4]).toHaveText(Message.PASSWORD_MINIMUM_LENGTH);
    }

    // check confirmed password input value
    if (!AddUserPage.getConfirmedPasswordInputValue()) {
      expect(requiredFields[5]).toHaveText(Message.REQUIRED);
    }

    // check password match
    if (
      AddUserPage.getPasswordInputValue() ===
      AddUserPage.getConfirmedPasswordInputValue()
    ) {
      expect(requiredFields[5]).toHaveText(Message.PASSWORD_NOT_MATCH);
    }

    // check user roles and status input values
    if (AddUserPage.getUserRolesInputText === "-- Select --") {
      expect(requiredFields[0]).toHaveText(Message.REQUIRED);
    }

    if (AddUserPage.getStatusInputText === "-- Select --") {
      expect(requiredFields[1]).toHaveText(Message.REQUIRED);
    }

    // Save successfully
    const notification = AddUserPage.notification;
    await notification.waitForDisplayed();
    expect(notification).toHaveText(Message.SUCCESSFULLY_SAVED);
    await browser.pause(Timer.SHORT);
  });

  it("Should display new user on grid board", async () => {
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

  it("Should display user info by searching", async () => {
    const inputUsername = await AdminTabScreen.inputUsername;

    await inputUsername.setValue(UserInfo.USERNAME);
    await AdminTabScreen.clickSearchBtn();
    await browser.pause(Timer.MEDIUM);

    const headingResult = await AdminTabScreen.headingResult;
    expect(headingResult).toHaveText("(1) Record Found");
  });

  it("Should display grid of users after resetting", async () => {
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

  it("Should delete a user by clicking on remove item", async () => {
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

  it("Should not display the user info on grid board after being deleted", async () => {
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
