import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

import {Repository} from './repository.model';
import {GithubHttpService} from '../../shared/http/github-http.service';
import {tap} from 'rxjs/operators';


@Injectable({providedIn: 'root'})
export class RepositoryService {
  repositories: Repository[] = [];
  repositoriesArrayChanged: Subject<Repository[]> = new Subject<Repository[]>();


  constructor(private github: GithubHttpService) {
  }

  setRepositories(repositories: Repository[]) {
    this.repositories = repositories;
    this.repositoriesArrayChanged.next(this.repositories.slice());
  }

  fetchData(pageNum: number) {
    console.log('in fetch ', pageNum);
    console.log(pageNum);
    return this.github.getRepositories(pageNum)
      .pipe(
        tap(
          (repositories: Repository[]) => {
            this.setRepositories(repositories);
          }
        )
      );
  }
}
