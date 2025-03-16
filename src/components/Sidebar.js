import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/Sidebar.css';

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [showPanel, setShowPanel] = useState(false);

  // Mock data for notifications/messages
  const notifications = [
    { id: 1, title: 'New Job Match', message: 'A new job matching your profile is available' },
    { id: 2, title: 'Interview Scheduled', message: 'Your interview with Tech Corp is scheduled for tomorrow' },
  ];

  // Mock data for assistant resources
  const resources = [
    { id: 1, title: 'Interview Preparation', link: '#', type: 'PDF' },
    { id: 2, title: 'Technical Questions', link: '#', type: 'Guide' },
    { id: 3, title: 'Resume Tips', link: '#', type: 'Video' },
  ];

  const handleTabClick = (tab) => {
    if (activeTab === tab) {
      setShowPanel(false);
      setActiveTab(null);
    } else {
      setActiveTab(tab);
      setShowPanel(true);
    }
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar">
        <div 
          className={`sidebar-icon ${activeTab === 'inbox' ? 'active' : ''}`}
          onClick={() => handleTabClick('inbox')}
        >
          <i className="fas fa-envelope"></i>
          <span className="tooltip">Inbox</span>
        </div>

        <div 
          className={`sidebar-icon ${activeTab === 'resume' ? 'active' : ''}`}
          onClick={() => handleTabClick('resume')}
        >
          <i className="fas fa-file-alt"></i>
          <span className="tooltip">Resume</span>
        </div>

        <div 
          className={`sidebar-icon ${activeTab === 'assistant' ? 'active' : ''}`}
          onClick={() => handleTabClick('assistant')}
        >
          <i className="fas fa-robot"></i>
          <span className="tooltip">Assistant</span>
        </div>

        <div 
          className={`sidebar-icon ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => handleTabClick('profile')}
        >
          <i className="fas fa-user-circle"></i>
          <span className="tooltip">Profile</span>
        </div>
      </div>

      {showPanel && (
        <div className="sidebar-panel">
          {activeTab === 'inbox' && (
            <div className="panel-content">
              <h3>Notifications</h3>
              <div className="notifications-list">
                {notifications.map(notification => (
                  <div key={notification.id} className="notification-item">
                    <h4>{notification.title}</h4>
                    <p>{notification.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'resume' && (
            <div className="panel-content">
              <h3>Your Resumes</h3>
              <div className="resume-list">
                <div className="resume-item">
                  <h4>Software Developer Resume</h4>
                  <p>Last updated: 2 days ago</p>
                  <button className="btn-secondary">View</button>
                </div>
                <div className="resume-item">
                  <h4>UI/UX Designer Resume</h4>
                  <p>Last updated: 5 days ago</p>
                  <button className="btn-secondary">View</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'assistant' && (
            <div className="panel-content">
              <h3>Career Resources</h3>
              <div className="resources-list">
                {resources.map(resource => (
                  <div key={resource.id} className="resource-item">
                    <h4>{resource.title}</h4>
                    <p>Type: {resource.type}</p>
                    <a href={resource.link} className="btn-secondary">Access Resource</a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="panel-content">
              <h3>Profile Overview</h3>
              <div className="profile-info">
                <div className="profile-header">
                  <div className="profile-avatar">
                    <i className="fas fa-user-circle"></i>
                  </div>
                  <div className="profile-details">
                    <h4>John Doe</h4>
                    <p>Software Developer</p>
                  </div>
                </div>
                <div className="profile-stats">
                  <div className="stat-item">
                    <h5>Applications</h5>
                    <p>12</p>
                  </div>
                  <div className="stat-item">
                    <h5>Interviews</h5>
                    <p>3</p>
                  </div>
                  <div className="stat-item">
                    <h5>Saved Jobs</h5>
                    <p>8</p>
                  </div>
                </div>
                <Link to="/profile" className="btn-primary">View Full Profile</Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Sidebar; 