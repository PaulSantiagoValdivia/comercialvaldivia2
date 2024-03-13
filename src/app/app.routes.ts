import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from '../services/auth.guard'
import { HomeComponent } from './pages/home/home.component';
import { CrudExampleComponent } from './pages/crud-example/crud-example.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Página de inicio de sesión
  { path: '', component: HomeComponent, canActivate: [AuthGuard] }, // Página de inicio protegida por el guardia de autenticación
  { path: 'test', component: CrudExampleComponent, canActivate: [AuthGuard] }, // Otras rutas protegidas por el guardia de autenticación
];
