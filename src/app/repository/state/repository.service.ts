import {Injectable} from '@angular/core';

import {Repository} from './repository.model';

@Injectable({providedIn: 'root'})
export class RepositoryService {
  repositories: Repository[] = [
    new Repository(
      'Android Game',
      'this is a cool game!',
      500,
      0,
      'developer 1',
      'https://avatars2.githubusercontent.com/u/6993869?s=460&v=4l',
      10
    ),
    new Repository(
      'cool library',
      'this is a test description!',
      2000,
      10,
      'user',
      'https://avatars2.githubusercontent.com/u/6993869?s=460&v=4l',
      2
    ),
    new Repository(
      'another repo',
      '',
      200,
      10,
      'another_user',
      'https://avatars2.githubusercontent.com/u/6993869?s=460&v=4l',
      2
    ),
    new Repository(
      'test test',
      'this is a test description!',
      200,
      10,
      'hijikila',
      'https://avatars2.githubusercontent.com/u/6993869?s=460&v=4l',
      2
    )
  ];

  constructor() {
  }


  getRespositories(): Repository[] {
    return this.repositories.slice();
  }

}
