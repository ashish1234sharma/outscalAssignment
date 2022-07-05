const mongoose= require("mongoose")

const connect=()=>{

    return(
        mongoose.connect("mongodb+srv://12345:12345@cluster0.9hyaszf.mongodb.net/?retryWrites=true&w=majority")
    )
}
module.exports = connect