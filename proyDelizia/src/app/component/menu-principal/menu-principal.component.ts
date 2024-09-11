import { Component } from '@angular/core';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrl: './menu-principal.component.css'
})
export class MenuPrincipalComponent {
  selectedComponent: string | null = null;

  selectComponent(component: string) {
    this.selectedComponent = component;
  }
}


