import React, { useMemo, useState } from "react";
// import { DemoDnd } from "../page/DemoDnd";
import { DrawChance } from "../components/DrawChance";
import { DrawCards } from "../components/DrawCards";
import { PreparationSeats } from "../components/PreparationSeats";
import { CHANCE } from "../utils/constant";
import { ICard } from "../utils/interface";
import "./Main.css";

const initPreparationSeats: ICard[] = new Array(9).fill({
  name: "",
  level: 0,
  star: 1,
  entanglement: [""],
});
const initStore: ICard[] = new Array(5).fill({
  name: "",
  level: 0,
  star: 1,
  entanglement: [""],
});
const initCombatSeats: ICard[] = new Array(28).fill({
  name: "",
  level: 0,
  star: 1,
  entanglement: [""],
});

const Main = () => {
  // 等级
  const [level, setLevel] = useState(1);

  // 金币
  const [gold, setGold] = useState(50);

  // 经验
  const [experience, setExperience] = useState(0);

  // 备战席
  const [seats, setSeats] = useState(initPreparationSeats);

  // 战斗席
  const [combatSeats, setCombatSeats] = useState(initCombatSeats);

  // 当前商店
  const [currentStore, setCurrentStore] = useState(initStore);

  // 卡池
  const [lv1Cards, setLv1Cards] = useState<ICard[]>([]);
  const [lv2Cards, setLv2Cards] = useState<ICard[]>([]);
  const [lv3Cards, setLv3Cards] = useState<ICard[]>([]);
  const [lv4Cards, setLv4Cards] = useState<ICard[]>([]);
  const [lv5Cards, setLv5Cards] = useState<ICard[]>([]);

  // 当前三星卡
  const [threeStarCards, setThreeStarCards] = useState<string[]>([]);

  // 刷新
  const [refreshCount, setRefreshCount] = useState(0);

  // 当前抽卡概率
  const currentChance = useMemo(() => CHANCE[level - 1], [level]);

  // 不同等级三星卡数量
  const [threeStarCount, setThreeStarCount] = useState<number[]>([
    0, 0, 0, 0, 0,
  ]);

  const drawChanceProps = {
    level,
    setLevel,
    gold,
    setGold,
    experience,
    setExperience,
    currentChance,
    refreshCount,
    setRefreshCount,
  };
  const drawCardsProps = {
    level,
    gold,
    setGold,
    currentChance,
    lv1Cards,
    setLv1Cards,
    lv2Cards,
    setLv2Cards,
    lv3Cards,
    setLv3Cards,
    lv4Cards,
    setLv4Cards,
    lv5Cards,
    setLv5Cards,
    seats,
    setSeats,
    combatSeats,
    setCombatSeats,
    currentStore,
    setCurrentStore,
    threeStarCards,
    setThreeStarCards,
    refreshCount,
    setRefreshCount,
    threeStarCount,
    setThreeStarCount,
  };
  const preparationSeatProps = {
    gold,
    setGold,
    seats,
    setSeats,
    lv1Cards,
    lv2Cards,
    lv3Cards,
    lv4Cards,
    lv5Cards,
    setLv1Cards,
    setLv2Cards,
    setLv3Cards,
    setLv4Cards,
    setLv5Cards,
    threeStarCards,
    setThreeStarCards,
    combatSeats,
    setCombatSeats,
    threeStarCount,
    setThreeStarCount,
  };

  return (
    <div>
      <PreparationSeats {...preparationSeatProps}></PreparationSeats>
      <div className="store">
        <DrawChance {...drawChanceProps}></DrawChance>
        <DrawCards {...drawCardsProps}></DrawCards>
      </div>
    </div>
  );
};
export default Main;
