/**
 * Cross-Browser Polyfills and Feature Detection
 * For DG Panchal Website
 */

(function() {
    'use strict';

    // ==========================================================================
    // Intersection Observer Polyfill for IE11
    // ==========================================================================
    
    if (typeof IntersectionObserver === 'undefined') {
        console.log('Loading Intersection Observer polyfill for legacy browser');
        
        // Simple scroll-based fallback for lazy loading
        window.IntersectionObserver = function(callback) {
            this.observe = function(element) {
                element.setAttribute('data-polyfill-observed', 'true');
            };
            
            this.unobserve = function(element) {
                element.removeAttribute('data-polyfill-observed');
            };
            
            this.disconnect = function() {};
        };
        
        // Scroll-based lazy loading fallback
        function handleScrollLazyLoad() {
            const lazyImages = document.querySelectorAll('img[data-src][data-polyfill-observed]');
            
            lazyImages.forEach(function(img) {
                const rect = img.getBoundingClientRect();
                const windowHeight = window.innerHeight || document.documentElement.clientHeight;
                
                if (rect.top < windowHeight && rect.bottom > 0) {
                    img.src = img.getAttribute('data-src');
                    img.classList.remove('lazy');
                    img.removeAttribute('data-polyfill-observed');
                }
            });
        }
        
        // Throttled scroll handler
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            scrollTimeout = setTimeout(handleScrollLazyLoad, 100);
        });
        
        // Initial check
        document.addEventListener('DOMContentLoaded', handleScrollLazyLoad);
    }
    
    // ==========================================================================
    // CSS Custom Properties (Variables) Polyfill for IE11
    // ==========================================================================
    
    function supportsCSSVariables() {
        try {
            return CSS.supports && CSS.supports('color', 'var(--test)');
        } catch (e) {
            return false;
        }
    }
    
    if (!supportsCSSVariables()) {
        console.log('Loading CSS Variables polyfill for IE11');
        
        // Define fallback values for CSS custom properties
        const cssVariables = {
            '--primary-color': '#ff6b35',
            '--secondary-color': '#1a1a2e',
            '--accent-color': '#16213e',
            '--text-light': '#f0f6fc',
            '--text-dark': '#0d1117',
            '--border-color': '#30363d'
        };
        
        // Apply fallback styles
        function applyCSSVariableFallbacks() {
            // Add fallback stylesheet
            const style = document.createElement('style');
            style.textContent = `
                .header { background: rgba(13, 17, 23, 0.95) !important; }
                .btn-primary { 
                    background-color: #ff6b35 !important; 
                    border-color: #ff6b35 !important; 
                }
                .btn-secondary { 
                    background-color: #1a1a2e !important; 
                    border-color: #30363d !important; 
                }
                .hero-title { color: #f0f6fc !important; }
                .section-title { color: #f0f6fc !important; }
            `;
            document.head.appendChild(style);
        }
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', applyCSSVariableFallbacks);
        } else {
            applyCSSVariableFallbacks();
        }
    }
    
    // ==========================================================================
    // Object.assign Polyfill for IE11
    // ==========================================================================
    
    if (typeof Object.assign !== 'function') {
        Object.assign = function(target) {
            if (target == null) {
                throw new TypeError('Cannot convert undefined or null to object');
            }
            
            var to = Object(target);
            
            for (var index = 1; index < arguments.length; index++) {
                var nextSource = arguments[index];
                
                if (nextSource != null) {
                    for (var nextKey in nextSource) {
                        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                            to[nextKey] = nextSource[nextKey];
                        }
                    }
                }
            }
            return to;
        };
    }
    
    // ==========================================================================
    // Array.from Polyfill for IE11
    // ==========================================================================
    
    if (!Array.from) {
        Array.from = function(arrayLike) {
            var items = Object(arrayLike);
            var len = parseInt(items.length) || 0;
            var result = new Array(len);
            
            for (var i = 0; i < len; i++) {
                result[i] = items[i];
            }
            return result;
        };
    }
    
    // ==========================================================================
    // NodeList.forEach Polyfill for IE11
    // ==========================================================================
    
    if (window.NodeList && !NodeList.prototype.forEach) {
        NodeList.prototype.forEach = Array.prototype.forEach;
    }
    
    // ==========================================================================
    // Element.closest Polyfill for IE11
    // ==========================================================================
    
    if (!Element.prototype.closest) {
        Element.prototype.closest = function(selector) {
            var element = this;
            
            while (element && element.nodeType === 1) {
                if (element.matches && element.matches(selector)) {
                    return element;
                }
                element = element.parentNode;
            }
            return null;
        };
    }
    
    // ==========================================================================
    // Element.matches Polyfill for IE11
    // ==========================================================================
    
    if (!Element.prototype.matches) {
        Element.prototype.matches = 
            Element.prototype.matchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector ||
            Element.prototype.oMatchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            function(s) {
                var matches = (this.document || this.ownerDocument).querySelectorAll(s);
                var i = matches.length;
                while (--i >= 0 && matches.item(i) !== this) {}
                return i > -1;
            };
    }
    
    // ==========================================================================
    // Smooth Scrolling Polyfill for IE11 and Safari
    // ==========================================================================
    
    function supportsSmoothScrolling() {
        return 'scrollBehavior' in document.documentElement.style;
    }
    
    if (!supportsSmoothScrolling()) {
        console.log('Loading smooth scrolling polyfill');
        
        // Smooth scroll polyfill
        function smoothScrollTo(element, duration) {
            duration = duration || 800;
            
            const targetPosition = element.offsetTop - 80; // Account for fixed header
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            let startTime = null;
            
            function animation(currentTime) {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, run);
                
                if (timeElapsed < duration) {
                    requestAnimationFrame(animation);
                }
            }
            
            function easeInOutQuad(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }
            
            requestAnimationFrame(animation);
        }
        
        // Override anchor link behavior
        document.addEventListener('click', function(e) {
            const anchor = e.target.closest('a[href^="#"]');
            if (anchor) {
                e.preventDefault();
                const targetId = anchor.getAttribute('href').substr(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    smoothScrollTo(targetElement);
                }
            }
        });
    }
    
    // ==========================================================================
    // requestAnimationFrame Polyfill for IE9
    // ==========================================================================
    
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback) {
            return setTimeout(function() {
                callback(Date.now());
            }, 1000 / 60);
        };
        
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
    
    // ==========================================================================
    // classList Polyfill for IE9
    // ==========================================================================
    
    if (!('classList' in document.createElement('_'))) {
        (function(view) {
            if (!('Element' in view)) return;
            
            var classListProp = 'classList',
                protoProp = 'prototype',
                elemCtrProto = view.Element[protoProp],
                objCtr = Object,
                strTrim = String[protoProp].trim || function() {
                    return this.replace(/^\s+|\s+$/g, '');
                },
                arrIndexOf = Array[protoProp].indexOf || function(item) {
                    var i = 0, len = this.length;
                    for (; i < len; i++) {
                        if (i in this && this[i] === item) {
                            return i;
                        }
                    }
                    return -1;
                };
            
            function DOMTokenList(el) {
                this.el = el;
                var classes = el.className.replace(/^\s+|\s+$/g, '').split(/\s+/);
                for (var i = 0; i < classes.length; i++) {
                    this.push(classes[i]);
                }
            }
            
            DOMTokenList[protoProp] = [];
            DOMTokenList[protoProp].item = function(i) {
                return this[i] || null;
            };
            DOMTokenList[protoProp].contains = function(token) {
                token += '';
                return arrIndexOf.call(this, token) !== -1;
            };
            DOMTokenList[protoProp].add = function() {
                var tokens = arguments;
                for (var i = 0, len = tokens.length; i < len; i++) {
                    var token = tokens[i] + '';
                    if (arrIndexOf.call(this, token) === -1) {
                        this.push(token);
                    }
                }
                this.el.className = this.toString();
            };
            DOMTokenList[protoProp].remove = function() {
                var tokens = arguments;
                for (var i = 0, len = tokens.length; i < len; i++) {
                    var token = tokens[i] + '';
                    var index = arrIndexOf.call(this, token);
                    if (index !== -1) {
                        this.splice(index, 1);
                    }
                }
                this.el.className = this.toString();
            };
            DOMTokenList[protoProp].toggle = function(token, force) {
                token += '';
                var result = this.contains(token),
                    method = result ?
                        force !== true && 'remove' :
                        force !== false && 'add';
                
                if (method) {
                    this[method](token);
                }
                
                if (force === true || force === false) {
                    return force;
                } else {
                    return !result;
                }
            };
            DOMTokenList[protoProp].toString = function() {
                return this.join(' ');
            };
            
            if (objCtr.defineProperty) {
                var defineProperty = function(object, name, definition) {
                    if (definition.value) definition.writable = true;
                    objCtr.defineProperty(object, name, definition);
                };
                try {
                    defineProperty(elemCtrProto, classListProp, {
                        get: function() {
                            return new DOMTokenList(this);
                        },
                        enumerable: true,
                        configurable: true
                    });
                } catch (ex) {
                    // Fallback for older browsers
                    elemCtrProto[classListProp] = function() {
                        return new DOMTokenList(this);
                    };
                }
            }
        }(window));
    }
    
    // ==========================================================================
    // Feature Detection and Browser Information
    // ==========================================================================
    
    window.BrowserFeatures = {
        supportsGrid: function() {
            return CSS.supports && CSS.supports('display', 'grid');
        },
        
        supportsFlexbox: function() {
            return CSS.supports && CSS.supports('display', 'flex');
        },
        
        supportsBackdropFilter: function() {
            return CSS.supports && (
                CSS.supports('backdrop-filter', 'blur(1px)') ||
                CSS.supports('-webkit-backdrop-filter', 'blur(1px)')
            );
        },
        
        supportsObjectFit: function() {
            return CSS.supports && CSS.supports('object-fit', 'cover');
        },
        
        supportsIntersectionObserver: function() {
            return 'IntersectionObserver' in window;
        },
        
        isIE11: function() {
            return !!window.MSInputMethodContext && !!document.documentMode;
        },
        
        isEdge: function() {
            return navigator.userAgent.indexOf('Edge') > -1;
        },
        
        isSafari: function() {
            return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        },
        
        isMobile: function() {
            return window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        }
    };
    
    // Log browser feature support
    if (console && console.log) {
        console.log('Browser Feature Support:', {
            grid: window.BrowserFeatures.supportsGrid(),
            flexbox: window.BrowserFeatures.supportsFlexbox(),
            backdropFilter: window.BrowserFeatures.supportsBackdropFilter(),
            objectFit: window.BrowserFeatures.supportsObjectFit(),
            intersectionObserver: window.BrowserFeatures.supportsIntersectionObserver(),
            isIE11: window.BrowserFeatures.isIE11(),
            isEdge: window.BrowserFeatures.isEdge(),
            isSafari: window.BrowserFeatures.isSafari(),
            isMobile: window.BrowserFeatures.isMobile()
        });
    }
    
    // Add browser classes to html element for CSS targeting
    const html = document.documentElement;
    
    if (window.BrowserFeatures.isIE11()) {
        html.className += ' ie11';
    }
    
    if (window.BrowserFeatures.isEdge()) {
        html.className += ' edge';
    }
    
    if (window.BrowserFeatures.isSafari()) {
        html.className += ' safari';
    }
    
    if (window.BrowserFeatures.isMobile()) {
        html.className += ' mobile';
    }
    
    if (!window.BrowserFeatures.supportsGrid()) {
        html.className += ' no-grid';
    }
    
    if (!window.BrowserFeatures.supportsBackdropFilter()) {
        html.className += ' no-backdrop-filter';
    }

})();
