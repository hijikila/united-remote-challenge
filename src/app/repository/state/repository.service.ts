import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

import {Repository} from './repository.model';
import {GithubHttpService} from '../../shared/http/github-http.service';


@Injectable({providedIn: 'root'})
export class RepositoryService {
  repositories: Repository[] = [];
  repositoriesArrayChanged: Subject<Repository[]> = new Subject<Repository[]>();
  private currentPage = 1;

  constructor(private github: GithubHttpService) {
  }

  setRepositories(repositories: Repository[]) {
    this.repositories = repositories;
    this.repositoriesArrayChanged.next(this.repositories.slice());
  }

  fetchData() {
    console.log('in fetch');
    this.github.getRepositories(this.currentPage)
      .subscribe(
        (repositories: Repository[]) => {
          this.setRepositories(repositories);
          console.log(repositories);
          this.currentPage++;
        }
      );
  }
}
