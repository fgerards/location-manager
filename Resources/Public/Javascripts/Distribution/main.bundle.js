/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/typo3conf/ext/location_manager/Resources/Public/Javascripts/Distribution/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 59);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 1 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.3' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(30)('wks');
var uid = __webpack_require__(22);
var Symbol = __webpack_require__(0).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(90);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(10);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(5);
var IE8_DOM_DEFINE = __webpack_require__(39);
var toPrimitive = __webpack_require__(27);
var dP = Object.defineProperty;

exports.f = __webpack_require__(7) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(15)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var core = __webpack_require__(1);
var ctx = __webpack_require__(18);
var hide = __webpack_require__(9);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(6);
var createDesc = __webpack_require__(20);
module.exports = __webpack_require__(7) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 11 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(64);
var defined = __webpack_require__(25);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.throttle = throttle;
/**
 * @description in case of a "storm of events", this executes once every $threshold
 * @summary
 * Returns a function that is executed at most every x milliseconds.
 * If it is called more often, then the calls are ignored.
 *
 * This is usefull, when binding methods to events that can fire very often
 * (e.g. `scroll` or `mousemove`).
 *
 * To aim for a FPS of 60, set the threshold to 16ms.
 *
 * NOTE: When using this method for performance improvements when animating,
 *       consider using `requestAnimationFrame` instead.
 *
 * @example
 * import { throttle } from '@nimius/event-utility'
 *
 * // Update the position at most every 16ms
 * container.addEventListener('mousemove', throttle(
 *    () => updatePosition(),
 *    16
 * ));
 *
 * @example
 * import { throttle } from '@nimius/event-utility'
 *
 * // Do not fetch new articles on every event
 * window.addEventListener('scroll', throttle(
 *    () => fetchMoreArticles(),
 *    500
 * ));
 *
 * @param {Function} func - The function that should be throttled.
 * @param {number} threshhold - Number of milliseconds at which execution of the
 *        function should be capped.
 * @returns {Function}
 */
