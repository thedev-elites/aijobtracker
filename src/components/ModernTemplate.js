import React from 'react';
import PropTypes from 'prop-types';
import '../assets/css/ModernTemplate.css';

const ModernTemplate = ({ personalInfo, professionalSummary, experience, education, skills, certifications, languages }) => {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
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
          {personalInfo.email.text && (
            <p style={{
              fontFamily: personalInfo.email.fontStyle,
              fontSize: personalInfo.email.fontSize,
              fontWeight: personalInfo.email.bold ? 'bold' : 'normal',
              fontStyle: personalInfo.email.italic ? 'italic' : 'normal'
            }}>{personalInfo.email.text}</p>
          )}
          {personalInfo.phone.text && (
            <p style={{
              fontFamily: personalInfo.phone.fontStyle,
              fontSize: personalInfo.phone.fontSize,
              fontWeight: personalInfo.phone.bold ? 'bold' : 'normal',
              fontStyle: personalInfo.phone.italic ? 'italic' : 'normal'
            }}>{personalInfo.phone.text}</p>
          )}
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
          {personalInfo.linkedin.text && (
            <p style={{
              fontFamily: personalInfo.linkedin.fontStyle,
              fontSize: personalInfo.linkedin.fontSize,
              fontWeight: personalInfo.linkedin.bold ? 'bold' : 'normal',
              fontStyle: personalInfo.linkedin.italic ? 'italic' : 'normal'
            }}>LinkedIn: {personalInfo.linkedin.text}</p>
          )}
          {personalInfo.portfolio.text && (
            <p style={{
              fontFamily: personalInfo.portfolio.fontStyle,
              fontSize: personalInfo.portfolio.fontSize,
              fontWeight: personalInfo.portfolio.bold ? 'bold' : 'normal',
              fontStyle: personalInfo.portfolio.italic ? 'italic' : 'normal'
            }}>Portfolio: {personalInfo.portfolio.text}</p>
          )}
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
              }}>
                {exp.company.text}
                {exp.location.text && `, ${exp.location.text}`}
              </p>
              <p className="date">
                {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
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
            }}>
              {edu.degree.text}
              {edu.fieldOfStudy.text && ` in ${edu.fieldOfStudy.text}`}
            </p>
            <p className="date">
              {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}
            </p>
            {edu.description.text && (
              <p style={{
                fontFamily: edu.description.fontStyle,
                fontSize: edu.description.fontSize,
                fontWeight: edu.description.bold ? 'bold' : 'normal',
                fontStyle: edu.description.italic ? 'italic' : 'normal'
              }}>{edu.description.text}</p>
            )}
          </div>
        ))}
      </section>

      <section className="skills">
        <h2>Skills</h2>
        <div className="skills-list">
          {skills.filter(skill => skill.text && skill.text.trim()).map((skill, index) => (
            <span key={index} className="skill-tag" style={{
              fontFamily: skill.fontStyle,
              fontSize: skill.fontSize,
              fontWeight: skill.bold ? 'bold' : 'normal',
              fontStyle: skill.italic ? 'italic' : 'normal'
            }}>{skill.text}</span>
          ))}
        </div>
      </section>

      {certifications.some(cert => cert.name.text && cert.name.text.trim()) && (
        <section className="certifications">
          <h2>Certifications</h2>
          {certifications.filter(cert => cert.name.text && cert.name.text.trim()).map((cert) => (
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
                {formatDate(cert.issueDate)}
                {cert.expiryDate && ` - ${formatDate(cert.expiryDate)}`}
              </p>
              {cert.description.text && (
                <p style={{
                  fontFamily: cert.description.fontStyle,
                  fontSize: cert.description.fontSize,
                  fontWeight: cert.description.bold ? 'bold' : 'normal',
                  fontStyle: cert.description.italic ? 'italic' : 'normal'
                }}>{cert.description.text}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {languages.some(lang => lang.language.text && lang.language.text.trim()) && (
        <section className="languages">
          <h2>Languages</h2>
          <div className="languages-list">
            {languages.filter(lang => lang.language.text && lang.language.text.trim()).map((lang) => (
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

ModernTemplate.propTypes = {
  personalInfo: PropTypes.object.isRequired,
  professionalSummary: PropTypes.object.isRequired,
  experience: PropTypes.arrayOf(PropTypes.object).isRequired,
  education: PropTypes.arrayOf(PropTypes.object).isRequired,
  skills: PropTypes.arrayOf(PropTypes.object).isRequired,
  certifications: PropTypes.arrayOf(PropTypes.object).isRequired,
  languages: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default ModernTemplate; 