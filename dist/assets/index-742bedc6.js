var K=Object.defineProperty;var $=(i,e,t)=>e in i?K(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var a=(i,e,t)=>($(i,typeof e!="symbol"?e+"":e,t),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function t(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(n){if(n.ep)return;n.ep=!0;const o=t(n);fetch(n.href,o)}})();const k=16;var L=(i=>(i[i.x=64]="x",i[i.y=64]="y",i))(L||{}),C=(i=>(i[i.w=14]="w",i[i.h=16]="h",i))(C||{}),y=(i=>(i[i.w=16]="w",i[i.h=16]="h",i))(y||{});const J=1500,V=1,N=0;var g=(i=>(i.SPACE="Space",i.ARROW_RIGHT="ArrowRight",i.ARROW_LEFT="ArrowLeft",i.SPEED_X="KeyX",i))(g||{});const B=256,G=256;var A=(i=>(i[i.width=64]="width",i[i.height=64]="height",i))(A||{});const F=.001,U=2e-4,f={TOP:Symbol("top"),BOTTOM:Symbol("bottom"),RIGHT:Symbol("right"),LEFT:Symbol("left")};class Q{constructor(){a(this,"keyStates");a(this,"keyMap");this.keyStates=new Map,this.keyMap=new Map}addMapping(e,t){this.keyMap.set(e,t)}handleEvent(e){const{code:t}=e;if(!this.keyMap.has(t))return;e.preventDefault();const s=e.type==="keydown"?V:N;this.keyStates.get(t)!==s&&(this.keyStates.set(t,s),this.keyMap.get(t)(s))}listenTo(e){["keydown","keyup"].forEach(s=>{e.addEventListener(s,n=>{this.handleEvent(n)})})}}const P=function(i,e){e?i.jump.start():i.jump.cancel()},R=function(i,e){i.turbo&&i.turbo(e)},q=function(i,e){i.go.dir+=e?1:-1},D=function(i,e){i.go.dir+=e?-1:1},_=function(i,e){return function(s){const n=Math.floor(s/e)%i.length;return i[n]}},Z=function(i){const e=new Q;return e.addMapping(g.SPACE,t=>{P(i,t)}),e.addMapping(g.SPEED_X,t=>{R(i,t)}),e.addMapping(g.ARROW_RIGHT,t=>{q(i,t)}),e.addMapping(g.ARROW_LEFT,t=>{D(i,t)}),e};class I{constructor(e=1/60){a(this,"update");a(this,"updateProxy");let t=0,s=0;this.updateProxy=n=>{for(t+=(n-s)/1e3,t>1&&(t=1);t>e;)this.update(e),t-=e;s=n,this.enqueue()}}enqueue(){requestAnimationFrame(this.updateProxy)}start(){this.enqueue()}}class j{constructor(){a(this,"grid");this.grid=[]}forEach(e){this.grid.forEach((t,s)=>{t.forEach((n,o)=>{e(n,s,o)})})}get(e,t){const s=this.grid[e];if(s)return s[t]}set(e,t,s){this.grid[e]||(this.grid[e]=[]),this.grid[e][t]=s}}class m{constructor(e,t){a(this,"x");a(this,"y");this.set(e,t)}set(e,t){this.x=e,this.y=t}}class Y{constructor(){a(this,"pos");a(this,"size");this.pos=new m(0,0),this.size=new m(B,G)}}class ee{constructor(){a(this,"layers");this.layers=[]}draw(e,t){this.layers.forEach(s=>{s(e,t)})}}class te{constructor(e){a(this,"entities");this.entities=e}check(e){this.entities.forEach(t=>{e!==t&&e.bounds.overlaps(t.bounds)&&(e.collides(t),t.collides(e))})}}class H{constructor(e,t=k){a(this,"matrix");a(this,"tileSize");this.matrix=e,this.tileSize=t}toIndex(e){return Math.floor(e/this.tileSize)}toIndexRange(e,t){const s=Math.ceil(t/this.tileSize)*this.tileSize,n=[];let o=e;do n.push(this.toIndex(o)),o+=this.tileSize;while(o<s);return n}getByIndex(e,t){const s=this.matrix.get(e,t);if(s){const n=e*this.tileSize,o=n+this.tileSize,r=t*this.tileSize,c=r+this.tileSize;return{tile:s,x1:n,x2:o,y1:r,y2:c}}}searchByPosition(e,t){return this.getByIndex(this.toIndex(e),this.toIndex(t))}searchByRange(e,t,s,n){const o=[];return this.toIndexRange(e,t).forEach(r=>{this.toIndexRange(s,n).forEach(c=>{const d=this.getByIndex(r,c);d&&o.push(d)})}),o}}class ie{constructor(e){a(this,"tiles");this.tiles=new H(e)}checkX(e){let t;if(e.vel.x>0)t=e.bounds.right;else if(e.vel.x<0)t=e.bounds.left;else return;this.tiles.searchByRange(t,t,e.bounds.top,e.bounds.bottom).forEach(n=>{n.tile.type==="ground"&&(e.vel.x>0?e.bounds.right>n.x1&&(e.bounds.right=n.x1,e.vel.x=0,e.obstruct(f.RIGHT)):e.vel.x<0&&e.bounds.left<n.x2&&(e.bounds.left=n.x2,e.vel.x=0,e.obstruct(f.RIGHT)))})}checkY(e){let t;if(e.vel.y>0)t=e.bounds.bottom;else if(e.vel.y<0)t=e.bounds.top;else return;this.tiles.searchByRange(e.bounds.left,e.bounds.right,t,t).forEach(n=>{n.tile.type==="ground"&&(e.vel.y>0?e.bounds.bottom>n.y1&&(e.bounds.bottom=n.y1,e.vel.y=0,e.obstruct(f.BOTTOM)):e.vel.y<0&&e.bounds.top<n.y2&&(e.bounds.top=n.y2,e.vel.y=0,e.obstruct(f.TOP)))})}}class se{constructor(){a(this,"gravity");a(this,"comp");a(this,"entities");a(this,"tiles");a(this,"tileCollider");a(this,"entityCollider");a(this,"totalTime");this.gravity=J,this.totalTime=0,this.comp=new ee,this.entities=new Set,this.entityCollider=new te(this.entities),this.tileCollider=null}setCollisionGrid(e){this.tileCollider=new ie(e)}update(e){this.entities.forEach(t=>{this.tileCollider&&(t.update(e,this),t.pos.x+=t.vel.x*e,t.canCollide&&this.tileCollider.checkX(t),t.pos.y+=t.vel.y*e,t.canCollide&&this.tileCollider.checkY(t),t.vel.y+=this.gravity*e)}),this.entities.forEach(t=>{t.canCollide&&this.entityCollider.check(t)}),this.totalTime+=e}}const ne=function(i,e,t){const s=new H(e),n=document.createElement("canvas");n.width=B,n.height=G;const o=n.getContext("2d");function r(c,d){o.clearRect(0,0,n.width,n.height);for(let l=c;l<=d;++l){const h=e.grid[l];h&&h.forEach((u,v)=>{const E=u;t.animations.has(E.name)?t.drawAnim(E.name,o,l-c,v,i.totalTime):t.drawTile(E.name,o,l-c,v)})}}return function(d,l){const h=s.toIndex(l.size.x),u=s.toIndex(l.pos.x),v=u+h;r(u,v),d.drawImage(n,-l.pos.x%k,-l.pos.y)}},oe=function(i,e=A.width,t=A.width){const s=document.createElement("canvas");s.width=e,s.height=t;const n=s.getContext("2d");return function(r,c){i.forEach(d=>{n.clearRect(0,0,e,t),d.draw(n),r.drawImage(s,d.pos.x-c.pos.x,d.pos.y-c.pos.y)})}};class re{constructor(e,t,s){a(this,"image");a(this,"width");a(this,"height");a(this,"tiles");a(this,"animations");this.image=e,this.width=t,this.height=s,this.tiles=new Map,this.animations=new Map}defineAnim(e,t){this.animations.set(e,t)}define(e,t,s,n,o){const r=[!1,!0].map(c=>{const d=document.createElement("canvas");d.width=n,d.height=o;const l=d.getContext("2d");return c&&(l.scale(-1,1),l.translate(-n,0)),l.drawImage(this.image,t,s,n,o,0,0,n,o),d});this.tiles.set(e,r)}defineTile(e,t,s){this.define(e,t*this.width,s*this.height,this.width,this.height)}draw(e,t,s,n,o=!1){const r=this.tiles.get(e);r&&t.drawImage(r[Number(o)],s,n)}drawAnim(e,t,s,n,o){const r=this.animations.get(e);this.drawTile(r(o),t,s,n)}drawTile(e,t,s,n){this.draw(e,t,s*this.width,n*this.height)}}class ae{constructor(e,t,s){a(this,"pos");a(this,"size");a(this,"offset");this.pos=e,this.size=t,this.offset=s}overlaps(e){return this.bottom>e.top&&this.top<e.bottom&&this.left<e.right&&this.right>e.left}get bottom(){return this.pos.y+this.size.y+this.offset.y}set bottom(e){this.pos.y=e-(this.size.y+this.offset.y)}get top(){return this.pos.y+this.offset.y}set top(e){this.pos.y=e-this.offset.y}get left(){return this.pos.x+this.offset.x}set left(e){this.pos.x=e-this.offset.x}get right(){return this.pos.x+this.size.x+this.offset.x}set right(e){this.pos.x=e-(this.size.x+this.offset.x)}}class p{constructor(e){a(this,"NAME");this.NAME=e}collides(e,t){}obstruct(e,t){}update(e,t,s=void 0){}}class T{constructor(){a(this,"pos");a(this,"vel");a(this,"size");a(this,"offset");a(this,"bounds");a(this,"traits");a(this,"lifetime");a(this,"canCollide");a(this,"turbo");this.canCollide=!0,this.pos=new m(0,0),this.vel=new m(0,0),this.size=new m(0,0),this.offset=new m(0,0),this.bounds=new ae(this.pos,this.size,this.offset),this.lifetime=0,this.traits=[]}addTrait(e){this.traits.push(e),this[e.NAME]=e}collides(e){this.traits.forEach(t=>{t.collides(this,e)})}obstruct(e){this.traits.forEach(t=>{t.obstruct(this,e)})}update(e,t){this.traits.forEach(s=>{s.update(this,e,t)}),this.lifetime+=e}draw(e){}}class z extends p{constructor(){super("killable");a(this,"dead");a(this,"deadTime");a(this,"removeAfter");this.dead=!1,this.deadTime=0,this.removeAfter=2}kill(){this.dead=!0}revive(){this.dead=!1,this.deadTime=0}update(t,s,n){this.dead&&(this.deadTime+=s,!(this.deadTime<=this.removeAfter)&&n.entities.delete(t))}}class W extends p{constructor(){super("pendulumMove");a(this,"speed");a(this,"enabled");this.enabled=!0,this.speed=-30}obstruct(t,s){(s===f.LEFT||s===f.RIGHT)&&(this.speed=-this.speed)}update(t,s){this.enabled&&(t.vel.x=this.speed)}}const ce=async function(){return S("goomba").then(de)};let le=class extends p{constructor(){super("behavior")}collides(e,t){if(!e.killable.dead&&t.stomper){if(t.vel.y<=e.vel.y){t.killable.kill();return}e.killable.kill(),e.pendulumMove.speed=0}}};const de=function(i){const e=i.animations.get("walk"),t=function(n){return n.killable.dead?"flat":e(n.lifetime)},s=function(n){i.draw(t(this),n,0,0)};return function(){const o=new T;return o.size.set(y.w,y.h),o.addTrait(new W),o.addTrait(new le),o.addTrait(new z),o.draw=s,o}},he=async function(){return S("koopa").then(fe)},x=Symbol("walking"),w=Symbol("hiding"),b=Symbol("panic");class ue extends p{constructor(){super("behavior");a(this,"state");a(this,"hideTime");a(this,"hideDuration");a(this,"panicSpeed");a(this,"walkSpeed");this.hideTime=0,this.hideDuration=5,this.panicSpeed=300,this.walkSpeed=null,this.state=x}collides(t,s){if(!t.killable.dead&&s.stomper){if(s.vel.y<=t.vel.y){this.handleNudge(t,s);return}this.handleStomp(t,s)}}handleNudge(t,s){if(this.state===x)s.killable.kill();else if(this.state===w)this.panic(t,s);else if(this.state===b){const n=Math.sign(t.vel.x),o=Math.sign(t.pos.x-s.pos.x);n!==0&&n!==o&&s.killable.kill()}}handleStomp(t,s){this.state===x?this.hide(t):this.state===w?(t.killable.kill(),t.vel.set(100,-200),t.canCollide=!1):this.state===b&&this.hide(t)}hide(t){t.vel.x=0,t.pendulumMove.enabled=!1,this.walkSpeed===null&&(this.walkSpeed=t.pendulumMove.speed),this.hideTime=0,this.state=w}unhide(t){t.pendulumMove.enabled=!0,this.walkSpeed&&(t.pendulumMove.speed=this.walkSpeed),this.state=x}panic(t,s){t.pendulumMove.enabled=!0,t.pendulumMove.speed=this.panicSpeed*Math.sign(s.vel.x),this.state=b}update(t,s){this.state===w&&(this.hideTime+=s,!(this.hideTime<=this.hideDuration)&&this.unhide(t))}}const fe=function(i){const e=i.animations.get("walk"),t=i.animations.get("wake"),s=function(o){const r=o.behavior;return r.state===w?r.hideTime>3?t(r.hideTime):"hiding":r.state===b?"hiding":e(o.lifetime)},n=function(o){i.draw(s(this),o,0,0,this.vel.x<0)};return function(){const r=new T;return r.size.set(y.w,y.h),r.offset.y=8,r.addTrait(new W),r.addTrait(new ue),r.addTrait(new z),r.draw=n,r}};class pe extends p{constructor(){super("go");a(this,"dir");a(this,"acceleration");a(this,"deceleration");a(this,"dragFactor");a(this,"distance");a(this,"heading");this.dir=0,this.acceleration=400,this.deceleration=300,this.dragFactor=F,this.distance=0,this.heading=1}update(t,s){const n=Math.abs(t.vel.x);if(this.dir!==0)t.vel.x+=this.acceleration*s*this.dir,t.jump?t.jump.falling===!1&&(this.heading=this.dir):this.heading=this.dir;else if(t.vel.x!==0){const r=Math.min(n,this.deceleration*s);t.vel.x+=t.vel.x>0?-r:r}else this.distance=0;const o=this.dragFactor*t.vel.x*n;t.vel.x-=o,this.distance+=n*s}}class me extends p{constructor(){super("jump");a(this,"duration");a(this,"velocity");a(this,"engageTime");a(this,"ready");a(this,"requestTime");a(this,"gracePeriod");a(this,"speedBoost");this.ready=0,this.duration=.3,this.engageTime=0,this.requestTime=0,this.gracePeriod=.1,this.speedBoost=.3,this.velocity=200}get falling(){return this.ready<0}start(){this.requestTime=this.gracePeriod}cancel(){this.engageTime=0,this.requestTime=0}obstruct(t,s){s===f.BOTTOM?this.ready=1:s===f.TOP&&this.cancel()}update(t,s){this.requestTime>0&&(this.ready>0&&(this.engageTime=this.duration,this.requestTime=0),this.requestTime-=s),this.engageTime>0&&(t.vel.y=-(this.velocity+Math.abs(t.vel.x)*this.speedBoost),this.engageTime-=s),this.ready--}}class ge extends p{constructor(){super("stomper");a(this,"bounceSpeed");this.bounceSpeed=400}bounce(t,s){t.bounds.bottom=s.bounds.top,t.vel.y=-this.bounceSpeed}collides(t,s){s.killable&&t.vel.y>s.vel.y&&this.bounce(t,s)}}const we=async function(){return S("mario").then(ye)},ye=function(i){const e=i.animations.get("run");function t(o){return o.jump.falling?"jump":o.go.distance>0?o.vel.x>0&&o.go.dir<0||o.vel.x<0&&o.go.dir>0?"break":e(o.go.distance):"idle"}function s(o){this.go.dragFactor=o?U:F}function n(o){i.draw(t(this),o,0,0,this.go.heading<0)}return function(){const r=new T;return r.size.set(C.w,C.h),r.addTrait(new pe),r.addTrait(new me),r.addTrait(new ge),r.addTrait(new z),r.killable.removeAfter=0,r.turbo=s,r.draw=n,r.turbo(!1),r}},ve=function(i){return new Promise(e=>{const t=new Image;t.addEventListener("load",()=>{e(t)}),t.src=i})},O=async function(i){return fetch(i).then(e=>e.json())},S=async function(i){var n,o,r;const e=await O(`/@sprites/${i}.json`),t=await ve(e.imageURL),s=new re(t,e.tileW||k,e.tileH||k);return(n=e.tiles)==null||n.forEach(c=>{s.defineTile(c.name,c.index[0],c.index[1])}),(o=e.frames)==null||o.forEach(c=>{s.define(c.name,...c.rect)}),(r=e.animations)==null||r.forEach(c=>{const d=_(c.frames,c.frameLen);s.defineAnim(c.name,d)}),s},xe=function(){const i={mario:function(){throw new Error("Function not implemented.")},goomba:function(){throw new Error("Function not implemented.")},koopa:function(){throw new Error("Function not implemented.")}},e=function(t){return s=>i[t]=s};return Promise.all([we().then(e("mario")),ce().then(e("goomba")),he().then(e("koopa"))]).then(()=>i)},M=function*(i,e,t,s){const n=i+e,o=t+s;for(let r=i;r<n;++r)for(let c=t;c<o;++c)yield{x:r,y:c}},be=function(i){if(i.length===4){const[e,t,s,n]=i;return M(e,t,s,n)}else if(i.length===3){const[e,t,s]=i;return M(e,t,s,1)}else{const[e,t]=i;return M(e,1,t,1)}},ke=function*(i){for(const e of i)yield*be(e)},X=function*(i,e){function*t(s,n,o){for(const r of s)for(const{x:c,y:d}of ke(r.ranges)){const l=c+n,h=d+o;if(r.pattern){const u=e[r.pattern];yield*t(u.tiles,l,h);continue}yield{tile:r,x:l,y:h}}}yield*t(i,0,0)},Te=function(i,e){const t=new j;for(const{tile:s,x:n,y:o}of X(i,e))t.set(n,o,{type:s.type});return t},Se=function(i,e){const t=new j;for(const{tile:s,x:n,y:o}of X(i,e))t.set(n,o,{name:s.name});return t},Ee=function(i,e){const t=i.layers.reduce((n,o)=>n.concat(o.tiles),[]),s=Te(t,i.patterns);e.setCollisionGrid(s)},Me=function(i,e,t){i.layers.forEach(s=>{const n=Se(s.tiles,i.patterns),o=ne(e,n,t);e.comp.layers.push(o)})},Le=function(i,e,t){i.entities.forEach(({name:n,pos:[o,r]})=>{const c=t[n],d=c();d.pos.set(o,r),e.entities.add(d)});const s=oe(e.entities);e.comp.layers.push(s)},Ce=async function(i){return async function(t){const s=await O(`/@levels/${t}.json`),n=await S(s.spritesheet),o=new se;return Ee(s,o),Me(s,o,n),Le(s,o,i),o}},Ae=function(i){const e=document.querySelector("[data-action='left']"),t=document.querySelector("[data-action='right']"),s=document.querySelector("[data-action='jump']"),n=document.querySelector("[data-action='speed']"),o={left:{elem:e,fn:function(c){D(i,c)},handle:!1},right:{elem:t,fn:function(c){q(i,c)},handle:!1},jump:{elem:s,fn:function(c){P(i,c)},handle:!1},speed:{elem:n,fn:function(c){R(i,c)},handle:!1}};["pointerdown","pointerup","pointercancel","pointerout","pointerleave"].forEach(c=>{for(const d in o){const l=o[d];l.elem.addEventListener(c,function(){if(c==="pointerdown")return l.handle=!0,l.fn(!0);l.handle&&(l.fn(!1),l.handle=!1)})}})};class ze extends p{constructor(){super("playerController");a(this,"player");a(this,"checkpoint");this.checkpoint=new m(0,0),this.player=null}setPlayer(t){this.player=t}update(t,s,n){var o;this.player&&(n.entities.has(this.player)||((o=this.player.killable)==null||o.revive(),this.player.pos.set(this.checkpoint.x,this.checkpoint.y),n.entities.add(this.player)))}}const Be=function(i){const e=new T,t=new ze;return t.checkpoint.set(L.x,L.y),t.setPlayer(i),e.addTrait(t),e},Ge=async function(i){const e=i.getContext("2d"),t=await xe(),n=await(await Ce(t))("1-1"),o=new Y,r=t.mario(),c=Be(r);n.entities.add(c),Z(r).listenTo(window),Ae(r);const l=new I;l.update=function(u){n.update(u),o.pos.x=Math.max(0,r.pos.x-100),n.comp.draw(e,o)},l.start()},Fe=document.getElementById("screen");Ge(Fe);