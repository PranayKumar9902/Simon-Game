import React from 'react';

const Instructions = () => {
  return (
    <div className="start">
      <h1>Simon Game Instructions</h1>
      <p>Welcome to the Simon game!</p>
      <p>The game consists of a series of colored buttons that will light up in a specific pattern.</p>
      <p>At each level, a button will be shown, and as the level progresses, you need to press all the buttons from the start.</p>
      <p>Your goal is to repeat the pattern by clicking the buttons in the same order.</p>
      <p>The pattern will progressively become longer and more complex as you advance.</p>
      <p>If you make a mistake or click the wrong button, the game will end.</p>
      <div>
        <p>Pay attention to the sound and visual cues to help remember the pattern.</p>
      </div>
      <p>Are you ready to test your memory and reflexes? Let's play Simon!</p>
    </div>
  );
};

export default Instructions;

