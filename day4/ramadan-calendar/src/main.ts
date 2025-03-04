import './style.css'
import './components/RamadanCalendar.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="ramadan-calendar">
    <div class="background-image"></div>
    
    <h1 class="title">Ramadan Kareem!</h1>
    <h2 class="subtitle">Timings in Dhaka:</h2>
    
    <div class="table" id="calendar-table"></div>
    
    <div class="footer">
      <p class="footer-text">Data sourced from Hamariweb. Made with Superflex.</p>
    </div>
  </div>
`

// Create the table columns
const tableElement = document.getElementById('calendar-table')!;

// Create day column
const dayColumn = document.createElement('div');
dayColumn.className = 'column day-column';
dayColumn.innerHTML = `
  <div class="header-cell">
    <span class="cell-text">Day</span>
  </div>
  ${Array.from({ length: 30 }, (_, index) => `
    <div class="data-cell">
      <span class="cell-text">${index + 1}</span>
    </div>
  `).join('')}
`;

// Create sehri column
const sehriColumn = document.createElement('div');
sehriColumn.className = 'column sehri-column';
sehriColumn.innerHTML = `
  <div class="header-cell">
    <span class="cell-text">SEHRI</span>
  </div>
  ${Array.from({ length: 30 }, (_, index) => `
    <div class="data-cell">
      <span class="cell-text">05:0${index + 3} AM</span>
    </div>
  `).join('')}
`;

// Create iftar column
const iftarColumn = document.createElement('div');
iftarColumn.className = 'column iftar-column';
iftarColumn.innerHTML = `
  <div class="header-cell">
    <span class="cell-text">IFTAR</span>
  </div>
  ${Array.from({ length: 30 }, (_, index) => `
    <div class="data-cell">
      <span class="cell-text">6:0${index + 3} PM</span>
    </div>
  `).join('')}
`;

// Create date column
const dateColumn = document.createElement('div');
dateColumn.className = 'column date-column';
dateColumn.innerHTML = `
  <div class="header-cell">
    <span class="cell-text">DATE</span>
  </div>
  ${Array.from({ length: 30 }, (_, index) => `
    <div class="data-cell">
      <span class="cell-text">${new Date(2025, 2, index + 1).toLocaleDateString()}</span>
    </div>
  `).join('')}
`;

// Append columns to table
tableElement.appendChild(dayColumn);
tableElement.appendChild(sehriColumn);
tableElement.appendChild(iftarColumn);
tableElement.appendChild(dateColumn);

document.addEventListener('DOMContentLoaded', () => {
  populateTable();
});

setTimeout(populateTable, 0);

function populateTable() {
  const tableElement = document.getElementById('calendar-table');
  if (!tableElement) {
    console.error('Table element not found!');
    return;
  }
  
  tableElement.innerHTML = '';
  
  const dayColumn = document.createElement('div');
  dayColumn.className = 'column day-column';
  
  const dayHeader = document.createElement('div');
  dayHeader.className = 'header-cell';
  const dayHeaderText = document.createElement('span');
  dayHeaderText.className = 'cell-text';
  dayHeaderText.textContent = 'Day';
  dayHeader.appendChild(dayHeaderText);
  dayColumn.appendChild(dayHeader);
  
  calendarData.forEach(item => {
    const dayCell = document.createElement('div');
    dayCell.className = 'data-cell';
    const dayCellText = document.createElement('span');
    dayCellText.className = 'cell-text';
    dayCellText.textContent = item.day.toString();
    dayCell.appendChild(dayCellText);
    dayColumn.appendChild(dayCell);
  });
  
  const sehriColumn = document.createElement('div');
  sehriColumn.className = 'column sehri-column';
  
  const sehriHeader = document.createElement('div');
  sehriHeader.className = 'header-cell';
  const sehriHeaderText = document.createElement('span');
  sehriHeaderText.className = 'cell-text';
  sehriHeaderText.textContent = 'SEHRI';
  sehriHeader.appendChild(sehriHeaderText);
  sehriColumn.appendChild(sehriHeader);
  
  calendarData.forEach(item => {
    const sehriCell = document.createElement('div');
    sehriCell.className = 'data-cell';
    const sehriCellText = document.createElement('span');
    sehriCellText.className = 'cell-text';
    sehriCellText.textContent = item.sehri;
    sehriCell.appendChild(sehriCellText);
    sehriColumn.appendChild(sehriCell);
  });
  
  const iftarColumn = document.createElement('div');
  iftarColumn.className = 'column iftar-column';
  
  const iftarHeader = document.createElement('div');
  iftarHeader.className = 'header-cell';
  const iftarHeaderText = document.createElement('span');
  iftarHeaderText.className = 'cell-text';
  iftarHeaderText.textContent = 'IFTAR';
  iftarHeader.appendChild(iftarHeaderText);
  iftarColumn.appendChild(iftarHeader);
  
  calendarData.forEach(item => {
    const iftarCell = document.createElement('div');
    iftarCell.className = 'data-cell';
    const iftarCellText = document.createElement('span');
    iftarCellText.className = 'cell-text';
    iftarCellText.textContent = item.iftar;
    iftarCell.appendChild(iftarCellText);
    iftarColumn.appendChild(iftarCell);
  });
  
  const dateColumn = document.createElement('div');
  dateColumn.className = 'column date-column';
  
  const dateHeader = document.createElement('div');
  dateHeader.className = 'header-cell';
  const dateHeaderText = document.createElement('span');
  dateHeaderText.className = 'cell-text';
  dateHeaderText.textContent = 'DATE';
  dateHeader.appendChild(dateHeaderText);
  dateColumn.appendChild(dateHeader);
  
  calendarData.forEach(item => {
    const dateCell = document.createElement('div');
    dateCell.className = 'data-cell';
    const dateCellText = document.createElement('span');
    dateCellText.className = 'cell-text';
    dateCellText.textContent = item.date;
    dateCell.appendChild(dateCellText);
    dateColumn.appendChild(dateCell);
  });
  
  tableElement.appendChild(dayColumn);
  tableElement.appendChild(sehriColumn);
  tableElement.appendChild(iftarColumn);
  tableElement.appendChild(dateColumn);
  
  console.log('Table populated successfully!');
}
