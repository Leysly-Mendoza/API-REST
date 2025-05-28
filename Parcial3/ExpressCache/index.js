import express from 'express';
import { createClient } from 'redis';

const app = express();
const client = createClient();

await client.connect();

app.get('/numero', async (req, res) => {
  const cacheado = await client.get('numeroAleatorio');
  if (cacheado) {
    return res.json({ numeroaleatorio: Number(cacheado), cacheado: true });
  }

  const numeroAleatorio = Math.floor(Math.random() * 100);
  await client.set('numeroAleatorio', numeroAleatorio.toString(), { EX: 60 });
  res.json({ numeroAleatorio, cacheado: false });
});

app.listen(3000, () => {
  console.log(`Servidor corriendo en http://localhost:3000`);
});
