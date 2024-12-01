import{c as M,V as F}from"./color-DXxEIfDR.js";import{a3 as m,v as $,o as S,c as v,a as C,r as E,aa as b,a5 as V,ag as B}from"./index-BQQrPimB.js";import{_ as T}from"./_plugin-vue_export-helper-DlAUqK2U.js";const q={class:"canvas-holder"},A=m({__name:"V10",props:{grid:{},start:{},path:{},enclosed:{}},setup(P){const c=P,a={gradient:[],pathIndex:0,enclosedIndex:0,factor:7};let f,s;const i=()=>{a.gradient=M(F,Math.ceil(c.path.length/2)),f=document.getElementById("partOne"),s=f.getContext("2d"),f.width=c.grid[0].length*a.factor,f.height=c.grid.length*a.factor,s.fillStyle="#222222",s.fillRect(0,0,f.width,f.height),s.lineWidth=a.factor/4;for(let n=0;n<c.grid.length;n++)for(let o=0;o<c.grid[n].length;o++){let e=c.grid[n][o];n===c.start.y&&o===c.start.x&&(e="S"),s.strokeStyle="#34495e",s.fillStyle="#34495e",g(o,n,e)}window.requestAnimationFrame(()=>I())},I=()=>{const n=a.pathIndex,o=c.path[n],e=c.grid[o.y][o.x],t=c.path[c.path.length-n-1],l=c.grid[t.y][t.x];if((o.x===t.x&&o.y)===t.y||n===Math.floor(c.path.length/2))s.fillStyle="#e74c3c",s.strokeStyle="#e74c3c";else{const r=a.gradient[n];s.strokeStyle=r,s.fillStyle=r}if(g(o.x,o.y,e),g(t.x,t.y,l),n<c.path.length/2)a.pathIndex++,window.requestAnimationFrame(()=>I());else{const r=c.enclosed.concat().sort((x,h)=>Math.sign(x.x+x.y-(h.x+h.y)));window.requestAnimationFrame(()=>w(r))}},w=n=>{s.strokeStyle="#25CCF7",s.fillStyle="#25CCF7";const o=n[a.enclosedIndex];g(o.x,o.y,c.grid[o.y][o.x]),a.enclosedIndex<n.length-1&&(a.enclosedIndex++,window.requestAnimationFrame(()=>w(n)))},g=(n,o,e)=>{switch(e){case"F":s.beginPath(),s.arc((n+1)*a.factor,(o+1)*a.factor,a.factor/2,Math.PI,1.5*Math.PI),s.stroke();break;case"J":s.beginPath(),s.arc(n*a.factor,o*a.factor,a.factor/2,0,.5*Math.PI),s.stroke();break;case"7":s.beginPath(),s.arc(n*a.factor,(o+1)*a.factor,a.factor/2,1.5*Math.PI,0),s.stroke();break;case"L":s.beginPath(),s.arc((n+1)*a.factor,o*a.factor,a.factor/2,.5*Math.PI,Math.PI),s.stroke();break;case"|":s.beginPath(),s.moveTo(n*a.factor+a.factor/2,o*a.factor),s.lineTo(n*a.factor+a.factor/2,(o+1)*a.factor),s.stroke();break;case"-":s.beginPath(),s.moveTo(n*a.factor,o*a.factor+a.factor/2),s.lineTo((n+1)*a.factor,o*a.factor+a.factor/2),s.stroke();break;case".":s.beginPath(),s.arc(n*a.factor+a.factor/2,o*a.factor+a.factor/2,a.factor/4,0,2*Math.PI),s.fill();break;case"S":s.fillStyle="#e74c3c",s.fillRect(n*a.factor,o*a.factor,a.factor,a.factor);break}};return $(()=>i()),(n,o)=>(S(),v("div",q,o[0]||(o[0]=[C("canvas",{id:"partOne",class:"canvas",height:"1000",width:"1000"},null,-1)])))}}),O=T(A,[["__scopeId","data-v-131bf409"]]),R=m({__name:"D10",props:{input:{}},emits:["onFinished"],setup(P,{emit:c}){const a=P,f=c,s=E({finished:!1,grid:[[]],enclosed:[],path:[],start:{x:0,y:0}});let i;const I=[[-1,0],[1,0],[0,-1],[0,1]],w={L:(e,t)=>e.x===t.x&&e.y===t.y-1||e.y===t.y&&e.x===t.x+1,J:(e,t)=>e.x===t.x&&e.y===t.y-1||e.y===t.y&&e.x===t.x-1,7:(e,t)=>e.x===t.x&&e.y===t.y+1||e.y===t.y&&e.x===t.x-1,F:(e,t)=>e.x===t.x&&e.y===t.y+1||e.y===t.y&&e.x===t.x+1,"|":(e,t)=>e.x===t.x&&e.y===t.y-1||e.x===t.x&&e.y===t.y+1,"-":(e,t)=>e.y===t.y&&e.x===t.x-1||e.y===t.y&&e.x===t.x+1,S:(e,t)=>!0},g=e=>I.map(t=>({x:e.x+t[0],y:e.y+t[1]})).filter(t=>t.x>=0&&t.x<i[0].length&&t.y>=0&&t.y<i.length),n=e=>{const t=e[0],l=e[1],r=e[e.length-1];r.x===t.x&&t.x===l.x?i[t.y][t.x]="|":r.y===t.y&&t.y===l.y?i[t.y][t.x]="-":r.x===t.x+1&&l.y===t.y+1||l.x===t.x+1&&r.y===t.y+1?i[t.y][t.x]="F":r.x===t.x-1&&l.y===t.y+1||l.x===t.x-1&&r.y===t.y+1?i[t.y][t.x]="7":r.x===t.x+1&&l.y===t.y-1||l.x===t.x+1&&r.y===t.y-1?i[t.y][t.x]="L":(r.x===t.x-1&&l.y===t.y-1||l.x===t.x-1&&r.y===t.y-1)&&(i[t.y][t.x]="J")},o=e=>{const t=new Map;e.forEach((r,x)=>{t.set(`${r.x}|${r.y}`,x)});const l=[];for(let r=0;r<i.length;r++)for(let x=0;x<i[r].length;x++)if(!t.has(`${x}|${r}`)){let h=!1,u=x;for(;u>=0;){const d=t.get(`${u}|${r}`),p=i[r][u];d!==void 0&&(p==="|"||p==="F"||p==="7")&&(h=!h),u--}h&&l.push({x,y:r})}return l};if(a.input){i=a.input.map(d=>d.split(""));let e={x:0,y:0};a.input.forEach((d,p)=>{const k=d.indexOf("S");k!==-1&&(e={x:k,y:p})});const t=[],l=new Set;let r=e;for(;;){t.push(r),l.add(`${r.x},${r.y}`);const d=i[r.y][r.x],k=g(r).filter(y=>{const _=i[y.y][y.x];return l.has(`${y.x},${y.y}`)?!1:y.x===e.x&&y.y===e.y?!0:_==="."?!1:w[_](r,y)&&w[d](y,r)});if(k.length>0)r=k[0];else break}n(t);const x=Math.floor(t.length/2),h=o(t),u=h.length;f("onFinished",x,u),s.value={finished:!0,grid:i,enclosed:h,path:t,start:e}}return(e,t)=>(S(),v("div",null,[b(s).finished?(S(),V(O,{key:0,enclosed:b(s).enclosed,grid:b(s).grid,path:b(s).path,start:b(s).start},null,8,["enclosed","grid","path","start"])):B("",!0)]))}});export{R as default};