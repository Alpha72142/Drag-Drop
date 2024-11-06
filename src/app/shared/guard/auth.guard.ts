import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from
  '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from '../services/auth.service';
import { SharedService } from '../services/shared.service';
import { Router } from '@angular/router';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService,
    private myRoute: Router, private sharedService: SharedService) {
  }

  validateRoute(route) { 
    switch (route._routerState.url) {
      case '/':
        return true;
      case '/home':
        return true;
      case '/sample':
        return true;
      default:
        return false;
    }

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean { 
    if (this.validateRoute(next)) { 
      return true;
    } else { 
      this.myRoute.navigate(['./access-denied']);
      return false;
    }
  }
}