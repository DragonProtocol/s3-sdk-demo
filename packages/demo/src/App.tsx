import { Routes, Route, Outlet } from "react-router-dom";

import Profile from "./container/ProfilePage";

import Header from "./components/Header";
import Home from "./container/Home";
import { Us3rProfileProvider } from "@us3r-network/profile";
import { Us3rThreadProvider } from "@us3r-network/thread";
import Thread from "./container/Thread";
import ThreadCreate from "./container/ThreadCreate";

const ceramicHost =
  process.env.REACT_APP_CERAMIC_HOST || "http://13.215.254.225:7007";
export default function App() {
  return (
    <Us3rProfileProvider ceramicHost={ceramicHost}>
      <Us3rThreadProvider ceramicHost={ceramicHost}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="thread/create" element={<ThreadCreate />} />
            <Route path="thread/:streamId" element={<Thread />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </Us3rThreadProvider>
    </Us3rProfileProvider>
  );
}

function Layout() {
  // useGAPageView();
  return (
    <div className="flex flex-col">
      <Header />

      <main className="grow">
        <Outlet />
      </main>
    </div>
  );
}
