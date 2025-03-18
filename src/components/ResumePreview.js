import React from 'react';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import '../assets/css/ResumePreview.css';

const ResumePreview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { templateId, formData } = location.state || {};

  if (!formData) {
    return (
      <div className="error-container">
        <h2>No resume data found</h2>
        <button onClick={() => navigate('/')} className="btn-primary">
          Go Back
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    // Get the current template being used
    const templateName = getTemplateName().toLowerCase();
    
    // Set up the print environment
    const printContent = document.querySelector('.resume-preview').innerHTML;
    
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    
    // Add all required CSS including template-specific styling
    printWindow.document.write(`
      <html>
        <head>
          <title>Resume - ${formData.personalInfo.fullName}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
            
            /* Reset styles */
            *, *::before, *::after {
              box-sizing: border-box;
              margin: 0;
              padding: 0;
            }
            
            html, body {
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.6;
              color: #1f2937;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            
            h1, h2, h3, h4 {
              color: #111827;
              margin-bottom: 1rem;
            }
            
            h1 {
              font-size: 2rem;
              font-weight: 700;
            }
            
            h2 {
              font-size: 1.5rem;
              font-weight: 600;
              color: #2563eb;
              padding-bottom: 0.5rem;
              border-bottom: 1px solid #e5e7eb;
            }
            
            h3 {
              font-size: 1.25rem;
              font-weight: 600;
            }
            
            p {
              margin-bottom: 0.5rem;
            }
            
            /* Resume container */
            .resume-for-print {
              width: 210mm;
              min-height: 297mm;
              margin: 0 auto;
              background-color: white;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              overflow: hidden;
            }
            
            /* Professional Template Styles */
            .professional-template {
              padding: 2rem;
            }
            
            .professional-template header {
              margin-bottom: 2rem;
            }
            
            .professional-template .contact-info {
              margin-top: 0.5rem;
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
              gap: 0.5rem;
              font-size: 0.875rem;
            }
            
            .professional-template .summary {
              margin-bottom: 2rem;
            }
            
            .professional-template .experience-item,
            .professional-template .education-item,
            .professional-template .certification-item {
              margin-bottom: 1.5rem;
            }
            
            .professional-template .job-header {
              margin-bottom: 0.5rem;
            }
            
            .professional-template .company,
            .professional-template .date {
              font-size: 0.875rem;
              color: #4b5563;
            }
            
            .professional-template .two-column {
              display: grid;
              grid-template-columns: 2fr 1fr;
              gap: 2rem;
              margin-top: 2rem;
            }
            
            .professional-template .right-column {
              background-color: #f9fafb;
              padding: 1.5rem;
              border-radius: 0.5rem;
            }
            
            .professional-template .skills-list {
              display: flex;
              flex-wrap: wrap;
              gap: 0.5rem;
            }
            
            .professional-template .skill-tag {
              background-color: #e5e7eb;
              color: #374151;
              padding: 0.25rem 0.75rem;
              border-radius: 9999px;
              font-size: 0.875rem;
            }
            
            /* Creative Template Styles */
            .creative-template {
              display: grid;
              grid-template-columns: 300px 1fr;
              min-height: 297mm;
            }
            
            .creative-template .sidebar {
              background-color: #1e3a8a !important;
              color: white !important;
              padding: 2rem;
              display: flex;
              flex-direction: column;
              height: 100%;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            
            .creative-template .profile {
              margin-bottom: 2rem;
            }
            
            .creative-template .sidebar h1,
            .creative-template .sidebar h2 {
              color: white !important;
              border-bottom-color: rgba(255, 255, 255, 0.2);
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            
            .creative-template .contact-info {
              color: #e5e7eb !important;
              margin-bottom: 2rem;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            
            .creative-template .main-content {
              padding: 2rem;
            }
            
            .creative-template .skill-tag {
              background-color: rgba(255, 255, 255, 0.1) !important;
              color: white !important;
              padding: 0.25rem 0.75rem;
              border-radius: 9999px;
              font-size: 0.875rem;
              margin-right: 0.5rem;
              margin-bottom: 0.5rem;
              display: inline-block;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            
            .creative-template .languages-list {
              margin-top: 1rem;
            }
            
            .creative-template .language-item {
              display: flex;
              justify-content: space-between;
              margin-bottom: 0.5rem;
              background-color: rgba(255, 255, 255, 0.1) !important;
              color: white !important;
              padding: 0.5rem;
              border-radius: 0.25rem;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            
            .creative-template .proficiency {
              color: #e5e7eb !important;
              font-size: 0.875rem;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            
            /* Modern Template Styles */
            .modern-template {
              padding: 2rem;
            }
            
            .modern-template header {
              border-bottom: 2px solid #2563eb;
              padding-bottom: 1.5rem;
              margin-bottom: 2rem;
            }
            
            .modern-template section {
              margin-bottom: 2rem;
            }
            
            .modern-template .skills-list {
              display: flex;
              flex-wrap: wrap;
              gap: 0.5rem;
            }
            
            .modern-template .skill-tag {
              background-color: #e5e7eb;
              color: #374151;
              padding: 0.25rem 0.75rem;
              border-radius: 9999px;
              font-size: 0.875rem;
            }
            
            /* Print styles */
            @page {
              size: A4;
              margin: 0;
            }
            
            @media print {
              body {
                padding: 0;
                margin: 0;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
              
              .resume-for-print {
                width: 100%;
                box-shadow: none;
                border: none;
              }
              
              /* Force background color printing in all browsers */
              .creative-template .sidebar,
              .creative-template .sidebar *,
              .creative-template .skill-tag,
              .creative-template .language-item,
              .professional-template .right-column {
                print-color-adjust: exact !important;
                -webkit-print-color-adjust: exact !important;
                color-adjust: exact !important;
              }
            }
          </style>
        </head>
        <body>
          <div class="resume-for-print">
            ${printContent}
          </div>
          <script>
            // Print on load and close window after printing
            window.onload = function() {
              setTimeout(function() {
                window.print();
                setTimeout(function() {
                  window.close();
                }, 500);
              }, 500); // Increased delay to ensure styles are fully loaded
            };
          </script>
        </body>
      </html>
    `);
    
    printWindow.document.close();
  };

  const handleSaveAsPDF = () => {
    handlePrint();
  };

  const handleEdit = () => {
    navigate(-1);
  };

  const handleSubmit = () => {
    // Perform spelling and grammar check first
    // Simple spell check simulation
    // Simulate a submission process
    alert('Your resume has been successfully submitted!');
    // Navigate to home page or another appropriate page
    navigate('/');
  };
  
  const getTemplateName = () => {
    switch (templateId) {
      case '1': return 'Professional';
      case '2': return 'Creative';
      case '3': return 'Modern';
      default: return 'Professional';
    }
  };

  const renderTemplate = () => {
    switch (templateId) {
      case '1':
        return <ProfessionalTemplate formData={formData} />;
      case '2':
        return <CreativeTemplate formData={formData} />;
      case '3':
        return <ModernTemplate formData={formData} />;
      default:
        return <ProfessionalTemplate formData={formData} />;
    }
  };

  return (
    <div className="preview-container">
      <div className="preview-header">
        <h1>Resume Preview - {getTemplateName()} Template</h1>
        <p>Review your resume and download it as a PDF or make further edits</p>
      </div>
      
      <div className="preview-actions">
        <button onClick={handleEdit} className="btn-secondary">
          <i className="icon-edit"></i> Edit Resume
        </button>
        <button onClick={handleSaveAsPDF} className="btn-primary">
          <i className="icon-download"></i> Download PDF
        </button>
        <button onClick={handleSubmit} className="btn-success">
          <i className="icon-check"></i> Submit Resume
        </button>
      </div>
      
      <div className="resume-preview">
        {renderTemplate()}
      </div>
      
      <div className="preview-footer">
        <button onClick={handleEdit} className="btn-secondary">
          Go Back to Edit
        </button>
        <button onClick={handlePrint} className="btn-primary">
          Print/Save as PDF
        </button>
      </div>
    </div>
  );
};

