import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Observable, of} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {fnCheckForm} from "@utils/tools";

@Component({
  selector: 'app-ex-drawer-drawer',
  templateUrl: './ex-drawer-drawer.component.html',
  styleUrls: ['./ex-drawer-drawer.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExDrawerDrawerComponent implements OnInit {
  params: { name: string } = {name: ''};
  validateForm!: FormGroup;

  constructor(private fb: FormBuilder,) {
  }

  getCurrentValue(): Observable<any> {
    if (!fnCheckForm(this.validateForm)) {
      return of(false);
    }
    return of(this.validateForm.value);
  }

  initForm(): void {
    this.validateForm = this.fb.group({
      password: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

}
