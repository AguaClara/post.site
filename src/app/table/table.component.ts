import { Component, OnInit } from '@angular/core';

import { environment } from './../../environments/environment';
const firebase = require("firebase");
require("firebase/firestore");

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  rows:any = new Array();

  constructor() { }

  ngOnInit(): void {
    this.getData();
  }

  async getData(){

    var db = firebase.database();
    var plant = localStorage.getItem("plantName").replace(/ /g, "");
    const ref = db.ref(plant);
    var self = this;

    ref.limitToLast(20).on('value', function(snapshot) {
      var nodeData;
      var entries = [];

      snapshot.forEach(function(childSnapshot) {
        nodeData = childSnapshot.val();
        var x_str = nodeData["timeFinished"];
        x_str = x_str.substring(0, x_str.length - 8);
        var obj:any = {"timeStamp": x_str.replace("T", "  "), "rawWaterTurbidity": nodeData['rawWaterTurbidity'], "settledWaterTurbidity": nodeData['settledWaterTurbidity'], "filteredWaterTurbidity": nodeData['filteredWaterTurbidity1'], "coagulantDose": nodeData['coagulantDose'], "chlorineDose": nodeData["chlorineDose"]};
        self.rows.push(<JSON>obj);
      });
    });
  }

}
