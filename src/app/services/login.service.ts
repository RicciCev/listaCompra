import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginForm } from '../model/loginForm';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private token: string;

    constructor(private httpClient: HttpClient) {
        this.token = '';
    }

    public getToken(): string {
        return this.token;
    }

    public postLogin(loginModel: LoginForm) {
        console.log('LoginService');
        console.log(JSON.stringify(loginModel));

        // en esta variable definiremos los headers necesarios.
        const httpOptions = {
            headers: new HttpHeaders(
                {
                    'Content-Type': 'application/json'
                }
            )
        };

        // el método post recibe la url y el body json, este json ya lo tenemos a través del loginModel.
        this.httpClient.post('http://localhost:8080/api/authenticate', JSON.stringify(loginModel), httpOptions).subscribe(
            // con el subscribe se quedará escuchando y aquí dentro definimos lo que hará cuando reciba algo.
            (response: any) => {
                // id_token es el token que recibimos a través de la petición post al api.
                this.token = response.id_token;
            },
            error => {
                console.log(error);
            }
        );
    }
}