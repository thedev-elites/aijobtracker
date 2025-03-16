import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../assets/css/Home.css';

// Import local resume images
import resume1 from '../assets/images/resume1.avif';
import resume2 from '../assets/images/resume2.jpg';
import resume3 from '../assets/images/resume3.png';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Build Your Professional Resume Today</h1>
          <p>Create stunning resumes in minutes and land your dream job</p>
          <div className="get-started-card">
            <h2>Ready to boost your career?</h2>
            <p>Create a professional resume that stands out from the crowd.</p>
            {isAuthenticated ? (
              <Link to="/resume-templates" className="btn-primary">Get Started</Link>
            ) : (
              <Link to="/login" className="btn-primary">Get Started</Link>
            )}
          </div>
        </div>
      </section>

      {/* Office Images Section */}
      <section className="office-images-section">
        <h2>Join Thousands of Successful Professionals</h2>
        <div className="image-gallery">
          <div className="image-card">
            <div className="image-wrapper">
              <img 
                src={resume1} 
                alt="Professional resume example" 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/400x300?text=Resume+Example';
                }}
              />
            </div>
            <p>Create a resume that gets noticed</p>
          </div>
          <div className="image-card">
            <div className="image-wrapper">
              <img 
                src={resume2} 
                alt="Professional resume template" 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/400x300?text=Resume+Template';
                }}
              />
            </div>
            <p>Choose from professional templates</p>
          </div>
          <div className="image-card">
            <div className="image-wrapper">
              <img 
                src={resume3} 
                alt="Modern resume design" 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/400x300?text=Resume+Design';
                }}
              />
            </div>
            <p>Find job opportunities that match your skills</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Choose Our Resume Builder?</h2>
        <div className="features-container">
          <div className="feature-card">
            <i className="feature-icon">📝</i>
            <h3>Easy to Use</h3>
            <p>Simple step-by-step process to create your resume</p>
          </div>
          <div className="feature-card">
            <i className="feature-icon">🎨</i>
            <h3>Professional Templates</h3>
            <p>Choose from a variety of professionally designed templates</p>
          </div>
          <div className="feature-card">
            <i className="feature-icon">💼</i>
            <h3>Job Matching</h3>
            <p>Find job opportunities that match your skills and experience</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 