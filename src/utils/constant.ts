export const CHANCE = [
  [1, 0, 0, 0, 0], //一级
  [1, 0, 0, 0, 0], // 二级
  [0.75, 0.25, 0, 0, 0], // 三级
  [0.5, 0.3, 0.2, 0, 0], // 四级
  [0.4, 0.33, 0.25, 0.02, 0], // 五级
  [0.25, 0.4, 0.3, 0.05, 0], // 六级
  [0.19, 0.3, 0.35, 0.15, 0.01], // 七级
  [0.16, 0.2, 0.35, 0.25, 0.04], // 八级
  [0.09, 0.15, 0.3, 0.3, 0.16], // 九级
  [0.05, 0.1, 0.2, 0.4, 0.25], // 十级(高端购物, 升级咯)
  [0.01, 0.02, 0.12, 0.1, 0.35], // 十一级(升级咯+高端购物)
];

export const EXPERIENCE = [2, 2, 6, 10, 20, 36, 56, 80, 100];
export const CARDS = {
  lv1Cards: [
    { name: "艾希", entanglement: ["源计划", "枪手"] },
    { name: "卢锡安", entanglement: ["未来战士", "迅捷射手", "混沌战士"] },
    { name: "潘森", entanglement: ["未来战士", "爱心使者"] },
    { name: "布里兹", entanglement: ["AI", "斗士"] },
    { name: "凯尔", entanglement: ["魔盗团", "决斗大师"] },
    { name: "拉克丝", entanglement: ["星之守护者", "灵能使"] },
    { name: "内瑟斯", entanglement: ["幻灵战队", "吉祥物"] },
    { name: "雷克顿", entanglement: ["源计划", "斗士"] },
    { name: "塞拉斯", entanglement: ["幻灵战队", "混沌战士"] },
    { name: "孙悟空", entanglement: ["机甲", "护卫"] },
    { name: "普朗克", entanglement: ["超级英雄", "决斗大师"] },
    { name: "露露", entanglement: ["小天才", "爱心使者"] },
    { name: "波比", entanglement: ["小天才", "护卫"] },
  ],
  lv2Cards: [
    { name: "安妮", entanglement: ["福牛守护者", "小天才", "灵能使"] },
    { name: "派克", entanglement: ["至高天", "黑客"] },
    { name: "蔚", entanglement: ["魔盗团", "斗士", "秘术"] },
    { name: "卡密尔", entanglement: ["AI", "混沌战士"] },
    { name: "德莱文", entanglement: ["机甲", "精英战士"] },
    { name: "李青", entanglement: ["超级英雄", "爱心使者", "斗士"] },
    { name: "墨菲特", entanglement: ["超级英雄", "吉祥物"] },
    { name: "希维尔", entanglement: ["未来战士", "枪手"] },
    { name: "亚索", entanglement: ["源计划", "决斗大师"] },
    { name: "伊泽瑞尔", entanglement: ["魔盗团", "平行宇宙", "迅捷射手"] },
    { name: "菲奥娜", entanglement: ["福牛守护者", "决斗大师"] },
    { name: "金克斯", entanglement: ["幻灵战队", "淘气包"] },
    { name: "芮尔", entanglement: ["星之守护者", "护卫"] },
  ],
  lv3Cards: [
    { name: "阿利斯塔", entanglement: ["福牛守护者", "秘术", "吉祥物"] },
    { name: "慎", entanglement: ["未来战士", "护卫", "黑客"] },
    { name: "纳尔", entanglement: ["小天才", "淘气包"] },
    { name: "贾克斯", entanglement: ["机甲", "斗士"] },
    { name: "卡莎", entanglement: ["星之守护者", "迅捷射手"] },
    { name: "乐芙兰", entanglement: ["AI", "灵能使", "黑客"] },
    { name: "莫甘娜", entanglement: ["怪兽"] },
    { name: "尼菈", entanglement: ["星之守护者", "决斗大师"] },
    { name: "拉莫斯", entanglement: ["怪兽"] },
    { name: "锐雯", entanglement: ["幻灵战队", "斗士", "护卫"] },
    { name: "娑娜", entanglement: ["魔盗团", "灵能使", "爱心使者"] },
    { name: "薇恩", entanglement: ["幻灵战队", "决斗大师"] },
    { name: "薇古丝", entanglement: ["至高天", "吉祥物"] },
  ],
  lv4Cards: [
    { name: "艾克", entanglement: ["星之守护者", "淘气包", "秘术"] },
    { name: "崔斯特", entanglement: ["未来战士", "灵能使", "决斗大师"] },
    { name: "亚托克斯", entanglement: ["怪兽"] },
    { name: "盖伦", entanglement: ["机甲", "护卫"] },
    { name: "厄运小姐", entanglement: ["幻灵战队", "精英战士", "迅捷射手"] },
    { name: "妮蔻", entanglement: ["星之守护者", "灵能使"] },
    { name: "佛耶戈", entanglement: ["福牛守护者", "混沌战士", "爱心使者"] },
    { name: "沃里克", entanglement: ["源计划", "AI", "斗士"] },
    { name: "奥利瑞安·索尔", entanglement: ["怪兽"] },
    { name: "卑尔维斯", entanglement: ["怪兽"] },
    { name: "莎米拉", entanglement: ["魔盗团", "精英战士", "枪手"] },
  ],
  lv5Cards: [
    { name: "费德提克", entanglement: ["怪兽"] },
    { name: "迦娜", entanglement: ["气象主播", "灵能使"] },
    { name: "蕾欧娜", entanglement: ["机甲", "混沌战士", "秘术"] },
    { name: "莫德凯撒", entanglement: ["源计划", "精英战士"] },
    { name: "终极伊泽瑞尔", entanglement: ["未来战士", "平行宇宙", "抢手"] },
    { name: "努努和威朗普", entanglement: ["小天才", "吉祥物"] },
    { name: "辛德拉", entanglement: ["星之守护者", "爱心使者"] },
    { name: "厄加特", entanglement: ["怪兽"] },
  ],
};
