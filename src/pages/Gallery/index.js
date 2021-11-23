import { useEffect, useState, useRef } from "react";
import tmdbActions from "../../store/actions/tmdbActions";
import Cards from "../../components/Cards";
import { trackPromise } from 'react-promise-tracker';
import Loader from 'react-loader-spinner';
import { Icon } from "@elevenia/master-ui/components/Atom";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";

const StyledGallery = styled.div`
    .TMDB_Logo {
        margin: 50px auto;
        max-width: 720px;
        min-width: 300px;
        width: 75%;
    }
    .sort_by_rating {
        display: inline-flex;
        width: 100px;
        background: #2BADCC;
        border: 2px solid lightgreen;
        border-radius: 15px;
        justify-content: center;
        padding: 3px 3px;
        margin-left: calc((100% - 100px)/2);
        p {
            color: #FFFFFF;
            font-size: large;
            padding-right: 8px;
        }
        button {
            padding-top: 5px;
        }
    }
    @media screen and (max-width: 375px) {
        .TMDB_Logo {
            margin: 20px auto;
        }
    }
`

const Gallery = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [asc, setAsc] = useState('desc');

    const LoaderComponent = () => {
        return (
            <div
                style={{
                    width: "100%",
                    height: "100",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <Loader type="ThreeDots" color="#2BADCC" height="100" width="100" />
            </div>
        )
    }

    const loadData = async (page = 1) => {
        var movieList = data;
        try {
            const GET_LIST = await trackPromise(tmdbActions.getList(1, page));
            const { results, total_results } = await GET_LIST.data;
            movieList = [ ...movieList, ...results ];
            setData([ ...new Set(movieList) ]);
            if(data.length===total_results){
                setHasMore(false);
            }else{
                setHasMore(true);
            }
        } catch (error) {

        }
    }

    const handleScroll = () => {
        setTimeout(() => loadData(page+1), 500);
        setPage(page+1);
    }

    const handleSorting = ( type = 'asc' ) => {
        const temp = [...data];
        temp.sort((a, b) => type === 'desc' ? a.vote_average - b.vote_average :  b.vote_average - a.vote_average);
        setData(temp);
        setAsc(type==='asc' ? 'desc' : 'asc')
    }

    const mounted = useRef();
    useEffect(() => {
        if (!mounted.current) {
            // do componentDidMount;
            mounted.current = true;
            loadData();
        }
    })

    return (
        <StyledGallery>
            <img className="TMDB_Logo" src="./images/TMDB/blue_long_2-9665a76b1ae401a510ec1e0ca40ddcb3b0cfe45f1d51b77a308fea0845885648.svg" alt="TMDB" />
            {data.length > 0 && <div className="sort_by_rating">
                <p>rating</p>
                <button type="button" onClick={()=>handleSorting(asc)}><Icon name={asc==='asc' ? 'chevron-up' : 'chevron-down' }/></button>
            </div>}
            <InfiniteScroll
                dataLength={data.length} //This is important field to render the next data
                next={handleScroll}
                hasMore={hasMore}
                loader={<LoaderComponent />}
                endMessage={
                    <p style={{ marginTop: '20px', textAlign: 'center' }}>
                    <b>End of Page</b>
                    </p>
                }
                // below props only if you need pull down functionality
                refreshFunction={() => {
                    setData([]);
                    setPage(2);
                }}
                pullDownToRefresh
                pullDownToRefreshThreshold={50}
                pullDownToRefreshContent={
                    <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
                }
                releaseToRefreshContent={
                    <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
                }
                >
                <Cards data={data} />
            </InfiniteScroll>
            <br />
        </StyledGallery>
    )
}

export default Gallery;
