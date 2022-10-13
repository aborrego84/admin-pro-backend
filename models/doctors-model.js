const {Schema,model} = require ('mongoose');

 const DoctorSchema = Schema({
    name:{
        type:String,
        require:true,
        unique:true
    },
    img:{
        type:String
    },
    user:{
        require:true,
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    hospital:{
        require:true,
        type:Schema.Types.ObjectId, 
        ref:'Hospital'
    }
 });
 DoctorSchema.method('toJSON', function(){
    const { __v, _id, ...object} = this.toObject();    
    object.uid = _id;
    return object;
 })
 module.exports = model('Doctor', DoctorSchema);