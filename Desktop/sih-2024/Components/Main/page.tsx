"use client"
import  React, { useEffect, useState } from 'react'
import './main.css'
const page = () => {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    setIsAnimated(true); // Trigger the animation when the component mounts
  }, []);
  return (
    <div className='main-screen'>
        <h1>WHAT IS DOCVERIFICATION?</h1>
        <header>
          <h2>The Future Of Cyber Security Is Here </h2>

          <div className="line_content" style={{ display: 'flex' }}>
          <div className={`line ${isAnimated ? 'animate' : ''}`}></div>

  <h3 style={{ marginLeft: '2rem' ,width:'40vw',display:'flex', flexDirection:'column',gap:'1rem'}}>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia itaque perspiciatis laudantium eum atque praesentium at labore a optio suscipit quos nulla nemo dicta, totam doloribus? Expedita, reprehenderit. Inventore, voluptate?


    <section style={{display:'flex',gap:'0.3rem'}}>

    

    <button style={{
      border:'2px solid black',
      backgroundColor:'yellow',
      width:'10vw',
      height:'7vh',
      borderRadius:'0.5rem',
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      color:'black',
      fontWeight:'bold'

    }}>See More</button>

<button style={{
      border:'2px solid white',
      width:'15vw',
      height:'7vh',
      borderRadius:'0.5rem',
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      color:'white',
      fontWeight:'bold'

    }}>Download Resources</button>
    </section>
  </h3>
</div>

        </header>
    </div>
  )
}

export default page
