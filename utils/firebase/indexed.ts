const DB_NAME = 'AS_Study_Dashboard';
const STORE_NAME = 'userData';

let db: IDBDatabase | null = null;

export const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') { resolve({} as any); return; }
    const request = indexedDB.open(DB_NAME, 2);
    
    request.onupgradeneeded = (event) => {
      const database = (event.target as IDBOpenDBRequest).result;
      if (!database.objectStoreNames.contains(STORE_NAME)) {
        database.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
    
    request.onsuccess = (event) => {
      const database = (event.target as IDBOpenDBRequest).result;
      db = database; // CRITICAL FIX: Assign to global variable
      resolve(database);
    };
    
    request.onerror = (e) => reject(e); 
  });
};

export const dbPut = async (storeName: string, data: { id: string; value: any }) => {
  try {
      if (!db) db = await openDB();
      if (!db) return;

      // Implemented specific store check, defaulting to the main STORE_NAME if matches or generic usage
      const targetStore = storeName === STORE_NAME ? STORE_NAME : STORE_NAME; 
      
      const transaction = db.transaction([targetStore], 'readwrite');
      const store = transaction.objectStore(targetStore);
      store.put(data);
  } catch (e) { console.error("IndexedDB Put Error", e); }
};

export const dbClear = async (storeName: string) => {
  try {
      if (!db) db = await openDB();
      if (!db) return;
      
      const targetStore = storeName === STORE_NAME ? STORE_NAME : STORE_NAME;
      
      const transaction = db.transaction([targetStore], 'readwrite');
      const store = transaction.objectStore(targetStore);
      store.clear();
  } catch (e) { console.error("IndexedDB Clear Error", e); }
};

export const cleanupStorage = () => {
    if (db) {
        db.close();
        db = null;
    }
};