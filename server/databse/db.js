import mongoose from "mongoose";

const Connection = async (username = 'shailjagupta', password = 'shailjagupta') => {
    const URL = `mongodb+srv://shailjagupta4466:shailja123@new.3r2loco.mongodb.net/?retryWrites=true&w=majority`

    try {
        await mongoose.connect(URL , {useUnifiedTopology : true , useNewUrlParser : true})
          console.log("connected")
    } catch(error) {
        console.log("error" , error)
    }
}
export default Connection;
