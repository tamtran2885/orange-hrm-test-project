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

  // login
  async login(username, password) {
    await this.inputUsername.setValue(username);
    await this.inputPassword.setValue(password);
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
