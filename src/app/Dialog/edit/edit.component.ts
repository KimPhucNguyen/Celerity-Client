import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpServerServiceService } from 'src/app/Services/http-server-service.service';

export class Distributor {
  constructor(
    public id: number,
    public distributorName: string,
  ) {
  }
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  form: FormGroup = new FormGroup({
    id: new FormControl(''),
    status: new FormControl(''),
    quoteNumber: new FormControl(''),
    agreementName: new FormControl(''),
    agreementType: new FormControl(''),
    effectiveDate: new FormControl(''),
    expirationDate: new FormControl(''),
    createdDate: new FormControl(''),
    daysUntilExplation: new FormControl(''),
    distributorId: new FormControl(''),
  });
  submitted = false;

  public Distributor: Distributor[] = [];

  constructor(
    public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private url: HttpServerServiceService,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        id: [this.data.id, Validators.required],
        status: [this.data.statusChoose, Validators.required],
        quoteNumber: [this.data.quoteNumber, Validators.required],
        agreementName: [this.data.agreementName, Validators.required],
        agreementType: [this.data.agreementType, Validators.required],
        effectiveDate: [this.data.effectiveDate, Validators.required],
        expirationDate: [this.data.expirationDate, Validators.required],
        createdDate: [this.data.createdDate, Validators.required],
        daysUntilExplation: [this.data.daysUntilExplation, Validators.required],
        distributorId: [this.data.distributorId, Validators.required],
      },

    );
    this.getAllDistributors();
  }

  get abstract(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  getAllDistributors() : void{
    this.http.get<any>(this.url.REST_API_SERVER + 'api/Distributors').subscribe(
      response => {
        this.Distributor = response;
      }
    );
  }

  onUpdate(): void {
    this.submitted = true;
    if (!this.form.invalid) {
      const headers = { 'Content-Type': 'application/json' };
      this.http.put<any>(this.url.REST_API_SERVER + 'api/Agreements', this.form.value, { headers }).subscribe();
      this.dialogRef.close();
    }
  }

  onDelete(): void {
    this.http.delete<any>(this.url.REST_API_SERVER + 'api/Agreements/' + this.data.id).subscribe();
    this.dialogRef.close();
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
  onCancel(): void {
    this.dialogRef.close();
  }


}
