import React, { useEffect, useState } from "react";
import { ICard } from "../../utils/interface";

interface IPreparationSeat {
  gold: number;
  setGold: React.Dispatch<React.SetStateAction<number>>;
  seats: ICard[];
  setSeats: React.Dispatch<React.SetStateAction<ICard[]>>;
  combatSeats: ICard[];
  setCombatSeats: React.Dispatch<React.SetStateAction<ICard[]>>;
  lv1Cards: ICard[];
  lv2Cards: ICard[];
  lv3Cards: ICard[];
  lv4Cards: ICard[];
  lv5Cards: ICard[];
  setLv1Cards: React.Dispatch<React.SetStateAction<ICard[]>>;
  setLv2Cards: React.Dispatch<React.SetStateAction<ICard[]>>;
  setLv3Cards: React.Dispatch<React.SetStateAction<ICard[]>>;
  setLv4Cards: React.Dispatch<React.SetStateAction<ICard[]>>;
  setLv5Cards: React.Dispatch<React.SetStateAction<ICard[]>>;
  threeStarCards: string[];
  setThreeStarCards: React.Dispatch<React.SetStateAction<string[]>>;
  threeStarCount: number[];
  setThreeStarCount: React.Dispatch<React.SetStateAction<number[]>>;
}
type Position = "combatSeats" | "preparationSeats" | null;
const PreparationSeat = (props: IPreparationSeat) => {
  const {
    gold,
    setGold,
    seats,
    setSeats,
    combatSeats,
    setCombatSeats,
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
    threeStarCount,
    setThreeStarCount,
  } = props;
  const [source, setSource] = useState<null | number>(null);
  const [target, setTarget] = useState<null | number>(null);
  const [from, setFrom] = useState<Position>(null);
  const [to, setTo] = useState<Position>(null);
  const [currentPosition, setCurPosition] = useState<Position>(null);
  // 鼠标当前放在哪张牌上
  const [currentCard, setCurrentCard] = useState<null | number>(null);

  const onDragStart = (index: number, position: Position) => () => {
    setSource(index);
    setFrom(position);
    console.log(index, 124);
  };
  const onDragOver =
    (index: number, position: Position) =>
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setTarget(index);
      setTo(position);
    };
  const onDragLeave = () => (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setTarget(null);
    setTo(null);
  };
  const onDrop = () => {
    if (source === null || target === null) return;
    const sourceItem =
      from === "combatSeats" ? combatSeats[source] : seats[source];
    const targetItem =
      to === "combatSeats" ? combatSeats[target] : seats[target];
    if (from === "combatSeats") {
      combatSeats[source] = targetItem;
    } else {
      seats[source] = targetItem;
    }
    if (to === "combatSeats") {
      combatSeats[target] = sourceItem;
    } else {
      seats[target] = sourceItem;
    }
    setCombatSeats([...combatSeats]);
    setSeats([...seats]);
    setSource(null);
    setTarget(null);
    setFrom(null);
    setTo(null);
  };

  useEffect(() => {
    const listener = (e: any) => {
      if (e.code === "KeyE") {
        // 出售卡牌
        if (currentCard === null) return;
        const _seats = currentPosition === "combatSeats" ? combatSeats : seats;
        const _currentCard = _seats[currentCard];
        _seats[currentCard] = {
          name: "",
          level: 0,
          star: 1,
          entanglement: [""],
        };
        setGold(
          gold +
            (_currentCard.star === 1
              ? _currentCard.level
              : _currentCard.level * Math.pow(3, _currentCard.star - 1) - 1)
        );
        if (currentPosition === "combatSeats") {
          setCombatSeats([..._seats]);
        } else {
          setSeats([..._seats]);
        }
        // 让卖掉的三星卡回到商店
        if (_currentCard.star === 3) {
          const _threeStarCards = threeStarCards;
          _threeStarCards.splice(_threeStarCards.indexOf(_currentCard.name), 1);
          setThreeStarCards([..._threeStarCards]);

          // 减少对应等级三星卡的数量记录
          const _threeStarCount = threeStarCount;
          _threeStarCount[_currentCard.level - 1] =
            _threeStarCount[_currentCard.level - 1] - 1;
          setThreeStarCount(_threeStarCount);
        }
        // 返回商店的卡
        const tempArr: ICard[] = [];
        for (let i = 0; i < Math.pow(3, _currentCard.star - 1); i++) {
          tempArr.push({
            ..._currentCard,
            star: 1,
          });
        }

        // eval(
        //   `setLv${_currentCard.level}Cards([...lv${_currentCard.level}Cards,...tempArr])`
        // );

        if (_currentCard.level === 1) {
          setLv1Cards([...lv1Cards, ...tempArr]);
        }
        if (_currentCard.level === 2) {
          setLv2Cards([...lv2Cards, ...tempArr]);
        }
        if (_currentCard.level === 3) {
          setLv3Cards([...lv3Cards, ...tempArr]);
        }
        if (_currentCard.level === 4) {
          setLv4Cards([...lv4Cards, ...tempArr]);
        }
        if (_currentCard.level === 5) {
          setLv5Cards([...lv5Cards, ...tempArr]);
        }
      }
    };
    window.addEventListener("keyup", listener);
    return () => {
      window.removeEventListener("keyup", listener);
    };
  }, [currentCard, ...seats, ...combatSeats]);

  useEffect(() => {
    const listener = (e: any) => {
      if (e.code === "KeyW") {
        if (currentCard === null) return;
        if (currentPosition === "combatSeats") {
          const index = seats.findIndex((item) => item.name === "");
          if (index >= 0) {
            const sourceItem = combatSeats[currentCard];
            const targetItem = seats[index];
            combatSeats[currentCard] = targetItem;
            seats[index] = sourceItem;
          }
        }
        if (currentPosition === "preparationSeats") {
          const index = combatSeats.findIndex((item) => item.name === "");
          if (index >= 0) {
            const sourceItem = seats[currentCard];
            const targetItem = combatSeats[index];
            seats[currentCard] = targetItem;
            combatSeats[index] = sourceItem;
          }
        }
        setSeats([...seats]);
        setCombatSeats([...combatSeats]);
      }
    };
    window.addEventListener("keyup", listener);
    return () => {
      window.removeEventListener("keyup", listener);
    };
  }, [currentCard, ...seats, ...combatSeats]);
  return (
    <div>
      <div
        style={{
          width: "900px",
          display: "flex",
          flexWrap: "wrap",
          margin: "20px auto",
        }}
        onDrop={onDrop}
      >
        {combatSeats.map((item, index) => {
          return (
            <div
              style={{
                width: "100px",
                height: "100px",
                margin: "8px",
                padding: "4px",
                // border: "3px hotpink solid",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundImage:
                  "url(https://game.gtimg.cn/images/lol/act/a20220802tftsimulator/slot-bg.png)",
                backgroundSize: "80%",
                backgroundRepeat: "no-repeat",
                backgroundPositionX: "10px",
                backgroundPositionY: "5px",
                marginLeft: `${index === 7 || index === 21 ? 57 : 0}px`,
              }}
              key={index}
              onDragOver={onDragOver(index, "combatSeats")}
              onDragLeave={onDragLeave()}
              onMouseOver={() => {
                setCurrentCard(index);
                setCurPosition("combatSeats");
              }}
              onMouseLeave={() => {
                setCurrentCard(null);
                setCurPosition(null);
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundImage: `url(${item?.avatar})`,
                  backgroundSize: "cover",
                }}
                draggable
                onDragStart={onDragStart(index, "combatSeats")}
                onMouseOver={() => {
                  setCurrentCard(index);
                  setCurPosition("combatSeats");
                }}
                onMouseLeave={() => {
                  setCurrentCard(null);
                  setCurPosition(null);
                }}
              >
                <div
                  style={{
                    color: "gold",
                    backdropFilter: "blur(3px)",
                  }}
                >
                  {item?.name &&
                    item?.name !== "" &&
                    new Array(item?.star).fill(0).map(() => {
                      return "★";
                    })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div
        style={{ display: "flex", width: "1170px", margin: "0 auto" }}
        onDrop={onDrop}
      >
        {seats.map((item, index) => {
          return (
            <div
              style={{
                width: "100px",
                height: "100px",
                margin: "8px",
                padding: "4px",
                border: "3px hotpink solid",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              key={index}
              onDragOver={onDragOver(index, "preparationSeats")}
              onDragLeave={onDragLeave()}
              onMouseOver={() => {
                setCurrentCard(index);
                setCurPosition("preparationSeats");
              }}
              onMouseLeave={() => {
                setCurrentCard(null);
                setCurPosition(null);
              }}
            >
              <div
                draggable={true}
                onDragStart={onDragStart(index, "preparationSeats")}
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundImage: `url(${item?.avatar})`,
                  backgroundSize: "cover",
                }}
                onMouseOver={() => {
                  setCurrentCard(index);
                  setCurPosition("preparationSeats");
                }}
                onMouseLeave={() => {
                  setCurrentCard(null);
                  setCurPosition(null);
                }}
              >
                <span style={{ color: "gold" }}>
                  {item?.name &&
                    item?.name !== "" &&
                    new Array(item?.star).fill(0).map(() => {
                      return "★";
                    })}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default PreparationSeat;
