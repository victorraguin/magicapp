import React, { useEffect, useState } from 'react';
import {
  Icon, Menu, Form, TextArea, Popup,
} from 'semantic-ui-react';

// == Import
import './styles.css';

// == Composant
const App = () => {
  let [PlayerOne, setPlayerOne] = useState(20);
  let [PlayerOneScore, setPlayerOneScore] = useState(0);
  let [PlayerTwoScore, setPlayerTwoScore] = useState(0);
  let [GameNumber, setGameNumber] = useState(1);
  const [GamePlayed, setGamePlayed] = useState('duel commander');
  const [GameAction, setGameAction] = useState([]);
  let [PlayerTwo, setPlayerTwo] = useState(20);
  const [PlayerOneName, setPlayerOneName] = useState('Joueur 1');
  const [PlayerTwoName, setPlayerTwoName] = useState('Joueur 2');
  const [PlayerPwned, setPlayerPwned] = useState(false);
  const [logs, setlogs] = useState(false);
  const [PlayerDefeat, setPlayerDefeat] = useState(false);

  useEffect(() => {
    if (PlayerOne === 0) {
      const result = confirm(`Hey ${PlayerOneName} est-ce que tu as perdu?`);
      if (result === true) {
        setPlayerTwoScore(PlayerTwoScore += 1);
        setGameAction([
          ...GameAction,
          `${{ PlayerTwoName }} a poutré ${PlayerOneName}, ${PlayerTwo} à 0`]);
        setGameNumber(GameNumber += 1);
        if (GamePlayed === 'duel commander') {
          setPlayerOne(20);
          setPlayerTwo(20);
        }
        else if (GamePlayed === 'commander') {
          setPlayerOne(40);
          setPlayerTwo(40);
        }
      }
    }
  }, [PlayerOne]);

  useEffect(() => {
    if (PlayerTwo === 0) {
      const result = confirm(`Hey ${PlayerTwoName} est-ce que tu as perdu?`);
      if (result === true) {
        setPlayerOneScore(PlayerOneScore += 1);
        setGameAction([
          ...GameAction,
          `${PlayerOneName} a poutré ${PlayerTwoName}, ${PlayerOne} à 0`]);
        setGameNumber(GameNumber += 1);
        if (GamePlayed === 'duel commander') {
          setPlayerOne(20);
          setPlayerTwo(20);
        }
        else if (GamePlayed === 'commander') {
          setPlayerOne(40);
          setPlayerTwo(40);
        }
      }
    }
  }, [PlayerTwo]);

  useEffect(() => {
    if (PlayerTwoScore === 3) {
      setPlayerDefeat(true);
    }
  }, [PlayerTwoScore]);

  return (
    <div className="App">
      { logs ? (
        <div className="Game logs">
          <p>{PlayerOneName} {PlayerOneScore} - {PlayerTwoScore} {PlayerTwoName}</p>
          { GameAction.map((item, index) => (<p>Partie {index + 1} : {item}</p>))}
        </div>
      ) : null }
      <div className="Game">
        <Icon
          name="handshake outline"
          inverted
          size="small"
          color="orange"
          onClick={() => {
            const result = confirm(`Tu concède ${PlayerOneName} ?`);
            if (result === true) {
              setPlayerTwoScore(PlayerTwoScore += 1);
              setGameAction([
                ...GameAction,
                `${PlayerOneName} concède face à ${PlayerTwoName}! `]);
              setPlayerPwned(true);
              setTimeout(() => {
                setPlayerPwned(false);
              }, 7000);
              setGameNumber(GameNumber += 1);
            }
          }}
        />
        <Popup
          on="click"
          position="top center"
          size="tiny"
          content={(
            <Form>
              <TextArea
                placeholder="Nom du Joueur 1?"
                onChange={(e) => {
                  if (PlayerOneName.length < 20) {
                    setPlayerOneName(e.target.value);
                  }
                  else {
                    return setPlayerTwoName('Joueur 1');
                  }
                }}
                rows={1}
              />
            </Form>
)}
          trigger={<p className="player">{PlayerOneName}</p>}
        />
        <div className="PlayerOne">
          <Icon
            name="chevron circle left"
            color="yellow"
            onClick={() => {
              setPlayerOne(PlayerOne--);
            }}
          />
          {PlayerOne}
          <Icon
            name="chevron circle right"
            color="yellow"
            onClick={() => {
              setPlayerOne(PlayerOne++);
            }}
          />
        </div>
        { PlayerPwned ? <p className="Pwned">Poutré. </p> : null }
        { PlayerPwned ? <iframe src="https://giphy.com/embed/6tZsIBl8VMieveHImW" width="480" height="391" frameBorder="0" class="Pwned" allowFullScreen></iframe>
          : <div>_______________________</div> }
        <p className="PlayerTwo">
          <Icon
            name="chevron circle left"
            color="yellow"
            onClick={() => {
              setPlayerTwo(PlayerTwo--);
            }}
          />
          {PlayerTwo}
          <Icon
            name="chevron circle right"
            color="yellow"
            onClick={() => {
              setPlayerTwo(PlayerTwo++);
            }}
          />
        </p>
        <Popup
          on="click"
          position="bottom center"
          size="tiny"
          content={(
            <Form>
              <TextArea
                placeholder="Nom du Joueur 2?"
                value={PlayerTwoName}
                onChange={(e) => {
                  if (PlayerTwoName.length < 20) {
                    setPlayerTwoName(e.target.value);
                  }
                  else {
                    return setPlayerTwoName('Joueur 2');
                  }
                }}
                rows={1}
              />
            </Form>
)}
          trigger={<p className="player">{PlayerTwoName}</p>}
        />
        <Icon
          name="handshake outline"
          color="orange"
          size="small"
          onClick={() => {
            const result = confirm(`Tu concède ${PlayerTwoName} ?`);
            if (result === true) {
              setPlayerOneScore(PlayerOneScore += 1);
              setGameAction([
                ...GameAction,
                `${PlayerTwoName} concède face à ${PlayerOneName}! `]);
              setPlayerPwned(true);
              setTimeout(() => {
                setPlayerPwned(false);
              }, 7000);
              setGameNumber(GameNumber += 1);
            }
          }}
        />
      </div>
      <Menu inverted secondary icon="labeled" className="menu bottom">
        <Menu.Item
          onClick={() => {
            setPlayerOne(20);
            setPlayerTwo(20);
          }}
        ><Icon size="small" name="user" />
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            setGamePlayed('commander');
            setPlayerOne(40);
            setPlayerTwo(40);
          }}
        ><Icon size="small" name="users" />
        </Menu.Item>
        <Menu.Item
          color="yellow"
          onClick={() => {
            if (logs) {
              setlogs(false);
            }
            else if (GameAction.length > 0) {
              setlogs(true);
            }
          }}
        ><Icon size="small" name="list alternate outline" />
        </Menu.Item>
      </Menu>
    </div>
  );
};

// == Export
export default App;
