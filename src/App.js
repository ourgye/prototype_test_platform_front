import {
  RouterProvider,
  createBrowserRouter,
  redirect,
  useRouteError,
} from "react-router-dom";
import "./App.css";
import Main from "./routes/Main";
import Sign, { action as signInAction } from "./routes/SignIn";
import Games from "./routes/Games";
import SignUp from "./routes/SignUp.jsx";
import MyPage from "./routes/MyPage.jsx";
import ModifyProfile from "./routes/ModifyProfile.jsx";

// tansack query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getUserInfo, getUserSession } from "./api/User.js";
import MyPageRoot from "./routes/MyPageRoot.jsx";

const queryClient = new QueryClient();

function ErrorBoundary() {
  let error = useRouteError();
  console.log(error);

  return null;
}

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [],
    },
    {
      path: "signin",
      element: <Sign />,
      action: async (queryClient) => {
        return async (request, params) => {
          // 임시로 해놓음. 안해놓으면 오류남.
          return null;
        };
      },
      // 로그인 완료 시 메인 페이지로 리다이렉트
      loader: async () => {
        const userId = getUserSession();
        if (userId) return redirect("/");

        return null;
      },
    },
    {
      path: "games",
      element: <Games />,
    },
    {
      path: "signup",
      element: <SignUp />,
      // 로그인 완료 시 메인 페이지로 리다이렉트
      loader: async () => {
        const userId = getUserSession();
        if (userId) return redirect("/");

        return null;
      },
    },
    {
      path: "/mypage",
      element: <MyPageRoot />,
      id: "mypageroot",
      loader: async () => {
        //미로그인 시 로그인 페이지로 리다이렉트
        const userId = getUserSession();
        if (!userId) return redirect("/signin");

        try {
          const res = await getUserInfo();

          if (!res.ok) throw new Error();
          const user = await res.json();
          // console.log(user);
          return user;
        } catch (error) {
          console.log(error);
          return null;
        }
      },
      children: [
        {
          index: true,
          element: <MyPage />,
        },
        {
          path: "/mypage/modify",
          element: <ModifyProfile />,
          // 미로그인 시 로그인 페이지로 리다이렉트
          // loader: async () => {
          //   const userId = getUserSession();
          //   if (!userId) return redirect("/signin");

          //   return null;
          // },
        },
      ],
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
