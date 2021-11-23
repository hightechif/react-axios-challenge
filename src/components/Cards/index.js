import styled from "styled-components";

const StyledCards = styled.div`
	display: flex;
	gap: 15px;
	flex-wrap: wrap;
	justify-content: center;
	@media screen and (max-width: 375px) {
		flex-direction: column;
		margin: 10px -5px;
    }
`

const StyledCard = styled.div`
	padding: 0px;
	margin: 0px;
	height: 100%;
	max-width: 150px;
	min-width: 100px;
	width: calc(100% / 9);
	border-radius: 20px;
	&:hover {
		transform: scale(1.1);
	}
	img {
		border-radius: 10px;
	}
	.info {
		h3 {
			font-weight: bolder;
			font-size: 16px;
		}
		p {
			font-size: 16px;
		}
		.overview {
			display: none;
		}
	}
	.rating {
		background: #222222;
		color: #EEEEEE;
		padding: 1px 3px;
		border: 2px solid darkgreen;
		border-radius: 50%;
		width: 25px;
		height: 25px;
		font-size: 12px;
		position: relative;
		top: 30px;
		left: 5px;
	}
	@media screen and (max-width: 375px) {
		width: 200px;
		display: flex;
		&:hover {
			transform: scale(1);
		}
		img {
			height: 100%;
		}
		.info {
			width: 180px;
			text-align: left;
			padding-left: 5px;
			h3 {
				width: inherit;
				font-size: 14px;
			}
			p {
				width: inherit;
				font-size: 12px;
			}
			.overview {
				display: block;
				font-size: 10px;
				text-align: justify;
			}
		}
		.rating {
			position: relative;
			top: 5px;
			left: 28px;
		}
    }
`

const Cards = (props) => {
	const { data } = props;
	return (
		<StyledCards>
			{data.map((film, idx) => {
				return (
					<StyledCard key={idx}>
						<div className="rating">{`${film.vote_average}`.length === 1 ? `${film.vote_average}.0` : `${film.vote_average}`}</div>
						<img src={`http://image.tmdb.org/t/p/w200/${film.poster_path}`} alt="poster" />
						<div className="info">
							<h3>{film.title}</h3>
							<p>{film.release_date}</p>
							<p className="overview">{film.overview.length > 398 ? `${film.overview.substr(0, 398)} .... [selengkapnya]` : film.overview}</p>
						</div>
					</StyledCard>
				)
			})}
		</StyledCards>
	)
}

export default Cards;
