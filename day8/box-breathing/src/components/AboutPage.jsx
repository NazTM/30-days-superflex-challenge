import React from 'react';
import Button from './Button';
import './AboutPage.css';

const AboutPage = ({ onBackClick }) => {
  return (
    <div className="about-page">
      <div className="about-content">
        <p>
          Box breathing is a simple yet effective relaxation technique that helps reduce stress and
          improve focus. It's also known as square breathing. The technique involves breathing in a
          pattern of four equal parts, like the sides of a box. Here's how you can practice box
          breathing:
        </p>
        <ol>
          <li>Inhale for 4 seconds through your nose.</li>
          <li>Hold the breath for 4 seconds.</li>
          <li>Exhale for 4 seconds through your mouth.</li>
          <li>Hold the breath again for 4 seconds.</li>
        </ol>
        <p>
          A study published in Frontiers in Psychology compared various breathing techniques,
          including box breathing, and found that breathwork led to significant improvements in
          mood and reductions in negative emotions like anxiety.{' '}
          <a href="#" className="study-link">Link to the study here.</a>
        </p>
      </div>
      <div className="button-container">
        <Button text="BACK" onClick={onBackClick} />
      </div>
    </div>
  );
};

export default AboutPage;
