import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  title: string = 'My first AGM project';
  lat: number = 51.678418;
  lng: number = 7.809007;

  constructor() { }

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = +position.coords.latitude;
        this.lng = +position.coords.longitude;
        console.log(position.coords);
      }, (error) => {

        switch (error.code) {
          case error.PERMISSION_DENIED:
            console.log('User denied the request for Geolocation.');
            break;

          case error.POSITION_UNAVAILABLE:
            console.log('Location information is unavailable.');
            break;

          case error.TIMEOUT:
            console.log('The request to get user location timed out.');
            break;
        }

      });

    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }

}
