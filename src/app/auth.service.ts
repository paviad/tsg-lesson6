import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthService {
  token;

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    var rc = this.http.post<{ token: string }>(
      `http://localhost:3000/login/${username}`, {
        password: password
      }).pipe(
      tap(r => {
        this.token = r.token;
      }));
    return rc;
  }

  addToken(options: { headers: HttpHeaders }) {
    if (!this.token) {
      options.headers = options.headers.delete('Authorization');
    } else {
      options.headers = options.headers.set('Authorization', `Bearer ${this.token}`);
    }
  }
}