function throttle(func, threshhold) {
    threshhold || (threshhold = 250);
    var last = void 0,
        deferTimer = void 0;
    return function () {
        var now = +new Date(),
            args = arguments;
        if (last && now < last + threshhold) {
            // hold on to it
            clearTimeout(deferTimer);
            deferTimer = setTimeout(function () {
                last = now;
                func.apply(null, args);
            }, threshhold);
        } else {
            last = now;
            func.apply(null, args);
        }
    };
}

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(19);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(42);
var enumBugKeys = __webpack_require__(31);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 22 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(6).f;
var has = __webpack_require__(11);
var TAG = __webpack_require__(2)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(61);
var global = __webpack_require__(0);
var hide = __webpack_require__(9);
var Iterators = __webpack_require__(13);
var TO_STRING_TAG = __webpack_require__(2)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 25 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(10);
var document = __webpack_require__(0).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(10);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 28 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(30)('keys');
var uid = __webpack_require__(22);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 31 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(70)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(38)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(19);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(2);


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var core = __webpack_require__(1);
var LIBRARY = __webpack_require__(17);
var wksExt = __webpack_require__(34);
var defineProperty = __webpack_require__(6).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 36 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(60), __esModule: true };

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(17);
var $export = __webpack_require__(8);
var redefine = __webpack_require__(40);
var hide = __webpack_require__(9);
var has = __webpack_require__(11);
var Iterators = __webpack_require__(13);
var $iterCreate = __webpack_require__(65);
var setToStringTag = __webpack_require__(23);
var getPrototypeOf = __webpack_require__(69);
var ITERATOR = __webpack_require__(2)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = (!BUGGY && $native) || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(7) && !__webpack_require__(15)(function () {
  return Object.defineProperty(__webpack_require__(26)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(9);


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(5);
var dPs = __webpack_require__(66);
var enumBugKeys = __webpack_require__(31);
var IE_PROTO = __webpack_require__(29)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(26)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(44).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(11);
var toIObject = __webpack_require__(12);
var arrayIndexOf = __webpack_require__(67)(false);
var IE_PROTO = __webpack_require__(29)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(28);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(0).document;
module.exports = document && document.documentElement;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(25);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(47);
var ITERATOR = __webpack_require__(2)('iterator');
var Iterators = __webpack_require__(13);
module.exports = __webpack_require__(1).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(14);
var TAG = __webpack_require__(2)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(73), __esModule: true };

/***/ }),
/* 49 */
/***/ (function(module, exports) {



/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(5);
var aFunction = __webpack_require__(19);
var SPECIES = __webpack_require__(2)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(18);
var invoke = __webpack_require__(83);
var html = __webpack_require__(44);
var cel = __webpack_require__(26);
var global = __webpack_require__(0);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(14)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(5);
var isObject = __webpack_require__(10);
var newPromiseCapability = __webpack_require__(33);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 54 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(42);
var hiddenKeys = __webpack_require__(31).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfoWindowController = undefined;

var _classCallCheck2 = __webpack_require__(3);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(4);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @typedef {Object} InfoWindowController~settings
 * @property {string} [selector = '.js-infoWindow'] - selector that is used to get the content of the infowindow inside of the marker list element
 */

/**
 * Implements the InfoWindow popup
 *
 * @implements LocationManagerControllerInterface
 */

var InfoWindowController = exports.InfoWindowController = function () {

  /**
   * @param {InfoWindowController~settings} settings
   */


  /**
   * @type {LocationManager}
   */


  /**
   * @type {google.maps.InfoWindow}
   */
  function InfoWindowController(settings) {
    (0, _classCallCheck3.default)(this, InfoWindowController);

    settings = settings || {};
    settings.selector = settings.selector || '.location-manager__location__info-window';

    this.settings = settings;
  }

  /**
   * @param {LocationManager} locationManager
   */


  /**
   * @type {LocationManager~marker}
   */


  /**
   * @type {InfoWindowController~settings}
   */


  (0, _createClass3.default)(InfoWindowController, [{
    key: 'init',
    value: function init(locationManager) {
      this.locationManager = locationManager;

      // initialize infowindow
      this.infoWindow = new google.maps.InfoWindow({ content: '' });
      this.infoWindow.addListener('closeclick', this.onInfoWindowClose.bind(this));
    }

    /**
     * @param {LocationManager~marker} marker
     * @param {boolean} doNotFilterList
     */

  }, {
    key: 'onMarkerClick',
    value: function onMarkerClick(marker, doNotFilterList) {
      this.addCurrentMarkerToClusterer();

      this.locationManager._markerClusterer.removeMarker(marker.marker);
      marker.marker.setMap(this.locationManager.map);
      this.currentMarker = marker;

      if (this.locationManager.map.getZoom() < 10) {
        this.locationManager.map.setZoom(10);
      }
      this.locationManager.map.panTo(marker.marker.getPosition());
      this.infoWindow.setContent(marker.element.querySelector(this.settings.selector).innerHTML);
      this.infoWindow.open(this.locationManager.map, marker.marker);

      if (!doNotFilterList) {
        this.locationManager.marker.forEach(function (marker) {
          marker.showInList = false;
        });
        marker.showInList = true;
        this.locationManager.updateList();
      }
    }

    /**
     * Callback that is executed, when the InfoWindow is closed.
     */

  }, {
    key: 'onInfoWindowClose',
    value: function onInfoWindowClose() {
      this.addCurrentMarkerToClusterer();
    }
  }, {
    key: 'addCurrentMarkerToClusterer',
    value: function addCurrentMarkerToClusterer() {
      if (!this.currentMarker) {
        return;
      }
      this.locationManager._markerClusterer.addMarker(this.currentMarker.marker);
      this.currentMarker = null;
    }
  }, {
    key: 'onMapMove',
    value: function onMapMove() {}
  }, {
    key: 'preprocess',
    value: function preprocess() {}
  }]);
  return InfoWindowController;
}();

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RefreshListOnMoveController = undefined;

var _classCallCheck2 = __webpack_require__(3);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(4);

var _createClass3 = _interopRequireDefault(_createClass2);

var _EventHelpers = __webpack_require__(16);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Hides locations in the list that are not inside of the current map bounds
 *
 * @implements {LocationManagerControllerInterface}
 */

var RefreshListOnMoveController = exports.RefreshListOnMoveController = function () {

  /**
   * @param {RefreshListOnMoveController~settings} settings
   */
  function RefreshListOnMoveController(settings) {
    var _this = this;

    (0, _classCallCheck3.default)(this, RefreshListOnMoveController);

    settings = settings || {};
    settings.throttle = settings.throttle || 250;

    this._hideInListDebounced = (0, _EventHelpers.throttle)(function () {
      return _this.hideInList;
    }, settings.throttle);
  }

  /**
   * @param {LocationManager} locationManager
   */


  (0, _createClass3.default)(RefreshListOnMoveController, [{
    key: "init",
    value: function init(locationManager) {
      this._locationManager = locationManager;
    }
  }, {
    key: "onMarkerClick",
    value: function onMarkerClick() {}
  }, {
    key: "preprocess",
    value: function preprocess() {}
  }, {
    key: "onMapMove",
    value: function onMapMove() {
      this._hideInListDebounced();
    }

    /**
     * @type {LocationManager}
     */


    /**
     * Throttled version of {@link RefreshListOnMoveController#hideInList}
     * @type {Function}
     * @private
     */

  }, {
    key: "hideInList",


    /**
     * Hides the elements in the list that are outside of the bounds
     */
    value: function hideInList() {
      var bounds = this._locationManager.map.getBounds();
      this._locationManager.marker.forEach(function (marker) {
        marker.showInList = marker.showOnMap && bounds.contains(marker.marker.getPosition());
      });
      this._locationManager.updateList();
    }
  }]);
  return RefreshListOnMoveController;
}(); /**
      * @typedef {Object} RefreshListOnMoveController~settings
      * @property {number} [throttle = 250] - The amount of throttling to apply
      */

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HideMapOnMobileController = undefined;

var _classCallCheck2 = __webpack_require__(3);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(4);

var _createClass3 = _interopRequireDefault(_createClass2);

var _EventHelpers = __webpack_require__(16);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Hides the map on mobile devices.
 * Note: In order to preserve functionality on mobile devices, the map is note actually hidden,
 *       moved outside of the viewport
 *
 * @implements LocationManagerControllerInterface
 */

var HideMapOnMobileController = exports.HideMapOnMobileController = function () {

    /**
     * @param {HideMapOnMobileController~settings} settings
     */


    /**
     * @type {HTMLElement}
     */
    function HideMapOnMobileController(settings) {
        var _this = this;

        (0, _classCallCheck3.default)(this, HideMapOnMobileController);

        settings = settings || {};
        settings.threshold = settings.threshold || 768;
        settings.throttle = settings.throttle || 300;

        this.mapContainer = document.querySelector(settings.mapContainer);

        this.settings = settings;

        if (settings.throttle) {
            this._onWindowResizeThrottled = (0, _EventHelpers.throttle)(function () {
                return _this.onWindowResize;
            }, settings.throttle);
        } else {
            this._onWindowResizeThrottled = this.onWindowResize;
        }
    }

    /**
     * @param {LocationManager} locationManager
     */


    /**
     * @type {Function}
     */


    /**
     * @type {HideMapOnMobileController~settings}
     */


    (0, _createClass3.default)(HideMapOnMobileController, [{
        key: 'init',
        value: function init(locationManager) {
            if (!this.mapContainer) {
                this.mapContainer = locationManager._settings.mapContainer;
            }

            window.addEventListener('resize', this._onWindowResizeThrottled.bind(this, null));
            this.onWindowResize();
        }

        /**
         * Method that is being called, every time the window is being resized.
         * The windowWidth parameter was added to improve testability
         *
         * @param {number} [windowWidth] - current width of the window. Defaults to window.innerWidth
         */

    }, {
        key: 'onWindowResize',
        value: function onWindowResize(windowWidth) {
            windowWidth = windowWidth || window.innerWidth;

            if (windowWidth < this.settings.threshold) {
                // mobile
                this.hideMap();
            } else {
                // desktop
                this.showMap();
            }
        }
    }, {
        key: 'showMap',
        value: function showMap() {
            this.mapContainer.style.position = '';
            this.mapContainer.style.left = '';
        }
    }, {
        key: 'hideMap',
        value: function hideMap() {
            this.mapContainer.style.position = 'absolute';
            this.mapContainer.style.left = '-9999px';
        }

        /**
         * Checks whether or not the map is currently being displayed.
         * @return {boolean}
         */

    }, {
        key: 'isMapShown',
        value: function isMapShown() {
            return this.mapContainer.getBoundingClientRect().left > -9000;
        }
    }, {
        key: 'onMapMove',
        value: function onMapMove() {}
    }, {
        key: 'onMarkerClick',
        value: function onMarkerClick() {}
    }, {
        key: 'preprocess',
        value: function preprocess() {}
    }]);
    return HideMapOnMobileController;
}(); /**
      * @typedef {Object} HideMapOnMobileController~settings
      * @property {number} [threshold = 768]
      * @property {number} [throttle = 300]
      * @property {string} [mapContainer]
      */

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getIterator2 = __webpack_require__(37);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _LocationManager = __webpack_require__(72);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = (0, _getIterator3.default)(document.querySelectorAll('[data-location-manager]')), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var container = _step.value;

            var config = JSON.parse(container.getAttribute('data-location-manager'));
            new _LocationManager.LocationManager(config);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
});

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(24);
__webpack_require__(32);
module.exports = __webpack_require__(71);


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(62);
var step = __webpack_require__(63);
var Iterators = __webpack_require__(13);
var toIObject = __webpack_require__(12);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(38)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 62 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 63 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(14);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(41);
var descriptor = __webpack_require__(20);
var setToStringTag = __webpack_require__(23);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(9)(IteratorPrototype, __webpack_require__(2)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(6);
var anObject = __webpack_require__(5);
var getKeys = __webpack_require__(21);

module.exports = __webpack_require__(7) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(12);
var toLength = __webpack_require__(43);
var toAbsoluteIndex = __webpack_require__(68);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(28);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(11);
var toObject = __webpack_require__(45);
var IE_PROTO = __webpack_require__(29)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(28);
var defined = __webpack_require__(25);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(5);
var get = __webpack_require__(46);
module.exports = __webpack_require__(1).getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LocationManager = undefined;

var _keys = __webpack_require__(48);

var _keys2 = _interopRequireDefault(_keys);

var _getIterator2 = __webpack_require__(37);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _promise = __webpack_require__(76);

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = __webpack_require__(3);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(4);

var _createClass3 = _interopRequireDefault(_createClass2);

var _EventHelpers = __webpack_require__(16);

var _jsMarkerClusterer = __webpack_require__(93);

var _jsMarkerClusterer2 = _interopRequireDefault(_jsMarkerClusterer);

var _LocationManagerControllerFactory = __webpack_require__(94);

var _ObjectUtility = __webpack_require__(95);

var _DynamicMarkerImageController = __webpack_require__(109);

var _InfoWindowController = __webpack_require__(56);

var _RefreshListOnMoveController = __webpack_require__(57);

var _ShowOnClickController = __webpack_require__(110);

var _SortByDistanceController = __webpack_require__(111);

var _ClickToEnableController = __webpack_require__(112);

var _HideMapOnMobileController = __webpack_require__(58);

var _AutocompletedSearchController = __webpack_require__(113);

var _TagFilterController = __webpack_require__(117);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Default controller setup
 */
_LocationManagerControllerFactory.LocationManagerControllerFactory.register('autocompletedSearch', _AutocompletedSearchController.AutocompletedSearchController); /**
                                                                                                                                                                   * @typedef {Object} LocationManager~settings
                                                                                                                                                                   * @property {Element|string} mapContainer - The container, that the map will be rendered in
                                                                                                                                                                   * @property {google.maps.MapOptions} [mapOptions] - Additional options for google maps
                                                                                                                                                                   *           see {@link https://developers.google.com/maps/documentation/javascript/reference#MapTypeId}
                                                                                                                                                                   * @property {boolean} [debug = false] - Whether or not to enable debugging
                                                                                                                                                                   * @property {Node|string} [markerContainer] - Container of the elements.
                                                                                                                                                                   * @property {NodeList|Node[]|string} [markerElements] - Elements that are used to generate markers
                                                                                                                                                                   * @property {string} [longAttribute = 'data-longitude'] - Attribute on the markerElement that contains the longitude
                                                                                                                                                                   * @property {string} [latAttribute = 'data-latitude'] - Attribute on the markerElement that contains the latitude
                                                                                                                                                                   * @property {string} [fixedAttribute = 'data-fixed'] - Attribute that determines whether or not an attribute is fixed
                                                                                                                                                                   * @property {MarkerClustererOptions} [clusterer] - Clusterer settings, set to false, if clusterer should be disabled
                                                                                                                                                                   *
                                                                                                                                                                   * @property {Object} [controllerFactory] - settings for controller initialization: The keys are names of the controllers, the
                                                                                                                                                                   *                                          values will be passed to the Constructor
                                                                                                                                                                   * @property {boolean} [centerOnMarkers = true] - Whether or not to initially adjust the zoom to include all markers. Note ,that this settings will be automatically
                                                                                                                                                                   *                                              turned on, if no map center was given
                                                                                                                                                                   * @property {string} [markerIcon] - The icon to use for the markers
                                                                                                                                                                   */

_LocationManagerControllerFactory.LocationManagerControllerFactory.register('clickToEnable', _ClickToEnableController.ClickToEnableController);
_LocationManagerControllerFactory.LocationManagerControllerFactory.register('dynamicMarkerImage', _DynamicMarkerImageController.DynamicMarkerImageController);
_LocationManagerControllerFactory.LocationManagerControllerFactory.register('hideMapOnMobile', _HideMapOnMobileController.HideMapOnMobileController);
_LocationManagerControllerFactory.LocationManagerControllerFactory.register('infoWindow', _InfoWindowController.InfoWindowController);
_LocationManagerControllerFactory.LocationManagerControllerFactory.register('refreshListOnMove', _RefreshListOnMoveController.RefreshListOnMoveController);
_LocationManagerControllerFactory.LocationManagerControllerFactory.register('showOnClick', _ShowOnClickController.ShowOnClickController);
_LocationManagerControllerFactory.LocationManagerControllerFactory.register('sortByDistance', _SortByDistanceController.SortByDistanceController);
_LocationManagerControllerFactory.LocationManagerControllerFactory.register('tagFilter', _TagFilterController.TagFilterController);

/**
 * @typedef {Object} LocationManager~marker
 * @property {HTMLElement} element - The DOM element of this marker in the DOM
 * @property {google.maps.Marker} marker - The marker object in the list
 *
 * @property {boolean} [showInList] - Whether or not the marker should be displayed in the list
 * @property {boolean} [showOnMap] - Whether or not the marker should be displayed on the map
 * @property {boolean} [fixed] - Whether or not the marker is fixed (should not be effected by sorting & hiding
 */

var LocationManager = exports.LocationManager = function () {

    /**
     * @param {LocationManager~settings} settings
     */


    /**
     * @type {google.maps.Map}
     */
    function LocationManager(settings) {
        var _this = this;

        (0, _classCallCheck3.default)(this, LocationManager);
        this.marker = [];
        this._controllers = [];

        this._settings = this._prepareSettings(settings);
        this._log(this._settings);

        this._initializeMap();
        this._initializeMarker();
        // wait for google maps initialization
        var listenerHandle = google.maps.event.addListener(this.map, 'bounds_changed', function (_) {
            _this._initializeControllers();
            google.maps.event.removeListener(listenerHandle);
        });

        if (this._settings.centerOnMarkers) {
            this.centerMapOnShownMarkers();
        }
    }

    /**
     * adjusts the map bounds in a way, that all current markers are visible
     * on the map
     * @returns {void}
     */


    /**
     * @type {LocationManager~marker[]}
     */


    (0, _createClass3.default)(LocationManager, [{
        key: "centerMapOnShownMarkers",
        value: function centerMapOnShownMarkers() {
            var bounds = new google.maps.LatLngBounds();

            this._markerClusterer.getMarkers().forEach(function (marker) {
                if (!isNaN(parseFloat(marker.getPosition().lat())) && !isNaN(parseFloat(marker.getPosition().lng()))) {
                    bounds = bounds.extend(marker.getPosition());
                }
            });

            this.map.fitBounds(bounds);
        }

        /**
         * Method that is executed everytime a user moves the map
         * @returns {void}
         */

    }, {
        key: "onMapMove",
        value: function onMapMove() {
            this._controllers.forEach(function (controller) {
                controller.onMapMove();
            });
        }

        /**
         * Method that is executed everytime a user clicks on a marker
         * @param {LocationManager~marker} marker
         */

    }, {
        key: "onMarkerClick",
        value: function onMarkerClick(marker) {
            this._log('onMarkerClick', marker);
            this._controllers.forEach(function (controller) {
                controller.onMarkerClick(marker);
            });
        }

        /**
         * Updates the marker that are visible on map
         * @returns {void}
         */

    }, {
        key: "updateMap",
        value: function updateMap() {
            this._log('updateMap');
            var markerToShow = this._getProcessedMarker().filter(function (marker) {
                return marker.showOnMap;
            }).map(function (marker) {
                return marker.marker;
            });

            this._markerClusterer.clearMarkers();
            this._markerClusterer.addMarkers(markerToShow);
        }

        /**
         * Updates the marker that should be visible in the list
         * @returns {void}
         */

    }, {
        key: "updateList",
        value: function updateList() {
            var _this2 = this;

            this._log('updateList');

            var child = void 0;
            while (child = this._settings.markerContainer.firstChild) {
                this._settings.markerContainer.removeChild(child);
            }

            this._getProcessedMarker().forEach(function (marker) {
                if (marker.fixed) {
                    return;
                }
                if (marker.showInList) {
                    _this2._settings.markerContainer.appendChild(marker.element);
                }
            });
        }

        /**
         * Adds a new controller to the LocationManager
         * @param {LocationManagerControllerInterface} controller
         */

    }, {
        key: "addController",
        value: function addController(controller) {
            this._log('addController', controller);
            this._controllers.push(controller);
            // execute init method in promise
            new _promise2.default(controller.init.bind(controller, this));
        }

        /**
         * Get's the controller with the given type that is associated with the current instance
         * Returns null, if no controller with that type was found
         *
         * @example
         * locationManager.getController(InfoWindowController)
         *
         * @returns {LocationManagerControllerInterface}
         */

    }, {
        key: "getController",
        value: function getController(Constructor) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = (0, _getIterator3.default)(this._controllers), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var controller = _step.value;

                    if (controller instanceof Constructor) {
                        return controller;
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return null;
        }

        /**
         * Prepares the settings: sets defaults and converts datatypes.
         * Returns an settings object that is usable within this class
         *
         * @param settings
         * @return {*}
         * @private
         */

    }, {
        key: "_prepareSettings",
        value: function _prepareSettings(settings) {
            settings = settings || {};
            var DEFAULTS = {
                longAttribute: 'data-longitude',
                latAttribute: 'data-latitude',
                fixedAttribute: 'data-fixed',
                mapOptions: {
                    center: {
                        lat: 47.920130,
                        lng: 7.705250
                    },
                    zoom: 10,
                    zoomControlOptions: {
                        position: google.maps.ControlPosition.RIGHT_CENTER
                    }
                },
                clusterer: {
                    gridSize: 60,
                    zoomOnClick: true,
                    styles: [{
                        url: '/typo3conf/ext/location_manager/Resources/Public/Images/Cluster.png',
                        width: 53,
                        height: 52,
                        textColor: '#000'
                    }]
                },
                controllerFactory: {},
                debug: false,
                centerOnMarkers: false
            };

            // if no correct center was given, the map will be initialized with a set of coordinates but be zoomed
            // to fit the markers right away.
            if (!settings.mapOptions || !settings.mapOptions.center || !settings.mapOptions.center.lat || !settings.mapOptions.center.lng) {
                settings.centerOnMarkers = true;
            }

            // if no correct center was given, the map will be initialized with a set of coordinates but be zoomed
            // to fit the markers right away.
            // if (!settings.mapOptions || !settings.mapOptions.center || !settings.mapOptions.center.lat || !settings.mapOptions.center.lng) {
            //    settings.zoomToMarkers = true;
            // }

            settings = (0, _ObjectUtility.applyObjectDefaults)(settings, DEFAULTS);

            // All DOM Elements in the settings can be supplied as strings which will have to be initialized
            var domSettings = ['markerElements'];
            var singleDomSettings = ['mapContainer', 'markerContainer'];

            singleDomSettings.forEach(function (setting) {
                if (typeof settings[setting] === 'string') {
                    settings[setting] = document.querySelector(settings[setting]);
                }
            });
            domSettings.forEach(function (setting) {
                if (typeof settings[setting] === 'string') {
                    settings[setting] = document.querySelectorAll(settings[setting]);
                }
            });

            if (!settings.markerContainer && !settings.markerElements) {
                throw new Error('At least one of markerContainer or markerElements must be specified');
            } else if (settings.markerElements && !settings.markerContainer) {
                settings.markerContainer = settings.markerElements[0].parentNode;
            } else if (settings.markerContainer && !settings.markerElements) {
                settings.markerElements = settings.markerContainer.childNodes;
            }

            // NodeList to Node[]
            settings.markerElements = Array.prototype.slice.call(settings.markerElements);

            return settings;
        }

        /**
         * @type {MarkerClusterer}
         */


        /**
         * @type {LocationManager~settings}
         */


        /**
         *
         * @type {LocationManagerControllerInterface[]}
         * @private
         */

    }, {
        key: "_log",


        /**
         * Simple abstraction over logging for LocationManager:
         * If the 'debug' setting is set to 'true', all arguments will be prefixed with 'LocationManager' and
         * then logged in the console
         *
         * @private
         */
        value: function _log() {
            if (!this._settings.debug) {
                return;
            }
            var args = Array.prototype.slice.call(arguments);
            args.unshift("LocationManager");
            console.log.apply(console, args);
        }

        /**
         * Initializes the map with all settings
         *
         * @private
         */

    }, {
        key: "_initializeMap",
        value: function _initializeMap() {
            var _this3 = this;

            this._log('_initializeMap', this._settings.mapContainer, this._settings.mapOptions);

            var map = new google.maps.Map(this._settings.mapContainer, this._settings.mapOptions);
            map.addListener('bounds_changed', (0, _EventHelpers.throttle)(function () {
                return _this3.onMapMove();
            }, 20));

            this.map = map;
            this._log('_initializeMap', map);
        }

        /**
         * Initializes the marker array in this._marker and the clusterer.
         *
         * @private
         */

    }, {
        key: "_initializeMarker",
        value: function _initializeMarker() {
            var _this4 = this;

            this._log('_initializeMarker');
            var googleMapsMarkers = [];

            // initialize markers
            this._settings.markerElements.forEach(function (markerElement) {
                var lat = parseFloat(markerElement.getAttribute(_this4._settings.latAttribute));
                var lng = parseFloat(markerElement.getAttribute(_this4._settings.longAttribute));

                if (isNaN(lat) || isNaN(lng)) {
                    console.warn('LocationManager', 'marker has at least one undefined coordinate', { lat: lat, lng: lng }, markerElement, _this4);
                }

                var markerSettings = {
                    map: _this4.map,
                    icon: _this4._settings.markerIcon,
                    position: {
                        lat: lat || 0,
                        lng: lng || 0
                    }
                };
                _this4._log('_initializeMarker', markerSettings);
                /**
                 * @type {LocationManager~marker}
                 */
                var marker = {
                    element: markerElement,
                    marker: new google.maps.Marker(markerSettings),
                    showOnMap: true,
                    showInList: true,
                    fixed: !!markerElement.getAttribute(_this4._settings.fixedAttribute)
                };
                marker.marker.addListener('click', function () {
                    _this4.onMarkerClick(marker);
                });
                _this4.marker.push(marker);
                googleMapsMarkers.push(marker.marker);
            });

            // initialize marker clusterer
            if (this._settings.clusterer !== false) {
                this._markerClusterer = new _jsMarkerClusterer2.default(this.map, googleMapsMarkers, this._settings.clusterer);
                this._log('_initializeMarker', this._markerClusterer);
            }
        }

        /**
         * Initializes the controllers out of the controllerFactory setting
         * @private
         */

    }, {
        key: "_initializeControllers",
        value: function _initializeControllers() {
            var _this5 = this;

            this._log('_initializeControllers');
            (0, _keys2.default)(this._settings.controllerFactory).forEach(function (name) {
                var controller = _LocationManagerControllerFactory.LocationManagerControllerFactory.make(name, _this5._settings.controllerFactory[name]);
                if (controller !== null) {
                    _this5.addController(controller);
                } else {
                    console.warn('LocationManager', 'No controller ' + name + ' exists, skipping');
                }
            });
        }

        /**
         * Returns the markers with the necessary preprocessing applied.
         * This method should never be called in the controllers themselves as this could lead to loops.
         *
         * @return {LocationManager~marker[]}
         * @private
         */

    }, {
        key: "_getProcessedMarker",
        value: function _getProcessedMarker() {
            var _this6 = this;

            this._log('_getProcessedMarker');
            this._controllers.forEach(function (controller) {
                controller.preprocess(_this6.marker);
            });

            return this.marker;
        }
    }]);
    return LocationManager;
}();

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(74);
module.exports = __webpack_require__(1).Object.keys;


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(45);
var $keys = __webpack_require__(21);

__webpack_require__(75)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(8);
var core = __webpack_require__(1);
var fails = __webpack_require__(15);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(77), __esModule: true };

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(49);
__webpack_require__(32);
__webpack_require__(24);
__webpack_require__(78);
__webpack_require__(88);
__webpack_require__(89);
module.exports = __webpack_require__(1).Promise;


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(17);
var global = __webpack_require__(0);
var ctx = __webpack_require__(18);
var classof = __webpack_require__(47);
var $export = __webpack_require__(8);
var isObject = __webpack_require__(10);
var aFunction = __webpack_require__(19);
var anInstance = __webpack_require__(79);
var forOf = __webpack_require__(80);
var speciesConstructor = __webpack_require__(50);
var task = __webpack_require__(51).set;
var microtask = __webpack_require__(84)();
var newPromiseCapabilityModule = __webpack_require__(33);
var perform = __webpack_require__(52);
var promiseResolve = __webpack_require__(53);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(2)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value);
            if (domain) domain.exit();
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(85)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(23)($Promise, PROMISE);
__webpack_require__(86)(PROMISE);
Wrapper = __webpack_require__(1)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(87)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 79 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(18);
var call = __webpack_require__(81);
var isArrayIter = __webpack_require__(82);
var anObject = __webpack_require__(5);
var toLength = __webpack_require__(43);
var getIterFn = __webpack_require__(46);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(5);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(13);
var ITERATOR = __webpack_require__(2)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 83 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var macrotask = __webpack_require__(51).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(14)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    var promise = Promise.resolve();
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(9);
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(0);
var core = __webpack_require__(1);
var dP = __webpack_require__(6);
var DESCRIPTORS = __webpack_require__(7);
var SPECIES = __webpack_require__(2)('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(2)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(8);
var core = __webpack_require__(1);
var global = __webpack_require__(0);
var speciesConstructor = __webpack_require__(50);
var promiseResolve = __webpack_require__(53);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(8);
var newPromiseCapability = __webpack_require__(33);
var perform = __webpack_require__(52);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(91), __esModule: true };

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(92);
var $Object = __webpack_require__(1).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(8);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(7), 'Object', { defineProperty: __webpack_require__(6).f });


