import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../domain/user.model';
import { Auth } from '../domain/auth.model';

@Injectable()
export class AuthService {

    private readonly domain = 'users';
    private headers = new Headers({
        'Content-Type': 'application/json'
    });
    private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' +
    '.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9' +
    '.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ';

    constructor(
        private http: Http,
        @Inject('BASE_CONFIG') private config
    ) {

    }

    //注册
    register(user: User): Observable<Auth> {
        user.id = null;
        const uri = `${this.config.uri}/${this.domain}`;
        return this.http
            .get(uri, { params: { 'email': user.email } })
            .switchMap(res => {
                if (res.json().length > 0) {
                    throw 'user existed';
                }
                return this.http
                    .post(uri, JSON.stringify(user), { headers: this.headers })
                    .map(r => ({ token: this.token, user: r.json() }));
            })
    }

    //登录
    login(username: string, password: string): Observable<Auth> {
        const uri = `${this.config.uri}/${this.domain}`;
        return this.http
            .get(uri, { params: { 'email': username, 'password': password } })
            .map(res => {
                if (res.json().length === 0) {
                    throw 'username or password not match';
                }
                return {
                    token: this.token,
                    user: res.json()[0]
                }
            })
    }
}