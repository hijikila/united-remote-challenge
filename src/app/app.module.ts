import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RepositoryComponent } from './repository/repository.component';
import { RepositoryItemComponent } from './repository/repository-item/repository-item.component';
import { ShortenNumberPipe } from './shared/pipes/shorten-number.pipe';
import { ShortenTextPipe } from './shared/pipes/shorten-text.pipe';
import { HttpClientModule } from '@angular/common/http';
import { InfiniteScrollDirective } from './shared/directives/infinite-scroll.directive';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import {ErrorAlertComponent} from './shared/error-alert/error-alert.component';

@NgModule({
  declarations: [
    AppComponent,
    RepositoryComponent,
    RepositoryItemComponent,
    ShortenNumberPipe,
    ShortenTextPipe,
    InfiniteScrollDirective,
    LoadingSpinnerComponent,
    ErrorAlertComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
