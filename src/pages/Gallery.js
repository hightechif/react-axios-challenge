import { useEffect, useState } from "react";
import { Button } from "@elevenia/master-ui/components/Atom";
import TMDB from "../store/actions/tmdb";
import Cards from "../components/Cards";

const Gallery = () => {
    const [data, setData] = useState([]);
    const [status, setStatus] = useState(true);

    const onLoadPoster = async (param = null) => {
        var movieList = [];
        for (let i = 1; i <= 10; i++) {
            const GET_LIST = await TMDB.getList(i);
            const { results } = await GET_LIST.data;
            movieList = [...movieList, ...results];
        }
        setData(movieList);
    }

    const close = () => {
        setStatus(!status);
    }
    
    useEffect(() => {
       status && onLoadPoster();
    }, [status])

    console.log(data);
    return (
        <div>
            {/* <Button variant="secondary" style={{ margin: "0 auto", textAlign: "center" }} type="submit" onClick={close}>HIDE</Button> */}
            <br />
            <img src="./images/TMDB/blue_long_2-9665a76b1ae401a510ec1e0ca40ddcb3b0cfe45f1d51b77a308fea0845885648.svg" style={{transform: "scale(0.5)"}} alt="" />
            {status && <Cards data={data} />}
            <br />
        </div>
    )
}

export default Gallery;
