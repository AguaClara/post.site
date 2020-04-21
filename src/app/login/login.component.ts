import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { AuthService } from './../../core/auth.service';
import { environment } from './../../environments/environment';
const firebase = require("firebase");
require("firebase/firestore");

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router){}

  write(){

    if (!firebase.apps.length) {
        firebase.initializeApp(environment.firebaseConfig);
    }
    var db = firebase.firestore();
    console.log(db);

    var form = document.getElementsByTagName("FORM")[0];
    var inputs = form.getElementsByTagName("INPUT");
    console.log(inputs);
    var nme = inputs[0]["value"];
    var mail = inputs[1]["value"];
    var pswd = inputs[2]["value"];
    if (pswd != inputs[3]["value"]){
      alert("Las contraseñas son diferentes. Tienen que ser iguales.");
      return false;
    }
    var mID = inputs[4]["value"];
    var plantForm = document.getElementsByTagName("FORM")[1];
    var plantBoxes = plantForm.getElementsByTagName("INPUT");
    var plnts = [];



    // fill plants with the checked plants
    for (let plant of Array.from(plantBoxes)){
      if ((<HTMLInputElement>document.getElementById((<HTMLInputElement>plant).value)).checked){
        plnts.push((<HTMLInputElement>plant).value)
      }
    }

    var docID = mail;
    if (docID == ""){
      alert("Se necesita un correo electronico.");
      return false;
    }

    if(pswd==""){
      alert("Usted necesita usar una contraseña para suscribirse.");
      return false;
    }

    if (plnts.length == 0){
      alert("Usted necesita seleccionar una planta.");
      return false;
    }


    // db.collection("users").add({
    //     name: nme,
    //     email: mail,
    //     password: pswd,
    //     messengerID: mID,
    //     plants: plnts
    // })
    db.collection("users").doc(mail).set({
        name: nme,
        email: mail,
        password: pswd,
        messengerID: mID,
        plants: plnts
    })
    .then(()=>{
      console.log("Navigating")
      this.router.navigate(['app-subscribed'])
    });
    return false;

  }

  ngOnInit(): void {
  }

}
