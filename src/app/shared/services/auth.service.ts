import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable()
export class AuthService {
  //store logged in user info locally to avoid calling server every time.
  private _loggedInUser: any = null;
  public roleId: string = "";
  public userDetails: any = [];
  public results: any = [];
  constructor(private router: Router) {
 }

    
public hasRoleName() { 
        this.router.navigate(['/login']); 
}

} 
 