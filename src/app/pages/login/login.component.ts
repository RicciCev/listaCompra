import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginForm } from 'src/app/model/loginForm';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginModel: LoginForm;
  sub: any;

  constructor(private loginService: LoginService, private router: Router) {
    this.loginModel = new LoginForm();
  }

  ngOnInit(): void {
    // nos devuelve un objeto Observable y lo guardamos en la variable sub.
    this.sub = this.loginService.getIsLoginSub().subscribe(
      response => {
        console.log('ngOnInit');
        console.log(response);
        if(response) {
          this.router.navigate(['productos']);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnDestroy(): void {
    // cuando se destruya este componente es importante desuscribirse de cualquier service o método.
    this.sub.unsubscribe();
  }

  // pasamos como parámetro un formulario de tipo NgForm.
  public onSubmit(f: NgForm) {
    this.loginService.postLogin(this.loginModel);
  }

}
