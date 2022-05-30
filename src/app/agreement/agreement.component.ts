import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';
import {
  ColDef,
  GridApi,
  GridReadyEvent,
  ICellRenderer,
  ICellRendererParams,
  SideBarDef,
} from 'ag-grid-community';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { HttpServerServiceService } from '../Services/http-server-service.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateComponent } from '../Dialog/create/create.component';
import { EditComponent } from '../Dialog/edit/edit.component';

export class Agreement {
  constructor(
    public id: number,
    public status: string,
    public quoteNumber: string,
    public agreementName: string,
    public agreementType: string,
    public distributorId: number,
    public distributorName: string,
    public effectiveDate: Date,
    public expirationDate: Date,
    public createdDate: Date,
    public daysUntilExplation: number
  ) {
  }
}

class DeltaIndicator implements ICellRenderer {
  private eGui!: HTMLElement;
  init(params: ICellRendererParams) {
    const element = document.createElement('span');
    const imageElement = document.createElement('img');
    const imageElemennewt = document.createElement('p');
    var count = 0;


    if (params.value === 'Invalid') {
      imageElemennewt.innerHTML =
        'Invalid <span style="color:#fff0f5;"><span style="background-color:#d9524e;;padding:4px;">' + 1 + '</span></span>';
      this.eGui = imageElemennewt;
    } else if (params.value === 'Published') {
      imageElement.src =
        '../../assets/images/tick.png';
      element.appendChild(document.createTextNode(params.value + " "));
      element.appendChild(imageElement);
      this.eGui = element;
    } else {
      imageElement.src =
        '../../assets/images/pending.png';
      element.appendChild(document.createTextNode(params.value + " "));
      element.appendChild(imageElement);
      this.eGui = element;
    }

  }
  getGui() {
    return this.eGui;
  }
  refresh() {
    return false;
  }
}

@Component({
  selector: 'app-agreement',
  templateUrl: './agreement.component.html',
  styleUrls: ['./agreement.component.scss']
})
export class AgreementComponent implements OnInit {
  //private pageEvent: PageEvent,

  public Agreements: Agreement[] = [];

  public idChoose = 0;
  public statusChoose = '';
  public quoteNumber = '';
  public agreementName = '';
  public agreementType = '';
  public distributorId = '';
  public distributorName = '';
  public effectiveDate = '';
  public expirationDate = '';
  public createdDate = '';
  public daysUntilExplation = 0

  public rowSelection = 'single';
  public pagePresent = 1;
  public totalData = 0;
  public totalRow = 5;

  constructor(
    private http: HttpClient,
    private url: HttpServerServiceService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    //this.getAgreements();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.pagePresent = 1;
      this.getAgreements();
    });
  }

  getAgreements() {
    this.http.get<any>(this.url.REST_API_SERVER + 'api/Agreements?PageIndex=' + this.pagePresent + '&PageSize=' + this.totalRow).subscribe(
      response => {
        this.totalData = Math.round((response.totalRecord) / (this.totalRow));
        this.Agreements = response.data;
      }
    );
  }

  nextPage() {
    if (this.pagePresent < this.totalData) {
      this.pagePresent++;
      this.getAgreements();
    }
  }

  prevPage() {
    if (this.pagePresent > 1) {
      this.pagePresent--;
      this.getAgreements();
    }
  }

  firstPage() {
    if (this.pagePresent > 1) {
      this.pagePresent = 1;
      this.getAgreements();
    }
  }

  lastPage() {
    if (this.pagePresent < this.totalData) {
      this.pagePresent = this.totalData;
      this.getAgreements();
    }
  }

  private gridApi!: GridApi;

  public columnDefs: ColDef[] = [
    {
      field: 'status', minWidth: 200,
      cellStyle: params => {
        if (params.value === 'Invalid') {
          return { color: 'red' };
        }
        if (params.value === 'Published') {
          return { color: 'green' };
        }
        if (params.value === 'Pending') {
          return { color: 'gray' };
        }
        return null;
      },
      cellRenderer: DeltaIndicator
    },
    { field: 'quoteNumber' },
    { field: 'agreementName', minWidth: 180 },
    { field: 'agreementType', minWidth: 200 },
    { field: 'distributorName' },
    { field: 'effectiveDate' },
    { field: 'expirationDate' },
    { field: 'createdDate' },
    { field: 'daysUntilExplation' },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    enableValue: true,
    enableRowGroup: false,
    enablePivot: false,
    sortable: true,
    filter: true,
    editable: true,
    floatingFilter: true,
    resizable: true,
  };
  public sideBar: SideBarDef = {
    toolPanels: [
      {
        id: 'columns',
        labelDefault: 'Columns',
        labelKey: 'columns',
        iconKey: 'columns',
        toolPanel: 'agColumnsToolPanel',
        toolPanelParams: {
          suppressRowGroups: true,
          suppressValues: true,
        },
      },
    ],
    defaultToolPanel: 'columns',
  };

  onSelectionChanged() {
    let selectedNodes = this.gridApi.getSelectedNodes();
    //let selectedData = JSON.stringify(selectedNodes.map(node => node.data));

    //this.ChooseAgreements = selectedNodes.map(node => node.data);
    selectedNodes.map(
      data => {
        this.idChoose = data.data.id;
        this.statusChoose = data.data.status;
        this.quoteNumber = data.data.quoteNumber;
        this.agreementName = data.data.agreementName;
        this.agreementType = data.data.agreementType;
        this.distributorId = data.data.distributorId;
        this.distributorName = data.data.distributorName;
        this.effectiveDate = data.data.effectiveDate;
        this.expirationDate = data.data.expirationDate;
        this.createdDate = data.data.createdDate;
        this.daysUntilExplation = data.data.daysUntilExplation;
      })

    const dialogRef = this.dialog.open(EditComponent, {
      width: '500px',
      data: {
        id: this.idChoose,
        statusChoose: this.statusChoose,
        quoteNumber: this.quoteNumber,
        agreementName: this.agreementName,
        agreementType: this.agreementType,
        distributorId : this.distributorId,
        distributorName: this.distributorName,
        effectiveDate: this.effectiveDate,
        expirationDate: this.expirationDate,
        createdDate: this.createdDate,
        daysUntilExplation: this.daysUntilExplation
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.pagePresent = 1;
      this.getAgreements();
    });
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.getAgreements();
  }

}
