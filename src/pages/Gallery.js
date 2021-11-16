import { useEffect, useState } from "react";
import TMDB from "../store/actions/tmdb";
import Cards from "../components/Cards";
import { usePromiseTracker } from "react-promise-tracker";
import { trackPromise } from 'react-promise-tracker';
import Loader from 'react-loader-spinner';

const Gallery = () => {
    const [data, setData] = useState([]);

    const LoadingIndicator = (props) => {
        const { promiseInProgress } = usePromiseTracker();
      
        return (
            promiseInProgress && <div
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

    const onLoadPoster = async (param = null) => {
        var movieList = [];
        try {
            for (let i = 1; i <= 10; i++) {
                const GET_LIST = await trackPromise(TMDB.getList(i)) ;
                const { results } = await GET_LIST.data;
                movieList = [...movieList, ...results];
            }
            setData(movieList);   
        } catch (error) {
            
        }
    }
    
    useEffect(() => {
       onLoadPoster();
    }, [])

    return (
        <div>
            <br />
            <img src="./images/TMDB/blue_long_2-9665a76b1ae401a510ec1e0ca40ddcb3b0cfe45f1d51b77a308fea0845885648.svg" style={{transform: "scale(0.5)"}} alt="" />
            <LoadingIndicator />
            <Cards data={data} />
            <br />
        </div>
    )
}

export default Gallery;
