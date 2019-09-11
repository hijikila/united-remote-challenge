import { Component, OnInit } from '@angular/core';
import {Repository} from '../state/repository.model';

@Component({
  selector: 'app-repository-item',
  templateUrl: './repository-item.component.html',
  styleUrls: ['./repository-item.component.scss']
})
export class RepositoryItemComponent implements OnInit {
  // filled with some dummy data
  repository: Repository = new Repository(
    'repository title',
    'this is a test description!',
    200,
    10,
    'hijikila',
    'https://avatars2.githubusercontent.com/u/6993869?s=460&v=4l',
    2
  );
  constructor() { }

  ngOnInit() {
  }

}
