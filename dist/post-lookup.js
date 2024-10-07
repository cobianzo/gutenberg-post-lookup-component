(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["post-lookup"] = factory();
	else
		root["post-lookup"] = factory();
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ post_lookup)
});

;// external "ReactJSXRuntime"
const external_ReactJSXRuntime_namespaceObject = window["ReactJSXRuntime"];
;// external ["wp","element"]
const external_wp_element_namespaceObject = window["wp"]["element"];
;// external ["wp","components"]
const external_wp_components_namespaceObject = window["wp"]["components"];
;// external ["wp","i18n"]
const external_wp_i18n_namespaceObject = window["wp"]["i18n"];
;// external "React"
const external_React_namespaceObject = window["React"];
;// ./src/post-lookup/useDebounce.ts

function useDebounce(value, delay) {
  var _a = (0,external_React_namespaceObject.useState)(value),
    debouncedValue = _a[0],
    setDebouncedValue = _a[1];
  (0,external_React_namespaceObject.useEffect)(function () {
    var handler = setTimeout(function () {
      setDebouncedValue(value);
    }, delay);
    return function () {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}
/* harmony default export */ const post_lookup_useDebounce = (useDebounce);
;// external ["wp","apiFetch"]
const external_wp_apiFetch_namespaceObject = window["wp"]["apiFetch"];
var external_wp_apiFetch_default = /*#__PURE__*/__webpack_require__.n(external_wp_apiFetch_namespaceObject);
;// ./src/post-lookup/usePostSearch.ts
// WordPress dependencies


/**
 * Given the search term string, returns the list of matching posts.
 * It uses the apiFetch API of WP to retrieve the result
 *
 * @param {string | null} searchTerm - The search term to search for posts.
 * @return {PostSearchResult} The list of matching posts.
 */
function usePostSearch(searchTerm) {
  var _a = (0,external_wp_element_namespaceObject.useState)([]),
    posts = _a[0],
    setPosts = _a[1];
  var _b = (0,external_wp_element_namespaceObject.useState)(false),
    loading = _b[0],
    setLoading = _b[1];
  var _c = (0,external_wp_element_namespaceObject.useState)(null),
    error = _c[0],
    setError = _c[1];
  (0,external_wp_element_namespaceObject.useEffect)(function () {
    if (!searchTerm) {
      setPosts([]);
      return;
    }
    setLoading(true);
    setError(null);
    external_wp_apiFetch_default()({
      path: "/wp/v2/posts?search=".concat(encodeURIComponent(searchTerm), "&per_page=10")
    }).then(function (results) {
      setPosts(results);
      setLoading(false);
    }).catch(function (err) {
      setError('Failed to fetch posts' + err.message);
      setLoading(false);
    });
  }, [searchTerm]);
  return {
    posts: posts,
    loading: loading,
    error: error
  };
}
/* harmony default export */ const post_lookup_usePostSearch = (usePostSearch);
;// external ["wp","data"]
const external_wp_data_namespaceObject = window["wp"]["data"];
;// ./src/post-lookup/usePost.ts
// React and WordPress dependencies


/**
 * Custom hook: Given the post ID, returns the full post object.
 * @param {number|null} postId
 * @return {Object} An object containing the post object and a loading state.
 */
function usePost(postId) {
  var _a = (0,external_wp_element_namespaceObject.useState)(false),
    isLoading = _a[0],
    setIsLoading = _a[1];
  var post = (0,external_wp_data_namespaceObject.useSelect)(function (select) {
    if (!postId) {
      return null;
    }
    var getEntityRecord = select('core').getEntityRecord;
    setIsLoading(false);
    return getEntityRecord('postType', 'post', postId);
  }, [postId]);
  return {
    post: post,
    isLoading: isLoading
  };
}
;// ./src/post-lookup/post-lookup-styles.ts
var postLookupStyles = "\n  .coco__post-lookup {\n    position: relative;\n\n    input.components-text-control__input {\n      padding-right: 40px;\n    }\n\n    .x-button {\n      position: absolute;\n      top: 60px;\n      right: 10px;\n    }\n\n    .post-lookup__inner-row {\n      position: relative;\n    }\n    .post-lookup__inner-row .x-button {\n      top: 10px;\n    }\n\n    ul {\n      background: #fffffff4;\n      padding: 0 0.5rem;\n      border: 1px solid #ccc;\n      box-shadow: 1px 7px 9px -9px #000000;\n      position: absolute;\n      width: 100%;\n      top: 74px;\n    }\n\n    li {\n      padding: 0;\n      border-bottom: 1px solid #cccccc;\n      margin: 0;\n    }\n\n    li button {\n      width: 100%;\n    }\n\n    button.button--unstyled {\n      display: flex;\n      gap: 1rem;\n      padding: 0.5rem;\n      align-items: center;\n      cursor: pointer;\n      background: transparent;\n      border: 0;\n      color: var( --wp-components-color-accent, var( --wp-admin-theme-color, #3858e9 ) );\n    }\n\n    button.button--unstyled:hover {\n      background-color: rgba( var( --wp-admin-theme-color--rgb ), 0.04 );\n    }\n  }\n";
/* harmony default export */ const post_lookup_styles = (postLookupStyles);
;// ./src/post-lookup/XButton.tsx

// ts-eslint-disable
/* eslint-disable  */
function XButton(props) {
  return (0,external_ReactJSXRuntime_namespaceObject.jsx)("button", {
    onClick: props.onClick,
    type: "button",
    className: "x-button components-button block-editor-inspector-popover-header__action has-icon",
    "aria-label": "Close",
    children: (0,external_ReactJSXRuntime_namespaceObject.jsx)("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      width: "24",
      height: "24",
      "aria-hidden": "true",
      focusable: "false",
      children: (0,external_ReactJSXRuntime_namespaceObject.jsx)("path", {
        d: "M12 13.06l3.712 3.713 1.061-1.06L13.061 12l3.712-3.712-1.06-1.06L12 10.938 8.288 7.227l-1.061 1.06L10.939 12l-3.712 3.712 1.06 1.061L12 13.061z"
      })
    })
  });
}
;// ./src/post-lookup/PostLookup.tsx

// WordPress dependencies



// Internal deps



// Interal styles css as js const

// Internal component deps

/**
 * The Component ========================
 * Usage: <PostLookup selectedPostId={<yourPostId}>} updateSelectedPostId={<your-fn>} />
 *
 * @param {PostLookupProps}                 props
 * @param {number | null}                   props.selectedPostId
 * @param {(postId: number | null) => void} props.updateSelectedPostId
 * @return {JSX.Element}
 * =====================================================
 */
var PostLookup = function (props) {
  var selectedPostId = props.selectedPostId,
    updateSelectedPostId = props.updateSelectedPostId;
  // STATES ============= ============= =============
  var _a = (0,external_wp_element_namespaceObject.useState)(null),
    searchTerm = _a[0],
    setSearchTerm = _a[1];
  var debouncedSearchTerm = post_lookup_useDebounce(searchTerm, 300);
  var _b = post_lookup_usePostSearch(debouncedSearchTerm),
    postResults = _b.posts,
    loading = _b.loading,
    error = _b.error;
  var selectedPostObject = usePost(selectedPostId).post;
  // ref of the control so we can assign focus
  var textControlRef = (0,external_wp_element_namespaceObject.useRef)(null);
  // INIT, load css from js const
  (0,external_wp_element_namespaceObject.useEffect)(function () {
    var style = document.createElement('style');
    style.textContent = post_lookup_styles;
    document.head.appendChild(style);
    return function () {
      document.head.removeChild(style);
    };
  });
  // HANDLERS ============= ============= =============
  var handleInputChange = (0,external_wp_element_namespaceObject.useCallback)(function (value) {
    setSearchTerm(value);
  }, []);
  var handleSelectPost = function (postId) {
    updateSelectedPostId(postId);
    setSearchTerm(null);
  };
  // JSX ============= ============= =============
  return (0,external_ReactJSXRuntime_namespaceObject.jsxs)("div", {
    className: "coco__post-lookup",
    children: [(0,external_ReactJSXRuntime_namespaceObject.jsx)("div", {
      className: "post-lookup__preview",
      children: !selectedPostId ? (0,external_ReactJSXRuntime_namespaceObject.jsx)("p", {
        children: "No post selected"
      }) : (0,external_ReactJSXRuntime_namespaceObject.jsx)("p", {
        children: "\u00A0"
      })
    }), selectedPostId && (selectedPostObject === null || selectedPostObject === void 0 ? void 0 : selectedPostObject.id) && searchTerm === null ? (0,external_ReactJSXRuntime_namespaceObject.jsxs)("div", {
      className: "post-lookup__preview",
      children: [(0,external_ReactJSXRuntime_namespaceObject.jsx)("p", {
        children: "SELECTED POST:"
      }), (0,external_ReactJSXRuntime_namespaceObject.jsxs)("div", {
        className: "post-lookup__inner-row",
        children: [(0,external_ReactJSXRuntime_namespaceObject.jsxs)("button", {
          className: "button--unstyled",
          onClick: function () {
            setSearchTerm('');
            setTimeout(function () {
              var _a;
              return (_a = textControlRef.current) === null || _a === void 0 ? void 0 : _a.focus();
            }, 500);
          },
          children: [(0,external_ReactJSXRuntime_namespaceObject.jsx)("span", {
            className: "dashicons dashicons-edit"
          }), selectedPostObject.title.rendered]
        }), selectedPostId && selectedPostId > 0 ? (0,external_ReactJSXRuntime_namespaceObject.jsx)(XButton, {
          onClick: function () {
            return props.updateSelectedPostId(0);
          }
        }) : '']
      })]
    }) : (0,external_ReactJSXRuntime_namespaceObject.jsxs)(external_ReactJSXRuntime_namespaceObject.Fragment, {
      children: [(0,external_ReactJSXRuntime_namespaceObject.jsx)(external_wp_components_namespaceObject.TextControl, {
        label: (0,external_wp_i18n_namespaceObject.__)('Search for a post', 'coco'),
        value: searchTerm || '',
        onChange: handleInputChange,
        placeholder: (0,external_wp_i18n_namespaceObject.__)('Search…', 'coco'),
        ref: textControlRef
      }), selectedPostId && selectedPostId > 0 ? (0,external_ReactJSXRuntime_namespaceObject.jsx)(XButton, {
        onClick: function () {
          return setSearchTerm(null);
        }
      }) : null, loading && (0,external_ReactJSXRuntime_namespaceObject.jsx)(external_wp_components_namespaceObject.Spinner, {}), error && (0,external_ReactJSXRuntime_namespaceObject.jsx)("div", {
        className: "notice notice-error",
        children: (0,external_ReactJSXRuntime_namespaceObject.jsx)("p", {
          children: (0,external_wp_i18n_namespaceObject.__)('Error:', 'coco') + error
        })
      }), postResults.length > 0 && (0,external_ReactJSXRuntime_namespaceObject.jsx)("ul", {
        children: postResults.map(function (post) {
          return (0,external_ReactJSXRuntime_namespaceObject.jsx)("li", {
            children: (0,external_ReactJSXRuntime_namespaceObject.jsx)("button", {
              className: "button--unstyled",
              onClick: function () {
                return handleSelectPost(post.id);
              },
              children: post.title.rendered
            })
          }, post.id);
        })
      }), selectedPostId ? (0,external_ReactJSXRuntime_namespaceObject.jsxs)("p", {
        children: [" ", (0,external_wp_i18n_namespaceObject.__)('Selected post ID:', 'coco') + selectedPostId, " "]
      }) : null]
    })]
  });
};
/* harmony default export */ const post_lookup_PostLookup = (PostLookup);
;// ./src/post-lookup/index.ts
// Starting point for our PostLookup component.

/* harmony default export */ const post_lookup = (post_lookup_PostLookup);
__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});