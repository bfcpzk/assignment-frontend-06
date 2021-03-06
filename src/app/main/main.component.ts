import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  getNetIdFromFollowing: string;

  constructor(private http: HttpClient) {}

  ngOnInit() {
  }

  getNewNetId(event){
    this.getNetIdFromFollowing = event;
  }
}
