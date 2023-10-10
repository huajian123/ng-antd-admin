import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-water-mark',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './water-mark.component.html',
  styleUrls: ['./water-mark.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WaterMarkComponent {

}
