const express = require("express");

async function handler(req, res) {
  const feedbackValue = await req.body.feedback;
  console.log(feedbackValue);

  res.status(200).json({ message: feedbackValue });
}

export default handler;
