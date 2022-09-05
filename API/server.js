const express = require("express");
const {ApolloServer} = require("apollo-server-express");
const { GraphQLScalarType, Kind } = require("graphql");
const app = express();
 
require("./models/db");
const EmployeeModel = require("./models/employees");


let employeesList = [];

const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date Custom Scalar Type",
  serialize(value) {
    return value.toISOString(); 
  },
  parseValue(value) {
    return new Date(value);
  },
  parseLiteral(ast) {
    if (ast.kind == Kind.INT) {
      return new Date(parseInt(ast.value, 10));
    } else if (ast.kind == Kind.STRING) {
      return new Date(ast.value);
    }
    return null;
  },
});
const typeDefs = `
enum StatusType {
  Working
  Retired
}
input EmployeeInputs {
    firstName: String!
    lastName: String
    age: String
    dateOfJoining: Date
    title: String
    department: String
    employeeType: String  
    currentStatus: Int      
}
scalar Date
type Employee {    
    _id:String
    id: Int    
    firstName: String
    lastName: String
    age: Int
    dateOfJoining: Date 
    title: String
    department: String
    employeeType: String
    currentStatus: Int
},
type EmployeeUpdate {
  title: String
  department: String
  currentStatus: Int
},
input EmployeeUpdatePayload {
  title: String!    
  department: String!
  currentStatus: Int!    
}

type Query {    
    employeeList: [Employee!]!
}
type Mutation {    
    employeeCreate(employee: EmployeeInputs!): Employee!    
    employeeSearch(employeeType:String!): Employee
    employeeDelete(_id: String!) : Employee
    updateEmployee(employee: EmployeeUpdatePayload) : EmployeeUpdate
    SingleEmployee(_id: String!) : Employee
}`;

const resolvers = {  
  Date: dateScalar,
  Query: {    
    employeeList,
  },
  Mutation: {    
    employeeCreate,
    updateEmployee,
    SingleEmployee,
    employeeDelete,
    employeeSearch,
  },
};

async function employeeList(parent, args, context, info) {
  
  if(args.employeeType){    
    await EmployeeModel.find(args).then((data) => {
      employeesList = data;
    });   
    return employeesList;
  }
  else{
    await EmployeeModel.find({}).then((data) => {
      employeesList = data;
    });  
    return employeesList;
  }
  
}
async function employeeCreate(_, { employee }) {   
  employee.id = employeesList.length + 1;
  employee.age = parseInt(employee.age);     
  employee.currentStatus = 1;
  await EmployeeModel.create(employee, function (err,data) {
    if(err){
      console.log(err);
    }    
  });
  return employee;
}
async function SingleEmployee(_, { _id }) {
  const employee = await EmployeeModel.findById({_id})
  return employee;
}
async function updateEmployee(_, {employee}) {
  await EmployeeModel.findOneAndUpdate({_id: employee._id}, {
      title: employee.title,
      department: employee.department,
      curentStatus: employee.currentStatus
  }).then(employee => {
      return true;
  }).catch(error => {
      return false;
  })
}

async function employeeDelete(_, { _id }) {
  await EmployeeModel.findByIdAndDelete({_id}, function(err,data){
    
  }).then((employee)=>{
    
    return true;
  })
  .catch((err)=>{
    return false;
  });
}

async function employeeSearch(_, { employeeType }) {
  const employee = await EmployeeModel.find({employeeType:employeeType}, function (err, data) {
    console.log(err, data);
  });
  return employee;
}
const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (error) => {
    console.log(error);
    return error;
  },
});

//app.use(express.static("public"));

server.start().then(() => {
  server.applyMiddleware({
    app,
    path: "/graphql",
    cors: true,
  }); 
});
app.listen(4000, function () {
  console.log("API Server listening on Port 4000");
});
