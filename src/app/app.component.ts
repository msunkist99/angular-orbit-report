import { ConditionalExpr } from '@angular/compiler';
import { Component } from '@angular/core';
import { Satellite } from './satellite';
import { SatelliteTypeCount} from './satellite-type-count';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
//   constructor() {
//     this.sourceList = [
//        new Satellite("SiriusXM", "Communication", "2009-03-21", "LOW", true),
//        new Satellite("Cat Scanner", "Imaging", "2012-01-05", "LOW", true),
//        new Satellite("Weber Grill", "Space Debris", "1996-03-25", "HIGH", false),
//        new Satellite("GPS 938", "Positioning", "2001-11-01", "HIGH", true),
//        new Satellite("ISS", "Space Station", "1998-11-20", "LOW", true),
//     ];
//  }

  title = 'angular-orbit-report';
  sourceList: Satellite[];
  displayList: Satellite[];
  typeCountList: SatelliteTypeCount[];
  searchValue = null;

  constructor() {
    this.sourceList = [];
    this.displayList = [];
    this.typeCountList = [];
    this.searchValue = null;

    let satellitesUrl = 'https://handlers.education.launchcode.org/static/satellites.json';
    
    window.fetch(satellitesUrl).then(function(response) {
      response.json().then(function(data) {
        let fetchedSatellites = data.satellites;

        // TODO: loop over satellites
        // TODO: create a Satellite object using new Satellite(fetchedSatellites[i].name, fetchedSatellites[i].type, fetchedSatellites[i].launchDate, fetchedSatellites[i].orbitType, fetchedSatellites[i].operational);
        // TODO: add the new Satellite object to sourceList using: this.sourceList.push(satellite);
        for (let i = 0 ; i < fetchedSatellites.length ; i++){
          let satellite = new Satellite(fetchedSatellites[i].name,
                                        fetchedSatellites[i].type,
                                        fetchedSatellites[i].launchDate,
                                        fetchedSatellites[i].orbitType,
                                        fetchedSatellites[i].operational);
          this.sourceList.push(satellite);          
        }

        this.displayList = this.sourceList.slice(0);
        this.typeCountList = this.countSatelliteTypes(this.displayList) ;
      }.bind(this));
    }.bind(this));

  }
 
  search(searchTerm: string, searchColumn: string) : void {
    let matchingSatellites: Satellite[] = [];
    searchTerm = searchTerm.toLowerCase();

    for (let i = 0 ; i < this.sourceList.length ; i++){
  
      if (searchColumn === 'name') {
        let name = this.sourceList[i].name.toLowerCase();
        if (name.indexOf(searchTerm) > -1) {
          matchingSatellites.push(this.sourceList[i]);
        }
      }
      else if (searchColumn === 'type') {
        let type = this.sourceList[i].type.toLowerCase();

        if (type.indexOf(searchTerm) > -1) {
          matchingSatellites.push(this.sourceList[i]);
        }
      }
      else if (searchColumn === 'orbit') {
        let orbitType = this.sourceList[i].orbitType.toLowerCase();

        if (orbitType.indexOf(searchTerm) > -1) {
          matchingSatellites.push(this.sourceList[i]);
        }
      }
    }

    this.displayList = matchingSatellites;
    this.typeCountList = this.countSatelliteTypes(this.displayList) ;
  }

  countSatelliteTypes(satellites) : SatelliteTypeCount[] {
    const total = 0;
    let typeCountList: SatelliteTypeCount[] = [];

    for (let i = 0 ; i < satellites.length ; i++){
      if (i === 0) {
        let satelliteTypeCount = new SatelliteTypeCount("Total", 1);
        typeCountList.push(satelliteTypeCount);

        satelliteTypeCount = new SatelliteTypeCount(satellites[i].type, 1);
        typeCountList.push(satelliteTypeCount);
      }

      else {
        typeCountList[total].count = typeCountList[total].count + 1;

        let index = typeCountList.findIndex(x => x.type === satellites[i].type)
      
        if (index < 0) {
          let satelliteTypeCount = new SatelliteTypeCount(satellites[i].type, 1);
          typeCountList.push(satelliteTypeCount);
        }
        else {
          typeCountList[index].count = typeCountList[index].count + 1;
        }
      }
    }

    return typeCountList;
  }
}
