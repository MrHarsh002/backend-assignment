import AllowanceRequest from "../models/allowanceRequest.js";
import User from "../models/userModel.js";

export const createRequest = async (req, res) => {
  try {
    const { userId, amount, description } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const newRequest = await AllowanceRequest.create({
      userId,
      amount,
      description
    });

    res.status(201).json(newRequest);
  } catch (error) {
    console.error("Create Request Error:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getRequests = async (req, res) => {
  try {
    const requests = await AllowanceRequest.find()
      .populate("userId", "name email department");
    const formattedRequests = requests.map(req => ({
      ...req.toObject(),
      user: req.userId
    }));

    res.status(200).json(formattedRequests);
  } catch (error) {
    console.error("Get Requests Error:", error);
    res.status(500).json({ message: "Error fetching requests", error: error.message });
  }
};


export const updateRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    const request = await AllowanceRequest.findByIdAndUpdate(id, { status }, { new: true });

    if (!request) return res.status(404).json({ message: "Request not found" });

    res.status(200).json({ message: "Status updated", request });
  } catch (error) {
    res.status(500).json({ message: "Error updating status", error });
  }
};


export const deleteRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await AllowanceRequest.findByIdAndDelete(id);

    if (!request) return res.status(404).json({ message: "Request not found" });

    res.status(200).json({ message: "Request deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting request", error });
  }
};
