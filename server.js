const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const Rollbar = require("rollbar");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const rollbar = new Rollbar({
  accessToken: 'ecf0bf0995034f20a27dfa9f99c354a2',
  captureUncaught: true,
  captureUnhandledRejections: true
});

const db = require("./models");

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

app.listen(PORT, () => {
  console.log('App running on port ${PORT}!');
});
