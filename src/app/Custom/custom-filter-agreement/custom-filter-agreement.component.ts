import { Component } from '@angular/core';
import { IFloatingFilterAngularComp } from 'ag-grid-angular';
import { GridApi, GridReadyEvent, IFloatingFilterParams, ISimpleFilter } from 'ag-grid-community';
import { AgreementComponent } from 'src/app/agreement/agreement.component';
import { HttpServerServiceService } from 'src/app/Services/http-server-service.service';

@Component({
  selector: 'app-custom-filter-agreement',

  template: `&gt;
    <input
      style="width: 50px"
      type="text"
      [(ngModel)]="currentValue"
      (input)="onInputBoxChanged($event)"
    />`,
})
export class CustomFilterAgreementComponent implements IFloatingFilterAngularComp {

  params!: IFloatingFilterParams<ISimpleFilter>;
  currentValue: number | null | string = null;
  style: any;


  private gridApi!: GridApi;
  // public httpServerService: HttpServerServiceService
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
        if (this.params.column.getColId() == "status") {
          if (this.currentValue != null) {
            this.agreement.statusSearch = instance.appliedModel.filter;
          }
          else {
            this.agreement.statusSearch = "";
          }
        }
        if (this.params.column.getColId() == "quoteNumber") {
          if (this.currentValue != null) {
            this.agreement.quoteNumberSearch = instance.appliedModel.filter;
          }
          else {
            this.agreement.quoteNumberSearch = "";
          }
        }
        if (this.params.column.getColId() == "agreementName") {
          if (this.currentValue != null) {
            this.agreement.agreementNameSearch = instance.appliedModel.filter;
          }
          else {
            this.agreement.agreementNameSearch = "";
          }
        }
        if (this.params.column.getColId() == "agreementType") {
          if (this.currentValue != null) {
            this.agreement.agreementTypeSearch = instance.appliedModel.filter;
          }
          else {
            this.agreement.agreementTypeSearch = "";
          }
        }
        if (this.params.column.getColId() == "distributorName") {
          if (this.currentValue != null) {
            this.agreement.distributorNameSearch = instance.appliedModel.filter;
          }
          else {
            this.agreement.distributorNameSearch = "";
          }
        }
        if (this.params.column.getColId() == "daysUntilExplation") {
          if (this.currentValue != null) {
            this.agreement.daysUntilExplationSearch = instance.appliedModel.filter;
          }
          else {
            this.agreement.daysUntilExplationSearch = "";
          }
        }
      }

      this.httpServerService.getAgreementsSearch(this.agreement.statusSearch, this.agreement.quoteNumberSearch, this.agreement.agreementNameSearch, this.agreement.agreementTypeSearch,this.agreement.distributorNameSearch, Number(this.agreement.daysUntilExplationSearch), this.agreement.pagePresent, this.agreement.totalRow).subscribe(response => {
        this.agreement.totalData = Math.ceil((response.totalRecord) / (this.agreement.totalRow));
        this.agreement.Agreements = response.data;
      }
      );


    });

  }
}

