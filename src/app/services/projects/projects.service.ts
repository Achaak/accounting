import { Projects } from './../API'
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from '../user/auth.service';
import _ from 'lodash'

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  projectsSubject = new Subject<any[]>();

  private projects = []

  constructor(private authService: AuthService) {}

  async init() {
    if (!this.projects.length)
      await this.loadProjects()
  }

  emitProjectsSubject() {
    this.projectsSubject.next(this.projects.slice())
  }

  async loadProjects() {
    let status

    const func = await Projects.getProjects(await this.authService.getJwtToken())

    // Get status
    status = func.status

    // If error
    if(func.status === 200) {
      this.projects = func.data
      this.emitProjectsSubject();
    }
  }

  async getProjectById(id) {
    return _.find(this.projects, { id: parseInt(id) })
  }

  getProjects() {
    return this.projects
  }

  async addProject(values) {
    let message
    let status
    let data

    const func = await Projects.setProject(this.authService.jwtToken, values)

    // Get status
    status = func.status

    // If error
    if(func.status === 200) {
      data = func.data
      this.projects.push(func.data)
      this.emitProjectsSubject()
    }
    else {
      message = "Les champs comportants * doivent être remplis"
    }

    return {
      message: message,
      status: status,
      data: data
    }
  }

  async updateProject(values, idProject) {
    let message
    let status

    const func = await Projects.updateProject(this.authService.jwtToken, idProject, values)

    // Get status
    status = func.status

    // If error
    if(func.status === 200) {
      this.loadProjects()
    }
    else {
      message = "Les champs comportants * doivent être remplis"
    }

    return {
      message: message,
      status: status
    }
  }

  async deleteProject(idProject) {
    let status

    const func = await Projects.deleteProject(this.authService.jwtToken, idProject)

    // Get status
    status = func.status

    // If error
    if(func.status === 200) {
      this.loadProjects()
    }

    return {
      status: status
    }
  }
}