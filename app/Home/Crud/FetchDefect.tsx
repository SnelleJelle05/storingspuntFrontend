import {useEffect, useState} from "react";

const FetchDefect = () => {
    const [defects, setDefects] = useState([]);

    useEffect(() => {
        const fetchDefects = async () => {
        const response = await fetch("https://storingspunt-d02668d953a7.herokuapp.com/api/defects");
        const defects = await response.json();
        setDefects(defects);
        };

        fetchDefects();
    }, []);

    return { defects };
}
export default FetchDefect