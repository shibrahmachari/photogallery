import React, {useState, useEffect,Component } from 'react';
import axios from 'axios';

import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import  Gallery from './components/gallery';
import { Button } from 'bootstrap';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: sans-serif;
  }
`;

const WrapperImages = styled.section`
  max-width: 70rem;
  margin: 4rem auto;
  display: grid;
  grid-gap: 1em;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-auto-rows: 300px;
`;

function App() {

  const[images, setImage] = useState([]);
  const [seconds, setSeconds] = useState(0)
  const [minutes, setMinutes] = useState(5)

  useEffect(() => {
     getimages();
  }, [] )
  
 

  

  const getimages= (cnt= 16)=>{
    const base = "https://api.unsplash.com";

    axios
      .get(`${base}/photos/random?client_id=u_leU8kj-a8YJKmqkW1zYONnsYU4SxcCWBow6WYJb2Q&count=${cnt}`)
      .then(res => {
        setImage([...images, ...res.data]);
      })
  }

 

  useEffect(() => {
    // use set timeout and be confident because updateTime will cause rerender
    // rerender mean re call this effect => then it will be similar to how setinterval works
    // but with easy to understand logic
    const token = setTimeout(updateTime, 1000)

    return function cleanUp() {
      clearTimeout(token);
    }})

  return (

    <div>
    <GlobalStyle />
    <p>
    time: {minutes}:{seconds}
  </p>
      <h1 className="text-center m-4 fw-bolder" > PhotoGallery </h1>
        <WrapperImages>
        {images.map(image => (
          <Gallery url={image.urls.thumb} key={image.id} />
        ))}
      </WrapperImages>
   </div>

  );
}

export default App;
