import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from '../services/auth.guard'
import { HomeComponent } from './pages/home/home.component';
import { CrudExampleComponent } from './pages/crud-example/crud-example.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'test', component: CrudExampleComponent },
];
