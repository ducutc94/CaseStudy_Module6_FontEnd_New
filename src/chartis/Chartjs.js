import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
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

    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/bills/bill-dto/${userId}`)
            .then((response) => {
                console.log(response.data);
                setBill(response.data);
            });
    }, [userId]);

    // Gộp ngày và tính tổng tiền theo ngày
    const dateTotals = {};
    bill.forEach((item) => {
        const date = item.localDateTime.split("T")[0]; // Lấy phần ngày
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
                pointBackgroundColor: "rgba(75, 192, 192, 1)", // Màu nền điểm
                pointBorderColor: "rgba(75, 192, 192, 1)", // Màu viền điểm
                borderColor: "rgba(255, 0, 0, 1)", // Màu đỏ đậm cho đường viền
                borderWidth: 2, // Độ dày đường viền
            },
        ],
    };

    return (
        <div>
            <h1>Biểu đồ tổng tiền từng ngày</h1>
            <Line data={chartData} />
        </div>
    );
}
