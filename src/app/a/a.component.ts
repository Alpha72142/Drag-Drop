import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-a',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './a.component.html',
  styleUrls: ['./a.component.scss']
})
export class AComponent implements AfterViewInit {
  @ViewChild('iframeRef', { static: false }) iframeRef!: ElementRef<HTMLIFrameElement>;

  draggedElementData: string = "This is a draggable element";
  gridRows: number = 12;  // Initial grid size
  gridColumns: number =12;
  occupiedCells: Set<string> = new Set(); // Track occupied cells

  ngOnInit(): void {}

  onDragStart(event: DragEvent) {
    event.dataTransfer?.setData('text/plain', this.draggedElementData);
  }

  ngAfterViewInit() {
    const iframeDocument = this.iframeRef.nativeElement.contentDocument || this.iframeRef.nativeElement.contentWindow?.document;
    if (iframeDocument) {
        iframeDocument.open();
        iframeDocument.write(`
            <html>
            <head>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  margin: 0;
                  padding: 0;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 100vh;
                  background-color: #f0f0f0;
                  overflow: hidden;
                }
                .grid {
                  display: grid;
                  grid-template-columns: repeat(4, 1fr); /* Start with 4x4 grid */
                  grid-template-rows: repeat(4, 100px);
                  gap: 10px;
                  width: 100%;
                  height: 100%;
                  overflow: auto;
                  position: relative;
                }
                .dropped-element {
                  background-color: #28a745;
                  color: white;
                  padding: 10px;
                  border-radius: 5px;
                  text-align: center;
                  cursor: move;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  position: relative;
                  box-sizing: border-box;
                }
                .resize-handle {
                  position: absolute;
                  bottom: 5px;
                  right: 5px;
                  width: 15px;
                  height: 15px;
                  background-color: #fff;
                  border: 2px solid #28a745;
                  cursor: nwse-resize;
                  z-index: 10;
                }
                .grid-placeholder {
                  border: 2px dashed #999;
                  position: absolute;
                  pointer-events: none;
                  width: 100%;
                  height: 100%;
                }
              </style>
            </head>
            <body>
              <div class="grid"></div>
              <script>
                let gridRows = 4;
                let gridColumns = 4;
                const grid = document.querySelector('.grid');
                const occupiedCells = new Map(); // Track occupied cells with elements
                let draggedElement = null;
                let gridPlaceholder = document.createElement('div');
                gridPlaceholder.classList.add('grid-placeholder');

                function updateGridSize() {
                  grid.style.gridTemplateColumns = \`repeat(\${gridColumns}, 1fr)\`;
                  grid.style.gridTemplateRows = \`repeat(\${gridRows}, 100px)\`;
                }

                document.addEventListener('dragstart', (event) => {
                  draggedElement = event.target;
                  grid.appendChild(gridPlaceholder);
                });

                document.addEventListener('dragover', (event) => {
                  event.preventDefault();
                  const cellPosition = getCellPosition(event.clientX, event.clientY);
                  positionPlaceholder(cellPosition.col, cellPosition.row);
                });

                document.addEventListener('drop', (event) => {
                  event.preventDefault();
                  const data = event.dataTransfer.getData('text/plain');
                  const cellPosition = getCellPosition(event.clientX, event.clientY);

                  if (isCellOccupied(cellPosition.col, cellPosition.row)) {
                    moveOccupiedElement(cellPosition.col, cellPosition.row); // Move existing element
                  }
                  
                  // Handle new or dragged element drop
                  if (draggedElement) {
                    const span = draggedElement.dataset.span ? draggedElement.dataset.span.split(',') : [1, 1];
                    positionElement(draggedElement, cellPosition.col, cellPosition.row, parseInt(span[0]), parseInt(span[1]));
                  } else if (data) {
                    const newElement = document.createElement('div');
                    newElement.innerText = data;
                    newElement.classList.add('dropped-element');
                    newElement.setAttribute('draggable', 'true');
                    newElement.dataset.span = '1,1'; // Default span of 1x1
                    addResizeHandle(newElement); // Add resize handle
                    addDragListeners(newElement);
                    grid.appendChild(newElement);
                    positionElement(newElement, cellPosition.col, cellPosition.row);
                  }

                  gridPlaceholder.remove(); // Remove the placeholder after dropping
                  adjustGridSize(cellPosition.col, cellPosition.row); // Check if grid needs resizing
                });

                document.addEventListener('dragend', () => {
                  gridPlaceholder.remove(); // Remove the placeholder when dragging ends
                });

                function getCellPosition(x, y) {
                  const gridRect = grid.getBoundingClientRect();
                  const colWidth = gridRect.width / gridColumns;
                  const rowHeight = gridRect.height / gridRows;

                  const col = Math.floor((x - gridRect.left) / colWidth) + 1;
                  const row = Math.floor((y - gridRect.top) / rowHeight) + 1;
                  return { col, row };
                }

                function positionPlaceholder(col, row) {
                  gridPlaceholder.style.gridColumnStart = col;
                  gridPlaceholder.style.gridRowStart = row;
                  gridPlaceholder.style.gridColumnEnd = col + 1;
                  gridPlaceholder.style.gridRowEnd = row + 1;
                  grid.appendChild(gridPlaceholder);
                }

                function isCellOccupied(col, row) {
                  return occupiedCells.has(\`\${col},\${row}\`);
                }

                function positionElement(element, col, row, colSpan = 1, rowSpan = 1) {
                  const key = \`\${col},\${row}\`;
                  if (!isCellOccupied(col, row)) {
                    element.style.gridColumnStart = col;
                    element.style.gridRowStart = row;
                    element.style.gridColumnEnd = col + colSpan;
                    element.style.gridRowEnd = row + rowSpan;
                    occupiedCells.set(key, element); // Mark the cell as occupied
                  }
                }

                function moveOccupiedElement(col, row) {
                  const key = \`\${col},\${row}\`;
                  const existingElement = occupiedCells.get(key);
                  if (existingElement) {
                    const nextFreePosition = findNextFreeCell(col, row, existingElement.dataset.span ? existingElement.dataset.span.split(',').map(Number) : [1, 1]);
                    if (nextFreePosition) {
                      positionElement(existingElement, nextFreePosition.col, nextFreePosition.row, 
                          existingElement.dataset.span ? existingElement.dataset.span.split(',').map(Number)[0] : 1,
                          existingElement.dataset.span ? existingElement.dataset.span.split(',').map(Number)[1] : 1);
                      occupiedCells.delete(key); // Free the old cell
                    }
                  }
                }

                function adjustGridSize(col, row) {
                  if (col > gridColumns || row > gridRows) {
                    if (col > gridColumns) {
                      gridColumns++;
                    }
                    if (row > gridRows) {
                      gridRows++;
                    }
                    updateGridSize();
                  }
                }

                function findNextFreeCell(startCol, startRow, [colSpan, rowSpan]) {
                  const totalCols = gridColumns;
                  const totalRows = gridRows;
                  for (let row = startRow; row <= totalRows; row++) {
                    for (let col = startCol; col <= totalCols; col++) {
                      if (!isCellOccupied(col, row) && isCellSpanFree(col, row, colSpan, rowSpan)) {
                        return { col, row };
                      }
                    }
                    startCol = 1; // Reset column to start from the first column in the next row
                  }
                  return null; // No free cell found
                }

                function isCellSpanFree(col, row, colSpan, rowSpan) {
                  for (let r = 0; r < rowSpan; r++) {
                    for (let c = 0; c < colSpan; c++) {
                      if (isCellOccupied(col + c, row + r)) {
                        return false;
                      }
                    }
                  }
                  return true;
                }

                function addDragListeners(element) {
                  element.addEventListener('dragstart', (event) => {
                    event.dataTransfer.setData('text/plain', element.innerText);
                    draggedElement = element;
                    const col = parseInt(element.style.gridColumnStart);
                    const row = parseInt(element.style.gridRowStart);
                    occupiedCells.delete(\`\${col},\${row}\`); // Free the cell on drag start
                  });

                  element.addEventListener('dragend', () => {
                    draggedElement = null;
                  });
                }

                // Function to add the resize handle
                function addResizeHandle(element) {
                  const resizeHandle = document.createElement('div');
                  resizeHandle.classList.add('resize-handle');
                  element.appendChild(resizeHandle);

                  let initialMouseX, initialMouseY, initialWidth, initialHeight;

                  resizeHandle.addEventListener('mousedown', (e) => {
                    e.preventDefault();
                    initialMouseX = e.clientX;
                    initialMouseY = e.clientY;
                    initialWidth = parseInt(window.getComputedStyle(element).gridColumnEnd) - parseInt(window.getComputedStyle(element).gridColumnStart);
                    initialHeight = parseInt(window.getComputedStyle(element).gridRowEnd) - parseInt(window.getComputedStyle(element).gridRowStart);

                    document.addEventListener('mousemove', resizeElement);
                    document.addEventListener('mouseup', stopResize);
                  });

                  function resizeElement(e) {
                    const dx = e.clientX - initialMouseX;
                    const dy = e.clientY - initialMouseY;

                    const newWidth = initialWidth + Math.round(dx / (grid.clientWidth / gridColumns));
                    const newHeight = initialHeight + Math.round(dy / (grid.clientHeight / gridRows));

                    if (newWidth > 0 && newHeight > 0) {
                      element.style.gridColumnEnd = parseInt(element.style.gridColumnStart) + newWidth;
                      element.style.gridRowEnd = parseInt(element.style.gridRowStart) + newHeight;
                    }
                  }

                  function stopResize() {
                    document.removeEventListener('mousemove', resizeElement);
                    document.removeEventListener('mouseup', stopResize);
                    checkForOverlaps(); // Check for overlaps after resizing
                  }
                }

                function checkForOverlaps() {
                  const elements = Array.from(grid.children).filter(child => child.classList.contains('dropped-element'));
                  const elementPositions = new Map();

                  elements.forEach((element) => {
                    const colStart = parseInt(element.style.gridColumnStart);
                    const rowStart = parseInt(element.style.gridRowStart);
                    const colEnd = parseInt(element.style.gridColumnEnd);
                    const rowEnd = parseInt(element.style.gridRowEnd);

                    // Check if any element is occupying the same grid cells
                    for (let row = rowStart; row < rowEnd; row++) {
                      for (let col = colStart; col < colEnd; col++) {
                        const key = \`\${col},\${row}\`;
                        if (elementPositions.has(key)) {
                          moveOccupiedElement(col, row);
                        } else {
                          elementPositions.set(key, element);
                        }
                      }
                    }
                  });
                }
              </script>
            </body>
            </html>
        `);
        iframeDocument.close();
    }
  }
}
