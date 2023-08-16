import {useEffect, useState} from "react";
import axios from "axios";

export default function Chartjs() {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.id;
    const [bill, setBill] = useState([]);
    const [total,setTotal]=useState(0);


    useEffect(() => {
        axios.get(`http://localhost:8080/api/bills/bill-dto/${userId}`).then((response) => {
            console.log(response.data)
            setBill(response.data);
            let sumPrice=0;
            for (let i = 0; i < response.data.length; i++) {
                sumPrice+=response.data[i].total
            }
            setTotal(sumPrice);
        });
    },[])

    return(
        <>
            {total}
        </>
    )
}