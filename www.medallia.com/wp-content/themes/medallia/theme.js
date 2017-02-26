/*! jQuery v1.9.1 | (c) 2005, 2012 jQuery Foundation, Inc. | jquery.org/license
 //@ sourceMappingURL=jquery.min.map
 */
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
        'use strict';
        if (this == null) {
            throw new TypeError();
        }
        var n, k, t = Object(this),
            len = t.length >>> 0;

        if (len === 0) {
            return -1;
        }
        n = 0;
        if (arguments.length > 1) {
            n = Number(arguments[1]);
            if (n != n) { // shortcut for verifying if it's NaN
                n = 0;
            } else if (n != 0 && n != Infinity && n != -Infinity) {
                n = (n > 0 || -1) * Math.floor(Math.abs(n));
            }
        }
        if (n >= len) {
            return -1;
        }
        for (k = n >= 0 ? n : Math.max(len - Math.abs(n), 0); k < len; k++) {
            if (k in t && t[k] === searchElement) {
                return k;
            }
        }
        return -1;
    };
}
;
window.requestAnimationFrame = (function(){
    return  window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function( callback ){
            window.setTimeout(callback, 1000 / 60);
        };
})();
(function() {

    var $ = jQuery.noConflict();
    var __slice = [].slice;

    this.ScrollAnimation = (function() {
        var STATE_ANIMATING, STATE_IDLE, documentHeight, lastTop, run, update, windowHeight;

        windowHeight = window.innerHeight;

        documentHeight = null;

        lastTop = null;

        update = function(force) {
            var anim, scrollTop, _i, _len, _ref;
            scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            if (scrollTop === lastTop && !force) {
                return;
            }
            _ref = ScrollAnimation.animations;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                anim = _ref[_i];
                if (anim != null) {
                    anim.animate(scrollTop, windowHeight, documentHeight);
                }
            }
            return lastTop = scrollTop;
        };

        run = function() {
            requestAnimationFrame(run);
            return update();
        };

        ScrollAnimation.animations = [];

        ScrollAnimation.register = function() {
            var args;
            args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
            if (args[0] instanceof ScrollAnimation) {
                return this.animations.push(args[0]);
            }
        };

        ScrollAnimation.remove = function(instance) {
            var idx;
            idx = this.animations.indexOf(instance);
            if (idx < 0) {
                return null;
            }
            return this.animations.splice(idx, 1);
        };

        ScrollAnimation.start = function() {
            ScrollAnimation.refresh();
            // Commented out to get SEM landing page working - not sure what this affects
            $(window).on("resize", ScrollAnimation.refresh);
            return run();
        };

        ScrollAnimation.refresh = function() {
            var anim, _i, _len, _ref;
            windowHeight = window.innerHeight;
            documentHeight = document.height;
            lastTop = 0;
            _ref = ScrollAnimation.animations;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                anim = _ref[_i];
                anim.resize();
            }
            return this;
        };

        STATE_IDLE = 0;

        STATE_ANIMATING = 1;

        function ScrollAnimation(_arg) {
            var offset;
            this.el = _arg.el, this.animation = _arg.animation, this.reset = _arg.reset, offset = _arg.offset;
            this.offset = offset || function() {
                    return 0;
                };
            offset = this.offset(windowHeight);
            this.resize(windowHeight);
            this.state = STATE_IDLE;
        }

        ScrollAnimation.prototype.resize = function(viewportHeight) {
            var top;
            top = $(this.el).offset()['top'];
            this.start = top + this.offset(viewportHeight);
            this.height = this.el.offsetHeight;
            return this.end = this.height + this.start;
        };

        ScrollAnimation.prototype.animate = function(scrollTop, windowHeight, documentHeight) {
            if (!(this.start > scrollTop && this.end < (scrollTop + windowHeight))) {
                if (this.state === STATE_ANIMATING) {
                    if (typeof this.reset === "function") {
                        this.reset();
                    }
                    this.state = STATE_IDLE;
                }
            }
            this.state = STATE_ANIMATING;
            return this.animation.apply(this, Array.prototype.slice.call(arguments));
        };

        return ScrollAnimation;

    })();

}).call(this);
jQuery.fn.tabs = function() {
    return this.each(function(){
        var $el = $(this).addClass("tab-container");
        var $panes = $el.find('> div');

        $panes.first()
            .before('<nav class="tab-nav"><ul></ul></nav>')
            .before('<div class="tab-panes"></div>');

        var $tabList = $el.find('.tab-nav > ul');
        var $panesContainer = $el.find('.tab-panes');

        var maxHeight = 0;
        $panes.appendTo($panesContainer).addClass("tab-pane");
        $panes.first().addClass('active');

        $panes.each(function(){
            var href = '#' + this.id;
            var title = $(this).find('h2').first().text();
            var link = document.createElement('a');
            var listItem = document.createElement('li');

            link.href = href;
            link.innerHTML = title;

            listItem.appendChild(link);
            $tabList.append(listItem);

            height = this.offsetHeight;
            if(height > maxHeight) {
                maxHeight = height;
            }
        });

        var $tabs = $el.find('.tab-nav li');

        $panesContainer.css({ height: maxHeight });

        $tabs.first().addClass('active');

        $el.on("click", ".tab-nav a", function(e) {
            e.preventDefault();
            $tabs.filter('.active').removeClass('active');
            $(this).parent().addClass('active');

            $panes.filter('.active').removeClass('active');
            $(this.getAttribute('href')).addClass('active');
        });
    })
}

;


// List.js
// used for search on Resources and Events

