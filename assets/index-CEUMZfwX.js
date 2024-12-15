import{m as w,o as a,c as f,a as l,p as F,Z as O,g as D,z as R,K as N,k as m,r as A,f as V,u as j,e as o,a4 as E,ag as H,a6 as c,a7 as n,ac as L,af as $,ab as k,ae as P,V as S,ah as T}from"./index-CkX7ih8A.js";import{_ as U}from"./chevron-double-left-Cg9cSTva.js";import{V as Y,s as q,a as G,b as K,e as W,d as Z}from"./VCard-CL9yqS_T.js";import{q as J,t as z,s as Q,v as X}from"./VDivider-DeOPuNp6.js";import{m as ee,u as te,a as I}from"./VOverlay-whfZV-WX.js";import{f as ae}from"./forwardRefs-DWGaNmQL.js";const ne={viewBox:"0 0 16 16",width:"1em",height:"1em"};function oe(e,t){return a(),f("svg",ne,t[0]||(t[0]=[l("path",{fill:"currentColor",d:"M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2a1 1 0 0 1 0-2"},null,-1)]))}const le=w({name:"bi-exclamation-triangle-fill",render:oe}),se={viewBox:"0 0 16 16",width:"1em",height:"1em"};function re(e,t){return a(),f("svg",se,t[0]||(t[0]=[l("g",{fill:"currentColor"},[l("path",{d:"M8.447.276a.5.5 0 0 0-.894 0L7.19 1H2.5A1.5 1.5 0 0 0 1 2.5V10h14V2.5A1.5 1.5 0 0 0 13.5 1H8.809z"}),l("path",{"fill-rule":"evenodd",d:"M.5 11a.5.5 0 0 0 0 1h2.86l-.845 3.379a.5.5 0 0 0 .97.242L3.89 14h8.22l.405 1.621a.5.5 0 0 0 .97-.242L12.64 12h2.86a.5.5 0 0 0 0-1zm3.64 2l.25-1h7.22l.25 1z"})],-1)]))}const ie=w({name:"bi-easel2-fill",render:re}),ce={viewBox:"0 0 16 16",width:"1em",height:"1em"};function ue(e,t){return a(),f("svg",ce,t[0]||(t[0]=[l("path",{fill:"currentColor",d:"M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256l4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73l3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356l-.83 4.73zm4.905-2.767l-3.686 1.894l.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575l-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957l-3.686-1.894a.5.5 0 0 0-.461 0z"},null,-1)]))}const de=w({name:"bi-star",render:ue}),me={viewBox:"0 0 16 16",width:"1em",height:"1em"};function fe(e,t){return a(),f("svg",me,t[0]||(t[0]=[l("path",{fill:"currentColor",d:"M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327l4.898.696c.441.062.612.636.282.95l-3.522 3.356l.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"},null,-1)]))}const _e=w({name:"bi-star-fill",render:fe}),pe=F({id:String,text:String,...O(ee({closeOnBack:!1,location:"end",locationStrategy:"connected",eager:!0,minWidth:0,offset:10,openOnClick:!1,openOnHover:!0,origin:"auto",scrim:!1,scrollStrategy:"reposition",transition:!1}),["absolute","persistent"])},"VTooltip"),M=D()({name:"VTooltip",props:pe(),emits:{"update:modelValue":e=>!0},setup(e,t){let{slots:s}=t;const _=R(e,"modelValue"),{scopeId:B}=te(),u=N(),v=m(()=>e.id||`v-tooltip-${u}`),p=A(),h=m(()=>e.location.split(" ").length>1?e.location:e.location+" center"),y=m(()=>e.origin==="auto"||e.origin==="overlap"||e.origin.split(" ").length>1||e.location.split(" ").length>1?e.origin:e.origin+" center"),b=m(()=>e.transition?e.transition:_.value?"scale-transition":"fade-transition"),r=m(()=>V({"aria-describedby":v.value},e.activatorProps));return j(()=>{const g=I.filterProps(e);return o(I,V({ref:p,class:["v-tooltip",e.class],style:e.style,id:v.value},g,{modelValue:_.value,"onUpdate:modelValue":i=>_.value=i,transition:b.value,absolute:!0,location:h.value,origin:y.value,persistent:!0,role:"tooltip",activatorProps:r.value,_disableGlobalStack:!0},B),{activator:s.activator,default:function(){var C;for(var i=arguments.length,x=new Array(i),d=0;d<i;d++)x[d]=arguments[d];return((C=s.default)==null?void 0:C.call(s,...x))??e.text}})}),ae({},p)}}),ge={class:"text-h4"},ve={class:"d-flex justify-space-between align-center"},ke=E({__name:"index",setup(e){const t=H(),s=A(t.params.year||""),_=m(()=>{if(s.value)return q.get(+s.value)});return(B,u)=>{const v=U,p=_e,h=de,y=ie,b=le;return a(),c(X,null,{default:n(()=>[o(z,{class:"mb-3",to:"/",variant:"tonal"},{default:n(()=>[o(J,null,{default:n(()=>[o(v)]),_:1}),u[0]||(u[0]=L(" Back"))]),_:1}),l("h1",ge,"Year "+$(k(s)),1),o(Q,{class:"my-4"}),o(Y,null,{default:n(()=>[(a(!0),f(S,null,P(k(_),(r,g)=>(a(),c(G,{key:`day-${g}`,cols:12,md:3,sm:6},{default:n(()=>[o(K,{class:"h-100 d-flex justify-space-between flex-column",subtitle:r.title,variant:"tonal"},{title:n(()=>[l("div",ve,[l("span",null,"Day "+$(g+1),1),l("span",null,[r.partOne?(a(),c(p,{key:0,class:"ms-1 text-star"})):(a(),c(h,{key:1,class:"ms-1 text-disabled"})),r.partTwo?(a(),c(p,{key:2,class:"ms-1 text-star"})):(a(),c(h,{key:3,class:"ms-1 text-disabled"}))])])]),default:n(()=>[o(W,null,{default:n(()=>[r.isVisual?(a(),c(M,{key:0,"open-on-click":"","open-on-focus":"",text:"This task has a visual representation of the result."},{activator:n(({props:i})=>[o(y,V({class:"me-2",ref_for:!0},i),null,16)]),_:1})):T("",!0),r.warnings?(a(!0),f(S,{key:1},P(r.warnings,(i,x)=>(a(),c(M,{key:`warning-${x}`,"open-on-click":"","open-on-focus":"",text:i},{activator:n(({props:d})=>[o(b,V({class:"me-2 text-warning",ref_for:!0},d),null,16)]),_:2},1032,["text"]))),128)):T("",!0)]),_:2},1024),o(Z,{class:"d-flex justify-space-between"},{default:n(()=>[o(z,{to:`${k(s)}/${g+1}`},{default:n(()=>u[1]||(u[1]=[L("View")])),_:2},1032,["to"])]),_:2},1024)]),_:2},1032,["subtitle"])]),_:2},1024))),128))]),_:1})]),_:1})}}});export{ke as default};