import {
  Component,
  OnInit,
  OnDestroy,
  HostBinding,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { MdDialog } from '@angular/material';
import { NewProjectComponent } from '../new-project/new-project.component';
import { InviteComponent } from '../invite/invite.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { slideToRight } from '../../anims/router.anim';
import { listAnimation } from '../../anims/list.anim';
import { ProjectService } from '../../services/project.service';
import * as _ from 'lodash';
import { Project } from '../../domain/project.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [slideToRight, listAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class ProjectListComponent implements OnInit, OnDestroy {

  @HostBinding('@routeAnim') state;

  projects;
  sub: Subscription;
  constructor(
    private dialog: MdDialog,
    private cd: ChangeDetectorRef,
    private service$: ProjectService) { }

  ngOnInit() {
    this.sub = this.service$.get("1").subscribe(projects => {
      this.projects = projects;
      this.cd.markForCheck();
    });
  }
  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  openNewProjectDialog() {
    const selectedImg = `/assets/img/covers/${Math.floor(Math.random() * 40)}_tn.jpg`;
    const dialogRef = this.dialog.open(
      NewProjectComponent,
      { data: { thumbnails: this.getThumbnails(), img: selectedImg } });
    dialogRef.afterClosed()
      .take(1)//只取一个值就行了
      .filter(n => n)
      .map(val => ({ ...val, coverImg: this.buildImgSrc(val.coverImg) }))
      .switchMap(v => this.service$.add(v))
      .subscribe(project => {
        this.projects = [...this.projects, project];
        this.cd.markForCheck();
      });

    // .filter(n => n).subscribe(project => {
    //   this.service$.add(project);
    //   this.cd.markForCheck();
    // });
  }

  launchInviteDialog() {
    const dialogRef = this.dialog.open(InviteComponent, { data: { members: [] } });
  }

  launchUpdateDialog(project: Project) {
    // const dialogRef = this.dialog.open(NewProjectComponent, { data: { title: "编辑项目:" } })
    const dialogRef = this.dialog.open(
      NewProjectComponent,
      { data: { thumbnails: this.getThumbnails(), project: project } });
    dialogRef.afterClosed()
      .take(1)//只取一个值就行了
      .filter(n => n)
      .map(val => ({ ...val, id: project.id, coverImg: this.buildImgSrc(val.coverImg) }))
      .switchMap(v => this.service$.update(v))
      .subscribe(project => {
        // this.projects = [...this.projects, project];
        const index = this.projects.map(p => p.id).indexOf(project.id);
        this.projects = [...this.projects.slice(0, index), project, ...this.projects.slice(index + 1)]
        this.cd.markForCheck();
      });
  }

  launchConfirmDialog(project) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { data: { title: "删除项目:", content: "您确认删除该项目吗？" } });
    dialogRef.afterClosed()
      .take(1)
      .filter(n => n)
      .switchMap(_ => this.service$.del(project))
      .subscribe(prj => {
        this.projects = this.projects.filter(p => p.id !== prj.id);
        this.cd.markForCheck();
      });
  }

  private getThumbnails() {
    return _.range(0, 40)
      .map(i => `/assets/img/covers/${i}_tn.jpg`);
  }

  private buildImgSrc(img: string): string {
    return img.indexOf('_') > -1 ? img.split('_')[0] + '.jpg' : img;
  }
}
