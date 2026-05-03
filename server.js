const express = require('express');
const app = express();

// Base de datos en memoria (se mantiene mientras el servidor corre)
let gameData = {
  timestamp: null,
  name: "un juego"
};

app.get('/', (req, res) => {
  const action = req.query.action;
  const game = req.query.game;

  if (action === 'set') {
    gameData.timestamp = Date.now();
    gameData.name = game || "un juego";
    return res.send(`Juego guardado: ${game}`);
  }

  if (action === 'get') {
    if (!gameData.timestamp) {
      return res.send('No hay juego activo');
    }

    const elapsed = Math.floor((Date.now() - gameData.timestamp) / 1000);
    const hours = Math.floor(elapsed / 3600);
    const minutes = Math.floor((elapsed % 3600) / 60);

    let tiempo = '';
    if (hours > 0) tiempo += hours + 'h ';
    if (minutes > 0) tiempo += minutes + 'm';
    if (!tiempo) tiempo = 'menos de 1m';

    return res.send(`Esta jugando ${gameData.name} desde hace ${tiempo}`);
  }

  res.send('Accion no reconocida');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
