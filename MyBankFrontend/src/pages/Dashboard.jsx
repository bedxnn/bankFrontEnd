import { useEffect, useState } from "react";
import api from "../assets/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function Dashboard() {
  const [balance, setBalance] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const chartData = transactions.map(tx => ({
    date: new Date(tx.createdAt).toLocaleDateString(),
    amount: tx.type === "DEPOSIT" ? tx.amount : -tx.amount
  }));

  useEffect(() => {
    api
      .get("/bank/balance", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(res => setBalance(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    api
      .get("/bank/summary", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(res => setSummary(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    api
      .get("/bank/transactions", {
        params: {
          page,
          size: 10
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(res => {
        setTransactions(res.data.content);
        setTotalPages(res.data.totalPages);
      })
      .catch(err => console.error(err));
  }, [page]);

  return (
    <div className="dashboard">
      <div className="balance">
        <h1>Dashboard</h1>
        <p>Balance: {balance}</p>
      </div>

      {summary && (
        <div className="summary">
          <h2>Account Summary</h2>
          <p>Total Deposits: ${summary.totalDeposits}</p>
          <p>Total Withdrawals: ${summary.totalWithdrawals}</p>
          <p>Balance: ${summary.balance}</p>
        </div>
      )}

      <div className="chart">
        <h2>Balance Activity</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={chartData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#e5e7eb"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="transactions">
        <h1>Transactions</h1>

        {transactions.length === 0 ? (
          <p>No transactions</p>
        ) : (
          <ul>
            {transactions.map((tx, index) => (
              <li
                key={index}
                className={tx.type === "DEPOSIT" ? "deposit" : "withdraw"}
              >
                <span>{tx.type}</span>
                <span className="amount">${tx.amount}</span>
                <span className="date">
                  {new Date(tx.createdAt).toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short"
                  })}
                </span>
              </li>
            ))}
          </ul>
        )}

        <div className="pagination">
          <button disabled={page === 0} onClick={() => setPage(page - 1)}>
            Prev
          </button>
          <span>
            Page {page + 1} of {totalPages}
          </span>
          <button
            disabled={page === totalPages - 1}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
