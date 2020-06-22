// General utility functions

const { format } = require("date-fns");
module.exports = {
  // Time Utility.
  formatDate: (date) => format(date, "dd-mm-yyyy  h:mm a"),
};
