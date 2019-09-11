import {Component, Input, OnInit} from '@angular/core';
import {Repository} from '../state/repository.model';

@Component({
  selector: 'app-repository-item',
  templateUrl: './repository-item.component.html',
  styleUrls: ['./repository-item.component.scss']
})
export class RepositoryItemComponent implements OnInit {
  // filled with some dummy data
  @Input() repository: Repository = null;
  constructor() { }

  ngOnInit() {
  }

}
