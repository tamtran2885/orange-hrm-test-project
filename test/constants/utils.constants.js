class Timer {
  static SHORT = "2000";
  static MEDIUM = "3000";
  static LONG = "4000";
}

class AdminInfo {
  static USERNAME = "Admin";
  static PASSWORD = "admin123";
}

class HomePageInfo {
  static HEADING = "PIM";
}

class Message {
  static FAILED_LOGIN = "Invalid credentials";
  static SUCCESSFULLY_SAVED = "Successfully Saved";
  static SUCCESSFULLY_DELETED = "Successfully Deleted";
  static REQUIRED = "Required";
  static USERNAME_MINIMUM_LENGTH = "Should be least 5 characters";
  static PASSWORD_NOT_MATCH = "Passwords do not match";
  static PASSWORD_MINIMUM_LENGTH = "Should have at least 8 characters";
  static PASSWORD_INVALID =
    "Your password must contain a lower-case letter, an upper-case letter, a digit and a special character. Try a different password";
}

module.exports = { Timer, AdminInfo, HomePageInfo, Message };
