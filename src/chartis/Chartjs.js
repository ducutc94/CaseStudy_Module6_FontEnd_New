import React, {useEffect, useState} from "react";
import axios from "axios";
import {Line} from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement
);

export default function Chartjs() {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.id;
    const [bill, setBill] = useState([]);
    const [displayType, setDisplayType] = useState("day"); // Đặt giá trị mặc định là "day"

    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/bills/bill-dto/${userId}`)
            .then((response) => {
                console.log(response.data);
                setBill(response.data);
            });
    }, [userId]);

    const handleDisplayTypeChange = (type) => {
        setDisplayType(type);
    };

    // Gộp ngày và tính tổng tiền theo ngày/tháng/năm
    const dateTotals = {};
    bill.forEach((item) => {
        let date = "";
        if (displayType === "day") {
            date = item.localDateTime.split("T")[0];
        } else if (displayType === "month") {
            date = item.localDateTime.split("-").slice(0, 2).join("-");
        } else if (displayType === "year") {
            date = item.localDateTime.split("-")[0];
        }

        if (!dateTotals[date]) {
            dateTotals[date] = 0;
        }
        dateTotals[date] += item.total;
    });

    const dateLabels = Object.keys(dateTotals);
    const totalAmounts = dateLabels.map((date) => dateTotals[date]);

    const chartData = {
        labels: dateLabels,
        datasets: [
            {
                label: "Tổng doanh thu",
                data: totalAmounts,
                pointBackgroundColor: "rgba(75, 192, 192, 1)",
                pointBorderColor: "rgba(75, 192, 192, 1)",
                borderColor: "rgba(255, 0, 0, 1)",
                borderWidth: 2,
            },
        ],
    };

    return (
        <div>
            <div className={`row`} style={{marginTop: "50px", marginBottom: "20px"}}>
                <div className={`col-md-8`}>
                    <p>THỐNG KÊ</p>
                </div>
                <div className={`col-md-4`}>
                    <div className="d-flex statistical">
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <button type="button" className="btn btn-secondary btn-danger"
                                    onClick={() => handleDisplayTypeChange("day")}>Ngày
                            </button>
                            <button type="button" className="btn btn-secondary btn-danger false"
                                    onClick={() => handleDisplayTypeChange("month")}>Tháng
                            </button>
                            <button type="button" className="btn btn-secondary  btn-danger false"
                                    onClick={() => handleDisplayTypeChange("year")}>Năm
                            </button>
                        </div>
                    </div>
                </div>
            </div>


            <Line data={chartData}/>
        </div>
    );
}
