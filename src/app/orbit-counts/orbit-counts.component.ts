import { Component, OnInit, Input } from '@angular/core';
import { SatelliteTypeCount } from '../satellite-type-count';

@Component({
  selector: 'app-orbit-counts',
  templateUrl: './orbit-counts.component.html',
  styleUrls: ['./orbit-counts.component.css']
})

export class OrbitCountsComponent implements OnInit {
  @Input() typeCountList: SatelliteTypeCount[];

  constructor() {
   }

  ngOnInit() : void {
  }
}
