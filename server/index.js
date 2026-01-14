// Importing Express module
// const express = require("express");  // old way
import express from "express";          // new way

// Import dotenv module.
import dotenv from "dotenv";
dotenv.config();

// Create an express instance
const app = express();

// Built-in middleware (replaces body-parser)
// parses incoming JSON requests
app.use(express.json());

// Define a route to handle GET requests
app.get("/", function(req, res) {
    res.send("You've reached the root route at /");
});

// Read in PORT number.  Set 3000 to default value
const PORT = process.env.DB_PORT || 3000;

// Set up server listening
app.listen(PORT, function() {
    console.log(`server is running on port ${PORT}`);
});


