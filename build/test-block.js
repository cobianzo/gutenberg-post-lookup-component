(()=>{"use strict";var e,t={198:(e,t,o)=>{const s=window.wp.blocks,n=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"coco/test-block","version":"1.0.0","title":"Coco Test Block","category":"widgets","icon":"smiley","description":"A test block for the Coco Post Lookup plugin","supports":{"html":false},"attributes":{"postID":{"type":"number","default":0}},"textdomain":"coco","editorScript":"file:../../build/test-block.js","editorStyle":"file:../../build/test-block.css","style":"file:../../build/test-block.css","render":"file:./render.php"}'),r=window.wp.blockEditor,l=window.wp.components,c=window.wp.i18n,i=window.wp.element,a=window.React,d=window.wp.apiFetch;var p=o.n(d);const u=window.wp.data;function h(e){const[t,o]=(0,i.useState)(!1);return{post:(0,u.useSelect)((t=>{if(!e)return null;const{getEntityRecord:s}=t("core");return o(!1),s("postType","post",e)}),[e]),isLoading:t}}const b=window.ReactJSXRuntime;function x(e){return(0,b.jsx)("button",{onClick:e.onClick,type:"button",className:"x-button components-button block-editor-inspector-popover-header__action has-icon","aria-label":"Close",children:(0,b.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:"24",height:"24","aria-hidden":"true",focusable:"false",children:(0,b.jsx)("path",{d:"M12 13.06l3.712 3.713 1.061-1.06L13.061 12l3.712-3.712-1.06-1.06L12 10.938 8.288 7.227l-1.061 1.06L10.939 12l-3.712 3.712 1.06 1.061L12 13.061z"})})})}const f=e=>{const{selectedPostId:t,updateSelectedPostId:o}=e,[s,n]=(0,i.useState)(null),r=function(e,t){const[o,s]=(0,a.useState)(e);return(0,a.useEffect)((()=>{const o=setTimeout((()=>{s(e)}),t);return()=>{clearTimeout(o)}}),[e,t]),o}(s,300),{posts:d,loading:u,error:f}=function(e){const[t,o]=(0,i.useState)([]),[s,n]=(0,i.useState)(!1),[r,l]=(0,i.useState)(null);return(0,i.useEffect)((()=>{e?(n(!0),l(null),p()({path:`/wp/v2/posts?search=${encodeURIComponent(e)}&per_page=10`}).then((e=>{o(e),n(!1)})).catch((e=>{l("Failed to fetch posts"+e.message),n(!1)}))):o([])}),[e]),{posts:t,loading:s,error:r}}(r),{post:v}=h(t),m=(0,i.useRef)(null),j=(0,i.useCallback)((e=>{n(e)}),[]);return(0,b.jsxs)("div",{className:"coco__post-lookup",children:[(0,b.jsx)("div",{className:"post-lookup__preview",children:t?(0,b.jsx)("p",{children:" "}):(0,b.jsx)("p",{children:"No post selected"})}),t&&v?.id&&null===s?(0,b.jsxs)("div",{className:"post-lookup__preview",children:[(0,b.jsx)("p",{children:"SELECTED POST:"}),(0,b.jsxs)("div",{className:"post-lookup__inner-row",children:[(0,b.jsxs)("button",{className:"button--unstyled",onClick:()=>{n(""),setTimeout((()=>m.current?.focus()),500)},children:[(0,b.jsx)("span",{className:"dashicons dashicons-edit"}),v.title.rendered]}),t>0?(0,b.jsx)(x,{onClick:()=>e.updateSelectedPostId(0)}):"No"]})]}):(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(l.TextControl,{label:(0,c.__)("Search for a post","coco"),value:s||"",onChange:j,placeholder:(0,c.__)("Search…","coco"),ref:m}),(0,b.jsx)(x,{onClick:()=>n(null)}),u&&(0,b.jsx)(l.Spinner,{}),f&&(0,b.jsx)("div",{className:"notice notice-error",children:(0,b.jsx)("p",{children:(0,c.__)("Error:","coco")+f})}),d.length>0&&(0,b.jsx)("ul",{children:d.map((e=>(0,b.jsx)("li",{children:(0,b.jsx)("button",{className:"button--unstyled",onClick:()=>{return t=e.id,o(t),void n(null);var t},children:e.title.rendered})},e.id)))}),t?(0,b.jsxs)("p",{children:[" ",(0,c.__)("Selected post ID:","coco")+t," "]}):null]})]})},v=n,{name:m,...j}=v;(0,s.registerBlockType)(n.name,{name:m,...j,edit:function(e){var t;const{post:o}=h(e.attributes.postID);return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("div",{...(0,r.useBlockProps)(),style:{border:"10px solid orange",background:"lightgray",padding:"1rem"},children:o?(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("h2",{children:null!==(t=o?.title?.rendered)&&void 0!==t?t:"no post"}),(0,b.jsx)("div",{dangerouslySetInnerHTML:{__html:o?.content?.rendered.replace(/<[^>]+>/g,"")}})]}):(0,b.jsx)("p",{children:(0,c.__)("No post selected","coco")})}),(0,b.jsx)(r.InspectorControls,{children:(0,b.jsx)(l.Panel,{children:(0,b.jsx)(l.PanelBody,{children:(0,b.jsx)(f,{selectedPostId:e.attributes.postID,updateSelectedPostId:t=>e.setAttributes({postID:t||0})})})})})]})},save:function(){return(0,b.jsx)("div",{...r.useBlockProps.save()})}})}},o={};function s(e){var n=o[e];if(void 0!==n)return n.exports;var r=o[e]={exports:{}};return t[e](r,r.exports,s),r.exports}s.m=t,e=[],s.O=(t,o,n,r)=>{if(!o){var l=1/0;for(d=0;d<e.length;d++){o=e[d][0],n=e[d][1],r=e[d][2];for(var c=!0,i=0;i<o.length;i++)(!1&r||l>=r)&&Object.keys(s.O).every((e=>s.O[e](o[i])))?o.splice(i--,1):(c=!1,r<l&&(l=r));if(c){e.splice(d--,1);var a=n();void 0!==a&&(t=a)}}return t}r=r||0;for(var d=e.length;d>0&&e[d-1][2]>r;d--)e[d]=e[d-1];e[d]=[o,n,r]},s.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return s.d(t,{a:t}),t},s.d=(e,t)=>{for(var o in t)s.o(t,o)&&!s.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},s.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={755:0,202:0};s.O.j=t=>0===e[t];var t=(t,o)=>{var n,r,l=o[0],c=o[1],i=o[2],a=0;if(l.some((t=>0!==e[t]))){for(n in c)s.o(c,n)&&(s.m[n]=c[n]);if(i)var d=i(s)}for(t&&t(o);a<l.length;a++)r=l[a],s.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return s.O(d)},o=self.webpackChunk_cobianzo_gutenberg_post_lookup_component=self.webpackChunk_cobianzo_gutenberg_post_lookup_component||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))})();var n=s.O(void 0,[202],(()=>s(198)));n=s.O(n)})();