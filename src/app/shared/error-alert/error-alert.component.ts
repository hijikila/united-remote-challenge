import {Component, Input, OnInit} from '@angular/core';
import {CustomError} from './state/custom-error.model';

@Component({
  selector: 'app-error-alert',
  templateUrl: './error-alert.component.html',
  styleUrls: ['./error-alert.component.scss']
})
export class ErrorAlertComponent implements OnInit {

  @Input() error: CustomError;
  constructor() { }

  ngOnInit() {
  }

  close() {
    this.error = null;
  }
}
