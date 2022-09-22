const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const user_feedbackSchema = new Schema({ 
    id: {
        type: String, 
        require: true
    }, 

    fullName: { 
        type: String, 
        require: true, 
    }, 

    emailAddress: { 
        type: String, 
        required: true
    }, 

    message: {
        type: String, 
        require: true 
    },

    time: { 
        type: String, 
        require: true
    }

}, { timestamps: true })

const FeedbackUser = mongoose.model('user_feedback', user_feedbackSchema);

module.exports = FeedbackUser; 