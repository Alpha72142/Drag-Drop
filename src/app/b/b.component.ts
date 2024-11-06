import { Component, OnInit, ViewChild } from '@angular/core';
import { GridStack } from 'gridstack';
import "gridstack/dist/gridstack.min.css";

@Component({
  selector: 'app-b',
  templateUrl: './b.component.html',
  styleUrls: ['./b.component.scss']
})
export class BComponent implements OnInit {

  ngOnInit(): void {
    let grid = GridStack.init({
      float: true,
      acceptWidgets: true
    });

    grid.on("change", function (event, items) {
      console.log(items);
    });
    // Any initialization logic
    GridStack.setupDragIn(".sidebar .grid-stack-item", { appendTo: "body" });
  }
}
