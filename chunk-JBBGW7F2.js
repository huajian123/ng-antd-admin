import{d as U,e as H,h as $}from"./chunk-JS4TD4O2.js";import{a as E,c as I,fa as T,i as j,j as z,n as w}from"./chunk-F5ALC7SR.js";import{d as L}from"./chunk-NGTZY5Y2.js";import{Ba as D,Ca as N,Eb as k,Sb as V,Va as x,bb as P,ra as v,ta as y,va as f,vb as h}from"./chunk-PHCOYEBV.js";import{a}from"./chunk-VB56BUGO.js";function Q(){return!0}var J=new y("mat-sanity-checks",{providedIn:"root",factory:Q}),Y=(()=>{let t=class t{constructor(e,n,s){this._sanityChecks=n,this._document=s,this._hasDoneGlobalChecks=!1,e._applyBodyHighContrastModeCssClasses(),this._hasDoneGlobalChecks||(this._hasDoneGlobalChecks=!0)}_checkIsEnabled(e){return z()?!1:typeof this._sanityChecks=="boolean"?this._sanityChecks:!!this._sanityChecks[e]}};t.\u0275fac=function(n){return new(n||t)(f($),f(J,8),f(L))},t.\u0275mod=D({type:t}),t.\u0275inj=v({imports:[T,T]});let o=t;return o})();var c=function(o){return o[o.FADING_IN=0]="FADING_IN",o[o.VISIBLE=1]="VISIBLE",o[o.FADING_OUT=2]="FADING_OUT",o[o.HIDDEN=3]="HIDDEN",o}(c||{}),C=class{constructor(t,i,e,n=!1){this._renderer=t,this.element=i,this.config=e,this._animationForciblyDisabledThroughCss=n,this.state=c.HIDDEN}fadeOut(){this._renderer.fadeOutRipple(this)}},B=I({passive:!0,capture:!0}),M=class{constructor(){this._events=new Map,this._delegateEventHandler=t=>{let i=j(t);i&&this._events.get(t.type)?.forEach((e,n)=>{(n===i||n.contains(i))&&e.forEach(s=>s.handleEvent(t))})}}addHandler(t,i,e,n){let s=this._events.get(i);if(s){let l=s.get(e);l?l.add(n):s.set(e,new Set([n]))}else this._events.set(i,new Map([[e,new Set([n])]])),t.runOutsideAngular(()=>{document.addEventListener(i,this._delegateEventHandler,B)})}removeHandler(t,i,e){let n=this._events.get(t);if(!n)return;let s=n.get(i);s&&(s.delete(e),s.size===0&&n.delete(i),n.size===0&&(this._events.delete(t),document.removeEventListener(t,this._delegateEventHandler,B)))}},G={enterDuration:225,exitDuration:150},tt=800,Z=I({passive:!0,capture:!0}),W=["mousedown","touchstart"],K=["mouseup","mouseleave","touchend","touchcancel"],p=class p{constructor(t,i,e,n){this._target=t,this._ngZone=i,this._platform=n,this._isPointerDown=!1,this._activeRipples=new Map,this._pointerUpEventsRegistered=!1,n.isBrowser&&(this._containerElement=w(e))}fadeInRipple(t,i,e={}){let n=this._containerRect=this._containerRect||this._containerElement.getBoundingClientRect(),s=a(a({},G),e.animation);e.centered&&(t=n.left+n.width/2,i=n.top+n.height/2);let l=e.radius||et(t,i,n),g=t-n.left,q=i-n.top,m=s.enterDuration,r=document.createElement("div");r.classList.add("mat-ripple-element"),r.style.left=`${g-l}px`,r.style.top=`${q-l}px`,r.style.height=`${l*2}px`,r.style.width=`${l*2}px`,e.color!=null&&(r.style.backgroundColor=e.color),r.style.transitionDuration=`${m}ms`,this._containerElement.appendChild(r);let A=window.getComputedStyle(r),X=A.transitionProperty,O=A.transitionDuration,b=X==="none"||O==="0s"||O==="0s, 0s"||n.width===0&&n.height===0,d=new C(this,r,e,b);r.style.transform="scale3d(1, 1, 1)",d.state=c.FADING_IN,e.persistent||(this._mostRecentTransientRipple=d);let u=null;return!b&&(m||s.exitDuration)&&this._ngZone.runOutsideAngular(()=>{let F=()=>{u&&(u.fallbackTimer=null),clearTimeout(S),this._finishRippleTransition(d)},_=()=>this._destroyRipple(d),S=setTimeout(_,m+100);r.addEventListener("transitionend",F),r.addEventListener("transitioncancel",_),u={onTransitionEnd:F,onTransitionCancel:_,fallbackTimer:S}}),this._activeRipples.set(d,u),(b||!m)&&this._finishRippleTransition(d),d}fadeOutRipple(t){if(t.state===c.FADING_OUT||t.state===c.HIDDEN)return;let i=t.element,e=a(a({},G),t.config.animation);i.style.transitionDuration=`${e.exitDuration}ms`,i.style.opacity="0",t.state=c.FADING_OUT,(t._animationForciblyDisabledThroughCss||!e.exitDuration)&&this._finishRippleTransition(t)}fadeOutAll(){this._getActiveRipples().forEach(t=>t.fadeOut())}fadeOutAllNonPersistent(){this._getActiveRipples().forEach(t=>{t.config.persistent||t.fadeOut()})}setupTriggerEvents(t){let i=w(t);!this._platform.isBrowser||!i||i===this._triggerElement||(this._removeTriggerEvents(),this._triggerElement=i,W.forEach(e=>{p._eventManager.addHandler(this._ngZone,e,i,this)}))}handleEvent(t){t.type==="mousedown"?this._onMousedown(t):t.type==="touchstart"?this._onTouchStart(t):this._onPointerUp(),this._pointerUpEventsRegistered||(this._ngZone.runOutsideAngular(()=>{K.forEach(i=>{this._triggerElement.addEventListener(i,this,Z)})}),this._pointerUpEventsRegistered=!0)}_finishRippleTransition(t){t.state===c.FADING_IN?this._startFadeOutTransition(t):t.state===c.FADING_OUT&&this._destroyRipple(t)}_startFadeOutTransition(t){let i=t===this._mostRecentTransientRipple,{persistent:e}=t.config;t.state=c.VISIBLE,!e&&(!i||!this._isPointerDown)&&t.fadeOut()}_destroyRipple(t){let i=this._activeRipples.get(t)??null;this._activeRipples.delete(t),this._activeRipples.size||(this._containerRect=null),t===this._mostRecentTransientRipple&&(this._mostRecentTransientRipple=null),t.state=c.HIDDEN,i!==null&&(t.element.removeEventListener("transitionend",i.onTransitionEnd),t.element.removeEventListener("transitioncancel",i.onTransitionCancel),i.fallbackTimer!==null&&clearTimeout(i.fallbackTimer)),t.element.remove()}_onMousedown(t){let i=U(t),e=this._lastTouchStartEvent&&Date.now()<this._lastTouchStartEvent+tt;!this._target.rippleDisabled&&!i&&!e&&(this._isPointerDown=!0,this.fadeInRipple(t.clientX,t.clientY,this._target.rippleConfig))}_onTouchStart(t){if(!this._target.rippleDisabled&&!H(t)){this._lastTouchStartEvent=Date.now(),this._isPointerDown=!0;let i=t.changedTouches;if(i)for(let e=0;e<i.length;e++)this.fadeInRipple(i[e].clientX,i[e].clientY,this._target.rippleConfig)}}_onPointerUp(){this._isPointerDown&&(this._isPointerDown=!1,this._getActiveRipples().forEach(t=>{let i=t.state===c.VISIBLE||t.config.terminateOnPointerUp&&t.state===c.FADING_IN;!t.config.persistent&&i&&t.fadeOut()}))}_getActiveRipples(){return Array.from(this._activeRipples.keys())}_removeTriggerEvents(){let t=this._triggerElement;t&&(W.forEach(i=>p._eventManager.removeHandler(i,t,this)),this._pointerUpEventsRegistered&&(K.forEach(i=>t.removeEventListener(i,this,Z)),this._pointerUpEventsRegistered=!1))}};p._eventManager=new M;var R=p;function et(o,t,i){let e=Math.max(Math.abs(o-i.left),Math.abs(o-i.right)),n=Math.max(Math.abs(t-i.top),Math.abs(t-i.bottom));return Math.sqrt(e*e+n*n)}var it=new y("mat-ripple-global-options"),ee=(()=>{let t=class t{get disabled(){return this._disabled}set disabled(e){e&&this.fadeOutAllNonPersistent(),this._disabled=e,this._setupTriggerEventsIfEnabled()}get trigger(){return this._trigger||this._elementRef.nativeElement}set trigger(e){this._trigger=e,this._setupTriggerEventsIfEnabled()}constructor(e,n,s,l,g){this._elementRef=e,this._animationMode=g,this.radius=0,this._disabled=!1,this._isInitialized=!1,this._globalOptions=l||{},this._rippleRenderer=new R(this,n,e,s)}ngOnInit(){this._isInitialized=!0,this._setupTriggerEventsIfEnabled()}ngOnDestroy(){this._rippleRenderer._removeTriggerEvents()}fadeOutAll(){this._rippleRenderer.fadeOutAll()}fadeOutAllNonPersistent(){this._rippleRenderer.fadeOutAllNonPersistent()}get rippleConfig(){return{centered:this.centered,radius:this.radius,color:this.color,animation:a(a(a({},this._globalOptions.animation),this._animationMode==="NoopAnimations"?{enterDuration:0,exitDuration:0}:{}),this.animation),terminateOnPointerUp:this._globalOptions.terminateOnPointerUp}}get rippleDisabled(){return this.disabled||!!this._globalOptions.disabled}_setupTriggerEventsIfEnabled(){!this.disabled&&this._isInitialized&&this._rippleRenderer.setupTriggerEvents(this.trigger)}launch(e,n=0,s){return typeof e=="number"?this._rippleRenderer.fadeInRipple(e,n,a(a({},this.rippleConfig),s)):this._rippleRenderer.fadeInRipple(0,0,a(a({},this.rippleConfig),e))}};t.\u0275fac=function(n){return new(n||t)(h(x),h(k),h(E),h(it,8),h(P,8))},t.\u0275dir=N({type:t,selectors:[["","mat-ripple",""],["","matRipple",""]],hostAttrs:[1,"mat-ripple"],hostVars:2,hostBindings:function(n,s){n&2&&V("mat-ripple-unbounded",s.unbounded)},inputs:{color:[0,"matRippleColor","color"],unbounded:[0,"matRippleUnbounded","unbounded"],centered:[0,"matRippleCentered","centered"],radius:[0,"matRippleRadius","radius"],animation:[0,"matRippleAnimation","animation"],disabled:[0,"matRippleDisabled","disabled"],trigger:[0,"matRippleTrigger","trigger"]},exportAs:["matRipple"],standalone:!0});let o=t;return o})(),ie=(()=>{let t=class t{};t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=D({type:t}),t.\u0275inj=v({imports:[Y,Y]});let o=t;return o})();export{Y as a,ee as b,ie as c};
