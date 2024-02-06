(()=>{"use strict";var e,t={185:(e,t,r)=>{r.d(t,{Z:()=>l});var n=r(81),o=r.n(n),a=r(645),i=r.n(a)()(o());i.push([e.id,"@import url(https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600&display=swap);"]),i.push([e.id,'body,\ninput,\ntextarea {\n    font-family: "Open Sans", sans-serif;\n}\n\na {\n    text-decoration: none;\n}',""]);const l=i},619:(e,t,r)=>{r.r(t),r.d(t,{default:()=>m});var n=r(379),o=r.n(n),a=r(795),i=r.n(a),l=r(569),u=r.n(l),d=r(565),s=r.n(d),c=r(216),f=r.n(c),p=r(589),g=r.n(p),v=r(185),b={};b.styleTagTransform=g(),b.setAttributes=s(),b.insert=u().bind(null,"head"),b.domAPI=i(),b.insertStyleElement=f(),o()(v.Z,b);const m=v.Z&&v.Z.locals?v.Z.locals:void 0},246:function(e,t,r){var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var o=Object.getOwnPropertyDescriptor(t,r);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,o)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&n(t,e,r);return o(t,e),t};Object.defineProperty(t,"__esModule",{value:!0});const i=a(r(294));t.default=(e,t)=>{const[r,n]=i.useState(!0),[o,a]=i.useState(t),l=i.useRef(!1);return i.useEffect((()=>{chrome.storage.local.get(e).then((r=>{a(e in r?r[e]:t),n(!1)})).catch((()=>{console.warn(`useChromeStorage get error: ${e}`),a(t)})).finally((()=>{l.current=!0}))}),[]),i.useEffect((()=>{var t,r;l.current&&(null===(r=null===(t=null===chrome||void 0===chrome?void 0:chrome.storage)||void 0===t?void 0:t.local)||void 0===r||r.set({[e]:o}).catch((()=>{console.warn(`useChromeStorage set error: ${e}`)})))}),[e,o]),[o,a,{loading:r}]}},537:function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.SettingsBtn=t.Wrapper=void 0;const o=n(r(763));t.Wrapper=o.default.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 300px;
  height: auto;
  padding: 24px;
  position: relative;

  .logo {
    margin-bottom: 24px;
    height: 48px;
  }

  input {
    padding: 15px 20px;
    border-radius: 16px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    width: 100%;
    text-align: center;
    margin: 8px 0;
  }

  input:focus {
    outline: none !important;
    border-color: rgba(0, 0, 0, 0.4);
  }

  p {
    font-size: 10px;  
    text-align: center;
  }

  p a {
    font-weight: bold;
    text-decoration: none;
  }
`,t.SettingsBtn=o.default.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.8);

  &:hover {
    color: #fff;
    background: linear-gradient(133.43deg, #4d0089 0%, #235f19 102.89%);

    svg {
      fill: #fff;
      transform: rotate(30deg);
    }
  }

  &,
  svg {
    transition: all 0.2s ease;
  }

  .settings-btn:hover svg {
    fill: #fff;
    transform: rotate(30deg);
  }
`},329:function(e,t,r){var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var o=Object.getOwnPropertyDescriptor(t,r);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,o)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&n(t,e,r);return o(t,e),t},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const l=a(r(294)),u=r(745),d=i(r(246)),s=a(r(537));r(619);const c=document.getElementById("root");(0,u.createRoot)(c).render(l.createElement((()=>{const[e,t,{loading:r}]=(0,d.default)("kanbert-comment-openapi-key",""),[n,o,{loading:a}]=(0,d.default)("kanbert-comment-full-name","");return l.createElement(s.Wrapper,null,l.createElement("label",{htmlFor:"name"},"Enter your full name:"),l.createElement("input",{id:"name",placeholder:"John Doe",type:"text",value:n,disabled:a,onChange:e=>{o(e.target.value)}}),l.createElement("label",{htmlFor:"open-api-key"},"Enter your OpenAI API key:"),l.createElement("input",{id:"open-api-key",placeholder:"xxxxxxxx",type:"text",value:e,disabled:r,onChange:e=>{t(e.target.value)}}))}),null))}},r={};function n(e){var o=r[e];if(void 0!==o)return o.exports;var a=r[e]={id:e,exports:{}};return t[e].call(a.exports,a,a.exports,n),a.exports}n.m=t,e=[],n.O=(t,r,o,a)=>{if(!r){var i=1/0;for(s=0;s<e.length;s++){for(var[r,o,a]=e[s],l=!0,u=0;u<r.length;u++)(!1&a||i>=a)&&Object.keys(n.O).every((e=>n.O[e](r[u])))?r.splice(u--,1):(l=!1,a<i&&(i=a));if(l){e.splice(s--,1);var d=o();void 0!==d&&(t=d)}}return t}a=a||0;for(var s=e.length;s>0&&e[s-1][2]>a;s--)e[s]=e[s-1];e[s]=[r,o,a]},n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e={42:0};n.O.j=t=>0===e[t];var t=(t,r)=>{var o,a,[i,l,u]=r,d=0;if(i.some((t=>0!==e[t]))){for(o in l)n.o(l,o)&&(n.m[o]=l[o]);if(u)var s=u(n)}for(t&&t(r);d<i.length;d++)a=i[d],n.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return n.O(s)},r=self.webpackChunkkanbert_comment_gpt=self.webpackChunkkanbert_comment_gpt||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})(),n.nc=void 0;var o=n.O(void 0,[736],(()=>n(329)));o=n.O(o)})();