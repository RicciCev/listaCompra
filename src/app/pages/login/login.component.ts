import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginForm } from 'src/app/model/loginForm';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginModel: LoginForm;

  constructor() { 
    this.loginModel = new LoginForm();
  }

  ngOnInit(): void {
  }

  // pasamos como parámetro un formulario de tipo NgForm.
  public onSubmit(f: NgForm) {

  }

}
