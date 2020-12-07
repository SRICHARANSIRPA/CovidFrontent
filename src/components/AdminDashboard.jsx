import React from "react";
import Chart from "./Chart";
function AdminDashboard({ setUser }) {
  return (
    <div className="AdminDashboard">
      <Chart setUser={setUser} />
    </div>
  );
}

export default AdminDashboard;
