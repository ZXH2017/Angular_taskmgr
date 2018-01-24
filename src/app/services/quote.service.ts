import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Quote } from '../domain/quote.model';
@Injectable()
export class QuoteService {
    constructor(private http: Http, @Inject('BASE_CONFIG') private config) { }

    getQuote(): Observable<Quote> {
        const uri = `${this.config.uri}/quotes/${Math.floor(Math.random() * 10)}`;
        return this.http.get(uri)
            .map(res => res.json() as Quote);
    }

}