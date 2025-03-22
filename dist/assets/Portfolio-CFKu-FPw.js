import{r as h,j as l}from"./index-ZFMuFutx.js";import{t as p,u as k,r as X,p as Y,w as $,x as N,g as G,y as q,z as U,A as K,B as Z,C as B,D as ee,E as D,F as v,M as te,I as b,m}from"./proxy-CtJKuTqL.js";import{u as ne}from"./use-in-view-d7FF4XhY.js";function J(e,t){let s;const n=()=>{const{currentTime:i}=t,o=(i===null?0:i.value)/100;s!==o&&e(o),s=o};return p.update(n,!0),()=>k(n)}const E=new WeakMap;let g;function se(e,t){if(t){const{inlineSize:s,blockSize:n}=t[0];return{width:s,height:n}}else return e instanceof SVGElement&&"getBBox"in e?e.getBBox():{width:e.offsetWidth,height:e.offsetHeight}}function ie({target:e,contentRect:t,borderBoxSize:s}){var n;(n=E.get(e))===null||n===void 0||n.forEach(i=>{i({target:e,contentSize:t,get size(){return se(e,s)}})})}function re(e){e.forEach(ie)}function oe(){typeof ResizeObserver>"u"||(g=new ResizeObserver(re))}function le(e,t){g||oe();const s=X(e);return s.forEach(n=>{let i=E.get(n);i||(i=new Set,E.set(n,i)),i.add(t),g==null||g.observe(n)}),()=>{s.forEach(n=>{const i=E.get(n);i==null||i.delete(t),i!=null&&i.size||g==null||g.unobserve(n)})}}const S=new Set;let x;function ce(){x=()=>{const e={width:window.innerWidth,height:window.innerHeight},t={target:window,size:e,contentSize:e};S.forEach(s=>s(t))},window.addEventListener("resize",x)}function ae(e){return S.add(e),x||ce(),()=>{S.delete(e),!S.size&&x&&(x=void 0)}}function ue(e,t){return typeof e=="function"?ae(e):le(e,t)}const fe=50,H=()=>({current:0,offset:[],progress:0,scrollLength:0,targetOffset:0,targetLength:0,containerLength:0,velocity:0}),de=()=>({time:0,x:H(),y:H()}),ge={x:{length:"Width",position:"Left"},y:{length:"Height",position:"Top"}};function A(e,t,s,n){const i=s[t],{length:r,position:o}=ge[t],c=i.current,a=s.time;i.current=e[`scroll${o}`],i.scrollLength=e[`scroll${r}`]-e[`client${r}`],i.offset.length=0,i.offset[0]=0,i.offset[1]=i.scrollLength,i.progress=Y(0,i.scrollLength,i.current);const f=n-a;i.velocity=f>fe?0:$(i.current-c,f)}function he(e,t,s){A(e,"x",t,s),A(e,"y",t,s),t.time=s}function me(e,t){const s={x:0,y:0};let n=e;for(;n&&n!==t;)if(n instanceof HTMLElement)s.x+=n.offsetLeft,s.y+=n.offsetTop,n=n.offsetParent;else if(n.tagName==="svg"){const i=n.getBoundingClientRect();n=n.parentElement;const r=n.getBoundingClientRect();s.x+=i.left-r.left,s.y+=i.top-r.top}else if(n instanceof SVGGraphicsElement){const{x:i,y:r}=n.getBBox();s.x+=i,s.y+=r;let o=null,c=n.parentNode;for(;!o;)c.tagName==="svg"&&(o=c),c=n.parentNode;n=o}else break;return s}const W={start:0,center:.5,end:1};function O(e,t,s=0){let n=0;if(e in W&&(e=W[e]),typeof e=="string"){const i=parseFloat(e);e.endsWith("px")?n=i:e.endsWith("%")?e=i/100:e.endsWith("vw")?n=i/100*document.documentElement.clientWidth:e.endsWith("vh")?n=i/100*document.documentElement.clientHeight:e=i}return typeof e=="number"&&(n=t*e),s+n}const pe=[0,0];function ye(e,t,s,n){let i=Array.isArray(e)?e:pe,r=0,o=0;return typeof e=="number"?i=[e,e]:typeof e=="string"&&(e=e.trim(),e.includes(" ")?i=e.split(" "):i=[e,W[e]?e:"0"]),r=O(i[0],s,n),o=O(i[1],t),r-o}const ve={Enter:[[0,1],[1,1]],Exit:[[0,0],[1,0]],Any:[[1,0],[0,1]],All:[[0,0],[1,1]]},xe={x:0,y:0};function we(e){return"getBBox"in e&&e.tagName!=="svg"?e.getBBox():{width:e.clientWidth,height:e.clientHeight}}function Ee(e,t,s){const{offset:n=ve.All}=s,{target:i=e,axis:r="y"}=s,o=r==="y"?"height":"width",c=i!==e?me(i,e):xe,a=i===e?{width:e.scrollWidth,height:e.scrollHeight}:we(i),f={width:e.clientWidth,height:e.clientHeight};t[r].offset.length=0;let d=!t[r].interpolate;const L=n.length;for(let u=0;u<L;u++){const T=ye(n[u],f[o],a[o],c[r]);!d&&T!==t[r].interpolatorOffsets[u]&&(d=!0),t[r].offset[u]=T}d&&(t[r].interpolate=N(t[r].offset,G(n),{clamp:!1}),t[r].interpolatorOffsets=[...t[r].offset]),t[r].progress=q(0,1,t[r].interpolate(t[r].current))}function Se(e,t=e,s){if(s.x.targetOffset=0,s.y.targetOffset=0,t!==e){let n=t;for(;n&&n!==e;)s.x.targetOffset+=n.offsetLeft,s.y.targetOffset+=n.offsetTop,n=n.offsetParent}s.x.targetLength=t===e?t.scrollWidth:t.clientWidth,s.y.targetLength=t===e?t.scrollHeight:t.clientHeight,s.x.containerLength=e.clientWidth,s.y.containerLength=e.clientHeight}function Le(e,t,s,n={}){return{measure:()=>Se(e,n.target,s),update:i=>{he(e,s,i),(n.offset||n.target)&&Ee(e,s,n)},notify:()=>t(s)}}const y=new WeakMap,C=new WeakMap,z=new WeakMap,M=e=>e===document.documentElement?window:e;function I(e,{container:t=document.documentElement,...s}={}){let n=z.get(t);n||(n=new Set,z.set(t,n));const i=de(),r=Le(t,e,i,s);if(n.add(r),!y.has(t)){const c=()=>{for(const u of n)u.measure()},a=()=>{for(const u of n)u.update(U.timestamp)},f=()=>{for(const u of n)u.notify()},d=()=>{p.read(c,!1,!0),p.read(a,!1,!0),p.update(f,!1,!0)};y.set(t,d);const L=M(t);window.addEventListener("resize",d,{passive:!0}),t!==document.documentElement&&C.set(t,ue(t,d)),L.addEventListener("scroll",d,{passive:!0})}const o=y.get(t);return p.read(o,!1,!0),()=>{var c;k(o);const a=z.get(t);if(!a||(a.delete(r),a.size))return;const f=y.get(t);y.delete(t),f&&(M(t).removeEventListener("scroll",f),(c=C.get(t))===null||c===void 0||c(),window.removeEventListener("resize",f))}}function be({source:e,container:t,axis:s="y"}){e&&(t=e);const n={value:0},i=I(r=>{n.value=r[s].progress*100},{container:t,axis:s});return{currentTime:n,cancel:i}}const j=new Map;function F({source:e,container:t=document.documentElement,axis:s="y"}={}){e&&(t=e),j.has(t)||j.set(t,{});const n=j.get(t);return n[s]||(n[s]=Z()?new ScrollTimeline({source:t,axis:s}):be({source:t,axis:s})),n[s]}function ze(e){return e.length===2}function _(e){return e&&(e.target||e.offset)}function je(e,t){return ze(e)||_(t)?I(s=>{e(s[t.axis].progress,s)},t):J(e,F(t))}function We(e,t){if(e.flatten(),_(t))return e.pause(),I(s=>{e.time=e.duration*s[t.axis].progress},t);{const s=F(t);return e.attachTimeline?e.attachTimeline(s,n=>(n.pause(),J(i=>{n.time=n.duration*i},s))):K}}function ke(e,{axis:t="y",...s}={}){const n={axis:t,...s};return typeof e=="function"?je(e,n):We(e,n)}function V(e,t){ee(!!(!t||t.current))}const Be=()=>({scrollX:v(0),scrollY:v(0),scrollXProgress:v(0),scrollYProgress:v(0)});function Ie({container:e,target:t,layoutEffect:s=!0,...n}={}){const i=B(Be);return(s?D:h.useEffect)(()=>(V("target",t),V("container",e),ke((o,{x:c,y:a})=>{i.scrollX.set(c.current),i.scrollXProgress.set(c.progress),i.scrollY.set(a.current),i.scrollYProgress.set(a.progress)},{...n,container:(e==null?void 0:e.current)||void 0,target:(t==null?void 0:t.current)||void 0})),[e,t,JSON.stringify(n.offset)]),i}function Te(e){const t=B(()=>v(e)),{isStatic:s}=h.useContext(te);if(s){const[,n]=h.useState(e);h.useEffect(()=>t.on("change",n),[])}return t}function Q(e,t){const s=Te(t()),n=()=>s.set(t());return n(),D(()=>{const i=()=>p.preRender(n,!1,!0),r=e.map(o=>o.on("change",i));return()=>{r.forEach(o=>o()),k(n)}}),s}const He=e=>e&&typeof e=="object"&&e.mix,Ae=e=>He(e)?e.mix:void 0;function Oe(...e){const t=!Array.isArray(e[0]),s=t?0:-1,n=e[0+s],i=e[1+s],r=e[2+s],o=e[3+s],c=N(i,r,{mixer:Ae(r[0]),...o});return t?c(n):c}function Ce(e){b.current=[],e();const t=Q(b.current,e);return b.current=void 0,t}function Me(e,t,s,n){if(typeof e=="function")return Ce(e);const i=typeof t=="function"?t:Oe(t,s,n);return Array.isArray(e)?P(e,i):P([e],([r])=>i(r))}function P(e,t){const s=B(()=>[]);return Q(e,()=>{s.length=0;const n=e.length;for(let i=0;i<n;i++)s[i]=e[i].get();return t(s)})}const R=[{id:1,img:"/p1.jpg",title:"Restaurent Mangement System",desc:"My Restaurant Management System is built using Java, JDBC, and SQL, allowing seamless order management, billing, and inventory tracking. It provides an efficient interface for restaurant staff to handle customer orders and generate real-time reports.",link:"https://github.com/asheesh109/Restaurant-Management-System"},{id:2,img:"/p2.jpg",title:"Bon Apetite",desc:"Bon Apétite is a recipe finder website built with HTML, CSS, and JavaScript, allowing users to search for recipes based on ingredients and cuisine. It provides an interactive and user-friendly interface to explore delicious recipes effortlessly.",link:"https://github.com/asheesh109/Bon_Apetite"},{id:3,img:"/p3.jpg",title:"Virtual Bank System",desc:"Virtual Bank System is a Java-based banking application utilizing JDBC and SQL for secure transactions, account management, and balance tracking. It provides a user-friendly interface for seamless banking operations.",link:"https://github.com/asheesh109/Virtual-Bank-System"},{id:4,img:"/p4.jpg",title:"Quiz Web App",desc:"My Quiz Website is an interactive platform built using Java Swing, AWT, and JavaFX, offering a dynamic and engaging quiz experience. It features a user-friendly interface with real-time score tracking and a variety of question formats.",link:"https://github.com/asheesh109/OIBSIP_Quiz_App"},{id:5,img:"/p6.jpg",title:"Scotify",desc:"Scotify is a music player built using Java that offers a seamless audio experience with a user-friendly interface. It supports playlist management, playback controls, and a smooth UI for an immersive listening experience.",link:"https://github.com/asheesh109/scotify"}],Ve={initial:{x:-500,y:500,opacity:0},animate:{x:0,y:0,opacity:1,transition:{duration:.5,ease:"easeInOut"}}},w={initial:{x:500,y:500,opacity:0},animate:{x:0,y:0,opacity:1,transition:{duration:.5,ease:"easeInOut",staggerChildren:.05}}},Pe=({item:e})=>{const t=h.useRef(),s=ne(t,{margin:"-100px"});return l.jsxs("div",{className:"pItem",ref:t,children:[l.jsx(m.div,{variants:Ve,animate:s?"animate":"initial",className:"pImg",children:l.jsx("img",{src:e.img,alt:""})}),l.jsxs(m.div,{variants:w,animate:s?"animate":"initial",className:"pText",children:[l.jsx(m.h1,{variants:w,children:e.title}),l.jsx(m.p,{variants:w,children:e.desc}),l.jsx(m.a,{variants:w,href:e.link,children:l.jsx("button",{children:"View Project"})})]})]})},Je=()=>{const[e,t]=h.useState(0),s=h.useRef(null);h.useEffect(()=>{const r=()=>{if(s.current){const o=s.current.getBoundingClientRect();t(o.left)}};return r(),window.addEventListener("resize",r),()=>{window.removeEventListener("resize",r)}},[]);const{scrollYProgress:n}=Ie({target:s}),i=Me(n,[0,1],[0,-window.innerWidth*R.length]);return l.jsxs("div",{className:"portfolio",ref:s,children:[l.jsxs(m.div,{className:"pList",style:{x:i},children:[l.jsx("div",{className:"empty",style:{width:window.innerWidth-e}}),R.map(r=>l.jsx(Pe,{item:r},r.id))]}),l.jsx("section",{}),l.jsx("section",{}),l.jsx("section",{}),l.jsx("section",{}),l.jsx("section",{}),l.jsx("div",{className:"pProgress",children:l.jsxs("svg",{width:"100%",height:"100%",viewBox:"0 0 160 160",children:[l.jsx("circle",{cx:"80",cy:"80",r:"70",fill:"none",stroke:"#ddd",strokeWidth:20}),l.jsx(m.circle,{cx:"80",cy:"80",r:"70",fill:"none",stroke:"#dd4c62",strokeWidth:20,style:{pathLength:n},transform:"rotate(-90 80 80)"})]})})]})};export{Je as default};
