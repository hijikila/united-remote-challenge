import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';

import {ErrorAlertComponent} from './error-alert/error-alert.component';
import {ShortenTextPipe} from './pipes/shorten-text.pipe';
import {InfiniteScrollDirective} from './directives/infinite-scroll.directive';
import {ShortenNumberPipe} from './pipes/shorten-number.pipe';
import {LoadingSpinnerComponent} from './loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    ShortenNumberPipe,
    ShortenTextPipe,
    InfiniteScrollDirective,
    LoadingSpinnerComponent,
    ErrorAlertComponent
  ],
  imports: [
   CommonModule
  ],
  exports: [
    ShortenNumberPipe,
    ShortenTextPipe,
    InfiniteScrollDirective,
    LoadingSpinnerComponent,
    ErrorAlertComponent,
    CommonModule
  ]
})
export class SharedModule {}
