import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './home/home.component';
import { AgreementComponent } from './agreement/agreement.component';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { CreateComponent } from './Dialog/create/create.component';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { EditComponent } from './Dialog/edit/edit.component';
import { CustomFilterAgreementComponent } from './Custom/custom-filter-agreement/custom-filter-agreement.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AgreementComponent,
    CreateComponent,
    EditComponent,
    CustomFilterAgreementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    FontAwesomeModule,
    HttpClientModule,
    AgGridModule,
    MatPaginatorModule,
    MatDialogModule,
    MatNativeDateModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
