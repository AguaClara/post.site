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

  constructor(private router:Router){}//public auth: AuthService, private router: Router) { }

  loginGoogle() {
    // var firebase = require("firebase/app");
    // if (firebase.auth().currentUser){
    //   this.auth.signOut()
    //   document.getElementById("loginout").innerHTML = "Suscribase con Gmail"
    // } else{
    //   this.auth.googleLogin()
    //   if (firebase.auth().currentUser){
    //     document.getElementById("loginout").innerHTML = "Suscribase con Gmail"
    //   }
    //
    // }

  }

  addUser(){
    if (!firebase.apps.length) {
        firebase.initializeApp(environment.firebaseConfig);
    }
    var db = firebase.firestore();
    var form = document.getElementsByTagName("FORM")[0];
    var inputs = form.getElementsByTagName("INPUT");
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


    // fill plants with the checked plants
    for (let plant of Array.from(plantBoxes)){
      if ((<HTMLInputElement>document.getElementById((<HTMLInputElement>plant).value)).checked){
        plnts.push((<HTMLInputElement>plant).value)
      }
    }
    if (nme==""){
      alert("Usted necesita dar su nombre para suscribirse.");
      return;
    }
    var docID = ""
    if (mail==""){
      docID = mID;
    }else{
      docID = mail;
    }
    if (docID == ""){
      alert("Usted necesita dar o una dirección de correo electronico o su nombre de usuario de Facebook.");
      return;
    }

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
