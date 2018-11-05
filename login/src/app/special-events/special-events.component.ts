import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrls: ['./special-events.component.css']
})
export class SpecialEventsComponent implements OnInit {

  specialEvents = [];

  constructor(private _specialEventSerivce: EventService) { }

  ngOnInit() {
    this._specialEventSerivce.getSpecialEvents().subscribe(
      res => {
        console.log(res);
        this.specialEvents = [
          'Special Event 1',
          'Special Event 2'
        ];
      },
      err => console.log(err)
    );
  }

}
