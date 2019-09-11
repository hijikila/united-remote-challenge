import { Component, OnInit } from '@angular/core';
import {Repository} from './state/repository.model';
import {RepositoryService} from './state/repository.service';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.scss']
})
export class RepositoryComponent implements OnInit {

  repositories: Repository[] = [];

  constructor(private repositoryService: RepositoryService) {
  }

  ngOnInit() {
    this.repositories = this.repositoryService.getRespositories();
  }

}
