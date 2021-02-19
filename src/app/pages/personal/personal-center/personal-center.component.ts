import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  ComponentFactoryResolver, Type
} from '@angular/core';
import {AdDirective} from "../../../share/directives/ad.directive";
import {ArticleComponent} from "./article/article.component";
import {ApplicationComponent} from "./application/application.component";
import {ProjectsComponent} from "./projects/projects.component";
import {AdComponent} from "../../../core/services/types";

interface TabInterface {
  label: string;
  component: AdItem;
}

export class AdItem {
  constructor(public component: Type<any>, public data: any) {
  }
}


@Component({
  selector: 'app-personal-center',
  templateUrl: './personal-center.component.html',
  styleUrls: ['./personal-center.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalCenterComponent implements OnInit {
  tagArray: string[] = ['很有想法的', '专注设计', '大长腿', '川妹子', '海纳百川'];
  inputVisible: boolean = false;
  @ViewChild('inputElement', {static: false}) inputElement?: ElementRef;
  inputValue = '';
  tabData: TabInterface[] = [
    {label: '文章(8)', component: new AdItem(ArticleComponent, {})},
    {label: '应用(8)', component: new AdItem(ApplicationComponent, {})},
    {label: '项目(8)', component: new AdItem(ProjectsComponent, {})},
  ];

  @ViewChild(AdDirective, {static: true}) adHost!: AdDirective;


  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }

  to(adItem: TabInterface): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component.component);
    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent<AdComponent>(componentFactory);
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
