import React from 'react';
import { useParams } from 'react-router-dom';
import ResumeForm from '../components/ResumeForm';
import '../assets/css/ResumeBuilder.css';

const ResumeBuilder = () => {
  const { templateId } = useParams();

  return (
    <div className="resume-builder-page">
      <div className="page-header">
        <h1>Build Your Resume</h1>
        <p>Template: {templateId === '1' ? 'Professional' : templateId === '2' ? 'Creative' : 'Simple'}</p>
      </div>
      
      <ResumeForm templateId={templateId} />
    </div>
  );
};

export default ResumeBuilder;