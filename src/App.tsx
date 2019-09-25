import React, {useEffect, useState} from 'react';
import PlayerList, {Player} from './components/PlayerList';
import {CssBaseline, Modal, Button} from '@material-ui/core';
import io from 'socket.io-client';
import About from './components/About';

let formatPlayers = (players: any) => {
  let playerList: Player[] = [];
  for(let prop in players){
    let formattedPlayer = new Player(prop, players[prop]);
    playerList.push(formattedPlayer);
  }
  return playerList;
}

const App = () => {
  
  let [players, setPlayers] = useState<Player[]>([]);

  let createSocketConnection = function(){
    const connection = io();
    connection.on('connect', function() {
      console.log('Connected to server.');
      connection.on('player-update', (players: any) => setPlayers(formatPlayers(players)));
    });
    return connection;
  }

  useEffect(() => {
    createSocketConnection();
  }, []);

  let [aboutOpen, setAboutOpen] = useState(true);

  return (
    <div className="App">
      <CssBaseline/>
      {aboutOpen && <About closeFunction={setAboutOpen}/>}
      {players.length ? <PlayerList players={players}/> : <div>Loading Content</div>}
      <Button variant="contained" style={{position: 'absolute', top: '1rem', right: '1rem'}} onClick={() => setAboutOpen(true)}>About</Button>
    </div>
  );
}

export default App;
