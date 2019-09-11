import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RepositoryComponent } from './repository/repository.component';
import { RepositoryItemComponent } from './repository/repository-item/repository-item.component';
import { ShortenNumberPipe } from './shared/pipes/shorten-number.pipe';
import { ShortenTextPipe } from './shared/pipes/shorten-text.pipe';

@NgModule({
  declarations: [
    AppComponent,
    RepositoryComponent,
    RepositoryItemComponent,
    ShortenNumberPipe,
    ShortenTextPipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
