import React from 'react';
import EmployeeCreate from './EmployeeCreate';
import EmployeeSearch from './EmployeeSearch';
import EmployeeTable from './EmployeeTable';
import graphQLFetch from './graphQLFetch';
import URLSearchParams from 'url-search-params';


export default class EmployeeDirectory extends React.Component {
    //initialise state
    constructor() {
      super();
      this.state = {
        employees: [],
        firstNameError: "",
        ageError: "",
        lastNameError: "",
        dateOfJoiningError: "",
      };
      this.employeeCreate = this.employeeCreate.bind(this);
      this.validateInput = this.validateInput.bind(this);
      this.updateEmployee = this.updateEmployee.bind(this);
      this.deleteEmployee = this.deleteEmployee.bind(this);
    }
    //call load method once component mounts
    componentDidMount() {
      //get employee type
      let params = window.location.search;
      let queryParams = new URLSearchParams(params);
      let employeeType = queryParams.get("employeeType");     

      this.loadData(employeeType);      
    }
    //load data method
    loadData(employeeTypeValue) {      
      //get employees through graphql api
      const query = `query {
        employeeList {  
          _id
          id     
          firstName
          lastName
          age
          dateOfJoining
          title
          department
          employeeType
          currentStatus
        }
      }`;
      async function getEmployeeList(url = "", query = {}, variables) {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query, variables
          }),
        });
        return response.json();        
      }
      let variable = {employeeType: employeeTypeValue};
      const result = getEmployeeList("http://localhost:4000/graphql", query, variable).then((result) => {      
        this.setState({
          employees: result.data.employeeList,
        });  
        
        return result.data.employeeList;
      });
      
    }
    async updateEmployee(employee) {    
      const query = `
                mutation employeeUpdate($employee: EmployeeUpdatePayload) {
                        employeeUpdate(employee: $employee) {                          
                            firstName
                            lastName 
                            age
                            dateofJoining
                            title
                            department
                            employeeType                        
                        } 
                }`;
      const response = await graphQLFetch(query, { employee });
      if (response) {
        this.loadData();
      }
    }
    async deleteEmployee(_id) {          
      const query = `
                mutation employeeDelete($_id: String!) {
                        employeeDelete(_id: $_id) {                          
                          id
                          firstName
                          lastName 
                          age
                          dateOfJoining
                          title
                          department
                          employeeType            
                        } 
                }`;
      await graphQLFetch(query, { _id });      
      this.loadData();
      
      
    }
    //function to validate user input
    validateInput(input) {
      let today = new Date();
      let todayTime = today.getFullYear();
      let doj = new Date(input.dateOfJoining);
      let dateOfJoiningTime = doj.getFullYear();
      let error = false;
      if (input.firstName.length < 3) {
        error = true;
        this.setState({
          firstNameError: "First Name is too short",
        });
      }
      if (input.lastName.length < 3) {
        error = true;
        this.setState({
          lastNameError: "Last Name is too short",
        });
      }
      if (input.age < 20 || input.age > 70) {
        error = true;
        this.setState({
          ageError: "Employee age should be between 20-70yrs",
        });
      }
      if (dateOfJoiningTime > todayTime || dateOfJoiningTime < 1970) {
        error = true;
        this.setState({
          dateOfJoiningError:
            "Date of joining should be between Year 1970 - current year",
        });
      }
      if (!error) {
        this.setState({
          ageError: "",
          lastNameError: "",
          firstNameError: "",
          dateOfJoiningError: "",
        });
        let form = document.forms.employeeCreateForm;
        form.firstName.value = "";
        form.lastName.value = "";
        form.age.value = "";
        form.dateOfJoining.value = "";
        form.title.value = "";
        form.department.value = "";
        form.employeeType.value = "";
        //pass input to create employee
        this.employeeCreate(input);
      }
  
    }
    //funtion to create new employee
    async employeeCreate(employee) {
      // post the new employee to db
      const query = `
              mutation employeeCreate($employee: EmployeeInputs!) {
                      employeeCreate(employee: $employee) {                        
                          firstName
                          lastName 
                          age
                          dateOfJoining
                          title
                          department
                          employeeType                        
                      } 
              }`;
      await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },      
        body: JSON.stringify({
          query,
          variables: {
            employee
          }
        })
      });
      this.loadData();         
      
    }
    // load all the components, pass data to the respective components
    render() {
      return (
        <div>          
          <EmployeeSearch />
          <EmployeeTable employees = {this.state.employees} updateEmployee={this.updateEmployee}
              deleteEmployee={this.deleteEmployee} />
          <hr></hr>
          <EmployeeCreate
            validateInput={this.validateInput}
            employeeCreate={this.employeeCreate}
            firstNameError={this.state.firstNameError}
            lastNameError={this.state.lastNameError}
            ageError={this.state.ageError}
            dateOfJoiningError={this.state.dateOfJoiningError}
          />
        </div>
      );
    }
  }