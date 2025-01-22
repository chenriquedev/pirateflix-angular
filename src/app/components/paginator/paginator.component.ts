import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { Params } from '../../model/params';

@Component({
  selector: 'app-paginator',
  imports: [PaginatorModule],
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PaginatorComponent {
  @Input() pageParams: Params = {};
  @Output() changeActualPage = new EventEmitter<Params>();

  onPageChange(event: PaginatorState) {
    this.changeActualPage.emit({
      page: event.page! + 1,
    });
  }
}
