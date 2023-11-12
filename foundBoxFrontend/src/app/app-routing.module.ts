import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from "./shared/layout/auth/auth.component";
import {BaseComponent} from "./shared/layout/base/base.component";

const routes: Routes = [
  {path: 'login', component: AuthComponent, loadChildren: () => import('./page/login/login.module').then(m => m.LoginModule)},
  {path: 'home', component: BaseComponent, loadChildren: () => import('./page/home/home.module').then(m => m.HomeModule)},
  {path: 'register', component: AuthComponent, loadChildren: () => import('./page/register/register.module').then(m => m.RegisterModule)},
  { path: 'score', component: BaseComponent, loadChildren: () => import('./page/score/score.module').then(m => m.ScoreModule) },
  {path: '**', redirectTo: 'home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
