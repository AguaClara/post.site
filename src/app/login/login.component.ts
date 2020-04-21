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

  addUser(){
    if (!firebase.apps.length) {
        firebase.initializeApp(environment.firebaseConfig);
    }
    var db = firebase.firestore();
    var form = document.getElementsByTagName("FORM")[0];
    var inputs = form.getElementsByTagName("INPUT");
    console.log(inputs);
    var nme = inputs[0]["value"];
    var mail = inputs[1]["value"];
    var pswd = inputs[2]["value"];
    if (pswd != inputs[3]["value"]){
      alert("Las contraseñas son diferentes. Tienen que ser iguales.");
      return;
    }
    var mID = inputs[4]["value"];
    var plantForm = document.getElementsByTagName("FORM")[1];
    var plantBoxes = plantForm.getElementsByTagName("INPUT");
    var plnts = [];

    console.log(mail);
    console.log(mID)

    // fill plants with the checked plants
    for (let plant of Array.from(plantBoxes)){
      if ((<HTMLInputElement>document.getElementById((<HTMLInputElement>plant).value)).checked){
        plnts.push((<HTMLInputElement>plant).value)
      }
    }
    // if (nme==""){
    //   alert("Usted necesita entrar su nombre para suscribirse.");
    //   return;
    // }

    // if (mail == ""){
    //   alert("Usted necesita entrar un correo electronico.");
    //   return;
    // }

    var docID = mail;//""
    // if (mail==""){
    //   docID = mID;
    // }else{
    //   docID = mail;
    // }
    // if (docID == ""){
    //   alert("Usted necesita dar o una dirección de correo electronico o su nombre de usuario de Facebook.");
    //   return;
    // }

    if(pswd==""){
      alert("Usted necesita usar una contraseña para suscribirse.");
      return;
    }

    if (plnts.length == 0){
      alert("Usted necesita seleccionar una planta.");
      return;
    }
    db.collection("users").doc(docID).set({
        name: nme,
        email: mail,
        password: pswd,
        messengerID: mID,
        plants: plnts
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docID);
    }).then(()=>{
      console.log("Success")
      this.router.navigate(['app-subscribed'])
    }).catch(function(error) {
      console.error("Error adding document: ", error);
      alert("Hubo un error. Intente de nuevo más tarde.")
    });
    return;
  }

  ngOnInit(): void {
  }

}
