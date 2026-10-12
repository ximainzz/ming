/* ============================================================
   大明风华 · 明朝历史交互专题站  H5
   原生 JS：hash 路由 + 数据渲染 + 轮播 + 交互
   ============================================================ */

/* ---------- 数据：十六帝 ---------- */
var EMPERORS = [
  {temple:"太祖", name:"朱元璋", era:"洪武", years:"1368–1398", remark:"布衣天子，开大明三百年基业", key:true, route:"emperor-1", seal:"洪"},
  {temple:"惠帝", name:"朱允炆", era:"建文", years:"1398–1402", remark:"削藩改制，靖难之役中下落成谜", key:false},
  {temple:"成祖", name:"朱棣", era:"永乐", years:"1402–1424", remark:"靖难夺位，迁都北京，五征漠北", key:true, route:"emperor-2", seal:"永"},
  {temple:"仁宗", name:"朱高炽", era:"洪熙", years:"1424–1425", remark:"仁政宽和，在位不足一年", key:false},
  {temple:"宣宗", name:"朱瞻基", era:"宣德", years:"1425–1435", remark:"仁宣之治，守成令主", key:false},
  {temple:"英宗", name:"朱祁镇", era:"正统·天顺", years:"1435–1449 / 1457–1464", remark:"土木之变被俘，后复辟再登帝位", key:false},
  {temple:"代宗", name:"朱祁钰", era:"景泰", years:"1449–1457", remark:"危局即位，北京保卫战的主心骨", key:false},
  {temple:"宪宗", name:"朱见深", era:"成化", years:"1464–1487", remark:"设西厂，成化犁庭", key:false},
  {temple:"孝宗", name:"朱祐樘", era:"弘治", years:"1487–1505", remark:"弘治中兴，勤政宽仁", key:false},
  {temple:"武宗", name:"朱厚照", era:"正德", years:"1505–1521", remark:"好武嬉游，应州大捷", key:false},
  {temple:"世宗", name:"朱厚熜", era:"嘉靖", years:"1521–1567", remark:"修道怠政，严嵩专权，东南抗倭", key:false},
  {temple:"穆宗", name:"朱载坖", era:"隆庆", years:"1567–1572", remark:"隆庆开关，俺答封贡", key:false},
  {temple:"神宗", name:"朱翊钧", era:"万历", years:"1572–1620", remark:"张居正改革，后期怠政三十载", key:true, route:"emperor-3", seal:"万"},
  {temple:"光宗", name:"朱常洛", era:"泰昌", years:"1620", remark:"在位一月，红丸案", key:false},
  {temple:"熹宗", name:"朱由校", era:"天启", years:"1620–1627", remark:"木匠皇帝，阉党乱政", key:false},
  {temple:"思宗", name:"朱由检", era:"崇祯", years:"1627–1644", remark:"勤政无力回天，煤山自缢", key:true, route:"emperor-4", seal:"崇"}
];

/* ---------- 数据：战争时间线 ---------- */
var WARS = [
  {yr:"1368–1387", ev:"北伐蒙元", title:"徐达北伐，元廷北遁", detail:"洪武元年明军北伐，攻克大都，元顺帝北逃。此后二十年明军持续出塞，元朝残余势力退回漠北，史称「北元」。"},
  {yr:"1409–1424", ev:"五征漠北", title:"成祖亲征，靖边安内", detail:"朱棣在位期间五次亲征漠北，追击鞑靼、瓦剌，最后一次北征归途中崩于榆木川。边患虽未根除，却保住了北方安宁。"},
  {yr:"1449", ev:"土木之变", title:"英宗被俘，京师震动", detail:"明英宗听信宦官王振，亲征瓦剌，于土木堡兵败被俘，数十万明军溃散。消息传回，北京城人心惶惶。"},
  {yr:"1449", ev:"北京保卫战", title:"于谦守城，瓦剌退兵", detail:"瓦剌挟英宗兵临北京城下。于谦力排南迁之议，率军民誓死守城，击退瓦剌，保住了大明社稷。"},
  {yr:"1555–1565", ev:"东南抗倭", title:"戚家军荡平倭患", detail:"嘉靖年间倭患猖獗，戚继光募义乌兵组建戚家军，创鸳鸯阵，与俞大猷合力荡平东南沿海倭寇。"},
  {yr:"1619", ev:"萨尔浒之战", title:"四路出师，一败涂地", detail:"后金崛起，明廷四路大军合击，被努尔哈赤集中兵力各个击破。此役之后，辽东攻守易势，明朝再无还手之力。"},
  {yr:"1644", ev:"甲申国变", title:"流寇破京，大明终焉", detail:"李自成率大顺军攻入北京，崇祯自缢煤山。同年清军入关，逐鹿中原，一个时代就此落幕。"}
];

