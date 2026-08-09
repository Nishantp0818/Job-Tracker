import React from 'react';

const JobDetailsModal = ({ isOpen, onClose, job }) => {
  if (!isOpen || !job) return null;

  const formattedDate = job.appliedDate ? new Date(job.appliedDate).toLocaleDateString() : 'N/A';

  return (
    <div className="overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>Job Details</h3>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <span className="label">Company</span>
            <h2>{job.company}</h2>
          </div>

          <div>
            <span className="label">Role</span>
            <p style={{ fontSize: '16px', fontWeight: 600 }}>{job.role}</p>
          </div>

          <div>
            <span className="label">Status</span>
            <p><span className={`badge ${job.status?.toLowerCase()}`}>{job.status}</span></p>
          </div>

          <div>
            <span className="label">Location</span>
            <p>{job.location || 'Remote'}</p>
          </div>

          <div>
            <span className="label">Salary</span>
            <p>{job.salary || 'N/A'}</p>
          </div>

          <div>
            <span className="label">Date Applied</span>
            <p>{formattedDate}</p>
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={onClose} className="btn btn-secondary">Close</button>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsModal;
