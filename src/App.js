import { useState, useEffect } from 'react';
import './App.css';
import { db } from './firebase-config';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';

function App() {

  const [newAge, setNewAge] = useState(0);
  const [newName, setNewName] = useState('');
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, 'users');

  const createUser = async () => {
    await addDoc(usersCollectionRef, { name: newName, age: Number(newAge) });
  }

  const updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id);
    const newFields = { age: age + 1 };
    await updateDoc(userDoc, newFields);
  }

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  }

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    getUsers()
  }, []);

  return (
    <div className="App">
      <div className="form">
        <input className="form-control" placeholder='Name...' style={{ width: "200px", display: "inline-flex", marginLeft: "10px", marginRight: "10px" }} onChange={(event) => {
          setNewName(event.target.value);
        }} />
        <input className="form-control" type='number' style={{ width: "200px", display: "inline-flex", marginLeft: "10px", marginRight: "10px" }} placeholder='Age...' onChange={(event) => {
          setNewAge(event.target.value);
        }} />
        <button className="btn btn-dark" onClick={createUser}>Create User!</button>
      </div>
      {users.map((user) => {
        return (
          <div key={user.id} className="users">
            <div className="name-age">
              <h3>Name : {user.name}</h3>
              <h3>Age : {user.age}</h3>
            </div>
            <button className="btn btn-dark" onClick={() => { updateUser(user.id, user.age) }}> Increase Age! </button>
            <button className="btn btn-dark" onClick={() => { deleteUser(user.id) }}>Delete User!</button>
          </div>
        )
      })}
    </div>
  );
}

export default App;