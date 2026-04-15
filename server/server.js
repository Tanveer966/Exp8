const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();

// ----------------------
// MIDDLEWARE (GLOBAL)
// ----------------------
app.use(cors());
app.use(express.json());

// ----------------------
// SECRET KEY
// ----------------------
const SECRET_KEY = "secretkey";

// ----------------------
// STEP 2: LOGIN API (GENERATE TOKEN)
// 👉 WRITE HERE
// ----------------------
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "1234") {
    const token = jwt.sign(
      { id: 1, role: "admin" },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    return res.json({ token });
  }

  return res.status(401).json({ message: "Invalid credentials ❌" });
});

// ----------------------
// STEP 3: MIDDLEWARE (PROTECT ROUTES)
// 👉 WRITE HERE (BEFORE PROTECTED ROUTES)
// ----------------------
function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    req.user = decoded;
    next();
  });
}

// ----------------------
// STEP 4: PROTECTED ROUTE (DASHBOARD)
// 👉 WRITE HERE (USES MIDDLEWARE)
// ----------------------
app.get("/dashboard", verifyToken, (req, res) => {
  res.json({
    message: "Welcome to protected dashboard 🔐",
    user: req.user
  });
});

// ----------------------
// TEST ROUTE
// ----------------------
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// ----------------------
// START SERVER
// ----------------------
const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});