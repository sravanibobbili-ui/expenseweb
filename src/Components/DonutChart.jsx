import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "./View.css";
import Balance from "./Balance";

const DonutChart = ({ userId }) => {
  const [expensesData, setExpensesData] = useState([]);
  const [categoryTotals, setCategoryTotals] = useState({});
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/expense/exp/${userId}`
        );
        const data = await response.json();
        setExpensesData(data);
      } catch (error) {
        setExpensesData([]);
      }
    };

    // Fetch data initially
    fetchData();

    // Refresh data every 10 seconds
    const intervalId = setInterval(fetchData, 10000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [userId]);

  useEffect(() => {
    const calculateTotals = () => {
      const totals = {};
      if (!Array.isArray(expensesData)) return;

      expensesData.forEach((expense) => {
        const categoryId = expense.exp_cat_id;
        const amount = expense.amount;
        totals[categoryId] = (totals[categoryId] || 0) + amount;
      });
      setCategoryTotals(totals);
      setIsLoading(false); // Set loading state to false when data is fetched
    };

    calculateTotals();
  }, [expensesData]);

  useEffect(() => {
    if (
      !isLoading &&
      chartRef.current &&
      Object.keys(categoryTotals).length > 0
    ) {
      const ctx = chartRef.current.getContext("2d");

      const myChart = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: Object.keys(categoryTotals),
          datasets: [
            {
              label: "Expense Categories",
              data: Object.values(categoryTotals),
              backgroundColor: [
                "rgba(255, 99, 132, 0.8)",
                "rgba(54, 162, 235, 0.8)",
                "rgba(255, 206, 86, 0.8)",
                "rgba(75, 192, 192, 0.8)",
                "rgba(153, 102, 255, 0.8)",
              ],
              hoverBackgroundColor: [
                "rgba(255, 99, 132, 1.5)",
                "rgba(54, 162, 235, 1.5)",
                "rgba(255, 206, 86, 1.5)",
                "rgba(75, 192, 192, 1.5)",
                "rgba(153, 102, 255, 1.5)",
              ],
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              position: "bottom",
            },
          },
        },
      });

      return () => {
        myChart.destroy();
      };
    }
  }, [isLoading, categoryTotals]);

  return (
    <div className="view-container">
      <div className="canvas-container">
        {isLoading ? (
          <p>Loading chart...</p>
        ) : (
          <canvas ref={chartRef} width="400" height="400"></canvas>
        )}
      </div>
      <div className="balance-container">{/* <Balance user={userId} /> */}</div>
    </div>
  );
};

export default DonutChart;
