import {Injectable} from '@angular/core';
import {Observable, Subject, throwError} from 'rxjs';

import {Repository} from './repository.model';
import {GithubHttpService} from '../../shared/http/github-http.service';
import {catchError, map, tap} from 'rxjs/operators';

const END_POINT_URL = 'https://api.github.com/search/repositories';

@Injectable({providedIn: 'root'})
export class RepositoryService {
  repositories: Repository[] = [];
  repositoriesArrayChanged = new Subject<Repository[]>();
  error = new Subject<{ errorCode: number, errorMessage: string }>();
  isLoading = new Subject<boolean>();
  request: Observable<any>;

  constructor(private github: GithubHttpService) {
  }

  setRepositories(repositories: Repository[]) {
    this.repositories = repositories;
    console.log(repositories);
    this.repositoriesArrayChanged.next(this.repositories.slice());
    this.isLoading.next(false);
  }

  setError(error: { errorCode: number, errorMessage: string }) {
    this.error.next(error);
    this.isLoading.next(false);
  }

  fetchData(pageNum: number) {
    this.isLoading.next(true);
    console.log('in fetch ', pageNum);
    console.log(pageNum);

    const url = this.prepareQueryUrl(30);

    this.request = this.github.getRepositories(url);

    this.request = this.extractHeaders();

    this.request = this.catchError();

    this.request = this.extractBody();

    this.request = this.extractRepositories();

    console.log('obs ', this.request);
    return this.request.pipe(
      tap(
        (repositories: Repository[]) => {
          this.setRepositories(repositories);
        },
        (error: { errorCode: number, errorMessage: string }) => {
          this.setError(error);
        }
      )
    );
  }

  prepareQueryUrl(daysNum: number) {
    const requestUrl = END_POINT_URL +
      '?q=created:>' + this.calculateDate(daysNum) +
      '&sort=stars' + // sort the results according to the number of stars
      '&order=desc' + // order the result from the most rated to the less rated
      '&page=1'; // precising the page we are currently looking for
    console.log(requestUrl);
    return requestUrl;
  }

  calculateDate(daysNum: number): string {
    // calculate the date 30 days before now
    const monthBeforeNowDate = new Date();
    monthBeforeNowDate.setDate(monthBeforeNowDate.getDate() - daysNum); // subtract 30 days from the local current date

    // construct the date string according to the need of the Github API
    // which should be of this format : YYYY-MM-DD
    const month = this.format(monthBeforeNowDate.getMonth() + 1); // + 1 because the month count begins with 0 as January
    const day = this.format(monthBeforeNowDate.getDate());
    const year = monthBeforeNowDate.getFullYear();

    return year + '-' + month + '-' + day;
  }

  // format the number (day or month) to : '0X' when X<10 or leave it as it is otherwise
  // necessary for the request to the API to get through
  format(n: number) {
    return n < 10 ? '0' + n : n;
  }

  extractHeaders() {
    return this.request.pipe(
      tap(
        (fullResponse) => {
          const responseHeaders = fullResponse.headers;
          console.log('headers ', (responseHeaders.get('Link')));
        }
      )
    );
  }

  catchError() {
    return this.request.pipe(
      catchError(
        (errorResponse) => {
          console.log(errorResponse);
          const error = {errorCode: 400, errorMessage: 'An error has occurred!'};
          if (errorResponse) {
            if (errorResponse.status) {
              error.errorCode = errorResponse.status;
            }
            if (errorResponse.message) {
              error.errorMessage = errorResponse.message;
            }
          }

          console.log('formated error : ', error);
          return throwError(error);
        }
      )
    );
  }

  extractBody() {
    return this.request.pipe(
      map(
        fullResponse => {
          const responseBody = fullResponse.body;
          console.log(responseBody);
          const itemsKey = 'items';
          if (!responseBody.hasOwnProperty(itemsKey)) {
            return null;
          }
          // we are interested only in the array under the key 'items'
          // which holds the repositories info array
          const itemsArray = responseBody[itemsKey];

          // loop through the repositories array to extract data
          const items = [];
          for (const responseKey in itemsArray) {
            if (itemsArray.hasOwnProperty(responseKey)) {
              items.push(itemsArray[responseKey]);
            }
          }
          // Pass the extracted data to the next map
          // which is repositories data but unpolished
          // it contains a lot more fields than its needed by our project
          return items;
        }
      )
    );
  }

  extractRepositories() {
    return this.request.pipe(
      map(
        (items): Repository[] => {
          const repositories: Repository[] = [];

          // Loop through the array of unfiltered repositories info
          // to extract only needed data
          for (const item of items) {
            // create and Set the repository object
            // for each object of the array
            const repoItem = new Repository(
              item.name,
              item.description,
              item.stargazers_count,
              item.open_issues_count,
              item.owner.login,
              item.owner.avatar_url
            );

            // calculate the number of days passed until the creation of the current repository
            const when = new Date(item.created_at);
            const timeDifference = Math.abs(new Date().getTime() - when.getTime()); // in ms
            repoItem.creationDaysElapsed =
              Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // difference in days (timeDifference / (ms * s * min * H)

            // add the repository polished/filtered object to the final array
            repositories.push(repoItem);
          }
          return repositories;
        }
      )
    );
  }
}

