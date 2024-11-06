import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { GridStack } from 'gridstack';
import 'gridstack/dist/gridstack.min.css';

@Component({
  selector: 'app-c',
  templateUrl: './c.component.html',
  styleUrls: ['./c.component.scss'],
})
export class CComponent implements OnInit, AfterViewInit {
  @ViewChild('iframeRef', { static: true }) iframe!: ElementRef;

  ngOnInit(): void {
    // Initialization will be handled in ngAfterViewInit
  }

  ngAfterViewInit() {
    this.initializeIframe();
  }

  // Initialize the iframe
  // initializeIframe() {
  //   const iframeDocument =
  //     this.iframe.nativeElement.contentDocument ||
  //     this.iframe.nativeElement.contentWindow.document;

  //   // Write HTML structure to the iframe
  //   iframeDocument.open();
  //   iframeDocument.write(`
  //     <html>
  //     <head>
  //       <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/gridstack@11.0.1/dist/gridstack.min.css" />
  //       <style>
  //         body {
  //           font-family: Arial, sans-serif;
  //           margin: 0;
  //           padding: 0;
  //           display: flex;
  //           justify-content: center;
  //           height: 100vh;
  //           background-color: #f0f0f0;
  //           overflow: hidden;
  //         }
  //         .grid-stack {
  //           width: 100%;
  //           height: 100% !important;
  //           position: relative;
  //         }
  //         .grid-stack-item {
  //           background-color: #28a745;
  //           color: white;
  //           padding: 10px;
  //           border-radius: 5px;
  //           text-align: center;
  //           cursor: move;
  //         }
  //       </style>
  //     </head>
  //     <body>
  //       <div class="grid-stack"></div>
  //       <script src="https://cdnjs.cloudflare.com/ajax/libs/gridstack.js/11.0.1/gridstack-all.min.js"></script>
  //     </body>
  //     </html>
  //   `);
  //   iframeDocument.close();

  //   // Setup GridStack once the iframe is fully loaded
  //   this.iframe.nativeElement.onload = () => {
  //     this.initGridStack();
  //     this.addHoverListenersToIframe();
  //   };
  // }
  initializeIframe() {
    const iframeDocument =
      this.iframe.nativeElement.contentDocument ||
      this.iframe.nativeElement.contentWindow.document;

    iframeDocument.open();
    iframeDocument.write(`
      <html>
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/gridstack@11.0.1/dist/gridstack.min.css" />
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            height: 100vh;
            background-color: #f0f0f0;
            overflow: hidden;
          }
          .grid-stack {
            width: 100%;
            height: 100%;
            position: relative;
          }
          .grid-stack-item {
            background-color: #28a745;
            color: white;
            padding: 10px;
            border-radius: 5px;
            text-align: center;
            cursor: move;
          }
        </style>
      </head>
      <body>
        <div class="grid-stack"></div>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gridstack.js/11.0.1/gridstack-all.min.js"></script>
        <script>
          window.onload = function() {
          var grid = GridStack.init({
            float: true,
            acceptWidgets: true,
            placeholderClass: 'grid-stack-placeholder'
          });

          grid.on('dragstart', function(event, ui) {
            console.log('Drag started', event, ui);
          });

          grid.on('dragstop', function(event, ui) {
            console.log('Drag stopped', event, ui);
          });

          grid.on('change', function(event, items) {
            console.log('Grid changed', items);
          });

          window.addEventListener('dragover', function(e) {
            e.preventDefault();
          });

          window.addEventListener('drop', function(e) {
            e.preventDefault();
            const itemData = e.dataTransfer.getData('text/plain');
              if (itemData) {
                var item = document.createElement('div');
                item.classList.add('grid-stack-item');
                item.innerHTML = '<div class="grid-stack-item-content">' + itemData + '</div>';
                grid.makeWidget(item, { w: 2, h: 2 });
              }
            });
          };
        </script>
      </body>
      </html>
    `);
    iframeDocument.close();
  }

  // For dragging items from outside
  onDragStart(event: DragEvent, item: string) {
    event.dataTransfer?.setData('text/plain', item);
    const message = { type: 'addItem', content: item };
    this.iframe.nativeElement.contentWindow.postMessage(message, '*');
  }

  // Initialize GridStack
  private grid: GridStack | null = null; // Track the grid instance

  initGridStack() {
    const iframeDocument = this.iframe.nativeElement.contentDocument;
    const gridElement = iframeDocument.querySelector('.grid-stack');

    if (gridElement && !this.grid) {
      this.grid = GridStack.init(
        {
          float: true,
          acceptWidgets: true,
        },
        gridElement
      );

      this.grid.on('change', (event, items) => {
        console.log('Grid changed', items);
      });
      console.log('Grid initialized');
    }
  }

  // Allow hover effects and drop handling in the iframe
  addHoverListenersToIframe() {
    const iframeDocument = this.iframe.nativeElement.contentDocument;
    const gridStackElement = iframeDocument.querySelector('.grid-stack');

    gridStackElement.addEventListener('dragover', (event: DragEvent) => {
      event.preventDefault();
    });

    gridStackElement.addEventListener('drop', (event: DragEvent) => {
      event.preventDefault();
      const item = event.dataTransfer?.getData('text/plain');
      if (item) {
        this.addDroppedItemToGrid(item);
      }
    });
  }

  // Add the dropped item to the GridStack
  addDroppedItemToGrid(item: string) {
    const iframeDocument = this.iframe.nativeElement.contentDocument;
    if (this.grid) {
      const newItem = iframeDocument.createElement('div');
      newItem.classList.add('grid-stack-item');
      newItem.innerHTML = `${item}`;

      newItem.addEventListener('dragstart', (e: DragEvent) => {
        if (e.dataTransfer) {
          e.dataTransfer.setData('text/plain', item);
          e.dataTransfer.effectAllowed = 'move';
        }
      });

      // Add the new item with a specific size and make it a widget
      const options = { w: 2, h: 2 }; // Specify width and height
      this.grid.makeWidget(newItem, options);
      console.log('Added test widget');
    } else {
      console.error('GridStack instance is not initialized');
    }
  }

  // Handle drag start event for sidebar items
  // onDragStart(event: DragEvent, item: string) {
  //   event.dataTransfer?.setData('text/plain', item);
  // }
}
