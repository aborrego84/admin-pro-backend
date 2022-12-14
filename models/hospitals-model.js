const {Schema,model} = require ('mongoose');

 const HospitalSchema = Schema({
    name:{
        type: String,
        require: true,
        unique: true
    },
    img:{
        type: String
    },
    user:{
        require: true,
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
 });
 HospitalSchema.method('toJSON', function(){
    const { __v, _id, ...object} = this.toObject();    
    object.uid = _id;
    return object;
 })
 module.exports = model('Hospital', HospitalSchema);