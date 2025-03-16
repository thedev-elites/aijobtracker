import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/ResumeTemplates.css';

// Import template images correctly
import template1 from '../assets/images/template1.jpeg';
import template2 from '../assets/images/template2.jpg';
import template3 from '../assets/images/template3.jpg';

// Alternative approach using require
// const template1 = require('../assets/images/template1.jpeg');
// const template2 = require('../assets/images/template2.jpg');
// const template3 = require('../assets/images/template3.jpg');

const templates = [
  {
    id: 1,
    name: 'Professional',
    image: template1,
    description: 'A clean and professional template suitable for corporate jobs.'
  },
  {
    id: 2,
    name: 'Creative',
    image: template2,
    description: 'A modern and creative template perfect for design and creative roles.'
  },
  {
    id: 3,
    name: 'Simple',
    image: template3,
    description: 'A minimalist template that focuses on your skills and experience.'
  }
];

const ResumeTemplates = () => {
  return (
    <div className="resume-templates-page">
      <div className="page-header">
        <h1>Choose a Resume Template</h1>
        <p>Select a template to start building your professional resume</p>
      </div>
      
      <div className="options-card">
        <div className="option-buttons">
          <Link to="/resume-templates" className="option-btn active">
            Create New Resume
          </Link>
          <Link to="/profile" className="option-btn">
            Upload Existing Resume
          </Link>
        </div>
      </div>
      
      <div className="templates-grid">
        {templates.map(template => (
          <div key={template.id} className="template-card">
            <div className="template-preview">
              <img src={template.image} alt={`${template.name} template`} />
            </div>
            <div className="template-info">
              <h3>{template.name}</h3>
              <p>{template.description}</p>
              <Link 
                to={`/resume-builder/${template.id}`} 
                className="btn-primary"
              >
                Use This Template
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumeTemplates; 