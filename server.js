const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const noteRoutes = require("./routes/note.routes");
const userRoutes = require("./routes/user.routes");
const cors = require("cors");
const router = require("./routes/index.routes");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use(userRoutes);
app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
