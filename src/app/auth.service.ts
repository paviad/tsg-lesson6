import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthService {
  token;

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    var rc = this.http.post<{ token: string }>(`http://localhost:3000/login/${username}`, {
      password: password
    }).pipe(
      tap(r => {
        this.token = r.token;
      }));
    return rc;
  }
}
