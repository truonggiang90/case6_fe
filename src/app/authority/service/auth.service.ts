import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../../model/user/user";
import {BehaviorSubject, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {UserStatus} from "../../model/user/userStatus";
import {environment} from "../../../environments/environment";
import {Message} from "../../model/message";

@Injectable({
  providedIn: 'root'
})


export class AuthService {
  localhost = environment.localhost
  private currentUserSubject?: BehaviorSubject<User> | null;
  public currentUser?: Observable<User>;
  update = new EventEmitter<string>();
  isLoggedIn = false;
  redirectUrl: string | null = null;


  constructor(private http: HttpClient) {
    // @ts-ignore
    let json = JSON.parse(localStorage.getItem("currentUser"))
    this.currentUserSubject = new BehaviorSubject<User>(json);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | undefined {
    return this.currentUserSubject?.value;
  }


  login(username: string, password: string) {
    return this.http.post<User>('http://localhost:8080/api/login', {username, password}).pipe(
      map(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject?.next(user)
        // @ts-ignore
        this.currentUser = this.currentUserSubject.asObservable();
        this.isLoggedIn = true
        this.update.emit('login')
        return user;
      })
    )
  }

  logout() {
    localStorage.removeItem("currentUser");
    return this.http.get<UserStatus>("http://localhost:8080/api/logout/" + this.currentUserValue?.id).subscribe(
      userStatus => {
        // @ts-ignore
        this.currentUserSubject?.next(undefined);
        // @ts-ignore
        this.currentUser = this.currentUserSubject.asObservable();
        this.isLoggedIn = false
        this.update.emit('logout')
        console.log(userStatus)
        return userStatus
      })
  }

  register(username: string, password: string, confirmPassword: string, email: string) {
    let SignUpForm = {
      email:email,
      username: username,
      password: password,
      confirmPassword: confirmPassword
    }
    console.log(SignUpForm)
    return this.http.post<Message>("http://localhost:8080/api/register", SignUpForm).pipe(map(result => {
      console.log(result.message)
      return result.message;
    }))
  }



}
