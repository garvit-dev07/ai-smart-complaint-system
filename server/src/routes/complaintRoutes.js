const express = require("express");
const { body, query } = require("express-validator");
const {
  addComplaint,
  getAllComplaints,
  updateComplaintStatus,
  deleteComplaint,
  searchComplaintsByLocation,
} = require("../controllers/complaintController");
const { protect } = require("../middleware/authMiddleware");
const { handleValidation } = require("../middleware/validate");

const router = express.Router();

router.use(protect);

router.get("/", getAllComplaints);
router.get(
  "/search",
  [query("location").optional().isString().withMessage("Location must be a string"), handleValidation],
  searchComplaintsByLocation
);
router.post(
  "/",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email"),
    body("title").trim().notEmpty().withMessage("Title is required"),
    body("description").trim().notEmpty().withMessage("Description is required"),
    body("category").trim().notEmpty().withMessage("Category is required"),
    body("location").trim().notEmpty().withMessage("Location is required"),
    body("status")
      .optional()
      .isIn(["Pending", "In Progress", "Resolved", "Rejected"])
      .withMessage("Invalid status"),
    handleValidation,
  ],
  addComplaint
);
router.put(
  "/:id",
  [
    body("status")
      .notEmpty()
      .isIn(["Pending", "In Progress", "Resolved", "Rejected"])
      .withMessage("Invalid status"),
    handleValidation,
  ],
  updateComplaintStatus
);
router.delete("/:id", deleteComplaint);

module.exports = router;
