import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface User {
  username: string,
  password: string
}

@Injectable({
  providedIn: 'root',
})
export class Auth {

  private http = inject(HttpClient) 
  apiUrl = environment.apiUrl

  private currentUserSubject = new BehaviorSubject<any>(null)
  private currentUser$ = this.currentUserSubject.asObservable();

  login(credentials: User): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/auth/login', credentials).pipe(
      tap(response => {
        localStorage.setItem('accessToken', response.accessToken)
      }),

      catchError((error: any) => {
        let userMessage = 'An unexpected login error occurred.';

        if(error.status === 401) {
          userMessage = 'Invalid email or password. Please try again.';
        }
        return throwError(() => new Error(userMessage));

      })
    )
  }
  
}
