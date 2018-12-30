import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(private httpClient:HttpClient) { }

  login(loginData){
   return this.httpClient.post('https://stage.justmanage.com/API/v1/account/login', loginData)
  }
}
