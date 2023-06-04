const       nodeMailer      =       require('nodemailer');
const       ejs             =       require('ejs');
const       path            =       require('path');
// const       env             =       require('./environment');
const env=require('dotenv').config();
let transporter = nodeMailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth:{
        user:process.env.user,
        pass:process.env.password
    }
});

let renderTemplate=(data,relativePath)=>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views',relativePath),
        data,
        function(err,template){
            if(err){
                console.log("Error in creating template",err);
            }
            mailHTML=template;
        }
    )
    console.log(mailHTML)
    return mailHTML;
}

console.log(transporter);

module.exports={
    transporter:transporter,
    renderTemplate:renderTemplate
}