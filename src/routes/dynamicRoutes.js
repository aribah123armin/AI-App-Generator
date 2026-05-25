const express = require("express");

const router = express.Router();

const models = require("../runtime/modelRegistry");

const authMiddleware = require("../middleware/authMiddleware");

const validateEntity = require("../middleware/validateEntity");

Object.keys(models).forEach((modelName) => {

    const Model = models[modelName];

    // CREATE
    router.post(
        `/${modelName}`,
        authMiddleware,
        validateEntity,
        async (req, res) => {

            try {

                const item = await Model.create({
                    ...req.body,
                    userId: req.user.id
                });

                res.status(201).json(item);

            } catch (err) {

                res.status(400).json({
                    error: err.message
                });

            }

        });

    // READ
    router.get(`/${modelName}`, authMiddleware, async (req, res) => {

        try {

            const items = await Model.find({
                userId: req.user.id
            });

            res.json(items);

        } catch (err) {

            res.status(500).json({
                error: err.message
            });

        }

    });

    // UPDATE
    router.put(`/${modelName}/:id`, authMiddleware, async (req, res) => {

        try {

            const updatedItem = await Model.findOneAndUpdate(
                {
                    _id: req.params.id,
                    userId: req.user.id
                },
                req.body,
                {
                    new: true
                }
            );

            res.json(updatedItem);

        } catch (err) {

            res.status(400).json({
                error: err.message
            });

        }

    });

    // DELETE
    router.delete(`/${modelName}/:id`, authMiddleware, async (req, res) => {

        try {

            await Model.findOneAndDelete({
                _id: req.params.id,
                userId: req.user.id
            });

            res.json({
                message: "Deleted Successfully"
            });

        } catch (err) {

            res.status(500).json({
                error: err.message
            });

        }

    });

});

module.exports = router;