import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

import {Repository} from './state/repository.model';
import {RepositoryService} from './state/repository.service';
import {animate, keyframes, query, stagger, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.scss'],
  animations: [
    trigger('animatedList', [
      transition('* => *', [ // whatever the state of the element to whatever state it transit to
        query(':enter',  [
          style({ // initial style
            opacity: 0,
            transform: 'translateX(120px)'
          }),
          stagger(200, [ // define a time between each element (in our case <li>) animation
            animate(600, keyframes([ // keyframes to describe different stages of the animation
              style({
                opacity: 0.3,
                transform: 'translateX(120px)',
                offset: 0
              }),
              style({
                opacity: 0.7,
                transform: 'translateX(30px)',
                offset: 0.8
              }),
              style({
                opacity: 1,
                transform: 'translateX(0px)',
                offset: 1
              }),
            ]))
          ])
        ], {optional: true})
      ]),
    ])
  ]
})
export class RepositoryComponent implements OnInit, OnDestroy {

  repositories: Repository[] = [];
  private reposSubscription: Subscription;
  userScrollDown;
  isLoadingSub: Subscription;
  isLoading: boolean;
  hasMore: boolean;
  error: {errorCode: number, errorMessage: string} = null;
  errorSub: Subscription;

  constructor(private repositoryService: RepositoryService) {
  }

  ngOnInit() {
    this.isLoading = false;
    this.userScrollDown = this.onScrollEventFired.bind(this);
    this.hasMore = this.repositoryService.hasMore();
    this.reposSubscription = this.repositoryService.repositoriesArrayChanged
      .subscribe(
        (repositories: Repository[]) => {
          this.hasMore = this.repositoryService.hasMore();
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
      );
  }

  ngOnDestroy(): void {
    this.reposSubscription.unsubscribe();
    this.isLoadingSub.unsubscribe();
    this.errorSub.unsubscribe();
  }

  onScrollEventFired() {
    return this.repositoryService.fetchData();
  }
}
