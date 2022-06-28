import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ApiUrl } from 'src/app/models/config';
import { Project } from 'src/app/models/project';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  public projects: Array<Project>;
  public url = ApiUrl

  constructor(
    private _appService: AppService,
  ) { }

  ngOnInit(): void {
    this.getProjects()
    this.getlambda();
  }

  getProjects() {
    this._appService.getProjects().subscribe(data=> {
      console.log(data.print);
      this.projects = data.print;
    })
  }

  getlambda() {
    this._appService.prueba().subscribe()
  }

}
