const   nodeMailer  =   require('../config/nodemailer');
const env=require('dotenv').config();


exports.reset=async (link)=>{
    let htmlString=nodeMailer.renderTemplate({link:link},'/mailers/forgot_password.ejs');
    nodeMailer.transporter.sendMail({
        from:process.env.user,
        to:link.email,
        subject:'Recovery:Reset your Password.',
        html:htmlString,
    },(err,info)=>{
        if(err)
            {
                console.log('error in sending mail',err);
                return;
            }
            return ;
    })
    return;
}