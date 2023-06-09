import React, { useEffect, useMemo, useRef } from "react";
import { CARDS } from "../../utils/constant";
import { ICard } from "../../utils/interface";
import { getColor } from "../../utils/common";
interface IDrawCards {
  gold: number;
  setGold: React.Dispatch<React.SetStateAction<number>>;
  currentChance: number[];
  lv1Cards: ICard[];
  setLv1Cards: React.Dispatch<React.SetStateAction<ICard[]>>;
  lv2Cards: ICard[];
  setLv2Cards: React.Dispatch<React.SetStateAction<ICard[]>>;
  lv3Cards: ICard[];
  setLv3Cards: React.Dispatch<React.SetStateAction<ICard[]>>;
  lv4Cards: ICard[];
  setLv4Cards: React.Dispatch<React.SetStateAction<ICard[]>>;
  lv5Cards: ICard[];
  setLv5Cards: React.Dispatch<React.SetStateAction<ICard[]>>;
  seats: ICard[];
  setSeats: React.Dispatch<React.SetStateAction<ICard[]>>;
  combatSeats: ICard[];
  setCombatSeats: React.Dispatch<React.SetStateAction<ICard[]>>;
  currentStore: any[];
  setCurrentStore: React.Dispatch<React.SetStateAction<any[]>>;
  threeStarCards: string[];
  setThreeStarCards: React.Dispatch<React.SetStateAction<string[]>>;
  refreshCount: number;
  setRefreshCount: React.Dispatch<React.SetStateAction<number>>;
  level: number;
  threeStarCount: number[];
  setThreeStarCount: React.Dispatch<React.SetStateAction<number[]>>;
}

