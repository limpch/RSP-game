import React, {useState, Component} from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import reportWebVitals from './reportWebVitals';

const Text = props => <h2 className="queue">{props.text}</h2>
const Title = props => <h1 className='title'>{props.title}</h1>
const EquipBtn = props => 	(<button className="game__btn">
								<img onClick={props.clickEvent} data-item={props.equip} src={"img/" + props.equip + ".png"}/>
						  	</button>)
const Image = props => <img data-item={props.item} src={props.imgWay} alt="" />
const ImageBot = props => <img data-item={props.item} src={props.imgWay} alt="" />
const ImageBotTimer = props => <span style={{fontSize: '48px'}}>{props.time}</span>

class App extends Component {
	state = {
		title: 'Камень | Ножницы | Бумага',
		text: 'Выберите элемент!',
		gameEquipment: [
			{
				item: 'rock', 
				hit: 'scissors', 
				scared: 'paper'
			},
			{
				item: 'scissors', 
				hit: 'paper', 
				scared: 'rock'
			},
			{
				item: 'paper', 
				hit: 'rock', 
				scared: 'scissors'
			},
			
		],
		check: 0,
		timer: '',
		isBotStep: false,
		imgWay: '#',
		botImgWay: '#',
		item: '#',
		botItem: '#',
	}

	nullGame = () => {
		this.setState({
			check: 0,
			timer: '',
			isBotStep: false,
			imgWay: '#',
			botImgWay: '#',
			item: '#',
			botItem: '#',
		})
	}

	checkWin = () => {
		this.state.gameEquipment.forEach(item => {
			if(item.item === this.state.item) {
				if(item.item === this.state.botItem) {alert("НИЧЬЯ!"); this.nullGame()}
				if(item.hit === this.state.botItem) {alert("ТЫ ВЫЙГРАЛ!"); this.nullGame()}
				if(item.scared === this.state.botItem) {alert("ТЫ ПРОИГРАЛ!"); this.nullGame()}
			}
		});
	}

	timerTick = () => {
		let timeLeft = Number(this.state.timer);
		if(this.state.timer !== '0') {
			if(this.state.timer === '1') return
			if(timeLeft === 0) timeLeft = 4;
			timeLeft--;
			this.setState({timer: timeLeft.toString()})
			setTimeout(() => {
				this.timerTick();
			}, 1000);
		}
	}

	botHandler = () => {
		const item = this.state.gameEquipment[Math.round(Math.random() * 2)].item;
		this.setState({botImgWay: "img/" + item + ".png"})
		this.setState({botItem: item})
		setTimeout(() => {
				this.timerTick()
				setTimeout(() => {
					this.setState({isBotStep: true})
					setTimeout(() => {
						this.checkWin();
					}, 1000);
				}, 3000)
		}, 500);
	}

	clickHandler = (e) => {
		if(this.state.check === 0) {
			const pickEquip = e.target.dataset.item;
			this.state.gameEquipment.forEach(item => {
				if(item.item === pickEquip) {
					this.setState({imgWay: "img/" + pickEquip + ".png"})
					this.setState({item: pickEquip})
					this.setState({check: -1});
					this.botHandler();
				}
			})
		}
	}

	render() {
		return (
			<div className='wrapper'>
				<div className="wrapper__title">
					<Title title={this.state.title}/>
				</div>
				<div className="wrapper__text">
					<Text text={this.state.text}/>
				</div>
				<div className="game">
					<div className='game__image-block'>
							<div className="game__image border">
								<Image item={this.state.item} imgWay={this.state.imgWay}/>
							</div>
							<div className="game__image">
								{this.state.isBotStep ? <ImageBot item={this.state.botItem} imgWay={this.state.botImgWay}/> : <ImageBotTimer time={this.state.timer}/>}
							</div>
					</div>
					<div className="game__buttons">
							{this.state.gameEquipment.map((item, index) => 
							<EquipBtn key={index} clickEvent={this.clickHandler} equip={item.item} />)}
					</div>
				</div>
			</div>
		)
	}
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

reportWebVitals();
