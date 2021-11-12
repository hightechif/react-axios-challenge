import styled from "styled-components";

const StyledCards = styled.div`
	display: flex;
	gap: 15px;
	flex-wrap: wrap;
	justify-content: center;
`

const StyledCard = styled.div`
	padding: 0px;
	margin: 0px;
	height: 100%;
	width: calc(100% / 9);
	border-radius: 20px;
	&:hover {
		transform: scale(1.1);
	}
	img {
		border-radius: 20px;
	}
	h3 {
		font-weight: bolder;
		font-size: 16px;
	}
	p {
		font-size: 16px;
	}
`

const Cards = (props) => {
	const { data } = props;
	return (
		<StyledCards>
			{data.map((film, idx) => {
				return (
					<StyledCard key={idx}>
						<img src={`http://image.tmdb.org/t/p/w200/${film.poster_path}`} alt="poster" />
						<h3>{film.title}</h3>
						<p>{film.release_date}</p>
					</StyledCard>
				)
			})}
		</StyledCards>
	)
}

export default Cards;