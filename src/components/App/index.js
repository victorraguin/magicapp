import React, { useEffect, useState } from 'react';
import {
  Icon, Menu, Form, TextArea, Popup, Button, Modal, Divider, Header,
} from 'semantic-ui-react';

// == Import
import './styles.css';

// == Composant
const App = () => {
  const [PlayerOne, setPlayerOne] = useState(20);
  let [PlayerOneScore, setPlayerOneScore] = useState(0);
  let [PlayerTwoScore, setPlayerTwoScore] = useState(0);
  let [GameNumber, setGameNumber] = useState(1);
  const [GamePlayed, setGamePlayed] = useState('duel commander');
  const [GameAction, setGameAction] = useState([]);
  const [PlayerTwo, setPlayerTwo] = useState(20);
  const [PlayerOneName, setPlayerOneName] = useState('Joueur 1');
  const [PlayerTwoName, setPlayerTwoName] = useState('Joueur 2');
  const [PlayerPwned, setPlayerPwned] = useState(false);
  const [logs, setlogs] = useState(false);
  const [PlayerDefeat, setPlayerDefeat] = useState(false);
  const [open, setOpen] = useState(false);

  function handleClickCountMore(e) {
    console.log(e.target.id);
    switch (e.target.id) {
      case 'PlayerOne':
        console.log('More player one');
        setPlayerOne(PlayerOne + 1);
        break;
      case 'PlayerTwo':
        console.log('More player two');
        setPlayerTwo(PlayerTwo + 1);
        break;
      default:
    }
  }

  function handleClickCountLess(e) {
    console.log(e.target.id);
    switch (e.target.id) {
      case 'PlayerOne':
        console.log('More player One');
        setPlayerOne(PlayerOne - 1);
        break;
      case 'PlayerTwo':
        console.log('More player two');
        setPlayerTwo(PlayerTwo - 1);
        break;
      default:
    }
  }

  useEffect(() => {
    if (PlayerOne === 0) {
      const result = confirm(`Hey ${PlayerOneName} est-ce que tu as perdu?`);
      if (result === true) {
        setPlayerTwoScore(PlayerTwoScore += 1);
        setGameAction([
          ...GameAction,
          `${PlayerTwoName} a poutré ${PlayerOneName}, ${PlayerTwo} à 0`]);
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
    <div className="Bg">
      <div className="App">
        
        <div className="Game">
          <Modal
            basic
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            size="small"
            centered
            trigger={(
              <Button
                inverted
                size="small"
                color="yellow"
                fluid
                circular
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
                    if (GamePlayed === 'duel commander') {
                      setPlayerOne(20);
                      setPlayerTwo(20);
                    }
                    else if (GamePlayed === 'commander') {
                      setPlayerOne(40);
                      setPlayerTwo(40);
                    }
                  }
                }}
              >Concéder
              </Button>
)}
          ><iframe src="https://giphy.com/embed/6tZsIBl8VMieveHImW" width="480" height="391" frameBorder="0" className="Pwned" allowFullScreen />
            <Modal.Actions>
              <Button color="green" inverted onClick={() => setOpen(false)}>
                <Icon name="checkmark" /> Nouvelle partie
              </Button>
            </Modal.Actions>
          </Modal>
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
            trigger={(
              <div className="player">{PlayerOneName}</div>
        )}
          />
          <div className="PlayerOne">
            <Icon
              name="chevron circle left"
              color="yellow"
              id="PlayerOne"
              onClick={handleClickCountLess}
              size="large"
            />
            {PlayerOne}
            <Icon
              name="chevron circle right"
              color="yellow"
              id="PlayerOne"
              size="large"
              onClick={handleClickCountMore}
            />
          </div>
          <div className="divider">_______________________</div>
          <p className="PlayerTwo">
            <Icon
              name="chevron circle left"
              color="yellow"
              id="PlayerTwo"
              size="large"
              onClick={handleClickCountLess}
            />
            {PlayerTwo}
            <Icon
              name="chevron circle right"
              color="yellow"
              id="PlayerTwo"
              size="large"
              onClick={handleClickCountMore}
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
            trigger={(
              <div className="player">{PlayerTwoName}</div>
)}
          />
          <Modal
            basic
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            size="small"
            centered
            trigger={(
              <Button
                color="yellow"
                size="small"
                fluid
                inverted
                circular
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
                    if (GamePlayed === 'duel commander') {
                      setPlayerOne(20);
                      setPlayerTwo(20);
                    }
                    else if (GamePlayed === 'commander') {
                      setPlayerOne(40);
                      setPlayerTwo(40);
                    }
                  }
                }}
              >Concéder
              </Button>
)}
          ><iframe src="https://giphy.com/embed/6tZsIBl8VMieveHImW" width="480" height="391" frameBorder="0" className="Pwned" allowFullScreen />
            <Modal.Actions>
              <Button color="green" inverted onClick={() => setOpen(false)}>
                <Icon name="checkmark" /> Nouvelle partie
              </Button>
            </Modal.Actions>
          </Modal>

        </div>
        <Menu inverted secondary icon="labeled" className="menu bottom">
          <Menu.Item
            onClick={() => {
              setGamePlayed('duel commander');
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
      { logs ? (
          <div className="Game logs">
            <p>{PlayerOneName} {PlayerOneScore} - {PlayerTwoScore} {PlayerTwoName}</p>
            { GameAction.map((item, index) => (<p>Partie {index + 1} : {item}</p>))}
          </div>
        ) : <div className="Game logs"> <p>{PlayerOneScore} - {PlayerTwoScore}</p> </div> }
    </div>
  );
};

// == Export
export default App;
