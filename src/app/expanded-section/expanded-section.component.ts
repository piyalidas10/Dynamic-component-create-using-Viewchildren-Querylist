import {Component, Input, OnInit } from '@angular/core';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'expanded-section',
  templateUrl: './expanded-section.component.html',
  styleUrls: ['./expanded-section.component.css']
})

export class ExpandedSectionComponent implements OnInit {
  @Input() data: any;

  constructor() {}

  ngOnInit() {

  }


}

