const addStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
        #welcome-info {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 192px;
        }
        .loading-spinner {
            width: 50px;
            height: 50px;
            border: 3px solid rgba(0, 0, 0, 0.1);
            border-radius: 50%;
            border-top: 3px solid #3498db;
            animation: spin 1s linear infinite;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
};

// 创建来访者卡片  在头像容器下方插入 位置更改自己找找元素
const createAnnouncementComponent = () => {
    const ipInfoElement = document.createElement('div');
    ipInfoElement.className = "card-widget card-ip-info";
    ipInfoElement.innerHTML = `
        <div class="item-headline">
            <svg t="1730425206662" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1858" width="300" height="300"><path d="M922.368 325.696c21.312 21.312 32.256 47.68 32.832 79.168v431.36c-0.576 31.488-11.52 57.728-32.832 78.72-21.312 20.992-47.68 32.064-79.168 33.28h-672c-31.488-1.152-57.92-12.224-79.168-33.28-21.312-20.992-32.256-47.232-32.832-78.72v-431.36c0.576-31.488 11.52-57.856 32.832-79.168s47.68-32.256 79.168-32.832h67.392L467.84 74.112c11.648-11.072 24.768-16.64 39.36-16.64 14.592 0 27.712 5.568 39.36 16.64l224 218.752h72.64c31.488 0.576 57.856 11.52 79.168 32.832zM820.48 454.72c0-11.648-4.544-21.888-13.568-30.656-9.024-8.768-19.392-13.44-31.04-14.016H238.592c-11.648 0.576-22.016 5.248-31.04 14.016-9.024 8.768-13.568 18.944-13.568 30.656v347.392c0 11.648 4.544 22.016 13.568 31.04 9.024 9.024 19.392 13.568 31.04 13.568h537.28c11.648 0 22.016-4.544 31.04-13.568 9.024-9.024 13.568-19.392 13.568-31.04V454.72z m-537.28 302.784h448v-257.28h-448v257.28z m117.248-459.392h213.504L507.2 197.504 400.448 298.112z" p-id="1859" fill="#d81e06"></path></svg>
            <span style="font-size: 18px;color: red;"><b>来访者</b></span>
        </div>
        <div class="announcement_content">
            <div id="welcome-info">
                <div class="loading-spinner"></div>
            </div>
        </div>
    `;
    return ipInfoElement;
};

// 插入组件
const insertAnnouncementComponent = () => {
    if (!isHomePage()) return; // 只在首页插入

    const cardInfo = document.querySelector('.card-widget.card-info');
    if (cardInfo) {
        const existingComponent = document.querySelector('.card-widget.card-ip-info');
        if (existingComponent) {
            existingComponent.remove();
        }
        cardInfo.parentNode.insertBefore(createAnnouncementComponent(), cardInfo.nextSibling);
    }
};

// 获取 IP 信息
const fetchIpInfo = () => {
    fetch('https://api.76.al/api/ip/query?key=PI44tt2dN7BIyQDu9aInQAmbXh')   //修改为自己的key
        .then(response => response.ok ? response.json() : Promise.reject('网络响应不正常'))
        .then(data => {
            showWelcome(data);
        })
        .catch(error => {
            console.error('错误:', error);
            showErrorMessage();
        });
};

// 距离计算函数
const getDistance = (e1, n1, e2, n2) => {
    const R = 6371; // 地球半径
    const { sin, cos, asin, PI, hypot } = Math;

    const getPoint = (e, n) => {
        e *= PI / 180;
        n *= PI / 180;
        return { x: cos(n) * cos(e), y: cos(n) * sin(e), z: sin(n) };
    };

    const a = getPoint(e1, n1);
    const b = getPoint(e2, n2);
    const c = hypot(a.x - b.x, a.y - b.y, a.z - b.z);
    return Math.round(asin(c / 2) * 2 * R);
};

