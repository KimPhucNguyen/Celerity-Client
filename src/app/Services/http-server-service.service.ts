import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpServerServiceService {
  public REST_API_SERVER = 'https://localhost:7153/';
  constructor() { }
}
