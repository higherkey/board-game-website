const socket = io();

socket.emit('join', { name: 'Player1' });

socket.on('update_players', (players) => {
  const playersList = document.getElementById('playersList');
  playersList.innerHTML = '';
  Object.values(players).forEach(player => {
    const li = document.createElement('li');
    li.textContent = player.name;
    playersList.appendChild(li);
  });
});

socket.on('game_started', () => {
  console.log('Game has started!');
});
