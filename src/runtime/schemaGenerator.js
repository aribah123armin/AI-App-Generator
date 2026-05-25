const mongoose = require("mongoose");

const generateSchema = (fields) => {

    const schemaFields = {};

    fields.forEach((field) => {


        if (!field.name || !field.type) {
            console.log("Invalid field skipped");
            return;
        }

        let fieldType;

        switch (field.type) {

            case "string":
                fieldType = String;
                break;

            case "number":
                fieldType = Number;
                break;

            case "boolean":
                fieldType = Boolean;
                break;

            default:

                console.log(
                    `Unknown field type: ${field.type}`
                );

                fieldType = String;
        }

        schemaFields[field.name] = {
            type: fieldType,
            required: field.required || false
        };

    });

    schemaFields.userId = {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    };

    return new mongoose.Schema(schemaFields, {
        timestamps: true
    });

};

module.exports = generateSchema;