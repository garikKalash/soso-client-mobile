import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../_services/authentication.service";
/**
 * Created by Garik.Kalashyan on 1/5/2017.
 */

@Component({
  selector: 'wlcPage-component',
  templateUrl: 'wlcPage.component.html'
})
export class WelcomePageComponent implements OnInit{
  private _isSigningUser:boolean = false;
  private _isSignupingUser:boolean = false;


  constructor(private router: Router,private authenticationService:AuthenticationService){}

  showSigninDialog(){
      this._isSigningUser = true;
  }

  showSignupDialog(){
    this._isSignupingUser = true;
  }

  ngOnInit(): void {
     this.authenticationService.checkSignedClient();
  }



}
