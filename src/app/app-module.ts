import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { App } from './app';
import { ClientesList } from './components/clientes-list/clientes-list';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [App, ClientesList],
  imports: [BrowserModule, HttpClientModule, FormsModule, NgbModule],
  providers: [],
  bootstrap: [App],
})
export class AppModule {}
