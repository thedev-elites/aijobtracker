import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../assets/css/ResumeForm.css';

const ResumeForm = ({ templateId, onSubmit }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      linkedin: '',
      portfolio: ''
    },
    professionalSummary: '',
    experience: [
      {
        id: 1,
        title: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
      }
    ],
    education: [
      {
        id: 1,
        school: '',
        degree: '',
        fieldOfStudy: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
      }
    ],
    skills: [''],
    certifications: [
      {
        id: 1,
        name: '',
        issuer: '',
        issueDate: '',
        expiryDate: '',
        description: ''
      }
    ],
    languages: [
      {
        id: 1,
        language: '',
        proficiency: 'Beginner'
      }
    ]
  });

  const [errors, setErrors] = useState({});

  const validateStep = useCallback((step) => {
    const newErrors = {};

    switch(step) {
      case 1: // Personal Information
        if (!formData.personalInfo.fullName.trim()) {
          newErrors.fullName = 'Full name is required';
        }
        if (!formData.personalInfo.email.trim()) {
          newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.personalInfo.email)) {
          newErrors.email = 'Email is invalid';
        }
        if (!formData.personalInfo.phone.trim()) {
          newErrors.phone = 'Phone number is required';
        }
        break;

      case 2: // Professional Summary
        if (!formData.professionalSummary.trim()) {
          newErrors.professionalSummary = 'Professional summary is required';
        }
        break;

      case 3: // Experience
        formData.experience.forEach((exp, index) => {
          if (!exp.title.trim()) {
            newErrors[`experience_${index}_title`] = 'Job title is required';
          }
          if (!exp.company.trim()) {
            newErrors[`experience_${index}_company`] = 'Company name is required';
          }
        });
        break;

      case 4: // Skills
        if (!formData.skills.some(skill => skill.trim())) {
          newErrors.skills = 'At least one skill is required';
        }
        break;

      case 5: // Education
        formData.education.forEach((edu, index) => {
          if (!edu.school.trim()) {
            newErrors[`education_${index}_school`] = 'School name is required';
          }
          if (!edu.degree.trim()) {
            newErrors[`education_${index}_degree`] = 'Degree is required';
          }
        });
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleInputChange = useCallback((section, field, value, index = null) => {
    setFormData(prev => {
      if (section === 'skills') {
        const newSkills = [...prev.skills];
        newSkills[index] = value;
        return { ...prev, skills: newSkills };
      } else if (index !== null && Array.isArray(prev[section])) {
        const newArray = [...prev[section]];
        newArray[index] = { ...newArray[index], [field]: value };
        return { ...prev, [section]: newArray };
      } else if (section === 'personalInfo') {
        return {
          ...prev,
          personalInfo: { ...prev.personalInfo, [field]: value }
        };
      } else {
        return { ...prev, [section]: value };
      }
    });
  }, []);

  const addSkill = useCallback(() => {
    setFormData(prev => ({
      ...prev,
      skills: [...prev.skills, '']
    }));
  }, []);

  const removeSkill = useCallback((index) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  }, []);

  const addItem = useCallback((section) => {
    setFormData(prev => {
      const newId = Math.max(...prev[section].map(item => item.id)) + 1;
      const newItem = {
        id: newId,
        ...(section === 'experience' && {
          title: '',
          company: '',
          location: '',
          startDate: '',
          endDate: '',
          current: false,
          description: ''
        }),
        ...(section === 'education' && {
          school: '',
          degree: '',
          fieldOfStudy: '',
          startDate: '',
          endDate: '',
          current: false,
          description: ''
        }),
        ...(section === 'certifications' && {
          name: '',
          issuer: '',
          issueDate: '',
          expiryDate: '',
          description: ''
        }),
        ...(section === 'languages' && {
          language: '',
          proficiency: 'Beginner'
        })
      };
      return { ...prev, [section]: [...prev[section], newItem] };
    });
  }, []);

  const removeItem = useCallback((section, id) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].filter(item => item.id !== id)
    }));
  }, []);

  const handleNextStep = useCallback(() => {
    const isValid = validateStep(currentStep);
    if (isValid) {
      setCurrentStep(prevStep => prevStep + 1);
    }
  }, [currentStep, validateStep]);

  const handlePrevStep = useCallback(() => {
    setCurrentStep(prevStep => prevStep - 1);
  }, []);

  const handleSectionClick = useCallback((step) => {
    if (step < currentStep) {
      setCurrentStep(step);
      return;
    }

    const isValid = validateStep(currentStep);
    if (isValid && step <= 6) {
      setCurrentStep(step);
    }
  }, [currentStep, validateStep]);

  const handlePreview = useCallback(() => {
    const isValid = validateStep(currentStep);
    if (isValid) {
      navigate('/preview', { 
        state: { 
          templateId, 
          formData 
        } 
      });
    }
  }, [currentStep, formData, navigate, templateId, validateStep]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const isValid = validateStep(currentStep);
    if (isValid) {
      if (onSubmit) {
        onSubmit(formData);
      } else {
        navigate('/preview', { 
          state: { 
            templateId, 
            formData 
          } 
        });
      }
    }
  }, [currentStep, formData, navigate, onSubmit, templateId, validateStep]);

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all fields?')) {
      setFormData({
        personalInfo: {
          fullName: '',
          email: '',
          phone: '',
          address: '',
          city: '',
          state: '',
          zipCode: '',
          linkedin: '',
          portfolio: ''
        },
        professionalSummary: '',
        experience: [{
          id: 1,
          title: '',
          company: '',
          location: '',
          startDate: '',
          endDate: '',
          current: false,
          description: ''
        }],
        education: [{
          id: 1,
          school: '',
          degree: '',
          fieldOfStudy: '',
          startDate: '',
          endDate: '',
          current: false,
          description: ''
        }],
        skills: [''],
        certifications: [{
          id: 1,
          name: '',
          issuer: '',
          issueDate: '',
          expiryDate: '',
          description: ''
        }],
        languages: [{
          id: 1,
          language: '',
          proficiency: 'Beginner'
        }]
      });
      setCurrentStep(1);
      setErrors({});
    }
  };

  return (
    <div className="resume-form">
      <div className="form-progress">
        <div 
          className={`progress-step ${currentStep >= 1 ? 'active' : ''}`}
          onClick={() => handleSectionClick(1)}
        >
          Personal Info
        </div>
        <div 
          className={`progress-step ${currentStep >= 2 ? 'active' : ''}`}
          onClick={() => handleSectionClick(2)}
        >
          Summary
        </div>
        <div 
          className={`progress-step ${currentStep >= 3 ? 'active' : ''}`}
          onClick={() => handleSectionClick(3)}
        >
          Experience
        </div>
        <div 
          className={`progress-step ${currentStep >= 4 ? 'active' : ''}`}
          onClick={() => handleSectionClick(4)}
        >
          Skills
        </div>
        <div 
          className={`progress-step ${currentStep >= 5 ? 'active' : ''}`}
          onClick={() => handleSectionClick(5)}
        >
          Education
        </div>
        <div 
          className={`progress-step ${currentStep >= 6 ? 'active' : ''}`}
          onClick={() => handleSectionClick(6)}
        >
          Additional
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Personal Information Section */}
        {currentStep === 1 && (
          <div className="form-section">
            <h2>Personal Information</h2>
            <div className="form-row">
            <div className="form-group">
              <label htmlFor="fullName">Full Name *</label>
              <input
                type="text"
                id="fullName"
                value={formData.personalInfo.fullName}
                onChange={(e) => handleInputChange('personalInfo', 'fullName', e.target.value)}
                className={errors.fullName ? 'error' : ''}
              />
              {errors.fullName && <span className="error-message">{errors.fullName}</span>}
            </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  value={formData.personalInfo.email}
                  onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
              </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.personalInfo.phone}
                  onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                  className={errors.phone ? 'error' : ''}
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                value={formData.personalInfo.address}
                onChange={(e) => handleInputChange('personalInfo', 'address', e.target.value)}
              />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  value={formData.personalInfo.city}
                  onChange={(e) => handleInputChange('personalInfo', 'city', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="state">State</label>
                <input
                  type="text"
                  id="state"
                  value={formData.personalInfo.state}
                  onChange={(e) => handleInputChange('personalInfo', 'state', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="zipCode">Zip Code</label>
                <input
                  type="text"
                  id="zipCode"
                  value={formData.personalInfo.zipCode}
                  onChange={(e) => handleInputChange('personalInfo', 'zipCode', e.target.value)}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="linkedin">LinkedIn Profile</label>
                <input
                  type="url"
                  id="linkedin"
                  value={formData.personalInfo.linkedin}
                  onChange={(e) => handleInputChange('personalInfo', 'linkedin', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="portfolio">Portfolio/Website</label>
                <input
                  type="url"
                  id="portfolio"
                  value={formData.personalInfo.portfolio}
                  onChange={(e) => handleInputChange('personalInfo', 'portfolio', e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Professional Summary Section */}
        {currentStep === 2 && (
          <div className="form-section">
            <h2>Professional Summary</h2>
            <div className="form-group">
              <label htmlFor="professionalSummary">Write a brief summary highlighting your skills and experience *</label>
              <textarea
                id="professionalSummary"
                value={formData.professionalSummary}
                onChange={(e) => handleInputChange('professionalSummary', null, e.target.value)}
                rows="6"
                className={errors.professionalSummary ? 'error' : ''}
              />
              {errors.professionalSummary && <span className="error-message">{errors.professionalSummary}</span>}
            </div>
          </div>
        )}

        {/* Work Experience Section */}
        {currentStep === 3 && (
          <div className="form-section">
            <h2>Work Experience</h2>
            {formData.experience.map((exp, index) => (
              <div key={exp.id} className="form-subsection">
                <h3>Experience {index + 1}</h3>
                {index > 0 && (
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => removeItem('experience', exp.id)}
                  >
                    Remove
                  </button>
                )}

                <div className="form-row">
                  <div className="form-group">
                    <label>Job Title *</label>
                    <input
                      type="text"
                      value={exp.title}
                      onChange={(e) => handleInputChange('experience', 'title', e.target.value, index)}
                      className={errors[`experience_${index}_title`] ? 'error' : ''}
                    />
                    {errors[`experience_${index}_title`] && (
                      <span className="error-message">{errors[`experience_${index}_title`]}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Company *</label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => handleInputChange('experience', 'company', e.target.value, index)}
                      className={errors[`experience_${index}_company`] ? 'error' : ''}
                    />
                    {errors[`experience_${index}_company`] && (
                      <span className="error-message">{errors[`experience_${index}_company`]}</span>
                    )}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Location</label>
                    <input
                      type="text"
                      value={exp.location}
                      onChange={(e) => handleInputChange('experience', 'location', e.target.value, index)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Start Date</label>
                    <input
                      type="date"
                      value={exp.startDate}
                      onChange={(e) => handleInputChange('experience', 'startDate', e.target.value, index)}
                    />
                  </div>

                  <div className="form-group">
                    <label>End Date</label>
                    <input
                      type="date"
                      value={exp.endDate}
                      onChange={(e) => handleInputChange('experience', 'endDate', e.target.value, index)}
                      disabled={exp.current}
                    />
                  </div>
                </div>

                <div className="form-group checkbox-group">
                    <input
                      type="checkbox"
                    id={`exp-current-${index}`}
                      checked={exp.current}
                      onChange={(e) => handleInputChange('experience', 'current', e.target.checked, index)}
                    />
                  <label htmlFor={`exp-current-${index}`}>I am currently working here</label>
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={exp.description}
                    onChange={(e) => handleInputChange('experience', 'description', e.target.value, index)}
                    rows="4"
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              className="add-btn"
              onClick={() => addItem('experience')}
            >
              Add Another Experience
            </button>
          </div>
        )}

        {/* Skills Section */}
        {currentStep === 4 && (
          <div className="form-section">
            <h2>Skills</h2>
            <p>Add skills that showcase your abilities</p>
            
            {formData.skills.map((skill, index) => (
              <div key={index} className="skill-input">
                <input
                  type="text"
                  value={skill}
                  onChange={(e) => handleInputChange('skills', null, e.target.value, index)}
                  placeholder="Enter a skill"
                  className={errors.skills && !skill.trim() ? 'error' : ''}
                />
                {index > 0 && (
                  <button 
                    type="button" 
                    onClick={() => removeSkill(index)}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            
            {errors.skills && <span className="error-message">{errors.skills}</span>}
            
            <button
              type="button"
              className="add-btn"
              onClick={addSkill}
            >
              Add Another Skill
            </button>
          </div>
        )}

        {/* Education Section */}
        {currentStep === 5 && (
          <div className="form-section">
            <h2>Education</h2>
            {formData.education.map((edu, index) => (
              <div key={edu.id} className="form-subsection">
                <h3>Education {index + 1}</h3>
                {index > 0 && (
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => removeItem('education', edu.id)}
                  >
                    Remove
                  </button>
                )}

                <div className="form-row">
                  <div className="form-group">
                    <label>School *</label>
                    <input
                      type="text"
                      value={edu.school}
                      onChange={(e) => handleInputChange('education', 'school', e.target.value, index)}
                      className={errors[`education_${index}_school`] ? 'error' : ''}
                    />
                    {errors[`education_${index}_school`] && (
                      <span className="error-message">{errors[`education_${index}_school`]}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Degree *</label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => handleInputChange('education', 'degree', e.target.value, index)}
                      className={errors[`education_${index}_degree`] ? 'error' : ''}
                    />
                    {errors[`education_${index}_degree`] && (
                      <span className="error-message">{errors[`education_${index}_degree`]}</span>
                    )}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Field of Study</label>
                    <input
                      type="text"
                      value={edu.fieldOfStudy}
                      onChange={(e) => handleInputChange('education', 'fieldOfStudy', e.target.value, index)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Start Date</label>
                    <input
                      type="date"
                      value={edu.startDate}
                      onChange={(e) => handleInputChange('education', 'startDate', e.target.value, index)}
                    />
                  </div>

                  <div className="form-group">
                    <label>End Date</label>
                    <input
                      type="date"
                      value={edu.endDate}
                      onChange={(e) => handleInputChange('education', 'endDate', e.target.value, index)}
                      disabled={edu.current}
                    />
                  </div>
                </div>

                <div className="form-group checkbox-group">
                  <input
                    type="checkbox"
                    id={`edu-current-${index}`}
                    checked={edu.current}
                    onChange={(e) => handleInputChange('education', 'current', e.target.checked, index)}
                  />
                  <label htmlFor={`edu-current-${index}`}>I am currently studying here</label>
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={edu.description}
                    onChange={(e) => handleInputChange('education', 'description', e.target.value, index)}
                    rows="4"
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              className="add-btn"
              onClick={() => addItem('education')}
            >
              Add Another Education
            </button>
          </div>
        )}

        {/* Additional Information (Certifications & Languages) */}
        {currentStep === 6 && (
          <div className="form-section">
            <h2>Additional Information</h2>
            
            {/* Certifications */}
            <div className="subsection">
              <h3>Certifications</h3>
              {formData.certifications.map((cert, index) => (
                <div key={cert.id} className="form-subsection">
                  <h4>Certification {index + 1}</h4>
                  {index > 0 && (
                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() => removeItem('certifications', cert.id)}
                    >
                      Remove
                    </button>
                  )}

                  <div className="form-row">
                    <div className="form-group">
                      <label>Certification Name</label>
                      <input
                        type="text"
                        value={cert.name}
                        onChange={(e) => handleInputChange('certifications', 'name', e.target.value, index)}
                      />
                    </div>

                    <div className="form-group">
                      <label>Issuing Organization</label>
                      <input
                        type="text"
                        value={cert.issuer}
                        onChange={(e) => handleInputChange('certifications', 'issuer', e.target.value, index)}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Issue Date</label>
                      <input
                        type="date"
                        value={cert.issueDate}
                        onChange={(e) => handleInputChange('certifications', 'issueDate', e.target.value, index)}
                      />
                    </div>

                    <div className="form-group">
                      <label>Expiry Date (if applicable)</label>
                      <input
                        type="date"
                        value={cert.expiryDate}
                        onChange={(e) => handleInputChange('certifications', 'expiryDate', e.target.value, index)}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      value={cert.description}
                      onChange={(e) => handleInputChange('certifications', 'description', e.target.value, index)}
                      rows="3"
                    />
                  </div>
                </div>
              ))}

              <button
                type="button"
                className="add-btn"
                onClick={() => addItem('certifications')}
              >
                Add Certification
              </button>
            </div>
            
            {/* Languages */}
            <div className="subsection">
              <h3>Languages</h3>
              {formData.languages.map((lang, index) => (
                <div key={lang.id} className="form-subsection language-subsection">
                  {index > 0 && (
                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() => removeItem('languages', lang.id)}
                    >
                      Remove
                    </button>
                  )}

                  <div className="form-row">
                    <div className="form-group">
                      <label>Language</label>
                      <input
                        type="text"
                        value={lang.language}
                        onChange={(e) => handleInputChange('languages', 'language', e.target.value, index)}
                      />
                    </div>

                    <div className="form-group">
                      <label>Proficiency</label>
                      <select
                        value={lang.proficiency}
                        onChange={(e) => handleInputChange('languages', 'proficiency', e.target.value, index)}
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Fluent">Fluent</option>
                        <option value="Native">Native</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                className="add-btn"
                onClick={() => addItem('languages')}
              >
                Add Language
              </button>
            </div>
          </div>
        )}

        {/* Form Navigation */}
        <div className="form-actions">
          <div>
          {currentStep > 1 && (
            <button type="button" onClick={handlePrevStep} className="btn-secondary">
              Previous
            </button>
          )}
          </div>
          
          <div>
            <button type="button" onClick={handleReset} className="btn-tertiary">
              Reset Form
            </button>
          </div>
          
          <div className="action-buttons">
            {currentStep < 6 ? (
            <button type="button" onClick={handleNextStep} className="btn-primary">
              Next
            </button>
          ) : (
              <>
                <button type="button" onClick={handlePreview} className="btn-secondary">
                  Preview
                </button>
            <button type="submit" className="btn-primary">
                  Generate Resume
            </button>
              </>
          )}
          </div>
        </div>
      </form>
    </div>
  );
};

ResumeForm.propTypes = {
  templateId: PropTypes.string.isRequired,
  onSubmit: PropTypes.func
};

export default ResumeForm;