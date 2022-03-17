import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserProfile } from './UserProfile';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  errrorArrived :boolean = false;
  RegistrationError :boolean = false;


  constructor(private  http:HttpClient) { }

//http://localhost:5000/user-service/getusers
  executeGetUserService(){
    console.log("executeGetUserService ");
         return  this.http.get<UserProfile[]>('http://userlive-env-dev.eba-kat6ywp8.us-east-2.elasticbeanstalk.com/user-service/getusers');

  }
//http://localhost:5000/user-service/getusersbyname/${username}
  executeGetUserServicebyName(username: any){
    console.log("executeGetUserService ");
         return  this.http.get<UserProfile>(`http://localhost:2022/userservice/getusersbyname/${username}`);

  }



//http://localhost:5000/user-service/uploadProfile/
  UpdateUserProfile(userprofile:UserProfile): Observable<UserProfile> {
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(userprofile);
    console.log(body)
    return this.http.post<UserProfile>('http://localhost:5000/user-service/uploadProfile/' , body,{'headers':headers})
    .pipe(

      catchError(err => {
        console.log('caught mapping error and rethrowing', err);

        return throwError(this.handleError(err));

    })
    )
  }

  RegisterUser(userprofile:UserProfile): Observable<UserProfile> {
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(userprofile);
    return this.http.post<UserProfile>('http://localhost:5000/user-service/Rigester/' , body,{'headers':headers})
    .pipe(

      catchError(err => {
        console.log('caught mapping error and rethrowing', err);

        return throwError(this.RegisterError());

    })
    )
  }


  handleError(error: Response) {
   // console.log("error.status " +error.status)
    if (error.status === 0 ||  error.status === 400 || error.status === 500) {
     console.log("Error arrived")
      this.errrorArrived = true;

    }else{
      this.errrorArrived = false;

    }
  }

  RegisterError(){
    this.RegistrationError = true;
    console.log("in RegisterError "+  this.RegistrationError);
  }

    // } else {
    //   return Observable.throw(error);
    // }




}