/***/ }),
/* 93 */
/***/ (function(module, exports) {

// ==ClosureCompiler==
// @compilation_level ADVANCED_OPTIMIZATIONS
// @externs_url http://closure-compiler.googlecode.com/svn/trunk/contrib/externs/maps/google_maps_api_v3_3.js
// ==/ClosureCompiler==

/**
 * @name MarkerClusterer for Google Maps v3
 * @version version 1.0
 * @author Luke Mahe
 * @fileoverview
 * The library creates and manages per-zoom-level clusters for large amounts of
 * markers.
 * <br/>
 * This is a v3 implementation of the
 * <a href="http://gmaps-utility-library-dev.googlecode.com/svn/tags/markerclusterer/"
 * >v2 MarkerClusterer</a>.
 */

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


/**
 * A Marker Clusterer that clusters markers.
 *
 * @param {google.maps.Map} map The Google map to attach to.
 * @param {Array.<google.maps.Marker>=} opt_markers Optional markers to add to
 *   the cluster.
 * @param {Object=} opt_options support the following options:
 *     'gridSize': (number) The grid size of a cluster in pixels.
 *     'maxZoom': (number) The maximum zoom level that a marker can be part of a
 *                cluster.
 *     'zoomOnClick': (boolean) Whether the default behaviour of clicking on a
 *                    cluster is to zoom into it.
 *     'averageCenter': (boolean) Wether the center of each cluster should be
 *                      the average of all markers in the cluster.
 *     'minimumClusterSize': (number) The minimum number of markers to be in a
 *                           cluster before the markers are hidden and a count
 *                           is shown.
 *     'styles': (object) An object that has style properties:
 *       'url': (string) The image url.
 *       'height': (number) The image height.
 *       'width': (number) The image width.
 *       'anchor': (Array) The anchor position of the label text.
 *       'textColor': (string) The text color.
 *       'textSize': (number) The text size.
 *       'backgroundPosition': (string) The position of the backgound x, y.
 *       'iconAnchor': (Array) The anchor position of the icon x, y.
 * @constructor
 * @extends google.maps.OverlayView
 */
function MarkerClusterer(map, opt_markers, opt_options) {
  // MarkerClusterer implements google.maps.OverlayView interface. We use the
  // extend function to extend MarkerClusterer with google.maps.OverlayView
  // because it might not always be available when the code is defined so we
  // look for it at the last possible moment. If it doesn't exist now then
  // there is no point going ahead :)
  this.extend(MarkerClusterer, google.maps.OverlayView);
  this.map_ = map;

  /**
   * @type {Array.<google.maps.Marker>}
   * @private
   */
  this.markers_ = [];

  /**
   *  @type {Array.<Cluster>}
   */
  this.clusters_ = [];

  this.sizes = [53, 56, 66, 78, 90];

  /**
   * @private
   */
  this.styles_ = [];

  /**
   * @type {boolean}
   * @private
   */
  this.ready_ = false;

  var options = opt_options || {};

  /**
   * @type {number}
   * @private
   */
  this.gridSize_ = options['gridSize'] || 60;

  /**
   * @private
   */
  this.minClusterSize_ = options['minimumClusterSize'] || 2;


  /**
   * @type {?number}
   * @private
   */
  this.maxZoom_ = options['maxZoom'] || null;

  this.styles_ = options['styles'] || [];

  /**
   * @type {string}
   * @private
   */
  this.imagePath_ = options['imagePath'] ||
      this.MARKER_CLUSTER_IMAGE_PATH_;

  /**
   * @type {string}
   * @private
   */
  this.imageExtension_ = options['imageExtension'] ||
      this.MARKER_CLUSTER_IMAGE_EXTENSION_;

  /**
   * @type {boolean}
   * @private
   */
  this.zoomOnClick_ = true;

  if (options['zoomOnClick'] != undefined) {
    this.zoomOnClick_ = options['zoomOnClick'];
  }

  /**
   * @type {boolean}
   * @private
   */
  this.averageCenter_ = false;

  if (options['averageCenter'] != undefined) {
    this.averageCenter_ = options['averageCenter'];
  }

  this.setupStyles_();

  this.setMap(map);

  /**
   * @type {number}
   * @private
   */
  this.prevZoom_ = this.map_.getZoom();

  // Add the map event listeners
  var that = this;
  google.maps.event.addListener(this.map_, 'zoom_changed', function() {
    var zoom = that.map_.getZoom();

    if (that.prevZoom_ != zoom) {
      that.prevZoom_ = zoom;
      that.resetViewport();
    }
  });

  google.maps.event.addListener(this.map_, 'idle', function() {
    that.redraw();
  });

  // Finally, add the markers
  if (opt_markers && opt_markers.length) {
    this.addMarkers(opt_markers, false);
  }
}


/**
 * The marker cluster image path.
 *
 * @type {string}
 * @private
 */
MarkerClusterer.prototype.MARKER_CLUSTER_IMAGE_PATH_ =
    'http://google-maps-utility-library-v3.googlecode.com/svn/trunk/markerclusterer/' +
    'images/m';


/**
 * The marker cluster image path.
 *
 * @type {string}
 * @private
 */
MarkerClusterer.prototype.MARKER_CLUSTER_IMAGE_EXTENSION_ = 'png';


/**
 * Extends a objects prototype by anothers.
 *
 * @param {Object} obj1 The object to be extended.
 * @param {Object} obj2 The object to extend with.
 * @return {Object} The new extended object.
 * @ignore
 */
MarkerClusterer.prototype.extend = function(obj1, obj2) {
  return (function(object) {
    for (var property in object.prototype) {
      this.prototype[property] = object.prototype[property];
    }
    return this;
  }).apply(obj1, [obj2]);
};


/**
 * Implementaion of the interface method.
 * @ignore
 */
MarkerClusterer.prototype.onAdd = function() {
  this.setReady_(true);
};

/**
 * Implementaion of the interface method.
 * @ignore
 */
MarkerClusterer.prototype.draw = function() {};

/**
 * Sets up the styles object.
 *
 * @private
 */
MarkerClusterer.prototype.setupStyles_ = function() {
  if (this.styles_.length) {
    return;
  }

  for (var i = 0, size; size = this.sizes[i]; i++) {
    this.styles_.push({
      url: this.imagePath_ + (i + 1) + '.' + this.imageExtension_,
      height: size,
      width: size
    });
  }
};

/**
 *  Fit the map to the bounds of the markers in the clusterer.
 */
MarkerClusterer.prototype.fitMapToMarkers = function() {
  var markers = this.getMarkers();
  var bounds = new google.maps.LatLngBounds();
  for (var i = 0, marker; marker = markers[i]; i++) {
    bounds.extend(marker.getPosition());
  }

  this.map_.fitBounds(bounds);
};


/**
 *  Sets the styles.
 *
 *  @param {Object} styles The style to set.
 */
MarkerClusterer.prototype.setStyles = function(styles) {
  this.styles_ = styles;
};


/**
 *  Gets the styles.
 *
 *  @return {Object} The styles object.
 */
MarkerClusterer.prototype.getStyles = function() {
  return this.styles_;
};


/**
 * Whether zoom on click is set.
 *
 * @return {boolean} True if zoomOnClick_ is set.
 */
MarkerClusterer.prototype.isZoomOnClick = function() {
  return this.zoomOnClick_;
};

/**
 * Whether average center is set.
 *
 * @return {boolean} True if averageCenter_ is set.
 */
MarkerClusterer.prototype.isAverageCenter = function() {
  return this.averageCenter_;
};


/**
 *  Returns the array of markers in the clusterer.
 *
 *  @return {Array.<google.maps.Marker>} The markers.
 */
MarkerClusterer.prototype.getMarkers = function() {
  return this.markers_;
};


/**
 *  Returns the number of markers in the clusterer
 *
 *  @return {Number} The number of markers.
 */
MarkerClusterer.prototype.getTotalMarkers = function() {
  return this.markers_.length;
};


/**
 *  Sets the max zoom for the clusterer.
 *
 *  @param {number} maxZoom The max zoom level.
 */
MarkerClusterer.prototype.setMaxZoom = function(maxZoom) {
  this.maxZoom_ = maxZoom;
};


/**
 *  Gets the max zoom for the clusterer.
 *
 *  @return {number} The max zoom level.
 */
MarkerClusterer.prototype.getMaxZoom = function() {
  return this.maxZoom_;
};


/**
 *  The function for calculating the cluster icon image.
 *
 *  @param {Array.<google.maps.Marker>} markers The markers in the clusterer.
 *  @param {number} numStyles The number of styles available.
 *  @return {Object} A object properties: 'text' (string) and 'index' (number).
 *  @private
 */
MarkerClusterer.prototype.calculator_ = function(markers, numStyles) {
  var index = 0;
  var count = markers.length;
  var dv = count;
  while (dv !== 0) {
    dv = parseInt(dv / 10, 10);
    index++;
  }

  index = Math.min(index, numStyles);
  return {
    text: count,
    index: index
  };
};


/**
 * Set the calculator function.
 *
 * @param {function(Array, number)} calculator The function to set as the
 *     calculator. The function should return a object properties:
 *     'text' (string) and 'index' (number).
 *
 */
MarkerClusterer.prototype.setCalculator = function(calculator) {
  this.calculator_ = calculator;
};


/**
 * Get the calculator function.
 *
 * @return {function(Array, number)} the calculator function.
 */
MarkerClusterer.prototype.getCalculator = function() {
  return this.calculator_;
};


/**
 * Add an array of markers to the clusterer.
 *
 * @param {Array.<google.maps.Marker>} markers The markers to add.
 * @param {boolean=} opt_nodraw Whether to redraw the clusters.
 */
MarkerClusterer.prototype.addMarkers = function(markers, opt_nodraw) {
  for (var i = 0, marker; marker = markers[i]; i++) {
    this.pushMarkerTo_(marker);
  }
  if (!opt_nodraw) {
    this.redraw();
  }
};


/**
 * Pushes a marker to the clusterer.
 *
 * @param {google.maps.Marker} marker The marker to add.
 * @private
 */
MarkerClusterer.prototype.pushMarkerTo_ = function(marker) {
  marker.isAdded = false;
  if (marker['draggable']) {
    // If the marker is draggable add a listener so we update the clusters on
    // the drag end.
    var that = this;
    google.maps.event.addListener(marker, 'dragend', function() {
      marker.isAdded = false;
      that.repaint();
    });
  }
  this.markers_.push(marker);
};


/**
 * Adds a marker to the clusterer and redraws if needed.
 *
 * @param {google.maps.Marker} marker The marker to add.
 * @param {boolean=} opt_nodraw Whether to redraw the clusters.
 */
MarkerClusterer.prototype.addMarker = function(marker, opt_nodraw) {
  this.pushMarkerTo_(marker);
  if (!opt_nodraw) {
    this.redraw();
  }
};


/**
 * Removes a marker and returns true if removed, false if not
 *
 * @param {google.maps.Marker} marker The marker to remove
 * @return {boolean} Whether the marker was removed or not
 * @private
 */
MarkerClusterer.prototype.removeMarker_ = function(marker) {
  var index = -1;
  if (this.markers_.indexOf) {
    index = this.markers_.indexOf(marker);
  } else {
    for (var i = 0, m; m = this.markers_[i]; i++) {
      if (m == marker) {
        index = i;
        break;
      }
    }
  }

  if (index == -1) {
    // Marker is not in our list of markers.
    return false;
  }

  marker.setMap(null);

  this.markers_.splice(index, 1);

  return true;
};


/**
 * Remove a marker from the cluster.
 *
 * @param {google.maps.Marker} marker The marker to remove.
 * @param {boolean=} opt_nodraw Optional boolean to force no redraw.
 * @return {boolean} True if the marker was removed.
 */
MarkerClusterer.prototype.removeMarker = function(marker, opt_nodraw) {
  var removed = this.removeMarker_(marker);

  if (!opt_nodraw && removed) {
    this.resetViewport();
    this.redraw();
    return true;
  } else {
   return false;
  }
};


/**
 * Removes an array of markers from the cluster.
 *
 * @param {Array.<google.maps.Marker>} markers The markers to remove.
 * @param {boolean=} opt_nodraw Optional boolean to force no redraw.
 */
MarkerClusterer.prototype.removeMarkers = function(markers, opt_nodraw) {
  var removed = false;

  for (var i = 0, marker; marker = markers[i]; i++) {
    var r = this.removeMarker_(marker);
    removed = removed || r;
  }

  if (!opt_nodraw && removed) {
    this.resetViewport();
    this.redraw();
    return true;
  }
};


/**
 * Sets the clusterer's ready state.
 *
 * @param {boolean} ready The state.
 * @private
 */
MarkerClusterer.prototype.setReady_ = function(ready) {
  if (!this.ready_) {
    this.ready_ = ready;
    this.createClusters_();
  }
};


/**
 * Returns the number of clusters in the clusterer.
 *
 * @return {number} The number of clusters.
 */
MarkerClusterer.prototype.getTotalClusters = function() {
  return this.clusters_.length;
};


/**
 * Returns the google map that the clusterer is associated with.
 *
 * @return {google.maps.Map} The map.
 */
MarkerClusterer.prototype.getMap = function() {
  return this.map_;
};


/**
 * Sets the google map that the clusterer is associated with.
 *
 * @param {google.maps.Map} map The map.
 */
MarkerClusterer.prototype.setMap = function(map) {
  this.map_ = map;
};


/**
 * Returns the size of the grid.
 *
 * @return {number} The grid size.
 */
MarkerClusterer.prototype.getGridSize = function() {
  return this.gridSize_;
};


/**
 * Sets the size of the grid.
 *
 * @param {number} size The grid size.
 */
MarkerClusterer.prototype.setGridSize = function(size) {
  this.gridSize_ = size;
};


/**
 * Returns the min cluster size.
 *
 * @return {number} The grid size.
 */
MarkerClusterer.prototype.getMinClusterSize = function() {
  return this.minClusterSize_;
};

/**
 * Sets the min cluster size.
 *
 * @param {number} size The grid size.
 */
MarkerClusterer.prototype.setMinClusterSize = function(size) {
  this.minClusterSize_ = size;
};


/**
 * Extends a bounds object by the grid size.
 *
 * @param {google.maps.LatLngBounds} bounds The bounds to extend.
 * @return {google.maps.LatLngBounds} The extended bounds.
 */
MarkerClusterer.prototype.getExtendedBounds = function(bounds) {
  var projection = this.getProjection();

  // Turn the bounds into latlng.
  var tr = new google.maps.LatLng(bounds.getNorthEast().lat(),
      bounds.getNorthEast().lng());
  var bl = new google.maps.LatLng(bounds.getSouthWest().lat(),
      bounds.getSouthWest().lng());

  // Convert the points to pixels and the extend out by the grid size.
  var trPix = projection.fromLatLngToDivPixel(tr);
  trPix.x += this.gridSize_;
  trPix.y -= this.gridSize_;

  var blPix = projection.fromLatLngToDivPixel(bl);
  blPix.x -= this.gridSize_;
  blPix.y += this.gridSize_;

  // Convert the pixel points back to LatLng
  var ne = projection.fromDivPixelToLatLng(trPix);
  var sw = projection.fromDivPixelToLatLng(blPix);

  // Extend the bounds to contain the new bounds.
  bounds.extend(ne);
  bounds.extend(sw);

  return bounds;
};


/**
 * Determins if a marker is contained in a bounds.
 *
 * @param {google.maps.Marker} marker The marker to check.
 * @param {google.maps.LatLngBounds} bounds The bounds to check against.
 * @return {boolean} True if the marker is in the bounds.
 * @private
 */
MarkerClusterer.prototype.isMarkerInBounds_ = function(marker, bounds) {
  return bounds.contains(marker.getPosition());
};


/**
 * Clears all clusters and markers from the clusterer.
 */
MarkerClusterer.prototype.clearMarkers = function() {
  this.resetViewport(true);

  // Set the markers a empty array.
  this.markers_ = [];
};


/**
 * Clears all existing clusters and recreates them.
 * @param {boolean} opt_hide To also hide the marker.
 */
MarkerClusterer.prototype.resetViewport = function(opt_hide) {
  // Remove all the clusters
  for (var i = 0, cluster; cluster = this.clusters_[i]; i++) {
    cluster.remove();
  }

  // Reset the markers to not be added and to be invisible.
  for (var i = 0, marker; marker = this.markers_[i]; i++) {
    marker.isAdded = false;
    if (opt_hide) {
      marker.setMap(null);
    }
  }

  this.clusters_ = [];
};

/**
 *
 */
MarkerClusterer.prototype.repaint = function() {
  var oldClusters = this.clusters_.slice();
  this.clusters_.length = 0;
  this.resetViewport();
  this.redraw();

  // Remove the old clusters.
  // Do it in a timeout so the other clusters have been drawn first.
  window.setTimeout(function() {
    for (var i = 0, cluster; cluster = oldClusters[i]; i++) {
      cluster.remove();
    }
  }, 0);
};


/**
 * Redraws the clusters.
 */
MarkerClusterer.prototype.redraw = function() {
  this.createClusters_();
};


/**
 * Calculates the distance between two latlng locations in km.
 * @see http://www.movable-type.co.uk/scripts/latlong.html
 *
 * @param {google.maps.LatLng} p1 The first lat lng point.
 * @param {google.maps.LatLng} p2 The second lat lng point.
 * @return {number} The distance between the two points in km.
 * @private
*/
MarkerClusterer.prototype.distanceBetweenPoints_ = function(p1, p2) {
  if (!p1 || !p2) {
    return 0;
  }

  var R = 6371; // Radius of the Earth in km
  var dLat = (p2.lat() - p1.lat()) * Math.PI / 180;
  var dLon = (p2.lng() - p1.lng()) * Math.PI / 180;
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(p1.lat() * Math.PI / 180) * Math.cos(p2.lat() * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
};


/**
 * Add a marker to a cluster, or creates a new cluster.
 *
 * @param {google.maps.Marker} marker The marker to add.
 * @private
 */
MarkerClusterer.prototype.addToClosestCluster_ = function(marker) {
  var distance = 40000; // Some large number
  var clusterToAddTo = null;
  var pos = marker.getPosition();
  for (var i = 0, cluster; cluster = this.clusters_[i]; i++) {
    var center = cluster.getCenter();
    if (center) {
      var d = this.distanceBetweenPoints_(center, marker.getPosition());
      if (d < distance) {
        distance = d;
        clusterToAddTo = cluster;
      }
    }
  }

  if (clusterToAddTo && clusterToAddTo.isMarkerInClusterBounds(marker)) {
    clusterToAddTo.addMarker(marker);
  } else {
    var cluster = new Cluster(this);
    cluster.addMarker(marker);
    this.clusters_.push(cluster);
  }
};


/**
 * Creates the clusters.
 *
 * @private
 */
MarkerClusterer.prototype.createClusters_ = function() {
  if (!this.ready_) {
    return;
  }

  // Get our current map view bounds.
  // Create a new bounds object so we don't affect the map.
  var mapBounds = new google.maps.LatLngBounds(this.map_.getBounds().getSouthWest(),
      this.map_.getBounds().getNorthEast());
  var bounds = this.getExtendedBounds(mapBounds);

  for (var i = 0, marker; marker = this.markers_[i]; i++) {
    if (!marker.isAdded && this.isMarkerInBounds_(marker, bounds)) {
      this.addToClosestCluster_(marker);
    }
  }
};


/**
 * A cluster that contains markers.
 *
 * @param {MarkerClusterer} markerClusterer The markerclusterer that this
 *     cluster is associated with.
 * @constructor
 * @ignore
 */
function Cluster(markerClusterer) {
  this.markerClusterer_ = markerClusterer;
  this.map_ = markerClusterer.getMap();
  this.gridSize_ = markerClusterer.getGridSize();
  this.minClusterSize_ = markerClusterer.getMinClusterSize();
  this.averageCenter_ = markerClusterer.isAverageCenter();
  this.center_ = null;
  this.markers_ = [];
  this.bounds_ = null;
  this.clusterIcon_ = new ClusterIcon(this, markerClusterer.getStyles(),
      markerClusterer.getGridSize());
}

/**
 * Determins if a marker is already added to the cluster.
 *
 * @param {google.maps.Marker} marker The marker to check.
 * @return {boolean} True if the marker is already added.
 */
Cluster.prototype.isMarkerAlreadyAdded = function(marker) {
  if (this.markers_.indexOf) {
    return this.markers_.indexOf(marker) != -1;
  } else {
    for (var i = 0, m; m = this.markers_[i]; i++) {
      if (m == marker) {
        return true;
      }
    }
  }
  return false;
};


/**
 * Add a marker the cluster.
 *
 * @param {google.maps.Marker} marker The marker to add.
 * @return {boolean} True if the marker was added.
 */
Cluster.prototype.addMarker = function(marker) {
  if (this.isMarkerAlreadyAdded(marker)) {
    return false;
  }

  if (!this.center_) {
    this.center_ = marker.getPosition();
    this.calculateBounds_();
  } else {
    if (this.averageCenter_) {
      var l = this.markers_.length + 1;
      var lat = (this.center_.lat() * (l-1) + marker.getPosition().lat()) / l;
      var lng = (this.center_.lng() * (l-1) + marker.getPosition().lng()) / l;
      this.center_ = new google.maps.LatLng(lat, lng);
      this.calculateBounds_();
    }
  }

  marker.isAdded = true;
  this.markers_.push(marker);

  var len = this.markers_.length;
  if (len < this.minClusterSize_ && marker.getMap() != this.map_) {
    // Min cluster size not reached so show the marker.
    marker.setMap(this.map_);
  }

  if (len == this.minClusterSize_) {
    // Hide the markers that were showing.
    for (var i = 0; i < len; i++) {
      this.markers_[i].setMap(null);
    }
  }

  if (len >= this.minClusterSize_) {
    marker.setMap(null);
  }

  this.updateIcon();
  return true;
};


/**
 * Returns the marker clusterer that the cluster is associated with.
 *
 * @return {MarkerClusterer} The associated marker clusterer.
 */
Cluster.prototype.getMarkerClusterer = function() {
  return this.markerClusterer_;
};


/**
 * Returns the bounds of the cluster.
 *
 * @return {google.maps.LatLngBounds} the cluster bounds.
 */
Cluster.prototype.getBounds = function() {
  var bounds = new google.maps.LatLngBounds(this.center_, this.center_);
  var markers = this.getMarkers();
  for (var i = 0, marker; marker = markers[i]; i++) {
    bounds.extend(marker.getPosition());
  }
  return bounds;
};


/**
 * Removes the cluster
 */
Cluster.prototype.remove = function() {
  this.clusterIcon_.remove();
  this.markers_.length = 0;
  delete this.markers_;
};


/**
 * Returns the center of the cluster.
 *
 * @return {number} The cluster center.
 */
Cluster.prototype.getSize = function() {
  return this.markers_.length;
};


/**
 * Returns the center of the cluster.
 *
 * @return {Array.<google.maps.Marker>} The cluster center.
 */
Cluster.prototype.getMarkers = function() {
  return this.markers_;
};


/**
 * Returns the center of the cluster.
 *
 * @return {google.maps.LatLng} The cluster center.
 */
Cluster.prototype.getCenter = function() {
  return this.center_;
};


/**
 * Calculated the extended bounds of the cluster with the grid.
 *
 * @private
 */
Cluster.prototype.calculateBounds_ = function() {
  var bounds = new google.maps.LatLngBounds(this.center_, this.center_);
  this.bounds_ = this.markerClusterer_.getExtendedBounds(bounds);
};


/**
 * Determines if a marker lies in the clusters bounds.
 *
 * @param {google.maps.Marker} marker The marker to check.
 * @return {boolean} True if the marker lies in the bounds.
 */
Cluster.prototype.isMarkerInClusterBounds = function(marker) {
  return this.bounds_.contains(marker.getPosition());
};


/**
 * Returns the map that the cluster is associated with.
 *
 * @return {google.maps.Map} The map.
 */
Cluster.prototype.getMap = function() {
  return this.map_;
};


/**
 * Updates the cluster icon
 */
Cluster.prototype.updateIcon = function() {
  var zoom = this.map_.getZoom();
  var mz = this.markerClusterer_.getMaxZoom();

  if (mz && zoom > mz) {
    // The zoom is greater than our max zoom so show all the markers in cluster.
    for (var i = 0, marker; marker = this.markers_[i]; i++) {
      marker.setMap(this.map_);
    }
    return;
  }

  if (this.markers_.length < this.minClusterSize_) {
    // Min cluster size not yet reached.
    this.clusterIcon_.hide();
    return;
  }

  var numStyles = this.markerClusterer_.getStyles().length;
  var sums = this.markerClusterer_.getCalculator()(this.markers_, numStyles);
  this.clusterIcon_.setCenter(this.center_);
  this.clusterIcon_.setSums(sums);
  this.clusterIcon_.show();
};


/**
 * A cluster icon
 *
 * @param {Cluster} cluster The cluster to be associated with.
 * @param {Object} styles An object that has style properties:
 *     'url': (string) The image url.
 *     'height': (number) The image height.
 *     'width': (number) The image width.
 *     'anchor': (Array) The anchor position of the label text.
 *     'textColor': (string) The text color.
 *     'textSize': (number) The text size.
 *     'backgroundPosition: (string) The background postition x, y.
 * @param {number=} opt_padding Optional padding to apply to the cluster icon.
 * @constructor
 * @extends google.maps.OverlayView
 * @ignore
 */
function ClusterIcon(cluster, styles, opt_padding) {
  cluster.getMarkerClusterer().extend(ClusterIcon, google.maps.OverlayView);

  this.styles_ = styles;
  this.padding_ = opt_padding || 0;
  this.cluster_ = cluster;
  this.center_ = null;
  this.map_ = cluster.getMap();
  this.div_ = null;
  this.sums_ = null;
  this.visible_ = false;

  this.setMap(this.map_);
}


/**
 * Triggers the clusterclick event and zoom's if the option is set.
 */
ClusterIcon.prototype.triggerClusterClick = function() {
  var markerClusterer = this.cluster_.getMarkerClusterer();

  // Trigger the clusterclick event.
  google.maps.event.trigger(markerClusterer, 'clusterclick', this.cluster_);

  if (markerClusterer.isZoomOnClick()) {
    // Zoom into the cluster.
    this.map_.fitBounds(this.cluster_.getBounds());
  }
};


/**
 * Adding the cluster icon to the dom.
 * @ignore
 */
ClusterIcon.prototype.onAdd = function() {
  this.div_ = document.createElement('DIV');
  if (this.visible_) {
    var pos = this.getPosFromLatLng_(this.center_);
    this.div_.style.cssText = this.createCss(pos);
    this.div_.innerHTML = this.sums_.text;
  }

  var panes = this.getPanes();
  panes.overlayMouseTarget.appendChild(this.div_);

  var that = this;
  google.maps.event.addDomListener(this.div_, 'click', function() {
    that.triggerClusterClick();
  });
};


/**
 * Returns the position to place the div dending on the latlng.
 *
 * @param {google.maps.LatLng} latlng The position in latlng.
 * @return {google.maps.Point} The position in pixels.
 * @private
 */
ClusterIcon.prototype.getPosFromLatLng_ = function(latlng) {
  var pos = this.getProjection().fromLatLngToDivPixel(latlng);

  if (typeof this.iconAnchor_ === 'object' && this.iconAnchor_.length === 2) {
    pos.x -= this.iconAnchor_[0];
    pos.y -= this.iconAnchor_[1];
  } else {
    pos.x -= parseInt(this.width_ / 2, 10);
    pos.y -= parseInt(this.height_ / 2, 10);
  }
  return pos;
};


/**
 * Draw the icon.
 * @ignore
 */
ClusterIcon.prototype.draw = function() {
  if (this.visible_) {
    var pos = this.getPosFromLatLng_(this.center_);
    this.div_.style.top = pos.y + 'px';
    this.div_.style.left = pos.x + 'px';
  }
};


/**
 * Hide the icon.
 */
ClusterIcon.prototype.hide = function() {
  if (this.div_) {
    this.div_.style.display = 'none';
  }
  this.visible_ = false;
};


/**
 * Position and show the icon.
 */
ClusterIcon.prototype.show = function() {
  if (this.div_) {
    var pos = this.getPosFromLatLng_(this.center_);
    this.div_.style.cssText = this.createCss(pos);
    this.div_.style.display = '';
  }
  this.visible_ = true;
};


/**
 * Remove the icon from the map
 */
ClusterIcon.prototype.remove = function() {
  this.setMap(null);
};


/**
 * Implementation of the onRemove interface.
 * @ignore
 */
ClusterIcon.prototype.onRemove = function() {
  if (this.div_ && this.div_.parentNode) {
    this.hide();
    this.div_.parentNode.removeChild(this.div_);
    this.div_ = null;
  }
};


/**
 * Set the sums of the icon.
 *
 * @param {Object} sums The sums containing:
 *   'text': (string) The text to display in the icon.
 *   'index': (number) The style index of the icon.
 */
ClusterIcon.prototype.setSums = function(sums) {
  this.sums_ = sums;
  this.text_ = sums.text;
  this.index_ = sums.index;
  if (this.div_) {
    this.div_.innerHTML = sums.text;
  }

  this.useStyle();
};


/**
 * Sets the icon to the the styles.
 */
ClusterIcon.prototype.useStyle = function() {
  var index = Math.max(0, this.sums_.index - 1);
  index = Math.min(this.styles_.length - 1, index);
  var style = this.styles_[index];
  this.url_ = style['url'];
  this.height_ = style['height'];
  this.width_ = style['width'];
  this.textColor_ = style['textColor'];
  this.anchor_ = style['anchor'];
  this.textSize_ = style['textSize'];
  this.backgroundPosition_ = style['backgroundPosition'];
  this.iconAnchor_ = style['iconAnchor'];
};


/**
 * Sets the center of the icon.
 *
 * @param {google.maps.LatLng} center The latlng to set as the center.
 */
ClusterIcon.prototype.setCenter = function(center) {
  this.center_ = center;
};


/**
 * Create the css text based on the position of the icon.
 *
 * @param {google.maps.Point} pos The position.
 * @return {string} The css style text.
 */
ClusterIcon.prototype.createCss = function(pos) {
  var style = [];
  style.push('background-image:url(' + this.url_ + ');');
  var backgroundPosition = this.backgroundPosition_ ? this.backgroundPosition_ : '0 0';
  style.push('background-position:' + backgroundPosition + ';');

  if (typeof this.anchor_ === 'object') {
    if (typeof this.anchor_[0] === 'number' && this.anchor_[0] > 0 &&
        this.anchor_[0] < this.height_) {
      style.push('height:' + (this.height_ - this.anchor_[0]) +
          'px; padding-top:' + this.anchor_[0] + 'px;');
    } else if (typeof this.anchor_[0] === 'number' && this.anchor_[0] < 0 &&
        -this.anchor_[0] < this.height_) {
      style.push('height:' + this.height_ + 'px; line-height:' + (this.height_ + this.anchor_[0]) +
          'px;');
    } else {
      style.push('height:' + this.height_ + 'px; line-height:' + this.height_ +
          'px;');
    }
    if (typeof this.anchor_[1] === 'number' && this.anchor_[1] > 0 &&
        this.anchor_[1] < this.width_) {
      style.push('width:' + (this.width_ - this.anchor_[1]) +
          'px; padding-left:' + this.anchor_[1] + 'px;');
    } else {
      style.push('width:' + this.width_ + 'px; text-align:center;');
    }
  } else {
    style.push('height:' + this.height_ + 'px; line-height:' +
        this.height_ + 'px; width:' + this.width_ + 'px; text-align:center;');
  }

  var txtColor = this.textColor_ ? this.textColor_ : 'black';
  var txtSize = this.textSize_ ? this.textSize_ : 11;

  style.push('cursor:pointer; top:' + pos.y + 'px; left:' +
      pos.x + 'px; color:' + txtColor + '; position:absolute; font-size:' +
      txtSize + 'px; font-family:Arial,sans-serif; font-weight:bold');
  return style.join('');
};


// Export Symbols for Closure
// If you are not going to compile with closure then you can remove the
// code below.
window['MarkerClusterer'] = MarkerClusterer;
MarkerClusterer.prototype['addMarker'] = MarkerClusterer.prototype.addMarker;
MarkerClusterer.prototype['addMarkers'] = MarkerClusterer.prototype.addMarkers;
MarkerClusterer.prototype['clearMarkers'] =
    MarkerClusterer.prototype.clearMarkers;
MarkerClusterer.prototype['fitMapToMarkers'] =
    MarkerClusterer.prototype.fitMapToMarkers;
MarkerClusterer.prototype['getCalculator'] =
    MarkerClusterer.prototype.getCalculator;
MarkerClusterer.prototype['getGridSize'] =
    MarkerClusterer.prototype.getGridSize;
MarkerClusterer.prototype['getExtendedBounds'] =
    MarkerClusterer.prototype.getExtendedBounds;
MarkerClusterer.prototype['getMap'] = MarkerClusterer.prototype.getMap;
MarkerClusterer.prototype['getMarkers'] = MarkerClusterer.prototype.getMarkers;
MarkerClusterer.prototype['getMaxZoom'] = MarkerClusterer.prototype.getMaxZoom;
MarkerClusterer.prototype['getStyles'] = MarkerClusterer.prototype.getStyles;
MarkerClusterer.prototype['getTotalClusters'] =
    MarkerClusterer.prototype.getTotalClusters;
MarkerClusterer.prototype['getTotalMarkers'] =
    MarkerClusterer.prototype.getTotalMarkers;
MarkerClusterer.prototype['redraw'] = MarkerClusterer.prototype.redraw;
MarkerClusterer.prototype['removeMarker'] =
    MarkerClusterer.prototype.removeMarker;
MarkerClusterer.prototype['removeMarkers'] =
    MarkerClusterer.prototype.removeMarkers;
MarkerClusterer.prototype['resetViewport'] =
    MarkerClusterer.prototype.resetViewport;
MarkerClusterer.prototype['repaint'] =
    MarkerClusterer.prototype.repaint;
MarkerClusterer.prototype['setCalculator'] =
    MarkerClusterer.prototype.setCalculator;
MarkerClusterer.prototype['setGridSize'] =
    MarkerClusterer.prototype.setGridSize;
MarkerClusterer.prototype['setMaxZoom'] =
    MarkerClusterer.prototype.setMaxZoom;
MarkerClusterer.prototype['onAdd'] = MarkerClusterer.prototype.onAdd;
MarkerClusterer.prototype['draw'] = MarkerClusterer.prototype.draw;

Cluster.prototype['getCenter'] = Cluster.prototype.getCenter;
Cluster.prototype['getSize'] = Cluster.prototype.getSize;
Cluster.prototype['getMarkers'] = Cluster.prototype.getMarkers;

ClusterIcon.prototype['onAdd'] = ClusterIcon.prototype.onAdd;
ClusterIcon.prototype['draw'] = ClusterIcon.prototype.draw;
ClusterIcon.prototype['onRemove'] = ClusterIcon.prototype.onRemove;


/*** EXPORTS FROM exports-loader ***/
module.exports = MarkerClusterer;

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LocationManagerControllerFactory = undefined;

var _classCallCheck2 = __webpack_require__(3);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(4);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LocationManagerControllerFactory = exports.LocationManagerControllerFactory = function () {
    function LocationManagerControllerFactory() {
        (0, _classCallCheck3.default)(this, LocationManagerControllerFactory);
    }

    (0, _createClass3.default)(LocationManagerControllerFactory, null, [{
        key: "register",


        /**
         * Registers a new Constructor with the factory
         *
         * @param name
         * @param Constructor
         */
        value: function register(name, Constructor) {
            LocationManagerControllerFactory._constructors[name] = Constructor;
        }

        /**
         * Creates a new instance of the Controller with the supplied name.
         * Returns null if no controller exists
         *
         * @param name
         * @param settings
         * @return {LocationManagerControllerInterface}
         */


        /**
         * Map of all of the constructors for the factory
         *
         * @type {{}}
         * @private
         */

    }, {
        key: "make",
        value: function make(name, settings) {
            if (LocationManagerControllerFactory._constructors[name]) {
                return new LocationManagerControllerFactory._constructors[name](settings);
            }
            return null;
        }
    }]);
    return LocationManagerControllerFactory;
}();

LocationManagerControllerFactory._constructors = {};

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof2 = __webpack_require__(96);

var _typeof3 = _interopRequireDefault(_typeof2);

var _keys = __webpack_require__(48);

var _keys2 = _interopRequireDefault(_keys);

exports.applyObjectDefaults = applyObjectDefaults;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function applyObjectDefaults(object, defaults) {

    (0, _keys2.default)(defaults).forEach(function (key) {
        if (object[key] === undefined) {
            object[key] = defaults[key];
        } else if ((0, _typeof3.default)(object[key]) === 'object' && (0, _typeof3.default)(defaults[key]) === 'object') {
            object[key] = applyObjectDefaults(object[key], defaults[key]);
        }
    });

    return object;
}

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(97);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(99);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(98), __esModule: true };

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(32);
__webpack_require__(24);
module.exports = __webpack_require__(34).f('iterator');


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(100), __esModule: true };

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(101);
__webpack_require__(49);
__webpack_require__(107);
__webpack_require__(108);
module.exports = __webpack_require__(1).Symbol;


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(0);
var has = __webpack_require__(11);
var DESCRIPTORS = __webpack_require__(7);
var $export = __webpack_require__(8);
var redefine = __webpack_require__(40);
var META = __webpack_require__(102).KEY;
var $fails = __webpack_require__(15);
var shared = __webpack_require__(30);
var setToStringTag = __webpack_require__(23);
var uid = __webpack_require__(22);
var wks = __webpack_require__(2);
var wksExt = __webpack_require__(34);
var wksDefine = __webpack_require__(35);
var enumKeys = __webpack_require__(103);
var isArray = __webpack_require__(104);
var anObject = __webpack_require__(5);
var isObject = __webpack_require__(10);
var toIObject = __webpack_require__(12);
var toPrimitive = __webpack_require__(27);
var createDesc = __webpack_require__(20);
var _create = __webpack_require__(41);
var gOPNExt = __webpack_require__(105);
var $GOPD = __webpack_require__(106);
var $DP = __webpack_require__(6);
var $keys = __webpack_require__(21);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(55).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(36).f = $propertyIsEnumerable;
  __webpack_require__(54).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(17)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(9)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(22)('meta');
var isObject = __webpack_require__(10);
var has = __webpack_require__(11);
var setDesc = __webpack_require__(6).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(15)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(21);
var gOPS = __webpack_require__(54);
var pIE = __webpack_require__(36);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(14);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(12);
var gOPN = __webpack_require__(55).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(36);
var createDesc = __webpack_require__(20);
var toIObject = __webpack_require__(12);
var toPrimitive = __webpack_require__(27);
var has = __webpack_require__(11);
var IE8_DOM_DEFINE = __webpack_require__(39);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(7) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(35)('asyncIterator');


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(35)('observable');


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DynamicMarkerImageController = undefined;

var _classCallCheck2 = __webpack_require__(3);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(4);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @typedef {Object} DynamicMarkerImageController~settings
 * @property {string|Node} [attribute = 'data-marker'] - The field that should be shown when enabled
 */

/**
 * Enables the use of dynamic marker icons
 *
 * @implements LocationManagerControllerInterface
 */

var DynamicMarkerImageController = exports.DynamicMarkerImageController = function () {

  /**
   * @param {DynamicMarkerImageController~settings} settings
   */
  function DynamicMarkerImageController(settings) {
    (0, _classCallCheck3.default)(this, DynamicMarkerImageController);

    settings = settings || {};
    settings.attribute = settings.attribute || 'data-marker';

    this.settings = settings;
  }

  /**
   * @param {LocationManager} locationManager
   */


  /**
   * @type {DynamicMarkerImageController~settings}
   */


  (0, _createClass3.default)(DynamicMarkerImageController, [{
    key: 'init',
    value: function init(locationManager) {
      var _this = this;

      locationManager.marker.forEach(function (marker) {
        var icon = marker.element.getAttribute(_this.settings.attribute);
        if (icon) {
          marker.marker.setIcon(icon);
        }
      });
    }
  }, {
    key: 'onMapMove',
    value: function onMapMove() {}
  }, {
    key: 'onMarkerClick',
    value: function onMarkerClick() {}
  }, {
    key: 'preprocess',
    value: function preprocess() {}
  }]);
  return DynamicMarkerImageController;
}();

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ShowOnClickController = undefined;

var _classCallCheck2 = __webpack_require__(3);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(4);

var _createClass3 = _interopRequireDefault(_createClass2);

var _InfoWindowController = __webpack_require__(56);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Zooms to a marker whenever the showlink is being clicked.
 * Also opens the infowindow, if the infowindow controller is being used
 *
 * @implements LocationManagerControllerInterface
 */

var ShowOnClickController = exports.ShowOnClickController = function () {

    /**
     * @param {ShowOnClickController~settings} settings
     */
    function ShowOnClickController(settings) {
        (0, _classCallCheck3.default)(this, ShowOnClickController);

        settings = settings || {};
        settings.linkSelector = settings.linkSelector || '.location-manager__location__show';
        this.settings = settings;
    }

    /**
     * Initializes the handlers
     *
     * @param {LocationManager} locationManager
     */


    /**
     * @type {ShowOnClickController~settings}
     */


    (0, _createClass3.default)(ShowOnClickController, [{
        key: 'init',
        value: function init(locationManager) {
            var _this = this;

            locationManager.marker.forEach(function (marker) {
                var links = marker.element.querySelectorAll(_this.settings.linkSelector);
                for (var i = 0; i < links.length; i++) {
                    links[i].addEventListener('click', _this.onShowLinkClick.bind(_this, marker, locationManager));
                }
            });
        }
    }, {
        key: 'onMapMove',
        value: function onMapMove() {}
    }, {
        key: 'onMarkerClick',
        value: function onMarkerClick() {}

        /**
         * Method that is executed whenever the show link on an element is being clicked
         *
         * @param {LocationManager~marker} marker
         * @param {LocationManager} locationManager
         * @private
         */

    }, {
        key: 'onShowLinkClick',
        value: function onShowLinkClick(marker, locationManager) {
            locationManager._settings.mapContainer.scrollIntoView(true);

            /** @var {InfoWindowController} */
            var infoWindowController = locationManager.getController(_InfoWindowController.InfoWindowController);
            if (infoWindowController) {
                // let infoWindowController handle the zooming and panning, if it is available
                infoWindowController.onMarkerClick(marker, true);
            } else {
                // zoom and pan manually if it is not available (fallback)
                locationManager.map.setCenter(marker.marker.getPosition());
                locationManager.map.setZoom(10);
            }
        }
    }, {
        key: 'preprocess',
        value: function preprocess() {}
    }]);
    return ShowOnClickController;
}(); /**
      * @typedef {Object} ShowOnClickController~settings
      * @property {string} [linkSelector = '.tx-locationmanager-show'] - The amount of throttling to apply
      */

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SortByDistanceController = undefined;

var _classCallCheck2 = __webpack_require__(3);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(4);

var _createClass3 = _interopRequireDefault(_createClass2);

var _EventHelpers = __webpack_require__(16);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Zooms to a marker whenever the showlink is being clicked
 *
 * @implements LocationManagerControllerInterface
 */

var SortByDistanceController = exports.SortByDistanceController = function () {

  /**
   * @param {SortByDistanceController~settings} settings
   */


  /**
   * @type {SortByDistanceController~settings}
   */
  function SortByDistanceController(settings) {
    var _this = this;

    (0, _classCallCheck3.default)(this, SortByDistanceController);

    settings = settings || {};
    settings.throttle = settings.throttle || 500;

    this._sortMarkersThrottled = (0, _EventHelpers.throttle)(function () {
      return _this.sortMarkers;
    }, settings.throttle);
    this.settings = settings;
  }

  /**
   * @type {LocationManager}
   */


  (0, _createClass3.default)(SortByDistanceController, [{
    key: "init",
    value: function init(locationManager) {
      this.locationManager = locationManager;
    }

    /**
     * Returns the distance between 2 latlngbounds
     * @param {google.maps.LatLng} a
     * @param {google.maps.LatLng} b
     * @return {number}
     */

  }, {
    key: "getDistance",
    value: function getDistance(a, b) {
      return google.maps.geometry.spherical.computeDistanceBetween(a, b);
    }
  }, {
    key: "sortMarkers",
    value: function sortMarkers() {
      var _this2 = this;

      var center = this.locationManager.map.getCenter();
      this.locationManager.marker.sort(function (a, b) {
        return _this2.getDistance(center, a.marker.getPosition()) - _this2.getDistance(center, b.marker.getPosition());
      });
    }
  }, {
    key: "onMapMove",
    value: function onMapMove() {
      this._sortMarkersThrottled();
    }
  }, {
    key: "onMarkerClick",
    value: function onMarkerClick() {}
  }, {
    key: "preprocess",
    value: function preprocess() {}

    /**
     * @type {Function}
     */

  }]);
  return SortByDistanceController;
}(); /**
      * @typedef {Object} SortByDistanceController~settings
      * @property {number} [throttle = 500]
      */

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ClickToEnableController = undefined;

var _classCallCheck2 = __webpack_require__(3);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(4);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @typedef {Object} ClickToEnableController~settings
 * @property {string|Node} [enabled = '.tx-locationmanager-moveToggle-enabled'] - The field that should be shown when enabled
 * @property {string|Node} [disabled = '.tx-locationmanager-moveToggle-disabled'] - The field that should be shown when disabled
 */

/**
 * Enables moving the map after clicking inside, disables it after hovering over the element
 *
 * @implements LocationManagerControllerInterface
 */

var ClickToEnableController = exports.ClickToEnableController = function () {

    /**
     * @param {ClickToEnableController~settings} settings
     */
    function ClickToEnableController(settings) {
        (0, _classCallCheck3.default)(this, ClickToEnableController);

        settings = settings || {};
        settings.enabled = settings.enabled || '.location-manager__toggle_enabled';
        settings.disabled = settings.disabled || '.location-manager__toggle_disabled';

        if (typeof settings.enabled === 'string') {
            settings.enabled = document.querySelector(settings.enabled);
        }
        if (typeof settings.disabled === 'string') {
            settings.disabled = document.querySelector(settings.disabled);
        }

        this.settings = settings;
    }

    /**
     * @param {LocationManager} locationManager
     */


    /**
     * @type {ClickToEnableController~settings}
     */


    (0, _createClass3.default)(ClickToEnableController, [{
        key: 'init',
        value: function init(locationManager) {
            // enable map
            locationManager.map.addListener('click', this.enableDragging.bind(this, true, locationManager));
            // disable map
            this.settings.enabled.addEventListener('mouseover', this.enableDragging.bind(this, false, locationManager));
            // disable by default
            this.enableDragging(false, locationManager);
        }

        /**
         * Enables or disables dragging on the map and shows the correct element for that state
         *
         * @param {boolean} enable
         * @param {LocationManager} locationManager
         */

    }, {
        key: 'enableDragging',
        value: function enableDragging(enable, locationManager) {
            locationManager.map.setOptions({
                draggable: enable,
                scrollwheel: enable
            });

            if (enable) {
                this.settings.enabled.style.removeProperty('display');
                this.settings.disabled.style.display = 'none';
            } else {
                this.settings.enabled.style.display = 'none';
                this.settings.disabled.style.removeProperty('display');
            }
        }
    }, {
        key: 'onMapMove',
        value: function onMapMove() {}
    }, {
        key: 'onMarkerClick',
        value: function onMarkerClick() {}
    }, {
        key: 'preprocess',
        value: function preprocess() {}
    }]);
    return ClickToEnableController;
}();

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AutocompletedSearchController = undefined;

var _stringify = __webpack_require__(114);

var _stringify2 = _interopRequireDefault(_stringify);

var _classCallCheck2 = __webpack_require__(3);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(4);

var _createClass3 = _interopRequireDefault(_createClass2);

var _MapsHelper = __webpack_require__(116);

var _HideMapOnMobileController = __webpack_require__(58);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Handles the search using google maps Autocomplete
 *
 * @implements LocationManagerControllerInterface
 */

/**
 * @typedef {Object} AutocompletedSearchController~settings
 * @property {string} [field = '.tx-locationmanager-search-field']
 * @property {google.maps.places.AutocompleteOptions} [autocompleteOptions]
 * @property {number} [expand = 0] - The amount to expand the search bounds by
 */

var AutocompletedSearchController = exports.AutocompletedSearchController = function () {

    /**
     * @param {AutocompletedSearchController~settings} settings
     */


    /**
     * @type {LocationManager}
     */


    /**
     * @type {AutocompletedSearchController~settings}
     */
    function AutocompletedSearchController(settings) {
        (0, _classCallCheck3.default)(this, AutocompletedSearchController);
        this.mapsHelper = new _MapsHelper.MapsHelper();

        settings = settings || {};
        settings.field = settings.field || '.location-manager__button';
        settings.autocompleteOptions = settings.autocompleteOptions || { types: ['(regions)'] };

        this.settings = settings;
    }

    /**
     * @param {LocationManager} locationManager
     */


    /**
     * @type {MapsHelper}
     */


    /**
     * @type {google.maps.Geocoder}
     */


    (0, _createClass3.default)(AutocompletedSearchController, [{
        key: "init",
        value: function init(locationManager) {
            var _this = this;

            this.locationManager = locationManager;
            this.geocoder = new google.maps.Geocoder();

            var autocomplete = new google.maps.places.Autocomplete(document.querySelector(this.settings.field), this.settings.autocompleteOptions);
            autocomplete.addListener('place_changed', function () {
                _this.query(autocomplete.getPlace());
            });

            // find form
            var node = document.querySelector(this.settings.field);
            var form = void 0;
            do {
                if (node.nodeName === 'FORM') {
                    form = node;
                    break;
                }
            } while (node = node.parentNode);

            if (form) {
                form.addEventListener('submit', function (e) {
                    e.preventDefault();
                    _this.query(autocomplete.getPlace());
                });
            }

            // TODO remove
            window.map = this.locationManager.map;
        }

        /**
         * Performs a query using the passed place. If no place was passed then the geocoder is used in
         * order to find the closest match. Calls {@link goToBounds} once results are ready
         *
         * @param {google.maps.places.PlaceResult} place
         */

    }, {
        key: "query",
        value: function query(place) {
            var _this2 = this;

            if (place && place.geometry && place.geometry.viewport) {
                this.goToBounds(place.geometry.viewport);
                return;
            }

            this.geocoder.geocode({
                address: document.querySelector(this.settings.field).value
            }, function (results, status) {
                /** @type {google.maps.GeocoderResult[]} results **/

                if (status !== google.maps.GeocoderStatus.OK) {
                    throw new Error('Google Maps Geocoder error ' + status + ' - ' + (0, _stringify2.default)(results));
                }

                _this2.goToBounds(results[0].geometry.bounds);
            });
        }

        /**
         * Moves the bounds to the given bounds
         * @param {google.maps.LatLngBounds} bounds
         */

    }, {
        key: "goToBounds",
        value: function goToBounds(bounds) {
            if (this.settings.expand) {
                bounds = this.mapsHelper.expandLatLngBounds(bounds, this.settings.expand);
            }
            this.locationManager.map.fitBounds(bounds);

            /** @type {HideMapOnMobileController} */
            var hideMapOnMobile = this.locationManager.getController(_HideMapOnMobileController.HideMapOnMobileController);
            if (!hideMapOnMobile || hideMapOnMobile.isMapShown()) {
                this.locationManager._settings.mapContainer.scrollIntoView(true);
            }
        }
    }, {
        key: "onMarkerClick",
        value: function onMarkerClick() {}
    }, {
        key: "onMapMove",
        value: function onMapMove() {}
    }, {
        key: "preprocess",
        value: function preprocess() {}
    }]);
    return AutocompletedSearchController;
}();

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(115), __esModule: true };

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(1);
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MapsHelper = undefined;

