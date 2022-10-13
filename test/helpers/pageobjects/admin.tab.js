class AdminTab {
  /**
   * define selectors using getter methods
   */
  get userNameCard() {
    return $$(
      ".card-center>.card-item.card-body-slot>.oxd-table-cell:first-child>.oxd-table-card-cell>.data"
    );
  }

  async getUserNameList() {
    const userNameCard = await this.userNameCard;

    let userNameList = [];
    for (let i = 0; i < userNameCard.length; i++) {
      const getUserName = await userNameCard[i].getText();
      userNameList.push(getUserName);
    }
    return userNameList;
  }
}

module.exports = new AdminTab();
