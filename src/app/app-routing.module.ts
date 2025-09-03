import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { UserGuard } from '@core/guards/user/user.guard';
import { UserFormComponent } from '@shared/components/user-form/user-form.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/auth/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
    canActivate: [UserGuard],
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/auth/register/register.module').then(
        (m) => m.RegisterPageModule
      ),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./pages/profile/profile.module').then((m) => m.ProfilePageModule),
  },
  { path: 'user-form', component: UserFormComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
