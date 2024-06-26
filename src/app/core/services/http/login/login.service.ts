import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// import { MENU_TOKEN } from '@config/menu';
import { Menu } from '@core/services/types';
import { BaseHttpService } from '@services/base-http.service';
// import { MenusService } from '@services/system/menus.service';

export interface UserLogin {
  name: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  http = inject(BaseHttpService);
  // private menus = inject(MENU_TOKEN);

  public login(params: UserLogin): Observable<string> {
    return this.http.post('/login', params, { needSuccessInfo: false });
  }

  public getMenuByUserId(userId: number): Observable<Menu[]> {
    // 如果是静态菜单，就把下面注释放开
    // return of(this.menus);
    return this.http.get(`/sysPermission/menu/${userId}`);
  }
}
