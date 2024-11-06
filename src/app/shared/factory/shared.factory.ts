import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../services/shared.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';


@Injectable()
export class SharedFactory {
  //store logged in user info locally to avoid calling server every time.
  private _loggedInUser: any = null;
  public roleId: string = "";


  constructor(private http: HttpClient, private sharedService: SharedService, private router: Router) { }

}
