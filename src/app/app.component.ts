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

  constructor() {
    this.sourceList = [];
    this.displayList = [];
    this.typeCountList = [];

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
        //console.log("this.displayList - " + this.displayList);
        this.typeCountList = this.countSatelliteTypes(this.displayList) ;
        //console.log("this.typeCountList - " + this.typeCountList);
      }.bind(this));
    }.bind(this));

  }
 
  search(searchTerm: string) : void {
    let matchingSatellites: Satellite[] = [];
    searchTerm = searchTerm.toLowerCase();

    for (let i = 0 ; i < this.sourceList.length ; i++){
      let name = this.sourceList[i].name.toLowerCase();

      if (name.indexOf(searchTerm) > -1) {
        matchingSatellites.push(this.sourceList[i]);
      }
    }

    this.displayList = matchingSatellites;
    console.log("matchingSatellites - " + matchingSatellites);
    this.typeCountList = this.countSatelliteTypes(matchingSatellites) ;
  }

  countSatelliteTypes(satellites) : SatelliteTypeCount[] {
    const total = 0;

    console.log("countSatelliteTypes satellites.length - " + satellites.length);
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

    console.log("typeCountList - " + typeCountList);
    return typeCountList;
  }
}
