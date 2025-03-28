const mongoose = require("mongoose");

const collectorSchema =new mongoose.Schema({
    fname: String,
    lname: String,
    email: String,
    phone: String,
    location: String,
    workarea: String,
    fnic: String,
    bnic: String,
    reginumber: String,
    chassisnumber: String,
    vehicle: String,
    status:String,
    role:String,
},
{
    timestamps: true
}
)
const collectorModel = mongoose.model("collector",collectorSchema)
module.exports = collectorModel

