var R=Object.defineProperty;var G=(r,e,t)=>e in r?R(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var n=(r,e,t)=>(G(r,typeof e!="symbol"?e+"":e,t),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function t(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(i){if(i.ep)return;i.ep=!0;const o=t(i);fetch(i.href,o)}})();const m=16;var v=(r=>(r[r.x=64]="x",r[r.y=64]="y",r))(v||{}),T=(r=>(r[r.w=14]="w",r[r.h=16]="h",r))(T||{});const q=1500,j=1,A=0;var p=(r=>(r.SPACE="Space",r.ARROW_RIGHT="ArrowRight",r.ARROW_LEFT="ArrowLeft",r.SPEED_X="KeyX",r))(p||{});const b=256,z=256;var E=(r=>(r[r.width=64]="width",r[r.height=64]="height",r))(E||{});const S=.001,W=2e-4,x={TOP:Symbol("top"),BOTTOM:Symbol("bottom")};class O{constructor(){n(this,"keyStates");n(this,"keyMap");this.keyStates=new Map,this.keyMap=new Map}addMapping(e,t){this.keyMap.set(e,t)}handleEvent(e){const{code:t}=e;if(!this.keyMap.has(t))return;e.preventDefault();const s=e.type==="keydown"?j:A;this.keyStates.get(t)!==s&&(this.keyStates.set(t,s),this.keyMap.get(t)(s))}listenTo(e){["keydown","keyup"].forEach(s=>{e.addEventListener(s,i=>{this.handleEvent(i)})})}}const M=function(r,e){return function(s){const i=Math.floor(s/e)%r.length;return r[i]}},D=function(r){const e=new O;return e.addMapping(p.SPACE,t=>{t?r.jump.start():r.jump.cancel()}),e.addMapping(p.SPEED_X,t=>{r.turbo(t)}),e.addMapping(p.ARROW_RIGHT,t=>{r.go.dir+=t?1:-1}),e.addMapping(p.ARROW_LEFT,t=>{r.go.dir+=t?-1:1}),e};class H{constructor(e=1/60){n(this,"update");n(this,"updateProxy");let t=0,s=0;this.updateProxy=i=>{for(t+=(i-s)/1e3,t>1&&(t=1);t>e;)this.update(e),t-=e;s=i,this.enqueue()}}enqueue(){requestAnimationFrame(this.updateProxy)}start(){this.enqueue()}}class L{constructor(){n(this,"grid");this.grid=[]}forEach(e){this.grid.forEach((t,s)=>{t.forEach((i,o)=>{e(i,s,o)})})}get(e,t){const s=this.grid[e];if(s)return s[t]}set(e,t,s){this.grid[e]||(this.grid[e]=[]),this.grid[e][t]=s}}class g{constructor(e,t){n(this,"x");n(this,"y");this.set(e,t)}set(e,t){this.x=e,this.y=t}}class X{constructor(){n(this,"pos");n(this,"size");this.pos=new g(0,0),this.size=new g(b,z)}}class J{constructor(){n(this,"layers");this.layers=[]}draw(e,t){this.layers.forEach(s=>{s(e,t)})}}class k{constructor(e,t=m){n(this,"matrix");n(this,"tileSize");this.matrix=e,this.tileSize=t}toIndex(e){return Math.floor(e/this.tileSize)}toIndexRange(e,t){const s=Math.ceil(t/this.tileSize)*this.tileSize,i=[];let o=e;do i.push(this.toIndex(o)),o+=this.tileSize;while(o<s);return i}getByIndex(e,t){const s=this.matrix.get(e,t);if(s){const i=e*this.tileSize,o=i+this.tileSize,a=t*this.tileSize,c=a+this.tileSize;return{tile:s,x1:i,x2:o,y1:a,y2:c}}}searchByPosition(e,t){return this.getByIndex(this.toIndex(e),this.toIndex(t))}searchByRange(e,t,s,i){const o=[];return this.toIndexRange(e,t).forEach(a=>{this.toIndexRange(s,i).forEach(c=>{const l=this.getByIndex(a,c);l&&o.push(l)})}),o}}class N{constructor(e){n(this,"tiles");this.tiles=new k(e)}checkX(e){let t;if(e.vel.x>0)t=e.pos.x+e.size.x;else if(e.vel.x<0)t=e.pos.x;else return;this.tiles.searchByRange(t,t,e.pos.y,e.pos.y+e.size.y).forEach(i=>{i.tile.type==="ground"&&(e.vel.x>0?e.pos.x+e.size.x>i.x1&&(e.pos.x=i.x1-e.size.x,e.vel.x=0):e.vel.x<0&&e.pos.x<i.x2&&(e.pos.x=i.x2,e.vel.x=0))})}checkY(e){let t;if(e.vel.y>0)t=e.pos.y+e.size.y;else if(e.vel.y<0)t=e.pos.y;else return;this.tiles.searchByRange(e.pos.x,e.pos.x+e.size.x,t,t).forEach(i=>{i.tile.type==="ground"&&(e.vel.y>0?e.pos.y+e.size.y>i.y1&&(e.pos.y=i.y1-e.size.y,e.vel.y=0,e.obstruct(x.BOTTOM)):e.vel.y<0&&e.pos.y<i.y2&&(e.pos.y=i.y2,e.vel.y=0,e.obstruct(x.TOP)))})}}class U{constructor(){n(this,"gravity");n(this,"comp");n(this,"entities");n(this,"tiles");n(this,"tileCollider");n(this,"totalTime");this.gravity=q,this.totalTime=0,this.comp=new J,this.entities=new Set,this.tileCollider=null}setCollisionGrid(e){this.tileCollider=new N(e)}update(e){this.entities.forEach(t=>{this.tileCollider&&(t.update(e),t.pos.x+=t.vel.x*e,this.tileCollider.checkX(t),t.pos.y+=t.vel.y*e,this.tileCollider.checkY(t),t.vel.y+=this.gravity*e)}),this.totalTime+=e}}const V=function(r,e,t){const s=new k(e),i=document.createElement("canvas");i.width=b,i.height=z;const o=i.getContext("2d");function a(c,l){o.clearRect(0,0,i.width,i.height);for(let h=c;h<=l;++h){const d=e.grid[h];d&&d.forEach((u,f)=>{const w=u;t.animation.has(w.name)?t.drawAnim(w.name,o,h-c,f,r.totalTime):t.drawTile(w.name,o,h-c,f)})}}return function(l,h){const d=s.toIndex(h.size.x),u=s.toIndex(h.pos.x),f=u+d;a(u,f),l.drawImage(i,-h.pos.x%m,-h.pos.y)}},$=function(r,e=E.width,t=E.width){const s=document.createElement("canvas");s.width=e,s.height=t;const i=s.getContext("2d");return function(a,c){r.forEach(l=>{i.clearRect(0,0,e,t),l.draw(i),a.drawImage(s,l.pos.x-c.pos.x,l.pos.y-c.pos.y)})}};class Q{constructor(e,t,s){n(this,"image");n(this,"width");n(this,"height");n(this,"tiles");n(this,"animation");this.image=e,this.width=t,this.height=s,this.tiles=new Map,this.animation=new Map}defineAnim(e,t){this.animation.set(e,t)}define(e,t,s,i,o){const a=[!1,!0].map(c=>{const l=document.createElement("canvas");l.width=i,l.height=o;const h=l.getContext("2d");return c&&(h.scale(-1,1),h.translate(-i,0)),h.drawImage(this.image,t,s,i,o,0,0,i,o),l});this.tiles.set(e,a)}defineTile(e,t,s){this.define(e,t*this.width,s*this.height,this.width,this.height)}draw(e,t,s,i,o=!1){const a=this.tiles.get(e);a&&t.drawImage(a[Number(o)],s,i)}drawAnim(e,t,s,i,o){const a=this.animation.get(e);this.drawTile(a(o),t,s,i)}drawTile(e,t,s,i){this.draw(e,t,s*this.width,i*this.height)}}const K=function(r){return new Promise(e=>{const t=new Image;t.addEventListener("load",()=>{e(t)}),t.src=r})},B=async function(r){return fetch(r).then(e=>e.json())},C=async function(r){var i,o,a;const e=await B(`/@sprites/${r}.json`),t=await K(e.imageURL),s=new Q(t,e.tileW||m,e.tileH||m);return(i=e.tiles)==null||i.forEach(c=>{s.defineTile(c.name,c.index[0],c.index[1])}),(o=e.frames)==null||o.forEach(c=>{s.define(c.name,...c.rect)}),(a=e.animations)==null||a.forEach(c=>{const l=M(c.frames,c.frameLen);s.defineAnim(c.name,l)}),s},y=function*(r,e,t,s){const i=r+e,o=t+s;for(let a=r;a<i;++a)for(let c=t;c<o;++c)yield{x:a,y:c}},Z=function(r){if(r.length===4){const[e,t,s,i]=r;return y(e,t,s,i)}else if(r.length===3){const[e,t,s]=r;return y(e,t,s,1)}else{const[e,t]=r;return y(e,1,t,1)}},I=function*(r){for(const e of r)for(const t of Z(e))yield t},P=function(r,e){const t=[];function s(i,o,a){for(const c of i)for(const{x:l,y:h}of I(c.ranges)){const d=l+o,u=h+a;if(c.pattern){const f=e[c.pattern];s(f.tiles,d,u);continue}t.push({tile:c,x:d,y:u})}}return s(r,0,0),t},Y=function(r,e){const t=new L;for(const{tile:s,x:i,y:o}of P(r,e))t.set(i,o,{type:s.type});return t},_=function(r,e){const t=new L;for(const{tile:s,x:i,y:o}of P(r,e))t.set(i,o,{name:s.name});return t},ee=async function(r){const e=await B(`/@levels/${r}.json`),t=await C(e.spritesheet),s=new U,i=e.layers.reduce((c,l)=>c.concat(l.tiles),[]),o=Y(i,e.patterns);s.setCollisionGrid(o),e.layers.forEach(c=>{const l=_(c.tiles,e.patterns),h=V(s,l,t);s.comp.layers.push(h)});const a=$(s.entities);return s.comp.layers.push(a),s};class F{constructor(e){n(this,"NAME");this.NAME=e}obstruct(e,t){}update(e,t){console.warn("Unhandled update call in Trait")}}class te{constructor(){n(this,"pos");n(this,"vel");n(this,"size");n(this,"traits");n(this,"draw");n(this,"turbo");this.pos=new g(0,0),this.vel=new g(0,0),this.size=new g(0,0),this.traits=[]}addTrait(e){this.traits.push(e),this[e.NAME]=e}obstruct(e){this.traits.forEach(t=>{t.obstruct(this,e)})}update(e){this.traits.forEach(t=>{t.update(this,e)})}}class se extends F{constructor(){super("go");n(this,"dir");n(this,"acceleration");n(this,"deceleration");n(this,"dragFactor");n(this,"distance");n(this,"heading");this.dir=0,this.acceleration=400,this.deceleration=300,this.dragFactor=S,this.distance=0,this.heading=1}update(t,s){const i=Math.abs(t.vel.x);if(this.dir!==0)t.vel.x+=this.acceleration*s*this.dir,t.jump?t.jump.falling===!1&&(this.heading=this.dir):this.heading=this.dir;else if(t.vel.x!==0){const a=Math.min(i,this.deceleration*s);t.vel.x+=t.vel.x>0?-a:a}else this.distance=0;const o=this.dragFactor*t.vel.x*i;t.vel.x-=o,this.distance+=i*s}}class ie extends F{constructor(){super("jump");n(this,"duration");n(this,"velocity");n(this,"engageTime");n(this,"ready");n(this,"requestTime");n(this,"gracePeriod");n(this,"speedBoost");this.ready=0,this.duration=.3,this.engageTime=0,this.requestTime=0,this.gracePeriod=.1,this.speedBoost=.3,this.velocity=200}get falling(){return this.ready<0}start(){this.requestTime=this.gracePeriod}cancel(){this.engageTime=0,this.requestTime=0}obstruct(t,s){s===x.BOTTOM?this.ready=1:s===x.TOP&&this.cancel()}update(t,s){this.requestTime>0&&(this.ready>0&&(this.engageTime=this.duration,this.requestTime=0),this.requestTime-=s),this.engageTime>0&&(t.vel.y=-(this.velocity+Math.abs(t.vel.x)*this.speedBoost),this.engageTime-=s),this.ready--}}const re=async function(){return C("mario").then(oe)},oe=function(r){const e=M(["run-1","run-2","run-3"],6);function t(o){return o.jump.falling?"jump":o.go.distance>0?o.vel.x>0&&o.go.dir<0||o.vel.x<0&&o.go.dir>0?"break":e(o.go.distance):"idle"}function s(o){this.go.dragFactor=o?W:S}function i(o){r.draw(t(this),o,0,0,this.go.heading<0)}return function(){const a=new te;return a.size.set(T.w,T.h),a.addTrait(new se),a.go.dragFactor=S,a.addTrait(new ie),a.turbo=s,a.draw=i,a}},ne=document.getElementById("screen"),ae=ne.getContext("2d");Promise.all([re(),ee("1-1")]).then(([r,e])=>{const t=new X,s=r();s.pos.set(v.x,v.y),e.entities.add(s),D(s).listenTo(window);const o=new H;o.update=function(c){e.update(c),s.pos.x>100&&(t.pos.x=s.pos.x-100),e.comp.draw(ae,t)},o.start()});