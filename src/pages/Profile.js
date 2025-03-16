import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../assets/css/Profile.css';

const Profile = () => {
  const { currentUser } = useAuth();
  
  // Mock data for saved resumes
  const savedResumes = [
    { id: 1, name: 'Software Developer Resume', template: 'Professional', lastUpdated: '2023-05-15' },
    { id: 2, name: 'UX Designer Resume', template: 'Creative', lastUpdated: '2023-06-20' }
  ];
  
  // Mock data for job applications
  const jobApplications = [
    { id: 1, position: 'Frontend Developer', company: 'Tech Solutions Inc.', status: 'Applied', date: '2023-06-25' },
    { id: 2, position: 'UX Designer', company: 'Creative Designs', status: 'Interview Scheduled', date: '2023-07-02' }
  ];
  
  return (
    <div className="profile-page">
      <div className="page-header">
        <h1>My Account</h1>
      </div>
      
      <div className="profile-section">
        <div className="profile-card">
          <h2>Personal Information</h2>
          <div className="profile-info">
            <p><strong>Name:</strong> {currentUser?.name || 'User'}</p>
            <p><strong>Email:</strong> {currentUser?.email || 'user@example.com'}</p>
            <button className="btn-secondary">Edit Profile</button>
          </div>
        </div>
      </div>
      
      <div className="profile-section">
        <div className="section-header">
          <h2>My Resumes</h2>
          <Link to="/resume-templates" className="btn-primary">Create New Resume</Link>
        </div>
        
        <div className="resumes-list">
          {savedResumes.length > 0 ? (
            savedResumes.map(resume => (
              <div key={resume.id} className="resume-item">
                <div className="resume-info">
                  <h3>{resume.name}</h3>
                  <p>Template: {resume.template}</p>
                  <p>Last Updated: {resume.lastUpdated}</p>
                </div>
                <div className="resume-actions">
                  <button className="btn-secondary">Edit</button>
                  <button className="btn-secondary">Download</button>
                  <button className="btn-secondary">Delete</button>
                </div>
              </div>
            ))
          ) : (
            <p className="no-items">You haven't created any resumes yet.</p>
          )}
        </div>
      </div>
      
      <div className="profile-section">
        <div className="section-header">
          <h2>Job Applications</h2>
          <Link to="/job-portals" className="btn-primary">Browse Jobs</Link>
        </div>
        
        <div className="applications-list">
          {jobApplications.length > 0 ? (
            jobApplications.map(application => (
              <div key={application.id} className="application-item">
                <div className="application-info">
                  <h3>{application.position}</h3>
                  <p>Company: {application.company}</p>
                  <p>Status: <span className="status">{application.status}</span></p>
                  <p>Applied on: {application.date}</p>
                </div>
                <div className="application-actions">
                  <button className="btn-secondary">View Details</button>
                </div>
              </div>
            ))
          ) : (
            <p className="no-items">You haven't applied to any jobs yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;