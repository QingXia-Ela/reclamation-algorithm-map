import { NodeType, NodeWeather, NodeResource } from "@/three/types/node";

export const NodeTypeArray: Array<NodeType> = [
  "hunt",
  "cave",
  "encounter",
  "battle",
  "collect",
  "expedition",
  "gate",
  "mine",
  "market",
  "nest",
  "outpost",
  "shop",
  "upgrade_battle",
  "upgrade_scout"
]

export const NodeTypeData: Array<{ value: NodeType, label: string }> = [
  {
    value: "hunt",
    label: "捕猎区",
  },
  {
    value: "collect",
    label: "资源区",
  },
  {
    value: "battle",
    label: "冲突区",
  },
  {
    value: "encounter",
    label: "奇遇",
  },
  {
    value: "cave",
    label: "无主地",
  },
  {
    value: "expedition",
    label: "集结区",
  },
  {
    value: "gate",
    label: "关隘",
  },
  {
    value: "mine",
    label: "荒废城镇",
  },
  {
    value: "market",
    label: "后舍",
  },
  {
    value: "nest",
    label: "要塞",
  },
  {
    value: "outpost",
    label: "哨站",
  },
  {
    value: "shop",
    label: "商店",
  },
  {
    value: "upgrade_battle",
    label: "营垒",
  },
  {
    value: "upgrade_scout",
    label: "岗哨",
  },
];

export const NodeWeatherArray: Array<NodeWeather> = [
  "normal",
  "thunder",
  "thunder_storm",
  "heat",
  "heat_wave",
  "hot",
  "sandstorm",
  "big_sandstorm",
  "acid_rain",
  "drought"
]

export const NodeWeatherData: Array<{ value: NodeWeather, label: string }> = [
  {
    value: "normal",
    label: "晴朗",
  },
  {
    value: "thunder",
    label: "阵雷",
  },
  {
    value: "thunder_storm",
    label: "雷暴",
  },
  {
    value: "heat",
    label: "骄阳天",
  },
  {
    value: "heat_wave",
    label: "烈阳天",
  },
  {
    value: "hot",
    label: "酷暑",
  },
  {
    value: "sandstorm",
    label: "沙暴",
  },
  {
    value: "big_sandstorm",
    label: "巨型沙暴",
  },
  {
    value: "acid_rain",
    label: "蚀雨",
  },
  {
    value: "drought",
    label: "干旱",
  },
];

export const NodeResourceWeather: Array<NodeResource> = [
  "venison",
  "water",
  "wood",
  "beef",
  "crab",
  "diamond",
  "iron",
  "poultry",
  "stone",
]

export const NodeResourcesData: Array<{ value: NodeResource, label: string }> = [
  {
    value: "water",
    label: "清水",
  },
  {
    value: "wood",
    label: "木材",
  },
  {
    value: "stone",
    label: "石材",
  },
  {
    value: "iron",
    label: "铁矿石",
  },
  {
    value: "diamond",
    label: "澄亮石",
  },
  {
    value: "venison",
    label: "圆圆肉片",
  },
  {
    value: "poultry",
    label: "羽兽翅肉",
  },
  {
    value: "crab",
    label: "蟹钳"
  },
  {
    value: "beef",
    label: "带腿骨肉"
  },
];

