import { Component, OnInit } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { Marker } from '@agm/core/services/google-maps-types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user = { name: '', password: '' };
  temdata;
  zoom: number = 7;
  markerName;
  iconpng = "";
  isInfoWindowOpen;
  tablemarker = [];
  markers = [];
  lat = 13.305263126098277;
  lng = 77.81065872716181;
  nowICanDisable: boolean;

  // Adding a Marker
  add($event: MouseEvent) {
    if (this.markerName) {
      let latslongsarr = [[12.299718283439178, 76.66092651562496], [12.3258937946852723623, 76.81473510937496],
      [12.647184318927538, 76.46866577343746], [12.048868390190197, 76.69663208203121],
      [12.145549614447532, 76.07566040234371], [13.062233860713365, 77.52060669140621], [12.842744713976934, 77.65793579296871],
      [13.305263126098277, 77.81065872716181], [13.241106065121398, 77.42064407872431], [12.652221444849138, 77.01414993809931],
      [13.011071616742813, 76.16270984368794], [13.353369779756513, 75.75072253900044], [13.529678587239243, 76.54723132806294]];
      let rand = latslongsarr[Math.floor(Math.random() * latslongsarr.length)];

      this.markers.push({
        lat: rand[0],
        lng: rand[1],
        mname: this.markerName,
        draggable: false,
        icon: 'https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FF0000'
      });

      this.tablemarker.push({
        lat: rand[0],
        lng: rand[1],
        label: this.markerName,
        mname: this.markerName
      });

      this.markerName = '';
    } else {
      alert('Please Enter Marker Name')
    }
  }

  edit(lat, lng, name, label, i) {
    this.nowICanDisable = true;
    this.markers.splice(i, 1);
    this.markers.splice(i, 0, {
      lat: lat,
      lng: lng,
      mname: name,
      // label: (i + 1).toString(),
      draggable: true,
      icon: 'https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|4286f4'
    });
    this.temdata = [{
      lat: lat,
      lng: lng,
      mname: name,
      i: i,
    }];
    this.markerName = label
  }

  Updateclick() {
    this.tablemarker.splice(this.temdata[0]['i'], 1);
    this.tablemarker.splice(this.temdata[0]['i'], 0, {
      lat: this.temdata[0]['lat'],
      lng: this.temdata[0]['lng'],
      label: this.markerName,
      mname: this.markerName
    });

    this.markers.splice(this.temdata[0]['i'], 1);
    this.markers.splice(this.temdata[0]['i'], 0, {
      lat: this.temdata[0]['lat'],
      lng: this.temdata[0]['lng'],
      mname: this.markerName,
      draggable: false,
      icon: 'https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FF0000'
    });
    this.markerName = '';
    this.nowICanDisable = false;
  }



  delete(i) {
    this.tablemarker.splice(i, 1);
    this.markers.splice(i, 1);
  }



  markerDragEnd(m, $event: MouseEvent, i) {
    this.temdata = [];
    this.temdata = [{
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      mname: m,
      i: i,
    }];

  }
  ngOnInit() { }

  mouseover(m: any, i: number) {
    this.isInfoWindowOpen = i;
    this.markers.map((el, i) => {
      if (el.lat == m) {
        this.markers[i].icon = 'https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|4286f4';

      }
    })
  }
  mouseout(m: any, i: number) {
    this.isInfoWindowOpen = this.markers.length + 1;
    this.markers.map((el, i) => {
      if (el.lat == m) {
        this.markers[i].icon = 'https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FF0000';

      }
    })
  }

}
