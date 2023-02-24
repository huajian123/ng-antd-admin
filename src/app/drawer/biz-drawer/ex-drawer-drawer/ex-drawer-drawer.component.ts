import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NonNullableFormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { fnCheckForm } from '@utils/tools';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-ex-drawer-drawer',
  templateUrl: './ex-drawer-drawer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NzGridModule, NzFormModule, NzInputModule]
})
export class ExDrawerDrawerComponent implements OnInit {
  params: { name: string } = { name: '' };
  validateForm = this.fb.group({
    password: ['', [Validators.required]]
  });

  constructor(private fb: NonNullableFormBuilder) {}

  getCurrentValue(): Observable<any> {
    if (!fnCheckForm(this.validateForm)) {
      return of(false);
    }
    return of(this.validateForm.value);
  }

  ngOnInit(): void {}
}
