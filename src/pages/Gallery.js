import { useEffect, useState } from "react";
import { Button } from "@elevenia/master-ui/components/Atom";
import TMDB from "../store/actions/tmdb";
import Cards from "../components/Cards";

const Gallery = () => {
    const [data, setData] = useState([]);
    const [status, setStatus] = useState(true);

    const onLoadPoster = async (param = null) => {
        const GET_LIST = await TMDB.getList();
        const { results } = GET_LIST.data;
        setData(results);
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
            {status && <Cards data={data} />}
            <br />
        </div>
    )
}

export default Gallery;
