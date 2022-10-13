const expectChai = require("chai").expect;

const LoginPage = require("../pageobjects/login.page");
const HomePage = require("../pageobjects/home.page");
const DeleteUserPage = require("../pageobjects/modals/delete.user.modal");
const AddUserPage = require("../pageobjects/add.user.screen");
const AdminTabScreen = require("../pageobjects/admin.tab.screen");
const AdminTab = require("../helpers/pageobjects/admin.tab");
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
  before(async () => {
    await LoginPage.open();
    await LoginPage.login(AdminInfo.USERNAME, AdminInfo.PASSWORD);

    // check url of new page
    expectChai(await browser.getUrl()).to.include(
      "/web/index.php/pim/viewEmployeeList"
    );
  });

  it("Test add user", async () => {
    await HomePage.clickAdminLink();
    await AdminTabScreen.clickUserManagementTab();
    await AdminTabScreen.clickUsersOption();
    await AdminTabScreen.clickAddBtn();

    // check url of add new user page
    expectChai(await browser.getUrl()).to.include(
      "/web/index.php/admin/saveSystemUser"
    );

    // Enter employee_name, username, status, role, password and confirm password ans save the input value
    await AddUserPage.addNewUser(
      UserRoleTypes.ESS,
      UserInfo.HINT,
      Timer.MEDIUM,
      UserStatusTypes.ENABLED,
      UserInfo.USERNAME,
      UserInfo.PASSWORD,
      UserInfo.CONFIRMED_PASSWORD
    );

    // Get successful notification
    const notification = AddUserPage.notification;
    await notification.waitForDisplayed();
    expect(notification).toHaveTextContaining(Message.SUCCESSFULLY_SAVED);

    // Go back to admin screen
    await browser.waitUntil(
      async () => {
        return (
          (await browser.getUrl()) ===
          "https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers"
        );
      },
      {
        timeout: 4000,
        timeoutMsg: "expected url to be different after 4s",
      }
    );
  });

  it("Should display new user info by searching", async () => {
    const inputUsername = await AdminTabScreen.inputUsername;

    await inputUsername.setValue(UserInfo.USERNAME);
    await AdminTabScreen.clickSearchBtn();

    // check result
    const headingResult = await AdminTabScreen.headingResult;
    await headingResult.waitForDisplayed();
    expect(headingResult).toHaveTextContaining("(1) Record Found");
  });

  it("Should display new user in the grid after resetting", async () => {
    await AdminTabScreen.clickResetBtn();

    // Get list of username
    const userNameCard = await AdminTabScreen.userNameCard;
    console.error(userNameCard);

    let userNameList = [];
    for (let i = 0; i < userNameCard.length; i++) {
      const getUserName = await userNameCard[i].getText();
      userNameList.push(getUserName);
    }

    const checkIfValueExist = userNameList.includes(UserInfo.USERNAME);
    expect(checkIfValueExist).toEqual(true);
  });

  xit("Should delete a user by clicking on remove item", async () => {
    const userNameCard = await AdminTabScreen.userNameCard;
    const deleteButtons = await AdminTabScreen.deleteBtn;

    for (let i = 0; i < userNameCard.length; i++) {
      const getUserName = await userNameCard[i].getText();
      if (getUserName === UserInfo.USERNAME) {
        console.log(userNameCard[i]);
        await deleteButtons[i].click();
        await browser.pause(Timer.SHORT); // not a good practice
        await DeleteUserPage.agreedBtn.waitForDisplayed();
        await DeleteUserPage.clickAgreedBtn();
        const notification = await AdminTabScreen.notification;
        await notification.waitForDisplayed();
        expect(notification).toHaveText(Message.SUCCESSFULLY_DELETED);
        break;
      }
    }
  });
});
