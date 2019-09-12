import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Repository} from '../../repository/state/repository.model';

const END_POINT_URL = 'https://api.github.com/search/repositories';

@Injectable({providedIn: 'root'})
export class GithubHttpService {

  constructor(private httpClient: HttpClient) {
  }

// Issues the request to the GitHub API
  getRepositories(pageNum: number) {
    console.log('in get()');
    return this.prepareRequest(pageNum)
      .pipe(
        map(
          response => {
            const itemsKey = 'items';
            if (!response.hasOwnProperty(itemsKey)) {
              return null;
            }
            // we are interested only in the array under the key 'items'
            // which holds the repositories info array
            const itemsArray = response[itemsKey];

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
        ),
        map(
          items => {
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
        ),
      );

  }

  prepareRequest(pageNum: number) {
    // calculate the date 30 days before now
    const monthBeforeNowDate = new Date();
    monthBeforeNowDate.setDate(monthBeforeNowDate.getDate() - 30); // subtract 30 days from the local current date

    // construct the date string according to the need of the Github API
    // which should be of this format : YYYY-MM-DD
    const month = this.format(monthBeforeNowDate.getMonth() + 1); // + 1 because the month count begins with 0 as January
    const day = this.format(monthBeforeNowDate.getDate());
    const year = monthBeforeNowDate.getFullYear();

    const creationDate = year + '-' + month + '-' + day;

    // return the prepared request
    return this.httpClient
      .get(
        `${END_POINT_URL}`,
        {
          params: new HttpParams().append('q', 'created:>' + creationDate)
            .append('sort', 'stars') // sort the results according to the number of stars
            .append('order', 'desc') // order the result from the most rated to the less rated
            .append('page', pageNum.toString()) // precising the page we are currently looking for
        }
      );
  }

  // format the number (day or month) to : '0X' when X<10 or leave it as it is otherwise
  // necessary for the request to the API to get through
  format(n: number) {
    return n < 10 ? '0' + n : n;
  }
}
