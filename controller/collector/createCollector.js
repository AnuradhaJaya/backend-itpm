const collectorModel = require("../../models/collectorModel")

async function CreateCollectorController(req,res) {
    try{

        const payload = {
            ...req.body,
            status: "Pending",
            role: "GENERAL",
        }

        const createCollector = new collectorModel(payload)
        const saveCollector = await createCollector.save()

        res.status(201).json({
            message: "Form submit successfully!",
            error:false,
            success:true,
            data:saveCollector
        })

    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
    
}

module.exports = CreateCollectorController