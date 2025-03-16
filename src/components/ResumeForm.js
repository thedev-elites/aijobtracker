import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/ResumeForm.css';

const ResumeForm = ({ templateId }) => {
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

  const validateStep = (step) => {
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

      case 4: // Education
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
  };

  const handleInputChange = (section, field, value, index = null) => {
    setFormData(prev => {
      if (index !== null && Array.isArray(prev[section])) {
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
  };

  const addItem = (section) => {
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
  };

  const removeItem = (section, id) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].filter(item => item.id !== id)
    }));
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      // Here you would typically save the resume data
      console.log('Form submitted:', formData);
      // Navigate to preview page or save resume
      navigate('/resume-preview', { state: { formData, templateId } });
    }
  };

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
    }
  };

  return (
    <div className="resume-form-container">
      <div className="form-progress">
        <div className={`progress-step ${currentStep >= 1 ? 'active' : ''}`}>Personal Info</div>
        <div className={`progress-step ${currentStep >= 2 ? 'active' : ''}`}>Summary</div>
        <div className={`progress-step ${currentStep >= 3 ? 'active' : ''}`}>Experience</div>
        <div className={`progress-step ${currentStep >= 4 ? 'active' : ''}`}>Education</div>
        <div className={`progress-step ${currentStep >= 5 ? 'active' : ''}`}>Skills</div>
      </div>

      <form onSubmit={handleSubmit} className="resume-form">
        {currentStep === 1 && (
          <div className="form-section">
            <h2>Personal Information</h2>
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

            <div className="form-row">
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

              <div className="form-group">
                <label htmlFor="phone">Phone *</label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.personalInfo.phone}
                  onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                  className={errors.phone ? 'error' : ''}
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>
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
                <label htmlFor="portfolio">Portfolio Website</label>
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

        {currentStep === 2 && (
          <div className="form-section">
            <h2>Professional Summary</h2>
            <div className="form-group">
              <label htmlFor="summary">Professional Summary *</label>
              <textarea
                id="summary"
                value={formData.professionalSummary}
                onChange={(e) => handleInputChange('professionalSummary', null, e.target.value)}
                rows="6"
                className={errors.professionalSummary ? 'error' : ''}
              />
              {errors.professionalSummary && (
                <span className="error-message">{errors.professionalSummary}</span>
              )}
            </div>
          </div>
        )}

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

                <div className="form-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={exp.current}
                      onChange={(e) => handleInputChange('experience', 'current', e.target.checked, index)}
                    />
                    I currently work here
                  </label>
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

        {/* Similar sections for Education, Skills, etc. */}

        <div className="form-actions">
          {currentStep > 1 && (
            <button type="button" onClick={handlePrevious} className="btn-secondary">
              Previous
            </button>
          )}
          {currentStep < 5 ? (
            <button type="button" onClick={handleNext} className="btn-primary">
              Next
            </button>
          ) : (
            <button type="submit" className="btn-primary">
              Create Resume
            </button>
          )}
          <button type="button" onClick={handleReset} className="btn-secondary">
            Reset Form
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResumeForm;