import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [Username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await register(Username, email, password);
    setLoading(false);

    if (res.success) {
      navigate('/dashboard');
    } else {
      setError(res.error);
    }
  };

  return (
    <div className="login-page">
      <div className="card">
        <h2 className="title">Create Account</h2>
        <p className="subtitle">Start tracking your job search</p>

        {error && <div className="alert">{error}</div>}

        <form onSubmit={handleSubmit} className="form">
          <div className="field">
            <label className="label">Full Name / Username</label>
            <input
              type="text"
              required
              value={Username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nishant Pandey"
              className="input"
            />
          </div>

          <div className="field">
            <label className="label">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="input"
            />
          </div>

          <div className="field">
            <label className="label">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="input"
            />
          </div>

          <button type="submit" disabled={loading} className="btn btn-primary">
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <p className="center-text">
          Already have an account? <Link to="/login" className="link">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
