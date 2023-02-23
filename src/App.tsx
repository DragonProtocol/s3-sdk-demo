import { Routes, Route, Outlet, Link } from "react-router-dom";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

import "./App.css";
import Home from "./container/Home";
// import ProfilePage from "./container/profile";
import { CeramicWrapper, useCeramicContext } from "./context";
import shortPubKey from "./utils/shortPubKey";
import { authWithEthereum, authWithPhantom } from "./utils";
import { useProfile } from "./hooks/useProfile";
import Profile from "./container/ProfilePage";

export default function App() {
  return (
    <CeramicWrapper>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </CeramicWrapper>
  );
}

function Layout() {
  // useGAPageView();
  return (
    <AppContainer>
      <Header />

      <main>
        <Outlet />
      </main>
    </AppContainer>
  );
}

const AppContainer = styled.div``;

function Header() {
  const { ceramic, profileComposeClient, postCommentComposeClient } =
    useCeramicContext();
  const [sessId, setSessId] = useState("");
  const { getProfile, profile } = useProfile();

  const authCeramic = useCallback(
    async (type?: string) => {
      const composeClients = [profileComposeClient, postCommentComposeClient];
      if (type === "phantom") {
        const sid = await authWithPhantom(ceramic, composeClients);
        setSessId(sid);
      } else {
        const sid = await authWithEthereum(ceramic, composeClients);
        setSessId(sid);
      }
      await getProfile();
    },
    [getProfile, ceramic, profileComposeClient, postCommentComposeClient]
  );
  const handleLogin = useCallback(async () => {
    // TODO ethereum
    authCeramic("phantom");
  }, [authCeramic]);

  useEffect(() => {
    handleLogin();
  }, [handleLogin]);

  return (
    <HeaderBox>
      <Link to={"/"}>
        <h3>S3</h3>
      </Link>
      <div>
        {(sessId && (
          <Link to={"profile"}>
            <span>{shortPubKey(sessId, 8)}</span>
          </Link>
        )) || (
          <div>
            <button
              onClick={() => {
                authCeramic();
              }}
            >
              login with metamask
            </button>
            <button
              onClick={() => {
                authCeramic("phantom");
              }}
            >
              login with phantom
            </button>
          </div>
        )}
        <div>{profile?.name}</div>
      </div>
    </HeaderBox>
  );
}

const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid gray;
`;
