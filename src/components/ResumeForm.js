import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../assets/css/ResumeForm.css';

const FONT_STYLES = [
  'Arial',
  'Times New Roman',
  'Helvetica',
  'Georgia',
  'Calibri',
  'Verdana',
  'Open Sans',
  'Roboto'
];

const FONT_SIZES = [
  '12px', '14px', '16px', '18px', '20px', '22px', '24px'
];

const ResumeForm = ({ templateId, onSubmit, initialFormData, isEditing }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: { text: '', bold: false, italic: false, fontStyle: 'Arial', fontSize: '16px' },
      email: { text: '', bold: false, italic: false, fontStyle: 'Arial', fontSize: '14px' },
      phone: { text: '', bold: false, italic: false, fontStyle: 'Arial', fontSize: '14px' },
      address: { text: '', bold: false, italic: false, fontStyle: 'Arial', fontSize: '14px' },
      city: { text: '', bold: false, italic: false, fontStyle: 'Arial', fontSize: '14px' },
      state: { text: '', bold: false, italic: false, fontStyle: 'Arial', fontSize: '14px' },
      zipCode: { text: '', bold: false, italic: false, fontStyle: 'Arial', fontSize: '14px' },
      linkedin: { text: '', bold: false, italic: false, fontStyle: 'Arial', fontSize: '14px' },
      portfolio: { text: '', bold: false, italic: false, fontStyle: 'Arial', fontSize: '14px' }
    },
    professionalSummary: { text: '', bold: false, italic: false, fontStyle: 'Arial', fontSize: '14px' },
    experience: [
      {
        id: 1,
        title: { text: '', bold: false, italic: false, fontStyle: 'Arial', fontSize: '16px' },
        company: { text: '', bold: false, italic: false, fontStyle: 'Arial', fontSize: '14px' },
        location: { text: '', bold: false, italic: false, fontStyle: 'Arial', fontSize: '14px' },
        startDate: '',
        endDate: '',
        current: false,
        description: { text: '', bold: false, italic: false, fontStyle: 'Arial', fontSize: '14px' }
      }
    ],
    education: [
      {
        id: 1,
        school: { text: '', bold: false, italic: false, fontStyle: 'Arial', fontSize: '16px' },
        degree: { text: '', bold: false, italic: false, fontStyle: 'Arial', fontSize: '14px' },
        fieldOfStudy: { text: '', bold: false, italic: false, fontStyle: 'Arial', fontSize: '14px' },
        startDate: '',
        endDate: '',
        current: false,
        description: { text: '', bold: false, italic: false, fontStyle: 'Arial', fontSize: '14px' }
      }
    ],
    skills: [{ text: '', bold: false, italic: false, fontStyle: 'Arial', fontSize: '14px' }],
    certifications: [
      {
        id: 1,
        name: { text: '', bold: false, italic: false, fontStyle: 'Arial', fontSize: '16px' },
        issuer: { text: '', bold: false, italic: false, fontStyle: 'Arial', fontSize: '14px' },
        issueDate: '',
        expiryDate: '',
        description: { text: '', bold: false, italic: false, fontStyle: 'Arial', fontSize: '14px' }
      }
    ],
    languages: [
      {
        id: 1,
        language: { text: '', bold: false, italic: false, fontStyle: 'Arial', fontSize: '14px' },
        proficiency: 'Beginner'
      }
    ]
  });

  // Use initialFormData when provided (for editing)
  useEffect(() => {
    if (initialFormData) {
      setFormData(initialFormData);
    }
  }, [initialFormData]);

  const [errors, setErrors] = useState({});

  const validateStep = useCallback((step) => {
    const newErrors = {};

    switch(step) {
      case 1:
        if (!formData.personalInfo.fullName.text.trim()) {
          newErrors.fullName = 'Full name is required';
        }
        if (!formData.personalInfo.email.text.trim()) {
          newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.personalInfo.email.text)) {
          newErrors.email = 'Email is invalid';
        }
        if (!formData.personalInfo.phone.text.trim()) {
          newErrors.phone = 'Phone number is required';
        }
        break;

      case 2:
        if (!formData.professionalSummary.text.trim()) {
          newErrors.professionalSummary = 'Professional summary is required';
        }
        break;

      case 3:
        formData.experience.forEach((exp, index) => {
          if (!exp.title.text.trim()) {
            newErrors[`experience_${index}_title`] = 'Job title is required';
          }
          if (!exp.company.text.trim()) {
            newErrors[`experience_${index}_company`] = 'Company name is required';
          }
        });
        break;

      case 4:
        if (!formData.skills.some(skill => skill.text.trim())) {
          newErrors.skills = 'At least one skill is required';
        }
        break;

      case 5:
        formData.education.forEach((edu, index) => {
          if (!edu.school.text.trim()) {
            newErrors[`education_${index}_school`] = 'School name is required';
          }
          if (!edu.degree.text.trim()) {
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

  const handleInputChange = useCallback((section, field, value, index = null, formatType = null) => {
    setFormData(prev => {
      if (section === 'skills') {
        const newSkills = [...prev.skills];
        if (formatType) {
          newSkills[index] = { 
            ...newSkills[index], 
            [formatType]: typeof value === 'boolean' ? value : value
          };
        } else {
          newSkills[index] = { 
            ...newSkills[index], 
            text: value 
          };
        }
        return { ...prev, skills: newSkills };
      } else if (section === 'languages' && field === 'language' && formatType) {
        const newLanguages = [...prev.languages];
        newLanguages[index] = {
          ...newLanguages[index],
          language: {
            ...newLanguages[index].language,
            [formatType]: typeof value === 'boolean' ? value : value
          }
        };
        return { ...prev, languages: newLanguages };
      } else if (section === 'certifications' && formatType) {
        const newCertifications = [...prev.certifications];
        newCertifications[index] = {
          ...newCertifications[index],
          [field]: {
            ...newCertifications[index][field],
            [formatType]: typeof value === 'boolean' ? value : value
          }
        };
        return { ...prev, certifications: newCertifications };
      } else if (index !== null && Array.isArray(prev[section])) {
        const newArray = [...prev[section]];
        if (formatType) {
          newArray[index] = {
            ...newArray[index],
            [field]: {
              ...newArray[index][field],
              [formatType]: typeof value === 'boolean' ? value : value
            }
          };
        } else if (field === 'startDate' || field === 'endDate' || field === 'issueDate' || field === 'expiryDate' || field === 'current' || field === 'proficiency') {
          newArray[index] = {
            ...newArray[index],
            [field]: value
          };
        } else {
          newArray[index] = {
            ...newArray[index],
            [field]: {
              ...newArray[index][field],
              text: value
            }
          };
        }
        return { ...prev, [section]: newArray };
      } else if (section === 'personalInfo') {
        if (formatType) {
        return {
          ...prev,
            personalInfo: {
              ...prev.personalInfo,
              [field]: {
                ...prev.personalInfo[field],
                [formatType]: typeof value === 'boolean' ? value : value
              }
            }
          };
        }
        return {
          ...prev,
          personalInfo: {
            ...prev.personalInfo,
            [field]: {
              ...prev.personalInfo[field],
              text: value
            }
          }
        };
      } else {
        if (formatType) {
          return {
            ...prev,
            [section]: {
              ...prev[section],
              [formatType]: typeof value === 'boolean' ? value : value
            }
          };
        }
        return {
          ...prev,
          [section]: {
            ...prev[section],
            text: value
          }
        };
      }
    });
  }, []);

  const addSkill = useCallback(() => {
    setFormData(prev => ({
      ...prev,
      skills: [...prev.skills, { text: '', bold: false, italic: false, fontStyle: 'Arial', fontSize: '14px' }]
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
          title: { text: '', bold: false, italic: false, fontStyle: 'Arial', fontSize: '16px' },
          company: { text: '', bold: false, italic: false, fontStyle: 'Arial', fontSize: '14px' },
          location: { text: '', bold: false, italic: false, fontStyle: 'Arial', fontSize: '14px' },
          startDate: '',
          endDate: '',
          current: false,
          description: { text: '', bold: false, italic: false, fontStyle: 'Arial', fontSize: '14px' }
        }),
        ...(section === 'education' && {
          school: { text: '', bold: false, italic: false, fontStyle: 'Arial', fontSize: '16px' },
          degree: { text: '', bold: false, italic: false, fontStyle: 'Arial', fontSize: '14px' },
          fieldOfStudy: { text: '', bold: false, italic: false, fontStyle: 'Arial', fontSize: '14px' },
          startDate: '',
          endDate: '',
          current: false,
          description: { text: '', bold: false, italic: false, fontStyle: 'Arial', fontSize: '14px' }
        }),
        ...(section === 'certifications' && {
          name: { text: '', bold: false, italic: false, fontStyle: 'Arial', fontSize: '16px' },
          issuer: { text: '', bold: false, italic: false, fontStyle: 'Arial', fontSize: '14px' },
          issueDate: '',
          expiryDate: '',
          description: { text: '', bold: false, italic: false, fontStyle: 'Arial', fontSize: '14px' }
        }),
        ...(section === 'languages' && {
          language: { text: '', bold: false, italic: false, fontStyle: 'Arial', fontSize: '14px' },
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
    setCurrentStep(step);
  }, []);

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
          fullName: { text: '', bold: false, italic: false, fontStyle: 'Arial', fontSize: '16px' },
          email: { text: '', bold: false, italic: false, fontStyle: 'Arial', fontSize: '14px' },
          phone: { text: '', bold: false, italic: false, fontStyle: 'Arial', fontSize: '14px' },
          address: { text: '', bold: false, italic: false, fontStyle: 'Arial', fontSize: '14px' },
          city: { text: '', bold: false, italic: false, fontStyle: 'Arial', fontSize: '14px' },
          state: { text: '', bold: false, italic: false, fontStyle: 'Arial', fontSize: '14px' },
          zipCode: { text: '', bold: false, italic: false, fontStyle: 'Arial', fontSize: '14px' },
          linkedin: { text: '', bold: false, italic: false, fontStyle: 'Arial', fontSize: '14px' },
          portfolio: { text: '', bold: false, italic: false, fontStyle: 'Arial', fontSize: '14px' }
        },
        professionalSummary: { text: '', bold: false, italic: false, fontStyle: 'Arial', fontSize: '14px' },
        experience: [{
          id: 1,
          title: { text: '', bold: false, italic: false, fontStyle: 'Arial', fontSize: '16px' },
          company: { text: '', bold: false, italic: false, fontStyle: 'Arial', fontSize: '14px' },
          location: { text: '', bold: false, italic: false, fontStyle: 'Arial', fontSize: '14px' },
          startDate: '',
          endDate: '',
          current: false,
          description: { text: '', bold: false, italic: false, fontStyle: 'Arial', fontSize: '14px' }
        }],
        education: [{
          id: 1,
          school: { text: '', bold: false, italic: false, fontStyle: 'Arial', fontSize: '16px' },
          degree: { text: '', bold: false, italic: false, fontStyle: 'Arial', fontSize: '14px' },
          fieldOfStudy: { text: '', bold: false, italic: false, fontStyle: 'Arial', fontSize: '14px' },
          startDate: '',
          endDate: '',
          current: false,
          description: { text: '', bold: false, italic: false, fontStyle: 'Arial', fontSize: '14px' }
        }],
        skills: [{ text: '', bold: false, italic: false, fontStyle: 'Arial', fontSize: '14px' }],
        certifications: [{
          id: 1,
          name: { text: '', bold: false, italic: false, fontStyle: 'Arial', fontSize: '16px' },
          issuer: { text: '', bold: false, italic: false, fontStyle: 'Arial', fontSize: '14px' },
          issueDate: '',
          expiryDate: '',
          description: { text: '', bold: false, italic: false, fontStyle: 'Arial', fontSize: '14px' }
        }],
        languages: [{
          id: 1,
          language: { text: '', bold: false, italic: false, fontStyle: 'Arial', fontSize: '14px' },
          proficiency: 'Beginner'
        }]
      });
      setCurrentStep(1);
      setErrors({});
    }
  };

  const TextFormatControls = ({ value, onChange }) => (
    <div className="text-format-controls">
      <div className="format-controls">
        <button
          type="button"
          className={`format-btn ${value.bold ? 'active' : ''}`}
          onClick={() => onChange('bold', !value.bold)}
        >
          B
        </button>
        <button
          type="button"
          className={`format-btn ${value.italic ? 'active' : ''}`}
          onClick={() => onChange('italic', !value.italic)}
        >
          I
        </button>
      </div>
      <div className="font-controls">
        <select
          className="font-select"
          value={value.fontStyle}
          onChange={(e) => onChange('fontStyle', e.target.value)}
        >
          {FONT_STYLES.map((font) => (
            <option key={font} value={font} style={{ fontFamily: font }}>
              {font}
            </option>
          ))}
        </select>
        <select
          className="font-size-select"
          value={value.fontSize}
          onChange={(e) => onChange('fontSize', e.target.value)}
        >
          {FONT_SIZES.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

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
                <TextFormatControls
                  value={formData.personalInfo.fullName}
                  onChange={(formatType, value) => handleInputChange('personalInfo', 'fullName', value, null, formatType)}
                />
              <input
                type="text"
                id="fullName"
                  value={formData.personalInfo.fullName.text}
                onChange={(e) => handleInputChange('personalInfo', 'fullName', e.target.value)}
                className={errors.fullName ? 'error' : ''}
                  style={{
                    fontFamily: formData.personalInfo.fullName.fontStyle,
                    fontSize: formData.personalInfo.fullName.fontSize,
                    fontWeight: formData.personalInfo.fullName.bold ? 'bold' : 'normal',
                    fontStyle: formData.personalInfo.fullName.italic ? 'italic' : 'normal'
                  }}
              />
              {errors.fullName && <span className="error-message">{errors.fullName}</span>}
            </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <TextFormatControls
                  value={formData.personalInfo.email}
                  onChange={(formatType, value) => handleInputChange('personalInfo', 'email', value, null, formatType)}
                />
                <input
                  type="email"
                  id="email"
                  value={formData.personalInfo.email.text}
                  onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                  className={errors.email ? 'error' : ''}
                  style={{
                    fontFamily: formData.personalInfo.email.fontStyle,
                    fontSize: formData.personalInfo.email.fontSize,
                    fontWeight: formData.personalInfo.email.bold ? 'bold' : 'normal',
                    fontStyle: formData.personalInfo.email.italic ? 'italic' : 'normal'
                  }}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
              </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <TextFormatControls
                  value={formData.personalInfo.phone}
                  onChange={(formatType, value) => handleInputChange('personalInfo', 'phone', value, null, formatType)}
                />
                <input
                  type="tel"
                  id="phone"
                  value={formData.personalInfo.phone.text}
                  onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                  className={errors.phone ? 'error' : ''}
                  style={{
                    fontFamily: formData.personalInfo.phone.fontStyle,
                    fontSize: formData.personalInfo.phone.fontSize,
                    fontWeight: formData.personalInfo.phone.bold ? 'bold' : 'normal',
                    fontStyle: formData.personalInfo.phone.italic ? 'italic' : 'normal'
                  }}
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
                <TextFormatControls
                  value={formData.personalInfo.address}
                  onChange={(formatType, value) => handleInputChange('personalInfo', 'address', value, null, formatType)}
                />
              <input
                type="text"
                id="address"
                  value={formData.personalInfo.address.text}
                onChange={(e) => handleInputChange('personalInfo', 'address', e.target.value)}
                  style={{
                    fontFamily: formData.personalInfo.address.fontStyle,
                    fontSize: formData.personalInfo.address.fontSize,
                    fontWeight: formData.personalInfo.address.bold ? 'bold' : 'normal',
                    fontStyle: formData.personalInfo.address.italic ? 'italic' : 'normal'
                  }}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City</label>
                <TextFormatControls
                  value={formData.personalInfo.city}
                  onChange={(formatType, value) => handleInputChange('personalInfo', 'city', value, null, formatType)}
                />
                <input
                  type="text"
                  id="city"
                  value={formData.personalInfo.city.text}
                  onChange={(e) => handleInputChange('personalInfo', 'city', e.target.value)}
                  style={{
                    fontFamily: formData.personalInfo.city.fontStyle,
                    fontSize: formData.personalInfo.city.fontSize,
                    fontWeight: formData.personalInfo.city.bold ? 'bold' : 'normal',
                    fontStyle: formData.personalInfo.city.italic ? 'italic' : 'normal'
                  }}
                />
              </div>

              <div className="form-group">
                <label htmlFor="state">State</label>
                <TextFormatControls
                  value={formData.personalInfo.state}
                  onChange={(formatType, value) => handleInputChange('personalInfo', 'state', value, null, formatType)}
                />
                <input
                  type="text"
                  id="state"
                  value={formData.personalInfo.state.text}
                  onChange={(e) => handleInputChange('personalInfo', 'state', e.target.value)}
                  style={{
                    fontFamily: formData.personalInfo.state.fontStyle,
                    fontSize: formData.personalInfo.state.fontSize,
                    fontWeight: formData.personalInfo.state.bold ? 'bold' : 'normal',
                    fontStyle: formData.personalInfo.state.italic ? 'italic' : 'normal'
                  }}
                />
              </div>

              <div className="form-group">
                <label htmlFor="zipCode">Zip Code</label>
                <TextFormatControls
                  value={formData.personalInfo.zipCode}
                  onChange={(formatType, value) => handleInputChange('personalInfo', 'zipCode', value, null, formatType)}
                />
                <input
                  type="text"
                  id="zipCode"
                  value={formData.personalInfo.zipCode.text}
                  onChange={(e) => handleInputChange('personalInfo', 'zipCode', e.target.value)}
                  style={{
                    fontFamily: formData.personalInfo.zipCode.fontStyle,
                    fontSize: formData.personalInfo.zipCode.fontSize,
                    fontWeight: formData.personalInfo.zipCode.bold ? 'bold' : 'normal',
                    fontStyle: formData.personalInfo.zipCode.italic ? 'italic' : 'normal'
                  }}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="linkedin">LinkedIn Profile</label>
                <TextFormatControls
                  value={formData.personalInfo.linkedin}
                  onChange={(formatType, value) => handleInputChange('personalInfo', 'linkedin', value, null, formatType)}
                />
                <input
                  type="url"
                  id="linkedin"
                  value={formData.personalInfo.linkedin.text}
                  onChange={(e) => handleInputChange('personalInfo', 'linkedin', e.target.value)}
                  style={{
                    fontFamily: formData.personalInfo.linkedin.fontStyle,
                    fontSize: formData.personalInfo.linkedin.fontSize,
                    fontWeight: formData.personalInfo.linkedin.bold ? 'bold' : 'normal',
                    fontStyle: formData.personalInfo.linkedin.italic ? 'italic' : 'normal'
                  }}
                />
              </div>

              <div className="form-group">
                <label htmlFor="portfolio">Portfolio/Website</label>
                <TextFormatControls
                  value={formData.personalInfo.portfolio}
                  onChange={(formatType, value) => handleInputChange('personalInfo', 'portfolio', value, null, formatType)}
                />
                <input
                  type="url"
                  id="portfolio"
                  value={formData.personalInfo.portfolio.text}
                  onChange={(e) => handleInputChange('personalInfo', 'portfolio', e.target.value)}
                  style={{
                    fontFamily: formData.personalInfo.portfolio.fontStyle,
                    fontSize: formData.personalInfo.portfolio.fontSize,
                    fontWeight: formData.personalInfo.portfolio.bold ? 'bold' : 'normal',
                    fontStyle: formData.personalInfo.portfolio.italic ? 'italic' : 'normal'
                  }}
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
              <TextFormatControls
                value={formData.professionalSummary}
                onChange={(formatType, value) => handleInputChange('professionalSummary', null, value, null, formatType)}
              />
              <textarea
                id="professionalSummary"
                value={formData.professionalSummary.text}
                onChange={(e) => handleInputChange('professionalSummary', null, e.target.value)}
                rows="6"
                className={errors.professionalSummary ? 'error' : ''}
                style={{
                  fontFamily: formData.professionalSummary.fontStyle,
                  fontSize: formData.professionalSummary.fontSize,
                  fontWeight: formData.professionalSummary.bold ? 'bold' : 'normal',
                  fontStyle: formData.professionalSummary.italic ? 'italic' : 'normal'
                }}
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
                    <TextFormatControls
                      value={exp.title}
                      onChange={(formatType, value) => handleInputChange('experience', 'title', value, index, formatType)}
                    />
                    <input
                      type="text"
                      value={exp.title.text}
                      onChange={(e) => handleInputChange('experience', 'title', e.target.value, index)}
                      className={errors[`experience_${index}_title`] ? 'error' : ''}
                      style={{
                        fontFamily: exp.title.fontStyle,
                        fontSize: exp.title.fontSize,
                        fontWeight: exp.title.bold ? 'bold' : 'normal',
                        fontStyle: exp.title.italic ? 'italic' : 'normal'
                      }}
                    />
                    {errors[`experience_${index}_title`] && (
                      <span className="error-message">{errors[`experience_${index}_title`]}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Company *</label>
                    <TextFormatControls
                      value={exp.company}
                      onChange={(formatType, value) => handleInputChange('experience', 'company', value, index, formatType)}
                    />
                    <input
                      type="text"
                      value={exp.company.text}
                      onChange={(e) => handleInputChange('experience', 'company', e.target.value, index)}
                      className={errors[`experience_${index}_company`] ? 'error' : ''}
                      style={{
                        fontFamily: exp.company.fontStyle,
                        fontSize: exp.company.fontSize,
                        fontWeight: exp.company.bold ? 'bold' : 'normal',
                        fontStyle: exp.company.italic ? 'italic' : 'normal'
                      }}
                    />
                    {errors[`experience_${index}_company`] && (
                      <span className="error-message">{errors[`experience_${index}_company`]}</span>
                    )}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Location</label>
                    <TextFormatControls
                      value={exp.location}
                      onChange={(formatType, value) => handleInputChange('experience', 'location', value, index, formatType)}
                    />
                    <input
                      type="text"
                      value={exp.location.text}
                      onChange={(e) => handleInputChange('experience', 'location', e.target.value, index)}
                      style={{
                        fontFamily: exp.location.fontStyle,
                        fontSize: exp.location.fontSize,
                        fontWeight: exp.location.bold ? 'bold' : 'normal',
                        fontStyle: exp.location.italic ? 'italic' : 'normal'
                      }}
                    />
                  </div>

                  <div className="form-group">
                    <label>Start Date</label>
                    <input
                      type="date"
                      value={exp.startDate}
                      onChange={(e) => handleInputChange('experience', 'startDate', e.target.value, index)}
                      max={exp.endDate || new Date().toISOString().split('T')[0]}
                      className="date-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>End Date</label>
                    <input
                      type="date"
                      value={exp.endDate}
                      onChange={(e) => handleInputChange('experience', 'endDate', e.target.value, index)}
                      min={exp.startDate}
                      max={new Date().toISOString().split('T')[0]}
                      disabled={exp.current}
                      className="date-input"
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
                  <TextFormatControls
                    value={exp.description}
                    onChange={(formatType, value) => handleInputChange('experience', 'description', value, index, formatType)}
                  />
                  <textarea
                    value={exp.description.text}
                    onChange={(e) => handleInputChange('experience', 'description', e.target.value, index)}
                    rows="4"
                    style={{
                      fontFamily: exp.description.fontStyle,
                      fontSize: exp.description.fontSize,
                      fontWeight: exp.description.bold ? 'bold' : 'normal',
                      fontStyle: exp.description.italic ? 'italic' : 'normal'
                    }}
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
                <TextFormatControls
                  value={skill}
                  onChange={(formatType, value) => handleInputChange('skills', null, value, index, formatType)}
                />
                <div className="input-row">
                  <input
                    type="text"
                    value={skill.text}
                    onChange={(e) => handleInputChange('skills', null, e.target.value, index)}
                    placeholder="Enter a skill"
                    className={errors.skills && !skill.text.trim() ? 'error' : ''}
                    style={{
                      fontFamily: skill.fontStyle,
                      fontSize: skill.fontSize,
                      fontWeight: skill.bold ? 'bold' : 'normal',
                      fontStyle: skill.italic ? 'italic' : 'normal'
                    }}
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
                    <TextFormatControls
                      value={edu.school}
                      onChange={(formatType, value) => handleInputChange('education', 'school', value, index, formatType)}
                    />
                    <input
                      type="text"
                      value={edu.school.text}
                      onChange={(e) => handleInputChange('education', 'school', e.target.value, index)}
                      className={errors[`education_${index}_school`] ? 'error' : ''}
                      style={{
                        fontFamily: edu.school.fontStyle,
                        fontSize: edu.school.fontSize,
                        fontWeight: edu.school.bold ? 'bold' : 'normal',
                        fontStyle: edu.school.italic ? 'italic' : 'normal'
                      }}
                    />
                    {errors[`education_${index}_school`] && (
                      <span className="error-message">{errors[`education_${index}_school`]}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Degree *</label>
                    <TextFormatControls
                      value={edu.degree}
                      onChange={(formatType, value) => handleInputChange('education', 'degree', value, index, formatType)}
                    />
                    <input
                      type="text"
                      value={edu.degree.text}
                      onChange={(e) => handleInputChange('education', 'degree', e.target.value, index)}
                      className={errors[`education_${index}_degree`] ? 'error' : ''}
                      style={{
                        fontFamily: edu.degree.fontStyle,
                        fontSize: edu.degree.fontSize,
                        fontWeight: edu.degree.bold ? 'bold' : 'normal',
                        fontStyle: edu.degree.italic ? 'italic' : 'normal'
                      }}
                    />
                    {errors[`education_${index}_degree`] && (
                      <span className="error-message">{errors[`education_${index}_degree`]}</span>
                    )}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Field of Study</label>
                    <TextFormatControls
                      value={edu.fieldOfStudy}
                      onChange={(formatType, value) => handleInputChange('education', 'fieldOfStudy', value, index, formatType)}
                    />
                    <input
                      type="text"
                      value={edu.fieldOfStudy.text}
                      onChange={(e) => handleInputChange('education', 'fieldOfStudy', e.target.value, index)}
                      style={{
                        fontFamily: edu.fieldOfStudy.fontStyle,
                        fontSize: edu.fieldOfStudy.fontSize,
                        fontWeight: edu.fieldOfStudy.bold ? 'bold' : 'normal',
                        fontStyle: edu.fieldOfStudy.italic ? 'italic' : 'normal'
                      }}
                    />
                  </div>

                  <div className="form-group">
                    <label>Start Date</label>
                    <input
                      type="date"
                      value={edu.startDate}
                      onChange={(e) => handleInputChange('education', 'startDate', e.target.value, index)}
                      max={edu.endDate || new Date().toISOString().split('T')[0]}
                      className="date-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>End Date</label>
                    <input
                      type="date"
                      value={edu.endDate}
                      onChange={(e) => handleInputChange('education', 'endDate', e.target.value, index)}
                      min={edu.startDate}
                      max={new Date().toISOString().split('T')[0]}
                      disabled={edu.current}
                      className="date-input"
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
                  <TextFormatControls
                    value={edu.description}
                    onChange={(formatType, value) => handleInputChange('education', 'description', value, index, formatType)}
                  />
                  <textarea
                    value={edu.description.text}
                    onChange={(e) => handleInputChange('education', 'description', e.target.value, index)}
                    rows="4"
                    style={{
                      fontFamily: edu.description.fontStyle,
                      fontSize: edu.description.fontSize,
                      fontWeight: edu.description.bold ? 'bold' : 'normal',
                      fontStyle: edu.description.italic ? 'italic' : 'normal'
                    }}
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
                      <TextFormatControls
                        value={cert.name}
                        onChange={(formatType, value) => handleInputChange('certifications', 'name', value, index, formatType)}
                      />
                      <input
                        type="text"
                        value={cert.name.text}
                        onChange={(e) => handleInputChange('certifications', 'name', e.target.value, index)}
                        style={{
                          fontFamily: cert.name.fontStyle,
                          fontSize: cert.name.fontSize,
                          fontWeight: cert.name.bold ? 'bold' : 'normal',
                          fontStyle: cert.name.italic ? 'italic' : 'normal'
                        }}
                      />
                    </div>

                    <div className="form-group">
                      <label>Issuing Organization</label>
                      <TextFormatControls
                        value={cert.issuer}
                        onChange={(formatType, value) => handleInputChange('certifications', 'issuer', value, index, formatType)}
                      />
                      <input
                        type="text"
                        value={cert.issuer.text}
                        onChange={(e) => handleInputChange('certifications', 'issuer', e.target.value, index)}
                        style={{
                          fontFamily: cert.issuer.fontStyle,
                          fontSize: cert.issuer.fontSize,
                          fontWeight: cert.issuer.bold ? 'bold' : 'normal',
                          fontStyle: cert.issuer.italic ? 'italic' : 'normal'
                        }}
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
                        max={cert.expiryDate || new Date().toISOString().split('T')[0]}
                        className="date-input"
                      />
                    </div>

                    <div className="form-group">
                      <label>Expiry Date (if applicable)</label>
                      <input
                        type="date"
                        value={cert.expiryDate}
                        onChange={(e) => handleInputChange('certifications', 'expiryDate', e.target.value, index)}
                        min={cert.issueDate}
                        className="date-input"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Description</label>
                    <TextFormatControls
                      value={cert.description}
                      onChange={(formatType, value) => handleInputChange('certifications', 'description', value, index, formatType)}
                    />
                    <textarea
                      value={cert.description.text}
                      onChange={(e) => handleInputChange('certifications', 'description', e.target.value, index)}
                      rows="3"
                      style={{
                        fontFamily: cert.description.fontStyle,
                        fontSize: cert.description.fontSize,
                        fontWeight: cert.description.bold ? 'bold' : 'normal',
                        fontStyle: cert.description.italic ? 'italic' : 'normal'
                      }}
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
                      <TextFormatControls
                        value={lang.language}
                        onChange={(formatType, value) => handleInputChange('languages', 'language', value, index, formatType)}
                      />
                      <input
                        type="text"
                        value={lang.language.text}
                        onChange={(e) => handleInputChange('languages', 'language', e.target.value, index)}
                        style={{
                          fontFamily: lang.language.fontStyle,
                          fontSize: lang.language.fontSize,
                          fontWeight: lang.language.bold ? 'bold' : 'normal',
                          fontStyle: lang.language.italic ? 'italic' : 'normal'
                        }}
                      />
                    </div>

                    <div className="form-group">
                      <label>Proficiency</label>
                      <select
                        value={lang.proficiency}
                        onChange={(e) => handleInputChange('languages', 'proficiency', e.target.value, index)}
                        className="proficiency-select"
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
  onSubmit: PropTypes.func,
  initialFormData: PropTypes.object,
  isEditing: PropTypes.bool
};

ResumeForm.defaultProps = {
  onSubmit: null,
  initialFormData: null,
  isEditing: false
};

export default ResumeForm;