/* ---------- 数据：九边重镇 ---------- */
var JB_ZHENDATA = [
  {name:"辽东镇", seat:"广宁 · 今辽宁北镇", tx:"守卫辽东都司，东抚女真、北御蒙古。李成梁坐镇辽东三十年，萨尔浒之战即在辽东前线展开。", war:"萨尔浒之战 · 李成梁镇辽"},
  {name:"蓟州镇", seat:"三屯营 · 今河北迁西", tx:"九边之首，护卫京师北门。戚继光在此镇守十六年，筑空心敌台千余座，编练车步骑营。", war:"戚继光守蓟 · 己巳之变"},
  {name:"宣府镇", seat:"宣府 · 今河北宣化", tx:"京师屏障「宣大」之首，控扼长城内外要冲，为蒙古入犯京畿必经之路。", war:"土木之变后防线前推"},
  {name:"大同镇", seat:"大同府 · 今山西大同", tx:"九边腹地，与宣府并称「宣大」。蒙古俺答汗屡次叩边之地，1550 年一度兵临北京城下。", war:"庚戌之变 · 俺答叩关"},
  {name:"山西镇", seat:"偏头关 · 后移宁武", tx:"又称太原镇，守雁门、宁武、偏头三关，防蒙古自河套东犯山西腹地。", war:"三关重地 · 雁门锁钥"},
  {name:"延绥镇", seat:"榆林卫 · 今陕西榆林", tx:"又称榆林镇，直面河套。蒙古鞑靼部久据河套，此地常年对峙，修边墙数十里。", war:"河套之争 · 边墙修筑"},
  {name:"宁夏镇", seat:"宁夏卫 · 今宁夏银川", tx:"守宁夏平原，扼黄河渡口，防蒙古渡河南下。万历二十年哱拜之乱即发生于此。", war:"万历宁夏之役 · 哱拜之乱"},
  {name:"固原镇", seat:"固原州 · 今宁夏固原", tx:"控扼陕甘门户，陕西三边总督驻节于此，总制延绥、宁夏、甘肃三镇军务。", war:"三边总督驻地"},
  {name:"甘肃镇", seat:"甘州 · 今甘肃张掖", tx:"九边最西端，嘉峪关所在。西御哈密、瓦剌，保障河西走廊丝路孔道。", war:"嘉峪雄关 · 哈密卫之争"}
];

/* ---------- 数据：十六帝在位时长排行 ---------- */
var REIGN_BARS = [
  {temple:"神宗", era:"万历", n:48, note:"48 年"},
  {temple:"世宗", era:"嘉靖", n:45, note:"45 年"},
  {temple:"太祖", era:"洪武", n:31, note:"31 年"},
  {temple:"宪宗", era:"成化", n:23, note:"23 年"},
  {temple:"成祖", era:"永乐", n:22, note:"22 年"},
  {temple:"英宗", era:"正统·天顺", n:21, note:"21 年"},
  {temple:"孝宗", era:"弘治", n:18, note:"18 年"},
  {temple:"思宗", era:"崇祯", n:17, note:"17 年"},
  {temple:"武宗", era:"正德", n:16, note:"16 年"},
  {temple:"宣宗", era:"宣德", n:10, note:"10 年"},
  {temple:"代宗", era:"景泰", n:8, note:"8 年"},
  {temple:"熹宗", era:"天启", n:7, note:"7 年"},
  {temple:"穆宗", era:"隆庆", n:6, note:"6 年"},
  {temple:"惠帝", era:"建文", n:4, note:"4 年"},
  {temple:"仁宗", era:"洪熙", n:1, note:"1 年"},
  {temple:"光宗", era:"泰昌", n:0, note:"不足一月"}
];

/* ---------- 数据：郑和七下西洋 ---------- */
var ZHENGHE = [
  {no:"第一次", yr:"1405–1407", to:"占城 → 爪哇 → 苏门答腊 → 古里", tx:"首航自南京龙江港起航，船队 62 艘、2.7 万余人，最远抵达古里（今印度卡利卡特）。"},
  {no:"第二次", yr:"1407–1409", to:"占城 → 暹罗 → 爪哇 → 古里", tx:"再访诸国，抚定爪哇内乱，航行范围与首航相当。"},
  {no:"第三次", yr:"1409–1411", to:"占城 → 满剌加 → 锡兰山 → 古里", tx:"抵达锡兰山（今斯里兰卡），平定其王发难，俘送京师；并在满剌加立城为会盟之所。"},
  {no:"第四次", yr:"1413–1415", to:"满剌加 → 忽鲁谟斯 → 东非", tx:"首次越过印度洋，抵达波斯湾忽鲁谟斯（今霍尔木兹），并分遣船队远至东非木骨都束（今摩加迪沙）。"},
  {no:"第五次", yr:"1417–1419", to:"忽鲁谟斯 → 阿丹 → 东非沿岸", tx:"再赴波斯湾与东非，遍览各国贡使入明。"},
  {no:"第六次", yr:"1421–1422", to:"忽鲁谟斯 → 东非诸国", tx:"护送十六国贡使归国，航行至东非沿海。"},
  {no:"第七次", yr:"1431–1433", to:"满剌加 → 忽鲁谟斯 → 东非", tx:"宣德年间末航，遍访三十余国；返航途中郑和卒于古里（一说卒于南京），航事自此终止。"}
];

/* ---------- 首页轮播 ---------- */
var HERO_CAPTIONS = [
  "大明风华 · 从洪武开国到甲申国变",
  "帝王世系 · 十六帝承续三百年",
  "政治朝堂 · 内阁六部与厂卫",
  "文化风物 · 衣冠器物与笔墨",
  "边镇烽烟 · 九边重镇与海疆"
];
var heroIdx = 0, heroTimer = null;

function buildHero(){
  var dotsWrap = document.getElementById("heroDots");
  var html = "";
  for(var i=0;i<HERO_CAPTIONS.length;i++){
    html += '<span class="hero-dot'+(i===0?' active':'')+'" data-idx="'+i+'"></span>';
  }
  dotsWrap.innerHTML = html;
  var dots = dotsWrap.querySelectorAll(".hero-dot");
  for(var j=0;j<dots.length;j++){
    dots[j].addEventListener("click", function(){
      heroIdx = parseInt(this.getAttribute("data-idx"), 10);
      showHeroSlide(heroIdx);
      restartHeroTimer();
    });
  }
  showHeroSlide(0);
  restartHeroTimer();
}

function showHeroSlide(i){
  var slides = document.querySelectorAll(".hero-slide");
  for(var k=0;k<slides.length;k++){
    slides[k].classList.toggle("active", k===i);
  }
  var dots = document.querySelectorAll(".hero-dot");
  for(var d=0;d<dots.length;d++){
    dots[d].classList.toggle("active", d===i);
  }
  var cap = document.getElementById("heroCaption");
  cap.style.opacity = 0;
  setTimeout(function(){
    cap.textContent = HERO_CAPTIONS[i];
    cap.style.opacity = 1;
  }, 260);
}

