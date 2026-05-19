const { analyzeComplaint } = require("../services/aiService");

const analyzeComplaintController = async (req, res, next) => {
  try {
    const analysis = await analyzeComplaint(req.body);
    return res.status(200).json({ analysis });
  } catch (error) {
    next(error);
  }
};

module.exports = { analyzeComplaintController };
