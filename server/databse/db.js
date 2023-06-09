import mongoose from "mongoose";

const Connection = async (username = 'shailjagupta', password = 'shailjagupta') => {
    const URL = `mongodb+srv://${username}:${password}@cluster0.kyljx0t.mongodb.net/?retryWrites=true&w=majority`

    try {
        await mongoose.connect(URL , {useUnifiedTopology : true , useNewUrlParser : true})
          console.log("connected")
    } catch(error) {
        console.log("error" , error)
    }
}
export default Connection;
