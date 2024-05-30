import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { enviroments } from '../../../environments/environments';
import { User } from '../interfaces/user.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {

  private baseUrl = enviroments.baseUrl
  private user?: User;

  constructor(
    private http: HttpClient
  ) {}

  get currentUser(): User|undefined {
    if(!this.user) return undefined;
    return structuredClone(this.user);
  }

  set setCurrentUser(user: User) {
    this.user = user;
  }

  login(email: string, password: string):Observable<User>{

    return this.http.get<User[]>(`${this.baseUrl}/users?email=${email}&_limit=1`)
      .pipe(
        map( users => users[0]),
        tap( user => this.user = user ),
        tap( user => console.log(user) ),
        tap( user => {
          if(user)
            localStorage.setItem('token', 'asdFASFJA.asfasfa.AKSFAopaksf' )
        }),
      );
  }

  checkAuthentication(): Observable<boolean>{

    if(!localStorage.getItem('token')) return of(false);
    const token = localStorage.getItem('token');

    return this.http.get<User[]>(`${this.baseUrl}/users?email=${this.user?.email}`)
      .pipe(
        map( users => users[0]),
        tap(user => this.user = user),
        map(user => !!user),
        catchError(err => of(false))
      );
  }

  logout(){
    this.user = undefined;
    localStorage.clear();
  }

  addUser(user: User):Observable<User>{
    return this.http.post<User>(`${this.baseUrl}/users`, user)
  }

}
