import {NgModule} from '@angular/core';
import {GithubHttpService} from './shared/http/github-http.service';
import {RepositoryService} from './repository/state/repository.service';

@NgModule({
  providers: [
    GithubHttpService,
    RepositoryService
  ]
})

export class CoreModule { }
