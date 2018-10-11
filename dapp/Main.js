import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import lottery from './img/lottery.png'
import circle from './img/icons8-рулетка-100.png'
import tetris from './img/icons8-тетрис-filled-100 (1).png'
import {
	Row, Col,
	Navbar,
	Nav,
	NavItem,
	NavLink,
	Button
} from 'reactstrap';

export default class Main extends Component {
	startGame (deposit) {
		console.log('DEPOSIT',deposit);
		window.Lottery.connect(
			{
				bankroller: 'auto',
				paychannel: { deposit: deposit },
				gamedata: { type: 'uint', value: [0, 0] }
			},
			function (connected, info) {
				console.log('connect result:', connected)
				console.log('connect info:', info)


				if (!connected) return

				let maxbet = DCLib.Utils.dec2bet(info.channel.player_deposit)

				// $('#user_bet')[0].max = Math.ceil(maxbet)
				// $('#user_bet').val((maxbet * 0.1).toFixed(2))

				// $('body').addClass('cur-step-2').addClass('cur-step-3')
			}
		);

		let { history } = this.props;
		history.push({
			pathname: '/lottery'
		});
	}
	render() {
		return (
			<React.Fragment>
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
							<p>No sign-ups or deposits, just 1% edge and jackpot!</p>
						</div>
						<Button size="lg" className="faq-btn">HOW TO PLAY?</Button>
					</Col>
				</Row>
				<Row className="games-container">
					<Col>
						<div >
							<img className="lottery" src={lottery} />
							<h4>Lottery</h4>
							<p>Wan't to try old school?
Play our lottery, up to 10x</p>
						</div>
						<Button className="play-btn" onClick={e => this.startGame(1)}>PLAY NOW</Button>
					</Col>
					<Col>
						<div className="unavaliable">
							<img className="lottery" src={circle} />
							<h4>Circle</h4>
							<p>Wan't to try old school?
Play our lottery, up to 10x</p>
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
			</React.Fragment>
		)
	}
}
