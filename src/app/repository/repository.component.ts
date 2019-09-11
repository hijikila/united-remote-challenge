import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

import {Repository} from './state/repository.model';
import {RepositoryService} from './state/repository.service';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.scss']
})
export class RepositoryComponent implements OnInit, OnDestroy {

  repositories: Repository[] = [];
  private reposSubscription: Subscription;

  constructor(private repositoryService: RepositoryService) {
  }

  ngOnInit() {
    this.repositoryService.fetchData();
    this.reposSubscription = this.repositoryService.repositoriesArrayChanged
      .subscribe(
        (repositories: Repository[]) => {
          this.repositories.push(...repositories);
          //console.log(repositories);
        }
      );
  }

  ngOnDestroy(): void {
    this.reposSubscription.unsubscribe();
  }

  onScrollEventFired(event) {
    this.repositoryService.fetchData();
  }
}
