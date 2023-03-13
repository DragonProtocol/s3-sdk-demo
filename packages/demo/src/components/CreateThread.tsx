import { useUs3rThreadContext } from "@us3r-network/thread";
import { useCallback } from "react";

export default function CreateThread() {
  const { createNewThread } = useUs3rThreadContext()!;
  const createNewThreadAction = useCallback(async () => {
    createNewThread({
      url: "https://scan.s3.xyz/",
      type: "s3",
    });
  }, [createNewThread]);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <span className=" font-bold">url</span>
        <input type="text" placeholder="url" />
      </div>
      <div className="flex gap-2">
        <span className="font-bold">type</span>
        <input type="text" placeholder="optional" />
      </div>
      <div>
        <button
          onClick={createNewThreadAction}
          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-5 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          createNewThread
        </button>
      </div>
    </div>
  );
}
