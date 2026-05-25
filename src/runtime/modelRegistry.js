const mongoose = require("mongoose");

const generateSchema = require("./schemaGenerator");

const appConfig = require("../config/appConfig.json");

const models = {};

if (!appConfig.entities || !Array.isArray(appConfig.entities)) {

    console.log("No valid entities found");

} else {

    appConfig.entities.forEach((entity) => {

        const schema = generateSchema(entity.fields);

        models[entity.name] = mongoose.model(
            entity.name,
            schema
        );

    });

    module.exports = models;}