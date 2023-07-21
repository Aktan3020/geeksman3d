import { initializeApp } from "firebase/app";
import { getDocs, getFirestore, collection, } from "firebase/firestore";
import { useEffect, useState } from "react";


function App() {
  const [players, setPlayers] = useState([])
  const [isGame, setGame] = useState('none')
  console.log('players', players);
  const firebaseConfig = {
    apiKey: "AIzaSyDAawd6Pd-BYELVLWrHG4YN4vcSv750eyg",
    authDomain: "geeksman-56c54.firebaseapp.com",
    projectId: "geeksman-56c54",
    storageBucket: "geeksman-56c54.appspot.com",
    messagingSenderId: "49245580736",
    appId: "1:49245580736:web:44e59ea444f88ecfe5ac25"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  useEffect(() => {
    async function getUsers() {
      try {

        const querySnapshot = await getDocs(collection(db, "Players"));
        const data = []
        querySnapshot.forEach((doc) => {
          data.push(doc.data())
        });
        const filterData = data.sort((a, b) => {
          return b.score - a.score
        }
        )
        setPlayers(filterData)
      }
      catch (e) {
        console.error("Error adding document: ", e);
      }
    }
    getUsers()
  }, [])


  return (<div className="app">

    <h1 className="title">GEEKSMAN 3D</h1>
    <a href="#game-container" style={{ textDecoration: 'none' }} onClick={() => { setGame('flex'); }}><div className="startGame">Играть</div></a>
    <h4>Перед началом поверните экран</h4>
    <table className="container">

      <thead>
        <tr>
          <th><h1>Место</h1></th>
          <th><h1>Имя</h1></th>
          <th><h1>Телефон</h1></th>
          <th><h1>Очки</h1></th>

        </tr>
      </thead>
      <tbody>
        {players.length > 0 ? players.map((e, index) => {
          return (

            <tr>
              <td>{index + 1}</td>
              <td>{e.name}</td>
              <td>{e.phone}</td>
              <td>{e.score}</td>

            </tr>
          )
        }) : <div className="lds-hourglass"></div>}
      </tbody>
    </table>
    {/* <div className="startGame"  style={{width:'50px',height:'40px'}}>  <img style={{width:'100%',height:'100%',objectFit:'contain'}} src={rotatePhone} alt="" /></div> */}
    <div id="game-container" style={{
      width: '100%', display: isGame, justifyContent: 'center'
      , alignItems: 'center'
    }}>
      <iframe style={{ width: '80%', height: '100vh' }} src="https://v6p9d9t4.ssl.hwcdn.net/html/8202745/export/index.html" frameborder="0" allowfullscreen="true" scrolling="no" allow="autoplay; fullscreen *; geolocation; microphone; camera; midi; monetization; xr-spatial-tracking; gamepad; gyroscope; accelerometer; xr; cross-origin-isolated" mozallowfullscreen="true" allowtransparency="true" webkitallowfullscreen="true" id="game_drop" msallowfullscreen="true"></iframe>
    </div>

  </div>
  );
}

export default App;
