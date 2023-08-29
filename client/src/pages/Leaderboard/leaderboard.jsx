import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {BASE_URL } from '../../helper.js';
import './leaderboard.css'; // Import the CSS file for styling

const Home = () => {
  const [users, setUsers] = useState([]);
  const userId = localStorage.getItem('userId');
  //const username = localStorage.getItem('username');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/users/${userId}`);
        const usersData = response.data;
        const usersWithScores = await Promise.all(
          usersData.map(async (user) => {
            const scoreResponse = await axios.get(`${BASE_URL}/scores/${user._id}`);
            console.log(scoreResponse.data);
            const scoreData = scoreResponse.data;
            const score = scoreData.length > 0 ? scoreData[0].score : 0;
            return { ...user, score };
          })
        );
        
        // Sort the users by score in descending order
        usersWithScores.sort((a, b) => b.score - a.score);
        
        setUsers(usersWithScores);
      } catch (error) {
        console.log('Error retrieving users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Leaderboard</h1>
      <table className="container">
        <thead>
          <tr>
            <th>User</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
              <td>{user.username}</td>
              <td>{user.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;




