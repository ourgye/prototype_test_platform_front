import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

async function enableMocking() {
  //process.env.NODE_ENV === 'development'

  const { worker } = await import("./mocks/broswer");

  return worker.start();
}

const root = ReactDOM.createRoot(document.getElementById("root"));
enableMocking().then(() => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
