class AddUser {
  /**
   * define selectors using getter methods
   */
  get SelectedInput() {
    return $$(".oxd-select-text");
  }

  get options() {
    return $$("[role=option]>span");
  }

  get inputEmployeeName() {
    return $("input[placeholder='Type for hints...']");
  }

  // Even though it's not a good practice, this script uses index to identify the element
  // As the element doesn't have any special identifier
  async selectOption(index, option) {
    const selectedInput = await this.SelectedInput;
    await selectedInput[index].click();

    const options = await this.options;
    for (let i = 0; i < options.length; i++) {
      const element = await options[i].getText();
      if (element.includes(option)) {
        await options[i].click();
        break;
      }
    }
  }

  async selectOptionByHint(hint, timer) {
    const inputEmployeeName = await this.inputEmployeeName;
    await inputEmployeeName.setValue(hint);
    await browser.pause(timer);

    const hints = await this.options;
    const random = Math.floor(Math.random() * hints.length);

    for (let i = 0; i < hints.length; i++) {
      if (i === random) {
        await hints[i].click();
        break;
      }
    }
  }
}

module.exports = new AddUser();
