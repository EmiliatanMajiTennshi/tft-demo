import React, { useMemo, useState } from "react";
import { chance } from "../../utils/constant";
const DrawChance = () => {
  const [level, setLevel] = useState(1);

  const currentChance = useMemo(() => chance[level - 1], [level]);

  const renderChanceText = useMemo(() => {
    return (
      <div>
        {currentChance.map((chance, index) => (
          <span key={index} className={"current-draw-chance"}>{`lv${index}: ${
            chance * 100
          }%`}</span>
        ))}
      </div>
    );
  }, [level]);

  return (
    <div>
      <h1>{renderChanceText}</h1>
      当前等级:lv{level}
      <button
        onClick={() => {
          if (level >= 11) return;
          setLevel((_level) => _level + 1);
        }}
      >
        升级
      </button>
      <button
        onClick={() => {
          if (level <= 1) return;
          setLevel((_level) => _level - 1);
        }}
      >
        降级
      </button>
    </div>
  );
};

export default DrawChance;
