const nodemailer = require("nodemailer");
const { users } = require("../../models");

module.exports = {
  sendemail: async (req, res) => {
    const useremail = req.body.email;

    console.log("---", useremail);

    let number = Math.floor(Math.random() * 1000000) + 100000;
    if (number > 1000000) {
      number = number - 100000;
    }

    console.log("----------", number);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      prot: 587,
      host: "www.bucketscombine.com",
      //host: "smtp.gmail.com",
      secure: false,
      requireTLS: true,
      auth: {
        user: "beggin823@gmail.com",
        pass: "qkdzjuafdlvgxsxd",
      },
    });

    const info = await transporter.sendMail({
      from: "BucketsCombine",
      to: useremail,
      subject: `BucketsCombine에서 이메일 인증입니다.`,
      text: `이메일 인증번호: ${String(number)}`,
    });

    const checkemail = await new Object();
    checkemail.number = number;
    //checkemail
    await res.send(checkemail);
  },
};