// 国家及省份的欢迎信息
const greetings = {
    "中国": {
        "北京市": "北——京——欢迎你~~~",
        "天津市": "讲段相声吧",
        "河北省": "山势巍巍成壁垒，天下雄关铁马金戈由此向，无限江山",
        "山西省": "展开坐具长三尺，已占山河五百余",
        "内蒙古自治区": "天苍苍，野茫茫，风吹草低见牛羊",
        "辽宁省": "我想吃烤鸡架！",
        "吉林省": "状元阁就是东北烧烤之王",
        "黑龙江省": "很喜欢哈尔滨大剧院",
        "上海市": "众所周知，中国只有两个城市",
        "江苏省": {
            "南京市": "这是我挺想去的城市啦",
            "苏州市": "上有天堂，下有苏杭",
            "default": "散装是必须要散装的"
        },
        "浙江省": {
            "杭州市": "欲把西湖比西子，淡妆浓抹总相宜",
            "default": "望海楼明照曙霞,护江堤白蹋晴沙"
        },
        "河南省": {
            "郑州市": "豫州之域，天地之中",
            "信阳市": "品信阳毛尖，悟人间芳华",
            "南阳市": "臣本布衣，躬耕于南阳此南阳非彼南阳！",
            "驻马店市": "峰峰有奇石，石石挟仙气嵖岈山的花很美哦！",
            "开封市": "刚正不阿包青天",
            "洛阳市": "洛阳牡丹甲天下",
            "default": "可否带我品尝河南烩面啦？"
        },
        "安徽省": "蚌埠住了，芜湖起飞",
        "福建省": "井邑白云间，岩城远带山",
        "江西省": "落霞与孤鹜齐飞，秋水共长天一色",
        "山东省": "遥望齐州九点烟，一泓海水杯中泻",
        "湖北省": {
            "黄冈市": "红安将军县！辈出将才！",
            "default": "来碗热干面~"
        },
        "湖南省": "74751，长沙斯塔克",
        "广东省": {
            "广州市": "看小蛮腰，喝早茶了嘛~",
            "深圳市": "今天你逛商场了嘛~",
            "阳江市": "阳春合水！博主家乡~ 欢迎来玩~",
            "default": "来两斤福建人~"
        },
        "广西壮族自治区": "桂林山水甲天下",
        "海南省": "朝观日出逐白浪，夕看云起收霞光",
        "四川省": "康康川妹子",
        "贵州省": "茅台，学生，再塞200",
        "云南省": "玉龙飞舞云缠绕，万仞冰川直耸天",
        "西藏自治区": "躺在茫茫草原上，仰望蓝天",
        "陕西省": "来份臊子面加馍",
        "甘肃省": "羌笛何须怨杨柳，春风不度玉门关",
        "青海省": "牛肉干和老酸奶都好好吃",
        "宁夏回族自治区": "大漠孤烟直，长河落日圆",
        "新疆维吾尔自治区": "驼铃古道丝绸路，胡马犹闻唐汉风",
        "台湾省": "我在这头，大陆在那头",
        "香港特别行政区": "永定贼有残留地鬼嚎，迎击光非岁玉",
        "澳门特别行政区": "性感荷官，在线发牌",
        "default": "带我去你的城市逛逛吧！"
    },
    "美国": "Let us live in peace!",
    "日本": "よろしく、一緒に桜を見ませんか",
    "俄罗斯": "干了这瓶伏特加！",
    "法国": "C'est La Vie",
    "德国": "Die Zeit verging im Fluge.",
    "澳大利亚": "一起去大堡礁吧！",
    "加拿大": "拾起一片枫叶赠予你",
    "default": "带我去你的国家逛逛吧"
};

// 获取欢迎信息
const getGreeting = (country, province, city) => {
    const countryGreeting = greetings[country] || greetings.default;
    if (typeof countryGreeting === 'object') {
        return countryGreeting[province]?.[city] || countryGreeting[province] || countryGreeting.default;
    }
    return countryGreeting;
};

// 显示欢迎信息
const showWelcome = (ipLocationData) => {
    if (!ipLocationData || !ipLocationData.data) {
        return showErrorMessage();
    }

    const { lng, lat, country, prov, city, district } = ipLocationData.data;
    const dist = getDistance(120.136706, 30.3213481, lng, lat);     //修改为你自己的经纬度  
    const ip = ipLocationData.ip.includes(":") ? "<br>好复杂，咱看不懂~(ipv6)" : ipLocationData.ip;
    const pos = country === "中国" ? `${prov} ${city} ${district}` : country;
    const posdesc = getGreeting(country, prov, city);

    const timeChange = (() => {
        const hour = new Date().getHours();
        if (hour < 11) return "🌤️ 早上好，一日之计在于晨";
        if (hour < 13) return "☀️ 中午好，记得午休喔~";
        if (hour < 17) return "🕞 下午好，饮茶先啦！";
        if (hour < 19) return "🚶‍♂️ 即将下班，记得按时吃饭~";
        return "🌙 晚上好，夜生活嗨起来！";
    })();

    const welcomeInfoElement = document.getElementById("welcome-info");
    welcomeInfoElement.style.display = 'block'; // 改回块级显示
    welcomeInfoElement.style.height = 'auto';    
    welcomeInfoElement.innerHTML = `
        欢迎来自 <b><span style="color: var(--kouseki-ip-color);font-size: var(--kouseki-gl-size)">${pos}</span></b> 的小友💖<br>
        当前位置距博主约 <b><span style="color: var(--kouseki-ip-color)">${dist}</span></b> 公里！<br>
        <b><span style="font-size: 14px">🍂 ${posdesc}</span></b> 
        <br>${timeChange}<br>
    `;
};

// 显示错误信息
const showErrorMessage = () => {
    const welcomeInfoElement = document.getElementById("welcome-info");
    welcomeInfoElement.style.display = 'block';
    welcomeInfoElement.innerHTML = `
        <p>获取IP信息失败，请检查网络。</p>
    `;
};

// 处理 PJAX 完成事件
const handlePjaxComplete = () => {
    insertAnnouncementComponent(); // 重新插入组件
    if (isHomePage()) fetchIpInfo();
};

// 判断是否是首页
const isHomePage = () => {
    return window.location.pathname === '/' || window.location.pathname === '/index.html';
};

// 初始化
const initialize = () => {
    addStyles(); // 添加CSS样式
    insertAnnouncementComponent(); // 插入组件
    if (isHomePage()) {
        fetchIpInfo(); // 获取 IP 信息并显示欢迎信息
    }
    document.addEventListener("pjax:complete", handlePjaxComplete);
};

window.onload = initialize;