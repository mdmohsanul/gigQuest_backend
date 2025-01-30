const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  jobType: {
    type: String,
    enum: [
      "Full-time (On-site)",
      "Part-time (On-site)",
      "Full-time (Remote)",
      "Part-time (Remote)",
    ],
    required: true,
  },
  jobDescription: {
    type: String,
  },
  requiredQualifications: {
    type: String,
    required: true,
  },
});

const Job = mongoose.model("Job", JobSchema);

module.exports = { Job };
