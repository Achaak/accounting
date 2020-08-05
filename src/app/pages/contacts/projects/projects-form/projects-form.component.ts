import { Component, OnInit } from '@angular/core';
import navLeftConfigs from 'src/app/configs/navLeft.configs';
import { ProjectsService } from 'src/app/services/projects/projects.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';

@Component({
  selector: 'app-projects-form',
  templateUrl: './projects-form.component.html',
  styleUrls: ['./projects-form.component.sass']
})
export class ProjectsFormComponent implements OnInit {
  
  navLeft = navLeftConfigs.contacts

  messageAlert: String

  idProject = null
  project = {
    label: undefined,
    start_date: undefined,
    end_date: undefined,
  }

  submitText: String

  constructor(
    private projectsService: ProjectsService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.idProject = this.route.snapshot.params['id'];

    if(this.idProject) this.initProject()

    this.initSubmitText()
  }

  onSubmit(form: NgForm) {
    const values = {
      label:      form.value['label']      || null,
      start_date: form.value['start_date'] || null,
      end_date:   form.value['end_date']   || null,
    }

    if(this.idProject) this.updateProject(values)
    else this.newProject(values)
  }

  async initProject() {
    await this.projectsService.init()

    this.project = await this.projectsService.getProjectById(this.idProject)
  }

  initSubmitText() {
    if(this.idProject) this.submitText = "Modifier"
    else this.submitText = "Ajouter"
  }
 
  newProject(values) {
    let dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: "Êtes-vous certain des données entrées ?",
        content: ""
      }
    })

    dialogRef.afterClosed().subscribe(async result => {
      if(!result) return false

      const response = await this.projectsService.addProject(values)

      if(response.status === 200) {
        this.router.navigate([`projects/info/${response.data.id}`])
      }
      
      this.messageAlert = response.message
    })
  }

  updateProject(values) {
    let dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: "Êtes-vous certain des données entrées ?",
        content: ""
      }
    })

    dialogRef.afterClosed().subscribe(async result => {
      if(!result) return false

      const response = await this.projectsService.updateProject(values, this.idProject)
  
      this.messageAlert = response.message
    })
  }
}