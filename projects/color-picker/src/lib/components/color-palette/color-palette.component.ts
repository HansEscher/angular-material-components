import { Component, OnInit, ViewEncapsulation, Output, EventEmitter, Input, HostBinding } from '@angular/core';
import { Color } from '../../models';

@Component({
  selector: 'ngx-mat-color-palette',
  templateUrl: 'color-palette.component.html',
  styleUrls: ['color-palette.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class NgxMatColorPaletteComponent implements OnInit {
  @HostBinding('class') fixClass = 'ngx-mat-color-palette';

  @Output() colorChanged: EventEmitter<Color|null> = new EventEmitter<Color|null>();

  @Input()
  color: Color | null = null;

  constructor() { }

  ngOnInit() {
  }

  public handleColorChanged(color: Color|null) {
    this.colorChanged.emit(color);
  }

}
