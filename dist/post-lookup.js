!function(n,o){"object"==typeof exports&&"object"==typeof module?module.exports=o():"function"==typeof define&&define.amd?define([],o):"object"==typeof exports?exports["post-lookup"]=o():n["post-lookup"]=o()}(this,(()=>(()=>{"use strict";var n={n:o=>{var e=o&&o.__esModule?()=>o.default:()=>o;return n.d(e,{a:e}),e},d:(o,e)=>{for(var t in e)n.o(e,t)&&!n.o(o,t)&&Object.defineProperty(o,t,{enumerable:!0,get:e[t]})},o:(n,o)=>Object.prototype.hasOwnProperty.call(n,o)},o={};n.d(o,{default:()=>p});const e=window.ReactJSXRuntime,t=window.wp.element,r=window.wp.components,i=window.wp.i18n,c=window.React,s=window.wp.apiFetch;var l=n.n(s);const a=window.wp.data;function u(n){return(0,e.jsx)("button",{onClick:n.onClick,type:"button",className:"x-button components-button block-editor-inspector-popover-header__action has-icon","aria-label":"Close",children:(0,e.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:"24",height:"24","aria-hidden":"true",focusable:"false",children:(0,e.jsx)("path",{d:"M12 13.06l3.712 3.713 1.061-1.06L13.061 12l3.712-3.712-1.06-1.06L12 10.938 8.288 7.227l-1.061 1.06L10.939 12l-3.712 3.712 1.06 1.061L12 13.061z"})})})}const p=function(n){var o=n.selectedPostId,s=n.postType,p=void 0===s?"post":s,d=n.onChange,f=(0,t.useState)(null),h=f[0],x=f[1],m=function(n,o){var e=(0,c.useState)(n),t=e[0],r=e[1];return(0,c.useEffect)((function(){var e=setTimeout((function(){r(n)}),o);return function(){clearTimeout(e)}}),[n,o]),t}(h,300),v=function(n,o){void 0===o&&(o="post");var e=(0,t.useState)([]),r=e[0],i=e[1],c=(0,t.useState)(!1),s=c[0],a=c[1],u=(0,t.useState)(null),p=u[0],d=u[1];return(0,t.useEffect)((function(){if(n){a(!0),d(null);var e="/wp/v2/".concat("post"===o?"posts":o);e+="?search=".concat(encodeURIComponent(n)),e+="&per_page=10",l()({path:e}).then((function(n){i(n),a(!1)})).catch((function(n){console.error("Error in fetchAPI for endpoint:",e,n),d("Failed to fetch posts"+n.message),a(!1)}))}else i([])}),[n,o]),{posts:r,loading:s,error:p}}(m,p),b=v.posts,w=v.loading,g=v.error,_=function(n,o){void 0===o&&(o="post");var e=(0,t.useState)(!1),r=e[0],i=e[1];return{post:(0,a.useSelect)((function(e){if(!n)return null;var t=e("core").getEntityRecord;return i(!1),t("postType",o,n)}),[n,o]),isLoading:r}}(o,p).post,j=(0,t.useRef)(null);(0,t.useEffect)((function(){console.log(" > PostLookup init in  production Mode");var n=document.createElement("style");return n.textContent="\n  .interface-complementary-area .components-panel {\n    z-index: 9;\n  }\n\n  .coco__post-lookup {\n    position: relative;\n\n    input.components-text-control__input {\n      padding-right: 40px;\n    }\n\n    .x-button {\n      position: absolute;\n      top: 60px;\n      right: 10px;\n    }\n\n    .post-lookup__inner-row {\n      position: relative;\n    }\n    .post-lookup__inner-row .x-button {\n      top: 10px;\n    }\n\n    ul {\n      background: #fffffff4;\n      padding: 0 0.5rem;\n      border: 1px solid #ccc;\n      box-shadow: 1px 7px 9px -9px #000000;\n      position: absolute;\n      width: 100%;\n      top: 74px;\n    }\n\n    li {\n      padding: 0;\n      border-bottom: 1px solid #cccccc;\n      margin: 0;\n    }\n\n    li button {\n      width: 100%;\n    }\n\n    button.button--unstyled {\n      display: flex;\n      gap: 1rem;\n      padding: 0.5rem;\n      align-items: center;\n      cursor: pointer;\n      background: transparent;\n      border: 0;\n      color: var( --wp-components-color-accent, var( --wp-admin-theme-color, #3858e9 ) );\n    }\n\n    button.button--unstyled:hover {\n      background-color: rgba( var( --wp-admin-theme-color--rgb ), 0.04 );\n    }\n  }\n",document.head.appendChild(n),function(){document.head.removeChild(n)}}),[]);var k=(0,t.useCallback)((function(n){x(n)}),[]);return(0,e.jsxs)("div",{className:"coco__post-lookup",children:[(0,e.jsx)("div",{className:"post-lookup__preview",children:o?(0,e.jsx)("p",{children:" "}):(0,e.jsx)("p",{children:"No post selected"})}),o&&(null==_?void 0:_.id)&&null===h?(0,e.jsxs)("div",{className:"post-lookup__preview",children:[(0,e.jsx)("p",{children:"SELECTED POST:"}),(0,e.jsxs)("div",{className:"post-lookup__inner-row",children:[(0,e.jsxs)("button",{className:"button--unstyled",onClick:function(){x(""),setTimeout((function(){var n;return null===(n=j.current)||void 0===n?void 0:n.focus()}),500)},children:[(0,e.jsx)("span",{className:"dashicons dashicons-edit"}),_.title.rendered]}),o&&o>0?(0,e.jsx)(u,{onClick:function(){return n.onChange(0)}}):""]})]}):(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(r.TextControl,{label:(0,i.__)("Search for a post","coco")+" (".concat(p,")"),value:h||"",onChange:k,placeholder:(0,i.__)("Search…","coco"),autoComplete:"off",ref:j}),o&&o>0?(0,e.jsx)(u,{onClick:function(){return x(null)}}):null,w&&(0,e.jsx)(r.Spinner,{}),g&&(0,e.jsx)("div",{className:"notice notice-error",children:(0,e.jsx)("p",{children:(0,i.__)("Error:","coco")+g})}),b.length>0&&(0,e.jsx)("ul",{children:b.map((function(n){return(0,e.jsx)("li",{children:(0,e.jsx)("button",{className:"button--unstyled",onClick:function(){return o=n.id,d(o),void x(null);var o},children:n.title.rendered})},n.id)}))}),o?(0,e.jsxs)("p",{children:[" ",(0,i.__)("Selected post ID:","coco")+o," "]}):null]})]})};return o.default})()));