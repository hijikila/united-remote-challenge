import {NgModule} from '@angular/core';

import {SharedModule} from '../shared/shared.module';

import {RepositoryComponent} from './repository.component';
import {RepositoryItemComponent} from './repository-item/repository-item.component';
import {RepositoryRoutingModule} from './repository-routing.module';


@NgModule({
  declarations: [
    RepositoryComponent,
    RepositoryItemComponent,
  ],
  imports: [
    SharedModule,
    RepositoryRoutingModule
  ],

})
export class RepositoryModule {
}
