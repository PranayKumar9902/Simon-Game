import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './home.css';
import {BASE_URL } from '../../helper.js';
const Home = () => {
  const buttonColours = ['red', 'blue', 'green', 'yellow'];
  const [gamePattern, setGamePattern] = useState([]);
  const [userClickedPattern, setUserClickedPattern] = useState([]);
  const [started, setStarted] = useState(false);
  const [level, setLevel] = useState(0);
  const [gameOver, setGameOver] = useState(false); // New state variable for game over
  const [highscore, setHighscore] = useState(0); // State variable for highscore
  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  useEffect(() => {
    // if (username === null || username === "") {
    //   //setShow(false);
    // } else {
      const getScores = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/scores/${userId}`);
          setHighscore(response.data[0].score);
        } catch (err) {
          console.log("Error: ", err);
        }
      }
      getScores();
  }, []);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (!started && event.key === 'a') {
        nextSequence();
        setStarted(true);
      }
    };
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress); // Cleanup the event listener on component unmount
    };
  }, [started]);

  useEffect(() => {
    if (userClickedPattern.length > 0) {
      checkAnswer(userClickedPattern.length);
    }
  }, [userClickedPattern]);

  const handleClick = (event) => {
    if (!gameOver) {
      const userChosenColour = event.target.id;
      setUserClickedPattern((prevPattern) => [...prevPattern, userChosenColour]);
      playSound(userChosenColour);
      animatePress(userChosenColour);
    }
  };

  const fadeInOut = (color) => {
    const element = document.getElementById(color);
    element.classList.add('fade');
    setTimeout(() => {
      element.classList.remove('fade');
    }, 500);
  };

  const checkAnswer = (currentLevel) => {
    currentLevel = currentLevel - 1;
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (gamePattern.length === userClickedPattern.length) {
        setTimeout(() => {
          nextSequence();
        }, 1000);
      }
    } else {
      setGameOver(true);
      playSound('wrong');
     // setHighscore(level);
     updateHighscore();
      document.body.style.backgroundColor = 'red';
      setTimeout(() => {
        document.body.style.backgroundColor = '#011F3F';
        setGameOver(false);
      }, 3000);
      restart();
    }
  };

  const nextSequence = () => {
    setUserClickedPattern([]);
    setLevel((prevLevel) => prevLevel + 1);
    const randomNumber = Math.floor(Math.random() * 4);
    const randomChosenColour = buttonColours[randomNumber];
    setGamePattern((prevPattern) => [...prevPattern, randomChosenColour]);
    fadeInOut(randomChosenColour);
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
  };

  const animatePress = (currentColour) => {
    document.getElementById(currentColour).classList.add('pressed');
    setTimeout(() => {
      document.getElementById(currentColour).classList.remove('pressed');
    }, 100);
  };

  const playSound = async (name) => {
    try {
      const audioFile = await import(`./sounds/${name}.mp3`);
      const audio = new Audio(audioFile.default);
      audio.play();
    } catch (error) {
      console.error('Failed to play sound:', error);
    }
  };

  const restart = () => {
    setLevel(0);
    setGamePattern([]);
    setStarted(false);
  };

  const updateHighscore = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/scores/${userId}`);
      const existingScore = response.data[0]?.score ?? 0; // Assign 0 if existingScore is undefined
      console.log(response);
      if (level > existingScore) {
        const updateResponse = await axios.post(`${BASE_URL}/scores/${userId}`, {
          score: level,
        });
        setHighscore(updateResponse.data.score);
      } else {
        setHighscore(existingScore);
      }
    } catch (error) {
      // Handle error
      console.log('Error:', error.message);
      console.log('Error Config:', error.config);
    }
  };
  
  
  // const [showInstructions, setShowInstructions] = useState(false);

  // const handleInstructionsClick = () => {
  //   setShowInstructions(!showInstructions);
  // };
  return (
    
    <div>
      <div className="start">
          </div>
          <div style={{ position: 'absolute', top: 10, right: 10 }}>
  <button
    style={{
      fontSize: '1.5rem',
      fontFamily: 'Press Start 2P, cursive',
      color: '#FEF2BF',
      padding: '10px 20px',
      margin: '5px',
      background: 'none',
      border: '2px solid #FEF2BF',
      cursor: 'pointer',
    }}
    onClick={() => navigate('/leaderboard')}
  >
    Leaderboard
  </button>
  <button
    style={{
      fontSize: '1.5rem',
      fontFamily: 'Press Start 2P, cursive',
      color: '#FEF2BF',
      padding: '10px 20px',
      margin: '5px',
      background: 'none',
      border: '2px solid #FEF2BF',
      cursor: 'pointer',
    }}
    onClick={() => navigate('/instructions')}
  >
    Instructions
  </button>
</div>
<div/>
          <div className="start">
        <h2 >Welcome {username},your Highscore is</h2>
        <p>{highscore}</p>
      </div>
      <h1 id="level-title">{gameOver ? 'Game Over' : started ? `Level ${level}` : 'Press A key to start'}</h1>
      <div className="container">
        <div className="row">
          <div type="button" id="green" className="btn green" onClick={handleClick}></div>
          <div type="button" id="red" className="btn red" onClick={handleClick}></div>
        </div>
        <div className="row">
          <div type="button" id="yellow" className="btn yellow" onClick={handleClick}></div>
          <div type="button" id="blue" className="btn blue" onClick={handleClick}></div>
        </div>
      </div>
    </div>
  );
};
export default Home; 


