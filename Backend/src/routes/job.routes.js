const  express =require("express");
const jobController =require("../controllers/job.controllers");
const authMiddleware = require("../middleware/authmiddleware");



const router =express.Router();


router.post("/", authMiddleware, jobController.addjob);
router.get("/", authMiddleware ,jobController.getAllJobs);
router.get("/:id", authMiddleware , jobController.getJob);
router.put("/:id" , authMiddleware, jobController.updateJob);
router.delete("/:id", authMiddleware,jobController.deleteJob);

module.exports =router;