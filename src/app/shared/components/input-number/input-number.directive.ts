
import { Directive, HostListener, ElementRef, OnInit, Input } from "@angular/core";
import { DecimalPipe } from '@angular/common';

@Directive({ selector: "[numberInput]" })
export class NumberInputDirective implements OnInit {

  // build the regex based on max pre decimal digits allowed
  private regexString(max?: number) {
    const maxStr = max ? `{0,${max}}` : `+`;
    return `^(\\d${maxStr}(\\.\\d{0,2})?|\\.\\d{0,2})$`
  }
  private digitRegex!: RegExp;
  private setRegex(maxDigits?: any) {
    this.digitRegex = new RegExp(this.regexString(maxDigits), 'g')
  }
  @Input()
  set maxDigits(maxDigits: any) {
    this.setRegex(maxDigits);
  } 

  private el: HTMLInputElement;

  constructor(
    private elementRef: ElementRef,
    private decimalPipe: DecimalPipe
  ) {
    this.el = this.elementRef.nativeElement;
    this.setRegex();
  }

  ngOnInit() {
    this.el.value = this.decimalPipe.transform(this.el.value,"1.0-0")!;
  }

  @HostListener("focus", ["$event.target.value"])
  onFocus(value: any) {
    // on focus remove number formatting
    this.el.value = value.replace(/[^0-9.]+/g, '')
    this.el.select();
  }

  @HostListener("blur", ["$event.target.value"])
  onBlur(value:any) {
    // on blur, add number formatting
    this.el.value = this.decimalPipe.transform(value,"1.0-0")!;
  }

  @HostListener("keydown.control.z", ["$event.target.value"])
  onUndo(value: any) {
    this.el.value = '';
  }

  // variable to store last valid input
  private lastValid = '';
  @HostListener('input', ['$event'])
  onInput(event: any) {
    // on input, run regex to only allow certain characters and format
    const cleanValue = (event.target.value.match(this.digitRegex) || []).join('')
    if (cleanValue || !event.target.value)
      this.lastValid = cleanValue
    this.el.value = cleanValue || this.lastValid
  }
}