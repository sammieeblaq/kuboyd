const app = require("./app/app");
const connection = require("./config/db.config");

connection.connect();

app.listen(process.env.PORT || process.env.port, (err) => {
  if (err) console.err(err);
  console.info(`Server started on port ${process.env.port} ✔ `);
});
