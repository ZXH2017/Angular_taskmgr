import { Inject, Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Project, TaskList } from '../domain';
import { concat } from 'rxjs/observable/concat';

@Injectable()
export class TaskListService {
    private readonly domain = 'taskLists';
    private headers = new Headers({
        'Content-Type': 'application/json'
    });

    constructor( @Inject('BASE_CONFIG') private config,
        private http: Http) {
    }

    add(taskList: TaskList): Observable<TaskList> {
        const uri = `${this.config.uri}/${this.domain}`;
        return this.http
            .post(uri, JSON.stringify(taskList), { headers: this.headers })
            .map(res => res.json());
    }

    update(taskList: TaskList): Observable<TaskList> {
        const uri = `${this.config.uri}/${this.domain}/${taskList.id}`;
        const toUpdate = {
            name: taskList.name
        };
        return this.http
            .patch(uri, JSON.stringify(toUpdate), { headers: this.headers })
            .map(res => res.json());
    }

    del(taskList: TaskList): Observable<TaskList> {
        const uri = `${this.config.uri}/${this.domain}/${taskList.id}`;
        return this.http
            .delete(uri)
            .mapTo(taskList);
    }

    // GET /tasklist
    get(projectId: string): Observable<TaskList[]> {
        const uri = `${this.config.uri}/${this.domain}`;
        return this.http
            .get(uri, { params: { 'projectId': projectId } })
            .map(res => res.json());
    }

    swapOrder(src: TaskList, target: TaskList): Observable<TaskList[]> {
        const dragUri = `${this.config.uri}/${this.domain}/${src.id}`;
        const dropUri = `${this.config.uri}/${this.domain}/${target.id}`;
        const drag$ = this.http
            .patch(dragUri, JSON.stringify({ order: target.order }), { headers: this.headers })
            .map(res => res.json());
        const drop$ = this.http
            .patch(dropUri, JSON.stringify({ order: src.order }), { headers: this.headers })
            .map(res => res.json());
        return Observable.concat(drag$, drop$).reduce((r, x) => {
            return [...r, x];
        }, []);
    }
}
