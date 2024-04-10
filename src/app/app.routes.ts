import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from '../services/auth.guard'
import { HomeComponent } from './pages/home/home.component';
import { CrudPersona } from './pages/crud-persona/crud-persona.component';
import { CrudProveedorComponent } from './pages/crud-proveedor/crud-proveedor.component';
import { CrudRolesComponent } from './pages/crud-roles/crud-roles.component';
import { CrudRegionComponent } from './pages/crud-region/crud-region.component';
import { CrudSubregionComponent } from './pages/crud-subregion/crud-subregion.component';
import { CrudZonaComponent } from './pages/crud-zona/crud-zona.component';
import { CrudTerritorioComponent } from './pages/crud-territorio/crud-territorio.component';
import { CrudPuntodeventaComponent } from './pages/crud-puntodeventa/crud-puntodeventa.component';
import { CrudSkuComponent } from './pages/crud-sku/crud-sku.component';

export const routes: Routes = [

 { path: 'login', component: LoginComponent  }, // Página de inicio de sesión
  { path: '', component: HomeComponent  }, // Página de inicio protegida por el guardia de autenticación
  { path: 'persona', component: CrudPersona }, // Otras rutas protegidas por el guardia de autenticación
  { path: 'roles', component: CrudRolesComponent  },
  { path: 'proveedor', component: CrudProveedorComponent },
  { path: 'regiones', component: CrudRegionComponent },
  { path: 'subregiones', component: CrudSubregionComponent },
  { path: 'zonas', component: CrudZonaComponent },
  { path: 'territorios', component: CrudTerritorioComponent },
  { path: 'punto_de_ventas', component: CrudPuntodeventaComponent },
  { path: 'sku', component: CrudSkuComponent },
];
