const mongoose = require("mongoose");
const Job = require("../models/job");
const Application = require("../models/application");

/**
 * Migration: Initial Database Setup
 * Creates indexes and initial data structure
 */

async function up() {
  console.log("Running migration: 001_initial_setup");

  try {
    // Create indexes for better query performance
    await Job.collection.createIndex({ type: 1 });
    await Job.collection.createIndex({ company: 1 });
    await Job.collection.createIndex({ createdAt: -1 });
    await Job.collection.createIndex({
      title: "text",
      company: "text",
      location: "text",
    });

    // Create indexes for applications
    await Application.collection.createIndex({ job_id: 1 });
    await Application.collection.createIndex({ email: 1 });
    await Application.collection.createIndex({ appliedAt: -1 });

    console.log("✅ Indexes created successfully");

    // Check if we need to seed initial data
    const jobCount = await Job.countDocuments();
    if (jobCount === 0) {
      console.log("No jobs found, will seed initial data...");
      return true; // Indicates that seeding is needed
    } else {
      console.log(`Found ${jobCount} existing jobs, skipping seed data`);
      return false;
    }
  } catch (error) {
    console.error("❌ Migration failed:", error);
    throw error;
  }
}

async function down() {
  console.log("Rolling back migration: 001_initial_setup");

  try {
    // Drop indexes (MongoDB will automatically recreate basic ones)
    await Job.collection.dropIndexes();
    await Application.collection.dropIndexes();

    console.log("✅ Migration rolled back successfully");
  } catch (error) {
    console.error("❌ Rollback failed:", error);
    throw error;
  }
}

module.exports = { up, down };
