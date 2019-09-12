import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

import {Repository} from './repository.model';
import {GithubHttpService} from '../../shared/http/github-http.service';
import {tap} from 'rxjs/operators';


@Injectable({providedIn: 'root'})
export class RepositoryService {
  repositories: Repository[] = [];
  repositoriesArrayChanged = new Subject<Repository[]>();
  isLoading = new Subject<boolean>();

  constructor(private github: GithubHttpService) {
  }

  setRepositories(repositories: Repository[]) {
    this.repositories = repositories;
    this.repositoriesArrayChanged.next(this.repositories.slice());
    this.isLoading.next(false);
  }

  fetchData(pageNum: number) {
    this.isLoading.next(true);
    console.log('in fetch ', pageNum);
    console.log(pageNum);
    return this.github.getRepositories(pageNum)
      .pipe(
        tap(
          (repositories: Repository[]) => {
            this.setRepositories(repositories);
            this
          }
        )
      );
  }
}
