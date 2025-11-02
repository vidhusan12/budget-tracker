import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Budget Tracker</h1>
          <p className="hero-subtitle">
            Take control of your finances with our easy-to-use budget tracking app
          </p>
          <p className="hero-description">
            Track expenses, manage income, monitor bills, and achieve your savings goals - all in one place.
          </p>

          <div className="hero-buttons">
            <a href="/signup" className="btn btn-primary">
              Get Started
            </a>
            <a href="/login" className="btn btn-secondary">
              Login
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="features-title">Why Choose Budget Tracker?</h2>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>Track Expenses</h3>
            <p>Monitor your spending habits and categorize expenses effortlessly</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💵</div>
            <h3>Manage Income</h3>
            <p>Record all your income sources and track your earnings over time</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📋</div>
            <h3>Bills Reminder</h3>
            <p>Never miss a payment with our bills tracking and reminder system</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Savings Goals</h3>
            <p>Set and achieve your financial goals with our savings tracker</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Visual Reports</h3>
            <p>Get insights with beautiful charts and detailed financial reports</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure & Private</h3>
            <p>Your financial data is encrypted and protected with industry-standard security</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <h2>Ready to take control of your finances?</h2>
        <p>Join thousands of users who are already managing their money smarter</p>
        <a href="/signup" className="btn btn-large">
          Start Tracking Today - It's Free!
        </a>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <p>&copy; 2024 Budget Tracker. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;