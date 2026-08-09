import React from 'react';

const StatsCards = ({ jobs = [], activeFilter, setFilter }) => {
  const total = jobs.length;
  const applied = jobs.filter(j => j.status === 'Applied').length;
  const interview = jobs.filter(j => j.status === 'Interview').length;
  const selected = jobs.filter(j => j.status === 'Selected').length;
  const rejected = jobs.filter(j => j.status === 'Rejected').length;

  const stats = [
    { label: 'Total Jobs', count: total, key: 'All' },
    { label: 'Applied', count: applied, key: 'Applied' },
    { label: 'Interview', count: interview, key: 'Interview' },
    { label: 'Selected', count: selected, key: 'Selected' },
    { label: 'Rejected', count: rejected, key: 'Rejected' },
  ];

  return (
    <div className="stats">
      {stats.map(({ label, count, key }) => (
        <div
          key={key}
          className="stat-card"
          onClick={() => setFilter(key)}
          style={{ cursor: 'pointer', borderLeft: activeFilter === key ? '4px solid #6366f1' : undefined }}
        >
          <div className="stat-label">{label}</div>
          <div className="stat-number">{count}</div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
