import React, { useEffect, useMemo, useState } from "react";
import { CARDS } from "../../utils/constant";
interface IDrawCards {
  gold: number;
  setGold: React.Dispatch<React.SetStateAction<number>>;
  currentChance: number[];
}
interface ICard {
  name: string;
  entanglement: string[];
}
const DrawCards = (props: IDrawCards) => {
  const { gold, setGold, currentChance } = props;
  const [lv1Cards, setLv1Cards] = useState<ICard[]>([]);
  const [lv2Cards, setLv2Cards] = useState<ICard[]>([]);
  const [lv3Cards, setLv3Cards] = useState<ICard[]>([]);
  const [lv4Cards, setLv4Cards] = useState<ICard[]>([]);
  const [lv5Cards, setLv5Cards] = useState<ICard[]>([]);
  const [refreshCount, setRefreshCount] = useState(0);
  const refreshShop = () => {
    if (gold < 2) return;
    setGold(gold - 2);
    setRefreshCount(refreshCount + 1);
  };
  // 初始化卡池
  useEffect(() => {
    debugger;
    if (
      lv1Cards?.length ||
      lv2Cards?.length ||
      lv3Cards?.length ||
      lv4Cards?.length ||
      lv5Cards?.length
    ) {
      return;
    }
    const _lv1Cards: ICard[] = [];
    CARDS.lv1Cards.map((card) => {
      const tempArr = new Array(39).fill(card);
      tempArr.forEach((item) => {
        _lv1Cards.push(item);
      });
    });
    setLv1Cards(_lv1Cards);
    // 二费卡
    const _lv2Cards: ICard[] = [];
    CARDS.lv2Cards.map((card) => {
      const tempArr = new Array(26).fill(card);
      tempArr.forEach((item) => {
        _lv2Cards.push(item);
      });
    });
    setLv2Cards(_lv2Cards);
    // 三费卡
    const _lv3Cards: ICard[] = [];
    CARDS.lv3Cards.map((card) => {
      const tempArr = new Array(21).fill(card);
      tempArr.forEach((item) => {
        _lv3Cards.push(item);
      });
    });
    setLv3Cards(_lv3Cards);
    // 四费卡
    const _lv4Cards: ICard[] = [];
    CARDS.lv4Cards.map((card) => {
      const tempArr = new Array(13).fill(card);
      tempArr.forEach((item) => {
        _lv4Cards.push(item);
      });
    });
    setLv4Cards(_lv4Cards);
    // 五费卡
    const _lv5Cards: ICard[] = [];
    CARDS.lv5Cards.map((card) => {
      const tempArr = new Array(10).fill(card);
      tempArr.forEach((item) => {
        _lv5Cards.push(item);
      });
    });
    setLv5Cards(_lv5Cards);
  }, []);

  //   console.log(lv1Cards, lv2Cards, lv3Cards, lv4Cards, lv5Cards, 124);
  const getColor = (lv: number) => {
    let color = "grey";
    debugger;
    switch (lv) {
      case 1:
        color = "grey";
        break;
      case 2:
        color = "green";
        break;
      case 3:
        color = "blue";
        break;
      case 4:
        color = "purple";
        break;
      case 5:
        color = "gold";
        break;
      default:
        break;
    }
    return color;
  };
  const getCard = (lv: number) => {
    return () => {
      if (lv === 1) {
        const randomIndex = Math.floor(
          Math.random() * (lv1Cards.length - 1) + 1
        );
        return (
          <span style={{ margin: "8px", padding: "4px", color: getColor(lv) }}>
            {lv1Cards[randomIndex]?.name}
          </span>
        );
      }
      if (lv === 2) {
        const randomIndex = Math.floor(
          Math.random() * (lv2Cards.length - 1) + 1
        );
        return (
          <span style={{ margin: "8px", padding: "4px", color: getColor(lv) }}>
            {lv2Cards[randomIndex]?.name}
          </span>
        );
      }
      if (lv === 3) {
        const randomIndex = Math.floor(
          Math.random() * (lv3Cards.length - 1) + 1
        );
        return (
          <span style={{ margin: "8px", padding: "4px", color: getColor(lv) }}>
            {lv3Cards[randomIndex]?.name}
          </span>
        );
      }
      if (lv === 4) {
        const randomIndex = Math.floor(
          Math.random() * (lv4Cards.length - 1) + 1
        );
        return (
          <span style={{ margin: "8px", padding: "4px", color: getColor(lv) }}>
            {lv4Cards[randomIndex]?.name}
          </span>
        );
      }
      if (lv === 5) {
        const randomIndex = Math.floor(
          Math.random() * (lv5Cards.length - 1) + 1
        );
        return (
          <span style={{ margin: "8px", padding: "4px", color: getColor(lv) }}>
            {lv5Cards[randomIndex]?.name}
          </span>
        );
      }
    };
  };
  const getSingleCard = () => {
    const randomNum = Math.random();
    if (randomNum < currentChance[0]) {
      return getCard(1)();
    } else if (randomNum < currentChance[0] + currentChance[1]) {
      return getCard(2)();
    } else if (
      randomNum <
      currentChance[0] + currentChance[1] + currentChance[2]
    ) {
      return getCard(3)();
    } else if (
      randomNum <
      currentChance[0] + currentChance[1] + currentChance[2] + currentChance[3]
    ) {
      return getCard(4)();
    } else {
      return getCard(5)();
    }
  };
  const renderShop = useMemo(() => {
    return [1, 1, 1, 1, 1].map((index) => {
      return <span key={index}>{getSingleCard()}</span>;
    });
  }, [refreshCount]);
  return (
    <div>
      <span>
        <button onClick={refreshShop}>刷新</button>
      </span>
      <div>{renderShop}</div>
    </div>
  );
};
export default DrawCards;
