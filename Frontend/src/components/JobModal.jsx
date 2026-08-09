import React, { useState, useEffect } from 'react';

const JobModal = ({ isOpen, onClose, onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    location: '',
    salary: '',
    status: 'Applied',
    appliedDate: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        company: initialData.company || '',
        role: initialData.role || '',
        location: initialData.location || '',
        salary: initialData.salary || '',
        status: initialData.status || 'Applied',
        appliedDate: initialData.appliedDate
          ? new Date(initialData.appliedDate).toISOString().split('T')[0]
          : new Date().toISOString().split('T')[0],
      });
    } else {
      setFormData({
        company: '',
        role: '',
        location: '',
        salary: '',
        status: 'Applied',
        appliedDate: new Date().toISOString().split('T')[0],
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData);
    onClose();
  };

  return (
    <div className="overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>{initialData ? 'Edit Job' : 'Add New Job'}</h3>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body form">
            <div className="field">
              <label className="label">Company</label>
              <input
                type="text"
                name="company"
                required
                value={formData.company}
                onChange={handleChange}
                placeholder="Company Name"
                className="input"
              />
            </div>

            <div className="field">
              <label className="label">Role</label>
              <input
                type="text"
                name="role"
                required
                value={formData.role}
                onChange={handleChange}
                placeholder="Job Role / Title"
                className="input"
              />
            </div>

            <div className="field">
              <label className="label">Location</label>
              <input
                type="text"
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                placeholder="Location (e.g. Remote / NYC)"
                className="input"
              />
            </div>

            <div className="field">
              <label className="label">Salary</label>
              <input
                type="text"
                name="salary"
                required
                value={formData.salary}
                onChange={handleChange}
                placeholder="Salary Package"
                className="input"
              />
            </div>

            <div className="field">
              <label className="label">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="select"
              >
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Selected">Selected</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div className="field">
              <label className="label">Applied Date</label>
              <input
                type="date"
                name="appliedDate"
                value={formData.appliedDate}
                onChange={handleChange}
                className="input"
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" onClick={onClose} className="btn btn-secondary">Cancel</button>
            <button type="submit" className="btn btn-primary">{initialData ? 'Save Changes' : 'Add Job'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobModal;
