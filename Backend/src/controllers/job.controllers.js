const { application } = require("express");
const jobModel =require("../models/job.model")


// API for add job
async function addjob (req,res){
    try{
        const{company , role, location, salary, status, appliedDate} =req.body;

        const job = await jobModel.create({
            company , role, location, salary, status, appliedDate,user: req.user._id
        });

res.status(201).json({
    message:  "Application for job is complete",
       job
})

    } catch(error){
        return res.status(500).json({
            message: "server is not Working"
         
        })
    }

}


// API for get all job

async function getAllJobs(req,res){
    try{
        
const job = await jobModel.find({
    user: req.user._id
})

res.status(200).json({
    message:  "Jobs fetched successfully",
    job
})



}catch(error){
    res.status(500).json({
        message: "server is not working"
    })
};
   
}

// API for get userbyID

async function getJob (req, res){
    try{
const job =await jobModel.findById(
  req.params.id  
);

  if(!job){
        return res.status(404).json({
            message: "Job not found"
        })
    }

if(job.user.toString()!==req.user._id.toString()){

   return  res.status(403).json({
        message: "unauthorized"
    })
}

res.status(200).json({
    message: "jod fetched successfully",
    job
})

    }catch(error){
        res.status(500).json({
            message: "server is not working "
        })
    }
}

// API for update the jobs

async function updateJob (req,res){
    try{ 
        const job= await jobModel.findById(req.params.id);


         const  {company ,role, location, salary, status}= req.body;   

         if(!job){
            return res.status(404).json({
                message: "Job not found"
            })
         }
        

      if(  job.user.toString() !== req.user._id.toString()){
        return res.status(403).json({
            message: "unauthorized"
        })
      }
       const updatejob =await jobModel.findByIdAndUpdate(req.params.id , {
            company, role, location, salary, status
        },
        {
            new: true,
            runValidators: true

        })


    res.status(200).json({
        message: "Successfully Update",
        updatejob
    })
}catch(error){
    res.status(500).json({
        message: "Server is not Working"
    })
}
   
}


// API for Delete the Jobs
async function deleteJob(req,res){
    try{
        const job= await jobModel.findById(req.params.id);

        if(!job){
            return res.status(404).json({
                message: "job not found"
            })
        }
          if(job.user.toString() !== req.user._id.toString()){
            return res.status(403).json({
                message: "unauthorized"
            })
        }
       
         await jobModel.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message: "Job Deleted successfully"
        })




    }catch(error){
        res.status(500).json({
            message: "Server is not Working"
        })
    }
}
module.exports ={addjob , getAllJobs ,getJob, updateJob, deleteJob}

