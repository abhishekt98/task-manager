var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USER,
        pass: process.env.PASS
    }
});
const welcomemail = (email, name) => {
    var mailOptions = {
        from: process.env.USER,
        to: email,
        subject: 'Welcome to Task-manager',
        text: `Hi ${name} try your self in Task-manager to plan your day`
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {

        }
    })
}

module.exports = {
    welcomemail
}