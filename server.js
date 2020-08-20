const app = require("./app/app");

app.listen(process.env.PORT || process.env.port, (err) => {
  if (err) console.err(err);
  console.info(`Server started on port ${process.env.port} ✔ `);
});
