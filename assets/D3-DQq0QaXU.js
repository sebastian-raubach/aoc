import{a4 as y,r as d,a0 as g,o as b,c as S,a as _,ab as x}from"./index-7b6stP1L.js";const B={class:"canvas-holder mb-5"},R=["height","width"],C=y({__name:"D3",props:{input:{}},emits:["onFinished"],setup(m,{emit:p}){const f=m,v=p,h=d(),r=d();let s;const c=[],u=[];if(f.input){s=f.input.map(t=>t.split("")),s.forEach((t,e)=>{const n=t.join("");let i=null;for(let a=0;a<t.length;a++)if(t[a]==="."){i!==null&&(c.push({xStart:i,xEnd:a-1,y:e,value:+n.substring(i,a)}),i=null);continue}else t[a]===`${+t[a]}`?i===null&&(i=a):(i!==null&&(c.push({xStart:i,xEnd:a-1,y:e,value:+n.substring(i,a)}),i=null),u.push({x:a,y:e,touching:[],symbol:t[a]}));i!==null&&(c.push({xStart:i,xEnd:n.length-1,y:e,value:+n.substring(i,n.length)}),i=null)});const o=c.map(t=>{let e=!1;return u.forEach(n=>{Math.abs(n.y-t.y)<=1&&n.x>=t.xStart-1&&n.x<=t.xEnd+1&&(e||(e=!0),n.touching.push(t))}),e?t.value:0}).reduce((t,e)=>t+e,0),l=u.map(t=>t.symbol==="*"&&t.touching.length===2?t.touching[0].value*t.touching[1].value:0).reduce((t,e)=>t+e,0);g(()=>E()),v("onFinished",o,l)}const E=()=>{const o=document.getElementById("partOne");if(o){const l=o.getContext("2d");if(l){l.lineWidth=1;const t=10;h.value=s[0].length*t,r.value=s.length*t,g(()=>{l.fillStyle="#2c3e50",l.fillRect(0,0,h.value,r.value),c.forEach(e=>{l.fillStyle="#006266",l.fillRect(e.xStart*t,e.y*t,t*(e.xEnd-e.xStart+1),t)}),u.forEach(e=>{e.symbol==="*"&&e.touching.length===2?(l.fillStyle="#FFC312",l.fillRect(e.x*t,e.y*t,t,t),l.fillStyle="#A3CB38",e.touching.forEach(n=>{l.fillRect(n.xStart*t,n.y*t,t*(n.xEnd-n.xStart+1),t)})):(l.fillStyle="#EE5A24",l.fillRect(e.x*t,e.y*t,t,t))})})}}};return(o,l)=>(b(),S("div",B,[_("canvas",{id:"partOne",class:"canvas",height:x(r),width:x(h)},null,8,R)]))}});export{C as default};