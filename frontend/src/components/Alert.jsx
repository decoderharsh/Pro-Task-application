import React, { useContext } from "react";
import AlertContext from "../context/alerts/AlertContext";

const Alert = () => {
  const context = useContext(AlertContext);
  const { alert, showAlert } = context;
  const capitalize = (word) => {
    if (!word) {
      return "";
    }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };
  const colors = {
    success: "border-green-300 bg-green-100 text-green-700",
    error: "border-red-300 bg-red-50 text-red-700",
    warning: "border-yellow-300 bg-yellow-50 text-yellow-700",
  };
  return (
    <>
    {showAlert &&
      <div className={`rounded-lg border px-4 py-3 ${colors[alert.type] || colors.success}`}>
        {capitalize(alert.message)}
      </div>
        }
    </>
  );
};

export default Alert;
