import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { optionsMenu } from '../../data/optionsMenu';
import { OptionMenu } from '../../interfaces/optionMenu';

@Component({
  selector: 'country-top-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './top-menu.component.html',
})
export class TopMenuComponent { 
  // optionsMenu es una señal que contiene el arreglo de opciones del menú
  optionsMenu = signal<OptionMenu[]>(optionsMenu);

  /**
   * La función sanitizeHtml toma un string con HTML y lo "sanea" (lo marca como seguro)
   * para que Angular lo pueda renderizar en el DOM sin bloquearlo por motivos de seguridad.
   * Utiliza DomSanitizer para evitar ataques XSS cuando se inserta HTML dinámico.
   * 
   * @param html - El string HTML a sanear
   * @returns SafeHtml - El HTML marcado como seguro para Angular
   */
  sanitizeHtml(html: string): SafeHtml {
    return this.domSanitizer.bypassSecurityTrustHtml(html);
  }

  // El constructor inyecta el servicio DomSanitizer necesario para sanear el HTML
  constructor(private domSanitizer: DomSanitizer) {
  }
}
