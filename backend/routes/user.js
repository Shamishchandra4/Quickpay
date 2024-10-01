const express = require('express');
const zod = require('zod')
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { User, Account } = require("../db");
const { authMiddleware } = require("../middleware")
const router = express.Router();


const signupBody = zod.object({
    username: zod.string(),
    password: zod.string(),
    firstname: zod.string(),
    lastname: zod.string()
})


router.post("/signup", async (req, res) => {
    const { success } = signupBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "incorrect inputs"
        })
    }
    const existingUser = await User.findOne({
        username: req.body.username
    })

    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken"
        })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstname,
        lastName: req.body.lastname,
    })
    const userId = user._id;
    await Account.create({
        userId,
        balance: 1 + Math.random() * 100000
    })
    const token = jwt.sign({
        userId
    }, JWT_SECRET);    
    const name=user.firstName +" "+ user.lastName

    res.json({
        message: "User created successfully",
        token: token,
        name: name
    })


})

const signinBody = zod.object({
    username: zod.string(),
    password: zod.string(),
})

router.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }
    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });
    const name=user.firstName +" "+ user.lastName
    if (user) {
        const token = jwt.sign({
            userId: user._id,
        }, JWT_SECRET)
        res.json({
            token: token,
            name: name
        })
        return
    }

    res.status(411).json({
        message: "Error while sign in"
    })
})

const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),

})

router.put("/", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "wrong inputs to update information"
        })
    }
    await User.updateOne({ _id: req.userId }, req.body);
    res.json({
        message: "Updated successfully"
    })

})

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";
    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })
    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})


module.exports = router;