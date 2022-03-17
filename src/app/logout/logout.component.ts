import { Component, OnInit } from '@angular/core';
import { AuthenticationServiceService } from '../data/authentication-service.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private authenticationService : AuthenticationServiceService) { }

  ngOnInit(): void {
    this.authenticationService.logout();
  }

}
