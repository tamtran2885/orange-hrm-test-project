const Page = require("./page");

/**
 * sub page containing specific selectors and methods for a specific page
 */
class HomePage extends Page {
  /**
   * define selectors using getter methods - Admin Link
   */

  get adminLink() {
    return $("ul[class=oxd-main-menu]>li:first-child>a");
  }

  /**
   * click Admin link to access user system view
   */
  async clickAdminLink() {
    await this.adminLink.click();
  }

  /**
   * overwrite specific options to adapt it to page object
   */
  open() {
    return super.open("web/index.php/pim/viewEmployeeList");
  }
}

module.exports = new HomePage();