function restartHeroTimer(){
  if(heroTimer) clearInterval(heroTimer);
  heroTimer = setInterval(function(){
    heroIdx = (heroIdx + 1) % HERO_CAPTIONS.length;
    showHeroSlide(heroIdx);
  }, 5000);
}

/* ---------- 路由 ---------- */
var ROUTES = ["home","emperors","politics","culture","war",
              "data-reign","data-emperors","data-zhenghe","data-regions","keju",
              "emperor-1","emperor-2","emperor-3","emperor-4"];
/* 页面归属的底部导航项 */
var ROUTE_TAB = {home:"home", emperors:"emperors", politics:"politics", culture:"culture", war:"war",
                 "data-reign":"home", "data-emperors":"home", "data-zhenghe":"home", "data-regions":"home",
                 "emperor-1":"emperors", "emperor-2":"emperors", "emperor-3":"emperors", "emperor-4":"emperors",
                 keju:"keju"};

function currentRoute(){
  var h = location.hash.replace("#","");
  return ROUTES.indexOf(h) > -1 ? h : "home";
}

function go(route){
  if(location.hash === "#"+route){ render(); return; }
  location.hash = route;
}

function render(){
  var route = currentRoute();
  var pages = document.querySelectorAll(".page");
  for(var i=0;i<pages.length;i++){
    pages[i].classList.toggle("active", pages[i].getAttribute("data-route")===route);
  }
  /* 顶部导航与底部导航的高亮 */
  var links = document.querySelectorAll("[data-route-link]");
  var tabRoute = ROUTE_TAB[route] || route;
  for(var j=0;j<links.length;j++){
    links[j].classList.toggle("active", links[j].getAttribute("data-route-link")===tabRoute);
  }
  /* 返回按钮：非首页显示 */
  document.getElementById("backBtn").classList.toggle("show", route !== "home");
  window.scrollTo(0,0);
  /* 进入页面时初始化数据 */
  if(route === "emperors"){ buildEmperors(); }
  if(route === "war"){ buildWar(); buildJiubian(); }
  if(route === "data-emperors"){ buildReignBars(); }
  if(route === "data-zhenghe"){ buildZhenghe(); }
  if(route === "keju"){ initKeju(); }
}

/* ---------- 帝王世系渲染 ---------- */
function buildEmperors(){
  var grid = document.getElementById("emperorGrid");
  if(grid.dataset.built) return;
  grid.dataset.built = "1";
  function yspan(yrs){
    var nums = (String(yrs).match(/\d{4}/g)||[]).map(Number);
    if(!nums.length) return 1;
    if(nums.length <= 2) return Math.max(nums[nums.length-1]-nums[0], 1);
    var sum = 0;
    for(var k=0;k<nums.length-1;k+=2){ sum += nums[k+1]-nums[k]; }
    return Math.max(sum, 1);
  }
  var html = '<div class="lg-axis"><span class="lg-start">大明 276 年 · 十六帝</span></div>';
  var ms = [{i:0,t:"1368 · 开国"},{i:2,t:"1402 · 靖难"},{i:3,t:"1421 · 迁都"},{i:7,t:"1449 · 土木"},{i:16,t:"1644 · 甲申"}];
  var mi = 0;
  for(var i=0;i<EMPERORS.length;i++){
    while(mi < ms.length && ms[mi].i === i){
      html += '<div class="lg-milestone"><i></i><span>'+ms[mi].t+'</span><i></i></div>';
      mi++;
    }
    var e = EMPERORS[i];
    var side = (i%2) ? "lg-right" : "lg-left";
    var keyCls = e.key ? " key" : "";
    var w = Math.max(yspan(e.years)/31*100, 3);
    html += '<div class="lg-node '+side+keyCls+'"'+(e.route?' onclick="go(\''+e.route+'\')"':"")+'>'
      + '<span class="lg-seal">'+e.temple.charAt(0)+'</span>'
      + '<div class="lg-info">'
      + '<div class="lg-head"><span class="lg-temple">'+e.temple+'</span><span class="lg-name">'+e.name+'</span></div>'
      + '<div class="lg-era">'+e.era+' · '+e.years+'</div>'
      + '<div class="lg-bar"><i style="width:'+w+'%"></i></div>'
      + '<p class="lg-remark">'+e.remark+'</p>'
      + (e.key?'<span class="lg-more">人物专题 →</span>':'')
      + '</div></div>';
  }
  while(mi < ms.length && ms[mi].i === 16){
    html += '<div class="lg-milestone"><i></i><span>'+ms[mi].t+'</span><i></i></div>';
    mi++;
  }
  grid.innerHTML = html;
}

/* ---------- 战争时间线渲染 ---------- */
function buildWar(){
  var line = document.getElementById("warLine");
  if(line.dataset.built) return;
  line.dataset.built = "1";
  var html = "";
  for(var i=0;i<WARS.length;i++){
    html += '<div class="war-node" onclick="showWar('+i+')">'
      + '<div class="dot"></div>'
      + '<div class="yr">'+WARS[i].yr+'</div>'
      + '<div class="ev">'+WARS[i].ev+'</div>'
      + '</div>';
  }
  line.innerHTML = html;
  showWar(0);
}
function buildJiubian(){
  var nodes = document.querySelectorAll(".jb-node");
  var detail = document.getElementById("jiubianDetail");
  if(!nodes.length || !detail){ return; }
  function show(i){
    var d = JB_ZHENDATA[i];
    detail.innerHTML =
      '<div class="jd-head"><span class="jd-seal">镇</span>' +
      '<div class="jd-name">' + d.name + '</div>' +
      '<div class="jd-seat">' + d.seat + '</div></div>' +
      '<p class="jd-tx">' + d.tx + '</p>' +
      '<div class="jd-war"><span class="jd-war-tag">相关战事</span>' + d.war + '</div>';
    for(var k=0;k<nodes.length;k++){ nodes[k].classList.toggle("on", k===i); }
  }
  for(var j=0;j<nodes.length;j++){
    (function(idx){
      nodes[j].addEventListener("click", function(){ show(idx); });
    })(j);
  }
  show(0);
}


