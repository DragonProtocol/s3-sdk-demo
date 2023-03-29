import { useState } from "react";

export default function Tags({
  editing = false,
  tags,
  updateTags,
}: {
  editing?: boolean;
  tags: string[];
  updateTags: (tags: string[]) => void;
}) {
  const [tempTag, setTempTag] = useState("");
  return (
    <div>
      <h3>tags</h3>
      {tags.map((item) => {
        return <div key={item}>{item}</div>;
      })}

      {editing && (
        <div>
          <input
            type="text"
            value={tempTag}
            onChange={(e) => {
              setTempTag(e.target.value);
            }}
          />

          <button
            onClick={() => {
              updateTags([...tags, tempTag]);
              setTempTag("");
            }}
          >
            +
          </button>
        </div>
      )}
    </div>
  );
}
