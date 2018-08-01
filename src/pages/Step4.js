import React, {Component} from 'react';
import {connect} from 'react-redux';
import Search from "../components/Search";
import Beers from "../components/Beers";
import '../App.css';
import beer from '../store/modules/beer';

class Step4 extends Component {
	handleBeerSearch = (query) => {
		this.props.searchBeersAction(query)
	};
	
	render() {
		return (
			<div className="BeerSearch">
				<Search
					defaultValue={''}
					onChange={this.handleBeerSearch}
					messages={this.props.beer.messages}
				/>
				{
					this.props.beer &&
					<Beers beers={this.props.beer.beers} loading={this.props.beer.loading}/>
				}
				
			</div>
		)
	}
}

export default connect(
	(state)=> state,
	{searchBeersAction: beer.action.searchBeersAction}
	)(Step4);