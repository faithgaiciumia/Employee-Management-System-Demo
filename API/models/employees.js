const mongoose =require('mongoose')
const Schema = mongoose.Schema;

const EmployeeSchema= new Schema(
    {   
        id:Number,     
        firstName:String,
        lastName:String,
        age:Number,
        dateOfJoining:Date,
        title:String,
        department:String,
        employeeType:String,
        currentStatus:String,        
    }
);

const EmployeeModel =mongoose.model('EmployeeModel', EmployeeSchema,"employees");
module.exports=EmployeeModel;