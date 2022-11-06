const mongoose = require('mongoose')
const http = require('http')
const app = require("./app");

require('dotenv').config()

mongoose.connect(process.env.MONGO_URL||'mongodb://localhost:27017/newBlogApi', {
    useUnifiedTopology: true, useNewUrlParser: true
}).then(()=>{ 
    console.log("mongoDB connected");
}).catch((err) => {
    console.log(err);
});


const server=http.Server(app)
const port=process.env.PORT||3000;
server.listen(port, ()=>{
    console.log(`server is running on port localhost:${port}`);
})
