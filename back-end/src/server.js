import 'dotenv/config';
import cors from 'cors';
import express from 'express';

const app = express();
const port = Number.parseInt(process.env.PORT ?? '4000', 10);
const frontendOrigin = process.env.FRONTEND_ORIGIN ?? 'http://localhost:5173';

app.use(
  cors({
    origin: frontendOrigin
  })
);
app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({
    ok: true,
    service: 'email-cleaner-api',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/status', (_request, response) => {
  response.json({
    app: 'MailSift',
    phase: 'initial-setup',
    gmailConnected: false
  });
});

app.listen(port, () => {
  console.log(`Email Cleaner API running at http://localhost:${port}`);
});
