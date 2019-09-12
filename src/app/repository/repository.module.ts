import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

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
    CommonModule,
    SharedModule,
    RepositoryRoutingModule
  ],

})
export class RepositoryModule {
}
