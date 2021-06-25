import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
