const Page = require("./page");

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
  /**
   * define selectors using getter methods
   */
  get inputUsername() {
    return $("[name=username]");
  }

  get inputPassword() {
    return $("[name=password]");
  }

  get btnSubmit() {
    return $('button[type="submit"]');
  }

  get errorMessage() {
    const errorMessage = $(".oxd-alert-content>p");
    return errorMessage;
  }

  // enter username
  async enterUserName(username) {
    await this.inputUsername.setValue(username);
  }

  // enter password
  async enterPassword(password) {
    await this.inputPassword.setValue(password);
  }

  // click Login button
  async clickLoginBtn() {
    await this.btnSubmit.click();
  }

  // clear value of inputs
  async clearInputValue() {
    await this.inputUsername.clearValue();
    await this.inputPassword.clearValue();
  }

  /**
   * overwrite specific options to adapt it to page object
   */
  open() {
    return super.open("web/index.php/auth/login");
  }
}

module.exports = new LoginPage();
