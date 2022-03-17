import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { UserProfile } from '../data/service/UserProfile';
import { UserserviceService } from '../data/service/userservice.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {


  userprofiledata: UserProfile | undefined;
  userprofiledata1: UserProfile | undefined;
  user: FormGroup;

  errorflag = false;
  successflag = false;
  fn: string | undefined;
  successMsg = "Your Profile Registered Successfully";

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private router: Router, private userservicedata: UserserviceService) {

    this.user = this.formBuilder.group({
      firstname: [],
      lastname: [],
      username: [],
      email: [],
      phone: [],
      passcode: []
    });



  }

  ngOnInit(): void {

  }


  RegisterUserprofile(userprofile: UserProfile): Observable<UserProfile> {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(userprofile);
    return this.http.post<UserProfile>('http://localhost:5000/user-service/Rigester/', body, { 'headers': headers })
      .pipe(

        catchError(err => {
          return throwError(this.handleException)

        }


        )
      )

  }
  getPost(userprofile: UserProfile): Observable<UserProfile> {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(userprofile);
    return this.http.post<UserProfile>('http://localhost:2022/userservice/uploadProfile', body, { 'headers': headers })
      .pipe(
        retry(1),

        catchError((error: HttpErrorResponse) => {
          this.router.navigate(['Error']);
          let errorMessage = '';
          if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
          } else {
            // server-side error
            errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;
          }
          console.log(errorMessage);
          return throwError(errorMessage);
        })

      );
  }

  private handleException(errorresponse: HttpErrorResponse) {
    this.router.navigate(['Error'])
    this.errorflag = true;
    if (errorresponse.error instanceof ErrorEvent) {

      console.log('Client side Error ', errorresponse.error.message);

    } else {

      console.log('Server side Error ', errorresponse.error.message);

    }


  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async submitForm() {
    var userid = null;

    console.log(this.user.getRawValue().firstname);
    this.fn = this.user.controls['username'].value;
    this.userprofiledata = new UserProfile(this.user.value);

    if (this.userprofiledata != null) {
      console.log("");
      this.getPost(this.userprofiledata).subscribe(
        data => this.userprofiledata1 = new UserProfile(data)

      );
      if (this.errorflag == true) {
        this.router.navigate(['Error']);
      } else {

        this.successflag = true;

        await this.delay(5000).then(any => { this.router.navigate(['Login']) });

      }






      // this.router.navigate(['Welcome'])

    }

  }







}
