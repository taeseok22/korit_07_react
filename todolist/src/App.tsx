import { useState, useEffect } from 'react';
import { fetchItems, createItem, updateItem, deleteItem, Item } from './App';
import './App.css';


function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [newName, setNewName] = useState('');
  const [newQuantity, setNewQuantity] = useState(1);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState('');
  const [editingQuantity, setEditingQuantity] = useState(1);

  useEffect(() => {
    fetchItems().then(setItems);
  }, []);

  const handleAdd = async () => {
    if (!newName) return;
    const newItem = await createItem({ name: newName, quantity: newQuantity });
    setItems([...items, newItem]);
    setNewName('');
    setNewQuantity(1);
  };

  const handleDelete = async (id: number) => {
    await deleteItem(id);
    setItems(items.filter(item => item.id !== id));
  };

  const startEditing = (item: Item) => {
    setEditingId(item.id);
    setEditingName(item.name);
    setEditingQuantity(item.quantity);
  };

  const saveEdit = async () => {
    if (editingId === null) return;
    const updated = await updateItem(editingId, { name: editingName, quantity: editingQuantity });
    setItems(items.map(item => (item.id === editingId ? updated : item)));
    cancelEdit();
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingName('');
    setEditingQuantity(1);
  };

  return (
    <div className="app-container">
      <h1>Todo List</h1>
        <p>할 일들을 작성해보셈</p>
      <input
        placeholder="Item name"
        value={newName}
        onChange={e => setNewName(e.target.value)}
      />
      <input
        type="number"
        min={1}
        value={newQuantity}
        onChange={e => setNewQuantity(Number(e.target.value))}
      />
      <button onClick={handleAdd}>추가</button>

      <ul>
        {items.map(item => (
          <li key={item.id}>
            {editingId === item.id ? (
              <>
                <input
                  value={editingName}
                  onChange={e => setEditingName(e.target.value)}
                />
                <input
                  type="number"
                  min={1}
                  value={editingQuantity}
                  onChange={e => setEditingQuantity(Number(e.target.value))}
                />
                <button onClick={saveEdit}>저장</button>
                <button onClick={cancelEdit}>취소</button>
              </>
            ) : (
              <>
                {item.name} - {item.quantity}{' '}
                <button onClick={() => startEditing(item)}>수정</button>
                <button onClick={() => handleDelete(item.id)}>삭제</button>
                
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}


export default App;
