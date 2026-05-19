const Complaint = require("../models/Complaint");
const { analyzeComplaint } = require("../services/aiService");
const escapeRegex = require("../utils/escapeRegex");

const addComplaint = async (req, res, next) => {
  try {
    const analysis = await analyzeComplaint(req.body);
    const complaint = await Complaint.create({
      ...req.body,
      status: req.body.status || "Pending",
      priority: analysis.priority,
      department: analysis.department,
      summary: analysis.summary,
      autoResponse: analysis.autoResponse,
      aiSource: analysis.source,
      createdBy: req.user._id,
    });

    return res.status(201).json({
      message: "Complaint stored successfully",
      complaint,
    });
  } catch (error) {
    next(error);
  }
};

const getAllComplaints = async (req, res, next) => {
  try {
    const { category, location, search } = req.query;
    const filters = {};

    if (req.user.role !== "admin") {
      filters.createdBy = req.user._id;
    }

    if (category) {
      filters.category = new RegExp(escapeRegex(category), "i");
    }

    if (location) {
      filters.location = new RegExp(escapeRegex(location), "i");
    }

    if (search) {
      const escapedSearch = escapeRegex(search);
      filters.$or = [
        { title: new RegExp(escapedSearch, "i") },
        { description: new RegExp(escapedSearch, "i") },
        { location: new RegExp(escapedSearch, "i") },
      ];
    }

    const complaints = await Complaint.find(filters)
      .sort({ createdAt: -1 })
      .populate("createdBy", "name email role");

    return res.status(200).json({ complaints });
  } catch (error) {
    next(error);
  }
};

const updateComplaintStatus = async (req, res, next) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    if (req.user.role !== "admin" && complaint.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Forbidden. Cannot update this complaint." });
    }

    complaint.status = req.body.status || complaint.status;
    await complaint.save();

    return res.status(200).json({
      message: "Complaint status updated successfully",
      complaint,
    });
  } catch (error) {
    next(error);
  }
};

const deleteComplaint = async (req, res, next) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    if (req.user.role !== "admin" && complaint.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Forbidden. Cannot delete this complaint." });
    }

    await complaint.deleteOne();

    return res.status(200).json({ message: "Complaint removed successfully" });
  } catch (error) {
    next(error);
  }
};

const searchComplaintsByLocation = async (req, res, next) => {
  try {
    const { location } = req.query;

    if (!location?.trim()) {
      return res.status(400).json({ message: "Location query is required" });
    }

    const filters = {
      location: new RegExp(escapeRegex(location), "i"),
    };

    if (req.user.role !== "admin") {
      filters.createdBy = req.user._id;
    }

    const complaints = await Complaint.find(filters).sort({ createdAt: -1 });
    return res.status(200).json({ complaints });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addComplaint,
  getAllComplaints,
  updateComplaintStatus,
  deleteComplaint,
  searchComplaintsByLocation,
};