const LV1_AMOUNT = 39;
const LV2_AMOUNT = 26;
const LV3_AMOUNT = 21;
const LV4_AMOUNT = 13;
const LV5_AMOUNT = 10;
const DrawCards = (props: IDrawCards) => {
  const {
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
    level,
    threeStarCount,
    setThreeStarCount,
  } = props;

  const selectedCardsRef = useRef<{ card: ICard; index: number }[]>([]); //记录已经被选入商店的卡牌
  const seatsRef = useRef<null | ICard[]>(null);
  seatsRef.current = seats;
  const combatSeatsRef = useRef<null | ICard[]>(null);
  combatSeatsRef.current = combatSeats;
  const goldRef = useRef<number>(0);
  goldRef.current = gold;

  // 初始化卡池
  const needInit = !(
    lv1Cards?.length ||
    lv2Cards?.length ||
    lv3Cards?.length ||
    lv4Cards?.length ||
    lv5Cards?.length
  );

  useEffect(() => {
    if (!needInit) {
      return;
    }
    const _lv1Cards: ICard[] = [];
    CARDS.lv1Cards.map((card) => {
      const tempArr = new Array(LV1_AMOUNT).fill(card);
      tempArr.forEach((item) => {
        _lv1Cards.push(item);
      });
    });
    setLv1Cards(_lv1Cards);
    // 二费卡
    const _lv2Cards: ICard[] = [];
    CARDS.lv2Cards.map((card) => {
      const tempArr = new Array(LV2_AMOUNT).fill(card);
      tempArr.forEach((item) => {
        _lv2Cards.push(item);
      });
    });
    setLv2Cards(_lv2Cards);
    // 三费卡
    const _lv3Cards: ICard[] = [];
    CARDS.lv3Cards.map((card) => {
      const tempArr = new Array(LV3_AMOUNT).fill(card);
      tempArr.forEach((item) => {
        _lv3Cards.push(item);
      });
    });
    setLv3Cards(_lv3Cards);
    // 四费卡
    const _lv4Cards: ICard[] = [];
    CARDS.lv4Cards.map((card) => {
      const tempArr = new Array(LV4_AMOUNT).fill(card);
      tempArr.forEach((item) => {
        _lv4Cards.push(item);
      });
    });
    setLv4Cards(_lv4Cards);
    // 五费卡
    const _lv5Cards: ICard[] = [];
    CARDS.lv5Cards.map((card) => {
      const tempArr = new Array(LV5_AMOUNT).fill(card);
      tempArr.forEach((item) => {
        _lv5Cards.push(item);
      });
    });
    setLv5Cards(_lv5Cards);
    setRefreshCount(refreshCount + 1);
  }, []);

  //   console.log(lv1Cards, lv2Cards, lv3Cards, lv4Cards, lv5Cards, 124);
  const getRandomCard = (cardPool: ICard[]): { card: ICard; index: number } => {
    const randomIndex = Math.floor(Math.random() * cardPool.length);
    const randomCard = cardPool[randomIndex];
    //防止商店的卡重复
    let flag = 0;
    selectedCardsRef.current.forEach((item) => {
      if (item.index === randomIndex && item.card.name === randomCard.name) {
        flag = 1;
      }
    });
    selectedCardsRef.current = [
      ...selectedCardsRef.current,
      { card: randomCard, index: randomIndex },
    ];
    if (threeStarCards.indexOf(randomCard.name) !== -1 || flag === 1) {
      try {
        // 不能抽到已经三星的卡
        return getRandomCard(cardPool);
      } catch (err) {
        console.log(err, "该费用的卡已被抽光, 重新抽其他费用的卡");
        return getSingleCard();
      }
    }

    return { card: randomCard, index: randomIndex };
  };

  const getCard = (
    lv: 1 | 2 | 3 | 4 | 5
  ): (() => { card: ICard; index: number }) => {
    return () => {
      if (lv === 1) {
        if (lv1Cards.length < 1) {
          return getSingleCard();
        }
        return getRandomCard(lv1Cards);
      }
      if (lv === 2) {
        if (lv2Cards.length < 1) {
          return getSingleCard();
        }
        return getRandomCard(lv2Cards);
      }
      if (lv === 3) {
        if (lv3Cards.length < 1) {
          return getSingleCard();
        }
        return getRandomCard(lv3Cards);
      }
      if (lv === 4) {
        if (lv4Cards.length < 1) {
          return getSingleCard();
        }
        return getRandomCard(lv4Cards);
      }
      if (lv === 5) {
        if (lv5Cards.length < 1) {
          return getSingleCard();
        }
        return getRandomCard(lv5Cards);
      }
      return {} as { card: ICard; index: number };
    };
  };

  useEffect(() => {
    selectedCardsRef.current = [];
    const _currentStore = [1, 1, 1, 1, 1].map(() => {
      return getSingleCard();
    });
    setCurrentStore([..._currentStore]);
  }, [refreshCount]);

  // 商店每张独立的牌
  const getSingleCard = (): { card: ICard; index: number } => {
    if (needInit)
      return {
        card: { name: "等待初始化", level: 1, star: 1, entanglement: [""] },
        index: 1,
      };
    const randomNum = Math.random();
    if (
      randomNum < currentChance[0] &&
      threeStarCount[0] < CARDS.lv1Cards.length
    ) {
      return getCard(1)();
    } else if (
      randomNum < currentChance[0] + currentChance[1] &&
      threeStarCount[1] < CARDS.lv2Cards.length
    ) {
      return getCard(2)();
    } else if (
      randomNum < currentChance[0] + currentChance[1] + currentChance[2] &&
      threeStarCount[2] < CARDS.lv3Cards.length
    ) {
      return getCard(3)();
    } else if (
      randomNum <
        currentChance[0] +
          currentChance[1] +
          currentChance[2] +
          currentChance[3] &&
      threeStarCount[3] < CARDS.lv4Cards.length
    ) {
      return getCard(4)();
    } else if (threeStarCount[4] >= CARDS.lv5Cards.length) {
      return getSingleCard();
    } else {
      return getCard(5)();
    }
  };
  const upDateCardPool = (
    level: 0 | 1 | 2 | 3 | 4 | 5,
    index: number,
    operate: "delete"
  ) => {
    if (operate === "delete") {
      if (level === 1) {
        const _lv1Cards = lv1Cards;
        _lv1Cards.splice(index, 1);
        setLv1Cards([..._lv1Cards]);
      }
      if (level === 2) {
        const _lv2Cards = lv2Cards;
        _lv2Cards.splice(index, 1);
        setLv2Cards([..._lv2Cards]);
      }
      if (level === 3) {
        const _lv3Cards = lv3Cards;
        _lv3Cards.splice(index, 1);
        setLv3Cards([..._lv3Cards]);
      }
      if (level === 4) {
        const _lv4Cards = lv4Cards;
        _lv4Cards.splice(index, 1);
        setLv4Cards([..._lv4Cards]);
      }
      if (level === 5) {
        const _lv5Cards = lv5Cards;
        _lv5Cards.splice(index, 1);
        setLv5Cards([..._lv5Cards]);
      }
    }
  };

  // 购买卡牌
  const buyCard = (card: ICard, cardIndex: number, storeIndex: number) => {
    if (
      !seatsRef.current ||
      !combatSeatsRef.current ||
      !card?.name ||
      goldRef.current < card.level
    )
      return;
    const tempCardArr: {
      index: number;
      position: "combatSeats" | "preparationSeats";
    }[] = [];
    for (const index in seatsRef.current) {
      if (
        seatsRef.current[index].name === card.name &&
        seatsRef.current[index].star === 1
      ) {
        tempCardArr.push({
          index: Number(index),
          position: "preparationSeats",
        });
      }
    }
    for (const index in combatSeatsRef.current) {
      if (
        combatSeatsRef.current[index].name === card.name &&
        combatSeatsRef.current[index].star === 1
      ) {
        tempCardArr.push({ index: Number(index), position: "combatSeats" });
      }
    }
    if (tempCardArr.length === 2) {
      const _seats = seatsRef.current;
      const _combatSeats = combatSeatsRef.current;
      const combatSeatsIndex = tempCardArr.findIndex(
        (item) => item.position === "combatSeats"
      );
      if (combatSeatsIndex >= 0) {
        _combatSeats[tempCardArr[combatSeatsIndex].index] = {
          name: card.name,
          level: card.level,
          star: 2,
          entanglement: card.entanglement,
          img: card?.img,
          avatar: card?.avatar,
        };
        tempCardArr.forEach((item) => {
          if (
            item.index === tempCardArr[combatSeatsIndex].index &&
            item.position === "combatSeats"
          ) {
            return;
          }
          if (item.position === "combatSeats") {
            _combatSeats[item.index] = {
              name: "",
              level: 0,
              star: 1,
              entanglement: [""],
            };
          }
          if (item.position === "preparationSeats") {
            _seats[item.index] = {
              name: "",
              level: 0,
              star: 1,
              entanglement: [""],
            };
          }
        });
      } else {
        _seats[tempCardArr[0].index] = {
          name: card.name,
          level: card.level,
          star: 2,
          entanglement: card.entanglement,
          img: card?.img,
          avatar: card?.avatar,
        };
        _seats[tempCardArr[1].index] = {
          name: "",
          level: 0,
          star: 1,
          entanglement: [""],
        };
      }

      setGold(goldRef.current - card.level);
      //购买后删除卡池里的卡
      upDateCardPool(card.level, cardIndex, "delete");
      // 删除商店里的卡
      const _currentStore = currentStore;
      _currentStore[storeIndex] = { name: "", level: 0, entanglement: [""] };
      setCurrentStore([..._currentStore]);
      // 合成三星
      const temp2StarArr: {
        index: number;
        position: "combatSeats" | "preparationSeats";
      }[] = [];
      for (const index in seatsRef.current) {
        if (
          seatsRef.current[index].name === card.name &&
          seatsRef.current[index].star === 2
        ) {
          temp2StarArr.push({
            index: Number(index),
            position: "preparationSeats",
          });
        }
      }
      for (const index in combatSeatsRef.current) {
        if (
          combatSeatsRef.current[index].name === card.name &&
          combatSeatsRef.current[index].star === 2
        ) {
          temp2StarArr.push({ index: Number(index), position: "combatSeats" });
        }
      }
      if (temp2StarArr.length === 3) {
        setThreeStarCards([...threeStarCards, card.name]);
        const _threeStarCount = threeStarCount;

        _threeStarCount[card.level - 1] = _threeStarCount[card.level - 1] + 1;

        setThreeStarCount(_threeStarCount);
        const _seats = seatsRef.current;
        const _combatSeats = combatSeatsRef.current;
        const combatSeatsIndex = temp2StarArr.findIndex(
          (item) => item.position === "combatSeats"
        );
        if (combatSeatsIndex >= 0) {
          _combatSeats[temp2StarArr[combatSeatsIndex].index] = {
            name: card.name,
            level: card.level,
            star: 3,
            entanglement: card.entanglement,
            img: card?.img,
            avatar: card?.avatar,
          };
          temp2StarArr.forEach((item) => {
            if (
              item.index === temp2StarArr[combatSeatsIndex].index &&
              item.position === "combatSeats"
            ) {
              return;
            }
            if (item.position === "combatSeats") {
              _combatSeats[item.index] = {
                name: "",
                level: 0,
                star: 1,
                entanglement: [""],
              };
            }
            if (item.position === "preparationSeats") {
              _seats[item.index] = {
                name: "",
                level: 0,
                star: 1,
                entanglement: [""],
              };
            }
          });
        } else {
          _seats[temp2StarArr[0].index] = {
            name: card.name,
            level: card.level,
            star: 3,
            entanglement: card.entanglement,
            img: card?.img,
            avatar: card?.avatar,
          };
          _seats[temp2StarArr[1].index] = {
            name: "",
            level: 0,
            star: 1,
            entanglement: [""],
          };
          _seats[temp2StarArr[2].index] = {
            name: "",
            level: 0,
            star: 1,
            entanglement: [""],
          };
        }
      }
      setSeats([..._seats]);
      setCombatSeats([..._combatSeats]);
      return;
    }
    for (const index in seatsRef.current) {
      if (seatsRef.current[index].name === "") {
        setGold(goldRef.current - card.level);
        const _seats = seatsRef.current;
        _seats[index] = card;
        setSeats([..._seats]);
        //购买后删除卡池里的卡
        upDateCardPool(card.level, cardIndex, "delete");
        // 删除商店里的卡
        const _currentStore = currentStore;
        _currentStore[storeIndex] = { name: "", level: 0, entanglement: [""] };
        setCurrentStore([..._currentStore]);
        break;
      }
    }
  };
  console.log(lv5Cards, 11);

  // 概率文本
  const renderChanceText = useMemo(() => {
    return (
      <div
        style={{ marginLeft: "20px", display: "flex", alignItems: "center" }}
      >
        <div>
          {currentChance.map((chance, index) => (
            <span key={index} className={"current-draw-chance"}>
              {`lv${index + 1}: ${chance * 100}%`}&nbsp;&nbsp;
            </span>
          ))}
        </div>
        <div style={{ fontSize: "20px", fontWeight: 700, marginLeft: "200px" }}>
          剩余金币:{gold}
        </div>
      </div>
    );
  }, [level, gold]);

  // 商店
  const renderShop = useMemo(() => {
    console.log(currentStore, 124);

    return currentStore.map((item, storeIndex) => {
      const { card, index: cardIndex } = item;
      return (
        <div
          style={{
            width: "240px",
            height: "170px",
            border: "1px solid blue",
            margin: "8px",
          }}
          onClick={() => buyCard(card, cardIndex, storeIndex)}
        >
          {card?.name && (
            <div
              style={{
                width: "230px",
                height: "160px",
                padding: "5px",
                backgroundColor: getColor(card?.level),
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "80%",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundImage: `url('${card?.img}')`,
                  backgroundSize: "cover",
                }}
              ></div>
              <div
                style={{
                  marginTop: "5px",
                  color: "#fff",
                  fontSize: "18px",
                  fontWeight: "700",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>{card?.name}</div>
                <div>{card?.level}</div>
              </div>
            </div>
          )}
        </div>
      );
    });
  }, [
    ...currentStore,
    lv1Cards,
    lv2Cards,
    lv3Cards,
    lv4Cards,
    lv5Cards,
    threeStarCount,
  ]);
  return (
    <div>
      <div style={{ textAlign: "left" }}>{renderChanceText}</div>
      <div style={{ display: " flex" }}>{renderShop}</div>
    </div>
  );
};
export default DrawCards;