var _classCallCheck2 = __webpack_require__(3);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(4);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MapsHelper = exports.MapsHelper = function () {
    function MapsHelper() {
        (0, _classCallCheck3.default)(this, MapsHelper);
    }

    (0, _createClass3.default)(MapsHelper, [{
        key: "degToRad",


        /**
         * Helper function that converts degrees into radians
         * @param {number} deg - degrees
         * @returns {number} - radians
         */
        value: function degToRad(deg) {
            return deg * Math.PI / 180;
        }

        /**
         * moves a given point by a given amount of kilometers.
         * We are using a approximation for this, which turns out to be fairly accurate.
         *
         * The returned position is a new instance of LatLngBounds
         *
         * @see http://stackoverflow.com/a/1253545
         * @see https://en.wikipedia.org/wiki/Latitude#Length_of_a_degree_of_latitude
         *
         * @param {google.maps.LatLng} latlng
         * @param {{ lat: number, lng: number }} offset
         * @returns {google.maps.LatLng}
         */

    }, {
        key: "latLngKilometerOffset",
        value: function latLngKilometerOffset(latlng, offset) {
            var lat = latlng.lat() + offset.lat / 110.574;
            var lng = latlng.lng() + offset.lng / (111.320 * Math.cos(this.degToRad(latlng.lat())));

            if (lat > 80) {
                lat = 80;
            } else if (lat < -80) {
                lat = -80;
            }
            if (lng > 180) {
                lng = 180;
            } else if (lng < -180) {
                lng = -180;
            }

            return new google.maps.LatLng(lat, lng);
        }

        /**
         * Takes a given latLng bounds and expands it by the given amount into all directions
         *
         * @param {google.maps.LatLngBounds} bounds
         * @param {number} kilometers
         * @returns {google.maps.LatLngBounds}
         */

    }, {
        key: "expandLatLngBounds",
        value: function expandLatLngBounds(bounds, kilometers) {
            // the length of the sides of a right-angled triangle with 45deg angles.
            var distance = kilometers;

            var ne = bounds.getNorthEast();
            var sw = bounds.getSouthWest();

            ne = this.latLngKilometerOffset(ne, { lat: distance, lng: distance });
            sw = this.latLngKilometerOffset(sw, { lat: -distance, lng: -distance });

            return new google.maps.LatLngBounds(sw, ne);
        }
    }]);
    return MapsHelper;
}();

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TagFilterController = undefined;

