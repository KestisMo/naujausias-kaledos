import React, {useState, useEffect} from 'react'
import styled, { css } from 'styled-components';
import YouTube from 'react-youtube';
import Gift from '../components/Gift/Gift';

const AppWrapper = styled.div<{ showGift?: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: ${(props) =>
    props.showGift
        ? 'url("/vsiopozna.png")' /* Set the path to your image */
        : 'none'};
    background-size: cover;
    background-repeat: no-repeat;
    z-index: -1; /* Place the background behind other content */
  }
`;

const StyledH1 = styled.h1`
    font-size: 200px;
    margin: 0;
`;

const StyledH3 = styled.h3`
    font-size: 36px;
    margin: 0;
`;

const StyledParagraph = styled.p`
    font-size: 18px;
    margin: 0;
`;

const StyledButton = styled.button`
  height: 64px;
  width: 250px;
  font-size: 18px;
  color: #fff;
  border: none;
  cursor: pointer;
  outline: none;
 background: linear-gradient(to right, #004d00, #006400);
 padding: 16px;
border-radius: 4px;

`;

const ErrorPage = () => {
  const videoId = 'N-_tnaAveFE';
  const [player, setPlayer] = useState<any>(null);
  const [showButton, setShowButton] = useState(false);
  const [showGift, setShowGift]=useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const onReady = (event: any) => {
    setPlayer(event.target);
    event.target.playVideo();
    event.target.setVolume(100);
  };

  return (
      <AppWrapper showGift={showGift}>
      {!showGift && (
        <>
          <StyledH1>404</StyledH1>
          <StyledH3>Sveikinimas nerastas</StyledH3>
          <StyledParagraph>The resource requested could not be found on this server</StyledParagraph>
        </>
      )}

      <YouTube
          videoId={videoId}
          opts={{ width: '0', height: '0', playerVars: { autoplay: 1, start: 17 } }}
          onReady={onReady}
        />
        {!showGift && (
            showButton && <StyledButton onClick={()=>setShowGift(true)}>
               Bandykite dar kartą! 😈
            </StyledButton>
        )}

        {
          showGift &&  (
          <Gift/> )
        }

  </AppWrapper>
  )
}

export default ErrorPage;
