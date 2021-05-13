const mongoose = require('mongoose');
const { Schema } = mongoose;

const itemSchema = new Schema({


    name:
    {
        type: String,
        required: true
    },

    rarity:
    {
        type: String,
        required: true
    },

    description:
    {
        type: String,
        required: true
    },

    goldPerTurn:
    {
        type: Number,
        required: true
    },

    dateCreated:
    {
        type:Date,
        default:Date.now()
    }
    

});

const itemModel = mongoose.model('Items', itemSchema);

module.exports = itemModel;