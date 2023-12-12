import React, { useEffect, useState } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';
import styled, { keyframes } from 'styled-components';

const blink = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
`;

const sparkle = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;

const StyledButton = styled.button`
  height: 400px;
  width: 400px;
  font-size: 32px;
  background: linear-gradient(to right, #004d00, #006400);
  color: #fff;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  outline: none;
  transition: background 0.3s ease, transform 0.3s ease;
  animation: ${blink} 1s infinite;

  &:hover {
    animation: ${sparkle} 0.5s infinite;
  }
`;

const containerStyle: React.CSSProperties = {
  width: '100%',
  height: '100vh',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', // Increase the minimum size of the grid cells
  gridAutoRows: '200px', // Increase the height of the grid rows
  color: 'white',
  fontSize: '2em',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
  position: 'relative',
  overflow: 'hidden',
};

const gifStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};

const contentStyle: React.CSSProperties = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 2, // Set a higher z-index value
};

const AppWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(to right, rgba(0, 66, 0, 0.5), rgba(0, 100, 0, 0.7));
`;


interface GifData {
  images: {
    original: {
      url: string;
    };
  };
}

const Home: React.FC = () => {
  const [gifUrls, setGifUrls] = useState<string[]>([]);
  const [currentGifIndexes, setCurrentGifIndexes] = useState<number[]>([]);
  const [counter, setCounter] = useState(0);
  const [isCounting, setIsCounting] = useState(false);
  const [player, setPlayer] = useState<any>(null); 
  const videoId = 'JJyYWCF5BIQ';

  useEffect(() => {
    const fetchRandomGifs = async () => {
      try {
        const apiKey = '8fJKn6mPOa42FNFWkbh8nVVprZpnGZ6P';
        const numGifs = 300;
        const apiUrl = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=christmas&limit=${numGifs}`;
    
        const response = await axios.get(apiUrl);
        const gifDataArray: GifData[] = response.data.data;
    
        // Initialize an empty array for storing valid URLs
        const validGifUrls: string[] = [];
    
        // Use Promise.all to wait for all requests to complete
        await Promise.all(gifDataArray.map(async (gifData) => {
          const gifUrl = gifData.images.original.url;
    
          // Check if the URL is valid
          try {
            await axios.head(gifUrl);
            validGifUrls.push(gifUrl);
          } catch (error) {
            console.error('Invalid URL:', gifUrl);
          }
        }));
    
        setGifUrls(validGifUrls);
    
        const initialIndexes = Array.from({ length: validGifUrls.length }, (_, index) => index);
        setCurrentGifIndexes(initialIndexes.sort(() => Math.random() - 0.5));
      } catch (error) {
        console.error('Error fetching Giphy data:', error);
      }
    };    

    fetchRandomGifs();
  }, []);


  useEffect(() => {
    let intervalId;

    if (isCounting) {
      intervalId = setInterval(() => {
        if (counter < 100) {
          setCounter((prevCounter) => prevCounter + 1);
        } else {
          clearInterval(intervalId);
          window.location.href = '/404';
        }
      }, 100); // 100 milliseconds interval, adjust as needed
    }

    return () => clearInterval(intervalId);
  }, [counter, isCounting]);

  const handleButtonClick = () => {
    setIsCounting(true);
    if (player) {
      player.playVideo(); // Start playing the video when the countdown begins
    } else {
      console.log("Player is not ready yet");
    }
  };
  
  const onReady = (event: any) => {
    setPlayer(event.target);
    event.target.playVideo();
  };


  return (
    <AppWrapper>
      <div style={containerStyle}>
        {currentGifIndexes.map((index, i) => (
          <div
            key={i}
            style={{
              ...gifStyle,
              backgroundImage: `url(${gifUrls[index]})`,
            }}
          />
        ))}
        <div style={contentStyle}>
              {isCounting ? (
            <h1 style={{ color: "silver", backgroundColor: "green"}}>Sveikinimas kraunasi...{counter} %</h1>
          ) : (
            <StyledButton onClick={handleButtonClick}>
              Spauskite čia! 🎄🎁
            </StyledButton>
          )}
        </div>
        <div>
        <YouTube
          videoId={videoId}
          opts={{ width: '0', height: '0', playerVars: { autoplay: 0, start: 3 } }}
          onReady={onReady}
        />
      </div>
      </div>
    </AppWrapper>
  );
};

export default Home;