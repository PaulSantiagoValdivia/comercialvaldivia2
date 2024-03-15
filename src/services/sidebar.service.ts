import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarStateService {
  private readonly sidebarStateKey = 'sidebarState';

  constructor() {}

  // Guarda el estado de la barra lateral en localStorage
  saveSidebarState(state: SidebarState): void {
    localStorage.setItem(this.sidebarStateKey, JSON.stringify(state));
  }

  // Obtiene el estado de la barra lateral desde localStorage
  getSidebarState(): SidebarState | null {
    const state = localStorage.getItem(this.sidebarStateKey);
    return state !== null ? JSON.parse(state) : null;
  }
}

export interface SidebarState {
  sidebarActive: boolean;
  activeSubMenu: number | null;
  activeSubMenuItemIndex: number | null;
  svgActive: boolean[];
}
