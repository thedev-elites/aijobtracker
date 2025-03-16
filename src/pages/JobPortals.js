import React from 'react';
import '../assets/css/JobPortals.css';

const jobListings = [
  {
    id: 1,
    title: 'Frontend Developer',
    company: 'Tech Solutions Inc.',
    location: 'San Francisco, CA',
    description: 'We are looking for a skilled Frontend Developer with experience in React.js to join our team.',
    requirements: 'React.js, JavaScript, HTML, CSS, 3+ years experience',
    salary: '$90,000 - $120,000',
    rating: 4.5
  },
  {
    id: 2,
    title: 'Backend Engineer',
    company: 'Data Systems',
    location: 'Remote',
    description: 'Join our team as a Backend Engineer to develop scalable and efficient server-side applications.',
    requirements: 'Node.js, Express, MongoDB, 2+ years experience',
    salary: '$85,000 - $110,000',
    rating: 4.2
  },
  {
    id: 3,
    title: 'Full Stack Developer',
    company: 'WebApp Innovations',
    location: 'New York, NY',
    description: 'Looking for a Full Stack Developer to work on exciting projects using modern technologies.',
    requirements: 'React, Node.js, SQL, 4+ years experience',
    salary: '$100,000 - $130,000',
    rating: 4.7
  }
];

const JobPortals = () => {
  return (
    <div className="job-portals-page">
      <div className="page-header">
        <h1>Job Portals</h1>
        <p>Find job opportunities that match your skills and experience</p>
      </div>
      
      <div className="job-search">
        <input 
          type="text" 
          className="search-input" 
          placeholder="Search for jobs by title, company, or location" 
        />
        <button className="search-btn">Search</button>
      </div>
      
      <div className="job-listings">
        {jobListings.map(job => (
          <div key={job.id} className="job-card">
            <div className="job-header">
              <h2>{job.title}</h2>
              <div className="company-rating">
                <span className="rating">{job.rating}</span>
                <span className="stars">
                  {'★'.repeat(Math.floor(job.rating))}
                  {job.rating % 1 !== 0 ? '½' : ''}
                  {'☆'.repeat(5 - Math.ceil(job.rating))}
                </span>
              </div>
            </div>
            
            <div className="job-company">
              <p>{job.company}</p>
              <p>{job.location}</p>
            </div>
            
            <div className="job-description">
              <p>{job.description}</p>
            </div>
            
            <div className="job-details">
              <div className="detail-item">
                <h4>Requirements:</h4>
                <p>{job.requirements}</p>
              </div>
              <div className="detail-item">
                <h4>Salary Range:</h4>
                <p>{job.salary}</p>
              </div>
            </div>
            
            <div className="job-actions">
              <button className="btn-primary">Apply Now</button>
              <button className="btn-secondary">Save Job</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobPortals;