const { format } = require("date-fns");

module.exports = {
  formatDate: (date) => format(date, "dd-mm-yyyy  h:mm a"),
};
