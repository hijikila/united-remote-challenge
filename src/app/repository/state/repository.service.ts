import {Injectable} from '@angular/core';

import {Repository} from './repository.model';

@Injectable({providedIn: 'root'})
export class RepositoryService {
  repositories: Repository[] = [
    new Repository(
      'Android Game',
      'this is a cool game!',
      5980,
      0,
      'developer 1',
      'https://avatars2.githubusercontent.com/u/6993869?s=460&v=4l',
      10
    ),
    new Repository(
      'cool library',
      ' this is a long description to test the text pipe. Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
      'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud ' +
      'exercitation ullamco laboris nisi ut ' +
      'aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu ' +
      'fugiat nulla pariatur.' +
      ' Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      150858,
      10,
      'user',
      'https://avatars2.githubusercontent.com/u/6993869?s=460&v=4l',
      2
    ),
    new Repository(
      'another repo',
      '',
      2297,
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
