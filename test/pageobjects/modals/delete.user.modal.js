const Page = require("../page");

/**
 * sub page containing specific selectors and methods for a specific page
 */
class DeleteUserPage extends Page {
  /**
   * define selectors using getter methods
   */
  get agreedBtn() {
    return $(".orangehrm-modal-footer>button:nth-child(2)");
  }

  /**
   * execute delete action
   */
  async clickAgreedBtn() {
    await this.agreedBtn.click();
  }
}

module.exports = new DeleteUserPage();
