import React from 'react';
import './RamadanCalendar.css';

const RamadanCalendar: React.FC = () => {
  const calendarData = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    sehri: `05:${String(i + 3).padStart(2, '0')} AM`,
    iftar: `6:${String(i + 3).padStart(2, '0')} PM`,
    date: new Date(2025, 2, i + 2).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }));

  return (
    <div className="ramadan-calendar">
      <div className="background-image"></div>

      <h1 className="title">Ramadan Kareem!</h1>
      <h2 className="subtitle">Timings in Dhaka:</h2>

      <div className="table">
        <div className="column day-column">
          <div className="header-cell">
            <span className="cell-text">Day</span>
          </div>
          {calendarData.map((item) => (
            <div key={`day-${item.day}`} className="data-cell">
              <span className="cell-text">{item.day}</span>
            </div>
          ))}
        </div>

        <div className="column sehri-column">
          <div className="header-cell">
            <span className="cell-text">SEHRI</span>
          </div>
          {calendarData.map((item) => (
            <div key={`sehri-${item.day}`} className="data-cell">
              <span className="cell-text">{item.sehri}</span>
            </div>
          ))}
        </div>

        <div className="column iftar-column">
          <div className="header-cell">
            <span className="cell-text">IFTAR</span>
          </div>
          {calendarData.map((item) => (
            <div key={`iftar-${item.day}`} className="data-cell">
              <span className="cell-text">{item.iftar}</span>
            </div>
          ))}
        </div>

        <div className="column date-column">
          <div className="header-cell">
            <span className="cell-text">DATE</span>
          </div>
          {calendarData.map((item) => (
            <div key={`date-${item.day}`} className="data-cell">
              <span className="cell-text">{item.date}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="footer">
        <p className="footer-text">Data sourced from Hamariweb. Made with Superflex.</p>
      </div>
    </div>
  );
};

export default RamadanCalendar;
