const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid"); // Import the uuid library

const verify_email = (req, res) => {
  const email = req.body.email;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "rjmatic19@gmail.com",
      pass: "wksy iysu ebtl mxku",
    },
  });

  const verificationToken = uuidv4(); // Generate a unique token for verification
  const verificationLink = `http://localhost:3000/?token=${verificationToken}`;

  const mailOptions = {
    from: "rjmatic19@gmail.com",
    to: email,
    subject: "BigBrew - Order Verification",
    html: `
    <p>Thank you for placing your order with BigBrew. Please verify your order by clicking the button below:</p>
    <a href="${verificationLink}" style="background-color: #008CBA; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verify Order</a>
  `,
  };

  transporter.sendMail(mailOptions, async (error, info) => {
    if (error) {
      res.status(404).json({ status: 404, error: error });
    } else {
      res.status(200).json({
        status: 200,
        message: "Email sent successfully",
      });
    }
  });
};

export default verify_email;
