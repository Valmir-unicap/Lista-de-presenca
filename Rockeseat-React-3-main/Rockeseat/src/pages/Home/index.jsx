import React, {useState, useEffect} from 'react';
import "./styles.css";
import {Card}from '../../Componentes/Card';


export default function Home() {
  const [studentName, setStudentName] = useState("");

  const [students, setStudents] = useState([]);

const [user, setUser] = useState({name: '', avatar: ''})

  function handleAddStudent() {
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    };

    setStudents((prevState) => [...prevState, newStudent]);
  }


useEffect(()=> {
  fetch('https://api.github.com/users/valmir-unicap')
  .then(Response => Response.json())
  .then(data =>{
setUser({
  name: data.name,
  avatar: data.avatar_url,
});
  });
},[]);

  return (
    <div className="container">
      <header>
      <h1>Lista de Presença</h1>
      <div>
        <strong>
          {user.name}
        </strong>
        <img src={user.avatar} alt='Foto de perfil'></img>
      </div>
      </header>
      
      <input
        type="text"
        placeholder="Digite o nome..."
        onChange={(e) => setStudentName(e.target.value)}
      />
      <button type="button" onClick={handleAddStudent}>
        Adicionar
      </button>

      {
      students.map((student) => (
        <Card 
        key={student.time}
        name={student.name} 
        time={student.time} 
        />
        
      ))}
    </div>
  );
}
