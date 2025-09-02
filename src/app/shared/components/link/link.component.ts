import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
  standalone: false,
})
export class LinkComponent {
  @Input() url: string = '';
  @Input() queryParams: { [key: string]: any } = {};
  @Input() fragment: string = '';
  @Input() target: '_self' | '_blank' | '_parent' | '_top' = '_self';
  @Input() disabled: boolean = false;
  @Input() linkType: 'router' | 'href' = 'router';
  @Input() color: string = 'primary';
  @Input() button: boolean = false;
  @Input() fill: 'clear' | 'outline' | 'solid' | 'default' = 'clear';
  @Input() expand: 'full' | 'block' | undefined;

  @Output() onClick = new EventEmitter<Event>();

  public constructor(private router: Router, private location: Location) {}

  handleClick(event: Event): void {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    this.onClick.emit(event);

    if (this.linkType === 'router' && this.target === '_self') {
      event.preventDefault();

      if (this.url.startsWith('/')) {
        // Navegación absoluta
        this.router.navigate([this.url], {
          queryParams: this.queryParams,
          fragment: this.fragment,
        });
      } else if (this.url === 'back') {
        // Navegación hacia atrás
        this.location.back();
      } else {
        // Navegación relativa
        this.router.navigate([this.url], {
          relativeTo: this.router.routerState.root,
          queryParams: this.queryParams,
          fragment: this.fragment,
        });
      }
    }

    // Para enlaces href, el comportamiento por defecto se encargará de la navegación
  }

  isExternalUrl(): boolean {
    return this.url.startsWith('http://') || this.url.startsWith('https://');
  }

  getLinkType(): 'router' | 'href' {
    if (
      this.linkType === 'href' ||
      this.isExternalUrl() ||
      this.target !== '_self'
    ) {
      return 'href';
    }
    return 'router';
  }
}
