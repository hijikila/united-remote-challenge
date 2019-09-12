import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {RepositoryComponent} from './repository.component';

const repositoriesModuleRoutes: Routes = [
  {
    path: '',
    component: RepositoryComponent,
    children: [
      {path: '**', redirectTo: ''}
    ],
  }];

@NgModule({
  imports: [
    RouterModule.forChild(repositoriesModuleRoutes)
  ],
  declarations: [],
  exports: [RouterModule]
})



export class RepositoryRoutingModule {}
