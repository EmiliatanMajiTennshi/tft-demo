import React, { useEffect, useMemo, useState } from "react";
import { CHANCE, EXPERIENCE } from "../../utils/constant";
import { DrawCards } from "../DrawCards";
const DrawChance = () => {
  const [level, setLevel] = useState(1);
  const [gold, setGold] = useState(50);
  const [experience, setExperience] = useState(0);

  const currentNeedExperience = EXPERIENCE[level - 1];
  useEffect(() => {
    if (experience >= currentNeedExperience) {
      setLevel(level + 1);
      setExperience(experience - currentNeedExperience);
    }
  }, [experience]);

  const currentChance = useMemo(() => CHANCE[level - 1], [level]);

  // 概率文本
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

  const buyExperience = () => {
    if (level >= 10) return;
    if (gold < 4) {
      console.log("金币不足");
      return;
    }
    setExperience(experience + 4);
    setGold(gold - 4);
  };
  return (
    <div>
      <h1>{renderChanceText}</h1>
      <h1>当前等级: lv{level}</h1>
      <div>
        当前经验: {experience}/{currentNeedExperience || 0}
      </div>
      <div> {experience}</div>
      <div>
        <button onClick={buyExperience}>升级</button>
      </div>
      <div>
        <span>当前金币: {gold}</span>
        <button
          onClick={() => {
            setGold(gold + 50);
          }}
        >
          增加50金币
        </button>
      </div>
      <DrawCards
        gold={gold}
        setGold={setGold}
        currentChance={currentChance}
      ></DrawCards>
    </div>
  );
};

export default DrawChance;
