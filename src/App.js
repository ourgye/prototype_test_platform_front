import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import "./App.css";
import Main from "./routes/Main";
import Sign, { action as signInAction } from "./routes/SignIn";
import Games from "./routes/Games";
import SignUp from "./routes/SignUp.jsx";
import MyPage from "./routes/MyPage.jsx";
import ModifyProfile from "./routes/ModifyProfile.jsx";

// tansack query
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { RequestHandler } from "msw";

const queryClient = new QueryClient();

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
    },
    {
      path: "signin",
      element: <Sign />,
      action: async (queryClient) => {
        return async (request, params) => {
          // 임시로 해놓음. 안해놓으면 오류남.
          return 0;
        };
      },
    },
    {
      path: "games",
      element: <Games />,
    },
    {
      path: "signup",
      element: <SignUp />,
    },
    {
      path: "userid?/mypage",
      element: <MyPage />,
    },
    {
      path: "userid?/mypage/modify",
      element: <ModifyProfile />,
    },
  ]);

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
