import { useState } from "react";
import styled from "styled-components";
import PlusIcon from "./PlusIcon";
import TagEditModal from "./TagsModal";

export default function Tags({
  tags,
  updateTags,
}: {
  editing?: boolean;
  tags: string[];
  updateTags: (tag: string[]) => void;
}) {
  const [edit, setEdit] = useState(false);
  return (
    <TagsContainer>
      <div className="title">
        <h3>Tags</h3>
      </div>
      <div className="tag-list">
        {tags.map((item) => {
          return <div key={item}>{item}</div>;
        })}
        <div className="add" onClick={() => setEdit(true)}>
          <PlusIcon />
        </div>
      </div>

      <TagEditModal
        open={edit}
        onClose={() => setEdit(false)}
        updateTags={(tag) => updateTags([...tags, tag])}
      />
    </TagsContainer>
  );
}

const TagsContainer = styled.div`
  padding: 20px;
  gap: 20px;
  width: 360px;
  box-sizing: border-box;
  background: #1b1e23;
  border-radius: 20px;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    > h3 {
      margin: 0;
      font-style: italic;
      font-weight: 700;
      font-size: 24px;
      line-height: 28px;
      display: flex;
      color: #ffffff;
    }
  }

  .tag-list {
    margin-top: 20px;
    display: flex;
    gap: 10px;
    > div {
      padding: 10px 20px;
      background: #1a1e23;
      border: 1px solid #39424c;
      border-radius: 12px;
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      text-align: center;
      box-sizing: border-box;
      height: 36px;
      color: #718096;
    }
    .add {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: 10px;
      isolation: isolate;

      cursor: pointer;
      background: #14171a;
      border-radius: 12px;
    }
  }
`;
