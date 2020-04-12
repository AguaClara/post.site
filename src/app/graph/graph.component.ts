import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import * as _ from 'lodash'

import { Chart } from 'chart.js';
import { environment } from './../../environments/environment';
const firebase = require("firebase");
import 'chartjs-plugin-zoom';
require("firebase/firestore");

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  chart = [];

  constructor() { }

  ngOnInit(): void {

    this.chartChart();

  }

  chartChart(){
      if (!firebase.apps.length) {
          firebase.initializeApp(environment.firebaseConfig);
      }

      var db = firebase.database();
      var plant = localStorage.getItem("plantName").replace(/ /g, "");
      console.log("plant => ", plant);
      const ref = db.ref(plant);
      var self = this;
      var x1 = new Array();
      var y1 = new Array();
      var y2 = new Array();
      var y3 = new Array();
      var y4 = new Array();
      var y5 = new Array();

      ref.limitToLast(20).on('value', function(snapshot) {
        var nodeData;
        var entries = []

        snapshot.forEach(function(childSnapshot) {
          nodeData = childSnapshot.val();


          var raw_turb = nodeData['rawWaterTurbidity']
          if (raw_turb != null){
            var x_str = nodeData["timeFinished"];
            x_str = x_str.substring(0, x_str.length - 8);
            x1.push(x_str.replace("T", "  "));
            y1.push(raw_turb);
            y2.push(nodeData['settledWaterTurbidity']);
            y3.push(nodeData['filteredWaterTurbidity1']);
            y4.push(nodeData['coagulantDose']);
            y5.push(nodeData['chlorineDose']);

          }


        });


    var dt = Date.parse(x1[0])
    var date = new Date(dt)
    console.log(x1[0])
    console.log(date.getMonth())
    console.log(date.getFullYear())
    console.log(date.getDay())

    self.chart = new Chart('canvas', {
          type: 'line',
          data: {
            labels: x1,
            datasets: [
              {
                data: y1,
                borderColor: "#33cc99",
                fill: false,
                yAxisID: 'turbidity',
                label: 'Turbiedad de agua cruda (UTN)'
              },
              {
                data: y2,
                borderColor: "#66cccc",
                fill: false,
                yAxisID: 'turbidity',
                label: 'Turbiedad de agua decantada (UTN)'
              },
              {
                data: y3,
                borderColor: "#36a2eb",
                fill: false,
                yAxisID: 'turbidity',
                label: 'Turbiedad de agua filtrada (UTN)'
              },
              {
                data: y4,
                borderColor: "#ffcc00",
                fill: false,
                yAxisID: 'coagulant',
                label: 'Dosis de coagulante (mg/L)'
              },
              {
                data: y5,
                borderColor: "#ff9900",
                fill: false,
                yAxisID: 'coagulant',
                label: 'Dosis de cloro (mg/L)'
              }
            ]
          },
          options: {
            plugins: {
              zoom: {
                pan: {
                  enabled: true,
                  mode: 'x'
                },
                zoom: {
                  enabled: true,
                  mode: 'x'
                }
              }
            },
            maintainAspectRatio: false,
            legend: {
              display: true,
              position: 'right',
              onClick: function(e, legendItem) {
                var index = legendItem.datasetIndex;
                var ci = this.chart;
                var meta = ci.getDatasetMeta(index);

                meta.hidden = meta.hidden === null ? !ci.data.datasets[index].hidden : null;

                ci.update();
              },
            },
            scales: {
              xAxes: [{
                display: true,
                distribution: 'linear',
                type: 'time',
                    time: {
                        parser: 'YYYY-MM-DD HH:mm:ss',
                        unit: 'hour',
                        stepSize: 1,
                        displayFormats: {
                            'minute': 'YYYY-MM-DD HH:mm',
                            'hour': 'YYYY-MM-DD HH:mm'
                        }
                    },
                    ticks: {
                        source: 'data',
                        autoSkip: true,
                        maxTicksLimit: 5
                    },
                scaleLabel:{
                  display: true,
                  labelString: 'Fecha',
                  fontSize: 14
                }

              }],
              yAxes: [{
                id: 'turbidity',
                display: true,
                position: 'left',
                scaleLabel:{
                  display: true,
                  labelString: 'Turbiedad (UTN)',
                  fontSize: 14
                }
              },
              {
                id: 'coagulant',
                display: true,
                position: 'right',
                scaleLabel:{
                  display: true,
                  labelString: 'mg/L',
                  fontSize: 14
                },
                ticks: {
                  beginAtZero: true
                }

            }],
            }
          }
        });
      });

  }

}
