import React, { useEffect, useMemo } from "react";
import { EXPERIENCE } from "../../utils/constant";
interface IDrawCards {
  level: number;
  setLevel: React.Dispatch<React.SetStateAction<number>>;
  gold: number;
  setGold: React.Dispatch<React.SetStateAction<number>>;
  experience: number;
  setExperience: React.Dispatch<React.SetStateAction<number>>;
  currentChance: number[];
}
const DrawChance = (props: IDrawCards) => {
  const {
    level,
    setLevel,
    gold,
    setGold,
    experience,
    setExperience,
    currentChance,
  } = props;

  const currentNeedExperience = EXPERIENCE[level - 1];
  useEffect(() => {
    if (experience >= currentNeedExperience) {
      setLevel(level + 1);
      setExperience(experience - currentNeedExperience);
    }
  }, [experience]);

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

  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "KeyF") {
        buyExperience();
      }
    };
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [gold, level, experience]);

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
    </div>
  );
};

export default DrawChance;
