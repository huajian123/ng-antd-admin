import {NgModule} from '@angular/core';
import {NumberLoopPipe} from './number-loop.pipe';
import {HtmlPipe} from './html.pipe';
import {MapPipe} from './map.pipe';


const PIPES = [NumberLoopPipe, HtmlPipe, MapPipe];

@NgModule({
  declarations: [...PIPES],
  imports: [],
  exports: [...PIPES]
})
export class PipesModule {
}
