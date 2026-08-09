const mongoose =require ("mongoose");


const jobschema = new mongoose.Schema({
    company: {
        type: String,
        required: true,
    },
    role:{
        type:String,
        required: true,
    },
    location:{
        type:String,
        required:true,
    },
    salary:{
        type: String,
        required: true,
    },
    status:{
        type: String,
        enum: ["Applied", "Interview", "Rejected", "Selected"],
        default:"Applied",
    },
    appliedDate:{
        type:Date,
        default: Date.now,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,  
        ref: "user",                          
        required: true,       
    },

});

const jobModel = mongoose.model("job", jobschema);


module.exports= jobModel;


