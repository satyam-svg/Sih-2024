import React from 'react';
import './navbar.css'
const Page = () => {
  return (
    <section className='flex items-center justify-between p-4'>
      <ul className='flex flex-row space-x-4 list-none p-0 m-0'>
        <div>
      <h2 style={{ fontFamily: 'Irish Grover, cursive', fontSize: '2rem' }}>DocuVer</h2>
      </div>
      <div className='navbar'>
        <li>What is DocuVer</li>
        <li >Platform</li>
        <li >Solutions</li>
        <li >Resources</li>
        <li >About</li>
        <li >Contact</li>
        </div>

        <div className='login'>Log in</div>
      </ul>
      
    </section>
  );
}

export default Page;
