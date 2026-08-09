import React from 'react';

const JobCard = ({ job, onEdit, onDelete, onView }) => {
  const getBadgeClass = (status) => {
    switch (status) {
      case 'Applied': return 'badge applied';
      case 'Interview': return 'badge interview';
      case 'Selected': return 'badge selected';
      case 'Rejected': return 'badge rejected';
      default: return 'badge';
    }
  };

  const formattedDate = job.appliedDate ? new Date(job.appliedDate).toLocaleDateString() : 'N/A';

  return (
    <div className="job-card">
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="company">{job.company}</span>
          <span className={getBadgeClass(job.status)}>{job.status}</span>
        </div>
        <h3 className="role">{job.role}</h3>
        <div className="details">
          <p>📍 {job.location || 'Remote'}</p>
          <p>💰 {job.salary || 'N/A'}</p>
          <p>📅 {formattedDate}</p>
        </div>
      </div>

      <div className="actions">
        <button onClick={() => onView(job)} className="btn btn-secondary btn-sm">View</button>
        <button onClick={() => onEdit(job)} className="btn btn-primary btn-sm">Edit</button>
        <button onClick={() => onDelete(job._id)} className="btn btn-danger btn-sm">Delete</button>
      </div>
    </div>
  );
};

export default JobCard;
