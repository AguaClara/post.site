import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subscribed',
  templateUrl: './subscribed.component.html',
  styleUrls: ['./subscribed.component.css']
})
export class SubscribedComponent implements OnInit {

  constructor(private router: Router) { }

  okay(){
    this.router.navigate(['app-plant']);
  }

  ngOnInit(): void {
  }

}
