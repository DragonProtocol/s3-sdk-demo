import Author from "./Author";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

export default function ThreadCard({
  id,
  url,
  creator,
  date,
  favorsCount,
  commentsCount,
  votesCount,
  scoresCount,
  type,
}: {
  id: string;
  url: string;
  creator: string;
  date: string;
  favorsCount: number;
  commentsCount: number;
  votesCount: number;
  scoresCount: number;
  type?: string;
}) {
  return (
    <div className="border border-gray-500 rounded-md p-5">
      <div className="flex gap-5">
        <Author did={creator} />
      </div>
      <div className="mt-2">
        <div className="flex gap-2">
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="text-indigo-700"
          >
            {url}
          </a>
        </div>
        {type && (
          <div>
            <span className="bg-gray-700 px-1 rounded-md text-white">
              {" "}
              {type}
            </span>
          </div>
        )}
      </div>
      <div className="mt-2 flex gap-2">
        <span className="border border-gray-500 rounded-md px-2">
          favors {favorsCount}
        </span>
        <span className="border border-gray-500 rounded-md px-2">
          comments {commentsCount}
        </span>
        <span className="border border-gray-500 rounded-md px-2">
          votes {votesCount}
        </span>
        <span className="border border-gray-500 rounded-md px-2">
          scores {scoresCount}
        </span>
      </div>
      <div className="flex justify-between mt-2">
        <div>{dayjs(date).format("YYYY-MM-DD HH:mm:ss")}</div>
        <Link to={`/thread/${id}`} className="text-indigo-700">
          {"more >>"}
        </Link>
      </div>
    </div>
  );
}
