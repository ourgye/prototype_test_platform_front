import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Main from "./routes/Main";
import Sign from "./routes/SignIn";
import Games from "./routes/Games";
import SignUp from "./routes/SignUp.jsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
    },
    {
      path: "signin",
      element: <Sign />,
    },
    {
      path: "games",
      element: <Games />,
    },
    {
      path: "signup",
      element: <SignUp />,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
