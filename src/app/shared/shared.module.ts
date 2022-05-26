import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from './material.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {
  FontAwesomeModule,
  FaIconLibrary
} from '@fortawesome/angular-fontawesome';
import {
  faPlus,
  faEdit,
  faTrash,
  faTimes,
  faCaretUp,
  faCaretDown,
  faExclamationTriangle,
  faFilter,
  faTasks,
  faCheck,
  faSquare,
  faLanguage,
  faPaintBrush,
  faLightbulb,
  faWindowMaximize,
  faStream,
  faBook,
  faUserCircle,
  faAsterisk
} from '@fortawesome/free-solid-svg-icons';

//import { ControlMessagesComponent } from './component/control-messages/control-messages.component';
//import { SpinnerComponent } from './component/spinner/spinner.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,

    NgbModule,
    FontAwesomeModule
  ],
  exports: [

    MaterialModule,


  ]

})
export class SharedModule {
  constructor(faIconLibrary: FaIconLibrary) {
    faIconLibrary.addIcons(
      // faPlus,
      // faEdit,
      // faTrash,
      // faTimes,
      // faCaretUp,
      // faCaretDown,
      // faExclamationTriangle,
      // faFilter,
      // faTasks,
      // faCheck,
      // faSquare,
      // faLanguage,
      // faPaintBrush,
      // faLightbulb,
      // faWindowMaximize,
      // faStream,
      // faBook,
      // faUserCircle,
      // faAsterisk
    );
  }
}
