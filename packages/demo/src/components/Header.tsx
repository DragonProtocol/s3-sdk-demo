import { Link } from "react-router-dom";
import { useCallback, useEffect } from "react";

import { useUs3rProfileContext } from "@us3r-network/profile";
import { useUs3rThreadContext } from "@us3r-network/thread";

import shortPubKey from "../utils/shortPubKey";

export default function Header() {
  const { sessId, profile, connectUs3r, us3rAuth, us3rAuthValid } =
    useUs3rProfileContext()!;
  const { threadComposeClient, relationsComposeClient } =
    useUs3rThreadContext()!;

  const authComposeClients = useCallback(() => {
    if (us3rAuthValid && us3rAuth.valid) {
      us3rAuth.authComposeClients([
        threadComposeClient,
        relationsComposeClient,
      ]);
    }
  }, [relationsComposeClient, threadComposeClient, us3rAuth, us3rAuthValid]);

  useEffect(() => {
    authComposeClients();
  }, [authComposeClients]);

  return (
    <div className="bg-[#1b1e23] text-white container max-w-5xl mx-auto sticky top-0 flex justify-between items-center h-20 border-b border-gray-500 px-5 ">
      <Link to={"/"}>
        <div className="flex gap-2 items-end">
          <img src="/logo.png" alt="" className=" w-10 h-10" />
          <h3 className=" self-end font-bold text-lg">US3R</h3>
        </div>
      </Link>
      <div className=" flex gap-3 items-center">
        <div>
          <Link
            to={"/thread/create"}
            className="flex w-40 items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            CreateNewThread
          </Link>
        </div>
        {(sessId && (
          <div>
            <Link
              to={"profile"}
              className="flex w-40 items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {(profile?.name && <div>{profile?.name}</div>) || (
                <span>{shortPubKey(sessId, 8)}</span>
              )}
            </Link>
          </div>
        )) || (
          <div className="flex gap-1">
            <button
              onClick={async () => {
                await connectUs3r();
                authComposeClients();
              }}
              className="flex w-40 items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Metamask
            </button>
            <button
              onClick={async () => {
                await connectUs3r("phantom");
                authComposeClients();
              }}
              className="flex w-40 items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Phantom
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
