'use client';

import { useEffect, useState } from 'react';
import { db } from '../../firebase/config';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';

interface Item {
  id: string;
  text: string;
}

export default function HomePage() {
  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState('');
  const [editedItems, setEditedItems] = useState<Record<string, string>>({});

  const fetchItems = async () => {
    const snapshot = await getDocs(collection(db, 'items'));
    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as { text: string }),
    }));
    setItems(data);
  };

  const handleAdd = async () => {
    if (newItem.trim()) {
      await addDoc(collection(db, 'items'), { text: newItem });
      setNewItem('');
      fetchItems();
    }
  };

  const handleEditChange = (id: string, value: string) => {
    setEditedItems(prev => ({ ...prev, [id]: value }));
  };

  const handleUpdate = async (id: string) => {
    const newText = editedItems[id];
    if (newText?.trim()) {
      await updateDoc(doc(db, 'items', id), { text: newText });
      fetchItems();
    }
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, 'items', id));
    fetchItems();
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-900 text-zinc-100">
      <div className="bg-zinc-800 shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-6 flex items-center justify-center gap-2 text-white">
          Assassination List
        </h1>

        <div className="flex mb-6">
          <input
            type="text"
            value={newItem}
            onChange={e => setNewItem(e.target.value)}
            placeholder="New Target"
            className="flex-grow bg-zinc-700 border border-zinc-600 rounded-l px-4 py-2 outline-none text-white placeholder-zinc-400 focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handleAdd}
            className="bg-indigo-600 text-white px-4 rounded-r hover:bg-indigo-700 transition-colors"
          >
            Add
          </button>
        </div>

        <ul className="space-y-4">
          {items.map(item => (
            <li key={item.id} className="flex items-center space-x-2">
              <input
                type="text"
                defaultValue={item.text}
                onChange={e => handleEditChange(item.id, e.target.value)}
                className="flex-grow bg-zinc-700 border border-zinc-600 px-3 py-2 rounded text-white focus:ring-1 focus:ring-indigo-500"
              />
              <button
                onClick={() => handleUpdate(item.id)}
                className="bg-teal-500 text-white px-3 py-1 rounded hover:bg-teal-600 transition-colors"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="bg-rose-500 text-white px-3 py-1 rounded hover:bg-rose-600 transition-colors"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}