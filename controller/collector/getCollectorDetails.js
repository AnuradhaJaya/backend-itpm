const collectorModel = require("../../models/collectorModel")

const getCollectorController = async(req,res) => {
    try {
        const allCollector = await collectorModel.find().sort({createAt:-1})

        res.status(201).json({
            message: "All Collectors!",
            error:false,
            success:true,
            data:allCollector
        })
        
    } catch (err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}
module.exports=getCollectorController