import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import Navbar from '../components/Navbar';
import StatsCards from '../components/StatsCards';
import JobCard from '../components/JobCard';
import JobModal from '../components/JobModal';
import JobDetailsModal from '../components/JobDetailsModal';

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [viewingJob, setViewingJob] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await API.get('/jobs');
      setJobs(res.data.job || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load jobs.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateJob = async (jobData) => {
    try {
      const res = await API.post('/jobs', jobData);
      setJobs((prev) => [res.data.job, ...prev]);
    } catch (err) {
      alert(err.response?.data?.message || 'Error adding job.');
    }
  };

  const handleUpdateJob = async (jobData) => {
    if (!editingJob) return;
    try {
      const res = await API.put(`/jobs/${editingJob._id}`, jobData);
      const updated = res.data.updatejob;
      setJobs((prev) => prev.map((j) => (j._id === editingJob._id ? updated : j)));
      setEditingJob(null);
    } catch (err) {
      alert(err.response?.data?.message || 'Error updating job.');
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;
    try {
      await API.delete(`/jobs/${jobId}`);
      setJobs((prev) => prev.filter((j) => j._id !== jobId));
    } catch (err) {
      alert(err.response?.data?.message || 'Error deleting job.');
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      (job.company && job.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (job.role && job.role.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (job.location && job.location.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === 'All' || job.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="app">
      <Navbar />

      <main className="main">
        <div className="container">
          
          <div className="header">
            <div>
              <h1 className="title" style={{ textAlign: 'left', margin: 0 }}>Job Dashboard</h1>
              <p className="subtitle" style={{ textAlign: 'left', margin: 0 }}>Track and manage your job applications</p>
            </div>
            <button onClick={() => setIsAddModalOpen(true)} className="btn btn-primary">
              + Add Job
            </button>
          </div>

          <StatsCards jobs={jobs} activeFilter={statusFilter} setFilter={setStatusFilter} />

          <div className="toolbar">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search by company, role, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input"
              />
            </div>

            <div className="filter-group">
              {['All', 'Applied', 'Interview', 'Selected', 'Rejected'].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`filter-btn ${statusFilter === status ? 'active' : ''}`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {error && <div className="alert">{error}</div>}

          {loading ? (
            <div style={{ textAlign: 'center', padding: '50px' }}>Loading jobs...</div>
          ) : filteredJobs.length > 0 ? (
            <div className="job-grid">
              {filteredJobs.map((job) => (
                <JobCard
                  key={job._id}
                  job={job}
                  onEdit={(j) => setEditingJob(j)}
                  onDelete={handleDeleteJob}
                  onView={(j) => setViewingJob(j)}
                />
              ))}
            </div>
          ) : (
            <div className="card" style={{ maxWidth: '500px', margin: '40px auto', textAlign: 'center' }}>
              <h3>No jobs found</h3>
              <p className="subtitle">Start by adding a new job application.</p>
              <button onClick={() => setIsAddModalOpen(true)} className="btn btn-primary">
                + Add First Job
              </button>
            </div>
          )}

        </div>
      </main>

      <JobModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleCreateJob}
      />

      <JobModal
        isOpen={!!editingJob}
        onClose={() => setEditingJob(null)}
        onSubmit={handleUpdateJob}
        initialData={editingJob}
      />

      <JobDetailsModal
        isOpen={!!viewingJob}
        onClose={() => setViewingJob(null)}
        job={viewingJob}
      />
    </div>
  );
};

export default Dashboard;
