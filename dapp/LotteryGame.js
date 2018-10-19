import React, { Component } from 'react'
import {Button} from 'reactstrap';
import './lottery-game.css';
import Loader from 'react-loaders';
export default class LotteryGame extends Component {
	constructor(){
		super();
		this.state = {
			bet : 1,
			pending:false,
			choice: null,
			balance: null
		}
	}

	componentWillMount(){
		document.addEventListener('pending_start',()=>{
		  this.setState({...this.state, pending: true})
		  console.log('start pending')
		})
	
		document.addEventListener('pending_stop',()=>{
		  this.setState({...this.state, pending: false})
		  console.log('stop pending')
		})
	  }

	handleClick(e) {
		const userChoice = parseInt(e.target.id.substr(-1));
		document.querySelector('.choice-row .active') ? document.querySelector('.choice-row .active').classList.remove('active') : console.log('#user choice',userChoice);
		document.querySelector(`#choice_${userChoice}`).classList.toggle('active');
		this.setState({...this.state, choice:userChoice});
	}

	makeRoll = (...args) => {
		console.log(this.state);
		const random_hash = DCLib.randomHash({
		  bet: this.state.bet,
		  gamedata: [0]
		})
		console.log(random_hash)
		 window.Lottery.Game(this.state.bet, [0, 1], random_hash).then(function (result) {
		   console.log('result', result);
		 })
	  }

	render() {
		return (
			<React.Fragment>
			<Modal isOpen={this.state.pending} backdrop="static">
					<ModalBody>Please wait...</ModalBody>
				</Modal>
			<div className="lottery-game-container">
				<h3>Lottery</h3>
				<div className="ticket">
					<h5>The Ticket</h5>
					<div className="choice-row">
						<span id="choice_1" onClick={e => this.handleClick(e)}>⬤</span>
						<span id="choice_2" onClick={e => this.handleClick(e)}>⬤</span>
						<span id="choice_3" onClick={e => this.handleClick(e)}>⬤</span>
					</div>
					<div className="choice-row">
						<span id="choice_4" onClick={e => this.handleClick(e)}>⬤</span>
						<span id="choice_5" onClick={e => this.handleClick(e)}>⬤</span>
						<span id="choice_6" onClick={e => this.handleClick(e)}>⬤</span>
					</div>
				</div>
			</div>
			<div className="user-bet-container">
				<Button color="danger" className="bet-btn" onClick={e => this.makeRoll(e)}>GO!</Button>
			</div>
			</React.Fragment>
		)
	}
}
