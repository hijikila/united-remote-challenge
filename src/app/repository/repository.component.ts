import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

import {Repository} from './state/repository.model';
import {RepositoryService} from './state/repository.service';
import {animate, animation, keyframes, style, transition, trigger, useAnimation} from '@angular/animations';

// we try to make this animation reusable
export const fadeInAnimation = animation([
  style({ // initial style
    opacity: '0',
    transform: 'translateX(120px)'
  }),
  animate('{{ duration }}', keyframes([ // keyframes to describe precisely the different stages of the animation
    style({
      opacity: '0.3',
      transform: 'translateX(120px)',
      offset: '0'
    }),
    style({
      opacity: '0.7',
      transform: 'translateX(30px)',
      offset: '0.5'
    }),
    style({
      opacity: '1',
      transform: 'translateX(0px)',
      offset: '1'
    }),
  ]))
]);


@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.scss'],
  animations: [
    trigger('FadeInElement', [
      transition(':enter', [ // :enter === void => *
        useAnimation(fadeInAnimation,
          {
            params: {
              duration: '600ms' // make sure the value passed here is quoted like this (as a string value)
              // if we pass a numeric value i.e 600 it may causes problems with the animation
              // Because its used a string in the fadeInAnimation via string interpolation
              // Because mixing the two format (string and numeric values) is not supported
              // which should be fixed in the upcoming releases, i think!  :)
            }
          })
      ])
    ]),
  ]
})
export class RepositoryComponent implements OnInit, OnDestroy {

  repositories: Repository[] = [];
  userScrollDown;
  isLoadingSub: Subscription;
  isLoading: boolean;
  hasMore: boolean;
  error: Error = null;
  errorSub: Subscription;
  private reposSubscription: Subscription;

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
        (error: Error) => {
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
