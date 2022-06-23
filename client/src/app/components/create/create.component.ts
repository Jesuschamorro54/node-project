import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Project } from 'src/app/models/project';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  public project: Project= {
    _id: "",
    name: "",
    description: "",
    category: "",
    year: 0,
    langs: "",
    image: "",
  };

  constructor(
    private _appService: AppService,
  ) { }

  ngOnInit(): void {
    console.log(this._appService.testService())
  }

  onSubmit(form: any) {
    console.log(form.value)

    this._appService.postProject(this.project).subscribe(response =>{
      if(response.valid){
        this.project = {
          _id: "",
          name: "",
          description: "",
          category: "",
          year: 0,
          langs: "",
          image: "",
        };
      }
    });
  }

}
