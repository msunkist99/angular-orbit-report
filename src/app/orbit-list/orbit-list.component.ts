import { unescapeIdentifier } from '@angular/compiler';
import { Component, OnInit, Input } from '@angular/core';
import { Satellite } from '../satellite';

@Component({
  selector: 'app-orbit-list',
  templateUrl: './orbit-list.component.html',
  styleUrls: ['./orbit-list.component.css']
})
export class OrbitListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() satellites: Satellite[];

  shouldShowWarning(satelliteType: string) : boolean {
    console.log(satelliteType);
    console.log(typeof satelliteType);

    if (satelliteType.toUpperCase() === 'SPACE DEBRIS') {
      return true;
    }
    return false;
  }
}
