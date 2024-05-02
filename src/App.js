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
import NewProject from "./routes/NewProject.jsx";
import Proto from "./routes/Proto.jsx";
import ProtoRoot from "./routes/ProtoRoot.jsx";
import GameDetail from "./routes/GameDetail.jsx";
import { AuthProvider } from "./context/auth.js";

// tansack query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  getUserCountInfo,
  getUserInfo,
  getUserSession,
  getUserInfoForMyPage,
} from "./api/User.js";
import MyPageRoot from "./routes/MyPageRoot.jsx";
import NewGame from "./routes/NewGame.jsx";
import RouterRoot from "./routes/RouterRoot.jsx";
import {
  getExistingGameList,
  getGamesByCategory,
  getMainGameInfo,
  getTestDetail,
} from "./api/Proto.js";
import { makeManyUser } from "./api/TempApi.js";
import SelectedGame from "./routes/SelectedGame.jsx";
import Search from "./routes/Search.jsx";
import { get } from "firebase/database";

const queryClient = new QueryClient();

function ErrorBoundary() {
  let error = useRouteError();
  console.log(error);

  return null;
}

function App() {
  const userid = getUserSession();
  console.log(userid);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RouterRoot />,
      children: [
        {
          index: true,
          element: <Main />,
          id: "main",
          loader: async () => {
            try {
              // 게임 데이터 미리 로딩
              const user = getUserSession();
              const mainGameData = await getMainGameInfo(user);

              return mainGameData;
            } catch (error) {
              console.log(error);
              return null;
            }
          },
        },
        {
          path: "search",
          element: <Search />,
          id: "search",
        },
        {
          path: "signin",
          element: <Sign />,
          // 로그인 완료 시 메인 페이지로 리다이렉트
          loader: async () => {
            const userId = getUserSession();
            if (userId) return redirect("/");

            return null;
          },
        },
        {
          path: "games/:gameCategory",
          element: <Games />,
          id: "categorygames",
          loader: async ({ params }) => {
            try {
              const gameList = await getGamesByCategory(
                params.gameCategory.toUpperCase()
              );
              return gameList;
            } catch (error) {
              console.log(error);
              return null;
            }
          },
        },
        {
          path: "game/:testId",
          element: <GameDetail />,
          id: "gamedetail",
          loader: async ({ params }) => {
            try {
              const res = await getTestDetail(params.testId);
              return res;
            } catch (error) {
              console.log(error);
              return null;
            }
          },
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
          path: "mypage",
          element: <MyPageRoot />,
          id: "mypageroot",
          loader: async () => {
            //미로그인 시 로그인 페이지로 리다이렉트
            const userId = getUserSession();
            if (!userId) return redirect("/signin");
            return null;
          },
          children: [
            {
              index: true,
              element: <MyPage />,
              id: "mypageindex",
              loader: async () => {
                //미로그인 시 로그인 페이지로 리다이렉트
                try {
                  const user = await getUserInfoForMyPage();

                  return user;
                } catch (error) {
                  console.log(error);
                  return null;
                }
              },
            },
            {
              path: "modify",
              element: <ModifyProfile />,
              id: "mypagemodify",
              loader: async () => {
                //미로그인 시 로그인 페이지로 리다이렉트
                try {
                  const user = await getUserInfo();

                  return user;
                } catch (error) {
                  console.log(error);
                  return null;
                }
              },
            },
          ],
        },
        {
          path: "proto",
          element: <ProtoRoot />,
          loader: async () => {
            const userId = getUserSession();
            if (!userId) return redirect("/signin");

            return null;
          },
          children: [
            {
              index: true,
              element: <Proto />,
            },
            {
              path: "choosegame",
              id: "choosegame",
              element: <SelectedGame />,
              loader: async () => {
                const user = getUserSession();
                const gameList = await getExistingGameList(user.email);

                return gameList;
              },
            },
            {
              path: "newproject",
              element: <NewProject />,
            },
            {
              path: "newgame",
              element: <NewGame />,
            },
          ],
        },
      ],
    },
  ]);

  return (
    <div className="App">
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
