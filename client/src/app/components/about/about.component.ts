import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  public title: String;
  public subtitle: String;
  public web: String;


  constructor() { 
    this.title = "Jesus chamorro"
    this.subtitle = "Desarrollador Web"
    this.web = "jesusfeli54@gmail.com"
  }

  ngOnInit(): void {
  }

}
