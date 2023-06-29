import { Component, EventEmitter, OnInit, Output, ViewEncapsulation, Input, HostBinding } from '@angular/core';
import { Color } from '../../models';
import { BASIC_COLORS, stringInputToObject } from '../../helpers';

@Component({
  selector: 'ngx-mat-color-collection',
  templateUrl: './color-collection.component.html',
  styleUrls: ['./color-collection.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NgxMatColorCollectionComponent implements OnInit {
  @HostBinding('class') fixClass = 'ngx-mat-color-collection';

  @Output() colorChanged: EventEmitter<Color|null> = new EventEmitter<Color|null>();

  @Input()
  set color(c: Color | null) {
    if (c) {
      this.selectedColor = c.toHexString();
    }
  }

  selectedColor!: string;

  colors1: string[] = BASIC_COLORS.slice(0, 8);
  colors2: string[] = BASIC_COLORS.slice(8, 16);

  constructor() { }

  ngOnInit() {
  }

  select(hex: string) {
    this.selectedColor = hex;
    const tryConvert = stringInputToObject(hex);
    if (tryConvert) {
      const { r, g, b, a } = tryConvert;
      this.colorChanged.emit(new Color(r, g, b, a));
    } else {
      this.colorChanged.emit(null);
    }
  }

}