var _classCallCheck2 = __webpack_require__(3);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(4);

var _createClass3 = _interopRequireDefault(_createClass2);

var _EventHelpers = __webpack_require__(16);

var _RefreshListOnMoveController = __webpack_require__(57);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Handles the tag filter.
 * Because of the nature of this controller, it should be included as one of the first Controllers
 *
 * @implements LocationManagerControllerInterface
 */

/**
 * @typedef {Object} TagFilterController~settings
 * @property {string} [items = '.tx-locationmanager-tag']
 * @property {string} [reset = '.tx-locationmanager-tag-reset'] - The reset button
 * @property {string} [activeClass = 'active'] - Class to set on a tag item when it is active
 * @property {string|Node} [container = null] - Container of the tags. If this attribute is set, then this container will be hidden
 *                                         if all tags are invisible
 * @property {string} [attribute = 'data-tags']
 * @property {number} [throttle = 500]
 * @property {string} [combine] - pass 'AND' or 'OR'. defaults to 'none'
 */

/**
 * @typedef {Object} TagFilterController~tag
 * @property {HTMLElement} element
 * @property {string} name
 * @property {string} id
 */

/**
 * @typedef {LocationManager~marker} TagFilterController~marker
 * @property {string[]} _tags
 */

var TagFilterController = exports.TagFilterController = function () {

    /**
     * @param {TagFilterController~settings} settings
     */


    /**
     * @type {LocationManager}
     */


    /**
     * @type {TagFilterController~settings}
     */
    function TagFilterController(settings) {
        var _this = this;

        (0, _classCallCheck3.default)(this, TagFilterController);
        this.tags = [];
        this.activeTags = [];

        settings = settings || {};
        settings.items = settings.items || '.location-manager__tag_regular';
        settings.reset = settings.reset || '.location-manager__tag_reset';
        settings.attribute = settings.attribute || 'data-tags';
        settings.activeClass = settings.activeClass || 'location-manager__tag_active';
        settings.throttle = settings.throttle || 500;
        settings.container = document.querySelector(settings.container);
        settings.combine = settings.combine || 'none';

        this.settings = settings;

        this._hideTagsInListThrottled = (0, _EventHelpers.throttle)(function () {
            return _this.updateTagsInList;
        }, this.settings.throttle);
    }

    /**
     * @param {LocationManager} locationManager
     */


    /**
     * List of tags that are currently active
     * @type {TagFilterController~tag[]}
     */


    /**
     * @type {TagFilterController~tag[]};
     */


    (0, _createClass3.default)(TagFilterController, [{
        key: "init",
        value: function init(locationManager) {
            var _this2 = this;

            this.locationManager = locationManager;

            var tags = document.querySelectorAll(this.settings.items);
            for (var i = 0; i < tags.length; i++) {
                var tag = {
                    element: tags[i],
                    id: tags[i].getAttribute(this.settings.attribute),
                    name: tags[i].innerText
                };
                this.tags.push(tag);
                tag.element.addEventListener('click', this.onTagClick.bind(this, tag));
            }

            this.locationManager.marker.forEach(function (marker) {
                marker._tags = marker.element.getAttribute(_this2.settings.attribute).split(',');
                // prevent empty string
                if (!marker._tags[0]) {
                    marker._tags = [];
                }
            });

            var reset = document.querySelector(this.settings.reset);
            if (reset) {
                reset.addEventListener('click', this.resetFilter.bind(this));
            } else {
                console.warn('TagFilterController: No reset button found');
            }

            // initially execute updateTagsinlist
            this.updateTagsInList();
        }

        /**
         * Executed, whenever the mouse is being moved
         */

    }, {
        key: "onMapMove",
        value: function onMapMove() {
            this._hideTagsInListThrottled();
        }

        /**
         * Removes all active classes from the tag elements
         */

    }, {
        key: "removeActiveClasses",
        value: function removeActiveClasses() {
            var _this3 = this;

            this.tags.forEach(function (tag) {
                tag.element.classList.remove(_this3.settings.activeClass);
            });
        }

        /**
         * Adds the active class for the given filter depending on the combination method
         * @param {TagFilterController~tag} tag
         */

    }, {
        key: "addActiveClass",
        value: function addActiveClass(tag) {
            switch (this.settings.combine) {
                case 'AND':
                case 'OR':
                    // AND & OR: pile on
                    tag.element.classList.add(this.settings.activeClass);
                    break;
                case 'none':
                default:
                    // default: only one active
                    this.removeActiveClasses();
                    tag.element.classList.add(this.settings.activeClass);
                    break;
            }
        }

        /**
         * Resets the filter to it's default state (no filter)
         */

    }, {
        key: "resetFilter",
        value: function resetFilter() {
            this.activeTags = [];
            this.removeActiveClasses();
            this.locationManager.marker.forEach(function (marker) {
                marker.showInList = true;
                marker.showOnMap = true;
            });
            this.locationManager.updateList();
            this.locationManager.updateMap();
        }

        /**
         * @param {TagFilterController~tag} tag
         */

    }, {
        key: "onTagClick",
        value: function onTagClick(tag) {
            var _this4 = this;

            if (this.activeTags.indexOf(tag) > -1) {
                // remove the tag, if it is already active
                this._removeTag(tag);
                return;
            }
            this.addActiveClass(tag);
            this.locationManager.marker.forEach(function (marker) {
                _this4._changeMarkerState(marker, marker._tags.indexOf(tag.id) !== -1);
            });

            if (this.settings.combine === 'none') {
                this.activeTags = [tag];
            } else {
                this.activeTags.push(tag);
            }

            // reapply map filtering by RefreshListOnMoveController
            var refreshListOnMove = this.locationManager.getController(_RefreshListOnMoveController.RefreshListOnMoveController);
            if (refreshListOnMove) {
                refreshListOnMove.hideInList();
            }

            this.locationManager.updateMap();
            this.locationManager.updateList();
        }

        /**
         * Updates the taglist that is currently displayed to the user:
         * Only shows the tags that currently have items inside of the bounds of the map
         */

    }, {
        key: "updateTagsInList",
        value: function updateTagsInList() {
            var bounds = this.locationManager.map.getBounds();
            var visibleTags = [];

            this.locationManager.marker.forEach(function (marker) {
                if (!bounds.contains(marker.marker.getPosition())) {
                    return;
                }
                marker._tags.forEach(function (tag) {
                    if (visibleTags.indexOf(tag) === -1) {
                        visibleTags.push(tag);
                    }
                });
            });

            var areTagsDisplayed = false;
            this.tags.forEach(function (tag) {
                if (visibleTags.indexOf(tag.id) !== -1) {
                    areTagsDisplayed = true;
                    tag.element.style.removeProperty('display');
                } else {
                    tag.element.style.display = 'none';
                }
            });

            if (this.settings.container) {
                if (areTagsDisplayed) {
                    this.settings.container.style.removeProperty('display');
                } else {
                    this.settings.container.style.display = 'none';
                }
            }
        }
    }, {
        key: "_removeTag",
        value: function _removeTag(tag) {
            var _this5 = this;

            this.activeTags.splice(this.activeTags.indexOf(tag), 1);
            var tags = this.activeTags;
            this.resetFilter();
            tags.forEach(function (tag) {
                _this5.onTagClick(tag);
            });
        }

        /**
         * Changes the marker display state depending on the combination method that was
         * passed in the settings ("AND", "OR", 'none')
         * @param {LocationManager~marker} marker
         * @param {boolean} state
         * @private
         */

    }, {
        key: "_changeMarkerState",
        value: function _changeMarkerState(marker, state) {
            // if this is the first filter that is being applied, then simply apply it without additional logic
            if (this.activeTags.length === 0) {
                marker.showOnMap = marker.showInList = state;
                return;
            }

            switch (this.settings.combine) {
                case 'AND':
                    marker.showOnMap = marker.showOnMap && state;
                    marker.showInList = marker.showInList && state;
                    break;
                case 'OR':
                    marker.showOnMap = marker.showOnMap || state;
                    marker.showInList = marker.showInList || state;
                    break;
                case 'none':
                default:
                    marker.showOnMap = marker.showInList = state;
                    break;
            }
        }
    }, {
        key: "onMarkerClick",
        value: function onMarkerClick() {}
    }, {
        key: "preprocess",
        value: function preprocess() {}

        /**
         * @type {Function}
         */

    }]);
    return TagFilterController;
}();

/***/ })
/******/ ]);
//# sourceMappingURL=main.bundle.js.map