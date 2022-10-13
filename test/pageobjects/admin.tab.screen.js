const Page = require("./page");

/**
 * sub page containing specific selectors and methods for a specific page
 */
class AdminTabScreen extends Page {
  /**
   * define selectors using getter methods
   */
  get userManagementTab() {
    return $("nav>ul>li:first-child");
  }

  get usersOption() {
    return $("nav>ul>li:first-child>ul>li:first-child");
  }

  get addButton() {
    return $(".orangehrm-header-container>button");
  }

  get inputUsername() {
    return $$(".oxd-input")[1];
  }

  get searchBtn() {
    return $(".oxd-form-actions>button:nth-child(2)");
  }

  get resetBtn() {
    return $(".oxd-form-actions>button:first-child");
  }

  get headingResult() {
    return $(".orangehrm-horizontal-padding>span");
  }

  get pageHeading() {
    return $$("h6")[1];
  }

  get userNameCard() {
    return $$(
      ".card-center>.card-item.card-body-slot>.oxd-table-cell:first-child>.oxd-table-card-cell>.data"
    );
  }

  get deleteBtn() {
    return $$(".oxd-table-cell-actions>button:first-child");
  }

  get notification() {
    return $(".oxd-toast-content>p:nth-child(2)");
  }

  /**
   * open user system view
   */

  // click on User Management tab
  async clickUserManagementTab() {
    const userManagementTab = await this.userManagementTab;
    await userManagementTab.waitForDisplayed();
    await userManagementTab.click();
  }

  // click on Users option
  async clickUsersOption() {
    const usersOption = await this.usersOption;
    await usersOption.waitForDisplayed();
    await usersOption.click();
  }

  /**
   * open system view for user adding
   */
  async clickAddBtn() {
    const addButton = await this.addButton;
    await addButton.waitForDisplayed();
    await addButton.click();
  }

  // click Search button
  async clickSearchBtn() {
    await this.searchBtn.click();
  }

  // click Reset Button
  async clickResetBtn() {
    await this.resetBtn.click();
  }

  /**
   * overwrite specific options to adapt it to page object
   */
  open() {
    return super.open("web/index.php/pim/viewEmployeeList");
  }
}

module.exports = new AdminTabScreen();