function showWar(idx){
  var w = WARS[idx];
  document.getElementById("warDetail").innerHTML =
    '<h4>'+w.title+'</h4>'
    + '<div class="d-year">'+w.yr+' · '+w.ev+'</div>'
    + '<p>'+w.detail+'</p>';
}

/* ---------- 十六帝在位时长排行渲染 ---------- */
function buildReignBars(){
  var box = document.getElementById("reignBars");
  if(!box || box.dataset.built) return;
  box.dataset.built = "1";
  var html = "";
  for(var i=0;i<REIGN_BARS.length;i++){
    var r = REIGN_BARS[i];
    var w = r.n > 0 ? (r.n / 48 * 100) : 1.6;
    var lv = r.n >= 40 ? 4 : (r.n >= 20 ? 3 : (r.n >= 10 ? 2 : 1));
    html += '<div class="reign-row">'
      + '<span class="reign-name">'+r.temple+' · '+r.era+'</span>'
      + '<span class="reign-track"><i class="reign-bar lv'+lv+'" style="width:'+w+'%"></i></span>'
      + '<span class="reign-num">'+r.note+'</span>'
      + '</div>';
  }
  box.innerHTML = html;
}

/* ---------- 七下西洋渲染 ---------- */
function buildZhenghe(){
  var list = document.getElementById("zhengheList");
  if(!list || list.dataset.built) return;
  list.dataset.built = "1";
  var html = "";
  for(var i=0;i<ZHENGHE.length;i++){
    var z = ZHENGHE[i];
    html += '<div class="zh-card">'
      + '<div class="zh-no">'+(i+1)+'</div>'
      + '<div class="zh-main">'
      + '<div class="zh-head"><span class="zh-yr">'+z.yr+'</span><span class="zh-name">'+z.no+'</span></div>'
      + '<div class="zh-to">航线：'+z.to+'</div>'
      + '<p class="zh-tx">'+z.tx+'</p>'
      + '</div>'
      + '</div>';
  }
  list.innerHTML = html;
}

/* ---------- 页内定位 / 返回 / 回到顶部 ---------- */
function scrollToId(id){
  var el = document.getElementById(id);
  if(!el) return;
  var y = el.getBoundingClientRect().top + window.scrollY - 66;
  window.scrollTo({top:y, behavior:"smooth"});
}

document.getElementById("backBtn").addEventListener("click", function(){
  var route = currentRoute();
  if(route.indexOf("emperor") === 0){ go("emperors"); }
  else { go("home"); }
});

var toTop = document.getElementById("toTop");
window.addEventListener("scroll", function(){
  toTop.classList.toggle("show", window.scrollY > 500);
});
toTop.addEventListener("click", function(){ window.scrollTo(0,0); });

/* ============================================================
   文化风物 Tabs（修复：缺失的绑定）
   ============================================================ */
function initTabs(){
  var tabs = document.getElementById("cultureTabs");
  if(!tabs || tabs.dataset.built) return;
  tabs.dataset.built = "1";
  var btns = tabs.querySelectorAll(".tab-btn");
  for(var i=0;i<btns.length;i++){
    btns[i].addEventListener("click", function(){
      var t = this.getAttribute("data-tab");
      for(var b=0;b<btns.length;b++){
        btns[b].classList.toggle("active", btns[b] === this);
      }
      var panels = document.querySelectorAll(".tab-panel");
      for(var p=0;p<panels.length;p++){
        panels[p].classList.toggle("active", panels[p].getAttribute("data-panel") === t);
      }
    });
  }
}

/* ============================================================
   模拟科考 · 金榜题名（创新玩法）
   四级科举：童试(秀才) → 乡试(举人) → 会试(贡士) → 殿试(进士)
   每级 3 题、答对 2 题过关；落第可复读；终局生成功名档案
   ============================================================ */
var KEJU_ERAS = [
  {id:"hongwu", era:"洪武", first:1368, start:1370, name:"洪武三年", desc:"明初开科取士，天下初定", peers:[
    {n:"宋濂", t:"翰林学士，奉旨总裁修《元史》"},
    {n:"刘基", t:"诚意伯，开国谋臣"},
    {n:"方孝孺", t:"洪武年间名儒，后为建文重臣"}
  ]},
  {id:"yongle", era:"永乐", first:1403, start:1403, name:"永乐元年", desc:"迁都北京，编修《永乐大典》", peers:[
    {n:"解缙", t:"翰林学士，《永乐大典》总裁官"},
    {n:"杨荣", t:"内阁成员，「三杨」之一"},
    {n:"郑和", t:"奉诏七下西洋，扬威海上"}
  ]},
  {id:"chenghua", era:"成化", first:1465, start:1465, name:"成化元年", desc:"成化年间，朝局趋于平稳", peers:[
    {n:"商辂", t:"连中三元，官至内阁首辅"},
    {n:"王恕", t:"刚正敢言，名重一时"},
    {n:"李东阳", t:"成化年间进士，后为文坛领袖"}
  ]},
  {id:"jiajing", era:"嘉靖", first:1522, start:1522, name:"嘉靖元年", desc:"嘉靖朝，内阁权争与倭患并起", peers:[
    {n:"徐阶", t:"内阁首辅，扳倒严嵩"},
    {n:"严嵩", t:"专权二十年的内阁首辅"},
    {n:"张居正", t:"嘉靖二十六年进士，日后改革家"}
  ]},
  {id:"wanli", era:"万历", first:1573, start:1573, name:"万历元年", desc:"张居正改革，中兴气象", peers:[
    {n:"张居正", t:"内阁首辅，推行考成法与一条鞭法"},
    {n:"海瑞", t:"清官典范，刚直不阿"},
    {n:"戚继光", t:"戚家军统帅，荡平倭患"}
  ]},
  {id:"chongzhen", era:"崇祯", first:1628, start:1628, name:"崇祯元年", desc:"内忧外患，大厦将倾", peers:[
    {n:"徐光启", t:"科学家，《农政全书》作者"},
    {n:"袁崇焕", t:"督师辽东，宁远大捷"},
    {n:"孙传庭", t:"屡败农民军的兵部尚书"}
  ]}
];

