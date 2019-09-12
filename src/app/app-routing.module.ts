import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

const appRoutes: Routes = [
  {path: '', redirectTo: '/repositories', pathMatch: 'full'},
  {path: 'repositories', loadChildren: () => import('./repository/repository.module').then(m => m.RepositoryModule)},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })
  ],
  declarations: [],
  exports: [RouterModule]
})

export class AppRoutingModule {}
