import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class GithubHttpService {

  constructor(private httpClient: HttpClient) {
  }

// Issues the request to the GitHub API
  getRepositories(url: string) {
    console.log('in get()');
    return this.httpClient
      .get(
        url,
        {
          observe: 'response' // we are interested in the whole http response
                              // not only the body which is the default value for observe option
        }
      );

  }
}
