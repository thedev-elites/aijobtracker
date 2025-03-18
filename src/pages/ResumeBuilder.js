import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ResumeForm from '../components/ResumeForm';
import '../assets/css/ResumeBuilder.css';

const TEMPLATE_NAMES = {
  '1': 'Professional',
  '2': 'Creative',
  '3': 'Modern'
};

const TEMPLATE_DESCRIPTIONS = {
  '1': 'A clean and professional layout perfect for traditional industries like finance, law, and business.',
  '2': 'A modern and creative design ideal for roles in design, marketing, and creative fields.',
  '3': 'A sleek, minimalist design that highlights your skills and accomplishments for any industry.'
};

const ResumeBuilder = () => {
  const { templateId } = useParams();
  const navigate = useNavigate();

  const handleFormSubmit = async (formData) => {
    try {
      // Here you would typically save the resume data to your backend
      // For now, we'll just navigate to the preview page
      navigate('/preview', {
        state: {
          templateId,
          formData
        }
      });
    } catch (error) {
      console.error('Error saving resume:', error);
      // Handle error (show notification, etc.)
    }
  };

  if (!TEMPLATE_NAMES[templateId]) {
    return (
      <div className="error-container">
        <h2>Invalid Template</h2>
        <p>Please select a valid resume template.</p>
        <button onClick={() => navigate('/resume-templates')} className="btn-primary">
          Choose Template
        </button>
      </div>
    );
  }

  return (
    <div className="resume-builder-page">
      <div className="page-header">
        <h1>Build Your {TEMPLATE_NAMES[templateId]} Resume</h1>
        <p>{TEMPLATE_DESCRIPTIONS[templateId]}</p>
        <div className="template-instructions">
          <p>Fill out each section of the form to create your resume. Click on a section name to navigate directly to it.</p>
          <p>All sections marked with * are required. When you're finished, you'll be able to preview and download your resume.</p>
        </div>
      </div>
      
      <ResumeForm 
        templateId={templateId} 
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default ResumeBuilder;