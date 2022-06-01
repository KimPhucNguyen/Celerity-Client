import { Component, OnInit } from '@angular/core';
import { IFloatingFilterAngularComp } from 'ag-grid-angular';
import { GridApi, IFloatingFilterParams, ISimpleFilter } from 'ag-grid-community';
import { AgreementComponent } from 'src/app/agreement/agreement.component';
import { HttpServerServiceService } from 'src/app/Services/http-server-service.service';

@Component({
  selector: 'app-custom-filter-date',
  template: `
  <input
    style="width: 50px; margin-top: 10px;"
    type="date"
    [(ngModel)]="currentValue"
    (input)="onInputBoxChanged($event)"
  />`,
})
export class CustomFilterDateComponent implements IFloatingFilterAngularComp {

  params!: IFloatingFilterParams<ISimpleFilter>;
  currentValue: Date | number | null | string = null;
  style: any;


  private gridApi!: GridApi;
  constructor(
    private httpServerService: HttpServerServiceService,
    public agreement: AgreementComponent
  ) { }


  agInit(params: IFloatingFilterParams<ISimpleFilter>): void {
    this.params = params;
  }

  onParentModelChanged(parentModel: any) {
    // When the filter is empty we will receive a null value here
    if (!parentModel) {
      this.currentValue = null;
    } else {
      this.currentValue = parentModel.filter;
    }
  }


  onInputBoxChanged(event: any) {
    this.params.parentFilterInstance((instance: any) => {
      instance.onFloatingFilterChanged('constraints', this.currentValue);
      {
        if (this.params.column.getColId() == "effectiveDate") {
          if (this.currentValue != null) {
            this.agreement.effectiveDateSearch = instance.appliedModel.filter;
          }
          else {
            this.agreement.effectiveDateSearch = "";
          }
        }
        if (this.params.column.getColId() == "expirationDate") {
          if (this.currentValue != null) {
            this.agreement.expirationDateSearch = instance.appliedModel.filter;
          }
          else {
            this.agreement.expirationDateSearch = "";
          }
        }
        if (this.params.column.getColId() == "createdDate") {
          if (this.currentValue != null) {
            this.agreement.createdDateSearch = instance.appliedModel.filter;
          }
          else {
            this.agreement.createdDateSearch = "";
          }
        }
      }

      this.httpServerService.getAgreementsSearch(this.agreement.statusSearch, this.agreement.quoteNumberSearch, this.agreement.agreementNameSearch, this.agreement.agreementTypeSearch, this.agreement.distributorNameSearch, this.agreement.effectiveDateSearch,this.agreement.expirationDateSearch,this.agreement.createdDateSearch, Number(this.agreement.daysUntilExplationSearch), this.agreement.pagePresent, this.agreement.totalRow).subscribe(response => {
        debugger
        this.agreement.totalData = Math.ceil((response.totalRecord) / (this.agreement.totalRow));
        this.agreement.Agreements = response.data;
      }
      );
    });
  }
}
