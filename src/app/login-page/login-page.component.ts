import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationServiceService } from '../data/authentication-service.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {





  username = ''
  password = ''
  errormessage ='Invalid login/password'
  errorflag = false;
  userlogedin = false;
   isPresent:boolean = false;

  //instance of Router Module
constructor(private router : Router , private authenticationService : AuthenticationServiceService) { }

ngOnInit(): void {

}

async validatelogin(){

 this.authenticationService.authenticate( this.username, this.password)
  await this.delay(1000).then(any=>{
    this.isPresent = this.authenticationService.isUserValid;
    console.log("UserName "+ this.username);
    console.log("Password "+ this.password);
    console.log("flag value " + this.isPresent);
  if (this.isPresent) {
    this.errorflag = false;
    this.userlogedin = false;
    console.log("inside if");
        this.router.navigate(['Dashboard'])

  } else {
    this.errorflag = true;
    this.userlogedin = true;
    console.log("inside else");
    //this.router.navigate(['Login'])
  }
});
}

private delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}


}
