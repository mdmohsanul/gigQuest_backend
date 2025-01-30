const express = require("express");
const { Job } = require("./models/jobModel");
const { initializeDb } = require("./db/db.connect");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
dotenv.config();

// connecting DB
initializeDb();

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Middleware -- bcoz every data that comes is in json Form
app.use(express.json());

// get all jobs

app.get("/jobs", async (req, res) => {
  try {
    const data = await Job.find({});
    res.status(200).json({ data });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// save a job on DB

app.post("/jobs", async (req, res) => {
  try {
    const {
      jobTitle,
      companyName,
      location,
      salary,
      jobType,
      jobDescription,
      requiredQualifications,
    } = req.body;
    if (
      !(
        jobTitle &&
        companyName &&
        location &&
        jobType &&
        jobDescription &&
        requiredQualifications &&
        salary
      )
    ) {
      return res
        .status(400)
        .json({ message: "Please fill the required fields" });
    }
    const job = await Job.create({
      jobTitle,
      companyName,
      location,
      salary,
      jobType,
      jobDescription,
      requiredQualifications,
    });
    /*
     * Another way to save data
     * const job = new Job({})
     *  await job.save();
     */

    res.status(201).json({ message: "Saved Data Successfully", job });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// remove a job from db

app.delete("/jobs/:jobId", async (req, res) => {
  try {
    const job = req.params.jobId;
    if (!job) {
      return res.status(400).json({ message: "Job not found" });
    }
    const deleteJob = await Job.findByIdAndDelete(job);
    res.status(200).json({ message: "Job deleted successfully", deleteJob });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// start server
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
