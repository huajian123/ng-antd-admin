import {NgModule} from '@angular/core';
import {NumberLoopPipe} from './number-loop.pipe';
import {HtmlPipe} from './html.pipe';


@NgModule({
  declarations: [NumberLoopPipe, HtmlPipe],
  imports: [],
  exports: [NumberLoopPipe, HtmlPipe]
})
export class PipesModule {
}
