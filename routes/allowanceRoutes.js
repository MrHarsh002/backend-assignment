import express from "express";
import { createRequest, deleteRequest, getRequests, updateRequestStatus } from "../controllers/allowanceController.js";
const allowanceRouter = express.Router();

allowanceRouter.post("/create", createRequest);
allowanceRouter.get("/", getRequests);
allowanceRouter.put("/:id", updateRequestStatus);
allowanceRouter.delete("/:id", deleteRequest);

export default allowanceRouter;
