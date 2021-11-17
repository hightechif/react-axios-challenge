import { useEffect, useState, useRef } from "react";
import TMDB from "../store/actions/tmdb";
import Cards from "../components/Cards";
import { trackPromise } from 'react-promise-tracker';
import Loader from 'react-loader-spinner';
import { Icon } from "@elevenia/master-ui/components/Atom";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";

const StyledGallery = styled.div`
    .sort_by_rating {
        width: 100px;
        background: #2BADCC;
        border-radius: 10px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 10px;
        h1 {
            padding-top: 7px;
            color: #FFFFFF;
            font-weight: bolder;
            font-size: larger;
        }
        .sort_button {
            display: flex;
            flex-direction: column;
        }
    }
`

const Gallery = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

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
            const GET_LIST = await trackPromise(TMDB.getList(1, page));
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


    const sortingUp = () => {
        const temp = [...data];
        temp.sort((a, b) => b.vote_average - a.vote_average);
        setData(temp);
    }

    const sortingDown = () => {
        const temp = [...data];
        temp.sort((a, b) => a.vote_average - b.vote_average);
        setData(temp);
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
            <br />
            <img src="./images/TMDB/blue_long_2-9665a76b1ae401a510ec1e0ca40ddcb3b0cfe45f1d51b77a308fea0845885648.svg" style={{ transform: "scale(0.5)" }} alt="" />
            {data.length > 0 && <div className="sort_by_rating">
                <h1>rating</h1>
                <div className="sort_button">
                    <button onClick={sortingUp}><Icon  name="chevron-up" /></button>
                    <button onClick={sortingDown}><Icon  name="chevron-down" /></button>
                </div>
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
