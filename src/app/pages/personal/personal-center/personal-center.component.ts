import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import {AdDirective} from '../../../shared/directives/ad.directive';
import {ArticleComponent} from './article/article.component';
import {ApplicationComponent} from './application/application.component';
import {ProjectsComponent} from './projects/projects.component';
import {AdComponent, DynamicComponent} from '../../../core/services/types';

interface TabInterface {
  label: string;
  component: DynamicComponent;
}


@Component({
  selector: 'app-personal-center',
  templateUrl: './personal-center.component.html',
  styleUrls: ['./personal-center.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalCenterComponent implements OnInit {
  tagArray: string[] = ['很有想法的', '专注设计', '大长腿', '川妹子', '海纳百川'];
  inputVisible = false;
  @ViewChild('inputElement', {static: false}) inputElement?: ElementRef;
  inputValue = '';
  tabData: TabInterface[] = [
    {label: '文章(8)', component: new DynamicComponent(ArticleComponent, {})},
    {label: '应用(8)', component: new DynamicComponent(ApplicationComponent, {})},
    {label: '项目(8)', component: new DynamicComponent(ProjectsComponent, {})},
  ];

  @ViewChild(AdDirective, {static: true}) adHost!: AdDirective;

  constructor() {}

  to(adItem: TabInterface): void {
    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent<AdComponent>(adItem.component.component);
    componentRef.instance.data = adItem.component.data;
  }

  handleInputConfirm(): void {
    if (this.inputValue && this.tagArray.indexOf(this.inputValue) === -1) {
      this.tagArray = [...this.tagArray, this.inputValue];
    }
    this.inputValue = '';
    this.inputVisible = false;
  }

  showInput(): void {
    this.inputVisible = true;
    setTimeout(() => {
      this.inputElement?.nativeElement.focus();
    }, 10);
  }

  ngOnInit(): void {
    this.to(this.tabData[0]);
  }

}
