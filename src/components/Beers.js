import React from 'react';

const Beers = ({beers, loading}) => (
	<div className="Beer-List">
		<h3>검색 결과 : ({beers.length}) {loading && <img src="/ajax-loader.gif" />}</h3>
		{
			beers && beers.map(beer =>
				<li key={beer.id} className="Beer">
					<figure className="Beer-Image">
						<img src={beer.image_url || ''} alt="" />
					</figure>
					<p>{beer.name} <small>{beer.tagline}</small></p>
				</li>
			)
		}
	</div>
);

export default Beers

