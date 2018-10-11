import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import {
  Container
} from 'reactstrap';
import './App.css';
import LotteryGame from './LotteryGame';
import Main from './Main';
import DCLib from './DCCore/index.js'
import dappLogicInit from './dapp.logic.js'

class App extends Component {
  constructor() {
    super();
    this.state = {}
  }

  componentDidMount () {
    console.log(DCLib);
    DCLib.on('ready', function () {
      console.log('HAAHAHA')
      dappLogicInit(DCLib, 'split_cash-lottery');
      DCLib.Account.create('0x86d9aa178516422f85ee2e30d6ba3d066d3c73abfa7f84e095051916d5d3ff4f','1234')
      DCLib.Account.initAccount(()=>{
         window.Lottery = new DCLib.DApp({
              slug: 'split_cash-lottery',
              rules:{
                depositX:2
              }
          })
      });
       
      //   DCLib.Account.create(function () {
      //     console.log(2222222)
      //     window.Lottery = new DCLib.DApp({
      //         slug: 'split_cash-lottery'
      //     })
      //     console.log(111111111,window.Lottery)
      // })
    })
  }

  
  makeRoll = (user_bet, ...args) => {
    console.log(...{ name: 1, hui: 2 })
    const random_hash = DCLib.randomHash({
      bet: user_bet,
      gamedata: [...args]
    })
    console.log(random_hash)
    // window.Dice.Game(user_bet, user_num, random_hash).then(function (result) {
    //   console.log('result', result)
    //   this.renderGames()
    //   var ubets = window.Dice.Game.payChannel.getBalance()
    //   // $('#user_bet').max = ubets
    // })
  }
  endGame = () => {
    window.Lottery.disconnect(function (res) {
      console.log('disconnect result', res)
    })
  }
  renderGames = history => {
    if (typeof Game === 'undefined') {
      window.Game = window.Lottery.logic
    }
    history = history || window.Lottery.Game.history
  }
  render() {
    return (
      <div className="App">
        <Container className="main-container">
          <Route path='/' exact component={Main} />
          <Route path='/lottery' component={LotteryGame} />
        </Container>
      </div>
    );
  }
}

export default App;
