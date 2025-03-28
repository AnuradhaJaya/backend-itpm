const uploadPermission = require("../../helpers/permission");
const collectorModel = require("../../models/collectorModel");
const userModel = require("../../models/userModel");

async function updateCollectorController(req, res) {
  try {
    // Check if the user has permission
    if (!uploadPermission(req.userId)) {
      return res.status(403).json({
        success: false,
        message: "Permission denied",
      });
    }

    const { _id, email, status } = req.body; // Extract required fields

    // Ensure _id is provided
    if (!_id) {
      return res.status(400).json({
        success: false,
        message: "Collector ID is required",
      });
    }

    // Find and update the collector data
    const updateCollector = await collectorModel.findByIdAndUpdate(
      _id,
      { $set: req.body }, // Pass req.body directly
      { new: true, runValidators: true }
    );

    if (!updateCollector) {
      return res.status(404).json({
        success: false,
        message: "Collector record not found",
      });
    }

    // If status is "Approved", update the user's role to "Collector"
    if (status === "Approved" && email) {
      const user = await userModel.findOne({ email });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      user.role = "COLLECTOR"; // Update role
      await user.save();
    }

    return res.json({
      success: true,
      message: "Collector request updated successfully",
      data: updateCollector,
    });
  } catch (err) {
    console.error("Error updating collector:", err);
    return res.status(500).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  }
}

module.exports = updateCollectorController;
