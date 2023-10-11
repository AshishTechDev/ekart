const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const MONGODB_URI = `mongodb+srv://${
  process.env.DB_USERNAME
}:${encodeURIComponent(process.env.DB_PASSWORD)}@cluster0.27sicvx.mongodb.net/${
  process.env.DB_NAME
}?retryWrites=true&w=majority`;
  
  const app = express();
  
  
  const adminRoutes = require("./routes/admin");
  const shopRoutes = require("./routes/shop");
  const authRoutes = require("./routes/auth");

app.use(bodyParser.json());
app.use("/uploads/images", express.static("uploads/images"));


//CORS middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH, HEAD");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});


  app.use("/api/admin", adminRoutes);
  app.use("/api", shopRoutes);
  app.use("/api", authRoutes);

mongoose
  .connect(MONGODB_URI)
  .then(() => {

    app.listen(4000, "localhost", () => {
      console.log("Backend is running at port 4000");
    
      // User.create({ email: "user@example.com", password: "password"});
    });
  })
  .catch((err) => console.log(err));
