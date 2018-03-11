import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  title: string = 'Based in Charlottesville';
 // 38.0293° N, 78.4767° W
  lat: number = 38.0293;
  lng: number = -78.4767;
  bc: string ="#1D1273";
  zIndex: number = 100

  constructor() { }

  ngOnInit() {
  }

}
