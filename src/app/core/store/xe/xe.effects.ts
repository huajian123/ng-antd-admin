import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { XeService } from 'src/app/core/services/http/xe/xe.service';
import * as xeActions from './xe.action';
import { mapTimeStamp } from '../../utils/operators.utils';

@Injectable()
export class PostEffects {

//   loadXes$ = createEffect(() => this.actions$.pipe(
//     ofType(xeActions.getXes),
//     mergeMap(() => this.xeService.getXes()),
//     mapTimeStamp(),
//     map(xes => xeActions.getXesSucess({ xes })),
//     catchError(error => of(xeActions.getXeFailed({ error })))
//   ));

  constructor(
    private actions$: Actions,
    private xeService: XeService,
  ) { }
}