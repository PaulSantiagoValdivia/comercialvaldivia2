import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from '../services/auth.guard'
import { HomeComponent } from './pages/home/home.component';
import { CrudPersona } from './pages/crud-persona/crud-persona.component';
import { CrudProveedorComponent } from './pages/crud-proveedor/crud-proveedor.component';
import { CrudRolesComponent } from './pages/crud-roles/crud-roles.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Página de inicio de sesión
  { path: '', component: HomeComponent }, // Página de inicio protegida por el guardia de autenticación
  { path: 'persona', component: CrudPersona}, // Otras rutas protegidas por el guardia de autenticación
  { path: 'roles', component: CrudRolesComponent},
  { path: 'proveedor', component: CrudProveedorComponent, canActivate: [AuthGuard] },
];
