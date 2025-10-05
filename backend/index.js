const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
PORT=5001;
const app = express();


app.use(cors()); // allow frontend requests
app.use(express.json());

mongoose.connect("mongodb+srv://xyz:123@vehicle.mjfjfb5.mongodb.net/?retryWrites=true&w=majority&appName=vehicle", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/auth", require("./routes/auth"));
app.use("/request", require("./routes/request"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const path = require("path");

// ✅ Serve frontend in production
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../frontend/build");
  app.use(express.static(frontendPath));

  // Catch-all route for React Router
  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}
