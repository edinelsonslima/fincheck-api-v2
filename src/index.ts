import { db } from 'database';

db.initialize()
  .then(async () => await import('./app/server'))
  .catch((err) => console.error('🔥 %s', err));
