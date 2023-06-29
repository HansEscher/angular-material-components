import { AfterContentInit, ChangeDetectorRef, Component, HostBinding, HostListener, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatLegacyButton as MatButton } from '@angular/material/legacy-button';
import { merge, of, Subscription } from 'rxjs';
import { NgxMatColorPickerComponent } from '../color-picker/color-picker.component';

@Component({
  selector: 'ngx-mat-color-toggle',
  templateUrl: './color-toggle.component.html',
  styleUrls: ['./color-toggle.component.scss'],
  exportAs: 'ngxMatColorPickerToggle',
  encapsulation: ViewEncapsulation.None
})
export class NgxMatColorToggleComponent implements OnInit, AfterContentInit, OnChanges, OnDestroy {
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('for') picker!: NgxMatColorPickerComponent;

  @HostBinding('attr.tabindex')
  @Input() tabIndex = -1;

  @HostBinding('class') fixClass = 'ngx-mat-color-toggle';
  // Always set the tabindex to -1 so that it doesn't overlap with any custom tabindex the
  // consumer may have provided, while still being able to receive focus.

  @HostBinding('class.ngx-mat-color-toggle-active') toggleActive = this.picker && this.picker.opened;
  @HostBinding('class.mat-warn') matWarn = this.picker && this.picker.color === 'warn';

  @HostListener('focus', ['$event'])
  callButtonFocus(_: Event) {
    this._button.focus();
  }

  private _stateChanges = Subscription.EMPTY;

  @Input() get disabled(): boolean {
    if (this._disabled === null && this.picker) {
      return this.picker.disabled;
    }
    return false;
  }
  set disabled(value: boolean) {
    this._disabled = value;
  }
  private _disabled!: boolean;

  @ViewChild('button') _button!: MatButton;

  constructor(private _cd: ChangeDetectorRef) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['picker']) {
      this._watchStateChanges();
    }
  }

  ngOnDestroy() {
    this._stateChanges.unsubscribe();
  }

  ngAfterContentInit() {
    this._watchStateChanges();
  }

  public open(event: Event): void {
    if (this.picker && !this.disabled) {
      this.picker.open();
      event.stopPropagation();
    }
  }

  private _watchStateChanges() {
    const disabled$ = this.picker ? this.picker._disabledChange : of();
    const inputDisabled$ = this.picker && this.picker._pickerInput ?
      this.picker._pickerInput._disabledChange : of();

    const pickerToggled$ = this.picker ?
      merge(this.picker.openedStream, this.picker.closedStream) : of();
    this._stateChanges.unsubscribe();

    this._stateChanges = merge(disabled$, inputDisabled$, pickerToggled$).subscribe(() => this._cd.markForCheck());
  }

}