var KEJU_STAGES = [
  {key:"xiucai",    name:"童试", goal:"生员（秀才）", pass:2},
  {key:"juren",     name:"乡试", goal:"举人",        pass:2},
  {key:"gongsheng", name:"会试", goal:"贡士",        pass:2},
  {key:"jinshi",    name:"殿试", goal:"进士",        pass:2}
];

var KEJU_QUESTIONS = {
  xiucai: [
    {q:"明朝的开国皇帝是谁？", opts:["朱元璋","朱棣","朱瞻基","朱由检"], a:0, note:"朱元璋于洪武元年（1368）即帝位，国号大明。"},
    {q:"明朝初年的都城定在哪里？", opts:["北京","应天（今南京）","西安","洛阳"], a:1, note:"洪武元年定都应天，即今南京；永乐年间才迁都北京。"},
    {q:"科举考试中，最高一级的功名是什么？", opts:["秀才","举人","贡士","状元"], a:3, note:"殿试第一名称状元，是天下读书人最高的荣誉。"},
    {q:"明太祖朱元璋的年号是什么？", opts:["永乐","洪武","宣德","万历"], a:1, note:"「洪武」为明太祖年号，起于 1368 年。"},
    {q:"《永乐大典》编成于哪位皇帝在位时期？", opts:["明太祖","明成祖","明宣宗","明英宗"], a:1, note:"《永乐大典》由明成祖朱棣敕命编纂，为古代最大类书。"},
    {q:"中国历史上第一个统一的中央集权王朝是哪个？", opts:["夏朝","商朝","秦朝","汉朝"], a:2, note:"公元前 221 年秦始皇统一六国，建立秦朝，创立郡县制。"},
    {q:"四大发明中，最早出现的是哪一项？", opts:["造纸术","指南针","火药","印刷术"], a:1, note:"战国时期已有司南，指南针最早；造纸术、火药、印刷术均晚至汉唐。"},
    {q:"唐朝的开国皇帝是谁？", opts:["李世民","李渊","李隆基","李治"], a:1, note:"李渊于 618 年建立唐朝；李世民是他的次子，即唐太宗。"},
    {q:"南宋的都城临安，即今天的哪座城市？", opts:["开封","洛阳","杭州","南京"], a:2, note:"靖康之变后宋室南渡，定都临安（今杭州）。"},
    {q:"元朝是由哪个民族建立的？", opts:["女真","契丹","蒙古","党项"], a:2, note:"忽必烈于 1271 年定国号「大元」，1279 年统一全国。"},
    {q:"正式以「大清」为国号的是哪位皇帝？", opts:["努尔哈赤","皇太极","顺治","康熙"], a:1, note:"1636 年皇太极改国号为大清；努尔哈赤建立的是后金。"},
    {q:"郑和下西洋一共出航了几次？", opts:["三次","五次","七次","九次"], a:2, note:"永乐至宣德年间郑和七次奉使出航，历经三十余国。"}
  ],
  juren: [
    {q:"明代内阁首辅张居正推行的财政赋役改革叫什么？", opts:["一条鞭法","两税法","租庸调","青苗法"], a:0, note:"张居正在万历年间推行一条鞭法，按田亩征银，简化赋役。"},
    {q:"明英宗土木堡之变后，组织北京保卫战的兵部尚书是谁？", opts:["于谦","戚继光","徐阶","海瑞"], a:0, note:"正统十四年瓦剌兵临城下，于谦力主固守并击退敌军。"},
    {q:"郑和七下西洋，是从哪位皇帝在位时开始的？", opts:["明太祖","明成祖","明仁宗","明英宗"], a:1, note:"永乐三年（1405）郑和首次率船队出航，历二十八年。"},
    {q:"明代直接由皇帝指挥、专司缉捕刑狱的特务机构是？", opts:["东厂","大理寺","通政司","翰林院"], a:0, note:"东厂由宦官统领、皇帝直辖，与锦衣卫并称「厂卫」。"},
    {q:"提出「知行合一」、创立心学的大儒是谁？", opts:["王守仁（王阳明）","李时珍","宋应星","汤显祖"], a:0, note:"王阳明集心学大成，明代影响最大的思想家之一。"},
    {q:"「文景之治」出现在哪个朝代？", opts:["西汉","东汉","唐朝","宋朝"], a:0, note:"汉文帝、景帝休养生息，为汉武帝北击匈奴积蓄国力。"},
    {q:"唐太宗李世民在位期间的治世称为什么？", opts:["贞观之治","开元盛世","光武中兴","仁宣之治"], a:0, note:"贞观年间政治清明、国力渐强，史称「贞观之治」。"},
    {q:"成吉思汗的本名是什么？", opts:["铁木真","忽必烈","窝阔台","拖雷"], a:0, note:"铁木真统一蒙古各部，被尊为成吉思汗；忽必烈是其孙。"},
    {q:"与辽国签订「澶渊之盟」的北宋皇帝是？", opts:["宋太祖","宋太宗","宋真宗","宋神宗"], a:2, note:"1004 年宋真宗与辽订盟，此后宋辽百年和平。"},
    {q:"「康乾盛世」中的「康」指哪位皇帝？", opts:["康熙","乾隆","嘉庆","道光"], a:0, note:"康熙、雍正、乾隆三朝鼎盛，史称「康乾盛世」。"},
    {q:"科举制度正式创立于哪个朝代？", opts:["汉朝","隋朝","唐朝","宋朝"], a:1, note:"隋朝废除九品中正、分科取士，至隋炀帝设进士科，科举正式确立。"},
    {q:"利玛窦来华后，与徐光启合译的数学著作是？", opts:["《几何原本》","《天工开物》","《九章算术》","《梦溪笔谈》"], a:0, note:"明末徐光启与利玛窦合译《几何原本》前六卷，开西学东渐先声。"}
  ],
  gongsheng: [
    {q:"「仁宣之治」指哪两位皇帝在位时期的清明治世？", opts:["洪熙、宣德","洪武、建文","正统、景泰","成化、弘治"], a:0, note:"仁宗朱高炽、宣宗朱瞻基相继在位十年，政治清明，史称仁宣之治。"},
    {q:"明成祖正式迁都北京，大约是在哪一年？", opts:["永乐元年（1403）","永乐十九年（1421）","正统十四年（1449）","洪武元年（1368）"], a:1, note:"永乐十八年北京宫殿建成，次年（1421）正式以北京为京师。"},
    {q:"殿试第一名称状元，第二、第三名分别称什么？", opts:["榜眼、探花","探花、榜眼","传胪、会元","解元、会元"], a:0, note:"殿试一甲三名：状元、榜眼、探花，合称「三鼎甲」。"},
    {q:"明代内阁制度创设于哪位皇帝在位时期？", opts:["明太祖","明成祖","明宣宗","明英宗"], a:1, note:"成祖即位后设内阁，大学士参预机务，后演变为事实上的宰相机构。"},
    {q:"张居正改革期间，整顿吏治的考核制度称为什么？", opts:["考成法","一条鞭法","摊丁入亩","九品中正"], a:0, note:"考成法以文书考成课督官吏，提高行政效率。"},
    {q:"「开元盛世」出现在哪位皇帝在位时期？", opts:["唐太宗","唐高宗","武则天","唐玄宗"], a:3, note:"唐玄宗李隆基前期励精图治，开创开元盛世。"},
    {q:"「靖康之变」中被金军俘虏北上的北宋皇帝是？", opts:["宋徽宗、宋钦宗","宋高宗","宋神宗","宋英宗"], a:0, note:"1127 年金军攻破开封，徽钦二帝被掳北上，北宋灭亡。"},
    {q:"元代都城大都，位于今天的哪座城市？", opts:["北京","西安","南京","洛阳"], a:0, note:"元大都即今北京，明永乐年间在其基础上营建紫禁城。"},
    {q:"「八股取士」成为科举固定文体，确立于哪个朝代？", opts:["唐朝","宋朝","明朝","清朝"], a:2, note:"八股文在明代定型，成为科举考试的标准文体。"},
    {q:"康熙年间率军平定台湾郑氏政权的是哪位将领？", opts:["郑成功","施琅","戚继光","左宗棠"], a:1, note:"郑成功 1662 年从荷兰人手中收复台湾；1683 年施琅率军平定郑氏，台湾正式纳入版图。"},
    {q:"中国历史上正式在位时间最长的皇帝是？", opts:["汉武帝","康熙","乾隆","万历"], a:1, note:"康熙在位 61 年，为正式在位最久的皇帝；乾隆在位 60 年。"},
    {q:"乾隆年间主持编纂的大型丛书是？", opts:["《永乐大典》","《四库全书》","《古今图书集成》","《太平御览》"], a:1, note:"《四库全书》乾隆年间修成，收书三千余种，规模空前。"}
  ],
  jinshi: [
    {q:"明太祖废除丞相制度、权分六部，发生在哪一年？", opts:["洪武元年（1368）","洪武十三年（1380）","永乐元年（1403）","宣德元年（1426）"], a:1, note:"洪武十三年以胡惟庸案为契机废中书省与丞相，皇帝直辖六部。"},
    {q:"张居正任内阁首辅、主持改革，主要在哪位皇帝在位期间？", opts:["隆庆","万历","嘉靖","天启"], a:1, note:"万历元年（1573）起，张居正主政十年，是明代中后期最重要改革。"},
    {q:"崇祯十七年（1644），攻入北京、终结明朝的农民军首领是谁？", opts:["张献忠","李自成","高迎祥","努尔哈赤"], a:1, note:"李自成率大顺军攻破北京，崇祯自缢煤山，明朝灭亡。"},
    {q:"「三杨辅政」中的杨士奇、杨荣、杨溥，主要在哪个时期掌权？", opts:["仁宣之治时期","洪武朝","万历朝","崇祯朝"], a:0, note:"三杨历仕永乐至正统初年，是仁宣盛世的重要辅臣。"},
    {q:"《天工开物》的作者是谁？", opts:["宋应星","李时珍","徐光启","徐霞客"], a:0, note:"宋应星所著《天工开物》系统记载农工技术，被称为「中国 17 世纪的工艺百科全书」。"},
    {q:"萨尔浒之战中明军四路出师惨败，发生在哪一年？", opts:["正统十四年（1449）","嘉靖三十四年（1555）","万历四十七年（1619）","崇祯十七年（1644）"], a:2, note:"万历四十七年明军四路合击后金，被努尔哈赤各个击破，辽东攻守易势。"},
    {q:"「五四运动」爆发于哪一年？", opts:["1911 年","1915 年","1919 年","1921 年"], a:2, note:"1919 年巴黎和会外交失败，北京学生率先掀起反帝爱国运动。"},
    {q:"汉代「丝绸之路」的开辟，与哪位人物的出使有关？", opts:["张骞","苏武","班超","霍去病"], a:0, note:"汉武帝时张骞两次出使西域，打通了中原通往西域的道路。"},
    {q:"三国中曹魏的建立者是谁？", opts:["曹操","曹丕","曹植","司马懿"], a:1, note:"220 年曹丕代汉称帝，建魏；曹操是奠基者而非开国皇帝。"},
    {q:"五代十国中，第一个建立的政权是？", opts:["后梁","后唐","后晋","后汉"], a:0, note:"907 年朱温废唐建后梁，五代十国自此开始。"},
    {q:"郑成功收复台湾，发生在哪一年？", opts:["1661 年","1662 年","1683 年","1684 年"], a:1, note:"1661 年郑成功东渡，1662 年驱逐荷兰殖民者，收复台湾。"},
    {q:"中国近代史上第一个不平等条约是？", opts:["《南京条约》","《马关条约》","《辛丑条约》","《北京条约》"], a:0, note:"1842 年鸦片战争后签订《南京条约》，中国开始沦为半殖民地半封建社会。"}
  ]
};

