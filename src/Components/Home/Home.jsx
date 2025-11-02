import React from 'react';
import './Home.css';
import { FaMoneyBillWave, FaChartLine, FaFileInvoiceDollar, FaPiggyBank, FaShieldAlt, FaArrowRight } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-card">
          <h1>Take Control of Your Finances</h1>
          <p className="hero-subtitle">
            Track expenses, manage income, and achieve your savings goals - all in one place.
          </p>
          <div className="hero-buttons">
            <a href="/signup" className="btn-primary">
              Get Started <FaArrowRight />
            </a>
            <a href="/login" className="btn-secondary">
              Login
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Everything You Need to Manage Your Money</h2>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon expense">
              <FaMoneyBillWave size={32} />
            </div>
            <h3>Track Expenses</h3>
            <p>Monitor your spending habits and categorize expenses by week</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon income">
              <FaChartLine size={32} />
            </div>
            <h3>Manage Income</h3>
            <p>Record weekly, fortnightly, and monthly income sources</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon bills">
              <FaFileInvoiceDollar size={32} />
            </div>
            <h3>Bills Tracker</h3>
            <p>Never miss a payment with automatic bill tracking</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon savings">
              <FaPiggyBank size={32} />
            </div>
            <h3>Savings Goals</h3>
            <p>Set and achieve your financial goals with ease</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Simple</h3>
            <p>Easy to use interface designed for everyone</p>
          </div>
          <div className="stat-card">
            <h3>Secure</h3>
            <p>Your data is encrypted and protected</p>
          </div>
          <div className="stat-card">
            <h3>Free</h3>
            <p>100% free to use, no hidden fees</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-card">
          <h2>Ready to Start?</h2>
          <p>Join thousands of users managing their finances smarter</p>
          <a href="/signup" className="btn-cta">
            Create Free Account
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <p>&copy; 2025 Budget Tracker. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;