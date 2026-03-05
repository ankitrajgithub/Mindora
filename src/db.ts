import mongoose, {model, Schema} from "mongoose";
import { setServers } from "node:dns/promises";
setServers(["1.1.1.1", "8.8.8.8"]);

const getEnv=(key:string):string=>{
    const value=process.env[key]  ;
    if(value===undefined){
        throw new Error(`Missing environment variable ${key}`)
    }
    return value;
}

const MONGO_URL=getEnv("MONGO_URL");

mongoose.connect(MONGO_URL)
.then(()=>{
    console.log("Database connect")
})
.catch((e)=>{
    console.log(e)
})

const UserSchema = new Schema({
    username: {type: String, unique: true},
    password: String
})

export const UserModel = model("User", UserSchema);

const ContentSchema = new Schema({
    title: String,
    link: String,
    tags: [{type: mongoose.Types.ObjectId, ref: 'Tag'}],
    type: String,
    userId: {type: mongoose.Types.ObjectId, ref: 'User', required: true },
})

const LinkSchema = new Schema({
    hash: String,
    userId: {type: mongoose.Types.ObjectId, ref: 'User', required: true, unique: true },
})

export const LinkModel = model("Links", LinkSchema);
export const ContentModel = model("Content", ContentSchema);