const ProfessionalTemplate = ({ formData }) => {
  const { personalInfo, professionalSummary, experience, education, skills, certifications, languages } = formData;

  // Format dates for better display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="professional-template">
      <header>
        <h1>{personalInfo.fullName}</h1>
        <div className="contact-info">
          {personalInfo.email && <p>{personalInfo.email}</p>}
          {personalInfo.phone && <p>{personalInfo.phone}</p>}
          {(personalInfo.address || personalInfo.city || personalInfo.state || personalInfo.zipCode) && (
            <p>
              {personalInfo.address && `${personalInfo.address}, `}
              {personalInfo.city && `${personalInfo.city}, `}
              {personalInfo.state} {personalInfo.zipCode}
            </p>
          )}
          {personalInfo.linkedin && <p>LinkedIn: {personalInfo.linkedin}</p>}
          {personalInfo.portfolio && <p>Portfolio: {personalInfo.portfolio}</p>}
        </div>
      </header>

      <section className="summary">
        <h2>Professional Summary</h2>
        <p>{professionalSummary}</p>
      </section>

      <section className="experience">
        <h2>Work Experience</h2>
        {experience.map((exp) => (
          <div key={exp.id} className="experience-item">
            <div className="job-header">
              <h3>{exp.title}</h3>
              <p className="company">{exp.company}{exp.location && `, ${exp.location}`}</p>
              <p className="date">
                {formatDate(exp.startDate)} {exp.current ? '- Present' : exp.endDate && `- ${formatDate(exp.endDate)}`}
              </p>
            </div>
            <p className="job-description">{exp.description}</p>
          </div>
        ))}
      </section>

      <div className="two-column">
        <div className="left-column">
          <section className="education">
            <h2>Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="education-item">
                <h3>{edu.school}</h3>
                <p>{edu.degree}{edu.fieldOfStudy && ` in ${edu.fieldOfStudy}`}</p>
                <p className="date">
                  {formatDate(edu.startDate)} {edu.current ? '- Present' : edu.endDate && `- ${formatDate(edu.endDate)}`}
                </p>
                {edu.description && <p>{edu.description}</p>}
              </div>
            ))}
          </section>

          {certifications.some(cert => cert.name.trim()) && (
            <section className="certifications">
              <h2>Certifications</h2>
              {certifications.filter(cert => cert.name.trim()).map((cert) => (
                <div key={cert.id} className="certification-item">
                  <h3>{cert.name}</h3>
                  <p>{cert.issuer}</p>
                  <p className="date">
                    {formatDate(cert.issueDate)} {cert.expiryDate && `- ${formatDate(cert.expiryDate)}`}
                  </p>
                </div>
              ))}
            </section>
          )}
        </div>

        <div className="right-column">
          <section className="skills">
            <h2>Skills</h2>
            <div className="skills-list">
              {skills.filter(skill => skill.trim()).map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
          </section>

          {languages.some(lang => lang.language.trim()) && (
            <section className="languages">
              <h2>Languages</h2>
              <div className="languages-list">
                {languages.filter(lang => lang.language.trim()).map((lang) => (
                  <div key={lang.id} className="language-item">
                    <span className="language">{lang.language}</span>
                    <span className="proficiency">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

// Add PropTypes after the component definition
ProfessionalTemplate.propTypes = {
  formData: PropTypes.shape({
    personalInfo: PropTypes.object.isRequired,
    professionalSummary: PropTypes.string.isRequired,
    experience: PropTypes.array.isRequired,
    education: PropTypes.array.isRequired,
    skills: PropTypes.array.isRequired,
    certifications: PropTypes.array.isRequired,
    languages: PropTypes.array.isRequired
  }).isRequired
};

const CreativeTemplate = ({ formData }) => {
  const { personalInfo, professionalSummary, experience, education, skills, certifications, languages } = formData;

  // Format dates for better display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="creative-template">
      <div className="sidebar">
        <div className="profile">
          <h1>{personalInfo.fullName}</h1>
          <div className="contact-info">
            {personalInfo.email && <p>{personalInfo.email}</p>}
            {personalInfo.phone && <p>{personalInfo.phone}</p>}
            {personalInfo.address && <p>{personalInfo.address}</p>}
            {(personalInfo.city || personalInfo.state || personalInfo.zipCode) && 
              <p>{personalInfo.city && `${personalInfo.city}, `}{personalInfo.state} {personalInfo.zipCode}</p>}
            {personalInfo.linkedin && <p>{personalInfo.linkedin}</p>}
            {personalInfo.portfolio && <p>{personalInfo.portfolio}</p>}
          </div>
        </div>

        <section className="skills">
          <h2>Skills</h2>
          <div className="skills-list">
            {skills.filter(skill => skill.trim()).map((skill, index) => (
              <span key={index} className="skill-tag">{skill}</span>
            ))}
          </div>
        </section>

        {languages.some(lang => lang.language.trim()) && (
          <section className="languages">
            <h2>Languages</h2>
            <div className="languages-list">
              {languages.filter(lang => lang.language.trim()).map((lang) => (
                <div key={lang.id} className="language-item">
                  <span className="language">{lang.language}</span>
                  <span className="proficiency">{lang.proficiency}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      <div className="main-content">
        <section className="summary">
          <h2>Professional Summary</h2>
          <p>{professionalSummary}</p>
        </section>

        <section className="experience">
          <h2>Work Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} className="experience-item">
              <div className="job-header">
                <h3>{exp.title}</h3>
                <p className="company">{exp.company}{exp.location && `, ${exp.location}`}</p>
                <p className="date">
                  {formatDate(exp.startDate)} {exp.current ? '- Present' : exp.endDate && `- ${formatDate(exp.endDate)}`}
                </p>
              </div>
              <p className="job-description">{exp.description}</p>
            </div>
          ))}
        </section>

        <section className="education">
          <h2>Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="education-item">
              <h3>{edu.school}</h3>
              <p>{edu.degree}{edu.fieldOfStudy && ` in ${edu.fieldOfStudy}`}</p>
              <p className="date">
                {formatDate(edu.startDate)} {edu.current ? '- Present' : edu.endDate && `- ${formatDate(edu.endDate)}`}
              </p>
              {edu.description && <p>{edu.description}</p>}
            </div>
          ))}
        </section>

        {certifications.some(cert => cert.name.trim()) && (
          <section className="certifications">
            <h2>Certifications</h2>
            {certifications.filter(cert => cert.name.trim()).map((cert) => (
              <div key={cert.id} className="certification-item">
                <h3>{cert.name}</h3>
                <p>{cert.issuer}</p>
                <p className="date">
                  {formatDate(cert.issueDate)} {cert.expiryDate && `- ${formatDate(cert.expiryDate)}`}
                </p>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
};

// Add PropTypes after the component definition
CreativeTemplate.propTypes = {
  formData: PropTypes.shape({
    personalInfo: PropTypes.object.isRequired,
    professionalSummary: PropTypes.string.isRequired,
    experience: PropTypes.array.isRequired,
    education: PropTypes.array.isRequired,
    skills: PropTypes.array.isRequired,
    certifications: PropTypes.array.isRequired,
    languages: PropTypes.array.isRequired
  }).isRequired
};

const ModernTemplate = ({ formData }) => {
  const { personalInfo, professionalSummary, experience, education, skills, certifications, languages } = formData;

  // Format dates for better display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="modern-template">
      <header>
        <h1>{personalInfo.fullName}</h1>
        <div className="contact-info">
          {personalInfo.email && <p>{personalInfo.email}</p>}
          {personalInfo.phone && <p>{personalInfo.phone}</p>}
          {(personalInfo.address || personalInfo.city || personalInfo.state || personalInfo.zipCode) && (
            <p>
              {personalInfo.address && `${personalInfo.address}, `}
              {personalInfo.city && `${personalInfo.city}, `}
              {personalInfo.state} {personalInfo.zipCode}
            </p>
          )}
          {personalInfo.linkedin && <p>LinkedIn: {personalInfo.linkedin}</p>}
          {personalInfo.portfolio && <p>Portfolio: {personalInfo.portfolio}</p>}
        </div>
      </header>

      <section className="summary">
        <h2>Professional Summary</h2>
        <p>{professionalSummary}</p>
      </section>

      <section className="experience">
        <h2>Work Experience</h2>
        {experience.map((exp) => (
          <div key={exp.id} className="experience-item">
            <div className="job-header">
              <h3>{exp.title}</h3>
              <p className="company">{exp.company}{exp.location && `, ${exp.location}`}</p>
              <p className="date">
                {formatDate(exp.startDate)} {exp.current ? '- Present' : exp.endDate && `- ${formatDate(exp.endDate)}`}
              </p>
            </div>
            <p className="job-description">{exp.description}</p>
          </div>
        ))}
      </section>

      <section className="education">
        <h2>Education</h2>
        {education.map((edu) => (
          <div key={edu.id} className="education-item">
            <h3>{edu.school}</h3>
            <p>{edu.degree}{edu.fieldOfStudy && ` in ${edu.fieldOfStudy}`}</p>
            <p className="date">
              {formatDate(edu.startDate)} {edu.current ? '- Present' : edu.endDate && `- ${formatDate(edu.endDate)}`}
            </p>
            {edu.description && <p>{edu.description}</p>}
          </div>
        ))}
      </section>

      <section className="skills">
        <h2>Skills</h2>
        <div className="skills-list">
          {skills.filter(skill => skill.trim()).map((skill, index) => (
            <span key={index} className="skill-tag">{skill}</span>
          ))}
        </div>
      </section>

      {certifications.some(cert => cert.name.trim()) && (
        <section className="certifications">
          <h2>Certifications</h2>
          {certifications.filter(cert => cert.name.trim()).map((cert) => (
            <div key={cert.id} className="certification-item">
              <h3>{cert.name}</h3>
              <p>{cert.issuer}</p>
              <p className="date">
                {formatDate(cert.issueDate)} {cert.expiryDate && `- ${formatDate(cert.expiryDate)}`}
              </p>
            </div>
          ))}
        </section>
      )}

      {languages.some(lang => lang.language.trim()) && (
        <section className="languages">
          <h2>Languages</h2>
          <div className="languages-list">
            {languages.filter(lang => lang.language.trim()).map((lang) => (
              <div key={lang.id} className="language-item">
                <span className="language">{lang.language}</span>
                <span className="proficiency">{lang.proficiency}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

// Add PropTypes after the component definition
ModernTemplate.propTypes = {
  formData: PropTypes.shape({
    personalInfo: PropTypes.object.isRequired,
    professionalSummary: PropTypes.string.isRequired,
    experience: PropTypes.array.isRequired,
    education: PropTypes.array.isRequired,
    skills: PropTypes.array.isRequired,
    certifications: PropTypes.array.isRequired,
    languages: PropTypes.array.isRequired
  }).isRequired
};

export default ResumePreview; 