import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ExpandedSectionComponent } from './expanded-section/expanded-section.component';
import { DatacontainerDirective } from './app.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    ExpandedSectionComponent,
    DatacontainerDirective
  ],
  providers: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    CommonModule
  ],
  entryComponents: [
    ExpandedSectionComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
