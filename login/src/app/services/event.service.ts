import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EventService {

  private _eventsUrl = 'backend-events';
  private _specialEventsUrl = 'backend-specialEvents';
  private _resourceUrl = 'http://localhost:8080/resource1/api/v2/resource';

  constructor(private http: HttpClient) { }

  getEvents() {
    return [
      'Event 1',
      'Event 2'
    ];
    //return this.http.get<any>(this._eventsUrl);
  }

  getSpecialEvents() {
      return this.http.get(this._resourceUrl);
    //return this.http.get<any>(this._specialEventsUrl);
  }

}
