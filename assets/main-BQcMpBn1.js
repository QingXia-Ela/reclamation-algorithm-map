import{_ as R,d as k,r as O,a as y,p as H,i as ee,o as F,u as s,b as te,c as D,e as U,f as h,g as C,h as oe,j as ne,k as b,l as re,m as ae,n as u,q as v,w as p,s as g,t as j,v as M,x as J,y as E,z as se,E as le,A as ie,B as pe,C as A,D as N,F as l,G as K,H as I,I as ue,J as ce,K as V,L as de,M as fe,N as Q,O as B,P as W,Q as me,R as ve,S as _e,T,U as he,V as ge,W as be,X as ye}from"./virtual_svg-icons-register-Cf6jcXMv.js";const we=k({inheritAttrs:!1});function Ce(t,e,o,n,a,c){return O(t.$slots,"default")}var $e=R(we,[["render",Ce],["__file","collection.vue"]]);const Se=k({name:"ElCollectionItem",inheritAttrs:!1});function Ie(t,e,o,n,a,c){return O(t.$slots,"default")}var Ee=R(Se,[["render",Ie],["__file","collection-item.vue"]]);const Ne="data-el-collection-item",ke=t=>{const e=`El${t}Collection`,o=`${e}Item`,n=Symbol(e),a=Symbol(o),c={...$e,name:e,setup(){const i=y(null),d=new Map;H(n,{itemMap:d,getItems:()=>{const w=s(i);if(!w)return[];const _=Array.from(w.querySelectorAll(`[${Ne}]`));return[...d.values()].sort((P,L)=>_.indexOf(P.ref)-_.indexOf(L.ref))},collectionRef:i})}},f={...Ee,name:o,setup(i,{attrs:d}){const m=y(null),w=ee(n,void 0);H(a,{collectionItemRef:m}),F(()=>{const _=s(m);_&&w.itemMap.set(_,{ref:_,...d})}),te(()=>{const _=s(m);w.itemMap.delete(_)})}};return{COLLECTION_INJECTION_KEY:n,COLLECTION_ITEM_INJECTION_KEY:a,ElCollection:c,ElCollectionItem:f}},x=D({trigger:U.trigger,effect:{...h.effect,default:"light"},type:{type:C(String)},placement:{type:C(String),default:"bottom"},popperOptions:{type:C(Object),default:()=>({})},id:String,size:{type:String,default:""},splitButton:Boolean,hideOnClick:{type:Boolean,default:!0},loop:{type:Boolean,default:!0},showTimeout:{type:Number,default:150},hideTimeout:{type:Number,default:150},tabindex:{type:C([Number,String]),default:0},maxHeight:{type:C([Number,String]),default:""},popperClass:{type:String,default:""},disabled:{type:Boolean,default:!1},role:{type:String,default:"menu"},buttonProps:{type:C(Object)},teleported:h.teleported});D({command:{type:[Object,String,Number],default:()=>({})},disabled:Boolean,divided:Boolean,textValue:String,icon:{type:oe}});D({onKeydown:{type:C(Function)}});ke("Dropdown");const Oe=D({trigger:U.trigger,placement:x.placement,disabled:U.disabled,visible:h.visible,transition:h.transition,popperOptions:x.popperOptions,tabindex:x.tabindex,content:h.content,popperStyle:h.popperStyle,popperClass:h.popperClass,enterable:{...h.enterable,default:!0},effect:{...h.effect,default:"light"},teleported:h.teleported,title:String,width:{type:[String,Number],default:150},offset:{type:Number,default:void 0},showAfter:{type:Number,default:0},hideAfter:{type:Number,default:200},autoClose:{type:Number,default:0},showArrow:{type:Boolean,default:!0},persistent:{type:Boolean,default:!0},"onUpdate:visible":{type:Function}}),Te={"update:visible":t=>ne(t),"before-enter":()=>!0,"before-leave":()=>!0,"after-enter":()=>!0,"after-leave":()=>!0},Ae="onUpdate:visible",Me=k({name:"ElPopover"}),Be=k({...Me,props:Oe,emits:Te,setup(t,{expose:e,emit:o}){const n=t,a=b(()=>n[Ae]),c=re("popover"),f=y(),i=b(()=>{var r;return(r=s(f))==null?void 0:r.popperRef}),d=b(()=>[{width:ae(n.width)},n.popperStyle]),m=b(()=>[c.b(),n.popperClass,{[c.m("plain")]:!!n.content}]),w=b(()=>n.transition===`${c.namespace.value}-fade-in-linear`),_=()=>{var r;(r=f.value)==null||r.hide()},z=()=>{o("before-enter")},P=()=>{o("before-leave")},L=()=>{o("after-enter")},Z=()=>{o("update:visible",!1),o("after-leave")};return e({popperRef:i,hide:_}),(r,ut)=>(u(),v(s(le),se({ref_key:"tooltipRef",ref:f},r.$attrs,{trigger:r.trigger,placement:r.placement,disabled:r.disabled,visible:r.visible,transition:r.transition,"popper-options":r.popperOptions,tabindex:r.tabindex,content:r.content,offset:r.offset,"show-after":r.showAfter,"hide-after":r.hideAfter,"auto-close":r.autoClose,"show-arrow":r.showArrow,"aria-label":r.title,effect:r.effect,enterable:r.enterable,"popper-class":s(m),"popper-style":s(d),teleported:r.teleported,persistent:r.persistent,"gpu-acceleration":s(w),"onUpdate:visible":s(a),onBeforeShow:z,onBeforeHide:P,onShow:L,onHide:Z}),{content:p(()=>[r.title?(u(),g("div",{key:0,class:j(s(c).e("title")),role:"title"},M(r.title),3)):J("v-if",!0),O(r.$slots,"default",{},()=>[E(M(r.content),1)])]),default:p(()=>[r.$slots.reference?O(r.$slots,"reference",{key:0}):J("v-if",!0)]),_:3},16,["trigger","placement","disabled","visible","transition","popper-options","tabindex","content","offset","show-after","hide-after","auto-close","show-arrow","aria-label","effect","enterable","popper-class","popper-style","teleported","persistent","gpu-acceleration","onUpdate:visible"]))}});var De=R(Be,[["__file","popover.vue"]]);const q=(t,e)=>{const o=e.arg||e.value,n=o?.popperRef;n&&(n.triggerRef=t)};var Ve={mounted(t,e){q(t,e)},updated(t,e){q(t,e)}};const Pe="popover",Le=ie(Ve,Pe),xe=pe(De,{directive:Le}),Ue={__name:"OperateButton",props:{disabled:Boolean,popover:String,popoverWidth:{type:Number,default:300}},emits:["click"],setup(t){const e=t,o=b(()=>({operate_button:!0,disabled:e.disabled})),n=y(!1);let a=null;function c(){a=setTimeout(()=>{n.value=!0},300)}function f(){clearTimeout(a),n.value=!1}return(i,d)=>(u(),v(s(xe),{placement:"top",disabled:!e.popover,content:e.popover,"popper-style":"text-align: center",visible:n.value,width:e.popoverWidth},{reference:p(()=>[N("div",{class:j(o.value),onClick:d[0]||(d[0]=m=>i.$emit("click")),onMouseenter:c,onMouseleave:f},[O(i.$slots,"default",{},void 0,!0)],34)]),_:3},8,["disabled","content","visible","width"]))}},$=A(Ue,[["__scopeId","data-v-d440c99d"]]),Re={"aria-hidden":"true",class:"svg"},Fe=["xlink:href","fill"],je={__name:"SvgIcon",props:{prefix:{type:String,default:"icon"},name:{type:String,required:!0},color:{type:String,default:"#333"}},setup(t){const e=t,o=b(()=>`#${e.prefix}-${e.name}`);return(n,a)=>(u(),g("svg",Re,[N("use",{"xlink:href":o.value,fill:t.color},null,8,Fe)]))}},S=A(je,[["__scopeId","data-v-47352943"]]),Ke=t=>(ue("data-v-199ba81d"),t=t(),ce(),t),ze=Ke(()=>N("div",{class:"iframe_wrapper"},[N("iframe",{src:"https://luotianorange.github.io/SXYS-tools/",class:"iframe",frameborder:"0"})],-1)),He={__name:"CheckFoodFormula",setup(t){const e=y(!1);return(o,n)=>(u(),g(I,null,[l($,{popover:"查看游戏内所有食谱（该功能由外部网站实现）","popover-width":200,onClick:n[0]||(n[0]=a=>e.value=!0)},{default:p(()=>[l(S,{name:"cook",color:"#fff",style:{width:"1.6rem",height:"1.6rem"}})]),_:1}),l(s(K),{width:"80%",top:"5vh",theme:"dark",title:"生息演算在线工具",modelValue:e.value,"onUpdate:modelValue":n[1]||(n[1]=a=>e.value=a),onClose:n[2]||(n[2]=a=>e.value=!1),"append-to-body":""},{default:p(()=>[ze]),_:1},8,["modelValue"])],64))}},Je=A(He,[["__scopeId","data-v-199ba81d"]]),Qe={__name:"QueryShortestRoad",setup(t){function e(){V({type:"info",message:"功能还在开发中，敬请期待"})}return(o,n)=>(u(),v($,{popover:"查询两个节点的最短路线","popover-width":180,onClick:e},{default:p(()=>[l(S,{name:"connect",color:"#fff",style:{width:"1.6rem",height:"1.6rem"}})]),_:1}))}},We={__name:"FindNode",setup(t){function e(){V({type:"info",message:"功能还在开发中，敬请期待"})}return(o,n)=>(u(),v($,{popover:"查找指定类型的节点","popover-width":180,onClick:e},{default:p(()=>[l(S,{name:"find",color:"#eee",style:{width:"1.2rem",height:"1.2rem"}})]),_:1}))}},qe={__name:"Knowledge",setup(t){function e(){V({type:"info",message:"功能还在开发中，敬请期待"})}return(o,n)=>(u(),v($,{popover:"一些你可能需要的小知识","popover-width":180,onClick:e},{default:p(()=>[l(S,{name:"knowledge",color:"#eee",style:{width:"1.2rem",height:"1.2rem"}})]),_:1}))}};let G=null;const Y=de("currentAnnouncement",{state:()=>({show:!1}),actions:{showDialog(){this.show=!0},hideDialog(){this.show=!1},toggleDialog(t){this.show=t},getCurrentAnnouncementComponent(){return G},setCurrentAnnouncementComponent(t){G=t}}}),Ge={class:"markdown-body"},Ye=fe('<h2>网站访问建议</h2><p>建议本网站在 PC 端使用 chrome 浏览器进行访问</p><p>手机可以在页面设置里开启 <code class="">桌面版网站</code> 选项，并使用横屏浏览优化体验</p><p><strong>如果您的浏览器发现无法正常访问网站，或背景出现黑屏等问题，请更换您的浏览器至 Chrome 并选择最新版本！！！</strong></p><h2>目前已开放功能</h2><ul><li>主地图 + 4 个固有陌域浏览</li><li>各节点地图、资源查询</li><li>食谱网站访问</li></ul><h2>预计新增功能</h2><ul><li>每张图享有的特殊小知识</li><li>陌域地图池全补充</li><li>节点按文本、按资源、按类型搜索功能</li><li>最短路径查询功能</li><li>查询离某个节点最近的且包含指定资源节点的功能</li><li>节点地图增加实景图</li></ul><h2>声明</h2><p>地图的贴图，文字说明均来源于官方数据，本站仅为了提升玩家游戏体验与方便查询地图而使用。</p><p>其版权仍归官方所有！</p><h2>联系我们</h2><p>地图交流QQ群：716767834</p><h2>更新记录</h2><p>啥都没有捏（´_ゝ｀）</p>',15),Xe=[Ye],Ze=k({__name:"announcement",setup(t,{expose:e}){return e({frontmatter:{},excerpt:void 0}),(o,n)=>(u(),g("div",Ge,Xe))}}),et={__name:"Notification",setup(t){const e=Y();function o(){e.setCurrentAnnouncementComponent(Ze),e.showDialog()}return F(()=>{setTimeout(()=>{sessionStorage.getItem("hasOpen")!=="true"&&(sessionStorage.setItem("hasOpen","true"),o())})}),(n,a)=>(u(),v($,{popover:"网站更新公告","popover-width":180,onClick:o},{default:p(()=>[l(S,{name:"announce",color:"#eee",style:{width:"1.2rem",height:"1.2rem"}})]),_:1}))}},tt={__name:"MapSwitch",setup(t){const e=y(!1),o=y("main"),n=Q.filter(f=>f.fixed_dungeon),a=[{title:"主地图",value:[Q[0]]},{title:"固定陌域",value:n},{title:"百变陌域(暂无具体地图名称)",value:[]}];function c(f){_e(f).then(async i=>{i.type!==T.type&&await T.changeMap(i,f)}).finally(()=>{e.value=!1})}return(f,i)=>(u(),g(I,null,[l($,{popover:"查看其他区域的地图","popover-width":180,onClick:i[0]||(i[0]=d=>e.value=!0)},{default:p(()=>[l(S,{name:"map",color:"#eee",style:{width:"1.2rem",height:"1.2rem"}})]),_:1}),l(s(K),{modelValue:e.value,"onUpdate:modelValue":i[4]||(i[4]=d=>e.value=d),title:"选择要更换的地图","before-close":()=>e.value=!1,"append-to-body":""},{footer:p(()=>[l(s(B),{onClick:i[2]||(i[2]=d=>e.value=!1)},{default:p(()=>[E("取消")]),_:1}),l(s(B),{type:"primary",onClick:i[3]||(i[3]=d=>c(o.value))},{default:p(()=>[E("更换地图")]),_:1})]),default:p(()=>[(u(),g(I,null,W(a,d=>(u(),g(I,{key:d.title},[N("h3",null,M(d.title),1),l(s(me),{modelValue:o.value,"onUpdate:modelValue":i[1]||(i[1]=m=>o.value=m)},{default:p(()=>[(u(!0),g(I,null,W(d.value,m=>(u(),v(s(ve),{label:m.value,key:m.value,size:"large"},{default:p(()=>[E(M(m.label),1)]),_:2},1032,["label"]))),128))]),_:2},1032,["modelValue"])],64))),64))]),_:1},8,["modelValue","before-close"])],64))}},ot={__name:"ResetCamera",setup(t){return(e,o)=>(u(),v($,{popover:"回到地图中心","popover-width":180,onClick:o[0]||(o[0]=n=>s(T).setCameraPosition({x:0,y:0}))},{default:p(()=>[l(S,{name:"local",color:"#eee",style:{width:"1.2rem",height:"1.2rem"}})]),_:1}))}},nt={__name:"index",setup(t){const e=y(!1);let o=null;function n(){clearTimeout(o),e.value=!0}function a(){o=setTimeout(()=>{e.value=!1},3e3)}const c=b(()=>({toolbar_wrapper:!0,show:e.value}));return(f,i)=>(u(),g("div",{class:j(c.value),onMouseenter:n,onMouseleave:a},[l(Je),l(Qe),l(We),l(ot),l(tt),l(qe),l(et)],34))}},rt=A(nt,[["__scopeId","data-v-3c5039eb"]]),at={class:"dialog"},st={__name:"index",setup(t){const e=Y(),o=b(()=>e.getCurrentAnnouncementComponent());return(n,a)=>(u(),v(s(K),{width:"40rem",top:"15vh",title:"公告",modelValue:s(e).show,"onUpdate:modelValue":a[2]||(a[2]=c=>s(e).show=c),onClose:a[3]||(a[3]=c=>s(e).hideDialog())},{footer:p(()=>[l(s(B),{onClick:a[0]||(a[0]=c=>s(e).hideDialog())},{default:p(()=>[E("确认")]),_:1}),l(s(B),{onClick:a[1]||(a[1]=c=>s(e).hideDialog()),type:"primary"},{default:p(()=>[E("确定")]),_:1})]),default:p(()=>[N("div",at,[(u(),v(he(o.value)))])]),_:1},8,["modelValue"]))}},lt=A(st,[["__scopeId","data-v-8a719fb5"]]),it={__name:"index",setup(t){return F(()=>{V({title:"提示",message:"当前为生产环境部署页面，背景加载速度较慢，请耐心等待",type:"warning",duration:1e4})}),(e,o)=>(u(),g(I,null,[l(rt),l(ge),l(lt)],64))}},pt=k({__name:"App",setup(t){const e=it;return(o,n)=>(u(),v(s(e)))}});window.MapCore=T;const X=be(pt);X.use(ye);X.mount("#app");T.loadDefaultData();