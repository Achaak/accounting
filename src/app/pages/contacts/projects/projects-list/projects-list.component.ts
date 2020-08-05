import { Component, OnInit, ViewChild } from '@angular/core';
import { faPen, faTrash, faInfo } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { RoutesConfig } from 'src/app/configs/routes.configs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import navLeftConfigs from 'src/app/configs/navLeft.configs';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { ProjectsService } from 'src/app/services/projects/projects.service';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.sass']
})
export class ProjectsListComponent implements OnInit {
  // Font awesome
  faPen = faPen
  faTrash = faTrash
  faInfo = faInfo

  // Data projects
  projects: any[]
  projectsSubscription: Subscription

  updateProjectRoute = RoutesConfig.routes.projectsUpdate
  infoProjectRoute = RoutesConfig.routes.projectsInfo

  // Table
  displayedColumns: string[] = ['label', 'start_date', 'start_end', 'actions'];
  dataSource = new MatTableDataSource<PeriodicElement>([]);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  // Nav left
  navLeft = navLeftConfigs.contacts

  constructor(private projectsService: ProjectsService, public dialog: MatDialog) { }

  ngOnInit(): void {

    // Initialize the projects
    this.initProjects()
  }

  async initProjects() {
    await this.projectsService.init()

    this.projectsSubscription = this.projectsService.projectsSubject.subscribe(
      (projects: any) => {
        // Add projects
        this.dataSource = new MatTableDataSource<PeriodicElement>(projects);
        this.dataSource.paginator = this.paginator;
      }
    )
    this.projectsService.emitProjectsSubject()
  }

  onDelete(idProject) {
    let dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: "Êtes-vous certain de supprimer ce projet ?",
        content: ""
      }
    })

    dialogRef.afterClosed().subscribe(async result => {
      if(!result) return false

      const response = await this.projectsService.deleteProject(idProject)
    })
  }
}

export interface PeriodicElement {
  name: string;
  phone_number: string;
  mail: string;
  city: string;
  website_link: string;
}