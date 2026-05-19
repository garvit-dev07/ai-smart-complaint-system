const express = require("express");
const { body } = require("express-validator");
const { analyzeComplaintController } = require("../controllers/aiController");
const { protect } = require("../middleware/authMiddleware");
const { handleValidation } = require("../middleware/validate");

const router = express.Router();

router.post(
  "/analyze",
  protect,
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("title").trim().notEmpty().withMessage("Title is required"),
    body("description").trim().notEmpty().withMessage("Description is required"),
    body("category").trim().notEmpty().withMessage("Category is required"),
    body("location").trim().notEmpty().withMessage("Location is required"),
    handleValidation,
  ],
  analyzeComplaintController
);

module.exports = router;
