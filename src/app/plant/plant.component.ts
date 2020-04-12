import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plant',
  templateUrl: './plant.component.html',
  styleUrls: ['./plant.component.css']
})
export class PlantComponent implements OnInit {

  plant = localStorage.getItem("plantName");

  constructor() { }

  ngOnInit(): void {
  }

}
