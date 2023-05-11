import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: any;

  constructor(private router: Router, private toastr: ToastrService) {
    this.loginForm = FormGroup;
    this.createLogin();
  }


  ngOnInit(): void {
  }

  createLogin() {
    this.loginForm = new FormGroup({
      userName: new FormControl(''),
      password: new FormControl(''),
    })
  }

  onLogIn() {
    if (this.loginForm.value.userName == "admin" && this.loginForm.value.password == "admin@123") {
      sessionStorage.setItem('username', this.loginForm.value.userName);
      this.toastr.success('Logged In Successfully')
      this.router.navigateByUrl('task');
    } else {
      this.toastr.error('Wrong Login Credentials!!');
    }
  }

}
