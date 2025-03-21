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
    // Navigate back to resume builder with the current form data preserved
    navigate(`/resume-builder/${templateId}`, { 
      state: { 
        formData,
        isEditing: true 
      } 
    });
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
      case '1':
        return 'Professional';
      case '2':
        return 'Creative';
      case '3':
        return 'Modern';
      default:
        return 'Professional';
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
        <h1>Resume Preview: {getTemplateName()} Template</h1>
        <div className="preview-actions">
          <button onClick={handleEdit} className="btn-secondary">
            Edit Resume
          </button>
          <button onClick={handlePrint} className="btn-primary">
            Print
          </button>
          <button onClick={handleSaveAsPDF} className="btn-primary">
            Download PDF
          </button>
        </div>
      </div>
      <div className="resume-preview">{renderTemplate()}</div>
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
        <h1>{personalInfo.fullName.text}</h1>
        <div className="contact-info">
          {personalInfo.email.text && <p>{personalInfo.email.text}</p>}
          {personalInfo.phone.text && <p>{personalInfo.phone.text}</p>}
          {(personalInfo.address.text || personalInfo.city.text || personalInfo.state.text || personalInfo.zipCode.text) && (
            <p>
              {personalInfo.address.text && `${personalInfo.address.text}, `}
              {personalInfo.city.text && `${personalInfo.city.text}, `}
              {personalInfo.state.text} {personalInfo.zipCode.text}
            </p>
          )}
          {personalInfo.linkedin.text && <p>LinkedIn: {personalInfo.linkedin.text}</p>}
          {personalInfo.portfolio.text && <p>Portfolio: {personalInfo.portfolio.text}</p>}
        </div>
      </header>

      <section className="summary">
        <h2>Professional Summary</h2>
        <p>{professionalSummary.text}</p>
      </section>

      <section className="experience">
        <h2>Work Experience</h2>
        {experience.map((exp) => (
          <div key={exp.id} className="experience-item">
            <div className="job-header">
              <h3>{exp.title.text}</h3>
              <p className="company">{exp.company.text}{exp.location.text && `, ${exp.location.text}`}</p>
              <p className="date">
                {formatDate(exp.startDate)} {exp.current ? '- Present' : exp.endDate && `- ${formatDate(exp.endDate)}`}
              </p>
            </div>
            <p className="job-description">{exp.description.text}</p>
          </div>
        ))}
      </section>

      <div className="two-column">
        <div className="left-column">
          <section className="education">
            <h2>Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="education-item">
                <h3>{edu.school.text}</h3>
                <p>{edu.degree.text}{edu.fieldOfStudy.text && ` in ${edu.fieldOfStudy.text}`}</p>
                <p className="date">
                  {formatDate(edu.startDate)} {edu.current ? '- Present' : edu.endDate && `- ${formatDate(edu.endDate)}`}
                </p>
                {edu.description.text && <p>{edu.description.text}</p>}
              </div>
            ))}
          </section>

          {certifications.some(cert => cert.name.text && cert.name.text.trim()) && (
            <section className="certifications">
              <h2>Certifications</h2>
              {certifications.filter(cert => cert.name.text && cert.name.text.trim()).map((cert) => (
                <div key={cert.id} className="certification-item">
                  <h3>{cert.name.text}</h3>
                  <p>{cert.issuer.text}</p>
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
              {skills.filter(skill => skill.text && skill.text.trim()).map((skill, index) => (
                <span key={index} className="skill-tag">{skill.text}</span>
              ))}
            </div>
          </section>

          {languages.some(lang => lang.language.text && lang.language.text.trim()) && (
            <section className="languages">
              <h2>Languages</h2>
              <div className="languages-list">
                {languages.filter(lang => lang.language.text && lang.language.text.trim()).map((lang) => (
                  <div key={lang.id} className="language-item">
                    <span className="language">{lang.language.text}</span>
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

// Update PropTypes
ProfessionalTemplate.propTypes = {
  formData: PropTypes.shape({
    personalInfo: PropTypes.object.isRequired,
    professionalSummary: PropTypes.object.isRequired,
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
          <h1>{personalInfo.fullName.text}</h1>
          <div className="contact-info">
            {personalInfo.email.text && <p>{personalInfo.email.text}</p>}
            {personalInfo.phone.text && <p>{personalInfo.phone.text}</p>}
            {personalInfo.address.text && <p>{personalInfo.address.text}</p>}
            {(personalInfo.city.text || personalInfo.state.text || personalInfo.zipCode.text) && 
              <p>{personalInfo.city.text && `${personalInfo.city.text}, `}{personalInfo.state.text} {personalInfo.zipCode.text}</p>}
            {personalInfo.linkedin.text && <p>{personalInfo.linkedin.text}</p>}
            {personalInfo.portfolio.text && <p>{personalInfo.portfolio.text}</p>}
          </div>
        </div>

        <section className="skills">
          <h2>Skills</h2>
          <div className="skills-list">
            {skills.filter(skill => skill.text && skill.text.trim()).map((skill, index) => (
              <span key={index} className="skill-tag">{skill.text}</span>
            ))}
          </div>
        </section>

        {languages.some(lang => lang.language.text && lang.language.text.trim()) && (
          <section className="languages">
            <h2>Languages</h2>
            <div className="languages-list">
              {languages.filter(lang => lang.language.text && lang.language.text.trim()).map((lang) => (
                <div key={lang.id} className="language-item">
                  <span className="language">{lang.language.text}</span>
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
          <p>{professionalSummary.text}</p>
        </section>

        <section className="experience">
          <h2>Work Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} className="experience-item">
              <div className="job-header">
                <h3>{exp.title.text}</h3>
                <p className="company">{exp.company.text}{exp.location.text && `, ${exp.location.text}`}</p>
                <p className="date">
                  {formatDate(exp.startDate)} {exp.current ? '- Present' : exp.endDate && `- ${formatDate(exp.endDate)}`}
                </p>
              </div>
              <p className="job-description">{exp.description.text}</p>
            </div>
          ))}
        </section>

        <section className="education">
          <h2>Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="education-item">
              <h3>{edu.school.text}</h3>
              <p>{edu.degree.text}{edu.fieldOfStudy.text && ` in ${edu.fieldOfStudy.text}`}</p>
              <p className="date">
                {formatDate(edu.startDate)} {edu.current ? '- Present' : edu.endDate && `- ${formatDate(edu.endDate)}`}
              </p>
              {edu.description.text && <p>{edu.description.text}</p>}
            </div>
          ))}
        </section>

        {certifications.some(cert => cert.name.text && cert.name.text.trim()) && (
          <section className="certifications">
            <h2>Certifications</h2>
            {certifications.filter(cert => cert.name.text && cert.name.text.trim()).map((cert) => (
              <div key={cert.id} className="certification-item">
                <h3>{cert.name.text}</h3>
                <p>{cert.issuer.text}</p>
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

// Update PropTypes
CreativeTemplate.propTypes = {
  formData: PropTypes.shape({
    personalInfo: PropTypes.object.isRequired,
    professionalSummary: PropTypes.object.isRequired,
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
        <h1 style={{
          fontFamily: personalInfo.fullName.fontStyle,
          fontSize: personalInfo.fullName.fontSize,
          fontWeight: personalInfo.fullName.bold ? 'bold' : 'normal',
          fontStyle: personalInfo.fullName.italic ? 'italic' : 'normal'
        }}>{personalInfo.fullName.text}</h1>
        <div className="contact-info">
          {personalInfo.email.text && <p style={{
            fontFamily: personalInfo.email.fontStyle,
            fontSize: personalInfo.email.fontSize,
            fontWeight: personalInfo.email.bold ? 'bold' : 'normal',
            fontStyle: personalInfo.email.italic ? 'italic' : 'normal'
          }}>{personalInfo.email.text}</p>}
          {personalInfo.phone.text && <p style={{
            fontFamily: personalInfo.phone.fontStyle,
            fontSize: personalInfo.phone.fontSize,
            fontWeight: personalInfo.phone.bold ? 'bold' : 'normal',
            fontStyle: personalInfo.phone.italic ? 'italic' : 'normal'
          }}>{personalInfo.phone.text}</p>}
          {(personalInfo.address.text || personalInfo.city.text || personalInfo.state.text || personalInfo.zipCode.text) && (
            <p style={{
              fontFamily: personalInfo.address.fontStyle,
              fontSize: personalInfo.address.fontSize,
              fontWeight: personalInfo.address.bold ? 'bold' : 'normal',
              fontStyle: personalInfo.address.italic ? 'italic' : 'normal'
            }}>
              {personalInfo.address.text && `${personalInfo.address.text}, `}
              {personalInfo.city.text && `${personalInfo.city.text}, `}
              {personalInfo.state.text} {personalInfo.zipCode.text}
            </p>
          )}
          {personalInfo.linkedin.text && <p style={{
            fontFamily: personalInfo.linkedin.fontStyle,
            fontSize: personalInfo.linkedin.fontSize,
            fontWeight: personalInfo.linkedin.bold ? 'bold' : 'normal',
            fontStyle: personalInfo.linkedin.italic ? 'italic' : 'normal'
          }}>LinkedIn: {personalInfo.linkedin.text}</p>}
          {personalInfo.portfolio.text && <p style={{
            fontFamily: personalInfo.portfolio.fontStyle,
            fontSize: personalInfo.portfolio.fontSize,
            fontWeight: personalInfo.portfolio.bold ? 'bold' : 'normal',
            fontStyle: personalInfo.portfolio.italic ? 'italic' : 'normal'
          }}>Portfolio: {personalInfo.portfolio.text}</p>}
        </div>
      </header>

      <section className="summary">
        <h2>Professional Summary</h2>
        <p style={{
          fontFamily: professionalSummary.fontStyle,
          fontSize: professionalSummary.fontSize,
          fontWeight: professionalSummary.bold ? 'bold' : 'normal',
          fontStyle: professionalSummary.italic ? 'italic' : 'normal'
        }}>{professionalSummary.text}</p>
      </section>

      <section className="experience">
        <h2>Work Experience</h2>
        {experience.map((exp) => (
          <div key={exp.id} className="experience-item">
            <div className="job-header">
              <h3 style={{
                fontFamily: exp.title.fontStyle,
                fontSize: exp.title.fontSize,
                fontWeight: exp.title.bold ? 'bold' : 'normal',
                fontStyle: exp.title.italic ? 'italic' : 'normal'
              }}>{exp.title.text}</h3>
              <p className="company" style={{
                fontFamily: exp.company.fontStyle,
                fontSize: exp.company.fontSize,
                fontWeight: exp.company.bold ? 'bold' : 'normal',
                fontStyle: exp.company.italic ? 'italic' : 'normal'
              }}>{exp.company.text}{exp.location.text && `, ${exp.location.text}`}</p>
              <p className="date">
                {formatDate(exp.startDate)} {exp.current ? '- Present' : exp.endDate && `- ${formatDate(exp.endDate)}`}
              </p>
            </div>
            <p className="job-description" style={{
              fontFamily: exp.description.fontStyle,
              fontSize: exp.description.fontSize,
              fontWeight: exp.description.bold ? 'bold' : 'normal',
              fontStyle: exp.description.italic ? 'italic' : 'normal'
            }}>{exp.description.text}</p>
          </div>
        ))}
      </section>

      <section className="education">
        <h2>Education</h2>
        {education.map((edu) => (
          <div key={edu.id} className="education-item">
            <h3 style={{
              fontFamily: edu.school.fontStyle,
              fontSize: edu.school.fontSize,
              fontWeight: edu.school.bold ? 'bold' : 'normal',
              fontStyle: edu.school.italic ? 'italic' : 'normal'
            }}>{edu.school.text}</h3>
            <p style={{
              fontFamily: edu.degree.fontStyle,
              fontSize: edu.degree.fontSize,
              fontWeight: edu.degree.bold ? 'bold' : 'normal',
              fontStyle: edu.degree.italic ? 'italic' : 'normal'
            }}>{edu.degree.text}{edu.fieldOfStudy.text && ` in ${edu.fieldOfStudy.text}`}</p>
            <p className="date">
              {formatDate(edu.startDate)} {edu.current ? '- Present' : edu.endDate && `- ${formatDate(edu.endDate)}`}
            </p>
            {edu.description.text && <p style={{
              fontFamily: edu.description.fontStyle,
              fontSize: edu.description.fontSize,
              fontWeight: edu.description.bold ? 'bold' : 'normal',
              fontStyle: edu.description.italic ? 'italic' : 'normal'
            }}>{edu.description.text}</p>}
          </div>
        ))}
      </section>

      <section className="skills">
        <h2>Skills</h2>
        <div className="skills-list">
          {skills.filter(skill => skill.text.trim()).map((skill, index) => (
            <span key={index} className="skill-tag" style={{
              fontFamily: skill.fontStyle,
              fontSize: skill.fontSize,
              fontWeight: skill.bold ? 'bold' : 'normal',
              fontStyle: skill.italic ? 'italic' : 'normal'
            }}>{skill.text}</span>
          ))}
        </div>
      </section>

      {certifications.some(cert => cert.name.text.trim()) && (
        <section className="certifications">
          <h2>Certifications</h2>
          {certifications.filter(cert => cert.name.text.trim()).map((cert) => (
            <div key={cert.id} className="certification-item">
              <h3 style={{
                fontFamily: cert.name.fontStyle,
                fontSize: cert.name.fontSize,
                fontWeight: cert.name.bold ? 'bold' : 'normal',
                fontStyle: cert.name.italic ? 'italic' : 'normal'
              }}>{cert.name.text}</h3>
              <p style={{
                fontFamily: cert.issuer.fontStyle,
                fontSize: cert.issuer.fontSize,
                fontWeight: cert.issuer.bold ? 'bold' : 'normal',
                fontStyle: cert.issuer.italic ? 'italic' : 'normal'
              }}>{cert.issuer.text}</p>
              <p className="date">
                {formatDate(cert.issueDate)} {cert.expiryDate && `- ${formatDate(cert.expiryDate)}`}
              </p>
            </div>
          ))}
        </section>
      )}

      {languages.some(lang => lang.language.text.trim()) && (
        <section className="languages">
          <h2>Languages</h2>
          <div className="languages-list">
            {languages.filter(lang => lang.language.text.trim()).map((lang) => (
              <div key={lang.id} className="language-item">
                <span className="language" style={{
                  fontFamily: lang.language.fontStyle,
                  fontSize: lang.language.fontSize,
                  fontWeight: lang.language.bold ? 'bold' : 'normal',
                  fontStyle: lang.language.italic ? 'italic' : 'normal'
                }}>{lang.language.text}</span>
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
    professionalSummary: PropTypes.object.isRequired,
    experience: PropTypes.array.isRequired,
    education: PropTypes.array.isRequired,
    skills: PropTypes.array.isRequired,
    certifications: PropTypes.array.isRequired,
    languages: PropTypes.array.isRequired
  }).isRequired
};

export default ResumePreview; 