import React, { Component } from 'react'
import {Button, Modal, ModalBody} from 'reactstrap';
import './lottery-game.css';
import Loader from 'react-loaders';
export default class LotteryGame extends Component {
	constructor(){
		super();
		this.state = {
			bet : 1,
			pending:false,
			accInfo: null,
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

		componentDidMount(){
			this.setState({...this.state, accInfo: window.DCLib.Account._ERC20._address})
		}
	handleClick(e) {
		const userChoice = parseInt(e.target.id.substr(-1));
		document.querySelector('.choice-row .active') ? document.querySelector('.choice-row .active').classList.remove('active') : console.log('first user choice',userChoice);
		document.querySelector(`#choice_${userChoice}`).classList.toggle('active');
		this.setState({...this.state, choice:userChoice});
		console.log('user choice', userChoice);
	}

	makeRoll = (...args) => {
		console.log(this.state);
		const random_hash = DCLib.randomHash({
		  bet: this.state.bet,
		  gamedata: [0]
		})
		console.log(random_hash)
		 window.Lottery.Game(this.state.bet, [0, this.state.choice], random_hash).then(function (result) {
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
				<h3>Choose your lucky number!</h3>
				<div className="ticket">
					<h5>The Ticket</h5>
					<h6>{this.state.accInfo}</h6>
					<div className="choice-row">
						<span id="choice_1" onClick={e => this.handleClick(e)}>①</span>
						<span id="choice_2" onClick={e => this.handleClick(e)}>②</span>
						<span id="choice_3" onClick={e => this.handleClick(e)}>③</span>
						<span id="choice_4" onClick={e => this.handleClick(e)}>④</span>
						<span id="choice_5" onClick={e => this.handleClick(e)}>⑤</span>
						<span id="choice_6" onClick={e => this.handleClick(e)}>⑥</span>
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
