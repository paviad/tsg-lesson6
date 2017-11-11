import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  token;

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<{ token: string }> {
    var rc = this.http.post<{ token: string }>(
      `http://localhost:3000/login/${username}`, {
        password: password
      }).pipe(
      tap(r => {
        this.token = r.token;
      }));
    return rc;
  }

  logout() {
    var opts = { headers: new HttpHeaders() };
    this.addToken(opts);
    var rc = this.http.get(`http://localhost:3000/logout`, opts);
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
