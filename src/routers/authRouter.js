const express = require('express');
const User = require('../database/schema/usersSchema');
const bcrypt = require('bcryptjs');
const { randomUUID } = require('crypto'); 

const router = express.Router();

router.get('/signup',

    async (req, res) => {
        console.log("Shreehari");
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     return res.status(400).json({
        //         message: errors.array()
        //     });
        // }
        const email = req.query.email
        const password = req.query.password
        const name = req.query.name
        
        try {
            let user = User.findOne({ email }).then(result => {
                if (result) {
                    res.status(400).send({
                        message: "User already exist"
                    })
                }
            })


            console.log(req.query);
            console.log(email);
            console.log(name);
            const userId = randomUUID();
            console.log(userId);
            user = new User({
                userId:userId,
                name:name,
                email: email,
                password: password
            })
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt)
            await user.save();
            res.status(200).send({
                message: "Success"
            })
        } catch (error) {
            res.status(404).send({
                message: "Something went wrong!!"
            })
        }

    })


router.get('/login', async (req, res) => {
    const email = req.query.email
    const password = req.query.password

    try {
        User.findOne({
            email
        }).then(async result => {
            if (!result) {
                return res.status(400).json({
                    message: "User not Exist"
                })
            } else {
                console.log(result);
                const isMatch = await bcrypt.compare(password, result.password);
                console.log(isMatch);
                if (!isMatch) {
                    res.status(401).send({
                        message: "Wrong Password"
                    })
                }else{
                    res.status(200).send({
                        message: "Success",
                        data:result
                    })
                }

               
            }
        })


    } catch (error) {
        console.error(error);
        res.status(404).send({
            message: "Something went wrong"
        })
    }

})

module.exports = router;