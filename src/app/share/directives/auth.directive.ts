import {Directive} from '@angular/core';
import {AuthService} from '../../core/services/store/auth.service';

@Directive({
  selector: '[appAuth]'
})
export class AuthDirective {

  constructor(private authService: AuthService) {
    this.authService.getAuthCode().subscribe((codeArray) => {
      console.log(codeArray);
    });
  }

}
