import React, { useEffect } from "react";
import { EXPERIENCE } from "../../utils/constant";
interface IDrawCards {
  level: number;
  setLevel: React.Dispatch<React.SetStateAction<number>>;
  gold: number;
  setGold: React.Dispatch<React.SetStateAction<number>>;
  experience: number;
  setExperience: React.Dispatch<React.SetStateAction<number>>;
  currentChance: number[];
  refreshCount: number;
  setRefreshCount: React.Dispatch<React.SetStateAction<number>>;
}
const DrawChance = (props: IDrawCards) => {
  const {
    level,
    setLevel,
    gold,
    setGold,
    experience,
    setExperience,
    refreshCount,
    setRefreshCount,
  } = props;

  const currentNeedExperience = EXPERIENCE[level - 1];
  useEffect(() => {
    if (experience >= currentNeedExperience) {
      setLevel(level + 1);
      setExperience(experience - currentNeedExperience);
    }
  }, [experience]);

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
  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "KeyD") {
        refreshShop();
      }
    };
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [refreshCount, gold]);

  const buyExperience = () => {
    if (level >= 10) return;
    if (gold < 4) {
      console.log("金币不足");
      return;
    }
    setExperience(experience + 4);
    setGold(gold - 4);
  };
  const refreshShop = () => {
    if (gold < 2) return;
    setGold(gold - 2);
    setRefreshCount(refreshCount + 1);
  };
  return (
    <div>
      <div
        style={{
          fontSize: 20,
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span>
          {level}级{" "}
          <span
            style={{
              fontSize: "10px",
              color: "orange",
              cursor: "pointer",
            }}
            onClick={() => {
              setLevel(1);
              setExperience(0);
            }}
          >
            重置等级
          </span>
        </span>
        <div style={{ marginRight: 10, fontWeight: 400, fontSize: 16 }}>
          {experience}/{currentNeedExperience || 0}
        </div>
      </div>

      <div style={{ margin: "5px 0" }}>
        <button
          style={{
            width: "150px",
            height: "40px",
          }}
          onClick={buyExperience}
        >
          升级
        </button>
      </div>
      <div style={{ margin: "5px 0" }}>
        <button
          style={{
            width: "150px",
            height: "40px",
          }}
          onClick={refreshShop}
        >
          刷新
        </button>
      </div>
      <div>
        <span>当前金币: {gold}</span>
      </div>
      <button
        style={{ width: "100%", height: 40 }}
        onClick={() => {
          setGold(gold + 50);
        }}
      >
        增加50金币
      </button>
    </div>
  );
};

export default DrawChance;
