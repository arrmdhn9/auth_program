const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { authenticate } = require("../middlewares/authorizeMiddleware");
const dataController = require("../controllers/dataController");

// Route untuk registrasi
router.post("/register", authController.register);

// Route untuk login
router.post("/login", authController.login);

router.get("/dashboard", authenticate, async (req, res) => {
  try {
    let data;
    switch (req.user.role) {
      case "Super Admin":
        data = await dataController.getSuperAdminData(); // Misalnya, mengambil data khusus Super Admin
        break;
      case "Admin":
        data = await dataController.getAdminData(); // Data khusus Admin
        break;
      case "User":
        data = await dataController.getUserData(); // Data khusus User
        break;
      default:
        return res.status(403).send("Role tidak dikenali");
    }
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
