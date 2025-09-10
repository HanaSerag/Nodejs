const Order = require("../models/Order");
const nodemailer = require("nodemailer");

exports.reviewOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { email, stars, description } = req.body;


    if (!email || !stars || !description) {
      return res.status(400).json({ message: "All fields are required: email, stars, description" });
    }
    if (stars < 1 || stars > 5) {
      return res.status(400).json({ message: "Stars must be between 1 and 5" });
    }


    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.review) {
      return res.status(400).json({ message: "You already reviewed this order" });
    }

    order.review = { userEmail: email, stars, description };
    await order.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    let subject, text;
    if (stars <= 2) {
      subject = "We're sorry about your experience";
      text = "We sincerely apologize for the inconvenience you faced. We'll work on improving our service.";
    } else if (stars === 3) {
      subject = "Thank you for your feedback";
      text = "Thanks for rating us! We'll use your feedback to improve.";
    } else {
      subject = "Thank you for your review";
      text = "We're glad you enjoyed the service! Your support means a lot.";
    }

    await transporter.sendMail({
      from: `"My Shop" <${process.env.EMAIL_USER}>`,
      to: email,
      subject,
      text
    });

    return res.status(201).json({
      message: "Review submitted successfully",
      review: order.review
    });

  } catch (err) {
    console.error("Review Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
