import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./assets/index.css";


const styleName =
  "color: white; background: linear-gradient(90deg, #2563eb, #9333ea); font-size: 36px; font-family: 'Inter', sans-serif; font-weight: 800; padding: 15px 30px; border-radius: 15px; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);";
const styleRole =
  "color: #9333ea; font-size: 20px; font-family: 'Inter', sans-serif; font-weight: bold; margin-top: 10px;";
const styleCollege =
  "color: #6b7280; font-size: 14px; font-family: monospace; margin-top: 5px;";
const styleMessage =
  "color: #2563eb; font-size: 14px; font-weight: bold; margin-top: 15px; padding-bottom: 20px;";

console.log("%cMANIK KORI", styleName);
console.log("%cFull-stack Developer", styleRole);

console.log(
  "%c Inspecting the code? Welcome to the engine of TechNav!",
  styleMessage,
);
// ----------------- ----------

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
