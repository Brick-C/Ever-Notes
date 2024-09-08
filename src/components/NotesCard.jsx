import { useRef, useEffect } from "react";
import TrashIcon from "../icons/Trash";

const NotesCard = ({ note }) => {
  let position = JSON.parse(note.position);
  const colors = JSON.parse(note.colors);
  const body = JSON.parse(note.body);

  const textAreaRef = useRef(null);
  useEffect(() => {
    autoGrow(textAreaRef.current);
  }, []);

  const autoGrow = (textarea) => {
    const { current } = textAreaRef;
    current.style.height = "auto";
    current.style.height = current.scrollHeight + "px";
  };

  return (
    <div
      className="card"
      style={{
        backgroundColor: colors.colorBody,
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div
        className="card-header"
        style={{ backgroundColor: colors.colorHeader }}
      >
        <TrashIcon />
      </div>
      <div className="card-body">
        <textarea
          ref={textAreaRef}
          style={{ color: colors.colorText }}
          defaultValue={body}
          onInput={() => {
            autoGrow(textAreaRef.current);
          }}
        ></textarea>
      </div>
    </div>
  );
};

export default NotesCard;