var keju = null;

function shuffleArr(arr){
  var a = arr.slice();
  for(var i=a.length-1;i>0;i--){
    var j = Math.floor(Math.random()*(i+1));
    var t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}

function initKeju(){
  var intro = document.getElementById("kejuIntro");
  if(!intro) return;
  var wrap = document.getElementById("kejuEras");
  if(wrap && !wrap.dataset.built){
    wrap.dataset.built = "1";
    var html = "";
    for(var i=0;i<KEJU_ERAS.length;i++){
      var e = KEJU_ERAS[i];
      html += '<label class="keju-era-card'+(i===0?' sel':'')+'">'
        + '<input type="radio" name="kejuEra" value="'+i+'"'+(i===0?' checked':'')+'>'
        + '<span class=\"keju-era-name\">'+e.name+'</span>'
        + '<span class=\"keju-era-anno\">公元 '+e.start+' 年</span>'
        + '<span class="keju-era-desc">'+e.desc+'</span>'
        + '<span class="keju-era-peers">同期名臣：'
        + e.peers.map(function(x){ return x.n; }).join("、")
        + '</span>'
        + '</label>';
    }
    wrap.innerHTML = html;
    for(var k=0;k<wrap.children.length;k++){
      wrap.children[k].addEventListener("click", function(){
        var cards = wrap.querySelectorAll(".keju-era-card");
        for(var c=0;c<cards.length;c++){ cards[c].classList.toggle("sel", cards[c]===this); }
      });
    }
  }
  showKejuScene("intro");
  var best = null;
  try{ best = JSON.parse(localStorage.getItem("kejuBest") || "null"); }catch(e){}
  var bestTxt = '尚无记录，等你金榜题名';
  if(best){
    var e0 = null;
    for(var bi=0;bi<KEJU_ERAS.length;bi++){ if(KEJU_ERAS[bi].era === best.era){ e0 = KEJU_ERAS[bi]; break; } }
    var gz = e0 ? (best.yr - e0.first + 1) : best.yr;
    bestTxt = '最佳记录：<b>'+best.title+'</b>（'+best.era+' '+kejuCN(gz)+' 年 · 共历 '+best.log.length+' 阶）';
  }
  document.getElementById("kejuBest").innerHTML = bestTxt;
}

function showKejuScene(id){
  var scenes = ["intro","quiz","fail","result"];
  for(var i=0;i<scenes.length;i++){
    var el = document.getElementById("keju"+scenes[i].charAt(0).toUpperCase()+scenes[i].slice(1));
    if(el){ el.style.display = (scenes[i]===id) ? "" : "none"; }
  }
}

function kejuStart(){
  var radios = document.querySelectorAll('input[name="kejuEra"]');
  var idx = 0;
  for(var i=0;i<radios.length;i++){ if(radios[i].checked){ idx = parseInt(radios[i].value, 10); break; } }
  keju = {era: KEJU_ERAS[idx], stageIdx:0, log:[], retry:{}};
  kejuLoadStage(0);
}

function kejuCN(n){
  var d = ["零","一","二","三","四","五","六","七","八","九"];
  if(n < 10) return d[n];
  if(n < 20) return n % 10 === 0 ? "十" : "十" + d[n % 10];
  var s = d[Math.floor(n/10)] + "十";
  if(n % 10) s += d[n % 10];
  return s;
}

function kejuYr(stageIdx, retryN){
  var offset = [1, 4, 5, 5][stageIdx] + (retryN || 0) * 3;
  var yr = keju.era.start + offset;
  var gz = yr - keju.era.first + 1;
  return {yr: yr, label: keju.era.era + " " + kejuCN(gz) + " 年"};
}

function kejuLoadStage(si){
  keju.stageIdx = si;
  keju.qIdx = 0;
  keju.right = 0;
  keju.qs = shuffleArr(KEJU_QUESTIONS[KEJU_STAGES[si].key]).slice(0,3);
  keju.retry[si] = keju.retry[si] || 0;
  document.getElementById("kejuStageName").textContent = KEJU_STAGES[si].name;
  document.getElementById("kejuStageGoal").textContent = "本关考取：" + KEJU_STAGES[si].goal;
  var y = kejuYr(si, keju.retry[si]);
  document.getElementById("kejuYear").textContent = y.label + "（公元 " + y.yr + " 年）";
  showKejuScene("quiz");
  kejuRenderQ();
}

function kejuRenderQ(){
  var q = keju.qs[keju.qIdx];
  var st = KEJU_STAGES[keju.stageIdx];
  document.getElementById("kejuProgress").textContent = "第 " + (keju.qIdx+1) + " / " + keju.qs.length + " 题";
  document.getElementById("kejuQuestion").textContent = q.q;
  var opts = document.getElementById("kejuOpts");
  var html = "";
  for(var i=0;i<q.opts.length;i++){
    html += '<button class="quiz-opt" data-opt="'+i+'"><span class="opt-key">'+"甲乙丙丁"[i]+'</span><span class="opt-tx">'+q.opts[i]+'</span></button>';
  }
  opts.innerHTML = html;
  for(var j=0;j<opts.children.length;j++){
    opts.children[j].addEventListener("click", function(){
      kejuAnswer(parseInt(this.getAttribute("data-opt"), 10));
    });
  }
  document.getElementById("kejuFb").style.display = "none";
  document.getElementById("kejuNextBtn").style.display = "none";
}

function kejuAnswer(i){
  var q = keju.qs[keju.qIdx];
  var opts = document.querySelectorAll("#kejuOpts .quiz-opt");
  var locked = false;
  for(var j=0;j<opts.length;j++){
    opts[j].classList.add("dim");
    if(j === q.a){
      opts[j].classList.add("right");
      opts[j].classList.remove("dim");
    }
  }
  if(i === q.a){
    keju.right++;
    opts[i].classList.add("right");
    opts[i].classList.remove("dim");
  } else {
    opts[i].classList.add("wrong");
  }
  var fb = document.getElementById("kejuFb");
  fb.style.display = "";
  fb.className = i === q.a ? "keju-fb ok" : "keju-fb no";
  fb.innerHTML = (i === q.a ? "答对了。" : "答错了。") + " " + q.note;
  var nbtn = document.getElementById("kejuNextBtn");
  nbtn.style.display = "";
  nbtn.textContent = keju.qIdx < keju.qs.length - 1 ? "下一题 →" : "交卷";
}

function kejuNext(){
  if(keju.qIdx < keju.qs.length - 1){
    keju.qIdx++;
    kejuRenderQ();
  } else {
    kejuSubmit();
  }
}

function kejuSubmit(){
  var st = KEJU_STAGES[keju.stageIdx];
  var y = kejuYr(keju.stageIdx, keju.retry[keju.stageIdx]);
  if(keju.right >= st.pass){
    var title = st.goal;
    if(keju.stageIdx === 3){
      title = keju.right === 3 ? "一甲第一名 · 状元" : (keju.right === 2 ? "二甲 · 赐进士出身" : "三甲 · 赐同进士出身");
    }
    keju.log.push({stage: st.name, yr: y.yr, label: y.label, title: title});
    if(keju.stageIdx < 3){
      kejuLoadStage(keju.stageIdx + 1);
    } else {
      kejuFinish();
    }
  } else {
    keju.retry[keju.stageIdx] = (keju.retry[keju.stageIdx] || 0) + 1;
    var nyr = kejuYr(keju.stageIdx, keju.retry[keju.stageIdx]);
    document.getElementById("kejuFailStage").textContent = st.name;
    document.getElementById("kejuFailText").innerHTML =
      "你答对 " + keju.right + " 题，未达本关要求（至少 " + st.pass + " 题）。"
      + "今科落第，功名未取。科举三年一科，下科当在 " + nyr.label + "（公元 " + nyr.yr + " 年）。"
      + "寒窗再读，卷土重来。";
    showKejuScene("fail");
  }
}

function kejuRetry(){
  kejuLoadStage(keju.stageIdx);
}

function kejuFinish(){
  var title = keju.log[keju.log.length-1].title;
  var y = keju.log[keju.log.length-1];
  document.getElementById("kejuFinalTitle").textContent = title;
  document.getElementById("kejuFinalEra").textContent = keju.era.era + " " + kejuCN(y.yr - keju.era.first + 1) + " 年";
  var logHtml = "";
  logHtml += '<div class="keju-log-item"><span class="kl-yr">' + keju.era.era + " " + kejuCN(keju.era.start - keju.era.first + 1) + " 年" + '</span><span class="kl-tx">童生入学，始应童试</span></div>';
  for(var i=0;i<keju.log.length;i++){
    var l = keju.log[i];
    var name = i === 0 ? "生员（秀才）" : (i === 1 ? "举人" : (i === 2 ? "贡士" : l.title));
    logHtml += '<div class="keju-log-item final'+(i===3?'':'')+'"><span class="kl-yr">' + l.label + '</span><span class="kl-tx">' + name + '</span></div>';
  }
  document.getElementById("kejuLog").innerHTML = logHtml;
  var peersHtml = "";
  for(var p=0;p<keju.era.peers.length;p++){
    var pe = keju.era.peers[p];
    peersHtml += '<div class="keju-peer"><div class="kp-name">'+pe.n+'</div><div class="kp-t">'+pe.t+'</div></div>';
  }
  document.getElementById("kejuPeers").innerHTML = peersHtml;
  document.getElementById("kejuPeersHead").textContent = "你的同期名臣（" + keju.era.era + " 朝）";
  var best = {title: title, era: keju.era.era, yr: y.yr, log: keju.log};
  try{
    var old = JSON.parse(localStorage.getItem("kejuBest") || "null");
    if(!old || (keju.log.length + keju.right) > (old.score || 0)){
      best.score = keju.log.length * 10 + keju.right;
      localStorage.setItem("kejuBest", JSON.stringify(best));
    }
  }catch(e){}
  showKejuScene("result");
}

function kejuRestart(){
  showKejuScene("intro");
  initKeju();
}

/* 页面就绪：绑定文化 Tabs */
initTabs();

/* ---------- 初始渲染 ---------- */
window.addEventListener("hashchange", render);
buildHero();
render();

