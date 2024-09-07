"use client"; // Ensure this component is treated as a client component

import React from 'react';
import './login.css';

const Page = () => {
  return (
    <section className="login1">
    <div className="content">
      <div className="text">
        Login Form
      </div>
      <form action="#">
        <div className="field">
          <input type="text" required />
          <span className="fas fa-user"></span>
          <label>Email or Phone</label>
        </div>
        <div className="field">
          <input type="password" required />
          <span className="fas fa-lock"></span>
          <label>Password</label>
        </div>
        <div className="forgot-pass">
          <a href="#">Forgot Password?</a>
        </div>
        <button>Sign in</button>
        <div className="sign-up">
          Not a member?
          <a href="#">signup now</a>
        </div>
      </form>
    </div>
    </section>
  );
};

export default Page;
