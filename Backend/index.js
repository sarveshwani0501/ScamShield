const express = require("express");
const cors = require("cors");
const multer = require("multer");

require("dotenv").config();

const app = express();

const authRoutes = require("./routes/authRoute.js");
const spamRoute = require("./routes/spamRoutes.js");

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MONGODB connected"));

app.use("/api/auth", authRoutes);

app.use("/api/spam-detection", spamRoute);

const PORT = 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
