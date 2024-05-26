import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });


// The method to add content to the database
export const putDb = async (content) => {
  console.log('PUT in the database');
  console.error('putDb not implemented');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.add({ content });
  const result = await request;
  console.log('Data saved to the database', result);
};



// The method to get all content from the database
export const getDb = async () => {
  console.log('GET from the database');
  console.error('getDb not implemented');
  const jateDb = await openDB('jate, 1');
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.getAll();
  const result = await request;
  console.log('Data retrieved from the database', result);
  return result;
};

initdb();