export const NodeDescriptionData = {
  "丰饶灌木林": "几处树荫下的土地滋养着各种意想不到的小生物，微风吹过，羽兽的身影和树叶混作一团。在这里的阴凉处坐上哪怕一小会儿，也会感到心旷神怡。",
  "崎岖乱石岗": "曲折的小径通往不同的区域，每一处都是矿工们最熟悉的工作环境。乏味、沉闷、充满汗水的生活还有监工们的监视， 这些都是王酋的“恩赐”。",
  "熔铁之心": "被不明势力占据的铁矿脉蜿蜒在熔岩之间，巨大的热量让所有人都汗流浃背。王酋们追逐资源的传统，让这里 人满为患，也让冲突一触即发。",
  "寻觅澄亮": "矿工们正在前往矿洞深处寻觅澄亮石，这种矿物在市面上高昂的价格让大家更愿意冒风险深入没有勘探 完全的地层中。",
  "惊叫洞穴": "探索未知的洞穴，就像拆开来路不明的包裹——永远不知道里面究竟是惊喜，还是惊吓。",
  "“迎宾走廊”": "在酷热的萨尔 贡地区，阴凉的天然洞穴是争夺的焦点，它们就像一间间客房，如果“一不小心”打开了“房门”，那将面对主人愤怒的攻击。",
  "“金库”": "丰饶的矿脉往 往与危险共生。洞中的矿工们正在加紧工作，而想要保住他们的劳动成果，最好的办法就是拦住那些不请自来的入侵者。",
  "藏宝湾": "崎岖的礁石在风 平浪静的水面下布下了汹涌的暗流，露出水面的部分也十分狰狞，很显然，这是一座易守难攻的天然堡垒。",
  "聚羽之地": "有树木的地方就有羽兽，所 以把两样都带回家也是一种不错的选择。",
  "浅草荒原": "在萨尔贡的荒季和盛季，普通人的生活就像荒原上的草地的长势一样大相径庭，唯一不变的是 四处寻觅的王酋军队，他们架起武器，平等地威胁着所有人。",
  "岛中蟹穴": "在这人迹罕至的岛屿上，磐蟹们根据水面的涨落而不断转移，若仔细观察 ，它们总能从固定的方位出现，又在固定的方位消失，这到底是怎么回事呢？",
  "迷失沼滩": "王酋下属的军队也未必熟悉自己的领地，更何况是一些连 当地人都很少前往的地方。好消息是，在这种动物繁多的沼滩，至少不会有人因挨饿而丢掉性命。",
  "献祭之所": "部落民们正在进行一场古老的仪式。 在这诡异的仪式过程中，有黑影闪过，一场好戏即将上演。",
  "炎岩关": "<@lv.description><机关石门></>击破后会解锁新的可探索区域。被击破前， 每次进入关卡会完全恢复原状。\\n再向前走似乎是一个完全不同的地方，大地向上隆起，熔岩四处溅射，混乱与灼热是这一切的尽头。",
  "翠影关": "<@lv.description><机关石门></>击破后会解锁新的可探索区域。被击破前，每次进入关卡会完全恢复原状。\\n再向前走似乎是一个完全不同的地方，湖水阻挡步伐，池沼扭曲视线，迷幻与寂静是这一切的尽头。",
  "矿牢爬行": "一连串古旧的矿洞相互连接，它们曾经是阿尔萨兰兴盛的见证者，也是如今 混乱局面无言的承受者。\\n<@lv.description>本次行动中干员部署不受近远程限制</>",
  "峰回歧路": "旅途中充满了分岔路口，或影响自己，或影响他人，无论选择哪一条路，都要承受每一次选择带来的结果。",
  "翠梦遗址": "<@lv.description>每日刷新敌人，领袖敌人未被击倒则次日恢复全部生命值（非陌域中时）</>\\n古老的神庙矗立在水面的尽头。他们在等着我们，在等着我们向他们展示心中的迷茫并向他们寻求庇护。",
  "火圈狂舞": "<@lv.description>每日刷新敌人，领袖敌人未被击倒则次日恢复全部生命值（非陌域中时）</>\\n曾经是观众的时候，会惊叹于杂耍艺人的表演水平。现在是 对手，该因为杂耍艺人的战斗水平而头痛了。",
  "宿命终结": "<@lv.description>每日刷新敌人，领袖敌人未被击倒则次日恢复全部生命值（非陌域中时）</>\\n终结这片大地赋予的宿命，是我们来到这里的唯一目的。",
  "清泉之下": "<@lv.description>每日刷新敌人，领袖敌人未被击倒则次日恢复全部生命值（非陌域中时）</>\\n冰凉的瀑布下，埋藏着一段不为人知的秘密。它温和、轻柔，又带着一丝惆怅，飘荡在某些人的心头，只要提起，气氛就 变得忧伤。",
  "晶生玲珑": "<@lv.description>每日刷新敌人，领袖敌人未被击倒则次日恢复全部生命值（非陌域中时）</>\\n晶洞的环境造就了一切，包括蕴蓄待出的生灵，也会让外来者察觉到认知之外的危险。",
  "深岩裂谷": "薄雾笼罩，幽邃阴暗，统治这片土地的领主只遵从内心。",
  "广袤迎敌之处": "拉布-阿拉契什图雨林的风在这里失去了方向，稀疏的石块是平坦旷野上少数的守望者。",
  "峥嵘迎敌之处": "埃克卢穆伊绿洲的来水在这里浸润析出 ，细微涓流是峻岭深谷中唯一的弹奏者。",
  "荒弃迎敌之处": "纳卢塔巴提河通航时期的建筑群在这里被时光损毁，略带咸味的风沙是一切的见证者。",
  "驻扎地": "最初的落脚点。或许不够豪华，但能够安心休息。只要守住这里，不管失败几次都能东山再起，重新再来。",
  "乌胡米什": "<@lv.description><号令点></>击破后可以在此处定期派出干员收集大量木材\\n“像一群峭壁”是人们对这里的最佳概括，它曾经是雨林地区颇为繁荣的林业小镇，而如今这里还有时刻取人性命的不明势力和沉默的树林。",
  "布卢塔巴图": "<@lv.description><号令点></>击破后可以在此处定期派出干员收集大量石材\\n“ 甜水故道”是这座废弃小镇鼎盛时期的称呼，而如今，与它一起不复存在的还有曾绕城而过的纳卢塔巴提河。甜水在何方？如今唯有漫漫黄沙和小片林地。",
  "那穆图巴辛": "<@lv.description><号令点></>击破后可以在此处定期派出干员收集大量木材与少量石材\\n“沙子的玩笑”是旅人给这里起的称呼，传言当年这里还有矿工的时候，站在最高的建筑上可以看到在天边若隐若现的异域风景。",
  "别塔卜-阿帕卡里": "<@lv.description><号令点></>击破后可以在此处定期派出干员收集铁矿石\\n“贤人的门房”是这里的旧称，相传一位贤人在这里居住，但在萨尔贡，有这样说法的地方实在太多，人们只会记得这里曾是一座矿业小镇。",
  "前进营地": "把车上的物资完全展开就能建成一个营地，有的时候这能发挥出超乎想象的战斗力。",
  "众人会聚之地": "沙 海、雨林和绿洲的交会点，失落的舒巴特-阿尔萨兰的心脏。",
  "狩猎训练": "寻找食物是求生的第一步，没有食物，一切都没有意义。",
  "采掘训练": "采掘资源是建设的第一步，没有资源，发展将是空口之谈。",
  "工具训练": "使用工具是文明的第一步，没有工具，低效的劳作会奴役所有人。",
  "树林之主": "野生的虫兽不会自称树林的主人，生息枯荣都属于自然，但手戴珠宝的人类并不会这样认为。",
  "参差林木": "当地人巡逻守卫着他们宝贵的木材资源。多盖一座可遮蔽风雨的小屋，少几个受寒染病的族人。",
  "伐木征税": "明明砍伐可用的树木是一件很正常的事，但是王酋大人定下了很不正常的税额 ，于是大家都想尽办法偷偷摸摸起来。",
  "射程以内": "听说有些吝啬的领主宁愿用弩炮射毁树木，也不愿让部落民砍伐，为此，他们甚至放出了一些野 兽。",
  "林中寻宝": "丛林掩隐之中，似乎有隐秘的道路通往更深处——那是传说中的“宝藏”？是不是摆得太随便了一些？",
  "试验场": "从丛林中蹿出的， 可以是猎物，可以是敌人，也可以是不明身份的机械设备。",
  "遗智还家": "被源石感染的畸变生物没有彻底地失去理智，它们仍旧站在之前的巢穴前， 机械地重复着想要回家的动作。",
  "守卫自然": "在许多萨尔贡居民眼中，保护原本的自然环境比什么都重要，因此，他们抗拒接受原有生活经验改变的 手段也十分激进。",
  "取舍": "部落中的老人常常会用一句萨尔贡的老话告诫子孙：能运走巨石的人固然值得尊敬，但从沙粒开始搭起房屋的，也是部落 中的英雄。",
  "十字路口": "原本以为这处位于荒山野岭的矿脉附近会更加安静，但走近才发现热闹得像都市商业区的十字路口。",
  "矿脉守卫": "畸变的 源石生物安静地守在岩体的一旁，它失去记忆，没有知觉，只想守护眼前的矿脉。",
  "乱石岗": "石头、杂草还有敌人，他们共同“占据”了这个山头，成 为这个贫瘠之地仅剩的“风景”。",
  "见证所": "过去与未来之影，在此析出一滴泪水，向如今的大地宣告他曾经来过。",
  "岩壳蟹群": "被岩壳蟹夹一下很 痛，但是这种痛完全比不过品尝到它鲜美滋味时的快乐！",
  "固守险境": "在野外生存最重要的还是经验，见识丰富的采集老手只需要看一眼地形，就知 道自己该做什么准备了。",
  "部落之争": "矿产的争夺破坏了几个部落之间原本友善的关系，当他们开始破坏我们搭建的监控塔时，愤怒弥漫在我们的同 伴之间。",
  "源石虫入侵": "原本角跳兽的栖息地被源石虫占领，现在要在这里打猎变得更加困难了——毕竟需要在连续的爆炸中命中猎物。",
  "原始奔腾": "本地的生物们轰隆隆地冲过来，又轰隆隆地冲过去，这就是它们的生活。",
  "饮水为饵": "水源在非雨林地貌的萨尔贡是一种稀缺资源，来这里休息饮水的有时不只是你们心仪的猎物，贸然试探有可能会......哎呀！",
  "直奔深渊": "这种感染生物的自杀行为让你们不禁对源石的恐惧更上一层，但比起生 病，显然是饥饿带来的问题更加急迫。",
  "夺路而逃": "我们的狩猎对象是苔生兽，但生活在这里的荒地鼷兽并不知道这些，它们夺路而逃。",
  "无形界限": "苔生兽悠闲地咀嚼着它们身上的苔藓，在一方小小的地方悠哉游哉。奇怪，外面有那么大块的地方，它们怎么不去四处走走？",
  "驯化": "一些从移动城市来的人试图用无人机驯化苔生兽按规定路线行进并驮运货物，想法很美好，可现实显然......",
  "方形竞技场": "看似空旷的场地里塞满了各路萨卡 兹，凡是踏入此地的人都会经历一场拳拳到肉的格斗比赛，只有胜利者才能活着站到最后。",
  "大迁徙": "随着气候和环境的变化，野兽成群跨过河流， 前往食物更丰富的对岸。食物储备充足的部落此时更愿意选择为外来的摄影师担任向导，比捕猎更轻松。",
  "征税的选择": "当部落民为王酋的征税而感 到万分苦恼时，一部分部落民则会选择成为王酋大人的征税部队。当然，怎么选择都是为了生活。",
  "千仞关": "<@lv.description><机关石门></>击破 后会解锁新的可探索区域。被击破前，每次进入关卡会完全恢复原状。\\n再向前走似乎是另外一个地域的入口，风沙逐渐狂暴，巨石填满道路，干渴和绝路是这一切的尽头。",
  "不速之客": "在萨尔贡总能遇到意料之外的来客，大多数时候，他们往往不是那么友善，甚至比王酋的手下们更不友善一些。",
  "战争本能": "火山喷发，大地沸腾，栖居的生物不懂何为战争，只是顺从本能。",
  "失落的“长生军”": "战士手捧黄沙，孑然独行，没有人能给予他答案，他也以沉默回应众人。\n",
  "失落的巨翼兽": "想要命令自然，就需要先服从于自然。异兽徘徊在它的领地，等待着下一个对它感到好奇的人。\n",
  "大地病征": "大地生出症结，地面长出巨石与飞沙，或立成山，或凝成像。不要惧怕，那或许是它们有话想要对你们诉说。",
  "风啸峡谷": "一片土地可以成为战场，也可以成为安居乐业的乐土，这取决于生活在上面的人们做何决定。",
  "砾沙平原": "你们曾见过有位萨卡兹的佣兵在此处撒下几粒种子。不是 每粒种子都会开出花，但这片平原已经比之前的荒芜好了许多。",
  "崎岖窄路": "老猎人讲述了第一个吃下岩壳蟹的人的故事。熬过天灾与劫掠，是毒虫 还是涩果他都不再考虑，鲜血淋漓地咬开硬壳后，他尝到了生的甜美。",
  "战士的视野": "萨尔贡的战士们都很清楚，每个人都拥有着同样的一双眼，用 它看到什么、看到多少，才是战场上获胜的关键。",
  "佣兵的所属": "萨卡兹佣兵在沁礁黑市中不算少见，哥伦比亚的通讯器，维多利亚制式的武器，他 们可以属于任何势力，唯独不属于他们自己。",
  "丢失的订单": "丢失了黑市订单中的大批施术单元可不是件小事，不想被买家发现事情真相，这群莱塔 尼亚人决定先下手为强。",
  "不尽烈火": "火焰灼烧身体，意志重铸灵魂。",
  "被限制的怒火": "当王酋的征税终于压垮了一个贫穷的部落时，一些部落民 选择将武器对准同样处在压迫下，但尚有余力的你们。他们的愤怒被限制，止步于此。",
  "囚笼": "杂耍艺人们精心布置的囚笼，但是否为囚笼，还要看 钥匙在谁的手中。",
  "苦难河床": "森严的守卫不过是临时的枷锁，干涸的河床只是遥远的历史，唯有真实的反抗，才能为人们带来切实的自由。",
  "寻觅道路": "这里人来人往，安定得就像什么事都没有发生一样。",
  "遭遇战": "王酋军在这里驻扎了许久，他们的所作所为将会被人们记住。"
}