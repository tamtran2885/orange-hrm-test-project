const Page = require("./page");

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
    return $("button[type=submit");
  }

  get notification() {
    return $(".oxd-toast-content>p:nth-child(2)");
  }

  /**
   * enter username, password and confirmed password
   */
  async enterUserName(username) {
    await this.inputUsername.setValue(username);
  }

  async enterPassword(password) {
    await this.inputPassword.setValue(password);
  }

  async enterConfirmedPassword(confirmedPassword) {
    await this.inputConfirmedPassword.setValue(confirmedPassword);
  }

  // click Save button
  async clickSaveBtn() {
    await this.saveBtn.click();
  }
}

module.exports = new AddUserPage();
