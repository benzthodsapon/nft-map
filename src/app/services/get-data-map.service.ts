import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetDataMapService {

  constructor(private http: HttpClient) { 
    
  }

  getData(): Observable<any> {
    return this.http
      .get(`https://asia-southeast1-monday-club-48189.cloudfunctions.net/get-map-test`, {
        headers: {
          "X-api-Key": "SEBGO59guINkCWHjIbfF6eydjuMMo6IljUpTTEmnetU",
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json"
        }
      } )
  }

  
}
