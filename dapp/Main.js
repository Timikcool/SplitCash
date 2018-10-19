import React, { Component } from 'react';
import {Loader} from 'react-loaders';
import { withRouter } from 'react-router-dom';
import lottery from './img/lottery.png'
import circle from './img/icons8-рулетка-100.png'
import tetris from './img/icons8-тетрис-filled-100 (1).png'
import {
	Modal, ModalHeader, ModalBody, ModalFooter,
	Row, Col,
	Navbar,
	Nav,
	NavItem,
	NavLink,
	Button
} from 'reactstrap';

export default class Main extends Component {
	constructor() {
		super();
		this.state = {
		  pending:false,
		  modal: false
		}
		this.toggleFAQModal = this.toggleFAQModal.bind(this);
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

	startGame (deposit) {
		let { history } = this.props;
		
		console.log('DEPOSIT', deposit);
		window.Lottery.connect(
			{
				bankroller: 'auto',
				paychannel: { deposit: deposit },
				gamedata: { type: 'uint', value: [0, 0] }
			},
			function (connected, info) {
				console.log('connect result:', connected)
				console.log('connect info:', info)

				history.push({
					pathname: '/lottery'
				})

				if (!connected) return

				let maxbet = DCLib.Utils.dec2bet(info.channel.player_deposit)
			}
		);
	}
	toggleFAQModal() {
		this.setState({...this.state,
		  modal: !this.state.modal
		});
	  }

	render() {
		return (
			<React.Fragment>
				<Modal isOpen={this.state.pending} backdrop="static">
					<ModalBody>Please wait...</ModalBody>
				</Modal>
				<Row className="header-container">
					<Navbar className="header">
						<div className="brand" href="/">Split<span>Cash</span></div>
						<Nav className="ml-auto" navbar>
							<NavItem>
								<NavLink href="/how-to/">F.A.Q</NavLink>
							</NavItem>
							<NavItem>
								<NavLink href="https://github.com/">GitHub</NavLink>
							</NavItem>
						</Nav>
					</Navbar>
				</Row>
				<Row className="info-container">
					<Col>
						<h2>Fair games that pay Ether</h2>
						<div>
							<p>Provably fair bets backed by simple open-sourced contract</p>
						</div>
						<Button size="lg" onClick={e => this.toggleFAQModal()} className="faq-btn">HOW TO PLAY?</Button>
					</Col>
				</Row>
				<Row className="games-container">
					<Col>
						<div >
							<img className="lottery" src={lottery} />
							<h4>Lottery</h4>
							<p>Fast and fair 6x game. Our first try</p>
						</div>
						<Button className="play-btn" onClick={e => this.startGame(1)}>PLAY NOW</Button>
					</Col>
					<Col>
						<div className="unavaliable">
							<img className="lottery" src={circle} />
							<h4>Roulette</h4>
							<p>Play our roulette, up to 10x</p>
						</div>
						<Button disabled className="play-btn">PLAY NOW</Button>
					</Col>
					<Col>
						<div className="unavaliable">
							<img className="lottery" src={tetris} />
							<h4>Tetris</h4>
							<p>Wan't to try old school?
Play our lottery, up to 10x</p>
						</div>
						<Button disabled className="play-btn">PLAY NOW</Button>
					</Col>
					<Col>
						<div className="unavaliable">
							<img className="lottery" src={lottery} />
							<h4>Lottery</h4>
							<p>Wan't to try old school?
Play our lottery, up to 10x</p>
						</div>
						<Button disabled className="play-btn">PLAY NOW</Button>
					</Col>
				</Row>
				<Modal isOpen={this.state.modal} toggle={this.toggleFAQModal} className={this.props.className}>
          <ModalHeader toggle={this.toggleFAQModal}>About our games</ModalHeader>
          <ModalBody>
			  Your bet is 1 BET only. Play fast and fair. Good luck
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.toggleFAQModal}>Gotcha!</Button>
          </ModalFooter>
        </Modal>
			</React.Fragment>
		)
	}
}
