var lt=Object.defineProperty;var dt=(s,t,e)=>t in s?lt(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e;var a=(s,t,e)=>(dt(s,typeof t!="symbol"?t+"":t,e),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function e(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(n){if(n.ep)return;n.ep=!0;const o=e(n);fetch(n.href,o)}})();const L=16,m=8;var G=(s=>(s[s.x=64]="x",s[s.y=64]="y",s))(G||{}),q=(s=>(s[s.w=14]="w",s[s.h=16]="h",s))(q||{}),E=(s=>(s[s.w=16]="w",s[s.h=16]="h",s))(E||{}),j=(s=>(s[s.w=16]="w",s[s.h=14]="h",s))(j||{}),k=(s=>(s[s.x=100]="x",s[s.y=-200]="y",s))(k||{});const ut=1500,ht=1,ft=0;var x=(s=>(s.SPACE="Space",s.ARROW_RIGHT="ArrowRight",s.ARROW_LEFT="ArrowLeft",s.SPEED_X="KeyX",s))(x||{});const X=256,I=256;var _=(s=>(s[s.width=64]="width",s[s.height=64]="height",s))(_||{});const Q=.001,pt=2e-4,h={TOP:Symbol("top"),BOTTOM:Symbol("bottom"),RIGHT:Symbol("right"),LEFT:Symbol("left")},mt=100,yt=20,wt="./assets/img/font-coin.png",gt=" !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~",W=30,D=100;class bt{constructor(){a(this,"keyStates");a(this,"keyMap");this.keyStates=new Map,this.keyMap=new Map}addMapping(t,e){this.keyMap.set(t,e)}handleEvent(t){const{code:e}=t;if(!this.keyMap.has(e))return;t.preventDefault();const i=t.type==="keydown"?ht:ft;this.keyStates.get(e)!==i&&(this.keyStates.set(e,i),this.keyMap.get(e)(i))}listenTo(t){["keydown","keyup"].forEach(i=>{t.addEventListener(i,n=>{this.handleEvent(n)})})}}const J=function(s,t){t?s.jump.start():s.jump.cancel()},Y=function(s,t){s.turbo&&s.turbo(t)},U=function(s,t){s.go.dir+=t?1:-1},Z=function(s,t){s.go.dir+=t?-1:1},vt=function(s,t){return function(i){const n=Math.floor(i/t)%s.length;return s[n]}},xt=function(s){const t=new bt;return t.addMapping(x.SPACE,e=>{J(s,e)}),t.addMapping(x.SPEED_X,e=>{Y(s,e)}),t.addMapping(x.ARROW_RIGHT,e=>{U(s,e)}),t.addMapping(x.ARROW_LEFT,e=>{Z(s,e)}),t};class Tt{constructor(t=1/60){a(this,"update");a(this,"updateProxy");let e=0,i=0;this.updateProxy=n=>{for(e+=(n-i)/1e3,e>1&&(e=1);e>t;)this.update(t),e-=t;i=n,this.enqueue()}}enqueue(){requestAnimationFrame(this.updateProxy)}start(){this.enqueue()}}class Et{constructor(){a(this,"grid");this.grid=[]}forEach(t){this.grid.forEach((e,i)=>{e.forEach((n,o)=>{t(n,i,o)})})}delete(t,e){const i=this.grid[t];i&&delete i[e]}get(t,e){const i=this.grid[t];if(i)return i[e]}set(t,e,i){this.grid[t]||(this.grid[t]=[]),this.grid[t][e]=i}}class w{constructor(t,e){a(this,"x");a(this,"y");this.set(t,e)}copy(t){this.x=t.x,this.y=t.y}set(t,e){this.x=t,this.y=e}}class kt{constructor(){a(this,"pos");a(this,"size");this.pos=new w(0,0),this.size=new w(X,I)}}class St{constructor(){a(this,"layers");this.layers=[]}draw(t,e){this.layers.forEach(i=>{i(t,e)})}}class Mt{constructor(t){a(this,"entities");this.entities=t}check(t){this.entities.forEach(e=>{t!==e&&t.bounds.overlaps(e.bounds)&&t.collides(e)})}}class Ct{constructor(){a(this,"listeners");this.listeners=[]}listen(t,e){const i={name:t,callback:e};this.listeners.push(i)}emit(t,...e){this.listeners.forEach(i=>{i.name===t&&i.callback(...e)})}}class At{constructor(){a(this,"player");this.player=null}setPlayer(t){this.player=t}playTheme(t=1){var i;const e=(i=this.player)==null?void 0:i.playTrack("main");e.playbackRate=t}playHurryTheme(){var e;const t=(e=this.player)==null?void 0:e.playTrack("hurry");t.loop=!1,t.addEventListener("ended",()=>{this.playTheme(1.5)},{once:!0})}}class tt{constructor(t,e=L){a(this,"matrix");a(this,"tileSize");this.matrix=t,this.tileSize=e}toIndex(t){return Math.floor(t/this.tileSize)}toIndexRange(t,e){const i=Math.ceil(e/this.tileSize)*this.tileSize,n=[];let o=t;do n.push(this.toIndex(o)),o+=this.tileSize;while(o<i);return n}getByIndex(t,e){const i=this.matrix.get(t,e);if(!i)return;const n=t*this.tileSize,o=n+this.tileSize,r=e*this.tileSize,c=r+this.tileSize;return{tile:i,indexX:t,indexY:e,x1:n,x2:o,y1:r,y2:c}}searchByPosition(t,e){return this.getByIndex(this.toIndex(t),this.toIndex(e))}searchByRange(t,e,i,n){const o=[];return this.toIndexRange(t,e).forEach(r=>{this.toIndexRange(i,n).forEach(c=>{const l=this.getByIndex(r,c);l&&o.push(l)})}),o}}function Lt({entity:s,match:t}){s.vel.x>0?s.bounds.right>t.x1&&s.obstruct(h.RIGHT,t):s.vel.x<0&&s.bounds.left<t.x2&&s.obstruct(h.LEFT,t)}function Bt({entity:s,match:t}){s.vel.y>0?s.bounds.bottom>t.y1&&s.obstruct(h.BOTTOM,t):s.vel.y<0&&s.bounds.top<t.y2&&s.obstruct(h.TOP,t)}const Ft=[Lt,Bt];function zt({entity:s,match:t}){s.vel.x>0?s.bounds.right>t.x1&&s.obstruct(h.RIGHT,t):s.vel.x<0&&s.bounds.left<t.x2&&s.obstruct(h.LEFT,t)}function Rt({entity:s,match:t,resolver:e,gameContext:i,level:n}){if(s.vel.y>0)s.bounds.bottom>t.y1&&s.obstruct(h.BOTTOM,t);else if(s.vel.y<0){if(s.player){e.matrix.delete(t.indexX,t.indexY);const r=i.entityFactory.goomba();r.vel.set(50,-400),r.pos.set(s.pos.x,t.y1),n.entities.add(r)}s.bounds.top<t.y2&&s.obstruct(h.TOP,t)}}const Pt=[zt,Rt];function $({entity:s,match:t,resolver:e}){console.log("Coin Collected"),s.player&&(s.player.addCoins(1),e.matrix.delete(t.indexX,t.indexY))}const Ot=[$,$],Nt={ground:Ft,brick:Pt,coin:Ot};class Dt{constructor(){a(this,"resolvers");this.resolvers=[]}addGrid(t){this.resolvers.push(new tt(t))}checkX(t,e,i){let n;if(t.vel.x>0)n=t.bounds.right;else if(t.vel.x<0)n=t.bounds.left;else return;for(const o of this.resolvers)o.searchByRange(n,n,t.bounds.top,t.bounds.bottom).forEach(c=>{this._handle(0,t,c,o,e,i)})}checkY(t,e,i){let n;if(t.vel.y>0)n=t.bounds.bottom;else if(t.vel.y<0)n=t.bounds.top;else return;for(const o of this.resolvers)o.searchByRange(t.bounds.left,t.bounds.right,n,n).forEach(c=>{this._handle(1,t,c,o,e,i)})}_handle(t,e,i,n,o,r){if(!i.tile.type)return;const c={entity:e,match:i,resolver:n,gameContext:o,level:r},l=Nt[i.tile.type][t];l&&l(c)}}class Ht{constructor(){a(this,"gravity");a(this,"comp");a(this,"entities");a(this,"tiles");a(this,"tileCollider");a(this,"entityCollider");a(this,"totalTime");a(this,"music");a(this,"events");this.gravity=ut,this.totalTime=0,this.music=new At,this.comp=new St,this.entities=new Set,this.entityCollider=new Mt(this.entities),this.tileCollider=new Dt,this.events=new Ct}update(t){this.entities.forEach(e=>{this.tileCollider&&e.update(t,this)}),this.entities.forEach(e=>{this.entityCollider.check(e)}),this.entities.forEach(e=>{e.finalize()}),this.totalTime+=t.deltaTime}}class et{constructor(){a(this,"buffers");this.buffers=new Map}addAudio(t,e){this.buffers.set(t,e)}playAudio(t,e){const i=e.createBufferSource();i.connect(e.destination),i.buffer=this.buffers.get(t)||null,i.start(0)}}class Gt{constructor(t,e,i){a(this,"pos");a(this,"size");a(this,"offset");this.pos=t,this.size=e,this.offset=i}overlaps(t){return this.bottom>t.top&&this.top<t.bottom&&this.left<t.right&&this.right>t.left}get bottom(){return this.pos.y+this.size.y+this.offset.y}set bottom(t){this.pos.y=t-(this.size.y+this.offset.y)}get top(){return this.pos.y+this.offset.y}set top(t){this.pos.y=t-this.offset.y}get left(){return this.pos.x+this.offset.x}set left(t){this.pos.x=t-this.offset.x}get right(){return this.pos.x+this.size.x+this.offset.x}set right(t){this.pos.x=t-(this.size.x+this.offset.x)}}class qt{constructor(){a(this,"events");this.events=[]}emit(t,...e){const i={name:t,args:e};this.events.push(i)}process(t,e){this.events.forEach(i=>{i.name===t&&e(...i.args)})}clear(){this.events.length=0}}const z=class z{constructor(t){a(this,"NAME");a(this,"listeners");this.NAME=t,this.listeners=[]}listen(t,e,i=1/0){const n={name:t,callback:e,count:i};this.listeners.push(n)}finalize(t){this.listeners=this.listeners.filter(e=>(t.events.process(e.name,e.callback),--e.count))}queue(t){this.listen(z.EVENT_TASK,t,1)}collides(t,e){}obstruct(t,e,i=void 0){}update(t,e,i=void 0){}};a(z,"EVENT_TASK",Symbol("task"));let u=z;class g{constructor(){a(this,"pos");a(this,"vel");a(this,"size");a(this,"offset");a(this,"bounds");a(this,"traits");a(this,"lifetime");a(this,"canCollide");a(this,"audio");a(this,"sounds");a(this,"events");a(this,"turbo");this.canCollide=!0,this.pos=new w(0,0),this.vel=new w(0,0),this.size=new w(0,0),this.offset=new w(0,0),this.bounds=new Gt(this.pos,this.size,this.offset),this.lifetime=0,this.traits=[],this.audio=new et,this.sounds=new Set,this.events=new qt}addTrait(t){this.traits.push(t),this[t.NAME]=t}collides(t){this.traits.forEach(e=>{e.collides(this,t)})}obstruct(t,e=void 0){this.traits.forEach(i=>{i.obstruct(this,t,e)})}playSound(t,e){this.sounds.forEach(i=>{t.playAudio(i,e)}),this.sounds.clear()}update(t,e){this.traits.forEach(i=>{i.update(this,t,e)}),this.playSound(this.audio,t.audioContext),this.lifetime+=t.deltaTime}draw(t){}finalize(){this.events.emit(u.EVENT_TASK,this),this.traits.forEach(t=>{t.finalize(this)}),this.events.clear()}}class st{constructor(t,e,i){a(this,"image");a(this,"width");a(this,"height");a(this,"tiles");a(this,"animations");this.image=t,this.width=e,this.height=i,this.tiles=new Map,this.animations=new Map}defineAnim(t,e){this.animations.set(t,e)}define(t,e,i,n,o){const r=[!1,!0].map(c=>{const l=document.createElement("canvas");l.width=n,l.height=o;const d=l.getContext("2d");return c&&(d.scale(-1,1),d.translate(-n,0)),d.drawImage(this.image,e,i,n,o,0,0,n,o),l});this.tiles.set(t,r)}defineTile(t,e,i){this.define(t,e*this.width,i*this.height,this.width,this.height)}draw(t,e,i,n,o=!1){const r=this.tiles.get(t);r&&e.drawImage(r[Number(o)],i,n)}drawAnim(t,e,i,n,o){const r=this.animations.get(t);this.drawTile(r(o),e,i,n)}drawTile(t,e,i,n){this.draw(t,e,i*this.width,n*this.height)}}const M=async function(s){var n,o,r;const t=await O(`/data/sprites/${s}.json`),e=await rt(t.imageURL),i=new st(e,t.tileW||L,t.tileH||L);return(n=t.tiles)==null||n.forEach(c=>{i.defineTile(c.name,c.index[0],c.index[1])}),(o=t.frames)==null||o.forEach(c=>{i.define(c.name,...c.rect)}),(r=t.animations)==null||r.forEach(c=>{const l=vt(c.frames,c.frameLen);i.defineAnim(c.name,l)}),i};class P extends u{constructor(){super("killable");a(this,"dead");a(this,"deadTime");a(this,"removeAfter");this.dead=!1,this.deadTime=0,this.removeAfter=2}kill(){this.queue(()=>this.dead=!0)}revive(){this.dead=!1,this.deadTime=0}update(e,{deltaTime:i},n){this.dead&&(this.deadTime+=i,!(this.deadTime<=this.removeAfter)&&this.queue(()=>{n.entities.delete(e)}))}}class jt extends u{constructor(){super("velocity")}update(t,{deltaTime:e}){t.pos.x+=t.vel.x*e,t.pos.y+=t.vel.y*e}}class _t extends u{constructor(){super("gravity")}update(t,{deltaTime:e},i){t.vel.y+=i.gravity*e}}const Vt=async function(s){return M("bullet").then(Wt)};let Kt=class extends u{constructor(){super("behavior");a(this,"gravity");this.gravity=new _t}collides(e,i){var n;if(!e.killable.dead&&i.stomper){if(i.vel.y<=e.vel.y){(n=i.killable)==null||n.kill();return}e.killable.kill(),e.vel.set(k.x,k.y)}}update(e,i,n){e.killable.dead&&this.gravity.update(e,i,n)}};const Wt=function(s){const t=function(e){s.draw("bullet",e,0,0,this.vel.x<0)};return function(){const i=new g;return i.size.set(j.w,j.h),i.addTrait(new jt),i.addTrait(new Kt),i.addTrait(new P),i.draw=t,i}};async function it(s,t){const e=$t(t),i=await O(`/data/sounds/${s}.json`),n=new et,o=i.fx,r=[];return Object.keys(o).forEach(l=>{const{url:d}=o[l],f=e(d).then(p=>{n.addAudio(l,p)});r.push(f)}),Promise.all(r).then(()=>n)}function $t(s){return async function(e){return fetch(e).then(i=>i.arrayBuffer()).then(i=>s.decodeAudioData(i))}}class Xt extends u{constructor(){super("emitter");a(this,"interval");a(this,"coolDown");a(this,"emitters");this.interval=4,this.coolDown=this.interval,this.emitters=[]}emit(e,i){for(const n of this.emitters)n(e,i)}update(e,{deltaTime:i},n){this.coolDown-=i,!(this.coolDown>0)&&(this.emit(e,n),this.coolDown=this.interval)}}const R=class R extends u{constructor(){super("stomper");a(this,"bounceSpeed");this.bounceSpeed=400}bounce(e,i){e.bounds.bottom=i.bounds.top,e.vel.y=-this.bounceSpeed}collides(e,i){!i.killable||i.killable.dead||e.vel.y>i.vel.y&&(this.queue(()=>this.bounce(e,i)),e.sounds.add("stomp"),e.events.emit(R.EVENT_STOMP,e,i))}};a(R,"EVENT_STOMP",Symbol("stomp"));let B=R;class It extends u{constructor(){super("player");a(this,"lives");a(this,"score");a(this,"coins");a(this,"name");this.name="UNNAMED",this.lives=3,this.score=0,this.coins=0,this.listen(B.EVENT_STOMP,()=>{this.score+=mt})}addCoins(e){if(this.coins+=e,this.score+=yt,this.queue(i=>i.sounds.add("coin")),this.coins>=D){const i=Math.floor(this.coins/D);this.addLives(i),this.coins=this.coins%D,this.queue(n=>n.sounds.add("1up"))}}addLives(e){this.lives+=e}}class Qt extends u{constructor(){super("playerController");a(this,"player");a(this,"checkpoint");this.checkpoint=new w(0,0),this.player=null}setPlayer(e){this.player=e}update(e,i,n){var o;if(this.player&&!n.entities.has(this.player)){(o=this.player.killable)==null||o.revive(),this.player.pos.set(this.checkpoint.x,this.checkpoint.y),n.entities.add(this.player);return}}}const Jt=function(s){const t=new g,e=new Qt;return e.checkpoint.set(G.x,G.y),e.setPlayer(s),t.addTrait(e),t},Yt=function(s){return s.addTrait(new It),s},nt=function*(s){for(const t of s.entities)t.player&&(yield t)},Ut=async function(s,t){const e=await it("cannon",s);return Zt(e,t)},Zt=function(s,t){const e=function(i,n){let o=1;for(const c of nt(n)){if(c.pos.x>i.pos.x-W&&c.pos.x<i.pos.x+W)return;c.pos.x<i.pos.x&&(o=-1)}const r=t.bullet();r.pos.copy(i.pos),r.vel.set(80*o,0),i.sounds.add("shoot"),n.entities.add(r)};return function(){const n=new g;n.audio=s;const o=new Xt;return o.emitters.push(e),n.addTrait(o),n}};class ot extends u{constructor(){super("pendulumMove");a(this,"speed");a(this,"enabled");this.enabled=!0,this.speed=-30}obstruct(e,i){(i===h.LEFT||i===h.RIGHT)&&(this.speed=-this.speed)}update(e){this.enabled&&(e.vel.x=this.speed)}}class V extends u{constructor(){super("physics")}update(t,e,i){const{deltaTime:n}=e;t.pos.x+=t.vel.x*n,i.tileCollider.checkX(t,e,i),t.pos.y+=t.vel.y*n,i.tileCollider.checkY(t,e,i),t.vel.y+=i.gravity*n}}class K extends u{constructor(){super("solid");a(this,"obstructs");this.obstructs=!0}obstruct(e,i,n){this.obstructs&&(i===h.BOTTOM?(e.bounds.bottom=n.y1,e.vel.y=0):i===h.TOP?(e.bounds.top=n.y2,e.vel.y=0):i===h.LEFT?(e.bounds.left=n.x2,e.vel.x=0):i===h.RIGHT&&(e.bounds.right=n.x1,e.vel.x=0))}}const te=async function(s){return M("goomba").then(se)};let ee=class extends u{constructor(){super("behavior")}collides(t,e){var i;if(!t.killable.dead&&e.stomper){if(e.vel.y<=t.vel.y){(i=e.killable)==null||i.kill();return}t.killable.kill(),t.pendulumMove.speed=0}}};const se=function(s){const t=s.animations.get("walk"),e=function(n){return n.killable.dead?"flat":t(n.lifetime)},i=function(n){s.draw(e(this),n,0,0)};return function(){const o=new g;return o.size.set(E.w,E.h),o.addTrait(new V),o.addTrait(new K),o.addTrait(new ot),o.addTrait(new ee),o.addTrait(new P),o.draw=i,o}},ie=async function(s){return M("koopa").then(oe)},C=Symbol("walking"),T=Symbol("hiding"),A=Symbol("panic");class ne extends u{constructor(){super("behavior");a(this,"state");a(this,"hideTime");a(this,"hideDuration");a(this,"panicSpeed");a(this,"walkSpeed");this.hideTime=0,this.hideDuration=5,this.panicSpeed=300,this.walkSpeed=null,this.state=C}collides(e,i){if(!e.killable.dead&&i.stomper){if(i.vel.y<=e.vel.y){this.handleNudge(e,i);return}this.handleStomp(e,i)}}handleNudge(e,i){var n,o;if(this.state===C)(n=i.killable)==null||n.kill();else if(this.state===T)this.panic(e,i);else if(this.state===A){const r=Math.sign(e.vel.x),c=Math.sign(e.pos.x-i.pos.x);r!==0&&r!==c&&((o=i.killable)==null||o.kill())}}handleStomp(e,i){this.state===C?this.hide(e):this.state===T?(e.killable.kill(),e.vel.set(k.x,k.y),e.solid.obstructs=!1):this.state===A&&this.hide(e)}hide(e){e.vel.x=0,e.pendulumMove.enabled=!1,this.walkSpeed===null&&(this.walkSpeed=e.pendulumMove.speed),this.hideTime=0,this.state=T}unhide(e){e.pendulumMove.enabled=!0,this.walkSpeed&&(e.pendulumMove.speed=this.walkSpeed),this.state=C}panic(e,i){e.pendulumMove.enabled=!0,e.pendulumMove.speed=this.panicSpeed*Math.sign(i.vel.x),this.state=A}update(e,{deltaTime:i}){this.state===T&&(this.hideTime+=i,!(this.hideTime<=this.hideDuration)&&this.unhide(e))}}const oe=function(s){const t=s.animations.get("walk"),e=s.animations.get("wake"),i=function(o){const r=o.behavior;return r.state===T?r.hideTime>3?e(r.hideTime):"hiding":r.state===A?"hiding":t(o.lifetime)},n=function(o){s.draw(i(this),o,0,0,this.vel.x<0)};return function(){const r=new g;return r.size.set(E.w,E.h),r.offset.y=8,r.addTrait(new V),r.addTrait(new K),r.addTrait(new ot),r.addTrait(new ne),r.addTrait(new P),r.draw=n,r}};class re extends u{constructor(){super("go");a(this,"dir");a(this,"acceleration");a(this,"deceleration");a(this,"dragFactor");a(this,"distance");a(this,"heading");this.dir=0,this.acceleration=400,this.deceleration=300,this.dragFactor=Q,this.distance=0,this.heading=1}update(e,{deltaTime:i}){const n=Math.abs(e.vel.x);if(this.dir!==0)e.vel.x+=this.acceleration*i*this.dir,e.jump?e.jump.falling===!1&&(this.heading=this.dir):this.heading=this.dir;else if(e.vel.x!==0){const r=Math.min(n,this.deceleration*i);e.vel.x+=e.vel.x>0?-r:r}else this.distance=0;const o=this.dragFactor*e.vel.x*n;e.vel.x-=o,this.distance+=n*i}}class ae extends u{constructor(){super("jump");a(this,"duration");a(this,"velocity");a(this,"engageTime");a(this,"ready");a(this,"requestTime");a(this,"gracePeriod");a(this,"speedBoost");this.ready=0,this.duration=.3,this.engageTime=0,this.requestTime=0,this.gracePeriod=.1,this.speedBoost=.3,this.velocity=200}get falling(){return this.ready<0}start(){this.requestTime=this.gracePeriod}cancel(){this.engageTime=0,this.requestTime=0}obstruct(e,i){i===h.BOTTOM?this.ready=1:i===h.TOP&&this.cancel()}update(e,{deltaTime:i}){this.requestTime>0&&(this.ready>0&&(e.sounds.add("jump"),this.engageTime=this.duration,this.requestTime=0),this.requestTime-=i),this.engageTime>0&&(e.vel.y=-(this.velocity+Math.abs(e.vel.x)*this.speedBoost),this.engageTime-=i),this.ready--}}const ce=async function(s){const t=await M("mario"),e=await it("mario",s);return le(t,e)},le=function(s,t){const e=s.animations.get("run");function i(r){return r.jump.falling?"jump":r.go.distance>0?r.vel.x>0&&r.go.dir<0||r.vel.x<0&&r.go.dir>0?"break":e(r.go.distance):"idle"}function n(r){this.go.dragFactor=r?pt:Q}function o(r){s.draw(i(this),r,0,0,this.go.heading<0)}return function(){const c=new g;return c.audio=t,c.size.set(q.w,q.h),c.addTrait(new V),c.addTrait(new K),c.addTrait(new re),c.addTrait(new ae),c.addTrait(new B),c.addTrait(new P),c.killable.removeAfter=0,c.turbo=n,c.draw=o,c.turbo(!1),c}},rt=function(s){return new Promise(t=>{const e=new Image;e.addEventListener("load",()=>{t(e)}),e.src=s})},O=async function(s){return fetch(s).then(t=>t.json())},de=async function(s){const t={mario:function(){throw new Error("Function not implemented.")},goomba:function(){throw new Error("Function not implemented.")},koopa:function(){throw new Error("Function not implemented.")},bullet:function(){throw new Error("Function not implemented.")},cannon:function(){throw new Error("Function not implemented.")}},e=function(i){return n=>t[i]=n};return Promise.all([ce(s).then(e("mario")),te().then(e("goomba")),ie().then(e("koopa")),Vt().then(e("bullet")),Ut(s,t).then(e("cannon"))]).then(()=>t)},ue=function(s,t,e){const i=new tt(t),n=document.createElement("canvas");n.width=X+16,n.height=I;const o=n.getContext("2d");function r(c,l){o.clearRect(0,0,n.width,n.height);for(let d=c;d<=l;++d){const f=t.grid[d];f&&f.forEach((p,y)=>{const b=p;e.animations.has(b.name)?e.drawAnim(b.name,o,d-c,y,s.totalTime):e.drawTile(b.name,o,d-c,y)})}}return function(l,d){const f=i.toIndex(d.size.x),p=i.toIndex(d.pos.x),y=p+f;r(p,y),l.drawImage(n,-d.pos.x%L,-d.pos.y)}},he=function(s,t=_.width,e=_.width){const i=document.createElement("canvas");i.width=t,i.height=e;const n=i.getContext("2d");return function(r,c){s.forEach(l=>{n.clearRect(0,0,t,e),l.draw(n),r.drawImage(i,l.pos.x-c.pos.x,l.pos.y-c.pos.y)})}};class fe{constructor(){a(this,"tracks");this.tracks=new Map}addTrack(t,e){const i=new Audio;i.loop=!0,i.src=e,this.tracks.set(t,i)}playTrack(t){for(const i of this.tracks.values())i.pause();const e=this.tracks.get(t);return e.play(),e}}async function pe(s){const t=await O(`/data/music/${s}.json`),e=new fe;for(const[i,n]of Object.entries(t))e.addTrack(i,n.url);return e}const v=class v extends u{constructor(){super("levelTimer");a(this,"totalTime");a(this,"currentTime");a(this,"hurryTime");a(this,"hurryEmitted");this.totalTime=300,this.currentTime=this.totalTime,this.hurryTime=100,this.hurryEmitted=null}update(e,{deltaTime:i},n){this.currentTime-=i*2,this.hurryEmitted!==!0&&this.currentTime<this.hurryTime&&(n==null||n.events.emit(v.EVENT_TIMER_HURRY),this.hurryEmitted=!0),this.hurryEmitted!==!1&&this.currentTime>this.hurryTime&&(n==null||n.events.emit(v.EVENT_TIMER_OK),this.hurryEmitted=!1)}};a(v,"EVENT_TIMER_HURRY",Symbol("timer hurry")),a(v,"EVENT_TIMER_OK",Symbol("timer ok"));let S=v;const me=function(){const s=new g;return s.addTrait(new S),s},ye=function(s){const t=me();s.entities.add(t),s.events.listen(S.EVENT_TIMER_OK,()=>{s.music.playTheme()}),s.events.listen(S.EVENT_TIMER_HURRY,()=>{s.music.playHurryTheme()})},H=function*(s,t,e,i){const n=s+t,o=e+i;for(let r=s;r<n;++r)for(let c=e;c<o;++c)yield{x:r,y:c}},we=function(s){if(s.length===4){const[t,e,i,n]=s;return H(t,e,i,n)}else if(s.length===3){const[t,e,i]=s;return H(t,e,i,1)}else{const[t,e]=s;return H(t,1,e,1)}},ge=function*(s){for(const t of s)yield*we(t)},be=function*(s,t){function*e(i,n,o){for(const r of i)for(const{x:c,y:l}of ge(r.ranges)){const d=c+n,f=l+o;if(r.pattern){const p=t[r.pattern];yield*e(p.tiles,d,f);continue}yield{tile:r,x:d,y:f}}}yield*e(s,0,0)},ve=function(s,t){const e=new Et;for(const{tile:i,x:n,y:o}of be(s,t))e.set(n,o,i);return e},xe=function(s,t,e){s.layers.forEach(i=>{const n=ve(i.tiles,s.patterns),o=ue(t,n,e);t.comp.layers.push(o),t.tileCollider.addGrid(n)})},Te=function(s,t,e){s.entities.forEach(({name:n,pos:[o,r]})=>{const c=e[n],l=c();l.pos.set(o,r),t.entities.add(l)});const i=he(t.entities);t.comp.layers.push(i)},Ee=async function(s){return async function(e){const i=await O(`/data/levels/${e}.json`),n=await M(i.spriteSheet),o=await pe(i.musicSheet),r=new Ht;return r.music.setPlayer(o),xe(i,r,n),Te(i,r,s),ye(r),r}},ke=function(s){const t=document.querySelector("[data-action='left']"),e=document.querySelector("[data-action='right']"),i=document.querySelector("[data-action='jump']"),n=document.querySelector("[data-action='speed']"),o={left:{elem:t,fn:function(c){Z(s,c)},handle:!1},right:{elem:e,fn:function(c){U(s,c)},handle:!1},jump:{elem:i,fn:function(c){J(s,c)},handle:!1},speed:{elem:n,fn:function(c){Y(s,c)},handle:!1}};["pointerdown","pointerup","pointercancel","pointerout","pointerleave"].forEach(c=>{for(const l in o){const d=o[l];d.elem.addEventListener(c,function(){if(c==="pointerdown")return d.handle=!0,d.fn(!0);d.handle&&(d.fn(!1),d.handle=!1)})}})};function Se(s){return[...s].includes(s)}class Me{constructor(t,e=m){a(this,"sprites");a(this,"size",m);this.sprites=t,this.size=e}print(t,e,i,n){[...t].forEach((o,r)=>{Se(o)&&this.sprites.draw(o,e,i+r*this.size,n)})}}const Ce=async function(){return rt(wt).then(s=>{const t=new st(s,m,m),e=s.width;for(const[i,n]of[...gt].entries()){const o=i*m%e,r=Math.floor(i*m/e)*m;t.define(n,o,r,m,m)}return new Me(t)})},Ae=function(s){for(const t of nt(s))return t.player},Le=function(s){for(const t of s.entities)if(t.levelTimer)return t.levelTimer},Be=function(s,t){const e=s.size,i=s.size*2;return function(o){const r=Ae(t),c=Le(t);if(!r||!c)return;const{score:l,coins:d,name:f,lives:p}=r;s.print(f,o,16,e),s.print(l.toString().padStart(6,"0"),o,16,i),s.print(`livesx${p.toString().padStart(2,"0")}`,o,80,e),s.print(`@x${d.toString().padStart(2,"0")}`,o,96,i),s.print("WORLD",o,152,e),s.print("1-1",o,160,i),s.print("TIME",o,208,e),s.print(c.currentTime.toFixed().toString().padStart(3,"0"),o,216,i)}},Fe=function(s){return function(e,i){e.strokeStyle="red",s.forEach(n=>{e.beginPath(),e.rect(n.bounds.left-i.pos.x,n.bounds.top-i.pos.y,n.size.x,n.size.y),e.stroke()})}},ze=function(s){const t=[],e=s.tileSize,i=s.getByIndex;return s.getByIndex=function(o,r){return t.push({x:o,y:r}),i.call(s,o,r)},function(o,r){o.strokeStyle="blue",t.forEach(({x:c,y:l})=>{o.beginPath(),o.rect(c*e-r.pos.x,l*e-r.pos.y,e,e),o.stroke()}),t.length=0}};function Re(s){if(!s.tileCollider)return;const t=s.tileCollider.resolvers.map(ze),e=Fe(s.entities);return function(n,o){t.forEach(r=>r(n,o)),e(n,o)}}const Pe=async function(s){const t=s.getContext("2d"),e=new AudioContext,[i,n]=await Promise.all([de(e),Ce()]),r=await(await Ee(i))("1-1"),c=new kt,l=Yt(i.mario());l.player.name="MARIO";const d=Jt(l);r.entities.add(d);const f=Re(r);f&&r.comp.layers.push(f),r.comp.layers.push(Be(n,r)),xt(l).listenTo(window),ke(l);const y={audioContext:e,entityFactory:i,deltaTime:0},b=new Tt;b.update=function(ct){y.deltaTime=ct,r.update(y),c.pos.x=Math.max(0,l.pos.x-100),r.comp.draw(t,c)},b.start()},F=document.getElementById("screen"),N=F.getContext("2d");N.font="30px Comic Sans MS";N.fillStyle="white";N.textAlign="center";N.fillText("Hit Click To Play",F.width/2,F.height/2);const at=function(){window.removeEventListener("click",at),Pe(F)};window.addEventListener("click",at);