;(function(){

    /**
     * Require the given path.
     *
     * @param {String} path
     * @return {Object} exports
     * @api public
     */

    function require(path, parent, orig) {
        var resolved = require.resolve(path);

        // lookup failed
        if (null == resolved) {
            orig = orig || path;
            parent = parent || 'root';
            var err = new Error('Failed to require "' + orig + '" from "' + parent + '"');
            err.path = orig;
            err.parent = parent;
            err.require = true;
            throw err;
        }

        var module = require.modules[resolved];

        // perform real require()
        // by invoking the module's
        // registered function
        if (!module._resolving && !module.exports) {
            var mod = {};
            mod.exports = {};
            mod.client = mod.component = true;
            module._resolving = true;
            module.call(this, mod.exports, require.relative(resolved), mod);
            delete module._resolving;
            module.exports = mod.exports;
        }

        return module.exports;
    }

    /**
     * Registered modules.
     */

    require.modules = {};

    /**
     * Registered aliases.
     */

    require.aliases = {};

    /**
     * Resolve `path`.
     *
     * Lookup:
     *
     *   - PATH/index.js
     *   - PATH.js
     *   - PATH
     *
     * @param {String} path
     * @return {String} path or null
     * @api private
     */

    require.resolve = function(path) {
        if (path.charAt(0) === '/') path = path.slice(1);

        var paths = [
            path,
            path + '.js',
            path + '.json',
            path + '/index.js',
            path + '/index.json'
        ];

        for (var i = 0; i < paths.length; i++) {
            var path = paths[i];
            if (require.modules.hasOwnProperty(path)) return path;
            if (require.aliases.hasOwnProperty(path)) return require.aliases[path];
        }
    };

    /**
     * Normalize `path` relative to the current path.
     *
     * @param {String} curr
     * @param {String} path
     * @return {String}
     * @api private
     */

    require.normalize = function(curr, path) {
        var segs = [];

        if ('.' != path.charAt(0)) return path;

        curr = curr.split('/');
        path = path.split('/');

        for (var i = 0; i < path.length; ++i) {
            if ('..' == path[i]) {
                curr.pop();
            } else if ('.' != path[i] && '' != path[i]) {
                segs.push(path[i]);
            }
        }

        return curr.concat(segs).join('/');
    };

    /**
     * Register module at `path` with callback `definition`.
     *
     * @param {String} path
     * @param {Function} definition
     * @api private
     */

    require.register = function(path, definition) {
        require.modules[path] = definition;
    };

    /**
     * Alias a module definition.
     *
     * @param {String} from
     * @param {String} to
     * @api private
     */

    require.alias = function(from, to) {
        if (!require.modules.hasOwnProperty(from)) {
            throw new Error('Failed to alias "' + from + '", it does not exist');
        }
        require.aliases[to] = from;
    };

    /**
     * Return a require function relative to the `parent` path.
     *
     * @param {String} parent
     * @return {Function}
     * @api private
     */

    require.relative = function(parent) {
        var p = require.normalize(parent, '..');

        /**
         * lastIndexOf helper.
         */

        function lastIndexOf(arr, obj) {
            var i = arr.length;
            while (i--) {
                if (arr[i] === obj) return i;
            }
            return -1;
        }

        /**
         * The relative require() itself.
         */

        function localRequire(path) {
            var resolved = localRequire.resolve(path);
            return require(resolved, parent, path);
        }

        /**
         * Resolve relative to the parent.
         */

        localRequire.resolve = function(path) {
            var c = path.charAt(0);
            if ('/' == c) return path.slice(1);
            if ('.' == c) return require.normalize(p, path);

            // resolve deps by returning
            // the dep in the nearest "deps"
            // directory
            var segs = parent.split('/');
            var i = lastIndexOf(segs, 'deps') + 1;
            if (!i) i = 0;
            path = segs.slice(0, i + 1).join('/') + '/deps/' + path;
            return path;
        };

        /**
         * Check if module is defined at `path`.
         */

        localRequire.exists = function(path) {
            return require.modules.hasOwnProperty(localRequire.resolve(path));
        };

        return localRequire;
    };
    require.register("component-classes/index.js", function(exports, require, module){
        /**
         * Module dependencies.
         */

        var index = require('indexof');

        /**
         * Whitespace regexp.
         */

        var re = /\s+/;

        /**
         * toString reference.
         */

        var toString = Object.prototype.toString;

        /**
         * Wrap `el` in a `ClassList`.
         *
         * @param {Element} el
         * @return {ClassList}
         * @api public
         */

        module.exports = function(el){
            return new ClassList(el);
        };

        /**
         * Initialize a new ClassList for `el`.
         *
         * @param {Element} el
         * @api private
         */

        function ClassList(el) {
            if (!el) throw new Error('A DOM element reference is required');
            this.el = el;
            this.list = el.classList;
        }

        /**
         * Add class `name` if not already present.
         *
         * @param {String} name
         * @return {ClassList}
         * @api public
         */

        ClassList.prototype.add = function(name){
            // classList
            if (this.list) {
                this.list.add(name);
                return this;
            }

            // fallback
            var arr = this.array();
            var i = index(arr, name);
            if (!~i) arr.push(name);
            this.el.className = arr.join(' ');
            return this;
        };

        /**
         * Remove class `name` when present, or
         * pass a regular expression to remove
         * any which match.
         *
         * @param {String|RegExp} name
         * @return {ClassList}
         * @api public
         */

        ClassList.prototype.remove = function(name){
            if ('[object RegExp]' == toString.call(name)) {
                return this.removeMatching(name);
            }

            // classList
            if (this.list) {
                this.list.remove(name);
                return this;
            }

            // fallback
            var arr = this.array();
            var i = index(arr, name);
            if (~i) arr.splice(i, 1);
            this.el.className = arr.join(' ');
            return this;
        };

        /**
         * Remove all classes matching `re`.
         *
         * @param {RegExp} re
         * @return {ClassList}
         * @api private
         */

        ClassList.prototype.removeMatching = function(re){
            var arr = this.array();
            for (var i = 0; i < arr.length; i++) {
                if (re.test(arr[i])) {
                    this.remove(arr[i]);
                }
            }
            return this;
        };

        /**
         * Toggle class `name`, can force state via `force`.
         *
         * For browsers that support classList, but do not support `force` yet,
         * the mistake will be detected and corrected.
         *
         * @param {String} name
         * @param {Boolean} force
         * @return {ClassList}
         * @api public
         */

        ClassList.prototype.toggle = function(name, force){
            // classList
            if (this.list) {
                if ("undefined" !== typeof force) {
                    if (force !== this.list.toggle(name, force)) {
                        this.list.toggle(name); // toggle again to correct
                    }
                } else {
                    this.list.toggle(name);
                }
                return this;
            }

            // fallback
            if ("undefined" !== typeof force) {
                if (!force) {
                    this.remove(name);
                } else {
                    this.add(name);
                }
            } else {
                if (this.has(name)) {
                    this.remove(name);
                } else {
                    this.add(name);
                }
            }

            return this;
        };

        /**
         * Return an array of classes.
         *
         * @return {Array}
         * @api public
         */

        ClassList.prototype.array = function(){
            var str = this.el.className.replace(/^\s+|\s+$/g, '');
            var arr = str.split(re);
            if ('' === arr[0]) arr.shift();
            return arr;
        };

        /**
         * Check if class `name` is present.
         *
         * @param {String} name
         * @return {ClassList}
         * @api public
         */

        ClassList.prototype.has =
            ClassList.prototype.contains = function(name){
                return this.list
                    ? this.list.contains(name)
                    : !! ~index(this.array(), name);
            };

    });
    require.register("segmentio-extend/index.js", function(exports, require, module){

        module.exports = function extend (object) {
            // Takes an unlimited number of extenders.
            var args = Array.prototype.slice.call(arguments, 1);

            // For each extender, copy their properties on our object.
            for (var i = 0, source; source = args[i]; i++) {
                if (!source) continue;
                for (var property in source) {
                    object[property] = source[property];
                }
            }

            return object;
        };
    });
    require.register("component-indexof/index.js", function(exports, require, module){
        module.exports = function(arr, obj){
            if (arr.indexOf) return arr.indexOf(obj);
            for (var i = 0; i < arr.length; ++i) {
                if (arr[i] === obj) return i;
            }
            return -1;
        };
    });
    require.register("component-event/index.js", function(exports, require, module){
        var bind = window.addEventListener ? 'addEventListener' : 'attachEvent',
            unbind = window.removeEventListener ? 'removeEventListener' : 'detachEvent',
            prefix = bind !== 'addEventListener' ? 'on' : '';

        /**
         * Bind `el` event `type` to `fn`.
         *
         * @param {Element} el
         * @param {String} type
         * @param {Function} fn
         * @param {Boolean} capture
         * @return {Function}
         * @api public
         */

        exports.bind = function(el, type, fn, capture){
            el[bind](prefix + type, fn, capture || false);
            return fn;
        };

        /**
         * Unbind `el` event `type`'s callback `fn`.
         *
         * @param {Element} el
         * @param {String} type
         * @param {Function} fn
         * @param {Boolean} capture
         * @return {Function}
         * @api public
         */

        exports.unbind = function(el, type, fn, capture){
            el[unbind](prefix + type, fn, capture || false);
            return fn;
        };
    });
    require.register("timoxley-to-array/index.js", function(exports, require, module){
        /**
         * Convert an array-like object into an `Array`.
         * If `collection` is already an `Array`, then will return a clone of `collection`.
         *
         * @param {Array | Mixed} collection An `Array` or array-like object to convert e.g. `arguments` or `NodeList`
         * @return {Array} Naive conversion of `collection` to a new `Array`.
         * @api public
         */

        module.exports = function toArray(collection) {
            if (typeof collection === 'undefined') return []
            if (collection === null) return [null]
            if (collection === window) return [window]
            if (typeof collection === 'string') return [collection]
            if (isArray(collection)) return collection
            if (typeof collection.length != 'number') return [collection]
            if (typeof collection === 'function' && collection instanceof Function) return [collection]

            var arr = []
            for (var i = 0; i < collection.length; i++) {
                if (Object.prototype.hasOwnProperty.call(collection, i) || i in collection) {
                    arr.push(collection[i])
                }
            }
            if (!arr.length) return []
            return arr
        }

        function isArray(arr) {
            return Object.prototype.toString.call(arr) === "[object Array]";
        }

    });
    require.register("javve-events/index.js", function(exports, require, module){
        var events = require('event'),
            toArray = require('to-array');

        /**
         * Bind `el` event `type` to `fn`.
         *
         * @param {Element} el, NodeList, HTMLCollection or Array
         * @param {String} type
         * @param {Function} fn
         * @param {Boolean} capture
         * @api public
         */

        exports.bind = function(el, type, fn, capture){
            el = toArray(el);
            for ( var i = 0; i < el.length; i++ ) {
                events.bind(el[i], type, fn, capture);
            }
        };

        /**
         * Unbind `el` event `type`'s callback `fn`.
         *
         * @param {Element} el, NodeList, HTMLCollection or Array
         * @param {String} type
         * @param {Function} fn
         * @param {Boolean} capture
         * @api public
         */

        exports.unbind = function(el, type, fn, capture){
            el = toArray(el);
            for ( var i = 0; i < el.length; i++ ) {
                events.unbind(el[i], type, fn, capture);
            }
        };

    });
    require.register("javve-get-by-class/index.js", function(exports, require, module){
        /**
         * Find all elements with class `className` inside `container`.
         * Use `single = true` to increase performance in older browsers
         * when only one element is needed.
         *
         * @param {String} className
         * @param {Element} container
         * @param {Boolean} single
         * @api public
         */

        module.exports = (function() {
            if (document.getElementsByClassName) {
                return function(container, className, single) {
                    if (single) {
                        return container.getElementsByClassName(className)[0];
                    } else {
                        return container.getElementsByClassName(className);
                    }
                };
            } else if (document.querySelector) {
                return function(container, className, single) {
                    className = '.' + className;
                    if (single) {
                        return container.querySelector(className);
                    } else {
                        return container.querySelectorAll(className);
                    }
                };
            } else {
                return function(container, className, single) {
                    var classElements = [],
                        tag = '*';
                    if (container == null) {
                        container = document;
                    }
                    var els = container.getElementsByTagName(tag);
                    var elsLen = els.length;
                    var pattern = new RegExp("(^|\\s)"+className+"(\\s|$)");
                    for (var i = 0, j = 0; i < elsLen; i++) {
                        if ( pattern.test(els[i].className) ) {
                            if (single) {
                                return els[i];
                            } else {
                                classElements[j] = els[i];
                                j++;
                            }
                        }
                    }
                    return classElements;
                };
            }
        })();

    });
    require.register("javve-get-attribute/index.js", function(exports, require, module){
        /**
         * Return the value for `attr` at `element`.
         *
         * @param {Element} el
         * @param {String} attr
         * @api public
         */

        module.exports = function(el, attr) {
            var result = (el.getAttribute && el.getAttribute(attr)) || null;
            if( !result ) {
                var attrs = el.attributes;
                var length = attrs.length;
                for(var i = 0; i < length; i++) {
                    if (attr[i] !== undefined) {
                        if(attr[i].nodeName === attr) {
                            result = attr[i].nodeValue;
                        }
                    }
                }
            }
            return result;
        }
    });
    require.register("javve-natural-sort/index.js", function(exports, require, module){
        /*
         * Natural Sort algorithm for Javascript - Version 0.7 - Released under MIT license
         * Author: Jim Palmer (based on chunking idea from Dave Koelle)
         */

        module.exports = function(a, b, options) {
            var re = /(^-?[0-9]+(\.?[0-9]*)[df]?e?[0-9]?$|^0x[0-9a-f]+$|[0-9]+)/gi,
                sre = /(^[ ]*|[ ]*$)/g,
                dre = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/,
                hre = /^0x[0-9a-f]+$/i,
                ore = /^0/,
                options = options || {},
                i = function(s) { return options.insensitive && (''+s).toLowerCase() || ''+s },
            // convert all to strings strip whitespace
                x = i(a).replace(sre, '') || '',
                y = i(b).replace(sre, '') || '',
            // chunk/tokenize
                xN = x.replace(re, '\0$1\0').replace(/\0$/,'').replace(/^\0/,'').split('\0'),
                yN = y.replace(re, '\0$1\0').replace(/\0$/,'').replace(/^\0/,'').split('\0'),
            // numeric, hex or date detection
                xD = parseInt(x.match(hre)) || (xN.length != 1 && x.match(dre) && Date.parse(x)),
                yD = parseInt(y.match(hre)) || xD && y.match(dre) && Date.parse(y) || null,
                oFxNcL, oFyNcL,
                mult = options.desc ? -1 : 1;
            // first try and sort Hex codes or Dates
            if (yD)
                if ( xD < yD ) return -1 * mult;
                else if ( xD > yD ) return 1 * mult;
            // natural sorting through split numeric strings and default strings
            for(var cLoc=0, numS=Math.max(xN.length, yN.length); cLoc < numS; cLoc++) {
                // find floats not starting with '0', string or 0 if not defined (Clint Priest)
                oFxNcL = !(xN[cLoc] || '').match(ore) && parseFloat(xN[cLoc]) || xN[cLoc] || 0;
                oFyNcL = !(yN[cLoc] || '').match(ore) && parseFloat(yN[cLoc]) || yN[cLoc] || 0;
                // handle numeric vs string comparison - number < string - (Kyle Adams)
                if (isNaN(oFxNcL) !== isNaN(oFyNcL)) { return (isNaN(oFxNcL)) ? 1 : -1; }
                // rely on string comparison if different types - i.e. '02' < 2 != '02' < '2'
                else if (typeof oFxNcL !== typeof oFyNcL) {
                    oFxNcL += '';
                    oFyNcL += '';
                }
                if (oFxNcL < oFyNcL) return -1 * mult;
                if (oFxNcL > oFyNcL) return 1 * mult;
            }
            return 0;
        };

        /*
         var defaultSort = getSortFunction();

         module.exports = function(a, b, options) {
         if (arguments.length == 1) {
         options = a;
         return getSortFunction(options);
         } else {
         return defaultSort(a,b);
         }
         }
         */
    });
    require.register("javve-to-string/index.js", function(exports, require, module){
        module.exports = function(s) {
            s = (s === undefined) ? "" : s;
            s = (s === null) ? "" : s;
            s = s.toString();
            return s;
        };

    });
    require.register("component-type/index.js", function(exports, require, module){
        /**
         * toString ref.
         */

        var toString = Object.prototype.toString;

        /**
         * Return the type of `val`.
         *
         * @param {Mixed} val
         * @return {String}
         * @api public
         */

        module.exports = function(val){
            switch (toString.call(val)) {
                case '[object Date]': return 'date';
                case '[object RegExp]': return 'regexp';
                case '[object Arguments]': return 'arguments';
                case '[object Array]': return 'array';
                case '[object Error]': return 'error';
            }

            if (val === null) return 'null';
            if (val === undefined) return 'undefined';
            if (val !== val) return 'nan';
            if (val && val.nodeType === 1) return 'element';

            return typeof val.valueOf();
        };

    });
    require.register("list.js/index.js", function(exports, require, module){
        /*
         ListJS with beta 1.0.0
         By Jonny Strömberg (www.jonnystromberg.com, www.listjs.com)
         */
        (function( window, undefined ) {
            "use strict";

            var document = window.document,
                getByClass = require('get-by-class'),
                extend = require('extend'),
                indexOf = require('indexof');

            var List = function(id, options, values) {

                var self = this,
                    init,
                    Item = require('./src/item')(self),
                    addAsync = require('./src/add-async')(self),
                    parse = require('./src/parse')(self);

                init = {
                    start: function() {
                        self.listClass      = "list";
                        self.searchClass    = "search";
                        self.sortClass      = "sort";
                        self.page           = 200;
                        self.i              = 1;
                        self.items          = [];
                        self.visibleItems   = [];
                        self.matchingItems  = [];
                        self.searched       = false;
                        self.filtered       = false;
                        self.handlers       = { 'updated': [] };
                        self.plugins        = {};
                        self.helpers        = {
                            getByClass: getByClass,
                            extend: extend,
                            indexOf: indexOf
                        };

                        extend(self, options);

                        self.listContainer = (typeof(id) === 'string') ? document.getElementById(id) : id;
                        if (!self.listContainer) { return; }
                        self.list           = getByClass(self.listContainer, self.listClass, true);

                        self.templater      = require('./src/templater')(self);
                        self.search         = require('./src/search')(self);
                        self.filter         = require('./src/filter')(self);
                        self.sort           = require('./src/sort')(self);

                        this.items();
                        self.update();
                        this.plugins();
                    },
                    items: function() {
                        parse(self.list);
                        if (values !== undefined) {
                            self.add(values);
                        }
                    },
                    plugins: function() {
                        for (var i = 0; i < self.plugins.length; i++) {
                            var plugin = self.plugins[i];
                            self[plugin.name] = plugin;
                            plugin.init(self);
                        }
                    }
                };


                /*
                 * Add object to list
                 */
                this.add = function(values, callback) {
                    if (callback) {
                        addAsync(values, callback);
                        return;
                    }
                    var added = [],
                        notCreate = false;
                    if (values[0] === undefined){
                        values = [values];
                    }
                    for (var i = 0, il = values.length; i < il; i++) {
                        var item = null;
                        if (values[i] instanceof Item) {
                            item = values[i];
                            item.reload();
                        } else {
                            notCreate = (self.items.length > self.page) ? true : false;
                            item = new Item(values[i], undefined, notCreate);
                        }
                        self.items.push(item);
                        added.push(item);
                    }
                    self.update();
                    return added;
                };

                this.show = function(i, page) {
                    this.i = i;
                    this.page = page;
                    self.update();
                    return self;
                };

                /* Removes object from list.
                 * Loops through the list and removes objects where
                 * property "valuename" === value
                 */
                this.remove = function(valueName, value, options) {
                    var found = 0;
                    for (var i = 0, il = self.items.length; i < il; i++) {
                        if (self.items[i].values()[valueName] == value) {
                            self.templater.remove(self.items[i], options);
                            self.items.splice(i,1);
                            il--;
                            i--;
                            found++;
                        }
                    }
                    self.update();
                    return found;
                };

                /* Gets the objects in the list which
                 * property "valueName" === value
                 */
                this.get = function(valueName, value) {
                    var matchedItems = [];
                    for (var i = 0, il = self.items.length; i < il; i++) {
                        var item = self.items[i];
                        if (item.values()[valueName] == value) {
                            matchedItems.push(item);
                        }
                    }
                    return matchedItems;
                };

                /*
                 * Get size of the list
                 */
                this.size = function() {
                    return self.items.length;
                };

                /*
                 * Removes all items from the list
                 */
                this.clear = function() {
                    self.templater.clear();
                    self.items = [];
                    return self;
                };

                this.on = function(event, callback) {
                    self.handlers[event].push(callback);
                    return self;
                };

                this.off = function(event, callback) {
                    var e = self.handlers[event];
                    var index = indexOf(e, callback);
                    if (index > -1) {
                        e.splice(index, 1);
                    }
                    return self;
                };

                this.trigger = function(event) {
                    var i = self.handlers[event].length;
                    while(i--) {
                        self.handlers[event][i](self);
                    }
                    return self;
                };

                this.reset = {
                    filter: function() {
                        var is = self.items,
                            il = is.length;
                        while (il--) {
                            is[il].filtered = false;
                        }
                        return self;
                    },
                    search: function() {
                        var is = self.items,
                            il = is.length;
                        while (il--) {
                            is[il].found = false;
                        }
                        return self;
                    }
                };

                this.update = function() {
                    var is = self.items,
                        il = is.length;

                    self.visibleItems = [];
                    self.matchingItems = [];
                    self.templater.clear();
                    for (var i = 0; i < il; i++) {
                        if (is[i].matching() && ((self.matchingItems.length+1) >= self.i && self.visibleItems.length < self.page)) {
                            is[i].show();
                            self.visibleItems.push(is[i]);
                            self.matchingItems.push(is[i]);
                        } else if (is[i].matching()) {
                            self.matchingItems.push(is[i]);
                            is[i].hide();
                        } else {
                            is[i].hide();
                        }
                    }
                    self.trigger('updated');
                    return self;
                };

                init.start();
            };

            module.exports = List;

        })(window);

    });
    require.register("list.js/src/search.js", function(exports, require, module){
        var events = require('events'),
            getByClass = require('get-by-class'),
            toString = require('to-string');

        module.exports = function(list) {
            var item,
                text,
                columns,
                searchString,
                customSearch;

            var prepare = {
                resetList: function() {
                    list.i = 1;
                    list.templater.clear();
                    customSearch = undefined;
                },
                setOptions: function(args) {
                    if (args.length == 2 && args[1] instanceof Array) {
                        columns = args[1];
                    } else if (args.length == 2 && typeof(args[1]) == "function") {
                        customSearch = args[1];
                    } else if (args.length == 3) {
                        columns = args[1];
                        customSearch = args[2];
                    }
                },
                setColumns: function() {
                    columns = (columns === undefined) ? prepare.toArray(list.items[0].values()) : columns;
                },
                setSearchString: function(s) {
                    s = toString(s).toLowerCase();
                    s = s.replace(/[-[\]{}()*+?.,\\^$|#]/g, "\\$&"); // Escape regular expression characters
                    searchString = s;
                },
                toArray: function(values) {
                    var tmpColumn = [];
                    for (var name in values) {
                        tmpColumn.push(name);
                    }
                    return tmpColumn;
                }
            };
            var search = {
                list: function() {
                    for (var k = 0, kl = list.items.length; k < kl; k++) {
                        search.item(list.items[k]);
                    }
                },
                item: function(item) {
                    item.found = false;
                    for (var j = 0, jl = columns.length; j < jl; j++) {
                        if (search.values(item.values(), columns[j])) {
                            item.found = true;
                            return;
                        }
                    }
                },
                values: function(values, column) {
                    if (values.hasOwnProperty(column)) {
                        text = toString(values[column]).toLowerCase();
                        if ((searchString !== "") && (text.search(searchString) > -1)) {
                            return true;
                        }
                    }
                    return false;
                },
                reset: function() {
                    list.reset.search();
                    list.searched = false;
                }
            };

            var searchMethod = function(str) {
                list.trigger('searchStart');

                prepare.resetList();
                prepare.setSearchString(str);
                prepare.setOptions(arguments); // str, cols|searchFunction, searchFunction
                prepare.setColumns();

                if (searchString === "" ) {
                    search.reset();
                } else {
                    list.searched = true;
                    if (customSearch) {
                        customSearch(searchString, columns);
                    } else {
                        search.list();
                    }
                }
	            list.update();
                list.trigger('searchComplete');
                return list.visibleItems;
            };

            list.handlers.searchStart = list.handlers.searchStart || [];
            list.handlers.searchComplete = list.handlers.searchComplete || [];

            events.bind(getByClass(list.listContainer, list.searchClass), 'keyup', function(e) {
                var target = e.target || e.srcElement, // IE have srcElement
                    alreadyCleared = (target.value === "" && !list.searched);
                if (!alreadyCleared) { // If oninput already have resetted the list, do nothing
		            searchMethod(target.value);
                }
            });

            // Used to detect click on HTML5 clear button
            events.bind(getByClass(list.listContainer, list.searchClass), 'input', function(e) {
                var target = e.target || e.srcElement;
                if (target.value === "") {
                    searchMethod('');
                }
            });

            list.helpers.toString = toString;
            return searchMethod;
        };

    });
    require.register("list.js/src/sort.js", function(exports, require, module){
        var naturalSort = require('natural-sort'),
            classes = require('classes'),
            events = require('events'),
            getByClass = require('get-by-class'),
            getAttribute = require('get-attribute');

        module.exports = function(list) {
            list.sortFunction = list.sortFunction || function(itemA, itemB, options) {
                    options.desc = options.order == "desc" ? true : false; // Natural sort uses this format
                    return naturalSort(itemA.values()[options.valueName], itemB.values()[options.valueName], options);
                };

            var buttons = {
                els: undefined,
                clear: function() {
                    for (var i = 0, il = buttons.els.length; i < il; i++) {
                        classes(buttons.els[i]).remove('asc');
                        classes(buttons.els[i]).remove('desc');
                    }
                },
                getOrder: function(btn) {
                    var predefinedOrder = getAttribute(btn, 'data-order');
                    if (predefinedOrder == "asc" || predefinedOrder == "desc") {
                        return predefinedOrder;
                    } else if (classes(btn).has('desc')) {
                        return "asc";
                    } else if (classes(btn).has('asc')) {
                        return "desc";
                    } else {
                        return "asc";
                    }
                },
                getInSensitive: function(btn, options) {
                    var insensitive = getAttribute(btn, 'data-insensitive');
                    if (insensitive === "true") {
                        options.insensitive = true;
                    } else {
                        options.insensitive = false;
                    }
                },
                setOrder: function(options) {
                    for (var i = 0, il = buttons.els.length; i < il; i++) {
                        var btn = buttons.els[i];
                        if (getAttribute(btn, 'data-sort') !== options.valueName) {
                            continue;
                        }
                        var predefinedOrder = getAttribute(btn, 'data-order');
                        if (predefinedOrder == "asc" || predefinedOrder == "desc") {
                            if (predefinedOrder == options.order) {
                                classes(btn).add(options.order);
                            }
                        } else {
                            classes(btn).add(options.order);
                        }
                    }
                }
            };
            var sort = function() {
                list.trigger('sortStart');
                options = {};

                var target = arguments[0].currentTarget || arguments[0].srcElement || undefined;

                if (target) {
                    options.valueName = getAttribute(target, 'data-sort');
                    buttons.getInSensitive(target, options);
                    options.order = buttons.getOrder(target);
                } else {
                    options = arguments[1] || options;
                    options.valueName = arguments[0];
                    options.order = options.order || "asc";
                    options.insensitive = (typeof options.insensitive == "undefined") ? true : options.insensitive;
                }
                buttons.clear();
                buttons.setOrder(options);

                options.sortFunction = options.sortFunction || list.sortFunction;
                list.items.sort(function(a, b) {
                    return options.sortFunction(a, b, options);
                });
                list.update();
                list.trigger('sortComplete');
            };

            // Add handlers
            list.handlers.sortStart = list.handlers.sortStart || [];
            list.handlers.sortComplete = list.handlers.sortComplete || [];

            buttons.els = getByClass(list.listContainer, list.sortClass);
            events.bind(buttons.els, 'click', sort);
            list.on('searchStart', buttons.clear);
            list.on('filterStart', buttons.clear);

            // Helpers
            list.helpers.classes = classes;
            list.helpers.naturalSort = naturalSort;
            list.helpers.events = events;
            list.helpers.getAttribute = getAttribute;

            return sort;
        };

    });
    require.register("list.js/src/item.js", function(exports, require, module){
        module.exports = function(list) {
            return function(initValues, element, notCreate) {
                var item = this;

                this._values = {};

                this.found = false; // Show if list.searched == true and this.found == true
                this.filtered = false;// Show if list.filtered == true and this.filtered == true

                var init = function(initValues, element, notCreate) {
                    if (element === undefined) {
                        if (notCreate) {
                            item.values(initValues, notCreate);
                        } else {
                            item.values(initValues);
                        }
                    } else {
                        item.elm = element;
                        var values = list.templater.get(item, initValues);
                        item.values(values);
                    }
                };
                this.values = function(newValues, notCreate) {
                    if (newValues !== undefined) {
                        for(var name in newValues) {
                            item._values[name] = newValues[name];
                        }
                        if (notCreate !== true) {
                            list.templater.set(item, item.values());
                        }
                    } else {
                        return item._values;
                    }
                };
                this.show = function() {
                    list.templater.show(item);
                };
                this.hide = function() {
                    list.templater.hide(item);
                };
                this.matching = function() {
                    return (
                    (list.filtered && list.searched && item.found && item.filtered) ||
                    (list.filtered && !list.searched && item.filtered) ||
                    (!list.filtered && list.searched && item.found) ||
                    (!list.filtered && !list.searched)
                    );
                };
                this.visible = function() {
                    return (item.elm.parentNode == list.list) ? true : false;
                };
                init(initValues, element, notCreate);
            };
        };

    });
    require.register("list.js/src/templater.js", function(exports, require, module){
        var getByClass = require('get-by-class');

        var Templater = function(list) {
            var itemSource = getItemSource(list.item),
                templater = this;

            function getItemSource(item) {
                if (item === undefined) {
                    var nodes = list.list.childNodes,
                        items = [];

                    for (var i = 0, il = nodes.length; i < il; i++) {
                        // Only textnodes have a data attribute
                        if (nodes[i].data === undefined) {
                            return nodes[i];
                        }
                    }
                    return null;
                } else if (item.indexOf("<") !== -1) { // Try create html element of list, do not work for tables!!
                    var div = document.createElement('div');
                    div.innerHTML = item;
                    return div.firstChild;
                } else {
                    return document.getElementById(list.item);
                }
            }

            /* Get values from element */
            this.get = function(item, valueNames) {
                templater.create(item);
                var values = {};
                for(var i = 0, il = valueNames.length; i < il; i++) {
                    var elm = getByClass(item.elm, valueNames[i], true);
                    values[valueNames[i]] = elm ? elm.innerHTML : "";
                }
                return values;
            };

            /* Sets values at element */
            this.set = function(item, values) {
                if (!templater.create(item)) {
                    for(var v in values) {
                        if (values.hasOwnProperty(v)) {
                            // TODO speed up if possible
                            var elm = getByClass(item.elm, v, true);
                            if (elm) {
                                /* src attribute for image tag & text for other tags */
                                if (elm.tagName === "IMG" && values[v] !== "") {
                                    elm.src = values[v];
                                } else {
                                    elm.innerHTML = values[v];
                                }
                            }
                        }
                    }
                }
            };

            this.create = function(item) {
                if (item.elm !== undefined) {
                    return false;
                }
                /* If item source does not exists, use the first item in list as
                 source for new items */
                var newItem = itemSource.cloneNode(true);
                newItem.removeAttribute('id');
                item.elm = newItem;
                templater.set(item, item.values());
                return true;
            };
            this.remove = function(item) {
                list.list.removeChild(item.elm);
            };
            this.show = function(item) {
                templater.create(item);
                list.list.appendChild(item.elm);
            };
            this.hide = function(item) {
                if (item.elm !== undefined && item.elm.parentNode === list.list) {
                    list.list.removeChild(item.elm);
                }
            };
            this.clear = function() {
                /* .innerHTML = ''; fucks up IE */
                if (list.list.hasChildNodes()) {
                    while (list.list.childNodes.length >= 1)
                    {
                        list.list.removeChild(list.list.firstChild);
                    }
                }
            };
        };

        module.exports = function(list) {
            return new Templater(list);
        };

    });
    require.register("list.js/src/filter.js", function(exports, require, module){
        module.exports = function(list) {

            // Add handlers
            list.handlers.filterStart = list.handlers.filterStart || [];
            list.handlers.filterComplete = list.handlers.filterComplete || [];

            return function(filterFunction) {
                list.trigger('filterStart');
                list.i = 1; // Reset paging
                list.reset.filter();
                if (filterFunction === undefined) {
                    list.filtered = false;
                } else {
                    list.filtered = true;
                    var is = list.items;
                    for (var i = 0, il = is.length; i < il; i++) {
                        var item = is[i];
                        if (filterFunction(item)) {
                            item.filtered = true;
                        } else {
                            item.filtered = false;
                        }
                    }
                }
                list.update();
                list.trigger('filterComplete');
                return list.visibleItems;
            };
        };

    });
    require.register("list.js/src/add-async.js", function(exports, require, module){
        module.exports = function(list) {
            return function(values, callback, items) {
                var valuesToAdd = values.splice(0, 100);
                items = items || [];
                items = items.concat(list.add(valuesToAdd));
                if (values.length > 0) {
                    setTimeout(function() {
                        addAsync(values, callback, items);
                    }, 10);
                } else {
                    list.update();
                    callback(items);
                }
            };
        };
    });
    require.register("list.js/src/parse.js", function(exports, require, module){
        module.exports = function(list) {

            var Item = require('./item')(list);

            var getChildren = function(parent) {
                var nodes = parent.childNodes,
                    items = [];
                for (var i = 0, il = nodes.length; i < il; i++) {
                    // Only textnodes have a data attribute
                    if (nodes[i].data === undefined) {
                        items.push(nodes[i]);
                    }
                }
                return items;
            };

            var parse = function(itemElements, valueNames) {
                for (var i = 0, il = itemElements.length; i < il; i++) {
                    list.items.push(new Item(valueNames, itemElements[i]));
                }
            };
            var parseAsync = function(itemElements, valueNames) {
                var itemsToIndex = itemElements.splice(0, 100); // TODO: If < 100 items, what happens in IE etc?
                parse(itemsToIndex, valueNames);
                if (itemElements.length > 0) {
                    setTimeout(function() {
                        init.items.indexAsync(itemElements, valueNames);
                    }, 10);
                } else {
                    list.update();
                    // TODO: Add indexed callback
                }
            };

            return function() {
                var itemsToIndex = getChildren(list.list),
                    valueNames = list.valueNames;

                if (list.indexAsync) {
                    parseAsync(itemsToIndex, valueNames);
                } else {
                    parse(itemsToIndex, valueNames);
                }
            };
        };

    });




















    require.alias("component-classes/index.js", "list.js/deps/classes/index.js");
    require.alias("component-classes/index.js", "classes/index.js");
    require.alias("component-indexof/index.js", "component-classes/deps/indexof/index.js");

    require.alias("segmentio-extend/index.js", "list.js/deps/extend/index.js");
    require.alias("segmentio-extend/index.js", "extend/index.js");

    require.alias("component-indexof/index.js", "list.js/deps/indexof/index.js");
    require.alias("component-indexof/index.js", "indexof/index.js");

    require.alias("javve-events/index.js", "list.js/deps/events/index.js");
    require.alias("javve-events/index.js", "events/index.js");
    require.alias("component-event/index.js", "javve-events/deps/event/index.js");

    require.alias("timoxley-to-array/index.js", "javve-events/deps/to-array/index.js");

    require.alias("javve-get-by-class/index.js", "list.js/deps/get-by-class/index.js");
    require.alias("javve-get-by-class/index.js", "get-by-class/index.js");

    require.alias("javve-get-attribute/index.js", "list.js/deps/get-attribute/index.js");
    require.alias("javve-get-attribute/index.js", "get-attribute/index.js");

    require.alias("javve-natural-sort/index.js", "list.js/deps/natural-sort/index.js");
    require.alias("javve-natural-sort/index.js", "natural-sort/index.js");

    require.alias("javve-to-string/index.js", "list.js/deps/to-string/index.js");
    require.alias("javve-to-string/index.js", "list.js/deps/to-string/index.js");
    require.alias("javve-to-string/index.js", "to-string/index.js");
    require.alias("javve-to-string/index.js", "javve-to-string/index.js");
    require.alias("component-type/index.js", "list.js/deps/type/index.js");
    require.alias("component-type/index.js", "type/index.js");
    if (typeof exports == "object") {
        module.exports = require("list.js");
    } else if (typeof define == "function" && define.amd) {
        define(function(){ return require("list.js"); });
    } else {
        this["List"] = require("list.js");
    }})();
/* End List.js */


/**
 *  *   ddSlick
 *  */
!function(e){function d(e,d){var t=e.data("ddslick"),o=e.find(".dd-selected"),s=o.siblings(".dd-selected-value"),l=(e.find(".dd-options"),o.siblings(".dd-pointer"),e.find(".dd-option").eq(d)),a=l.closest("li"),c=t.settings,r=t.settings.data[d];e.find(".dd-option").removeClass("dd-option-selected"),l.addClass("dd-option-selected"),t.selectedIndex=d,t.selectedItem=a,t.selectedData=r,o.html(c.showSelectedHTML?(r.imageSrc?'<img class="dd-selected-image'+("right"==c.imagePosition?" dd-image-right":"")+'" src="'+r.imageSrc+'" />':"")+(r.text?'<label class="dd-selected-text">'+r.text+"</label>":"")+(r.description?'<small class="dd-selected-description dd-desc'+(c.truncateDescription?" dd-selected-description-truncated":"")+'" >'+r.description+"</small>":""):r.text),s.val(r.value),t.original.val(r.value),e.data("ddslick",t),i(e),n(e),"function"==typeof c.onSelected&&c.onSelected.call(this,t)}function t(d){var t=d.find(".dd-select"),i=t.siblings(".dd-options"),n=t.find(".dd-pointer"),s=i.is(":visible");e(".dd-click-off-close").not(i).slideUp(50),e(".dd-pointer").removeClass("dd-pointer-up"),s?(i.slideUp("fast"),n.removeClass("dd-pointer-up")):(i.slideDown("fast"),n.addClass("dd-pointer-up")),o(d)}function i(e){e.find(".dd-options").slideUp(50),e.find(".dd-pointer").removeClass("dd-pointer-up").removeClass("dd-pointer-up")}function n(e){e.find(".dd-select").css("height"),e.find(".dd-selected-description"),e.find(".dd-selected-image")}function o(d){d.find(".dd-option").each(function(){{var t=e(this);t.css("height"),t.find(".dd-option-description"),d.find(".dd-option-image")}})}e.fn.ddslick=function(d){return s[d]?s[d].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof d&&d?void e.error("Method "+d+" does not exists."):s.init.apply(this,arguments)};var s={},l={data:[],keepJSONItemsOnTop:!1,width:260,height:null,background:"#eee",selectText:"",defaultSelectedIndex:null,truncateDescription:!0,imagePosition:"left",showSelectedHTML:!0,clickOffToClose:!0,onSelected:function(){}},a='<div class="dd-select"><input class="dd-selected-value" type="hidden" /><a class="dd-selected"></a><span class="dd-pointer dd-pointer-down"></span></div>',c='<ul class="dd-options"></ul>',r='<style id="css-ddslick" type="text/css">.dd-select{ border-radius:2px; border:solid 1px #ccc; position:relative; cursor:pointer;}.dd-desc { color:#aaa; display:block; overflow: hidden; font-weight:normal; line-height: 1.4em; }.dd-selected{ overflow:hidden; display:block; padding:10px; font-weight:bold;}.dd-pointer{ width:0; height:0; position:absolute; right:10px; top:50%; margin-top:-3px;}.dd-pointer-down{ border:solid 5px transparent; border-top:solid 5px #000; }.dd-pointer-up{border:solid 5px transparent !important; border-bottom:solid 5px #000 !important; margin-top:-8px;}.dd-options{ border:solid 1px #ccc; border-top:none; list-style:none; box-shadow:0px 1px 5px #ddd; display:none; position:absolute; z-index:2000; margin:0; padding:0;background:#fff; overflow:auto;}.dd-option{ padding:10px; display:block; border-bottom:solid 1px #ddd; overflow:hidden; text-decoration:none; color:#333; cursor:pointer;-webkit-transition: all 0.25s ease-in-out; -moz-transition: all 0.25s ease-in-out;-o-transition: all 0.25s ease-in-out;-ms-transition: all 0.25s ease-in-out; }.dd-options > li:last-child > .dd-option{ border-bottom:none;}.dd-option:hover{ background:#f3f3f3; color:#000;}.dd-selected-description-truncated { text-overflow: ellipsis; white-space:nowrap; }.dd-option-selected { background:#f6f6f6; }.dd-option-image, .dd-selected-image { vertical-align:middle; float:left; margin-right:5px; max-width:64px;}.dd-image-right { float:right; margin-right:15px; margin-left:5px;}.dd-container{ position:relative;}​ .dd-selected-text { font-weight:bold}​</style>';e("#css-ddslick").length<=0&&e(r).appendTo("head"),s.init=function(i){var i=e.extend({},l,i);return this.each(function(){var n=e(this),o=n.data("ddslick");if(!o){{var s=[];i.data}n.find("option").each(function(){var d=e(this),t=d.data();s.push({text:e.trim(d.text()),value:d.val(),selected:d.is(":selected"),description:t.description,imageSrc:t.imagesrc})}),i.keepJSONItemsOnTop?e.merge(i.data,s):i.data=e.merge(s,i.data);var l=n,r=e('<div id="'+n.attr("id")+'"></div>');n.replaceWith(r),n=r,n.addClass("dd-container").append(a).append(c);var s=n.find(".dd-select"),p=n.find(".dd-options");p.css({width:i.width}),s.css({width:i.width,background:i.background}),n.css({width:i.width}),null!=i.height&&p.css({height:i.height,overflow:"auto"}),e.each(i.data,function(e,d){d.selected&&(i.defaultSelectedIndex=e),p.append('<li><a class="dd-option">'+(d.value?' <input class="dd-option-value" type="hidden" value="'+d.value+'" />':"")+(d.imageSrc?' <img class="dd-option-image'+("right"==i.imagePosition?" dd-image-right":"")+'" src="'+d.imageSrc+'" />':"")+(d.text?' <label class="dd-option-text">'+d.text+"</label>":"")+(d.description?' <small class="dd-option-description dd-desc">'+d.description+"</small>":"")+"</a></li>")});var f={settings:i,original:l,selectedIndex:-1,selectedItem:null,selectedData:null};if(n.data("ddslick",f),i.selectText.length>0&&null==i.defaultSelectedIndex)n.find(".dd-selected").html(i.selectText);else{var u=null!=i.defaultSelectedIndex&&i.defaultSelectedIndex>=0&&i.defaultSelectedIndex<i.data.length?i.defaultSelectedIndex:0;d(n,u)}n.find(".dd-select").on("click.ddslick",function(){t(n)}),n.find(".dd-option").on("click.ddslick",function(){d(n,e(this).closest("li").index())}),i.clickOffToClose&&(p.addClass("dd-click-off-close"),n.on("click.ddslick",function(e){e.stopPropagation()}),e("body").on("click",function(){e(".dd-click-off-close").slideUp(50).siblings(".dd-select").find(".dd-pointer").removeClass("dd-pointer-up")}))}})},s.select=function(t){return this.each(function(){t.index&&d(e(this),t.index)})},s.open=function(){return this.each(function(){var d=e(this),i=d.data("ddslick");i&&t(d)})},s.close=function(){return this.each(function(){var d=e(this),t=d.data("ddslick");t&&i(d)})},s.destroy=function(){return this.each(function(){var d=e(this),t=d.data("ddslick");if(t){var i=t.original;d.removeData("ddslick").unbind(".ddslick").replaceWith(i)}})}}(jQuery);


/*!
 jQuery Waypoints - v2.0.5
 Copyright (c) 2011-2014 Caleb Troughton
 Licensed under the MIT license.
 https://github.com/imakewebthings/jquery-waypoints/blob/master/licenses.txt
 */

(function(){var t=[].indexOf||function(t){for(var e=0,n=this.length;e<n;e++){if(e in this&&this[e]===t)return e}return-1},e=[].slice;(function(t,e){if(typeof define==="function"&&define.amd){return define("waypoints",["jquery"],function(n){return e(n,t)})}else{return e(t.jQuery,t)}})(window,function(n,r){var i,o,l,s,f,u,c,a,h,d,p,y,v,w,g,m;i=n(r);a=t.call(r,"ontouchstart")>=0;s={horizontal:{},vertical:{}};f=1;c={};u="waypoints-context-id";p="resize.waypoints";y="scroll.waypoints";v=1;w="waypoints-waypoint-ids";g="waypoint";m="waypoints";o=function(){function t(t){var e=this;this.$element=t;this.element=t[0];this.didResize=false;this.didScroll=false;this.id="context"+f++;this.oldScroll={x:t.scrollLeft(),y:t.scrollTop()};this.waypoints={horizontal:{},vertical:{}};this.element[u]=this.id;c[this.id]=this;t.bind(y,function(){var t;if(!(e.didScroll||a)){e.didScroll=true;t=function(){e.doScroll();return e.didScroll=false};return r.setTimeout(t,n[m].settings.scrollThrottle)}});t.bind(p,function(){var t;if(!e.didResize){e.didResize=true;t=function(){n[m]("refresh");return e.didResize=false};return r.setTimeout(t,n[m].settings.resizeThrottle)}})}t.prototype.doScroll=function(){var t,e=this;t={horizontal:{newScroll:this.$element.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.$element.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};if(a&&(!t.vertical.oldScroll||!t.vertical.newScroll)){n[m]("refresh")}n.each(t,function(t,r){var i,o,l;l=[];o=r.newScroll>r.oldScroll;i=o?r.forward:r.backward;n.each(e.waypoints[t],function(t,e){var n,i;if(r.oldScroll<(n=e.offset)&&n<=r.newScroll){return l.push(e)}else if(r.newScroll<(i=e.offset)&&i<=r.oldScroll){return l.push(e)}});l.sort(function(t,e){return t.offset-e.offset});if(!o){l.reverse()}return n.each(l,function(t,e){if(e.options.continuous||t===l.length-1){return e.trigger([i])}})});return this.oldScroll={x:t.horizontal.newScroll,y:t.vertical.newScroll}};t.prototype.refresh=function(){var t,e,r,i=this;r=n.isWindow(this.element);e=this.$element.offset();this.doScroll();t={horizontal:{contextOffset:r?0:e.left,contextScroll:r?0:this.oldScroll.x,contextDimension:this.$element.width(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:r?0:e.top,contextScroll:r?0:this.oldScroll.y,contextDimension:r?n[m]("viewportHeight"):this.$element.height(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};return n.each(t,function(t,e){return n.each(i.waypoints[t],function(t,r){var i,o,l,s,f;i=r.options.offset;l=r.offset;o=n.isWindow(r.element)?0:r.$element.offset()[e.offsetProp];if(n.isFunction(i)){i=i.apply(r.element)}else if(typeof i==="string"){i=parseFloat(i);if(r.options.offset.indexOf("%")>-1){i=Math.ceil(e.contextDimension*i/100)}}r.offset=o-e.contextOffset+e.contextScroll-i;if(r.options.onlyOnScroll&&l!=null||!r.enabled){return}if(l!==null&&l<(s=e.oldScroll)&&s<=r.offset){return r.trigger([e.backward])}else if(l!==null&&l>(f=e.oldScroll)&&f>=r.offset){return r.trigger([e.forward])}else if(l===null&&e.oldScroll>=r.offset){return r.trigger([e.forward])}})})};t.prototype.checkEmpty=function(){if(n.isEmptyObject(this.waypoints.horizontal)&&n.isEmptyObject(this.waypoints.vertical)){this.$element.unbind([p,y].join(" "));return delete c[this.id]}};return t}();l=function(){function t(t,e,r){var i,o;if(r.offset==="bottom-in-view"){r.offset=function(){var t;t=n[m]("viewportHeight");if(!n.isWindow(e.element)){t=e.$element.height()}return t-n(this).outerHeight()}}this.$element=t;this.element=t[0];this.axis=r.horizontal?"horizontal":"vertical";this.callback=r.handler;this.context=e;this.enabled=r.enabled;this.id="waypoints"+v++;this.offset=null;this.options=r;e.waypoints[this.axis][this.id]=this;s[this.axis][this.id]=this;i=(o=this.element[w])!=null?o:[];i.push(this.id);this.element[w]=i}t.prototype.trigger=function(t){if(!this.enabled){return}if(this.callback!=null){this.callback.apply(this.element,t)}if(this.options.triggerOnce){return this.destroy()}};t.prototype.disable=function(){return this.enabled=false};t.prototype.enable=function(){this.context.refresh();return this.enabled=true};t.prototype.destroy=function(){delete s[this.axis][this.id];delete this.context.waypoints[this.axis][this.id];return this.context.checkEmpty()};t.getWaypointsByElement=function(t){var e,r;r=t[w];if(!r){return[]}e=n.extend({},s.horizontal,s.vertical);return n.map(r,function(t){return e[t]})};return t}();d={init:function(t,e){var r;e=n.extend({},n.fn[g].defaults,e);if((r=e.handler)==null){e.handler=t}this.each(function(){var t,r,i,s;t=n(this);i=(s=e.context)!=null?s:n.fn[g].defaults.context;if(!n.isWindow(i)){i=t.closest(i)}i=n(i);r=c[i[0][u]];if(!r){r=new o(i)}return new l(t,r,e)});n[m]("refresh");return this},disable:function(){return d._invoke.call(this,"disable")},enable:function(){return d._invoke.call(this,"enable")},destroy:function(){return d._invoke.call(this,"destroy")},prev:function(t,e){return d._traverse.call(this,t,e,function(t,e,n){if(e>0){return t.push(n[e-1])}})},next:function(t,e){return d._traverse.call(this,t,e,function(t,e,n){if(e<n.length-1){return t.push(n[e+1])}})},_traverse:function(t,e,i){var o,l;if(t==null){t="vertical"}if(e==null){e=r}l=h.aggregate(e);o=[];this.each(function(){var e;e=n.inArray(this,l[t]);return i(o,e,l[t])});return this.pushStack(o)},_invoke:function(t){this.each(function(){var e;e=l.getWaypointsByElement(this);return n.each(e,function(e,n){n[t]();return true})});return this}};n.fn[g]=function(){var t,r;r=arguments[0],t=2<=arguments.length?e.call(arguments,1):[];if(d[r]){return d[r].apply(this,t)}else if(n.isFunction(r)){return d.init.apply(this,arguments)}else if(n.isPlainObject(r)){return d.init.apply(this,[null,r])}else if(!r){return n.error("jQuery Waypoints needs a callback function or handler option.")}else{return n.error("The "+r+" method does not exist in jQuery Waypoints.")}};n.fn[g].defaults={context:r,continuous:true,enabled:true,horizontal:false,offset:0,triggerOnce:false};h={refresh:function(){return n.each(c,function(t,e){return e.refresh()})},viewportHeight:function(){var t;return(t=r.innerHeight)!=null?t:i.height()},aggregate:function(t){var e,r,i;e=s;if(t){e=(i=c[n(t)[0][u]])!=null?i.waypoints:void 0}if(!e){return[]}r={horizontal:[],vertical:[]};n.each(r,function(t,i){n.each(e[t],function(t,e){return i.push(e)});i.sort(function(t,e){return t.offset-e.offset});r[t]=n.map(i,function(t){return t.element});return r[t]=n.unique(r[t])});return r},above:function(t){if(t==null){t=r}return h._filter(t,"vertical",function(t,e){return e.offset<=t.oldScroll.y})},below:function(t){if(t==null){t=r}return h._filter(t,"vertical",function(t,e){return e.offset>t.oldScroll.y})},left:function(t){if(t==null){t=r}return h._filter(t,"horizontal",function(t,e){return e.offset<=t.oldScroll.x})},right:function(t){if(t==null){t=r}return h._filter(t,"horizontal",function(t,e){return e.offset>t.oldScroll.x})},enable:function(){return h._invoke("enable")},disable:function(){return h._invoke("disable")},destroy:function(){return h._invoke("destroy")},extendFn:function(t,e){return d[t]=e},_invoke:function(t){var e;e=n.extend({},s.vertical,s.horizontal);return n.each(e,function(e,n){n[t]();return true})},_filter:function(t,e,r){var i,o;i=c[n(t)[0][u]];if(!i){return[]}o=[];n.each(i.waypoints[e],function(t,e){if(r(i,e)){return o.push(e)}});o.sort(function(t,e){return t.offset-e.offset});return n.map(o,function(t){return t.element})}};n[m]=function(){var t,n;n=arguments[0],t=2<=arguments.length?e.call(arguments,1):[];if(h[n]){return h[n].apply(null,t)}else{return h.aggregate.call(null,n)}};n[m].settings={resizeThrottle:100,scrollThrottle:30};return i.on("load.waypoints",function(){return n[m]("refresh")})})}).call(this);
// Generated by CoffeeScript 1.6.2
/*
 Sticky Elements Shortcut for jQuery Waypoints - v2.0.5
 Copyright (c) 2011-2014 Caleb Troughton
 Licensed under the MIT license.
 https://github.com/imakewebthings/jquery-waypoints/blob/master/licenses.txt
 */

(function(){(function(t,n){if(typeof define==="function"&&define.amd){return define(["jquery","waypoints"],n)}else{return n(t.jQuery)}})(window,function(t){var n,i;n={wrapper:'<div class="sticky-wrapper" />',stuckClass:"stuck",direction:"down right"};i=function(t,n){var i;t.wrap(n.wrapper);i=t.parent();return i.data("isWaypointStickyWrapper",true)};t.waypoints("extendFn","sticky",function(r){var e,a,s;a=t.extend({},t.fn.waypoint.defaults,n,r);e=i(this,a);s=a.handler;a.handler=function(n){var i,r;i=t(this).children(":first");r=a.direction.indexOf(n)!==-1;i.toggleClass(a.stuckClass,r);e.height(r?i.outerHeight():"");if(s!=null){return s.call(this,n)}};e.waypoint(a);return this.data("stuckClass",a.stuckClass)});return t.waypoints("extendFn","unsticky",function(){var t;t=this.parent();if(!t.data("isWaypointStickyWrapper")){return this}t.waypoint("destroy");this.unwrap();return this.removeClass(this.data("stuckClass"))})})}).call(this);
/*
 *  jQuery OwlCarousel v1.3.3
 *
 *  Copyright (c) 2013 Bartosz Wojciechowski
 *  http://www.owlgraphic.com/owlcarousel/
 *
 *  Licensed under MIT
 *
 */

"function"!==typeof Object.create&&(Object.create=function(f){function g(){}g.prototype=f;return new g});
(function(f,g,k){var l={init:function(a,b){this.$elem=f(b);this.options=f.extend({},f.fn.owlCarousel.options,this.$elem.data(),a);this.userOptions=a;this.loadContent()},loadContent:function(){function a(a){var d,e="";if("function"===typeof b.options.jsonSuccess)b.options.jsonSuccess.apply(this,[a]);else{for(d in a.owl)a.owl.hasOwnProperty(d)&&(e+=a.owl[d].item);b.$elem.html(e)}b.logIn()}var b=this,e;"function"===typeof b.options.beforeInit&&b.options.beforeInit.apply(this,[b.$elem]);"string"===typeof b.options.jsonPath?
    (e=b.options.jsonPath,f.getJSON(e,a)):b.logIn()},logIn:function(){this.$elem.data("owl-originalStyles",this.$elem.attr("style"));this.$elem.data("owl-originalClasses",this.$elem.attr("class"));this.$elem.css({opacity:0});this.orignalItems=this.options.items;this.checkBrowser();this.wrapperWidth=0;this.checkVisible=null;this.setVars()},setVars:function(){if(0===this.$elem.children().length)return!1;this.baseClass();this.eventTypes();this.$userItems=this.$elem.children();this.itemsAmount=this.$userItems.length;
    this.wrapItems();this.$owlItems=this.$elem.find(".owl-item");this.$owlWrapper=this.$elem.find(".owl-wrapper");this.playDirection="next";this.prevItem=0;this.prevArr=[0];this.currentItem=0;this.customEvents();this.onStartup()},onStartup:function(){this.updateItems();this.calculateAll();this.buildControls();this.updateControls();this.response();this.moveEvents();this.stopOnHover();this.owlStatus();!1!==this.options.transitionStyle&&this.transitionTypes(this.options.transitionStyle);!0===this.options.autoPlay&&
(this.options.autoPlay=5E3);this.play();this.$elem.find(".owl-wrapper").css("display","block");this.$elem.is(":visible")?this.$elem.css("opacity",1):this.watchVisibility();this.onstartup=!1;this.eachMoveUpdate();"function"===typeof this.options.afterInit&&this.options.afterInit.apply(this,[this.$elem])},eachMoveUpdate:function(){!0===this.options.lazyLoad&&this.lazyLoad();!0===this.options.autoHeight&&this.autoHeight();this.onVisibleItems();"function"===typeof this.options.afterAction&&this.options.afterAction.apply(this,
    [this.$elem])},updateVars:function(){"function"===typeof this.options.beforeUpdate&&this.options.beforeUpdate.apply(this,[this.$elem]);this.watchVisibility();this.updateItems();this.calculateAll();this.updatePosition();this.updateControls();this.eachMoveUpdate();"function"===typeof this.options.afterUpdate&&this.options.afterUpdate.apply(this,[this.$elem])},reload:function(){var a=this;g.setTimeout(function(){a.updateVars()},0)},watchVisibility:function(){var a=this;if(!1===a.$elem.is(":visible"))a.$elem.css({opacity:0}),
    g.clearInterval(a.autoPlayInterval),g.clearInterval(a.checkVisible);else return!1;a.checkVisible=g.setInterval(function(){a.$elem.is(":visible")&&(a.reload(),a.$elem.animate({opacity:1},200),g.clearInterval(a.checkVisible))},500)},wrapItems:function(){this.$userItems.wrapAll('<div class="owl-wrapper">').wrap('<div class="owl-item"></div>');this.$elem.find(".owl-wrapper").wrap('<div class="owl-wrapper-outer">');this.wrapperOuter=this.$elem.find(".owl-wrapper-outer");this.$elem.css("display","block")},
    baseClass:function(){var a=this.$elem.hasClass(this.options.baseClass),b=this.$elem.hasClass(this.options.theme);a||this.$elem.addClass(this.options.baseClass);b||this.$elem.addClass(this.options.theme)},updateItems:function(){var a,b;if(!1===this.options.responsive)return!1;if(!0===this.options.singleItem)return this.options.items=this.orignalItems=1,this.options.itemsCustom=!1,this.options.itemsDesktop=!1,this.options.itemsDesktopSmall=!1,this.options.itemsTablet=!1,this.options.itemsTabletSmall=
        !1,this.options.itemsMobile=!1;a=f(this.options.responsiveBaseWidth).width();a>(this.options.itemsDesktop[0]||this.orignalItems)&&(this.options.items=this.orignalItems);if(!1!==this.options.itemsCustom)for(this.options.itemsCustom.sort(function(a,b){return a[0]-b[0]}),b=0;b<this.options.itemsCustom.length;b+=1)this.options.itemsCustom[b][0]<=a&&(this.options.items=this.options.itemsCustom[b][1]);else a<=this.options.itemsDesktop[0]&&!1!==this.options.itemsDesktop&&(this.options.items=this.options.itemsDesktop[1]),
    a<=this.options.itemsDesktopSmall[0]&&!1!==this.options.itemsDesktopSmall&&(this.options.items=this.options.itemsDesktopSmall[1]),a<=this.options.itemsTablet[0]&&!1!==this.options.itemsTablet&&(this.options.items=this.options.itemsTablet[1]),a<=this.options.itemsTabletSmall[0]&&!1!==this.options.itemsTabletSmall&&(this.options.items=this.options.itemsTabletSmall[1]),a<=this.options.itemsMobile[0]&&!1!==this.options.itemsMobile&&(this.options.items=this.options.itemsMobile[1]);this.options.items>this.itemsAmount&&
    !0===this.options.itemsScaleUp&&(this.options.items=this.itemsAmount)},response:function(){var a=this,b,e;if(!0!==a.options.responsive)return!1;e=f(g).width();a.resizer=function(){f(g).width()!==e&&(!1!==a.options.autoPlay&&g.clearInterval(a.autoPlayInterval),g.clearTimeout(b),b=g.setTimeout(function(){e=f(g).width();a.updateVars()},a.options.responsiveRefreshRate))};f(g).resize(a.resizer)},updatePosition:function(){this.jumpTo(this.currentItem);!1!==this.options.autoPlay&&this.checkAp()},appendItemsSizes:function(){var a=
        this,b=0,e=a.itemsAmount-a.options.items;a.$owlItems.each(function(c){var d=f(this);d.css({width:a.itemWidth}).data("owl-item",Number(c));if(0===c%a.options.items||c===e)c>e||(b+=1);d.data("owl-roundPages",b)})},appendWrapperSizes:function(){this.$owlWrapper.css({width:this.$owlItems.length*this.itemWidth*2,left:0});this.appendItemsSizes()},calculateAll:function(){this.calculateWidth();this.appendWrapperSizes();this.loops();this.max()},calculateWidth:function(){this.itemWidth=Math.round(this.$elem.width()/
        this.options.items)},max:function(){var a=-1*(this.itemsAmount*this.itemWidth-this.options.items*this.itemWidth);this.options.items>this.itemsAmount?this.maximumPixels=a=this.maximumItem=0:(this.maximumItem=this.itemsAmount-this.options.items,this.maximumPixels=a);return a},min:function(){return 0},loops:function(){var a=0,b=0,e,c;this.positionsInArray=[0];this.pagesInArray=[];for(e=0;e<this.itemsAmount;e+=1)b+=this.itemWidth,this.positionsInArray.push(-b),!0===this.options.scrollPerPage&&(c=f(this.$owlItems[e]),
        c=c.data("owl-roundPages"),c!==a&&(this.pagesInArray[a]=this.positionsInArray[e],a=c))},buildControls:function(){if(!0===this.options.navigation||!0===this.options.pagination)this.owlControls=f('<div class="owl-controls"/>').toggleClass("clickable",!this.browser.isTouch).appendTo(this.$elem);!0===this.options.pagination&&this.buildPagination();!0===this.options.navigation&&this.buildButtons()},buildButtons:function(){var a=this,b=f('<div class="owl-buttons"/>');a.owlControls.append(b);a.buttonPrev=
        f("<div/>",{"class":"owl-prev",html:a.options.navigationText[0]||""});a.buttonNext=f("<div/>",{"class":"owl-next",html:a.options.navigationText[1]||""});b.append(a.buttonPrev).append(a.buttonNext);b.on("touchstart.owlControls mousedown.owlControls",'div[class^="owl"]',function(a){a.preventDefault()});b.on("touchend.owlControls mouseup.owlControls",'div[class^="owl"]',function(b){b.preventDefault();f(this).hasClass("owl-next")?a.next():a.prev()})},buildPagination:function(){var a=this;a.paginationWrapper=
        f('<div class="owl-pagination"/>');a.owlControls.append(a.paginationWrapper);a.paginationWrapper.on("touchend.owlControls mouseup.owlControls",".owl-page",function(b){b.preventDefault();Number(f(this).data("owl-page"))!==a.currentItem&&a.goTo(Number(f(this).data("owl-page")),!0)})},updatePagination:function(){var a,b,e,c,d,g;if(!1===this.options.pagination)return!1;this.paginationWrapper.html("");a=0;b=this.itemsAmount-this.itemsAmount%this.options.items;for(c=0;c<this.itemsAmount;c+=1)0===c%this.options.items&&
    (a+=1,b===c&&(e=this.itemsAmount-this.options.items),d=f("<div/>",{"class":"owl-page"}),g=f("<span></span>",{text:!0===this.options.paginationNumbers?a:"","class":!0===this.options.paginationNumbers?"owl-numbers":""}),d.append(g),d.data("owl-page",b===c?e:c),d.data("owl-roundPages",a),this.paginationWrapper.append(d));this.checkPagination()},checkPagination:function(){var a=this;if(!1===a.options.pagination)return!1;a.paginationWrapper.find(".owl-page").each(function(){f(this).data("owl-roundPages")===
    f(a.$owlItems[a.currentItem]).data("owl-roundPages")&&(a.paginationWrapper.find(".owl-page").removeClass("active"),f(this).addClass("active"))})},checkNavigation:function(){if(!1===this.options.navigation)return!1;!1===this.options.rewindNav&&(0===this.currentItem&&0===this.maximumItem?(this.buttonPrev.addClass("disabled"),this.buttonNext.addClass("disabled")):0===this.currentItem&&0!==this.maximumItem?(this.buttonPrev.addClass("disabled"),this.buttonNext.removeClass("disabled")):this.currentItem===
    this.maximumItem?(this.buttonPrev.removeClass("disabled"),this.buttonNext.addClass("disabled")):0!==this.currentItem&&this.currentItem!==this.maximumItem&&(this.buttonPrev.removeClass("disabled"),this.buttonNext.removeClass("disabled")))},updateControls:function(){this.updatePagination();this.checkNavigation();this.owlControls&&(this.options.items>=this.itemsAmount?this.owlControls.hide():this.owlControls.show())},destroyControls:function(){this.owlControls&&this.owlControls.remove()},next:function(a){if(this.isTransition)return!1;
        this.currentItem+=!0===this.options.scrollPerPage?this.options.items:1;if(this.currentItem>this.maximumItem+(!0===this.options.scrollPerPage?this.options.items-1:0))if(!0===this.options.rewindNav)this.currentItem=0,a="rewind";else return this.currentItem=this.maximumItem,!1;this.goTo(this.currentItem,a)},prev:function(a){if(this.isTransition)return!1;this.currentItem=!0===this.options.scrollPerPage&&0<this.currentItem&&this.currentItem<this.options.items?0:this.currentItem-(!0===this.options.scrollPerPage?
        this.options.items:1);if(0>this.currentItem)if(!0===this.options.rewindNav)this.currentItem=this.maximumItem,a="rewind";else return this.currentItem=0,!1;this.goTo(this.currentItem,a)},goTo:function(a,b,e){var c=this;if(c.isTransition)return!1;"function"===typeof c.options.beforeMove&&c.options.beforeMove.apply(this,[c.$elem]);a>=c.maximumItem?a=c.maximumItem:0>=a&&(a=0);c.currentItem=c.owl.currentItem=a;if(!1!==c.options.transitionStyle&&"drag"!==e&&1===c.options.items&&!0===c.browser.support3d)return c.swapSpeed(0),
        !0===c.browser.support3d?c.transition3d(c.positionsInArray[a]):c.css2slide(c.positionsInArray[a],1),c.afterGo(),c.singleItemTransition(),!1;a=c.positionsInArray[a];!0===c.browser.support3d?(c.isCss3Finish=!1,!0===b?(c.swapSpeed("paginationSpeed"),g.setTimeout(function(){c.isCss3Finish=!0},c.options.paginationSpeed)):"rewind"===b?(c.swapSpeed(c.options.rewindSpeed),g.setTimeout(function(){c.isCss3Finish=!0},c.options.rewindSpeed)):(c.swapSpeed("slideSpeed"),g.setTimeout(function(){c.isCss3Finish=!0},
        c.options.slideSpeed)),c.transition3d(a)):!0===b?c.css2slide(a,c.options.paginationSpeed):"rewind"===b?c.css2slide(a,c.options.rewindSpeed):c.css2slide(a,c.options.slideSpeed);c.afterGo()},jumpTo:function(a){"function"===typeof this.options.beforeMove&&this.options.beforeMove.apply(this,[this.$elem]);a>=this.maximumItem||-1===a?a=this.maximumItem:0>=a&&(a=0);this.swapSpeed(0);!0===this.browser.support3d?this.transition3d(this.positionsInArray[a]):this.css2slide(this.positionsInArray[a],1);this.currentItem=
        this.owl.currentItem=a;this.afterGo()},afterGo:function(){this.prevArr.push(this.currentItem);this.prevItem=this.owl.prevItem=this.prevArr[this.prevArr.length-2];this.prevArr.shift(0);this.prevItem!==this.currentItem&&(this.checkPagination(),this.checkNavigation(),this.eachMoveUpdate(),!1!==this.options.autoPlay&&this.checkAp());"function"===typeof this.options.afterMove&&this.prevItem!==this.currentItem&&this.options.afterMove.apply(this,[this.$elem])},stop:function(){this.apStatus="stop";g.clearInterval(this.autoPlayInterval)},
    checkAp:function(){"stop"!==this.apStatus&&this.play()},play:function(){var a=this;a.apStatus="play";if(!1===a.options.autoPlay)return!1;g.clearInterval(a.autoPlayInterval);a.autoPlayInterval=g.setInterval(function(){a.next(!0)},a.options.autoPlay)},swapSpeed:function(a){"slideSpeed"===a?this.$owlWrapper.css(this.addCssSpeed(this.options.slideSpeed)):"paginationSpeed"===a?this.$owlWrapper.css(this.addCssSpeed(this.options.paginationSpeed)):"string"!==typeof a&&this.$owlWrapper.css(this.addCssSpeed(a))},
    addCssSpeed:function(a){return{"-webkit-transition":"all "+a+"ms ease","-moz-transition":"all "+a+"ms ease","-o-transition":"all "+a+"ms ease",transition:"all "+a+"ms ease"}},removeTransition:function(){return{"-webkit-transition":"","-moz-transition":"","-o-transition":"",transition:""}},doTranslate:function(a){return{"-webkit-transform":"translate3d("+a+"px, 0px, 0px)","-moz-transform":"translate3d("+a+"px, 0px, 0px)","-o-transform":"translate3d("+a+"px, 0px, 0px)","-ms-transform":"translate3d("+
    a+"px, 0px, 0px)",transform:"translate3d("+a+"px, 0px,0px)"}},transition3d:function(a){this.$owlWrapper.css(this.doTranslate(a))},css2move:function(a){this.$owlWrapper.css({left:a})},css2slide:function(a,b){var e=this;e.isCssFinish=!1;e.$owlWrapper.stop(!0,!0).animate({left:a},{duration:b||e.options.slideSpeed,complete:function(){e.isCssFinish=!0}})},checkBrowser:function(){var a=k.createElement("div");a.style.cssText="  -moz-transform:translate3d(0px, 0px, 0px); -ms-transform:translate3d(0px, 0px, 0px); -o-transform:translate3d(0px, 0px, 0px); -webkit-transform:translate3d(0px, 0px, 0px); transform:translate3d(0px, 0px, 0px)";
        a=a.style.cssText.match(/translate3d\(0px, 0px, 0px\)/g);this.browser={support3d:null!==a&&1===a.length,isTouch:"ontouchstart"in g||g.navigator.msMaxTouchPoints}},moveEvents:function(){if(!1!==this.options.mouseDrag||!1!==this.options.touchDrag)this.gestures(),this.disabledEvents()},eventTypes:function(){var a=["s","e","x"];this.ev_types={};!0===this.options.mouseDrag&&!0===this.options.touchDrag?a=["touchstart.owl mousedown.owl","touchmove.owl mousemove.owl","touchend.owl touchcancel.owl mouseup.owl"]:
        !1===this.options.mouseDrag&&!0===this.options.touchDrag?a=["touchstart.owl","touchmove.owl","touchend.owl touchcancel.owl"]:!0===this.options.mouseDrag&&!1===this.options.touchDrag&&(a=["mousedown.owl","mousemove.owl","mouseup.owl"]);this.ev_types.start=a[0];this.ev_types.move=a[1];this.ev_types.end=a[2]},disabledEvents:function(){this.$elem.on("dragstart.owl",function(a){a.preventDefault()});this.$elem.on("mousedown.disableTextSelect",function(a){return f(a.target).is("input, textarea, select, option")})},
    gestures:function(){function a(a){if(void 0!==a.touches)return{x:a.touches[0].pageX,y:a.touches[0].pageY};if(void 0===a.touches){if(void 0!==a.pageX)return{x:a.pageX,y:a.pageY};if(void 0===a.pageX)return{x:a.clientX,y:a.clientY}}}function b(a){"on"===a?(f(k).on(d.ev_types.move,e),f(k).on(d.ev_types.end,c)):"off"===a&&(f(k).off(d.ev_types.move),f(k).off(d.ev_types.end))}function e(b){b=b.originalEvent||b||g.event;d.newPosX=a(b).x-h.offsetX;d.newPosY=a(b).y-h.offsetY;d.newRelativeX=d.newPosX-h.relativePos;
        "function"===typeof d.options.startDragging&&!0!==h.dragging&&0!==d.newRelativeX&&(h.dragging=!0,d.options.startDragging.apply(d,[d.$elem]));(8<d.newRelativeX||-8>d.newRelativeX)&&!0===d.browser.isTouch&&(void 0!==b.preventDefault?b.preventDefault():b.returnValue=!1,h.sliding=!0);(10<d.newPosY||-10>d.newPosY)&&!1===h.sliding&&f(k).off("touchmove.owl");d.newPosX=Math.max(Math.min(d.newPosX,d.newRelativeX/5),d.maximumPixels+d.newRelativeX/5);!0===d.browser.support3d?d.transition3d(d.newPosX):d.css2move(d.newPosX)}
        function c(a){a=a.originalEvent||a||g.event;var c;a.target=a.target||a.srcElement;h.dragging=!1;!0!==d.browser.isTouch&&d.$owlWrapper.removeClass("grabbing");d.dragDirection=0>d.newRelativeX?d.owl.dragDirection="left":d.owl.dragDirection="right";0!==d.newRelativeX&&(c=d.getNewPosition(),d.goTo(c,!1,"drag"),h.targetElement===a.target&&!0!==d.browser.isTouch&&(f(a.target).on("click.disable",function(a){a.stopImmediatePropagation();a.stopPropagation();a.preventDefault();f(a.target).off("click.disable")}),
            a=f._data(a.target,"events").click,c=a.pop(),a.splice(0,0,c)));b("off")}var d=this,h={offsetX:0,offsetY:0,baseElWidth:0,relativePos:0,position:null,minSwipe:null,maxSwipe:null,sliding:null,dargging:null,targetElement:null};d.isCssFinish=!0;d.$elem.on(d.ev_types.start,".owl-wrapper",function(c){c=c.originalEvent||c||g.event;var e;if(3===c.which)return!1;if(!(d.itemsAmount<=d.options.items)){if(!1===d.isCssFinish&&!d.options.dragBeforeAnimFinish||!1===d.isCss3Finish&&!d.options.dragBeforeAnimFinish)return!1;
            !1!==d.options.autoPlay&&g.clearInterval(d.autoPlayInterval);!0===d.browser.isTouch||d.$owlWrapper.hasClass("grabbing")||d.$owlWrapper.addClass("grabbing");d.newPosX=0;d.newRelativeX=0;f(this).css(d.removeTransition());e=f(this).position();h.relativePos=e.left;h.offsetX=a(c).x-e.left;h.offsetY=a(c).y-e.top;b("on");h.sliding=!1;h.targetElement=c.target||c.srcElement}})},getNewPosition:function(){var a=this.closestItem();a>this.maximumItem?a=this.currentItem=this.maximumItem:0<=this.newPosX&&(this.currentItem=
        a=0);return a},closestItem:function(){var a=this,b=!0===a.options.scrollPerPage?a.pagesInArray:a.positionsInArray,e=a.newPosX,c=null;f.each(b,function(d,g){e-a.itemWidth/20>b[d+1]&&e-a.itemWidth/20<g&&"left"===a.moveDirection()?(c=g,a.currentItem=!0===a.options.scrollPerPage?f.inArray(c,a.positionsInArray):d):e+a.itemWidth/20<g&&e+a.itemWidth/20>(b[d+1]||b[d]-a.itemWidth)&&"right"===a.moveDirection()&&(!0===a.options.scrollPerPage?(c=b[d+1]||b[b.length-1],a.currentItem=f.inArray(c,a.positionsInArray)):
        (c=b[d+1],a.currentItem=d+1))});return a.currentItem},moveDirection:function(){var a;0>this.newRelativeX?(a="right",this.playDirection="next"):(a="left",this.playDirection="prev");return a},customEvents:function(){var a=this;a.$elem.on("owl.next",function(){a.next()});a.$elem.on("owl.prev",function(){a.prev()});a.$elem.on("owl.play",function(b,e){a.options.autoPlay=e;a.play();a.hoverStatus="play"});a.$elem.on("owl.stop",function(){a.stop();a.hoverStatus="stop"});a.$elem.on("owl.goTo",function(b,e){a.goTo(e)});
        a.$elem.on("owl.jumpTo",function(b,e){a.jumpTo(e)})},stopOnHover:function(){var a=this;!0===a.options.stopOnHover&&!0!==a.browser.isTouch&&!1!==a.options.autoPlay&&(a.$elem.on("mouseover",function(){a.stop()}),a.$elem.on("mouseout",function(){"stop"!==a.hoverStatus&&a.play()}))},lazyLoad:function(){var a,b,e,c,d;if(!1===this.options.lazyLoad)return!1;for(a=0;a<this.itemsAmount;a+=1)b=f(this.$owlItems[a]),"loaded"!==b.data("owl-loaded")&&(e=b.data("owl-item"),c=b.find(".lazyOwl"),"string"!==typeof c.data("src")?
        b.data("owl-loaded","loaded"):(void 0===b.data("owl-loaded")&&(c.hide(),b.addClass("loading").data("owl-loaded","checked")),(d=!0===this.options.lazyFollow?e>=this.currentItem:!0)&&e<this.currentItem+this.options.items&&c.length&&this.lazyPreload(b,c)))},lazyPreload:function(a,b){function e(){a.data("owl-loaded","loaded").removeClass("loading");b.removeAttr("data-src");"fade"===d.options.lazyEffect?b.fadeIn(400):b.show();"function"===typeof d.options.afterLazyLoad&&d.options.afterLazyLoad.apply(this,
        [d.$elem])}function c(){f+=1;d.completeImg(b.get(0))||!0===k?e():100>=f?g.setTimeout(c,100):e()}var d=this,f=0,k;"DIV"===b.prop("tagName")?(b.css("background-image","url("+b.data("src")+")"),k=!0):b[0].src=b.data("src");c()},autoHeight:function(){function a(){var a=f(e.$owlItems[e.currentItem]).height();e.wrapperOuter.css("height",a+"px");e.wrapperOuter.hasClass("autoHeight")||g.setTimeout(function(){e.wrapperOuter.addClass("autoHeight")},0)}function b(){d+=1;e.completeImg(c.get(0))?a():100>=d?g.setTimeout(b,
        100):e.wrapperOuter.css("height","")}var e=this,c=f(e.$owlItems[e.currentItem]).find("img"),d;void 0!==c.get(0)?(d=0,b()):a()},completeImg:function(a){return!a.complete||"undefined"!==typeof a.naturalWidth&&0===a.naturalWidth?!1:!0},onVisibleItems:function(){var a;!0===this.options.addClassActive&&this.$owlItems.removeClass("active");this.visibleItems=[];for(a=this.currentItem;a<this.currentItem+this.options.items;a+=1)this.visibleItems.push(a),!0===this.options.addClassActive&&f(this.$owlItems[a]).addClass("active");
        this.owl.visibleItems=this.visibleItems},transitionTypes:function(a){this.outClass="owl-"+a+"-out";this.inClass="owl-"+a+"-in"},singleItemTransition:function(){var a=this,b=a.outClass,e=a.inClass,c=a.$owlItems.eq(a.currentItem),d=a.$owlItems.eq(a.prevItem),f=Math.abs(a.positionsInArray[a.currentItem])+a.positionsInArray[a.prevItem],g=Math.abs(a.positionsInArray[a.currentItem])+a.itemWidth/2;a.isTransition=!0;a.$owlWrapper.addClass("owl-origin").css({"-webkit-transform-origin":g+"px","-moz-perspective-origin":g+
    "px","perspective-origin":g+"px"});d.css({position:"relative",left:f+"px"}).addClass(b).on("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend",function(){a.endPrev=!0;d.off("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend");a.clearTransStyle(d,b)});c.addClass(e).on("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend",function(){a.endCurrent=!0;c.off("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend");a.clearTransStyle(c,e)})},clearTransStyle:function(a,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         b){a.css({position:"",left:""}).removeClass(b);this.endPrev&&this.endCurrent&&(this.$owlWrapper.removeClass("owl-origin"),this.isTransition=this.endCurrent=this.endPrev=!1)},owlStatus:function(){this.owl={userOptions:this.userOptions,baseElement:this.$elem,userItems:this.$userItems,owlItems:this.$owlItems,currentItem:this.currentItem,prevItem:this.prevItem,visibleItems:this.visibleItems,isTouch:this.browser.isTouch,browser:this.browser,dragDirection:this.dragDirection}},clearEvents:function(){this.$elem.off(".owl owl mousedown.disableTextSelect");
        f(k).off(".owl owl");f(g).off("resize",this.resizer)},unWrap:function(){0!==this.$elem.children().length&&(this.$owlWrapper.unwrap(),this.$userItems.unwrap().unwrap(),this.owlControls&&this.owlControls.remove());this.clearEvents();this.$elem.attr("style",this.$elem.data("owl-originalStyles")||"").attr("class",this.$elem.data("owl-originalClasses"))},destroy:function(){this.stop();g.clearInterval(this.checkVisible);this.unWrap();this.$elem.removeData()},reinit:function(a){a=f.extend({},this.userOptions,
        a);this.unWrap();this.init(a,this.$elem)},addItem:function(a,b){var e;if(!a)return!1;if(0===this.$elem.children().length)return this.$elem.append(a),this.setVars(),!1;this.unWrap();e=void 0===b||-1===b?-1:b;e>=this.$userItems.length||-1===e?this.$userItems.eq(-1).after(a):this.$userItems.eq(e).before(a);this.setVars()},removeItem:function(a){if(0===this.$elem.children().length)return!1;a=void 0===a||-1===a?-1:a;this.unWrap();this.$userItems.eq(a).remove();this.setVars()}};f.fn.owlCarousel=function(a){return this.each(function(){if(!0===
    f(this).data("owl-init"))return!1;f(this).data("owl-init",!0);var b=Object.create(l);b.init(a,this);f.data(this,"owlCarousel",b)})};f.fn.owlCarousel.options={items:5,itemsCustom:!1,itemsDesktop:[1199,4],itemsDesktopSmall:[979,3],itemsTablet:[768,2],itemsTabletSmall:!1,itemsMobile:[479,1],singleItem:!1,itemsScaleUp:!1,slideSpeed:200,paginationSpeed:800,rewindSpeed:1E3,autoPlay:!1,stopOnHover:!1,navigation:!1,navigationText:["prev","next"],rewindNav:!0,scrollPerPage:!1,pagination:!0,paginationNumbers:!1,
    responsive:!0,responsiveRefreshRate:200,responsiveBaseWidth:g,baseClass:"owl-carousel",theme:"owl-theme",lazyLoad:!1,lazyFollow:!0,lazyEffect:"fade",autoHeight:!1,jsonPath:!1,jsonSuccess:!1,dragBeforeAnimFinish:!0,mouseDrag:!0,touchDrag:!0,addClassActive:!1,transitionStyle:!1,beforeUpdate:!1,afterUpdate:!1,beforeInit:!1,afterInit:!1,beforeMove:!1,afterMove:!1,afterAction:!1,startDragging:!1,afterLazyLoad:!1}})(jQuery,window,document);
/**
 * End owl-carousel
 */

/**
 *
 * Version: 0.2.7
 * Author:  Gianluca Guarini
 * Contact: gianluca.guarini@gmail.com
 * Website: http://www.gianlucaguarini.com/
 * Twitter: @gianlucaguarini
 *
 * Copyright (c) 2013 Gianluca Guarini
 */
!function(a){a.fn.extend({BlackAndWhite:function(b){"use strict";var c=this,d={hoverEffect:!0,webworkerPath:!1,responsive:!0,invertHoverEffect:!1,speed:500,onImageReady:null};b=a.extend(d,b);var e=b.hoverEffect,f=b.webworkerPath,g=b.invertHoverEffect,h=b.responsive,i=a.isPlainObject(b.speed)?b.speed.fadeIn:b.speed,j=a.isPlainObject(b.speed)?b.speed.fadeOut:b.speed,k=document.all&&!window.opera&&window.XMLHttpRequest?!0:!1,l=" -webkit- -moz- -o- -ms- ".split(" "),m={},n=function(a){if(m[a]||""===m[a])return m[a]+a;var b=document.createElement("div"),c=["","Moz","Webkit","O","ms","Khtml"];for(var d in c)if("undefined"!=typeof b.style[c[d]+a])return m[a]=c[d],c[d]+a;return a.toLowerCase()},o=function(){var a=document.createElement("div");return a.style.cssText=l.join("filter:blur(2px); "),!!a.style.length&&(void 0===document.documentMode||document.documentMode>9)}(),p=!!document.createElement("canvas").getContext,q=a(window),r=function(){return"undefined"!=typeof Worker?!0:!1}(),t=(n("Filter"),[]),u=r&&f?new Worker(f+"BnWWorker.js"):!1,v=function(b){a(b.currentTarget).find(".BWfade").stop(!0,!0)[g?"fadeOut":"fadeIn"](j)},w=function(b){a(b.currentTarget).find(".BWfade").stop(!0,!0)[g?"fadeIn":"fadeOut"](i)},x=function(a){"function"==typeof b.onImageReady&&b.onImageReady(a)},y=function(){t.length&&(u.postMessage(t[0].imageData),u.onmessage=function(a){t[0].ctx.putImageData(a.data,0,0),x(t[0].img),t.splice(0,1),y()})},z=function(a,b,c,d){var h,e=b.getContext("2d"),g=0;e.drawImage(a,0,0,c,d);var i=e.getImageData(0,0,c,d),j=i.data,k=j.length;if(u)t.push({imageData:i,ctx:e,img:a});else{for(;k>g;g+=4)h=.3*j[g]+.59*j[g+1]+.11*j[g+2],j[g]=j[g+1]=j[g+2]=h;e.putImageData(i,0,0),x(a)}},A=function(b,c){var d=b[0],e=d.src,f=b.width(),h=b.height(),i={position:"absolute",top:0,left:0,display:g?"none":"block"};if(p&&!o){var j=d.width,k=d.height;a('<canvas class="BWfade" width="'+j+'" height="'+k+'"></canvas>').prependTo(c);var l=c.find("canvas");l.css(i),z(d,l[0],j,k)}else i[n("Filter")]="grayscale(100%)",a("<img src="+e+' width="'+f+'" height="'+h+'" class="BWFilter BWfade" /> ').prependTo(c),a(".BWFilter").css(a.extend(i,{filter:"progid:DXImageTransform.Microsoft.BasicImage(grayscale=1)"})),x(d)};return this.init=function(){c.each(function(b,c){var d=a(c),e=d.find("img");e.width()?A(e,d):e.on("load",function(){A(e,d)})}),u&&y(),e&&(c.on("mouseleave",v),c.on("mouseenter",w)),h&&q.on("resize orientationchange",c.resizeImages)},this.resizeImages=function(){c.each(function(b,c){var d=a(c).find("img:not(.BWFilter)"),e=k?a(d).prop("width"):a(d).width(),f=k?a(d).prop("height"):a(d).height();a(this).find(".BWFilter, canvas").css({width:e,height:f})})},this.init(b)}})}(jQuery);
/*
 * Slides, A Slideshow Plugin for jQuery
 * Intructions: http://slidesjs.com
 * By: Nathan Searles, http://nathansearles.com
 * Version: 1.1.9
 * Updated: September 5th, 2011
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
(function(a){a.fn.slides=function(b){return b=a.extend({},a.fn.slides.option,b),this.each(function(){function w(g,h,i){if(!p&&o){p=!0,b.animationStart(n+1);switch(g){case"next":l=n,k=n+1,k=e===k?0:k,r=f*2,g=-f*2,n=k;break;case"prev":l=n,k=n-1,k=k===-1?e-1:k,r=0,g=0,n=k;break;case"pagination":k=parseInt(i,10),l=a("."+b.paginationClass+" li."+b.currentClass+" a",c).attr("href").match("[^#/]+$"),k>l?(r=f*2,g=-f*2):(r=0,g=0),n=k}h==="fade"?b.crossfade?d.children(":eq("+k+")",c).css({zIndex:10}).fadeIn(b.fadeSpeed,b.fadeEasing,function(){b.autoHeight?d.animate({height:d.children(":eq("+k+")",c).outerHeight()},b.autoHeightSpeed,function(){d.children(":eq("+l+")",c).css({display:"none",zIndex:0}),d.children(":eq("+k+")",c).css({zIndex:0}),b.animationComplete(k+1),p=!1}):(d.children(":eq("+l+")",c).css({display:"none",zIndex:0}),d.children(":eq("+k+")",c).css({zIndex:0}),b.animationComplete(k+1),p=!1)}):d.children(":eq("+l+")",c).fadeOut(b.fadeSpeed,b.fadeEasing,function(){b.autoHeight?d.animate({height:d.children(":eq("+k+")",c).outerHeight()},b.autoHeightSpeed,function(){d.children(":eq("+k+")",c).fadeIn(b.fadeSpeed,b.fadeEasing)}):d.children(":eq("+k+")",c).fadeIn(b.fadeSpeed,b.fadeEasing,function(){a.browser.msie&&a(this).get(0).style.removeAttribute("filter")}),b.animationComplete(k+1),p=!1}):(d.children(":eq("+k+")").css({left:r,display:"block"}),b.autoHeight?d.animate({left:g,height:d.children(":eq("+k+")").outerHeight()},b.slideSpeed,b.slideEasing,function(){d.css({left:-f}),d.children(":eq("+k+")").css({left:f,zIndex:5}),d.children(":eq("+l+")").css({left:f,display:"none",zIndex:0}),b.animationComplete(k+1),p=!1}):d.animate({left:g},b.slideSpeed,b.slideEasing,function(){d.css({left:-f}),d.children(":eq("+k+")").css({left:f,zIndex:5}),d.children(":eq("+l+")").css({left:f,display:"none",zIndex:0}),b.animationComplete(k+1),p=!1})),b.pagination&&(a("."+b.paginationClass+" li."+b.currentClass,c).removeClass(b.currentClass),a("."+b.paginationClass+" li:eq("+k+")",c).addClass(b.currentClass))}}function x(){clearInterval(c.data("interval"))}function y(){b.pause?(clearTimeout(c.data("pause")),clearInterval(c.data("interval")),u=setTimeout(function(){clearTimeout(c.data("pause")),v=setInterval(function(){w("next",i)},b.play),c.data("interval",v)},b.pause),c.data("pause",u)):x()}a("."+b.container,a(this)).children().wrapAll('<div class="slides_control"/>');var c=a(this),d=a(".slides_control",c),e=d.children().size(),f=d.children().outerWidth(),g=d.children().outerHeight(),h=b.start-1,i=b.effect.indexOf(",")<0?b.effect:b.effect.replace(" ","").split(",")[0],j=b.effect.indexOf(",")<0?i:b.effect.replace(" ","").split(",")[1],k=0,l=0,m=0,n=0,o,p,q,r,s,t,u,v;if(e<2)return a("."+b.container,a(this)).fadeIn(b.fadeSpeed,b.fadeEasing,function(){o=!0,b.slidesLoaded()}),a("."+b.next+", ."+b.prev).fadeOut(0),!1;if(e<2)return;h<0&&(h=0),h>e&&(h=e-1),b.start&&(n=h),b.randomize&&d.randomize(),a("."+b.container,c).css({overflow:"hidden",position:"relative"}),d.children().css({position:"absolute",top:0,left:d.children().outerWidth(),zIndex:0,display:"none"}),d.css({position:"relative",width:f*3,height:g,left:-f}),a("."+b.container,c).css({display:"block"}),b.autoHeight&&(d.children().css({height:"auto"}),d.animate({height:d.children(":eq("+h+")").outerHeight()},b.autoHeightSpeed));if(b.preload&&d.find("img:eq("+h+")").length){var z=d.find("img:eq("+h+")").attr("src")+"?"+(new Date).getTime();a("img",c).parent().attr("class")!="slides_control"?t=d.children(":eq(0)")[0].tagName.toLowerCase():t=d.find("img:eq("+h+")"),d.find("img:eq("+h+")").attr("src",z).load(function(){d.find(t+":eq("+h+")").fadeIn(b.fadeSpeed,b.fadeEasing,function(){a(this).css({zIndex:5}),a("."+b.container,c).css({background:""}),o=!0,b.slidesLoaded()})})}else d.children(":eq("+h+")").fadeIn(b.fadeSpeed,b.fadeEasing,function(){o=!0,b.slidesLoaded()});b.bigTarget&&(d.children().css({cursor:"pointer"}),d.children().click(function(){return w("next",i),!1})),b.hoverPause&&b.play&&(d.bind("mouseover",function(){x()}),d.bind("mouseleave",function(){y()})),b.generateNextPrev&&(a("."+b.container,c).after('<a href="#" class="'+b.prev+'">Prev</a>'),a("."+b.prev,c).after('<a href="#" class="'+b.next+'">Next</a>')),a("."+b.next,c).click(function(a){a.preventDefault(),b.play&&y(),w("next",i)}),a("."+b.prev,c).click(function(a){a.preventDefault(),b.play&&y(),w("prev",i)}),b.generatePagination?(b.prependPagination?c.prepend("<ul class="+b.paginationClass+"></ul>"):c.append("<ul class="+b.paginationClass+"></ul>"),d.children().each(function(){a("."+b.paginationClass,c).append('<li><a href="#'+m+'">'+(m+1)+"</a></li>"),m++})):a("."+b.paginationClass+" li a",c).each(function(){a(this).attr("href","#"+m),m++}),a("."+b.paginationClass+" li:eq("+h+")",c).addClass(b.currentClass),a("."+b.paginationClass+" li a",c).click(function(){return b.play&&y(),q=a(this).attr("href").match("[^#/]+$"),n!=q&&w("pagination",j,q),!1}),a("a.link",c).click(function(){return b.play&&y(),q=a(this).attr("href").match("[^#/]+$")-1,n!=q&&w("pagination",j,q),!1}),b.play&&(v=setInterval(function(){w("next",i)},b.play),c.data("interval",v))})},a.fn.slides.option={preload:!1,preloadImage:"/img/loading.gif",container:"slides_container",generateNextPrev:!1,next:"next",prev:"prev",pagination:!0,generatePagination:!0,prependPagination:!1,paginationClass:"pagination",currentClass:"current",fadeSpeed:350,fadeEasing:"",slideSpeed:350,slideEasing:"",start:1,effect:"slide",crossfade:!1,randomize:!1,play:0,pause:0,hoverPause:!1,autoHeight:!1,autoHeightSpeed:350,bigTarget:!1,animationStart:function(){},animationComplete:function(){},slidesLoaded:function(){}},a.fn.randomize=function(b){function c(){return Math.round(Math.random())-.5}return a(this).each(function(){var d=a(this),e=d.children(),f=e.length;if(f>1){e.hide();var g=[];for(i=0;i<f;i++)g[g.length]=i;g=g.sort(c),a.each(g,function(a,c){var f=e.eq(c),g=f.clone(!0);g.show().appendTo(d),b!==undefined&&b(f,g),f.remove()})}})}})(jQuery);


/*
 * FancyBox - jQuery Plugin
 * Simple and fancy lightbox alternative
 *
 * Examples and documentation at: http://fancybox.net
 *
 * Copyright (c) 2008 - 2010 Janis Skarnelis
 * That said, it is hardly a one-person project. Many people have submitted bugs, code, and offered their advice freely. Their support is greatly appreciated.
 *
 * Version: 1.3.4 (11/11/2010)
 * Requires: jQuery v1.3+
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
/* altered containing elements and related css */
/* added patch to work with jquery 1.9 */
!function(t){var e,i,n,a,o,d,r,c,s,h,l,f,p,g=0,u={},b=[],y=0,w={},m=[],v=null,x=new Image,I=/\.(jpg|gif|png|bmp|jpeg)(.*)?$/i,C=/[^\.]\.(swf)\s*$/i,k=1,O=0,j="",A=!1,S=t.extend(t("<div/>")[0],{prop:0}),T=navigator.userAgent.match(/msie [6]/i)&&!window.XMLHttpRequest,D=function(){i.hide(),x.onerror=x.onload=null,v&&v.abort(),e.empty()},F=function(){return!1===u.onError(b,g,u)?(i.hide(),void(A=!1)):(u.titleShow=!1,u.width="auto",u.height="auto",e.html('<p id="fancybox-error">The requested content cannot be loaded.<br />Please try again later.</p>'),void N())},E=function(){var n,a,o,r,c,s,h=b[g];if(D(),u=t.extend({},t.fn.fancybox.defaults,"undefined"==typeof t(h).data("fancybox")?u:t(h).data("fancybox")),s=u.onStart(b,g,u),s===!1)return void(A=!1);if("object"==typeof s&&(u=t.extend(u,s)),o=u.title||(h.nodeName?t(h).attr("title"):h.title)||"",h.nodeName&&!u.orig&&(u.orig=t(h).children("img:first").length?t(h).children("img:first"):t(h)),""===o&&u.orig&&u.titleFromAlt&&(o=u.orig.attr("alt")),n=u.href||(h.nodeName?t(h).attr("href"):h.href)||null,(/^(?:javascript)/i.test(n)||"#"==n)&&(n=null),u.type?(a=u.type,n||(n=u.content)):u.content?a="html":n&&(a=n.match(I)?"image":n.match(C)?"swf":t(h).hasClass("iframe")?"iframe":0===n.indexOf("#")?"inline":"ajax"),!a)return void F();switch("inline"==a&&(h=n.substr(n.indexOf("#")),a=t(h).length>0?"inline":"ajax"),u.type=a,u.href=n,u.title=o,u.autoDimensions&&("html"==u.type||"inline"==u.type||"ajax"==u.type?(u.width="auto",u.height="auto"):u.autoDimensions=!1),u.modal&&(u.overlayShow=!0,u.hideOnOverlayClick=!1,u.hideOnContentClick=!1,u.enableEscapeButton=!1,u.showCloseButton=!1),u.padding=parseInt(u.padding,10),u.margin=parseInt(u.margin,10),e.css("padding",u.padding+u.margin),t(".fancybox-inline-tmp").unbind("fancybox-cancel").bind("fancybox-change",function(){t(this).replaceWith(d.children())}),a){case"html":e.html(u.content),N();break;case"inline":if(t(h).parent().is("#fancybox-content")===!0)return void(A=!1);t('<div class="fancybox-inline-tmp" />').hide().insertBefore(t(h)).bind("fancybox-cleanup",function(){t(this).replaceWith(d.children())}).bind("fancybox-cancel",function(){t(this).replaceWith(e.children())}),t(h).appendTo(e),N();break;case"image":A=!1,t.fancybox.showActivity(),x=new Image,x.onerror=function(){F()},x.onload=function(){A=!0,x.onerror=x.onload=null,B()},x.src=n;break;case"swf":u.scrolling="no",r='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="'+u.width+'" height="'+u.height+'"><param name="movie" value="'+n+'"></param>',c="",t.each(u.swf,function(t,e){r+='<param name="'+t+'" value="'+e+'"></param>',c+=" "+t+'="'+e+'"'}),r+='<embed src="'+n+'" type="application/x-shockwave-flash" width="'+u.width+'" height="'+u.height+'"'+c+"></embed></object>",e.html(r),N();break;case"ajax":A=!1,t.fancybox.showActivity(),u.ajax.win=u.ajax.success,v=t.ajax(t.extend({},u.ajax,{url:n,data:u.ajax.data||{},error:function(t){t.status>0&&F()},success:function(t,a,o){var d="object"==typeof o?o:v;if(200==d.status){if("function"==typeof u.ajax.win){if(s=u.ajax.win(n,t,a,o),s===!1)return void i.hide();("string"==typeof s||"object"==typeof s)&&(t=s)}e.html(t),N()}}}));break;case"iframe":P()}},N=function(){var i=u.width,n=u.height;i=i.toString().indexOf("%")>-1?parseInt((t(window).width()-2*u.margin)*parseFloat(i)/100,10)+"px":"auto"==i?"auto":i+"px",n=n.toString().indexOf("%")>-1?parseInt((t(window).height()-2*u.margin)*parseFloat(n)/100,10)+"px":"auto"==n?"auto":n+"px",e.wrapInner('<div style="width:'+i+";height:"+n+";overflow: "+("auto"==u.scrolling?"auto":"yes"==u.scrolling?"scroll":"hidden")+';position:relative;"></div>'),u.width=e.width(),u.height=e.height(),P()},B=function(){u.width=x.width,u.height=x.height,t("<img />").attr({id:"fancybox-img",src:x.src,alt:u.title}).appendTo(e),P()},P=function(){var o,l;return i.hide(),a.is(":visible")&&!1===w.onCleanup(m,y,w)?(t.event.trigger("fancybox-cancel"),void(A=!1)):(A=!0,t(d.add(n)).unbind(),t(window).unbind("resize.fb scroll.fb"),t(document).unbind("keydown.fb"),a.is(":visible")&&"outside"!==w.titlePosition&&a.css("height",a.height()),m=b,y=g,w=u,w.overlayShow?(n.css({"background-color":w.overlayColor,opacity:w.overlayOpacity,cursor:w.hideOnOverlayClick?"pointer":"auto",height:t(document).height(),width:t(document).width()}),n.is(":visible")||(T&&t("select:not(#fancybox-tmp select)").filter(function(){return"hidden"!==this.style.visibility}).css({visibility:"hidden"}).one("fancybox-cleanup",function(){this.style.visibility="inherit"}),n.show())):n.hide(),p=q(),M(),a.is(":visible")?(t(r.add(s).add(h)).hide(),o=a.position(),f={top:o.top,left:o.left,width:a.width(),height:a.height()},l=f.width==p.width&&f.height==p.height,void d.fadeTo(w.changeFade,.3,function(){var i=function(){d.html(e.contents()).fadeTo(w.changeFade,1,H)};t.event.trigger("fancybox-change"),d.empty().removeAttr("filter").css({"border-width":w.padding,width:p.width-2*w.padding,height:u.autoDimensions?"auto":p.height-O-2*w.padding}),l?i():(S.prop=0,t(S).animate({prop:1},{duration:w.changeSpeed,easing:w.easingChange,step:K,complete:i}))})):(a.removeAttr("style"),d.css("border-width",w.padding),"elastic"==w.transitionIn?(f=X(),d.html(e.contents()),a.show(),w.opacity&&(p.opacity=0),S.prop=0,void t(S).animate({prop:1},{duration:w.speedIn,easing:w.easingIn,step:K,complete:H})):("inside"==w.titlePosition&&O>0&&c.show(),d.css({width:p.width-2*w.padding,height:u.autoDimensions?"auto":p.height-O-2*w.padding}).html(e.contents()),void a.css(p).fadeIn("none"==w.transitionIn?0:w.speedIn,H))))},L=function(t){return t&&t.length?"float"==w.titlePosition?'<table id="fancybox-title-float-wrap" cellpadding="0" cellspacing="0"><tr><td id="fancybox-title-float-left"></td><td id="fancybox-title-float-main">'+t+'</td><td id="fancybox-title-float-right"></td></tr></table>':'<div id="fancybox-title-'+w.titlePosition+'">'+t+"</div>":!1},M=function(){if(j=w.title||"",O=0,c.empty().removeAttr("style").removeClass(),w.titleShow===!1)return void c.hide();if(j=t.isFunction(w.titleFormat)?w.titleFormat(j,m,y,w):L(j),!j||""===j)return void c.hide();switch(c.addClass("fancybox-title-"+w.titlePosition).html(j).appendTo("body").show(),w.titlePosition){case"inside":c.css({width:p.width-2*w.padding,marginLeft:w.padding,marginRight:w.padding}),O=c.outerHeight(!0),c.appendTo(o),p.height+=O;break;case"over":c.css({marginLeft:w.padding,width:p.width-2*w.padding,bottom:w.padding}).appendTo(o);break;case"float":c.css("left",-1*parseInt((c.width()-p.width-40)/2,10)).appendTo(a);break;default:c.css({width:p.width-2*w.padding,paddingLeft:w.padding,paddingRight:w.padding}).appendTo(a)}c.hide()},z=function(){return(w.enableEscapeButton||w.enableKeyboardNav)&&t(document).bind("keydown.fb",function(e){27==e.keyCode&&w.enableEscapeButton?(e.preventDefault(),t.fancybox.close()):37!=e.keyCode&&39!=e.keyCode||!w.enableKeyboardNav||"INPUT"===e.target.tagName||"TEXTAREA"===e.target.tagName||"SELECT"===e.target.tagName||(e.preventDefault(),t.fancybox[37==e.keyCode?"prev":"next"]())}),w.showNavArrows?((w.cyclic&&m.length>1||0!==y)&&s.show(),void((w.cyclic&&m.length>1||y!=m.length-1)&&h.show())):(s.hide(),void h.hide())},H=function(){t.support.opacity||(d.get(0).style.removeAttribute("filter"),a.get(0).style.removeAttribute("filter")),u.autoDimensions&&d.css("height","auto"),a.css("height","auto"),j&&j.length&&c.show(),w.showCloseButton&&r.show(),z(),w.hideOnContentClick&&d.bind("click",t.fancybox.close),w.hideOnOverlayClick&&n.bind("click",t.fancybox.close),t(window).bind("resize.fb",t.fancybox.resize),w.centerOnScroll&&t(window).bind("scroll.fb",t.fancybox.center),"iframe"==w.type&&t('<iframe id="fancybox-frame" name="fancybox-frame'+(new Date).getTime()+'" frameborder="0" hspace="0" '+(navigator.userAgent.match(/msie [6]/i)?'allowtransparency="true""':"")+' scrolling="'+u.scrolling+'" src="'+w.href+'"></iframe>').appendTo(d),a.show(),A=!1,t.fancybox.center(),w.onComplete(m,y,w),R()},R=function(){var t,e;m.length-1>y&&(t=m[y+1].href,"undefined"!=typeof t&&t.match(I)&&(e=new Image,e.src=t)),y>0&&(t=m[y-1].href,"undefined"!=typeof t&&t.match(I)&&(e=new Image,e.src=t))},K=function(t){var e={width:parseInt(f.width+(p.width-f.width)*t,10),height:parseInt(f.height+(p.height-f.height)*t,10),top:parseInt(f.top+(p.top-f.top)*t,10),left:parseInt(f.left+(p.left-f.left)*t,10)};"undefined"!=typeof p.opacity&&(e.opacity=.5>t?.5:t),a.css(e),d.css({width:e.width-2*w.padding,height:e.height-O*t-2*w.padding})},W=function(){return[t(window).width()-2*w.margin,t(window).height()-2*w.margin,t(document).scrollLeft()+w.margin,t(document).scrollTop()+w.margin]},q=function(){var t,e=W(),i={},n=w.autoScale,a=2*w.padding;return i.width=w.width.toString().indexOf("%")>-1?parseInt(e[0]*parseFloat(w.width)/100,10):w.width+a,i.height=w.height.toString().indexOf("%")>-1?parseInt(e[1]*parseFloat(w.height)/100,10):w.height+a,n&&(i.width>e[0]||i.height>e[1])&&("image"==u.type||"swf"==u.type?(t=w.width/w.height,i.width>e[0]&&(i.width=e[0],i.height=parseInt((i.width-a)/t+a,10)),i.height>e[1]&&(i.height=e[1],i.width=parseInt((i.height-a)*t+a,10))):(i.width=Math.min(i.width,e[0]),i.height=Math.min(i.height,e[1]))),i.top=parseInt(Math.max(e[3]-20,e[3]+.5*(e[1]-i.height-40)),10),i.left=parseInt(Math.max(e[2]-20,e[2]+.5*(e[0]-i.width-40)),10),i},Q=function(t){var e=t.offset();return e.top+=parseInt(t.css("paddingTop"),10)||0,e.left+=parseInt(t.css("paddingLeft"),10)||0,e.top+=parseInt(t.css("border-top-width"),10)||0,e.left+=parseInt(t.css("border-left-width"),10)||0,e.width=t.width(),e.height=t.height(),e},X=function(){var e,i,n=u.orig?t(u.orig):!1,a={};return n&&n.length?(e=Q(n),a={width:e.width+2*w.padding,height:e.height+2*w.padding,top:e.top-w.padding-20,left:e.left-w.padding-20}):(i=W(),a={width:2*w.padding,height:2*w.padding,top:parseInt(i[3]+.5*i[1],10),left:parseInt(i[2]+.5*i[0],10)}),a},$=function(){return i.is(":visible")?(t("div",i).css("top",-40*k+"px"),void(k=(k+1)%12)):void clearInterval(l)};t.fn.fancybox=function(e){return t(this).length?(t(this).data("fancybox",t.extend({},e,t.metadata?t(this).metadata():{})).unbind("click.fb").bind("click.fb",function(e){if(e.preventDefault(),!A){A=!0,t(this).blur(),b=[],g=0;var i=t(this).attr("rel")||"";i&&""!=i&&"nofollow"!==i?(b=t("a[rel="+i+"], area[rel="+i+"]"),g=b.index(this)):b.push(this),E()}}),this):this},t.fancybox=function(e){var i;if(!A){if(A=!0,i="undefined"!=typeof arguments[1]?arguments[1]:{},b=[],g=parseInt(i.index,10)||0,t.isArray(e)){for(var n=0,a=e.length;a>n;n++)"object"==typeof e[n]?t(e[n]).data("fancybox",t.extend({},i,e[n])):e[n]=t({}).data("fancybox",t.extend({content:e[n]},i));b=jQuery.merge(b,e)}else"object"==typeof e?t(e).data("fancybox",t.extend({},i,e)):e=t({}).data("fancybox",t.extend({content:e},i)),b.push(e);(g>b.length||0>g)&&(g=0),E()}},t.fancybox.showActivity=function(){clearInterval(l),i.show(),l=setInterval($,66)},t.fancybox.hideActivity=function(){i.hide()},t.fancybox.next=function(){return t.fancybox.pos(y+1)},t.fancybox.prev=function(){return t.fancybox.pos(y-1)},t.fancybox.pos=function(t){A||(t=parseInt(t),b=m,t>-1&&t<m.length?(g=t,E()):w.cyclic&&m.length>1&&(g=t>=m.length?0:m.length-1,E()))},t.fancybox.cancel=function(){A||(A=!0,t.event.trigger("fancybox-cancel"),D(),u.onCancel(b,g,u),A=!1)},t.fancybox.close=function(){function e(){n.fadeOut("fast"),c.empty().hide(),a.hide(),t.event.trigger("fancybox-cleanup"),d.empty(),w.onClosed(m,y,w),m=u=[],y=g=0,w=u={},A=!1}if(!A&&!a.is(":hidden")){if(A=!0,w&&!1===w.onCleanup(m,y,w))return void(A=!1);if(D(),t(r.add(s).add(h)).hide(),t(d.add(n)).unbind(),t(window).unbind("resize.fb scroll.fb"),t(document).unbind("keydown.fb"),d.find("iframe").attr("src",T&&/^https/i.test(window.location.href||"")?"javascript:void(false)":"about:blank"),"inside"!==w.titlePosition&&c.empty(),a.stop(),"elastic"==w.transitionOut){f=X();var i=a.position();p={top:i.top,left:i.left,width:a.width(),height:a.height()},w.opacity&&(p.opacity=1),c.empty().hide(),S.prop=1,t(S).animate({prop:0},{duration:w.speedOut,easing:w.easingOut,step:K,complete:e})}else a.fadeOut("none"==w.transitionOut?0:w.speedOut,e)}},t.fancybox.resize=function(){n.is(":visible")&&n.css("height",t(document).height()),t.fancybox.center(!0)},t.fancybox.center=function(){var t,e;A||(e=arguments[0]===!0?1:0,t=W(),(e||!(a.width()>t[0]||a.height()>t[1]))&&a.stop().animate({top:parseInt(Math.max(t[3]-20,t[3]+.5*(t[1]-d.height()-40)-w.padding)),left:parseInt(Math.max(t[2]-20,t[2]+.5*(t[0]-d.width()-40)-w.padding))},"number"==typeof arguments[0]?arguments[0]:200))},t.fancybox.init=function(){t("#fancybox-wrap").length||(t("body").append(e=t('<div id="fancybox-tmp"></div>'),i=t('<div id="fancybox-loading"><div></div></div>'),n=t('<div id="fancybox-overlay"></div>'),a=t('<div id="fancybox-wrap"></div>')),a.append(d=t('<div id="fancybox-content"></div>'),r=t('<a id="fancybox-close"></a>'),c=t('<div id="fancybox-title"></div>'),s=t('<a href="javascript:;" id="fancybox-left"><span class="fancy-ico" id="fancybox-left-ico"></span></a>'),h=t('<a href="javascript:;" id="fancybox-right"><span class="fancy-ico" id="fancybox-right-ico"></span></a>')),r.click(t.fancybox.close),i.click(t.fancybox.cancel),s.click(function(e){e.preventDefault(),t.fancybox.prev()}),h.click(function(e){e.preventDefault(),t.fancybox.next()}),t.fn.mousewheel&&a.bind("mousewheel.fb",function(e,i){A?e.preventDefault():(0==t(e.target).get(0).clientHeight||t(e.target).get(0).scrollHeight===t(e.target).get(0).clientHeight)&&(e.preventDefault(),t.fancybox[i>0?"prev":"next"]())}),t.support.opacity||a.addClass("fancybox-ie"),T&&(i.addClass("fancybox-ie6"),a.addClass("fancybox-ie6"),t('<iframe id="fancybox-hide-sel-frame" src="'+(/^https/i.test(window.location.href||"")?"javascript:void(false)":"about:blank")+'" scrolling="no" border="0" frameborder="0" tabindex="-1"></iframe>').prependTo(o)))},t.fn.fancybox.defaults={padding:10,margin:40,opacity:!1,modal:!1,cyclic:!1,scrolling:"auto",width:560,height:340,autoScale:!0,autoDimensions:!0,centerOnScroll:!1,ajax:{},swf:{wmode:"transparent"},hideOnOverlayClick:!0,hideOnContentClick:!1,overlayShow:!0,overlayOpacity:.7,overlayColor:"#777",titleShow:!0,titlePosition:"float",titleFormat:null,titleFromAlt:!1,transitionIn:"fade",transitionOut:"fade",speedIn:300,speedOut:300,changeSpeed:300,changeFade:"fast",easingIn:"swing",easingOut:"swing",showCloseButton:!0,showNavArrows:!0,enableEscapeButton:!0,enableKeyboardNav:!0,onStart:function(){},onCancel:function(){},onComplete:function(){},onCleanup:function(){},onClosed:function(){},onError:function(){}},t(document).ready(function(){t.fancybox.init()})}(jQuery);



;(function($) {
    var progressOn = function() {
        $('.progress-wrap a').each(function(){
            var elem = $(this);
            var theID = elem.attr('href');
            $(theID).waypoint(function(direction) {
                if (direction == 'down') {
                    $('.progress-wrap a[href="' + theID + '"]').addClass('on');
                    $('.progress-wrap a[href="' + theID + '"]').prev().removeClass('on');
                } else {
                    $('.progress-wrap a[href="' + theID + '"]').prev().addClass('on');
                    $('.progress-wrap a[href="' + theID + '"]').removeClass('on');
                }
            }, { offset: 73 });
        });
    };

    var sizeSlides = function() {
        // $('.feature-slides .slide').css({
        //   width: $(window).width()
        // });
    };

    var setupSubmenus = function() {
        $('nav a').each(function(){
            if ( $(this).attr('href') == "#" ) {
                $(this).click(function(){
                    return false;
                });
            }
        });

        $('.sub-menu .active').parents('li').addClass('open');
    };

    var subtabs = function(container) {
        $(container).find("ul").on("click", "li", function(e){
            $(".sub-tab").removeClass("active");
            $(".sub-tabs-content").find(".sub-tab-content").removeClass("active");
            var targetTab = $(this).data("tab");
            $(targetTab).addClass("active");
            $(this).addClass("active")
        });
    };

    var filterByTax = function() {
        $(".filter-tax").find("a").click(function(e){
            e.preventDefault();
            $("a").removeClass("active");
            $(this).addClass("active");
            var term = $(this).data("filter");
            var posts = $(".posts-by-tax").find("li");
            posts.hide();
            if (term !== "all") {
                posts.each(function(){
                    if ($(this).data("filterType") === term) {
                        $(this).show();
                    }
                });
            } else {
                posts.show();
            }
        });
    };

    /**
     *   Filter press releases by "All", "In the News", and "Press Releases"
     *
     */
    $('input[type=radio]', '#press-types').click(function() {
        var attr = $(this).attr('id');

        switch(attr) {

            case 'all':
                $('.in-news-archive, .press-releases-archive').show();
            break;
            case 'press-release':
                $('.press-releases-archive').show();
                $('.in-news-archive').hide();
            break;
            case 'news-mention' :
                $('.press-releases-archive').hide();
                $('.in-news-archive').show();
            break;
            default:
                $('.in-news-archive', '.press-releases-archive').show();
            break;
        }
    })

    /**
     *  *   Press releases
     *
     */
    $('input[type=radio]', '#press-years').click(function() {
        var year = $(this).attr('id');

        $('.press-results').hide();
        $('.press-results[data-year=' + year + ']').show();
    });

    /**
     * Show full history - Shows most recent
     */
    $('#show-all-press').click(function() {
        $('.press-results').hide();
        $('.press-results').show();
    })

    var searchByEventType = function() {
        $("#event-type").change(function(){
            $(this).parents("form").submit();
        });
    };

    /*var filterPress = function() {
        $("#press-types, #press-years").find("input[type=radio]").click(function(){
            submitPressForm();
        });
    };

    var showAllPress = function() {
        $("#show-all-press").click(function(){
            submitPressForm('post_type[0]=press-release&post_type[1]=news-mention&nopaging=true&action=press-archive');
        });
    };

    var submitPressForm = function(sendData) {
        var resultsContainer = $("#press-results");
        resultsContainer.html("<p class='loading-indicator'>Loading...</p>");
        var typeForm = $("#press-types");
        var yearForm = $("#press-years");
        var postType;
        if (typeForm.find("#all").is(":checked")) {
            postType = 'post_type[]=press-release&post_type[]=news-mention';
        } else {
            postType = 'post_type[]=' + typeForm.find(":checked").val()
        }

        sendData = sendData || postType + '&nopaging=true&action=press-archive&' + yearForm.serialize();
        $.ajax({
            url: rootUrl,
            data: sendData,
            success: function(data) {
                resultsContainer.replaceWith(data);
            },
            error: function() {
                resultsContainer.html("<p class='loading-indicator'>No results.</p>");
            }
        });
    };*/

    var init = function() {
        setupSubmenus();
        filterByTax();
        searchByEventType();
        progressOn();
        //filterPress();
        //showAllPress();
        subtabs(".sub-tabs");
    };

    jQuery( function() {
        var $ = jQuery.noConflict();
        init();
        $('.section-75').tabs();
        $('.section-1151').tabs();

        $("a[rel*='vimeo']").click(function(e) {
            e.preventDefault();
            var theId = $(this).attr('href').split('/');
            theId = theId[3];
            $.fancybox({
                'padding' : 5,
                'autoScale' : false,
                'transitionIn' : 'none',
                'transitionOut' : 'none',
                'overlayColor' : '#000',
                'overlayOpacity' : 0.8,
                'showNavArrows' : false,
                'width' : 940,
                'height' : 530,
                'href' : '//player.vimeo.com/video/' + theId ,
                'type' : 'iframe'
            });
        });

        // $(window).resize(function(){
        //   sizeSlides();
        // });
        $(document).on('click', '.topper', function(e){
            e.preventDefault();
            $('html,body').animate({scrollTop: 0}, 500);
        });
    });
})(jQuery);

(function() {
    jQuery(function($) {
        var $progress, $sectionLinks, $sections, animateTo, animating, currentSection, currentSectionIdx, lastSectionIdx, progressHeight, progressScrollWatcher, refreshSections, sectionWidth, sections;
        if (($progress = $(".progress")).length) {
            progressHeight = $progress.height();
            $sectionLinks = $progress.find("a");
            $sections = $sectionLinks.map(function(i, el) {
                return $(el.getAttribute("href"));
            });
            sectionWidth = 100 / $sections.length;
            sections = null;
            currentSection = null;
            currentSectionIdx = null;
            lastSectionIdx = null;
            animating = false;
            refreshSections = function() {
                var $el, el, height, start;
                return sections = (function() {
                    var _i, _len, _ref, _results;
                    _ref = $sections.toArray();
                    _results = [];
                    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                        $el = _ref[_i];
                        el = $el[0];
                        start = el.offsetTop;
                        height = el.offsetHeight;
                        _results.push({
                            el: el,
                            start: start,
                            end: start + height,
                            height: height
                        });
                    }
                    return _results;
                })();
            };
            refreshSections();
            $(window).on("resize", refreshSections).on("load", refreshSections);
            progressScrollWatcher = new ScrollAnimation({
                el: $progress.parent()[0],
                offset: function() {
                    return 0;
                },
                animation: function(scrollTop, windowHeight, documentHeight) {
                    var i, s, top, _i, _len;
                    if (scrollTop > this.start) {
                        $progress.addClass("following").parent().height(progressHeight);
                    } else if (scrollTop <= this.start) {
                        $progress.removeClass("following").parent().height('auto');
                    }
                    lastSectionIdx = currentSectionIdx;
                    top = scrollTop + progressHeight;
                    for (i = _i = 0, _len = sections.length; _i < _len; i = ++_i) {
                        s = sections[i];
                        if (top >= s.start && top <= s.end) {
                            currentSectionIdx = i;
                            currentSection = s;
                            break;
                        }
                    }
                    if (!animating && currentSection && currentSectionIdx !== lastSectionIdx) {
                        $(document).trigger("view-section", {
                            method: "scroll",
                            sectionId: currentSection.el.id
                        });
                    }
                }
            });
            ScrollAnimation.register(progressScrollWatcher);
            animateTo = function(id) {
                var destination, el;
                if (el = document.getElementById(id)) {
                    destination = $(el).offset().top - progressHeight;
                    animating = true;
                    return $("html,body").animate({
                        scrollTop: destination,
                        complete: function() {
                            return animating = false;
                        }
                    });
                }
            };
            $('body').on("click", "a[href]", function(e) {
                var id;
                id = e.currentTarget.getAttribute("href").split('#')[1];
                return $progress.find('a[href$="' + id + '"]').each(function(i, el) {
                    $(document).trigger("view-section", {
                        method: "click",
                        sectionId: id
                    });
                    return animateTo(id);
                });
            });
            return animateTo(location.hash.substr(1));
        }
    });

}).call(this);
(function() {
    jQuery(function($) {
        var fingerprintScanWatcher, fingerprintStage, integrationBubblesStage, integrationBubblesWatcher, voicesEverywhereStage, voicesEverywhereWatcher;
        if ((voicesEverywhereStage = document.getElementById('edgeStage_EDGE-3625166'))) {
            voicesEverywhereWatcher = new ScrollAnimation({
                el: voicesEverywhereStage,
                offset: function() {
                    return 0;
                },
                animation: function(scrollTop, windowHeight, documentHeight) {
                    if (scrollTop >= (this.start - windowHeight)) {
                        $.Edge.getComposition('EDGE-3625166').getStage().play();
                        return ScrollAnimation.remove(this);
                    }
                }
            });
            ScrollAnimation.register(voicesEverywhereWatcher);
        }
        if ((integrationBubblesStage = document.getElementById('edgeStage_EDGE-20651245'))) {
            integrationBubblesWatcher = new ScrollAnimation({
                el: integrationBubblesStage,
                offset: function() {
                    return 0;
                },
                animation: function(scrollTop, windowHeight, documentHeight) {
                    if (scrollTop >= (this.start - windowHeight)) {
                        $.Edge.getComposition('EDGE-20651245').getStage().play();
                        return ScrollAnimation.remove(this);
                    }
                }
            });
            ScrollAnimation.register(integrationBubblesWatcher);
        }
        if ((fingerprintStage = document.getElementById('edgeStage_EDGE-19383347'))) {
            fingerprintScanWatcher = new ScrollAnimation({
                el: fingerprintStage,
                offset: function() {
                    return 0;
                },
                animation: function(scrollTop, windowHeight, documentHeight) {
                    if (scrollTop >= (this.start - windowHeight)) {
                        return $.Edge.getComposition('EDGE-19383347').getStage().play();
                    }
                }
            });
            return ScrollAnimation.register(fingerprintScanWatcher);
        }
    });

}).call(this);
(function() {
    jQuery(function($) {
        var $currentJobLink, $jobLinks;
        $jobLinks = $(".header-job-link");
        $currentJobLink = $jobLinks.first().addClass("current");
        return setInterval(function() {
            $currentJobLink.removeClass("current");
            $currentJobLink = $currentJobLink.next();
            if ($currentJobLink.length === 0) {
                $currentJobLink = $jobLinks.first();
            }
            return $currentJobLink.addClass("current");
        }, 7000);
    });

}).call(this);
(function() {
    var $ = jQuery.noConflict();
    var $container, $document, $medallians, $next, $prev, containerWidth, currentIdx, firstIdx, itemCount, itemWidth, pageWidth, to,
        _this = this;

    $('#19352-2').waypoint('sticky');

    $medallians = $(".medallian");

    if ($medallians.length) {
        $document = $(document);
        $container = $(".looper");
        $next = $(".looper-next");
        $prev = $(".looper-prev");
        itemCount = $medallians.length;
        itemWidth = $medallians.width();
        containerWidth = itemCount * itemWidth;
        pageWidth = $("body > .container").width();
        $container.width(containerWidth).css({
            left: (containerWidth - pageWidth) / 2
        });
        firstIdx = Math.round($medallians.length / 2) - 1;
        currentIdx = 0;
        to = function(idx, options) {
            var $active, targetPos;
            if (options == null) {
                options = {};
            }
            options = $.extend({
                showProfile: true
            }, options);
            if (idx >= $medallians.length) {
                return;
            } else if (idx < 0) {
                return;
            }
            targetPos = (idx * itemWidth) - itemWidth;
            $container.animate({
                left: -targetPos
            }, 500);
            $(".medallian-profile").hide();
            $(".medallian.active").removeClass("active");
            $active = $medallians.eq(idx).addClass("active");
            if (options.showProfile) {
                $active.find(".medallian-profile").show();
            }
            return currentIdx = idx;
        };
        to(firstIdx, {
            showProfile: false
        });
        $next.on("click", function(e) {
            return to(currentIdx + 1);
        });
        $prev.on("click", function(e) {
            return to(currentIdx - 1);
        });
        $medallians.on("click", function(e) {
            e.stopPropagation();
            return to($medallians.index(e.currentTarget));
        });
        $document.on("mouseenter", ".medallian.active", function(e) {
            return $(e.currentTarget).find(".medallian-profile").show();
        });
        $document.on("click", function(e) {
            return $(".medallian-profile").hide();
        });
    }

}).call(this);
(function() {
    var $ = jQuery.noConflict();
    var $body;

    $body = $(document.body);

    $(function() {
        var $featureContainer;
        if ($body.hasClass("home") && (typeof Modernizr !== "undefined" && Modernizr !== null ? Modernizr.cssanimations : void 0)) {
            $featureContainer = $(".home-promo-feature");
            if ($featureContainer.length) {
                $body.css({
                    overflow: "hidden"
                });
                return setTimeout(function() {
                    return $body.css({
                        overflow: "visible"
                    });
                }, 5000);
            }
        }
    });

}).call(this);
(function() {
    var $form, $input, $page, $results, $title, submitResourceForm;
    var $ = jQuery.noConflict();
    if ( $('body').hasClass('page-template-page-archive-resource-php') ||
                            $('body').hasClass('post-type-archive-resource') ||
                            $('body').hasClass('page-template-page-resource-sub')) {
        $page = $('body');
        $form = $("#resource-search");
        $title = $(".search-title");
        $results = $(".search-results");
        $input = $("#s");
        submitResourceForm = function(cb) {
            var query;
            $results.html("<p class='loading-results'>Loading results...</p>");
            query = $form.serialize();
            return $.ajax({
                url: rootUrl + '/s',
                data: query,
                dataType: "html"
            }).done(function(resp) {
                var results, _base;
                results = $($.parseHTML(resp)).find(".search-results").html();
                $results.html(results);
                if (typeof cb === "function") {
                    cb();
                }
            });
        };
        $('.main').attr('id', 'main');
        var options = {
            valueNames: [ 'sourceSearch', 'resource-type' ]
        };
        var userList = new List('main', options);
        var noResults = function(){
            if (!$('.resource:visible').length){
                $('#no-results').remove();
                $('#all-resources').prepend('<div id="no-results" style="text-align: center;padding-right:90px"><i class="fa fa-times-circle" style="color:#e67761; font-size:2em"></i><h3 style="margin-top:0px"><br>Sorry, we don’t have resources that match your search at this time.</h3><p>Please check back soon.</p>');
            } else {
                $('#no-results').remove();
            }
        };
        $('#resource-topic, #resource-type').find('option:first').prop('selected', 'selected'); // clear the select elements if they refreshed
        $('input.search').val(''); // clear the search field if they refreshed
        $('#resource-topic, #resource-type').select();

        userList.on('searchComplete', function(){
	        noResults();
        });

        $(document)
        .on('keypress', 'input.search', function(e){
            var key = e.which;
            if($(this).val() === ''){
                $('#resource-topic, #resource-type').find('option:first').prop('selected', 'selected').end().trigger('change');
	            $('#load-more').hide(); // in case it's present
	            $('#no-results').remove(); // in case it's present
            }
            noResults();
            if(key == 13){
                e.preventDefault();
            }
        });
        $('body').on('click', '#load-more', function() {
            //console.log($('.related-resources-list li.resource:visible').length);
            var visibleElements = $('.resource:visible').length;
            var topicVal = $('#resource-topic').find('option:selected').val();
            var typeVal = $('#resource-type').find('option:selected').val();
            var noResults = function(){
                if (!$('.resource:visible').length){
                    $('#no-results').remove();
                    $('.search-results').prepend('<p id="no-results" style="text-align: center;">No resources found.</p>');
                } else {
                    $('#no-results').remove();
                }
            };
            $('.resource').hide();
            var resultsToSlice = visibleElements + 11;

            if (topicVal && typeVal){

                $('.topic-' + topicVal + '.resource-' + typeVal).slice(0, resultsToSlice).show();
                if(resultsToSlice >= $('.topic-' + topicVal + '.resource-' + typeVal).length) {
                    $('#load-more').hide();
                }
                noResults();
            } else if (topicVal && !typeVal){

                $('.topic-' + topicVal).slice(0, resultsToSlice).show();
                if(resultsToSlice >= $('.topic-' + topicVal).length) {
                    $('#load-more').hide();
                }
                noResults();
            } else if (!topicVal && typeVal){

                $('.resource-' + typeVal).slice(0, resultsToSlice).show();
                if(resultsToSlice >= $('.resource-' + typeVal).length) {
                    $('#load-more').hide();
                }
                noResults();
            } else {

                $('.resource').slice(0, resultsToSlice).show();

                if(resultsToSlice >= $('.resource').length) {
                    $('#load-more').hide();
                }
            }
        });
        $('#resource-type, #resource-topic, #resource-industry').on("change", function() {
            $('#load-more').hide();
            if($('input.search').val()){
	            $('input.search').val('');
	            userList.search();
			}
            var typeVal = $('#resource-type').find('option:selected').val();
            var topicVal = $('#resource-topic').find('option:selected').val();
            var industryVal = $('#resource-industry').find('option:selected').val();
            $('.resource').hide();

            var constructSelector = '';

            if(typeVal || topicVal || industryVal){
	            if(typeVal){
		            constructSelector += '.format-' + typeVal;
	            }
	            if(topicVal){
		            constructSelector += '.topic-' + topicVal;
	            }
	            if(industryVal){
		            constructSelector += '.industry-' + industryVal;
	            }
	            $(constructSelector).show();
	            noResults();
	        } else {
		        $('.resource').show();
                $('#resource-topic, #resource-type').find('option').removeClass('none');
                noResults();
	        }

        });

        $page.on("click", ".filter-toggle", function(e) {
            var $this;
            e.preventDefault();
            $this = $(this);
            $this.addClass("active").siblings(".active").removeClass("active");
            return $results.removeClass("list grid").addClass(this.getAttribute("data-toggle"));
        });

        // Parse the query in the URL to select element from dropdown
        // - This is specific to individual resource page
        var urlFragment = document.URL.substr(document.URL.indexOf("?") + 1);

        if(urlFragment !== document.URL) {
            topicObj = parseQueryString(urlFragment);

            $('option[value=' + topicObj.topic + ']', '#resource-topic').prop('selected', 'selected').change();
            $('#resource-topic').prop('disabled', true).closest('.styled-select').addClass('disabled');
        }
    }

}).call(this);


// Generated by CoffeeScript 1.3.3
(function(){var e,t;e=function(){function e(e,t){var n,r;this.options={target:"instafeed",get:"popular",resolution:"thumbnail",sortBy:"none",links:!0,mock:!1,useHttp:!1};if(typeof e=="object")for(n in e)r=e[n],this.options[n]=r;this.context=t!=null?t:this,this.unique=this._genKey()}return e.prototype.hasNext=function(){return typeof this.context.nextUrl=="string"&&this.context.nextUrl.length>0},e.prototype.next=function(){return this.hasNext()?this.run(this.context.nextUrl):!1},e.prototype.run=function(t){var n,r,i;if(typeof this.options.clientId!="string"&&typeof this.options.accessToken!="string")throw new Error("Missing clientId or accessToken.");if(typeof this.options.accessToken!="string"&&typeof this.options.clientId!="string")throw new Error("Missing clientId or accessToken.");return this.options.before!=null&&typeof this.options.before=="function"&&this.options.before.call(this),typeof document!="undefined"&&document!==null&&(i=document.createElement("script"),i.id="instafeed-fetcher",i.src=t||this._buildUrl(),n=document.getElementsByTagName("head"),n[0].appendChild(i),r="instafeedCache"+this.unique,window[r]=new e(this.options,this),window[r].unique=this.unique),!0},e.prototype.parse=function(e){var t,n,r,i,s,o,u,a,f,l,c,h,p,d,v,m,g,y,b,w,E,S;if(typeof e!="object"){if(this.options.error!=null&&typeof this.options.error=="function")return this.options.error.call(this,"Invalid JSON data"),!1;throw new Error("Invalid JSON response")}if(e.meta.code!==200){if(this.options.error!=null&&typeof this.options.error=="function")return this.options.error.call(this,e.meta.error_message),!1;throw new Error("Error from Instagram: "+e.meta.error_message)}if(e.data.length===0){if(this.options.error!=null&&typeof this.options.error=="function")return this.options.error.call(this,"No images were returned from Instagram"),!1;throw new Error("No images were returned from Instagram")}this.options.success!=null&&typeof this.options.success=="function"&&this.options.success.call(this,e),this.context.nextUrl="",e.pagination!=null&&(this.context.nextUrl=e.pagination.next_url);if(this.options.sortBy!=="none"){this.options.sortBy==="random"?d=["","random"]:d=this.options.sortBy.split("-"),p=d[0]==="least"?!0:!1;switch(d[1]){case"random":e.data.sort(function(){return.5-Math.random()});break;case"recent":e.data=this._sortBy(e.data,"created_time",p);break;case"liked":e.data=this._sortBy(e.data,"likes.count",p);break;case"commented":e.data=this._sortBy(e.data,"comments.count",p);break;default:throw new Error("Invalid option for sortBy: '"+this.options.sortBy+"'.")}}if(typeof document!="undefined"&&document!==null&&this.options.mock===!1){a=e.data,this.options.limit!=null&&a.length>this.options.limit&&(a=a.slice(0,this.options.limit+1||9e9)),n=document.createDocumentFragment(),this.options.filter!=null&&typeof this.options.filter=="function"&&(a=this._filter(a,this.options.filter));if(this.options.template!=null&&typeof this.options.template=="string"){i="",o="",l="",v=document.createElement("div");for(m=0,b=a.length;m<b;m++)s=a[m],u=s.images[this.options.resolution].url,this.options.useHttp||(u=u.replace("http://","//")),o=this._makeTemplate(this.options.template,{model:s,id:s.id,link:s.link,image:u,caption:this._getObjectProperty(s,"caption.text"),likes:s.likes.count,comments:s.comments.count,location:this._getObjectProperty(s,"location.name")}),i+=o;v.innerHTML=i,S=[].slice.call(v.childNodes);for(g=0,w=S.length;g<w;g++)h=S[g],n.appendChild(h)}else for(y=0,E=a.length;y<E;y++)s=a[y],f=document.createElement("img"),u=s.images[this.options.resolution].url,this.options.useHttp||(u=u.replace("http://","//")),f.src=u,this.options.links===!0?(t=document.createElement("a"),t.href=s.link,t.appendChild(f),n.appendChild(t)):n.appendChild(f);document.getElementById(this.options.target).appendChild(n),r=document.getElementsByTagName("head")[0],r.removeChild(document.getElementById("instafeed-fetcher")),c="instafeedCache"+this.unique,window[c]=void 0;try{delete window[c]}catch(x){}}return this.options.after!=null&&typeof this.options.after=="function"&&this.options.after.call(this),!0},e.prototype._buildUrl=function(){var e,t,n;e="https://api.instagram.com/v1";switch(this.options.get){case"popular":t="media/popular";break;case"tagged":if(typeof this.options.tagName!="string")throw new Error("No tag name specified. Use the 'tagName' option.");t="tags/"+this.options.tagName+"/media/recent";break;case"location":if(typeof this.options.locationId!="number")throw new Error("No location specified. Use the 'locationId' option.");t="locations/"+this.options.locationId+"/media/recent";break;case"user":if(typeof this.options.userId!="number")throw new Error("No user specified. Use the 'userId' option.");if(typeof this.options.accessToken!="string")throw new Error("No access token. Use the 'accessToken' option.");t="users/"+this.options.userId+"/media/recent";break;default:throw new Error("Invalid option for get: '"+this.options.get+"'.")}return n=""+e+"/"+t,this.options.accessToken!=null?n+="?access_token="+this.options.accessToken:n+="?client_id="+this.options.clientId,this.options.limit!=null&&(n+="&count="+this.options.limit),n+="&callback=instafeedCache"+this.unique+".parse",n},e.prototype._genKey=function(){var e;return e=function(){return((1+Math.random())*65536|0).toString(16).substring(1)},""+e()+e()+e()+e()},e.prototype._makeTemplate=function(e,t){var n,r,i,s,o;r=/(?:\{{2})([\w\[\]\.]+)(?:\}{2})/,n=e;while(r.test(n))i=n.match(r)[1],s=(o=this._getObjectProperty(t,i))!=null?o:"",n=n.replace(r,""+s);return n},e.prototype._getObjectProperty=function(e,t){var n,r;t=t.replace(/\[(\w+)\]/g,".$1"),r=t.split(".");while(r.length){n=r.shift();if(!(e!=null&&n in e))return null;e=e[n]}return e},e.prototype._sortBy=function(e,t,n){var r;return r=function(e,r){var i,s;return i=this._getObjectProperty(e,t),s=this._getObjectProperty(r,t),n?i>s?1:-1:i<s?1:-1},e.sort(r.bind(this)),e},e.prototype._filter=function(e,t){var n,r,i,s,o;n=[],i=function(e){if(t(e))return n.push(e)};for(s=0,o=e.length;s<o;s++)r=e[s],i(r);return n},e}(),t=typeof exports!="undefined"&&exports!==null?exports:window,t.Instafeed=e}).call(this);


/*********************************************************************
 *  #### Twitter Post Fetcher v15.0 ####
 *  Coded by Jason Mayes 2015. A present to all the developers out there.
 *  www.jasonmayes.com
 *  Please keep this disclaimer with my code if you use it. Thanks. :-)
 *  Got feedback or questions, ask here:
 *  http://www.jasonmayes.com/projects/twitterApi/
 *  Github: https://github.com/jasonmayes/Twitter-Post-Fetcher
 *  Updates will be posted to this site.
 *********************************************************************/
function populateTpl(e){}!function(e,t){"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?module.exports=t():t()}(this,function(){function e(e){if(null===w){for(var t=e.length,i=0,n=document.getElementById(a),s="<ul>";t>i;)s+="<li>"+e[i]+"</li>",i++;n.innerHTML=s+"</ul>"}else w(e)}function t(e){return e.replace(/<b[^>]*>(.*?)<\/b>/gi,function(e,t){return t}).replace(/class="(?!(tco-hidden|tco-display|tco-ellipsis))+.*?"|data-query-source=".*?"|dir=".*?"|rel=".*?"/gi,"")}function i(e){e=e.getElementsByTagName("a");for(var t=e.length-1;t>=0;t--)e[t].setAttribute("target","_blank")}function n(e,t){for(var i=[],n=new RegExp("(^| )"+t+"( |$)"),s=e.getElementsByTagName("*"),a=0,l=s.length;l>a;a++)n.test(s[a].className)&&i.push(s[a]);return i}function s(e){return void 0!==e&&0<=e.innerHTML.indexOf("data-srcset")?(e=e.innerHTML.match(/data-srcset="([A-z0-9%_\.-]+)/i)[0],decodeURIComponent(e).split('"')[1]):void 0}var a="",l=20,r=!0,o=[],c=!1,d=!0,m=!0,p=null,u=!0,h=!0,w=null,g=!0,f=!1,T=!0,v=!0,b=!1,y=null,x={fetch:function(e){if(void 0===e.maxTweets&&(e.maxTweets=20),void 0===e.enableLinks&&(e.enableLinks=!0),void 0===e.showUser&&(e.showUser=!0),void 0===e.showTime&&(e.showTime=!0),void 0===e.dateFunction&&(e.dateFunction="default"),void 0===e.showRetweet&&(e.showRetweet=!0),void 0===e.customCallback&&(e.customCallback=null),void 0===e.showInteraction&&(e.showInteraction=!0),void 0===e.showImages&&(e.showImages=!1),void 0===e.linksInNewWindow&&(e.linksInNewWindow=!0),void 0===e.showPermalinks&&(e.showPermalinks=!0),void 0===e.dataOnly&&(e.dataOnly=!1),c)o.push(e);else{c=!0,a=e.domId,l=e.maxTweets,r=e.enableLinks,m=e.showUser,d=e.showTime,h=e.showRetweet,p=e.dateFunction,w=e.customCallback,g=e.showInteraction,f=e.showImages,T=e.linksInNewWindow,v=e.showPermalinks,b=e.dataOnly;var t=document.getElementsByTagName("head")[0];null!==y&&t.removeChild(y),y=document.createElement("script"),y.type="text/javascript",y.src="https://cdn.syndication.twimg.com/widgets/timelines/"+e.id+"?&lang="+(e.lang||"en")+"&callback=twitterFetcher.callback&suppress_response_codes=true&rnd="+Math.random(),t.appendChild(y)}},callback:function(a){function w(e){var t=e.getElementsByTagName("img")[0];return t.src=t.getAttribute("data-src-2x"),e}var y=document.createElement("div");y.innerHTML=a.body,"undefined"==typeof y.getElementsByClassName&&(u=!1),a=[];var C=[],k=[],E=[],N=[],_=[],B=[],I=0;if(u)for(y=y.getElementsByClassName("timeline-Tweet");I<y.length;)0<y[I].getElementsByClassName("timeline-Tweet-retweetCredit").length?N.push(!0):N.push(!1),(!N[I]||N[I]&&h)&&(a.push(y[I].getElementsByClassName("timeline-Tweet-text")[0]),_.push(y[I].getAttribute("data-tweet-id")),C.push(w(y[I].getElementsByClassName("timeline-Tweet-author")[0])),k.push(y[I].getElementsByClassName("dt-updated")[0]),B.push(y[I].getElementsByClassName("timeline-Tweet-timestamp")[0]),void 0!==y[I].getElementsByClassName("timeline-Tweet-media")[0]?E.push(y[I].getElementsByClassName("timeline-Tweet-media")[0]):E.push(void 0)),I++;else for(y=n(y,"timeline-Tweet");I<y.length;)0<n(y[I],"timeline-Tweet-retweetCredit").length?N.push(!0):N.push(!1),(!N[I]||N[I]&&h)&&(a.push(n(y[I],"timeline-Tweet-text")[0]),_.push(y[I].getAttribute("data-tweet-id")),C.push(w(n(y[I],"timeline-Tweet-author")[0])),k.push(n(y[I],"dt-updated")[0]),B.push(n(y[I],"timeline-Tweet-timestamp")[0]),void 0!==n(y[I],"timeline-Tweet-media")[0]?E.push(n(y[I],"timeline-Tweet-media")[0]):E.push(void 0)),I++;a.length>l&&(a.splice(l,a.length-l),C.splice(l,C.length-l),k.splice(l,k.length-l),N.splice(l,N.length-l),E.splice(l,E.length-l),B.splice(l,B.length-l));var y=[],I=a.length,L=0;if(b)for(;I>L;)y.push({tweet:a[L].innerHTML,author:C[L].innerHTML,time:k[L].innerText,image:s(E[L]),rt:N[L],tid:_[L],permalinkURL:void 0===B[L]?"":B[L].href}),L++;else for(;I>L;){if("string"!=typeof p){var N=k[L].getAttribute("datetime"),A=new Date(k[L].getAttribute("datetime").replace(/-/g,"/").replace("T"," ").split("+")[0]),N=p(A,N);if(k[L].setAttribute("aria-label",N),a[L].innerText)if(u)k[L].innerText=N;else{var A=document.createElement("p"),M=document.createTextNode(N);A.appendChild(M),A.setAttribute("aria-label",N),k[L]=A}else k[L].textContent=N}N="",r?(T&&(i(a[L]),m&&i(C[L])),m&&(N+='<div class="user">'+t(C[L].innerHTML)+"</div>"),N+='<p class="tweet">'+t(a[L].innerHTML)+"</p>",d&&(N=v?N+('<p class="timePosted"><a href="'+B[L]+'">'+k[L].getAttribute("aria-label")+"</a></p>"):N+('<p class="timePosted">'+k[L].getAttribute("aria-label")+"</p>"))):a[L].innerText?(m&&(N+='<p class="user">'+C[L].innerText+"</p>"),N+='<p class="tweet">'+a[L].innerText+"</p>",d&&(N+='<p class="timePosted">'+k[L].innerText+"</p>")):(m&&(N+='<p class="user">'+C[L].textContent+"</p>"),N+='<p class="tweet">'+a[L].textContent+"</p>",d&&(N+='<p class="timePosted">'+k[L].textContent+"</p>")),g&&(N+='<p class="interact"><a href="https://twitter.com/intent/tweet?in_reply_to='+_[L]+'" class="twitter_reply_icon"'+(T?' target="_blank">':">")+'Reply</a><a href="https://twitter.com/intent/retweet?tweet_id='+_[L]+'" class="twitter_retweet_icon"'+(T?' target="_blank">':">")+'Retweet</a><a href="https://twitter.com/intent/favorite?tweet_id='+_[L]+'" class="twitter_fav_icon"'+(T?' target="_blank">':">")+"Favorite</a></p>"),f&&void 0!==E[L]&&(N+='<div class="media"><img src="'+s(E[L])+'" alt="Image from tweet" /></div>'),y.push(N),L++}e(y),c=!1,0<o.length&&(x.fetch(o[0]),o.splice(0,1))}};return window.twitterFetcher=x});var config8={id:"345170787868762112",dataOnly:!0,customCallback:populateTpl};twitterFetcher.fetch(config8);
/**
 *   End Twitter
 */


/**
 *   Function to parse a query string
 */
function parseQueryString( queryString ) {
    var params = {}, queries, temp, i, l;

    // Split into key/value pairs
    queries = queryString.split("&");

    // Convert the array of strings into an object
    for ( i = 0, l = queries.length; i < l; i++ ) {
        temp = queries[i].split('=');
        params[temp[0]] = temp[1];
    }

    return params;
}

jQuery(function($){
    ScrollAnimation.start();
    $(window).load(function() { ScrollAnimation.refresh() });

    // -------------------------------------------------------------------------
    // Open external links in new tab/window
    // -------------------------------------------------------------------------
    EXTERNAL_HREF =  new RegExp('^https?://' + window.location.host);
    $("a[href]").each(function(i, el) {
        if(!EXTERNAL_HREF.test(el.href)) {
            el.setAttribute("target", "_blank")
        }
    });

    // -------------------------------------------------------------------------
    // Sectioned/progress bar page analytics
    // -------------------------------------------------------------------------
    var viewedSections = [];
    /**
     * @param {jQuery.Event} e
     * @param {Object} data co
     *
     * @return {void}
     */
    $(document).on("view-section", function(e, data) {
        var page = window.location.pathname +
            window.location.search +
            '#' + data.sectionId;

        if(viewedSections.indexOf(page) === -1) {
            ga('send', 'pageview', page);
            viewedSections.push(page);
        }
    });

    var id = location.hash.substr(1);
    $('.progress').find('a[href$="' + id + '"]').each(function(i, el) {
        $(document).trigger("view-section", {
            method: "direct",
            sectionId: id
        });
    });

    /**
     *  Sticky positions
     */
    if($('#open-positions').length > 0) {
        var $toSticky = $("#open-positions");
        var position = $toSticky.position();
        $(window).scroll(function () {
            var windowpos = $(window).scrollTop();
            var positionTop = 0;

            if ($(window).width() <= 768) {
                windowpos = windowpos + 81;
                positionTop = position.top;
            } else {
                positionTop = position.top;
            }

            if (windowpos >= positionTop) {
                $toSticky.addClass("sticky");
                $('#open-positions-ghost').show().height($('#open-positions').outerHeight());
            } else {
                $toSticky.removeClass("sticky");
                $('#open-positions-ghost').hide();
            }
        });
    }

    /**
     *  Careers page functionality
     */

    (function() {

        // Override click events on any links and redirect to tweet
        $('body').on('click', '.twitter-entity a', function(e) {
            e.stopPropagation();
            window.open($(this).closest('.twitter').find('a:first').attr('href'));
            return false;
        })

        if($('#instafeed').length > 0) {
            /**
             *  Click location and switch video in hero slot
             */
            $('.office-btn', '#offices').click(function () {
                var officeLocation = $(this).closest('li').data('office');
            });

            function handleTweets(tweets) {
                var x = tweets.length;
                var n = 0;
                var $element = $('#twitter-slideshow');
                var html = '';
                while(n < x) {
                    html += '<div class="twitter-entity">' +
                        tweets[n] +
                        '</div>';
                    n++;
                }
                $element.html(html).hide().fadeIn(1000);

                // Cycle through twitter feeds
                setInterval(function () {
                    $('#twitter-slideshow > .twitter-entity:first')
                        .fadeOut(600, function () {
                            $('#twitter-slideshow').closest('a').prop('href', '');
                        })
                        .next()
                        .fadeIn(600, function () {
                            var twitterHref = $('.timePosted a', this).attr('href');
                            $('#twitter-slideshow').closest('a').prop('href', twitterHref);
                        })
                        .end()
                        .appendTo('#twitter-slideshow');
                }, 7000);
            }


            // Show tweets
            var medalliaCareersFeed = {
                "id": '636997172437741573',
                "domId": '',
                "maxTweets": 10,
                "enableLinks": true,
                "showUser": true,
                "showTime": true,
                "dateFunction": '',
                "showRetweet": false,
                "customCallback": handleTweets,
                "showInteraction": false
            };



            twitterFetcher.fetch(medalliaCareersFeed);

            /**
             *  Instafeed.js
             *
             */
            var feed = new Instafeed({
                get: 'user',
                after: function() {
                    /**
                     *  Instagram slideshow
                     */

                    $('#instafeed').fadeIn(1000).css({'display':'block'});
                    setTimeout(function () {
                        $('#instafeed > .slide:first')
                            .show()
                            .end()
                            .appendTo('#instafeed');
                    }, 50);

                    setInterval(function () {
                        $('#instafeed > .slide:first')
                            .fadeOut(1000)
                            .next()
                            .fadeIn(1000)
                            .end()
                            .appendTo('#instafeed');
                    }, 3000);

                },
                userId: 509383027,
                resolution: 'standard_resolution',
                sortBy: 'most-recent',
                accessToken: '509383027.8155914.dffdcbdda6cc4afbbfb173d93bc7056d',
                template: '<div class="slide" style="background:url({{image}}) no-repeat;"></div>'
            });
            feed.run();


            // Create the slick dropdown
            $('#offices').ddslick({
                onSelected: function (data) {

                    function ready(player_id){
                        $f(player_id).addEvent('finish', onFinish);
                        $f('iframe-palo-alto').api('play');
                        setTimeout(function() {
                            $('#careers-video-poster').fadeOut(300);
                        }, 1000);
                    }

                    function onFinish(player_id) {
                        $f(player_id).api('play');
                    }

                    // If the option selected is the first one, do nothing
                    if(data.selectedIndex == 0) {
                        return false;
                    } else {

                        var value = data.settings.data[data.selectedIndex].value;
                        $('.careers-sizzle-video').hide();
                        var videos = $('iframe', '.careers-sizzle-video');
                        $('iframe', '.careers-sizzle-video').each(function (index) {
                            player = videos[index];
                            $f(player).addEvent('ready', ready);
                            $f(player).api('pause');
                        });

                        $f('iframe-' + value, '#video-' + value).api('play');
                        $('#video-' + value).fadeIn(300);
                    }
                }
            });

                var videos = $('iframe', '.careers-sizzle-video');
                $('iframe', '.careers-sizzle-video').each(function(index){
                    player = videos[index];
                    $f(player).addEvent('ready', ready);
                });


            function ready(player_id){
                $f(player_id).addEvent('finish', onFinish);
                $f('iframe-palo-alto').api('play');
                setTimeout(function() {
                    $('#careers-video-poster').fadeOut(300);
                }, 1000);
            }

            function onFinish(player_id) {
                $f(player_id).api('play');
            }
        }
    })();
});

jQuery(function() {
    var $ = jQuery.noConflict();
        $('section#voice-of-the-employee').insertBefore('#social-cem');
        $('a[href="#voice-of-the-employee"]').insertBefore('a[href="#social-cem"]');
})
