const { Room } = require('colyseus');

class BoggleRoom extends Room {
  onCreate(options) {
    this.maxClients = 4;
    this.setState({
      players: {},
      isGameStarted: false,
      roomCode: this.roomId,
    });

    this.onMessage('join', (client, message) => {
      this.state.players[client.sessionId] = { name: message.name };
      this.broadcast('update_players', this.state.players);
    });

    this.onMessage('start_game', () => {
      this.state.isGameStarted = true;
      this.broadcast('game_started');
    });
  }

  onJoin(client) {
    console.log(`${client.sessionId} joined.`);
  }

  onLeave(client) {
    delete this.state.players[client.sessionId];
    this.broadcast('update_players', this.state.players);
  }
}

module.exports = BoggleRoom;
