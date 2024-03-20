import{_ as j,d as O,r as T,a as k,p as J,i as ae,o as K,u as s,b as re,c as V,e as F,f as y,g as I,h as le,j as se,k as w,l as ie,m as pe,n as c,q as g,w as u,s as C,t as Q,v as B,x as z,y as N,z as ue,E as ce,A as de,B as fe,C as D,D as M,F as i,G,H as E,I as me,J as _e,K as x,L as he,M as ve,N as ge,O as be,P as ye,Q as we,R as H,S as P,T as W,U as Ce,V as Se,W as $e,X,Y as A,Z as Ie,$ as Ee,a0 as Ne,a1 as ke,a2 as Me}from"./virtual_svg-icons-register-D5bXK7mT.js";const Oe=O({inheritAttrs:!1});function Te(n,e,o,t,a,p){return T(n.$slots,"default")}var Ae=j(Oe,[["render",Te],["__file","collection.vue"]]);const De=O({name:"ElCollectionItem",inheritAttrs:!1});function Be(n,e,o,t,a,p){return T(n.$slots,"default")}var Pe=j(De,[["render",Be],["__file","collection-item.vue"]]);const Ve="data-el-collection-item",xe=n=>{const e=`El${n}Collection`,o=`${e}Item`,t=Symbol(e),a=Symbol(o),p={...Ae,name:e,setup(){const _=k(null),m=new Map;J(t,{itemMap:m,getItems:()=>{const d=s(_);if(!d)return[];const f=Array.from(d.querySelectorAll(`[${Ve}]`));return[...m.values()].sort((L,R)=>f.indexOf(L.ref)-f.indexOf(R.ref))},collectionRef:_})}},r={...Pe,name:o,setup(_,{attrs:m}){const h=k(null),d=ae(t,void 0);J(a,{collectionItemRef:h}),K(()=>{const f=s(h);f&&d.itemMap.set(f,{ref:f,...m})}),re(()=>{const f=s(h);d.itemMap.delete(f)})}};return{COLLECTION_INJECTION_KEY:t,COLLECTION_ITEM_INJECTION_KEY:a,ElCollection:p,ElCollectionItem:r}},U=V({trigger:F.trigger,effect:{...y.effect,default:"light"},type:{type:I(String)},placement:{type:I(String),default:"bottom"},popperOptions:{type:I(Object),default:()=>({})},id:String,size:{type:String,default:""},splitButton:Boolean,hideOnClick:{type:Boolean,default:!0},loop:{type:Boolean,default:!0},showTimeout:{type:Number,default:150},hideTimeout:{type:Number,default:150},tabindex:{type:I([Number,String]),default:0},maxHeight:{type:I([Number,String]),default:""},popperClass:{type:String,default:""},disabled:{type:Boolean,default:!1},role:{type:String,default:"menu"},buttonProps:{type:I(Object)},teleported:y.teleported});V({command:{type:[Object,String,Number],default:()=>({})},disabled:Boolean,divided:Boolean,textValue:String,icon:{type:le}});V({onKeydown:{type:I(Function)}});xe("Dropdown");const Le=V({trigger:F.trigger,placement:U.placement,disabled:F.disabled,visible:y.visible,transition:y.transition,popperOptions:U.popperOptions,tabindex:U.tabindex,content:y.content,popperStyle:y.popperStyle,popperClass:y.popperClass,enterable:{...y.enterable,default:!0},effect:{...y.effect,default:"light"},teleported:y.teleported,title:String,width:{type:[String,Number],default:150},offset:{type:Number,default:void 0},showAfter:{type:Number,default:0},hideAfter:{type:Number,default:200},autoClose:{type:Number,default:0},showArrow:{type:Boolean,default:!0},persistent:{type:Boolean,default:!0},"onUpdate:visible":{type:Function}}),Re={"update:visible":n=>se(n),"before-enter":()=>!0,"before-leave":()=>!0,"after-enter":()=>!0,"after-leave":()=>!0},Ue="onUpdate:visible",Fe=O({name:"ElPopover"}),je=O({...Fe,props:Le,emits:Re,setup(n,{expose:e,emit:o}){const t=n,a=w(()=>t[Ue]),p=ie("popover"),r=k(),_=w(()=>{var l;return(l=s(r))==null?void 0:l.popperRef}),m=w(()=>[{width:pe(t.width)},t.popperStyle]),h=w(()=>[p.b(),t.popperClass,{[p.m("plain")]:!!t.content}]),d=w(()=>t.transition===`${p.namespace.value}-fade-in-linear`),f=()=>{var l;(l=r.value)==null||l.hide()},b=()=>{o("before-enter")},L=()=>{o("before-leave")},R=()=>{o("after-enter")},ne=()=>{o("update:visible",!1),o("after-leave")};return e({popperRef:_,hide:f}),(l,Ct)=>(c(),g(s(ce),ue({ref_key:"tooltipRef",ref:r},l.$attrs,{trigger:l.trigger,placement:l.placement,disabled:l.disabled,visible:l.visible,transition:l.transition,"popper-options":l.popperOptions,tabindex:l.tabindex,content:l.content,offset:l.offset,"show-after":l.showAfter,"hide-after":l.hideAfter,"auto-close":l.autoClose,"show-arrow":l.showArrow,"aria-label":l.title,effect:l.effect,enterable:l.enterable,"popper-class":s(h),"popper-style":s(m),teleported:l.teleported,persistent:l.persistent,"gpu-acceleration":s(d),"onUpdate:visible":s(a),onBeforeShow:b,onBeforeHide:L,onShow:R,onHide:ne}),{content:u(()=>[l.title?(c(),C("div",{key:0,class:Q(s(p).e("title")),role:"title"},B(l.title),3)):z("v-if",!0),T(l.$slots,"default",{},()=>[N(B(l.content),1)])]),default:u(()=>[l.$slots.reference?T(l.$slots,"reference",{key:0}):z("v-if",!0)]),_:3},16,["trigger","placement","disabled","visible","transition","popper-options","tabindex","content","offset","show-after","hide-after","auto-close","show-arrow","aria-label","effect","enterable","popper-class","popper-style","teleported","persistent","gpu-acceleration","onUpdate:visible"]))}});var Ke=j(je,[["__file","popover.vue"]]);const Y=(n,e)=>{const o=e.arg||e.value,t=o?.popperRef;t&&(t.triggerRef=n)};var Qe={mounted(n,e){Y(n,e)},updated(n,e){Y(n,e)}};const Ge="popover",Je=de(Qe,Ge),ze=fe(Ke,{directive:Je}),He={__name:"OperateButton",props:{disabled:Boolean,popover:String,popoverWidth:{type:Number,default:300}},emits:["click"],setup(n){const e=n,o=w(()=>({operate_button:!0,disabled:e.disabled})),t=k(!1);let a=null;function p(){a=setTimeout(()=>{t.value=!0},300)}function r(){clearTimeout(a),t.value=!1}return(_,m)=>(c(),g(s(ze),{placement:"top",disabled:!e.popover,content:e.popover,"popper-style":"text-align: center",visible:t.value,width:e.popoverWidth},{reference:u(()=>[M("div",{class:Q(o.value),onClick:m[0]||(m[0]=h=>_.$emit("click")),onMouseenter:p,onMouseleave:r},[T(_.$slots,"default",{},void 0,!0)],34)]),_:3},8,["disabled","content","visible","width"]))}},S=D(He,[["__scopeId","data-v-d440c99d"]]),We={"aria-hidden":"true",class:"svg"},Ye=["xlink:href","fill"],qe={__name:"SvgIcon",props:{prefix:{type:String,default:"icon"},name:{type:String,required:!0},color:{type:String,default:"#333"}},setup(n){const e=n,o=w(()=>`#${e.prefix}-${e.name}`);return(t,a)=>(c(),C("svg",We,[M("use",{"xlink:href":o.value,fill:n.color},null,8,Ye)]))}},$=D(qe,[["__scopeId","data-v-47352943"]]),Xe=n=>(me("data-v-199ba81d"),n=n(),_e(),n),Ze=Xe(()=>M("div",{class:"iframe_wrapper"},[M("iframe",{src:"https://luotianorange.github.io/SXYS-tools/",class:"iframe",frameborder:"0"})],-1)),et={__name:"CheckFoodFormula",setup(n){const e=k(!1);return(o,t)=>(c(),C(E,null,[i(S,{popover:"查看游戏内所有食谱（该功能由外部网站实现）","popover-width":200,onClick:t[0]||(t[0]=a=>e.value=!0)},{default:u(()=>[i($,{name:"cook",color:"#fff",style:{width:"1.6rem",height:"1.6rem"}})]),_:1}),i(s(G),{width:"80%",top:"5vh",theme:"dark",title:"生息演算在线工具",modelValue:e.value,"onUpdate:modelValue":t[1]||(t[1]=a=>e.value=a),onClose:t[2]||(t[2]=a=>e.value=!1),"append-to-body":""},{default:u(()=>[Ze]),_:1},8,["modelValue"])],64))}},tt=D(et,[["__scopeId","data-v-199ba81d"]]),ot={__name:"QueryShortestRoad",setup(n){function e(){x({type:"info",message:"功能还在开发中，敬请期待"})}return(o,t)=>(c(),g(S,{popover:"查询两个节点的最短路线","popover-width":180,onClick:e},{default:u(()=>[i($,{name:"connect",color:"#fff",style:{width:"1.6rem",height:"1.6rem"}})]),_:1}))}},nt={__name:"FindNode",setup(n){function e(){x({type:"info",message:"功能还在开发中，敬请期待"})}return(o,t)=>(c(),g(S,{popover:"查找指定类型的节点","popover-width":180,onClick:e},{default:u(()=>[i($,{name:"find",color:"#eee",style:{width:"1.2rem",height:"1.2rem"}})]),_:1}))}},at={__name:"Knowledge",setup(n){function e(){x({type:"info",message:"功能还在开发中，敬请期待"})}return(o,t)=>(c(),g(S,{popover:"一些你可能需要的小知识","popover-width":180,onClick:e},{default:u(()=>[i($,{name:"knowledge",color:"#eee",style:{width:"1.2rem",height:"1.2rem"}})]),_:1}))}};let q=null;const Z=he("currentAnnouncement",{state:()=>({show:!1}),actions:{showDialog(){this.show=!0},hideDialog(){this.show=!1},toggleDialog(n){this.show=n},getCurrentAnnouncementComponent(){return q},setCurrentAnnouncementComponent(n){q=n}}}),rt={class:"markdown-body"},lt=ve('<h2>网站访问建议</h2><p>建议本网站在 PC 端使用 chrome 浏览器进行访问</p><p>手机可以在页面设置里开启 <code class="">桌面版网站</code> 选项，并使用横屏浏览优化体验</p><p><strong>如果您的浏览器发现无法正常访问网站，或背景出现黑屏等问题，请更换您的浏览器至 Chrome 并选择最新版本！！！</strong></p><p>网页底部有一个小工具栏，鼠标悬浮 / 移动端点击后会主动悬浮出来，里面有比较实用的功能</p><h2>目前已开放功能</h2><ul><li>主地图 + 4 个固有陌域浏览</li><li>各节点地图、资源查询</li><li>食谱网站访问</li></ul><h2>预计新增功能</h2><ul><li>每张图享有的特殊小知识</li><li>陌域地图池全补充</li><li>节点按文本、按资源、按类型搜索功能</li><li>最短路径查询功能</li><li>查询离某个节点最近的且包含指定资源节点的功能</li><li>节点地图增加实景图</li></ul><h2>声明 &amp; 感谢</h2><p>地图的贴图，文字说明均来源于官方数据，本站仅为了提升玩家游戏体验与方便查询地图而使用。其版权仍归官方所有！</p><p>百变陌域数据来源于 UP主 <a href="https://space.bilibili.com/26416283">GShock966</a> 的粉丝群，在此表示感谢。</p><h2>地图制作与地图使用手册</h2><p>地图制作网页：<a href="http://shiinafan.gitee.io/reclamation-algorithm-map/edit">http://shiinafan.gitee.io/reclamation-algorithm-map/edit</a></p><p>地图制作文档：<a href="http://shiinafan.gitee.io/reclamation-algorithm-map/docs/edit">http://shiinafan.gitee.io/reclamation-algorithm-map/docs/edit</a></p><h2>联系我们</h2><p>地图交流QQ群：716767834</p>',17),st=[lt],it=O({__name:"announcement",setup(n,{expose:e}){return e({frontmatter:{},excerpt:void 0}),(o,t)=>(c(),C("div",rt,st))}}),pt={__name:"Notification",setup(n){const e=Z();function o(){e.setCurrentAnnouncementComponent(it),e.showDialog()}return K(()=>{setTimeout(()=>{sessionStorage.getItem("hasOpen")!=="true"&&(sessionStorage.setItem("hasOpen","true"),o())})}),(t,a)=>(c(),g(S,{popover:"网站更新公告","popover-width":180,onClick:o},{default:u(()=>[i($,{name:"announce",color:"#eee",style:{width:"1.2rem",height:"1.2rem"}})]),_:1}))}};function ee(n){let e=ge(),o=n.subscribe(t=>{e.value=t});return be()&&ye(o),e}let v=[],ut=(n,e)=>{let o=[],t={get(){return t.lc||t.listen(()=>{})(),t.value},l:e||0,lc:0,listen(a,p){return t.lc=o.push(a,p||t.l)/2,()=>{let r=o.indexOf(a);~r&&(o.splice(r,2),--t.lc)}},notify(a){let p=!v.length;for(let r=0;r<o.length;r+=2)v.push(o[r],o[r+1],t.value,a);if(p){for(let r=0;r<v.length;r+=4){let _;for(let m=r+1;!_&&(m+=4)<v.length;)v[m]<v[r+1]&&(_=v.push(v[r],v[r+1],v[r+2],v[r+3]));_||v[r](v[r+2],v[r+3])}v.length=0}},off(){},set(a){t.value!==a&&(t.value=a,t.notify())},subscribe(a,p){let r=t.listen(a,p);return a(t.value),r},value:n};return t};const te=ut({map:"main"});var ct=[{name:"陌域图-通幽处-捕猎单峰回",filename:"dungeon_rift_1.json"}];const dt={__name:"MapSwitch",setup(n){const e=we(),o=w(()=>e.openMapSelect),{map:t}=ee(te),a=H.filter(h=>h.fixed_dungeon),p=[{title:"主地图",value:[H[0]]},{title:"固定陌域",value:a},{title:"百变陌域(名字仅供参考)",value:ct.map(({name:h,filename:d})=>({value:d,label:h}))}];function r(h){X(h).then(async d=>{d.type!==A.type&&await A.changeMap(d,h)}).finally(()=>{m()})}function _(){e.setOpenMapSelect(!0)}function m(){e.setOpenMapSelect(!1)}return(h,d)=>(c(),C(E,null,[i(S,{popover:"查看其他区域的地图","popover-width":180,onClick:_},{default:u(()=>[i($,{name:"map",color:"#eee",style:{width:"1.2rem",height:"1.2rem"}})]),_:1}),i(s(G),{modelValue:o.value,"onUpdate:modelValue":d[2]||(d[2]=f=>o.value=f),title:"选择要更换的地图","before-close":m,"append-to-body":""},{footer:u(()=>[i(s(P),{onClick:m},{default:u(()=>[N("取消")]),_:1}),i(s(P),{type:"primary",onClick:d[1]||(d[1]=f=>r(s(t)))},{default:u(()=>[N("更换地图")]),_:1})]),default:u(()=>[(c(),C(E,null,W(p,f=>(c(),C(E,{key:f.title},[M("h3",null,B(f.title),1),i(s(Ce),{modelValue:s(t),"onUpdate:modelValue":d[0]||(d[0]=b=>Se(t)?t.value=b:null)},{default:u(()=>[(c(!0),C(E,null,W(f.value,b=>(c(),g(s($e),{label:b.value,key:b.value,size:"large"},{default:u(()=>[N(B(b.label?.length?b.label:b.value),1)]),_:2},1032,["label"]))),128))]),_:2},1032,["modelValue"])],64))),64))]),_:1},8,["modelValue"])],64))}},ft={__name:"ResetCamera",setup(n){return(e,o)=>(c(),g(S,{popover:"回到地图中心","popover-width":180,onClick:o[0]||(o[0]=t=>s(A).setCameraPosition({x:0,y:0}))},{default:u(()=>[i($,{name:"local",color:"#eee",style:{width:"1.2rem",height:"1.2rem"}})]),_:1}))}},mt={__name:"DownloadCurrentMap",setup(n){const e=ee(te);function o(t){X(t).then(a=>{Ie(JSON.stringify(a),`生息演算地图_${t}.json`)})}return(t,a)=>(c(),g(S,{popover:"下载当前地图","popover-width":180,onClick:a[0]||(a[0]=p=>o(s(e).map))},{default:u(()=>[i($,{name:"download",color:"#eee",style:{width:"1.2rem",height:"1.2rem"}})]),_:1}))}},_t={__name:"index",setup(n){const e=k(!1);let o=null;function t(){clearTimeout(o),e.value=!0}function a(){o=setTimeout(()=>{e.value=!1},3e3)}const p=w(()=>({toolbar_wrapper:!0,show:e.value}));return(r,_)=>(c(),C("div",{class:Q(p.value),onMouseenter:t,onMouseleave:a},[i(tt),i(ot),i(nt),i(ft),i(dt),i(mt),i(at),i(pt)],34))}},ht=D(_t,[["__scopeId","data-v-c48a2a5b"]]),vt={class:"dialog"},gt={__name:"index",setup(n){const e=Z(),o=w(()=>e.getCurrentAnnouncementComponent());return(t,a)=>(c(),g(s(G),{width:"40rem",top:"15vh",title:"公告",modelValue:s(e).show,"onUpdate:modelValue":a[2]||(a[2]=p=>s(e).show=p),onClose:a[3]||(a[3]=p=>s(e).hideDialog())},{footer:u(()=>[i(s(P),{onClick:a[0]||(a[0]=p=>s(e).hideDialog())},{default:u(()=>[N("确认")]),_:1}),i(s(P),{onClick:a[1]||(a[1]=p=>s(e).hideDialog()),type:"primary"},{default:u(()=>[N("确定")]),_:1})]),default:u(()=>[M("div",vt,[(c(),g(Ee(o.value)))])]),_:1},8,["modelValue"]))}},bt=D(gt,[["__scopeId","data-v-6f47fe3b"]]),yt={__name:"index",setup(n){return K(()=>{x({title:"提示",message:"当前为生产环境部署页面，背景加载速度较慢，请耐心等待",type:"warning",duration:1e4})}),(e,o)=>(c(),C(E,null,[i(ht),i(Ne),i(bt)],64))}},wt=O({__name:"App",setup(n){const e=yt;return(o,t)=>(c(),g(s(e)))}});window.MapCore=A;const oe=ke(wt);oe.use(Me);oe.mount("#app");A.loadDefaultData();
