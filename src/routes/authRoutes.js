const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const router = express.Router();


// REGISTER
router.post("/register", async (req, res) => {

    try {

        const { name, email, password } = req.body;

        // CHECK MISSING FIELDS
        if (!name || !email || !password) {
            return res.status(400).json({
                error: "All fields required"
            });
        }

        // CHECK EXISTING USER
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                error: "User already exists"
            });
        }

        // HASH PASSWORD
        const hashedPassword = await bcrypt.hash(password, 10);

        // CREATE USER
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            message: "User registered successfully"
        });

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

});


// LOGIN
router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        // CHECK USER
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                error: "Invalid email"
            });
        }

        // CHECK PASSWORD
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                error: "Invalid password"
            });
        }

        // CREATE TOKEN
        const token = jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        res.json({
            token
        });

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

});

module.exports = router;