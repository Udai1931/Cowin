const express = require('express') 
const {spawn} = require('child_process');
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model('User')
const jwt = require('jsonwebtoken')
const JWT_SECRET = require('../config/keys')
const requireLogin = require('../middleware/requireLogin')
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')
const { SENDGRID_API,EMAIL } = require('../config/keys.js')

const transporter = nodemailer.createTransport({
    service:"hotmail",
    auth:{
        user:'donotreply321@outlook.in',
        pass:'Udai@123'
    }
})

const runscript = async (pin,age,email) => {
    console.log(pin,age,email)
    console.log("started");
    let output = "";
    let process = new Promise((resolve,reject)=>{
        const childPython = spawn('python',['script.py',pin,age]);
        childPython.stdout.on('data',(data)=>{
            let ans = data.toString();
            console.log("output coming")
            console.log(ans)
            ans=ans.split("***");
            output = ans[1];
            if(output!="{}" && output!=undefined){
                console.log(output)
                const options = {
                    from : 'donotreply321@outlook.in',
                    to: email,
                    subject: 'Cowin Notifier',
                    text: output
                }
                transporter.sendMail(options,(err,info)=>{
                    if(err){
                        console.log(err);return;
                    }
                    console.log("Sent"+" "+info.response)
                })
                console.log("FIrst If resolved")
                resolve(output);
            }
            else{
                reject("");
            }
        })
        console.log(1);
        childPython.stderr.on('data',(data)=>{
            console.error("Error : ",data.toString());
        })
        childPython.on('close',(code)=>{
            console.log("closed");
        })
    }).then((data)=>{
        console.log("Out of IF(safely)"+data);
        User.updateOne({email:email},{
            $set:{
                results:output
            }
        })
        .then((data)=>{
            console.log("Updated in DB successfully");
        }).catch((err)=>{
            console.log("Error while updating DB , ",err);
        })
    })
    .catch((err)=>{
        console.log(err);
        console.log("********************ERROR(setInterval starts)************************")
        let id = setInterval(()=>{
            let process = new Promise((resolve,reject)=>{
                const childPython = spawn('python',['script.py',pin,age]);
                childPython.stdout.on('data',(data)=>{
                    let ans = data.toString();
                    // console.log(ans)
                    ans=ans.split("***");
                    output = ans[1];
                    if(output!="" && output!=undefined){
                        console.log(output)
                        clearInterval(id);
                        const options = {
                            from : 'donotreply321@outlook.in',
                            to: email,
                            subject: 'Cowin Notifier',
                            text: JSON.parse(output)
                        }
                        transporter.sendMail(options,(err,info)=>{
                            if(err){
                                console.log(err);return;
                            }
                            console.log("Sent"+" "+info.response)
                        })
                        resolve(output);
                    }
                })
                childPython.stderr.on('data',(data)=>{
                    console.error("Error : ",data);
                })
                childPython.on('close',(code)=>{
                    console.log("closed");
                })
            })
            .then((data)=>{
                User.updateOne({email:email},{
                    $set:{
                        results:output
                    }
                })
                .then((data)=>{
                    console.log("Updated in DB successfully");
                }).catch((err)=>{
                    console.log("Error while updating DB , ",err);
                })
            })
            console.log(1);
        },300000)
    })
    // .finally(()=>{
    //     console.log("Final output "+output);
    //     User.updateOne({email:email},{
    //         $set:{
    //             results:{output}
    //         }
    //     })
    //     .then((data)=>{
    //         console.log("Updated in DB successfully");
    //     }).catch((err)=>{
    //         console.log("Error while updating DB , ",err);
    //     })
    // })
}

router.post('/signup',(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(422).json({error:"Please fill all the fields"})
    }
    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"User already Exist"})
        }
        const user = new User({
            email : email,
            password : password,
            results:""
        })
        user.save()
        .then((user)=>{
            // const options = {
            //     from : 'donotreply321@outlook.in',
            //     to: user.email,
            //     subject: 'Cowin Notifier',
            //     text: "Welcome to Cowin Notifier"
            // }
            // transporter.sendMail(options,(err,info)=>{
            //     if(err){
            //         console.log(err);return;
            //     }
            //     console.log("Sent"+" "+info.response)
            // })
            res.json({message:"Saved User"})
        })
        .catch((err)=> console.log(err))
    })
    .catch(err=>console.log(err))
})

router.post('/login',(req,res)=>{
    const {email,password,age,pin} = req.body;
    if(!email || !password){
        return res.status(422).json({error:"please add email or password"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({error:"Please fill all the fields"})
        }
        let match = password == savedUser.password
        if(match){
            res.json({message:"SuccessFully logged In",user:savedUser})
        }else{
            return res.status(422).json({error:"Invalid Password"})
        }
    })
    .catch(err=>console.log(err))
})

router.post('/login-check',async(req,res)=>{
    const {age,pin,email} = req.body;
    // runscript(pin,age);
    output = await runscript(pin,age,email);
    res.json("Mail Notifier Enabled");
})

router.post('/check',(req,res)=>{
    const {age,pin,email} = req.body;
    console.log("Call Form Profile page");
    let output = "";
    let process = new Promise((resolve,reject)=>{
        const childPython = spawn('python',['script.py',pin,age]);
        childPython.stdout.on('data',(data)=>{
            let ans = data.toString();
            console.log("output coming")
            console.log(ans)
            // ans=ans.split("***");
            output = ans[1];
            resolve(output);
        })
        console.log(1);
        childPython.stderr.on('data',(data)=>{
            console.error("Error : ",data.toString());
        })
        childPython.on('close',(code)=>{
            console.log("closed");
        })
    }).then((data)=>{
        res.json({data:data,udai:"good"});
        console.log("Out of IF(safely)"+data);
        User.updateOne({email:email},{
            $set:{
                results:output
            }
        })
        .then((data)=>{
            console.log("Updated in DB successfully");
        }).catch((err)=>{
            console.log("Error while updating DB , ",err);
        })
    })
})

router.post('/first',(req,res)=>{
    const {age,pin,email} = req.body;
    console.log("First Call Form Profile page");
    let output = "";
    let process = new Promise((resolve,reject)=>{
        const childPython = spawn('python',['script.py',pin,age]);
        childPython.stdout.on('data',(data)=>{
            let ans = data.toString();
            console.log("output coming")
            ans=ans.split("***");
            output = ans[1];
            resolve(output);
        })
        console.log(1);
        childPython.stderr.on('data',(data)=>{
            console.error("Error : ",data.toString());
        })
        childPython.on('close',(code)=>{
            console.log("closed");
        })
    }).then((data)=>{
        res.json({data:data,udai:"good"});
        console.log("Out of IF(safely)"+data);
        User.updateOne({email:email},{
            $set:{
                results:output
            }
        })
        .then((data)=>{
            console.log("Updated in DB successfully");
        }).catch((err)=>{
            console.log("Error while updating DB , ",err);
        })
    })
})

module.exports = router