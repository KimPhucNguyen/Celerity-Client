import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpServerServiceService {
  public REST_API_SERVER = 'https://localhost:7153/';
  public REST_API_SERVER_AGREEMENTS = 'https://localhost:7153/api/Agreements';
  public REST_API_SERVER_DISTRIBUTORS = 'https://localhost:7153/api/Distributors';

  // public REST_API_SERVER = 'http://103.92.24.117:2222/';
  // public REST_API_SERVER_AGREEMENTS = 'http://103.92.24.117:2222/api/Agreements';
  // public REST_API_SERVER_DISTRIBUTORS = 'http://103.92.24.117:2222/api/Distributors';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private httpClient: HttpClient) { }

  public getAgreements(pagePresent: number, totalRow: number): Observable<any> {
    const url = `${this.REST_API_SERVER_AGREEMENTS}?PageIndex=` + pagePresent + `&PageSize=` + totalRow;
    return this.httpClient.get<any>(url, this.httpOptions);
  }

  public getAgreementsSearch(status: string, quoteNumber: string, agreementName: string, agreementType: string, distributorName: string, effectiveDate: string, expirationDate: string, createdDate: string, daysUntilExplation: number, pagePresent: number, totalRow: number): Observable<any> {
    const url = `${this.REST_API_SERVER_AGREEMENTS}?status=` + status + `&quoteNumber=` + quoteNumber + `&agreementName=` + agreementName + `&agreementType=` + agreementType + `&distributorName=` + distributorName + `&effectiveDate=` + effectiveDate + `&expirationDate=` + expirationDate + `&createdDate=` + createdDate + `&daysUntilExplation=` + daysUntilExplation + `&PageIndex=` + pagePresent + `&PageSize=` + totalRow;
    return this.httpClient.get<any>(url, this.httpOptions);
  }

  public getDistributors(): Observable<any> {
    const url = `${this.REST_API_SERVER_DISTRIBUTORS}`;
    return this.httpClient.get<any>(url, this.httpOptions);
  }

  public postAgreement(payload: any): Observable<any> {
    const url = `${this.REST_API_SERVER_AGREEMENTS}`;
    return this.httpClient.post<any>(url, payload, this.httpOptions);
  }

  public putAgreement(payload: any): Observable<any> {
    const url = `${this.REST_API_SERVER_AGREEMENTS}`;
    return this.httpClient.put<any>(url, payload, this.httpOptions);
  }

  public deleteAgreement(id: number): Observable<any> {
    const url = `${this.REST_API_SERVER_AGREEMENTS}/` + id;
    return this.httpClient.delete<any>(url, this.httpOptions);
  }

  public login(payload: any): Observable<any> {
    const url = `${this.REST_API_SERVER}api/Users/authenticate`;
    return this.httpClient.post<any>(url, payload, this.httpOptions);
  }
}
