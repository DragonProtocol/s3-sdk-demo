import { Routes, Route, Outlet, Link } from "react-router-dom";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

import "./App.css";
import Home from "./container/Home";
import shortPubKey from "./utils/shortPubKey";
import Profile from "./container/ProfilePage";
import {
  S3Provider,
  useS3Context,
  authWithEthereum,
  authWithPhantom,
} from "@us3r/js-sdk";

export default function App() {
  return (
    <S3Provider
      ceramicHost={
        process.env.REACT_APP_CERAMIC_HOST || "https://ceramic.s3.xyz/"
      }
    >
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </S3Provider>
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
  const {
    ceramic,
    profileComposeClient,
    postCommentComposeClient,
    getPersonalProfile,
  } = useS3Context()!;
  const [sessId, setSessId] = useState("");
  const [profile, setProfile] = useState<{
    name: string;
  }>();

  const authCeramic = useCallback(
    async (type?: string) => {
      if (!ceramic || !profileComposeClient || !postCommentComposeClient)
        return;
      const composeClients = [profileComposeClient, postCommentComposeClient];
      if (type === "phantom") {
        localStorage.setItem("ceramic-wallet", "phantom");
        const sid = await authWithPhantom(ceramic, composeClients);
        setSessId(sid);
      } else {
        localStorage.setItem("ceramic-wallet", "metamask");
        const sid = await authWithEthereum(ceramic, composeClients);
        setSessId(sid);
      }
      if (getPersonalProfile) {
        const data = await getPersonalProfile();
        setProfile(data);
      }
    },
    [
      getPersonalProfile,
      ceramic,
      profileComposeClient,
      postCommentComposeClient,
    ]
  );
  const handleLogin = useCallback(async () => {
    // TODO ethereum
    const prev = localStorage.getItem("ceramic-wallet") || "";
    if (!prev) return;
    authCeramic(prev);
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
