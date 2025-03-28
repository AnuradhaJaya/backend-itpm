const userModel = require("../../models/userModel")

async function allUsersDetails(req,res){
    try {
        // console.log("All Users Detail!",req.userId)

        const allusers = await userModel.find()
        res.json({
            message : "all users",
            data: allusers,
            success: true,
            error : false
        })
    } catch (err) {
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}
module.exports = allUsersDetails
