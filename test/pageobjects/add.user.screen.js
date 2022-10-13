const Page = require("./page");
const AddUser = require("../helpers/pageobjects/add.user");

/**
 * sub page containing specific selectors and methods for a specific page
 */
class AddUserPage extends Page {
  /**
   * define selectors using getter methods
   */
  get SelectedInput() {
    return $$(".oxd-select-text");
  }

  get selectedInputText() {
    return $$(".oxd-select-text-input");
  }

  get options() {
    return $$("[role=option]>span");
  }

  get inputUsername() {
    return $$(".oxd-input")[1];
  }

  get inputEmployeeName() {
    return $("input[placeholder='Type for hints...']");
  }

  get inputPassword() {
    return $$("input[type=password]")[0];
  }

  get inputConfirmedPassword() {
    return $$("input[type=password]")[1];
  }

  get saveBtn() {
    return $(".oxd-form-actions>button[type=submit]");
  }

  get notification() {
    return $(".oxd-toast-content>p:nth-child(2)");
  }

  get requiredFields() {
    return $$(".oxd-input-group>span");
  }

  /**
   * enter employee name, username, userRole, status, password, confirmed password
   */

  async selectUserRole(index = 0, userRole) {
    return AddUser.selectOption(0, userRole);
  }

  async selectStatus(index = 1, status) {
    return AddUser.selectOption(1, status);
  }

  async selectEmployeeName(hint, timer) {
    return AddUser.selectOptionByHint(hint, timer);
  }

  // add new user
  async addNewUser(
    userRole,
    hint,
    timer,
    status,
    username,
    password,
    confirmedPassword
  ) {
    await this.selectUserRole(0, userRole);
    await this.selectEmployeeName(hint, timer);
    await this.selectStatus(1, status);
    await this.inputUsername.setValue(username);
    await this.inputPassword.setValue(password);
    await this.inputConfirmedPassword.setValue(confirmedPassword);
    await browser.pause(timer);
    await this.clickSaveBtn();
  }

  /**
   * get values of input fields
   */
  async getUserNameInputValue() {
    await this.inputUsername.getValue();
  }

  async getEmployeeNameInputValue() {
    await this.inputEmployeeName.getValue();
  }

  async getPasswordInputValue() {
    await this.inputPassword.getValue();
  }

  async getConfirmedPasswordInputValue() {
    await this.confirmedPassword.getValue();
  }

  async getUserRolesInputText() {
    await (await this.selectedInputText[0]).getText();
  }

  async getStatusInputText() {
    await (await this.selectedInputText[1]).getText();
  }

  // click Save button
  async clickSaveBtn() {
    await this.saveBtn.click();
  }
}

module.exports = new AddUserPage();
