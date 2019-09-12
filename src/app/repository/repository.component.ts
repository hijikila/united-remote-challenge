import {Component, Input, OnDestroy, OnInit} from '@angular/core';
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
  userScrollDown;
  currentPage = 1;
  isLoadingSub: Subscription;
  isLoading: boolean;
  error: {errorCode: number, errorMessage: string} = null;
  errorSub: Subscription;

  constructor(private repositoryService: RepositoryService) {
  }

  ngOnInit() {
    this.isLoading = false;
    this.userScrollDown = this.onScrollEventFired.bind(this);
    this.reposSubscription = this.repositoryService.repositoriesArrayChanged
      .subscribe(
        (repositories: Repository[]) => {
          this.repositories.push(...repositories);
        }
      );
    this.isLoadingSub = this.repositoryService.isLoading
      .subscribe(
        (isLoading) => {
          this.isLoading = isLoading;
        }
      );
    this.errorSub = this.repositoryService.error
      .subscribe(
        (error: {errorCode: number, errorMessage: string}) => {
          this.error = error;
        }
      )
  }

  ngOnDestroy(): void {
    this.reposSubscription.unsubscribe();
    this.isLoadingSub.unsubscribe();
    this.errorSub.unsubscribe();
  }

  onScrollEventFired() {
    return this.repositoryService.fetchData(this.currentPage++);
  }
}
