import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { EmployeeModel } from './employee-dashboard.module';
import { ApiService } from '../shared/api.service';
// import { HeaderComponent } from '../layouts/header/header.component';
@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
formValue !: FormGroup;
employeeModelObj : EmployeeModel = new EmployeeModel();
employeeData !: any;
showAdd !: Boolean;
showUpdate ! : Boolean;
  constructor(private formbuilder: FormBuilder,
    private api: ApiService) { this.myForm(); }
 //Create required field validator for name
 myForm() {
  this.formValue = this.formbuilder.group({
    firstname: ['', Validators.required ]
  });
}
  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstname: [''],
      lastname: [''],
      email: [''],
      mobile: [''],
salary: ['']
    })
    this.getAllEmployee();
  }
  clickAddEmploye(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
postEmployeeDetails() 
{
  this.employeeModelObj.firstname = this.formValue.value.firstname;
  this.employeeModelObj.lastname = this.formValue.value.lastname;
  this.employeeModelObj.email = this.formValue.value.email;
  this.employeeModelObj.mobile = this.formValue.value.mobile;
  this.employeeModelObj.salary = this.formValue.value.salary;
this.api.postEmploye(this.employeeModelObj)
.subscribe(res=>{
  console.log(res);
  alert("Employee added sucessfully");
  let ref = document.getElementById('cancel')
   ref?.click();
  this.formValue.reset();
  this.getAllEmployee();
},
err=>{
  alert("Something went wrong");
}
)

}
getAllEmployee(){
  this.api.getEmploye()
  .subscribe(res=>{
    this.employeeData = res;
  })
}
deleteSingleEmployee(row : any){
  this.api.deleteEmployee(row.id)
  .subscribe(res=>{
    alert("deleted");
    this.getAllEmployee();
  })
}
onEdit(row : any){
  this.showAdd = false ;
  this.showUpdate = true;
  this.employeeModelObj.id = row.id;
  this.formValue.controls['firstname'].setValue(row.firstname);
  this.formValue.controls['lastname'].setValue(row.lastname);
  this.formValue.controls['email'].setValue(row.email);
  this.formValue.controls['mobile'].setValue(row.mobile);
  this.formValue.controls['salary'].setValue(row.salary);
}
updateEmployeeDetails(){
  this.employeeModelObj.firstname = this.formValue.value.firstname;
  this.employeeModelObj.lastname = this.formValue.value.lastname;
  this.employeeModelObj.email = this.formValue.value.email;
  this.employeeModelObj.mobile = this.formValue.value.mobile;
  this.employeeModelObj.salary = this.formValue.value.salary;
  this.api.updateEmployee(this.employeeModelObj, this.employeeModelObj.id)
  .subscribe(res=>{
    alert("updated sucessfully");
  })
    // let ref = document.getElementById("cancel")
  // ref?=onclick();
  this.formValue.reset();
  this.getAllEmployee();
}
}
