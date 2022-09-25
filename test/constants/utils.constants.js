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
}

module.exports = { Timer, AdminInfo, HomePageInfo, Message };
