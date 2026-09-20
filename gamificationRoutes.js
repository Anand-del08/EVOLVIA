const express = require("express");
const { processActivity } = require("../controllers/gamificationController");

const router = express.Router();

//Process a gamification activity
router.post("/activity",processActivity );j

module.exports=router;

const express =require("express");
const{
    processUserActivity
}=require("../controllers/gamificationController");

const router = express.Router();
router.post("/activity",req,res)=>{
    try{
        const{userId,activityType}=req.body;

        if(!userId || !activityType){
            return res.status(400).json({
                success:false,
                message;"userId and activityType are required"
            });
        }

        const result=processUserActivity(
            user
        )
    }
}