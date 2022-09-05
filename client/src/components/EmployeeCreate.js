import React from 'react';
import '../App.css'
export default class EmployeeCreate extends React.Component {
    constructor() {
      super();
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
      e.preventDefault();
      let form = document.forms.employeeCreateForm;
      let input = {
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        age: form.age.value,
        dateOfJoining: form.dateOfJoining.value,
        title: form.title.value,
        department: form.department.value,
        employeeType: form.employeeType.value,
      };
      this.props.validateInput(input);
    }
    render() {
      return (
        <form
          className="mx-auto"
          name="employeeCreateForm"
          onSubmit={this.handleSubmit}
        >
          <h2 className='text-center'>Add Employee</h2>
          <div className="row mx-2">
            <div className="col form-group">
              <label>First Name</label>
              <input
                required
                type="text"
                className="form-control"
                name="firstName"
                placeholder="First name"
              />
              <span className="mx-2 text-danger">
                {this.props.firstNameError}
              </span>
            </div>
            <div className="col form-group">
              <label>Last Name</label>
              <input
                required
                type="text"
                className="form-control"
                name="lastName"
                placeholder="Last name"
              />
              <span className="mx-2 text-danger">{this.props.lastNameError}</span>
            </div>
          </div>
          <div className="row mx-2">
            <div className="col form-group">
              <label>Age</label>
              <input
                required
                type="number"
                className="form-control"
                name="age"
                placeholder="Age"
              />
              <span className="mx-2 text-danger">{this.props.ageError}</span>
            </div>
            <div className="col form-group">
              <label>Date of Joining</label>
              <input
                type="date"
                required
                className="form-control"
                name="dateOfJoining"
              />
              <span className="mx-2 text-danger">
                {this.props.dateOfJoiningError}
              </span>
            </div>
          </div>
          <div className="row mx-2">
            <div className="col form-group">
              <label>Title</label>
              <select className="form-control" name="title" required>
                <option></option>
                <option value="Employee">Employee</option>
                <option value="Manager">Manager</option>
                <option value="Director">Director</option>
                <option value="VP">VP</option>
              </select>
            </div>
            <div className="col form-group">
              <label>Department</label>
              <select className="form-control" name="department" required>
                <option></option>
                <option value="IT">IT</option>
                <option value="Marketing">Marketing</option>
                <option value="HR">HR</option>
                <option value="Engineering">Engineering</option>
              </select>
            </div>
            <div className="col form-group">
              <label>Employee Type</label>
              <select className="form-control" name="employeeType" required>
                <option></option>
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Contract">Contract</option>
                <option value="Seasonal">Seasonal</option>
              </select>
            </div>
          </div>
          <div className="m-3 d-flex justify-content-center">
            <button className="btn btn-primary btn-lg">Add</button>
          </div>
        </form>
      );
    }
  }