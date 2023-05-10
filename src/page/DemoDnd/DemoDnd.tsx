import React, { useState } from "react";

const demoArr = ["demo", "", "test", " "];

const DemoDnd = () => {
  const [items, setItems] = useState(demoArr);
  const [source, setSource] = useState<null | number>(0);
  const [target, setTarget] = useState<null | number>(0);
  const onDragStart = (index: number) => () => {
    setSource(index);
  };
  const onDragOver =
    (index: number) => (e: React.DragEvent<HTMLSpanElement>) => {
      e.preventDefault();

      setTarget(index);
      // console.log(e, index, "onDragover");
    };
  const onDragLeave =
    (index: number) => (e: React.DragEvent<HTMLSpanElement>) => {
      e.preventDefault();
      setTarget(null);
      console.log(e, index, "leave");

      // setTarget(null);
      // setSource(null);
    };
  const onDrop = () => {
    if (source === null || target === null) return;
    // debugger;
    const sourceItem = items[source];
    const targetItem = items[target];
    items[target] = sourceItem;
    items[source] = targetItem;
    setItems([...items]);
    setSource(null);
    setTarget(null);
  };
  return (
    <div style={{ display: "flex" }} onDrop={onDrop}>
      {items.map((item, index) => {
        return (
          <span
            style={{ width: 100, height: 100, border: "3px solid red" }}
            key={item}
            onDragOver={onDragOver(index)}
            onDragLeave={onDragLeave(index)}
          >
            <span
              draggable
              onDragStart={onDragStart(index)}
              // style={{ color: index === source ? "transparent" : "" }}
            >
              {item}
            </span>
          </span>
        );
      })}
    </div>
  );
};

export default DemoDnd;
