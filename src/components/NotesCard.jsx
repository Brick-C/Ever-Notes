import { useRef, useEffect, useState } from "react";
import TrashIcon from "../icons/Trash";
import { setNewOffset, setZIndex } from "../utils.js";

const NotesCard = ({ note }) => {
  //let position = JSON.parse(note.position);
  const colors = JSON.parse(note.colors);
  const body = JSON.parse(note.body);
  const [position, setposition] = useState(JSON.parse(note.position));
  let mouseStartPos = { x: 0, y: 0 };

  const cardRef = useRef(null);
  const mouseDown = (e) => {
    setZIndex(cardRef.current);
    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;

    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);
  };
  const mouseMove = (e) => {
    //Calculate move direction
    let mouseMoveDir = {
      x: mouseStartPos.x - e.clientX,
      y: mouseStartPos.y - e.clientY,
    };

    //update start position for next move
    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;

    //update card top and left position
    const newPosition = setNewOffset(cardRef.current, mouseMoveDir);
    setposition(newPosition);
  };

  const mouseUp = () => {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);
  };

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
      ref={cardRef}
      style={{
        backgroundColor: colors.colorBody,
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div
        className="card-header"
        style={{ backgroundColor: colors.colorHeader }}
        onMouseDown={mouseDown}
      >
        <TrashIcon />
      </div>
      <div className="card-body">
        <textarea
          onFocus={() => {
            setZIndex(cardRef.current);
          }}
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
