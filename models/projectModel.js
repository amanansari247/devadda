import mongoose from 'mongoose';
const projectSchema = new mongoose.Schema({

    userid:{type:String,required:true},
    tittle:{type:String,required:true},
    description:{type:String},
    imageUrl:{type:String,required:true},
    link:{type:String},
    category:{type:String,required:true}
})

const Project = mongoose.models.project || mongoose.model("project", projectSchema);

export default Project;