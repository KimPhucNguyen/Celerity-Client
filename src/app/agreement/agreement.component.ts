import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

export class Agreement {
  constructor(
    public id: number,
    public status: string,
    public quoteNumber: string,
    public agreementName: string,
    public agreementType: string,
    public distributorName: string,
    public effectiveDate: Date,
    public expirationDate: Date,
    public createdDate: Date,
    public daysUntilExplation: number
  ) {
  }
}
@Component({
  selector: 'app-agreement',
  templateUrl: './agreement.component.html',
  styleUrls: ['./agreement.component.scss']
})
export class AgreementComponent implements OnInit {

  public Agreements: Agreement[] = [];
  public totalData = 0;
  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.getFriends();
  }

  getFriends() {
    this.httpClient.get<any>('https://localhost:7153/api/Agreements?PageIndex=1&PageSize=6').subscribe(
      response => {
        debugger
        this.totalData = response.totalRecord;
        this.Agreements = response.data;
        console.log(this.Agreements)
      }
    );
  }

}
