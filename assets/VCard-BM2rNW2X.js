import{g as ue,h as D,p as I,q as R,f as h,m as ne,a as oe,G as pe,J as ce,K as de,b as fe,i as Ve,j as Te,R as we,c as Oe,l as ge,n as me,d as ye,H as ve,N as be,O as he,e as Ce,k as Se,V as ke,L as Pe,o as Ae}from"./VDivider-TvfL4kQr.js";import{aM as b,aN as C,p as V,b as d,d as T,g as f,k as y,aK as H,l as Ie,u as w,e as i,M as v,V as N,Q as Re,h as Ne,i as Le,R as Me,N as De,U as He,f as Be}from"./index-BCyeRGzw.js";const B=b.reduce((e,r)=>(e[r]={type:[Boolean,String,Number],default:!1},e),{}),E=b.reduce((e,r)=>{const t="offset"+C(r);return e[t]={type:[String,Number],default:null},e},{}),x=b.reduce((e,r)=>{const t="order"+C(r);return e[t]={type:[String,Number],default:null},e},{}),L={col:Object.keys(B),offset:Object.keys(E),order:Object.keys(x)};function Ee(e,r,t){let a=e;if(!(t==null||t===!1)){if(r){const s=r.replace(e,"");a+=`-${s}`}return e==="col"&&(a="v-"+a),e==="col"&&(t===""||t===!0)||(a+=`-${t}`),a.toLowerCase()}}const xe=["auto","start","end","center","baseline","stretch"],je=V({cols:{type:[Boolean,String,Number],default:!1},...B,offset:{type:[String,Number],default:null},...E,order:{type:[String,Number],default:null},...x,alignSelf:{type:String,default:null,validator:e=>xe.includes(e)},...d(),...T()},"VCol"),rt=f()({name:"VCol",props:je(),setup(e,r){let{slots:t}=r;const a=y(()=>{const s=[];let l;for(l in L)L[l].forEach(u=>{const o=e[u],p=Ee(l,u,o);p&&s.push(p)});const n=s.some(u=>u.startsWith("v-col-"));return s.push({"v-col":!n||!e.cols,[`v-col-${e.cols}`]:e.cols,[`offset-${e.offset}`]:e.offset,[`order-${e.order}`]:e.order,[`align-self-${e.alignSelf}`]:e.alignSelf}),s});return()=>{var s;return H(e.tag,{class:[a.value,e.class],style:e.style},(s=t.default)==null?void 0:s.call(t))}}}),S=["start","end","center"],j=["space-between","space-around","space-evenly"];function k(e,r){return b.reduce((t,a)=>{const s=e+C(a);return t[s]=r(),t},{})}const Ge=[...S,"baseline","stretch"],G=e=>Ge.includes(e),_=k("align",()=>({type:String,default:null,validator:G})),_e=[...S,...j],F=e=>_e.includes(e),$=k("justify",()=>({type:String,default:null,validator:F})),Fe=[...S,...j,"stretch"],W=e=>Fe.includes(e),z=k("alignContent",()=>({type:String,default:null,validator:W})),M={align:Object.keys(_),justify:Object.keys($),alignContent:Object.keys(z)},$e={align:"align",justify:"justify",alignContent:"align-content"};function We(e,r,t){let a=$e[e];if(t!=null){if(r){const s=r.replace(e,"");a+=`-${s}`}return a+=`-${t}`,a.toLowerCase()}}const ze=V({dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:G},..._,justify:{type:String,default:null,validator:F},...$,alignContent:{type:String,default:null,validator:W},...z,...d(),...T()},"VRow"),it=f()({name:"VRow",props:ze(),setup(e,r){let{slots:t}=r;const a=y(()=>{const s=[];let l;for(l in M)M[l].forEach(n=>{const u=e[n],o=We(l,n,u);o&&s.push(o)});return s.push({"v-row--no-gutters":e.noGutters,"v-row--dense":e.dense,[`align-${e.align}`]:e.align,[`justify-${e.justify}`]:e.justify,[`align-content-${e.alignContent}`]:e.alignContent}),s});return()=>{var s;return H(e.tag,{class:["v-row",a.value,e.class],style:e.style},(s=t.default)==null?void 0:s.call(t))}}}),m="This task will take a long time (possible several minutes) to complete.",st=new Map([[2024,[{title:"Historian Hysteria",partOne:!0,partTwo:!0,isVisual:!1},{title:"Red-Nosed Reports",partOne:!0,partTwo:!0,isVisual:!0},{title:"Mull It Over",partOne:!0,partTwo:!0,isVisual:!1},{title:"Ceres Search",partOne:!0,partTwo:!0,isVisual:!0},{title:"Print Queue",partOne:!0,partTwo:!0,isVisual:!1},{title:"Guard Gallivant",partOne:!0,partTwo:!0,isVisual:!0},{title:"Bridge Repair",partOne:!0,partTwo:!0,isVisual:!1},{title:"Resonant Collinearity",partOne:!0,partTwo:!0,isVisual:!0},{title:"Disk Fragmenter",partOne:!0,partTwo:!0,isVisual:!0},{title:"Hoof It",partOne:!0,partTwo:!0,isVisual:!0},{title:"Plutonian Pebbles",partOne:!0,partTwo:!0,isVisual:!1},{title:"Garden Groups",partOne:!0,partTwo:!0,isVisual:!0},{title:"Claw Contraption",partOne:!0,partTwo:!0,isVisual:!1},{title:"Restroom Redoubt",partOne:!0,partTwo:!0,isVisual:!0}]],[2023,[{title:"Trebuchet?!",partOne:!0,partTwo:!0,isVisual:!1},{title:"Cube Conundrum",partOne:!0,partTwo:!0,isVisual:!1},{title:"Gear Ratios",partOne:!0,partTwo:!0,isVisual:!0},{title:"Scratchcards ",partOne:!0,partTwo:!0,isVisual:!1},{title:"If You Give A Seed A Fertilizer",partOne:!0,partTwo:!0,isVisual:!0,warnings:[m]},{title:"Wait For It",partOne:!0,partTwo:!0,isVisual:!1},{title:"Camel Cards",partOne:!0,partTwo:!0,isVisual:!1},{title:"Haunted Wasteland",partOne:!0,partTwo:!0,isVisual:!1},{title:"Mirage Maintenance",partOne:!0,partTwo:!0,isVisual:!1},{title:"Pipe Maze",partOne:!0,partTwo:!0,isVisual:!0},{title:"Cosmic Expansion",partOne:!0,partTwo:!0,isVisual:!1},{title:"Hot Springs",partOne:!0,partTwo:!0,isVisual:!1},{title:"Point of Incidence",partOne:!0,partTwo:!0,isVisual:!1},{title:"Parabolic Reflector Dish",partOne:!0,partTwo:!0,isVisual:!1},{title:"Lens Library",partOne:!0,partTwo:!0,isVisual:!0},{title:"The Floor Will Be Lava",partOne:!0,partTwo:!0,isVisual:!0},{title:"Clumsy Crucible",partOne:!0,partTwo:!0,isVisual:!0},{title:"Lavaduct Lagoon",partOne:!0,partTwo:!0,isVisual:!0,warnings:[m]},{title:"Aplenty",partOne:!0,partTwo:!0,isVisual:!1},{title:"Pulse Propagation",partOne:!0,partTwo:!0,isVisual:!1},{title:"Step Counter",partOne:!0,partTwo:!1,isVisual:!0},{title:"Sand Slabs",partOne:!0,partTwo:!0,isVisual:!0,warnings:[m]},{title:"A Long Walk",partOne:!0,partTwo:!0,isVisual:!0,warnings:[m]}]],[2022,[{title:"Calorie Counting",partOne:!0,partTwo:!0,isVisual:!0},{title:"Rock Paper Scissors",partOne:!0,partTwo:!0,isVisual:!1},{title:"Rucksack Reorganization",partOne:!0,partTwo:!0,isVisual:!1},{title:"Camp Cleanup",partOne:!0,partTwo:!0,isVisual:!0},{title:"Supply Stacks",partOne:!0,partTwo:!0,isVisual:!0},{title:"Tuning Trouble",partOne:!0,partTwo:!0,isVisual:!1},{title:"No Space Left On Device",partOne:!0,partTwo:!0,isVisual:!0},{title:"Treetop Tree House",partOne:!0,partTwo:!0,isVisual:!0},{title:"Rope Bridge",partOne:!0,partTwo:!0,isVisual:!0},{title:"Cathode-Ray Tube",partOne:!0,partTwo:!0,isVisual:!1},{title:"Monkey in the Middle",partOne:!0,partTwo:!0,isVisual:!1},{title:"Hill Climbing Algorithm",partOne:!0,partTwo:!0,isVisual:!0},{title:"Distress Signal",partOne:!0,partTwo:!0,isVisual:!1}]],[2021,[{title:"Sonar Sweep",partOne:!0,partTwo:!0,isVisual:!1},{title:"Dive!",partOne:!0,partTwo:!0,isVisual:!0},{title:"Binary Diagnostic",partOne:!0,partTwo:!0,isVisual:!1},{title:"Giant Squid",partOne:!0,partTwo:!0,isVisual:!1},{title:"Hydrothermal Venture",partOne:!0,partTwo:!0,isVisual:!0},{title:"Lanternfish",partOne:!0,partTwo:!0,isVisual:!1},{title:"The Treachery of Whales",partOne:!0,partTwo:!0,isVisual:!1},{title:"Seven Segment Search",partOne:!0,partTwo:!0,isVisual:!1,tags:["substitution","deduction"]},{title:"Smoke Basin",partOne:!0,partTwo:!0,isVisual:!0,tags:["2d","segmentation"]},{title:"Syntax Scoring",partOne:!0,partTwo:!0,isVisual:!1,tags:["parsing"]},{title:"Dumbo Octopus",partOne:!0,partTwo:!0,isVisual:!0,tags:["2d","array-manipulation"]},{title:"Passage Pathing",partOne:!0,partTwo:!0,isVisual:!0,tags:["graph","path-finding"]},{title:"Transparent Origami",partOne:!0,partTwo:!0,isVisual:!0,tags:["2d","array-manipulation"]},{title:"Extended Polymerization",partOne:!0,partTwo:!0,isVisual:!1,tags:["substitution"]},{title:"Chiton",partOne:!0,partTwo:!0,isVisual:!0,tags:["2d","path-finding"]},{title:"Packet Decoder",partOne:!0,partTwo:!0,isVisual:!1,tags:["tree","parsing"]},{title:"Trick Shot",partOne:!0,partTwo:!0,isVisual:!0,tags:["2d"]},{title:"Snailfish",partOne:!0,partTwo:!0,isVisual:!1,tags:["string-manipulation","parsing"]},{title:"Beacon Scanner",partOne:!0,partTwo:!0,isVisual:!1,tags:["3d"]},{title:"Trench Map",partOne:!0,partTwo:!0,isVisual:!0,tags:["2d"]},{title:"Dirac Dice",partOne:!0,partTwo:!0,isVisual:!1,tags:["caching","optimization"]},{title:"Reactor Reboot",partOne:!0,partTwo:!0,isVisual:!1,tags:["3d","intersection"]},{title:"Amphipod",partOne:!0,partTwo:!0,isVisual:!1,tags:["path-finding"]},{title:"Arithmetic Logic Unit",partOne:!0,partTwo:!0,isVisual:!1,tags:[]},{title:"Sea Cucumber",partOne:!0,partTwo:!0,isVisual:!1,tags:["2d"]}]],[2020,[{title:"Report Repair",partOne:!0,partTwo:!0,isVisual:!1},{title:"Password Philosophy",partOne:!0,partTwo:!0,isVisual:!1},{title:"Toboggan Trajectory",partOne:!0,partTwo:!0,isVisual:!0},{title:"Passport Processing",partOne:!0,partTwo:!0,isVisual:!1},{title:"Binary Boarding",partOne:!0,partTwo:!0,isVisual:!1},{title:"Custom Customs",partOne:!0,partTwo:!0,isVisual:!1},{title:"Handy Haversacks",partOne:!0,partTwo:!0,isVisual:!1},{title:"Handheld Halting",partOne:!0,partTwo:!0,isVisual:!1},{title:"Encoding Error",partOne:!0,partTwo:!0,isVisual:!1},{title:"Adapter Array",partOne:!0,partTwo:!0,isVisual:!1},{title:"Seating System",partOne:!0,partTwo:!0,isVisual:!0},{title:"Rain Risk",partOne:!0,partTwo:!0,isVisual:!0},{title:"Shuttle Search",partOne:!0,partTwo:!0,isVisual:!1},{title:"Docking Data",partOne:!0,partTwo:!0,isVisual:!1},{title:"Rambunctious Recitation",partOne:!0,partTwo:!0,isVisual:!1},{title:"Ticket Translation",partOne:!0,partTwo:!0,isVisual:!1},{title:"Conway Cubes",partOne:!0,partTwo:!0,isVisual:!1},{title:"Operation Order",partOne:!0,partTwo:!0,isVisual:!1},{title:"Monster Messages",partOne:!0,partTwo:!0,isVisual:!1},{title:"Jurassic Jigsaw",partOne:!0,partTwo:!0,isVisual:!0},{title:"Allergen Assessment",partOne:!0,partTwo:!0,isVisual:!1},{title:"Crab Combat",partOne:!0,partTwo:!0,isVisual:!1},{title:"Crab Cups",partOne:!0,partTwo:!0,isVisual:!1},{title:"Lobby Layout",partOne:!0,partTwo:!0,isVisual:!1},{title:"Combo Breaker",partOne:!0,partTwo:!0,isVisual:!1}]],[2018,[{title:"Chronal Calibration",partOne:!0,partTwo:!0,isVisual:!1},{title:"Inventory Management System",partOne:!0,partTwo:!0,isVisual:!1},{title:"No Matter How You Slice It",partOne:!0,partTwo:!0,isVisual:!1},{title:"Repose Record",partOne:!0,partTwo:!0,isVisual:!1},{title:"Alchemical Reduction",partOne:!0,partTwo:!0,isVisual:!1},{title:"Chronal Coordinates",partOne:!0,partTwo:!0,isVisual:!1},{title:"The Sum of Its Parts",partOne:!0,partTwo:!0,isVisual:!1},{title:"Memory Maneuver",partOne:!0,partTwo:!0,isVisual:!1},{title:"Marble Mania",partOne:!0,partTwo:!0,isVisual:!1},{title:"The Stars Align",partOne:!0,partTwo:!0,isVisual:!0},{title:"Chronal Charge",partOne:!0,partTwo:!0,isVisual:!1},{title:"Subterranean Sustainability",partOne:!0,partTwo:!0,isVisual:!1},{title:"Mine Cart Madness",partOne:!0,partTwo:!0,isVisual:!1},{title:"Chocolate Charts",partOne:!0,partTwo:!0,isVisual:!1},{title:"Beverage Bandits",partOne:!0,partTwo:!0,isVisual:!1},{title:"Chronal Classification",partOne:!0,partTwo:!0,isVisual:!1},{title:"Reservoir Research",partOne:!0,partTwo:!0,isVisual:!0},{title:"Settlers of The North Pole",partOne:!0,partTwo:!0,isVisual:!0},{title:"A Regular Map",partOne:!0,partTwo:!0,isVisual:!1},{title:"Mode Maze",partOne:!0,partTwo:!0,isVisual:!1}]],[2017,[{title:"Inverse Captcha",partOne:!0,partTwo:!0,isVisual:!1},{title:"Corruption Checksum",partOne:!0,partTwo:!0,isVisual:!1},{title:"Spiral Memory",partOne:!0,partTwo:!0,isVisual:!1},{title:"High-Entropy Passphrases",partOne:!0,partTwo:!0,isVisual:!1},{title:"A Maze of Twisty Trampolines, All Alike",partOne:!0,partTwo:!0,isVisual:!1},{title:"Memory Reallocation",partOne:!0,partTwo:!0,isVisual:!1},{title:"Recursive Circus",partOne:!0,partTwo:!0,isVisual:!1},{title:"I Heard You Like Registers",partOne:!0,partTwo:!0,isVisual:!1},{title:"Stream Processing",partOne:!0,partTwo:!0,isVisual:!1},{title:"Knot Hash",partOne:!0,partTwo:!0,isVisual:!1},{title:"Hex Ed",partOne:!0,partTwo:!0,isVisual:!0},{title:"Digital Plumber",partOne:!0,partTwo:!0,isVisual:!1},{title:"Packet Scanners",partOne:!0,partTwo:!0,isVisual:!1},{title:"Disk Defragmentation",partOne:!1,partTwo:!1,isVisual:!1},{title:"Dueling Generators",partOne:!0,partTwo:!0,isVisual:!1},{title:"Permutation Promenade",partOne:!0,partTwo:!0,isVisual:!1},{title:"Spinlock",partOne:!0,partTwo:!0,isVisual:!1},{title:"Duet",partOne:!0,partTwo:!0,isVisual:!1},{title:"A Series of Tubes",partOne:!0,partTwo:!0,isVisual:!1},{title:"Particle Swarm",partOne:!0,partTwo:!0,isVisual:!1},{title:"Fractal Art",partOne:!1,partTwo:!1,isVisual:!1},{title:"Sporifica Virus",partOne:!0,partTwo:!0,isVisual:!0},{title:"Coprocessor Conflagration",partOne:!0,partTwo:!1,isVisual:!1},{title:"Electromagnetic Moat",partOne:!0,partTwo:!0,isVisual:!1},{title:"The Halting Problem",partOne:!0,partTwo:!1,isVisual:!1}]],[2016,[{title:"No Time for a Taxicab",partOne:!0,partTwo:!0,isVisual:!0},{title:"Bathroom Security",partOne:!0,partTwo:!0,isVisual:!0},{title:"Squares With Three Sides",partOne:!0,partTwo:!0,isVisual:!1},{title:"Security Through Obscurity",partOne:!0,partTwo:!0,isVisual:!1},{title:"How About a Nice Game of Chess?",partOne:!0,partTwo:!0,isVisual:!1}]],[2015,[{title:"Not Quite Lisp",partOne:!0,partTwo:!0,isVisual:!1},{title:"I Was Told There Would Be No Math",partOne:!0,partTwo:!0,isVisual:!1},{title:"Perfectly Spherical Houses in a Vacuum",partOne:!0,partTwo:!0,isVisual:!0},{title:"The Ideal Stocking Stuffer",partOne:!0,partTwo:!0,isVisual:!1},{title:"Doesn't He Have Intern- Elves For This ?",partOne:!0,partTwo:!0,isVisual:!1},{title:"Probably a Fire Hazard",partOne:!0,partTwo:!0,isVisual:!0},{title:"Some Assembly Required",partOne:!0,partTwo:!0,isVisual:!1},{title:"Matchsticks",partOne:!0,partTwo:!0,isVisual:!1},{title:"All in a Single Night",partOne:!0,partTwo:!0,isVisual:!1},{title:"Elves Look, Elves Say",partOne:!0,partTwo:!0,isVisual:!1},{title:"Corporate Policy",partOne:!0,partTwo:!0,isVisual:!1},{title:"JSAbacusFramework.io",partOne:!0,partTwo:!0,isVisual:!1},{title:"Knights of the Dinner Table",partOne:!0,partTwo:!0,isVisual:!1},{title:"Reindeer Olympics",partOne:!0,partTwo:!0,isVisual:!0},{title:"Science for Hungry People",partOne:!1,partTwo:!1,isVisual:!1},{title:"Aunt Sue",partOne:!0,partTwo:!0,isVisual:!1},{title:"No Such Thing as Too Much",partOne:!1,partTwo:!1,isVisual:!1},{title:"Like a GIF For Your Yard",partOne:!0,partTwo:!0,isVisual:!0}]]]),Ue=f()({name:"VCardActions",props:d(),setup(e,r){let{slots:t}=r;return Ie({VBtn:{slim:!0,variant:"text"}}),w(()=>{var a;return i("div",{class:["v-card-actions",e.class],style:e.style},[(a=t.default)==null?void 0:a.call(t)])}),{}}}),Ke=V({opacity:[Number,String],...d(),...T()},"VCardSubtitle"),Ye=f()({name:"VCardSubtitle",props:Ke(),setup(e,r){let{slots:t}=r;return w(()=>i(e.tag,{class:["v-card-subtitle",e.class],style:[{"--v-card-subtitle-opacity":e.opacity},e.style]},t)),{}}}),Je=ue("v-card-title"),qe=V({appendAvatar:String,appendIcon:v,prependAvatar:String,prependIcon:v,subtitle:[String,Number],title:[String,Number],...d(),...D()},"VCardItem"),Qe=f()({name:"VCardItem",props:qe(),setup(e,r){let{slots:t}=r;return w(()=>{var p;const a=!!(e.prependAvatar||e.prependIcon),s=!!(a||t.prepend),l=!!(e.appendAvatar||e.appendIcon),n=!!(l||t.append),u=!!(e.title!=null||t.title),o=!!(e.subtitle!=null||t.subtitle);return i("div",{class:["v-card-item",e.class],style:e.style},[s&&i("div",{key:"prepend",class:"v-card-item__prepend"},[t.prepend?i(h,{key:"prepend-defaults",disabled:!a,defaults:{VAvatar:{density:e.density,image:e.prependAvatar},VIcon:{density:e.density,icon:e.prependIcon}}},t.prepend):i(N,null,[e.prependAvatar&&i(I,{key:"prepend-avatar",density:e.density,image:e.prependAvatar},null),e.prependIcon&&i(R,{key:"prepend-icon",density:e.density,icon:e.prependIcon},null)])]),i("div",{class:"v-card-item__content"},[u&&i(Je,{key:"title"},{default:()=>{var c;return[((c=t.title)==null?void 0:c.call(t))??e.title]}}),o&&i(Ye,{key:"subtitle"},{default:()=>{var c;return[((c=t.subtitle)==null?void 0:c.call(t))??e.subtitle]}}),(p=t.default)==null?void 0:p.call(t)]),n&&i("div",{key:"append",class:"v-card-item__append"},[t.append?i(h,{key:"append-defaults",disabled:!l,defaults:{VAvatar:{density:e.density,image:e.appendAvatar},VIcon:{density:e.density,icon:e.appendIcon}}},t.append):i(N,null,[e.appendIcon&&i(R,{key:"append-icon",density:e.density,icon:e.appendIcon},null),e.appendAvatar&&i(I,{key:"append-avatar",density:e.density,image:e.appendAvatar},null)])])])}),{}}}),Xe=V({opacity:[Number,String],...d(),...T()},"VCardText"),Ze=f()({name:"VCardText",props:Xe(),setup(e,r){let{slots:t}=r;return w(()=>i(e.tag,{class:["v-card-text",e.class],style:[{"--v-card-text-opacity":e.opacity},e.style]},t)),{}}}),et=V({appendAvatar:String,appendIcon:v,disabled:Boolean,flat:Boolean,hover:Boolean,image:String,link:{type:Boolean,default:void 0},prependAvatar:String,prependIcon:v,ripple:{type:[Boolean,Object],default:!0},subtitle:[String,Number],text:[String,Number],title:[String,Number],...ne(),...d(),...D(),...Re(),...oe(),...pe(),...ce(),...de(),...fe(),...Ve(),...T(),...Ne(),...Te({variant:"elevated"})},"VCard"),lt=f()({name:"VCard",directives:{Ripple:we},props:et(),setup(e,r){let{attrs:t,slots:a}=r;const{themeClasses:s}=Le(e),{borderClasses:l}=Oe(e),{colorClasses:n,colorStyles:u,variantClasses:o}=ge(e),{densityClasses:p}=me(e),{dimensionStyles:c}=Me(e),{elevationClasses:U}=ye(e),{loaderClasses:K}=ve(e),{locationStyles:Y}=be(e),{positionClasses:J}=he(e),{roundedClasses:q}=Ce(e),O=Se(e,t),Q=y(()=>e.link!==!1&&O.isLink.value),g=y(()=>!e.disabled&&e.link!==!1&&(e.link||O.isClickable.value));return w(()=>{const X=Q.value?"a":e.tag,Z=!!(a.title||e.title!=null),ee=!!(a.subtitle||e.subtitle!=null),te=Z||ee,ae=!!(a.append||e.appendAvatar||e.appendIcon),re=!!(a.prepend||e.prependAvatar||e.prependIcon),ie=!!(a.image||e.image),se=te||re||ae,le=!!(a.text||e.text!=null);return De(i(X,Be({class:["v-card",{"v-card--disabled":e.disabled,"v-card--flat":e.flat,"v-card--hover":e.hover&&!(e.disabled||e.flat),"v-card--link":g.value},s.value,l.value,n.value,p.value,U.value,K.value,J.value,q.value,o.value,e.class],style:[u.value,c.value,Y.value,e.style],onClick:g.value&&O.navigate,tabindex:e.disabled?-1:void 0},O.linkProps),{default:()=>{var P;return[ie&&i("div",{key:"image",class:"v-card__image"},[a.image?i(h,{key:"image-defaults",disabled:!e.image,defaults:{VImg:{cover:!0,src:e.image}}},a.image):i(ke,{key:"image-img",cover:!0,src:e.image},null)]),i(Pe,{name:"v-card",active:!!e.loading,color:typeof e.loading=="boolean"?void 0:e.loading},{default:a.loader}),se&&i(Qe,{key:"item",prependAvatar:e.prependAvatar,prependIcon:e.prependIcon,title:e.title,subtitle:e.subtitle,appendAvatar:e.appendAvatar,appendIcon:e.appendIcon},{default:a.item,prepend:a.prepend,title:a.title,subtitle:a.subtitle,append:a.append}),le&&i(Ze,{key:"text"},{default:()=>{var A;return[((A=a.text)==null?void 0:A.call(a))??e.text]}}),(P=a.default)==null?void 0:P.call(a),a.actions&&i(Ue,null,{default:a.actions}),Ae(g.value,"v-card")]}}),[[He("ripple"),g.value&&e.ripple]])}),{}}});export{it as V,rt as a,lt as b,Je as c,Ue as d,Ze as e,st as s};
