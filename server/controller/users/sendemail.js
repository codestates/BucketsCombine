const nodemailer = require("nodemailer");
const { users } = require("../../models");

module.exports = {
  sendemail: async (req, res) => {
    const useremail = req.body.email;

    console.log("---", useremail);

    const number = Math.floor(Math.random() * 1000000) + 100000;
    if (number > 1000000) {
        number = number - 100000;
    }

    console.log("----------", number);

    const transporter = nodemailer.createTestAccount({
        service: 'gmail',
        prot: 587,
        host: 'smtp.gmail.com',
        secure: false,
        requireTLS: true,
        auth: {
            user: 'beggin823@gmail.com',
            pass: 'qkdzjuafdlvgxsxd'
        }
    })

    const info = await transporter.sendemail({
        from: 'beggin823@gmail.com',
        to: useremail,
        subject: '인증번호입니다.',
        text: String( number ),
    })
    
    const checkemail = await new Object();
    checkemail.number = number;

    await res.send(checkemail);
  },
};