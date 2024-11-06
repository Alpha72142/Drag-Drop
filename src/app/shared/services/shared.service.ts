import { Inject, Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { map, delay, catchError, tap } from 'rxjs/operators';
import { UrlConstants } from '../constants/app.constants';
import { environment } from '../../../environments/environment';


@Injectable()
export class SharedService {

  //This will store the reference data values.
    public menuCollapseFlag: boolean = false;
  /**
   * Default Constructer Invoked.
   */
  constructor(private http: HttpClient) { }

  public setMenuFlag(flag) {
    this.menuCollapseFlag = flag;
  }

  /**
   * Function Called to get all reference data from web service.
   */
  public getMenuFlag() {
    return this.menuCollapseFlag;
  }


  private handleError(error) {
    return throwError(error);
  }
}