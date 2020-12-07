import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { LoginForm } from '../model/loginForm';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private token: string;
    // boolean que será true cuando el login es correcto, y false cuando sea incorrecto.
    private isLogin: boolean;
    // con el Subject notificaremos a todos los que están suscritos al service que ha cambiado el estado del isLogin.
    private isLogin$: Subject<boolean>;

    constructor(private httpClient: HttpClient) {
        this.token = '';
        this.isLogin = false;
        this.isLogin$ = new Subject<boolean>();
    }

    public getIsLogin(): boolean {
        return this.isLogin;
    }

    public getIsLoginSub(): Observable<any> {
        return this.isLogin$.asObservable();
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
                console.log(response);
                this.token = response.id_token;
                this.isLogin = true;
                /* con el método next del Observable notificamos a todos los componentes que están suscritos a este service
                que ha pasado algo con el elemento isLogin. */
                this.isLogin$.next(this.isLogin);
            },
            error => {
                this.isLogin = false;
                console.log(error);
            }
        );
    }

    // método para desloguear al usuario.
    public logOut(): void {
        this.isLogin = false;
        // se borra el token.
        this.token = '';
        // notificamos al componente que el estado de isLogin ha cambiado.
        this.isLogin$.next(this.isLogin);
    }
}
