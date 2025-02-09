import mongoose , { Schema, Model } from "mongoose";


const tasktypes = ["TODO" , "IN_PROGRESS" , "DONE"];

const taskSchema = new Schema ({
    id : { type : String , require : true , unique : true},
    title : {type : String , required : true , unique : true},
    description : { type : String  , required : true},
    status : {type : String , enum : tasktypes , required : true},
})

export const taskModel = mongoose.model("task" , taskSchema);