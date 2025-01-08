import { Component, Input, SimpleChanges, ViewEncapsulation } from '@angular/core';
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
  page!: number ;
  rows!: number ;
  total_results!: number ;
  first!: number ;

  ngOnInit() {
    this.page = this.pageParams.page!,
    this.rows = this.pageParams.rows!;
    this.total_results = this.pageParams.total_results!;
    this.first = (this.page - 1) * this.rows;
  }

  onPageChange(event: PaginatorState) {
    this.page = event.first!;
    this.rows = event.rows!;
  }
}
