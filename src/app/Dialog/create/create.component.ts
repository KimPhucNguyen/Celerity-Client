import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AgreementComponent } from 'src/app/agreement/agreement.component';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpServerServiceService } from 'src/app/Services/http-server-service.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  form: FormGroup = new FormGroup({
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

  constructor(
    public dialogRef: MatDialogRef<CreateComponent>,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private url: HttpServerServiceService,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        status: ['', Validators.required],
        quoteNumber: ['', Validators.required],
        agreementName: ['', Validators.required],
        agreementType: ['', Validators.required],
        effectiveDate: ['', Validators.required],
        expirationDate: ['', Validators.required],
        createdDate: ['', Validators.required],
        daysUntilExplation: [Number, Validators.required],
        distributorId: [Number, Validators.required],
      },

    );
  }

  get abstract(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  onCreate(): void {
    this.submitted = true;
    if (!this.form.invalid) {
      const headers = { 'Content-Type': 'application/json' };
      this.http.post<any>(this.url.REST_API_SERVER + 'api/Agreements', this.form.value, { headers }).subscribe();
      this.dialogRef.close();
    }
  }
  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
  onCancel(): void {
    this.dialogRef.close();
  }

}



