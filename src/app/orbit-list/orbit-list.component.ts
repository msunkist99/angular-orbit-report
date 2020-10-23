import { unescapeIdentifier } from '@angular/compiler';
import { Component, OnInit, Input } from '@angular/core';
import { Satellite } from '../satellite';

@Component({
  selector: 'app-orbit-list',
  templateUrl: './orbit-list.component.html',
  styleUrls: ['./orbit-list.component.css']
})
export class OrbitListComponent implements OnInit {

  constructor() { 
  }

  ngOnInit() {
  }

  @Input() satellites: Satellite[];

  shouldShowWarning(satelliteType: string) : boolean {
    if (satelliteType.toUpperCase() === 'SPACE DEBRIS') {
      return true;
    }
    return false;
  }

  sort(column: string): void {
    this.satellites.sort(function(a: Satellite, b:Satellite): number {
      if(a[column] < b[column]){
        return -1;
      }
      else if (a[column] > b[column]) {
        return 1;
      }
      else {
        return 0;
      }
    });
  }
}
