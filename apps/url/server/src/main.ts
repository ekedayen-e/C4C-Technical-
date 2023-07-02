import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Mutable Application State

/**
 * A map of Short URL IDs to full original URLs
 * http://localhost/s/123, http://example.com/...
 *
 * { 123 -> 'http://example.com/...' }
 */
//const urlmap: Record<number, string> = {};

let _db;

async function getDB() {
  if (_db == null) {
    const conn = await open({
      filename: './urls.db',
      driver: sqlite3.Database,
    });
    _db = conn;
    await _db.run(
      'CREATE TABLE IF NOT EXISTS url (id INTEGER PRIMARY KEY AUTOINCREMENT, original TEXT);'
    );
  }
  return _db;
}

// Actions

/**
 * Produces the shortened form of a given URL
 * Effect: updates the db to record the url and its shortened id.
 */
 async function shortenUrl(url: string): Promise<string> {
  const db = await getDB();

  const result = await db.run('INSERT INTO url (original) VALUES (?)', url);
  console.log(result);
  const id = result.lastID;
  const short = `http://localhost:3333/s/${id}`;

  return short;
}

async function lookupUrl(shortenedId: number) {
  const db = await getDB();

  const result = await db.get(
    'SELECT original FROM url WHERE id = (?)',
    shortenedId
  );
  console.log(result);
  return result.original;
}

async function deleteUrl(shortenedId:string):Promise<string> {
  const db = await getDB();

  await db.run(`DELETE FROM url WHERE id = (?)`,
  shortenedId
  );

  return `Deleted Id: ${shortenedId}`
}

async function getAllUrl():Promise<object> {
  const db = await getDB();

  const result = await db.all(
    'SELECT id, original FROM url'
  );

  const formated = result.map((entry) => {
    return {
      short: `http://localhost:3333/s/${entry.id}`,
      original: entry.original
    }
  })
  return formated;
}

// App

const app = express();
app.use(express.json());
app.use(cors());

app.post('/api/shorten', async (req, res) => {
  const original = req.body.original;
  const short = await shortenUrl(original);

  res.send({
    short: short,
    original: original,
  });
});

app.get('/api/url', async (req, res) => {
  const list = await getAllUrl();
  //console.log(list)
  res.send(list)
})

app.delete('/api/delete/:id', async (req, res) => {
  const id = String(req.params.id);
  const deleted = await deleteUrl(id)
  res.send("Deleted Successfully");
})

app.get('/s/:id', async (req, res) => {
  const id = Number(req.params.id);
  const original = await lookupUrl(id);
  console.log('Link: ' + original)
  res.redirect(original);
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);