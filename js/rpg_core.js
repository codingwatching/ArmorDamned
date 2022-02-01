//=============================================================================
// rpg_core.js
//=============================================================================

//-----------------------------------------------------------------------------
/**
 * This is not a class, but contains some methods that will be added to the
 * standard Javascript objects.
 *
 * @class JsExtensions
 */
function JsExtensions() {
    throw new Error('This is not a class');
}

/**
 * Returns a number whose value is limited to the given range.
 *
 * @method Number.prototype.clamp
 * @param {Number} min The lower boundary
 * @param {Number} max The upper boundary
 * @return {Number} A number in the range (min, max)
 */
Number.prototype.clamp = function(min, max) {
    return Math.min(Math.max(this, min), max);
};

/**
 * Returns a modulo value which is always positive.
 *
 * @method Number.prototype.mod
 * @param {Number} n The divisor
 * @return {Number} A modulo value
 */
Number.prototype.mod = function(n) {
    return ((this % n) + n) % n;
};

/**
 * Replaces %1, %2 and so on in the string to the arguments.
 *
 * @method String.prototype.format
 * @param {Any} ...args The objects to format
 * @return {String} A formatted string
 */
String.prototype.format = function() {
    var args = arguments;
    return this.replace(/%([0-9]+)/g, function(s, n) {
        return args[Number(n) - 1];
    });
};

/**
 * Makes a number string with leading zeros.
 *
 * @method String.prototype.padZero
 * @param {Number} length The length of the output string
 * @return {String} A string with leading zeros
 */
String.prototype.padZero = function(length){
    var s = this;
    while (s.length < length) {
        s = '0' + s;
    }
    return s;
};

/**
 * Makes a number string with leading zeros.
 *
 * @method Number.prototype.padZero
 * @param {Number} length The length of the output string
 * @return {String} A string with leading zeros
 */
Number.prototype.padZero = function(length){
    return String(this).padZero(length);
};

/**
 * Checks whether the two arrays are same.
 *
 * @method Array.prototype.equals
 * @param {Array} array The array to compare to
 * @return {Boolean} True if the two arrays are same
 */
Array.prototype.equals = function(array) {
    if (!array || this.length !== array.length) {
        return false;
    }
    for (var i = 0; i < this.length; i++) {
        if (this[i] instanceof Array && array[i] instanceof Array) {
            if (!this[i].equals(array[i])) {
                return false;
            }
        } else if (this[i] !== array[i]) {
            return false;
        }
    }
    return true;
};

/**
 * Makes a shallow copy of the array.
 *
 * @method Array.prototype.clone
 * @return {Array} A shallow copy of the array
 */
Array.prototype.clone = function() {
    return this.slice(0);
};

/**
 * Checks whether the array contains a given element.
 *
 * @method Array.prototype.contains
 * @param {Any} element The element to search for
 * @return {Boolean} True if the array contains a given element
 */
Array.prototype.contains = function(element) {
    return this.indexOf(element) >= 0;
};

/**
 * Checks whether the string contains a given string.
 *
 * @method String.prototype.contains
 * @param {String} string The string to search for
 * @return {Boolean} True if the string contains a given string
 */
String.prototype.contains = function(string) {
    return this.indexOf(string) >= 0;
};

/**
 * Generates a random integer in the range (0, max-1).
 *
 * @static
 * @method Math.randomInt
 * @param {Number} max The upper boundary (excluded)
 * @return {Number} A random integer
 */
Math.randomInt = function(max) {
    return Math.floor(max * Math.random());
};

//-----------------------------------------------------------------------------
/**
 * The static class that defines utility methods.
 *
 * @class Utils
 */
function Utils() {
    throw new Error('This is a static class');
}

/**
 * The name of the RPG Maker. 'MV' in the current version.
 *
 * @static
 * @property RPGMAKER_NAME
 * @type String
 * @final
 */
Utils.RPGMAKER_NAME = 'MV';

/**
 * Checks whether the option is in the query string.
 *
 * @static
 * @method isOptionValid
 * @param {String} name The option name
 * @return {Boolean} True if the option is in the query string
 */
Utils.isOptionValid = function(name) {
    return location.search.slice(1).split('&').contains(name);
};

/**
 * Checks whether the platform is NW.js.
 *
 * @static
 * @method isNwjs
 * @return {Boolean} True if the platform is NW.js
 */
Utils.isNwjs = function() {
    return typeof require === 'function' && typeof process === 'object';
};

/**
 * Checks whether the platform is a mobile device.
 *
 * @static
 * @method isMobileDevice
 * @return {Boolean} True if the platform is a mobile device
 */
Utils.isMobileDevice = function() {
    var r = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return !!navigator.userAgent.match(r);
};

/**
 * Checks whether the browser is Mobile Safari.
 *
 * @static
 * @method isMobileSafari
 * @return {Boolean} True if the browser is Mobile Safari
 */
Utils.isMobileSafari = function() {
    var agent = navigator.userAgent;
    return !!(agent.match(/iPhone|iPad|iPod/) && agent.match(/AppleWebKit/) &&
              !agent.match('CriOS'));
};

/**
 * Checks whether the browser is Android Chrome.
 *
 * @static
 * @method isAndroidChrome
 * @return {Boolean} True if the browser is Android Chrome
 */
Utils.isAndroidChrome = function() {
    var agent = navigator.userAgent;
    return !!(agent.match(/Android/) && agent.match(/Chrome/));
};

/**
 * Checks whether the browser can read files in the game folder.
 *
 * @static
 * @method canReadGameFiles
 * @return {Boolean} True if the browser can read files in the game folder
 */
Utils.canReadGameFiles = function() {
    var scripts = document.getElementsByTagName('script');
    var lastScript = scripts[scripts.length - 1];
    var xhr = new XMLHttpRequest();
    try {
        xhr.open('GET', lastScript.src);
        xhr.overrideMimeType('text/javascript');
        xhr.send();
        return true;
    } catch (e) {
        return false;
    }
};

/**
 * Makes a CSS color string from RGB values.
 *
 * @static
 * @method rgbToCssColor
 * @param {Number} r The red value in the range (0, 255)
 * @param {Number} g The green value in the range (0, 255)
 * @param {Number} b The blue value in the range (0, 255)
 * @return {String} CSS color string
 */
Utils.rgbToCssColor = function(r, g, b) {
    r = Math.round(r);
    g = Math.round(g);
    b = Math.round(b);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
};

Utils._supportPassiveEvent = null;
/**
 * Test this browser support passive event feature
 * 
 * @static
 * @method isSupportPassiveEvent
 * @return {Boolean} this browser support passive event or not
 */
Utils.isSupportPassiveEvent = function() {
    if (typeof Utils._supportPassiveEvent === "boolean") {
        return Utils._supportPassiveEvent;
    }
    // test support passive event
    // https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#feature-detection
    var passive = false;
    var options = Object.defineProperty({}, "passive", {
        get: function() { passive = true; }
    });
    window.addEventListener("test", null, options);
    Utils._supportPassiveEvent = passive;
    return passive;
}

//-----------------------------------------------------------------------------
/**
 * The point class.
 *
 * @class Point
 * @constructor
 * @param {Number} x The x coordinate
 * @param {Number} y The y coordinate
 */
function Point() {
    this.initialize.apply(this, arguments);
}

Point.prototype = Object.create(PIXI.Point.prototype);
Point.prototype.constructor = Point;

Point.prototype.initialize = function(x, y) {
    PIXI.Point.call(this, x, y);
};

/**
 * The x coordinate.
 *
 * @property x
 * @type Number
 */

/**
 * The y coordinate.
 *
 * @property y
 * @type Number
 */

//-----------------------------------------------------------------------------
/**
 * The rectangle class.
 *
 * @class Rectangle
 * @constructor
 * @param {Number} x The x coordinate for the upper-left corner
 * @param {Number} y The y coordinate for the upper-left corner
 * @param {Number} width The width of the rectangle
 * @param {Number} height The height of the rectangle
 */
function Rectangle() {
    this.initialize.apply(this, arguments);
}

Rectangle.prototype = Object.create(PIXI.Rectangle.prototype);
Rectangle.prototype.constructor = Rectangle;

Rectangle.prototype.initialize = function(x, y, width, height) {
    PIXI.Rectangle.call(this, x, y, width, height);
};

/**
 * @static
 * @property emptyRectangle
 * @type Rectangle
 * @private
 */
Rectangle.emptyRectangle = new Rectangle(0, 0, 0, 0);

/**
 * The x coordinate for the upper-left corner.
 *
 * @property x
 * @type Number
 */

/**
 * The y coordinate for the upper-left corner.
 *
 * @property y
 * @type Number
 */

/**
 * The width of the rectangle.
 *
 * @property width
 * @type Number
 */

/**
 * The height of the rectangle.
 *
 * @property height
 * @type Number
 */

//-----------------------------------------------------------------------------
/**
 * The basic object that represents an image.
 *
 * @class Bitmap
 * @constructor
 * @param {Number} width The width of the bitmap
 * @param {Number} height The height of the bitmap
 */
function Bitmap() {
    this.initialize.apply(this, arguments);
}

Bitmap.prototype.initialize = function(width, height) {
    this._canvas = document.createElement('canvas');
    this._context = this._canvas.getContext('2d');
    this._canvas.width = Math.max(width || 0, 1);
    this._canvas.height = Math.max(height || 0, 1);
    this._baseTexture = new PIXI.BaseTexture(this._canvas);
    this._baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
    this._image = null;
    this._url = '';
    this._paintOpacity = 255;
    this._smooth = false;
    this._loadListeners = [];
    this._errorListeners = [];
    this._isLoading = false;
    this._hasError = false;

    /**
     * The face name of the font.
     *
     * @property fontFace
     * @type String
     */
    this.fontFace = 'GameFont';

    /**
     * The size of the font in pixels.
     *
     * @property fontSize
     * @type Number
     */
    this.fontSize = 28;

    /**
     * Whether the font is italic.
     *
     * @property fontItalic
     * @type Boolean
     */
    this.fontItalic = false;

    /**
     * The color of the text in CSS format.
     *
     * @property textColor
     * @type String
     */
    this.textColor = '#ffffff';

    /**
     * The color of the outline of the text in CSS format.
     *
     * @property outlineColor
     * @type String
     */
    this.outlineColor = 'rgba(0, 0, 0, 0.5)';

    /**
     * The width of the outline of the text.
     *
     * @property outlineWidth
     * @type Number
     */
    this.outlineWidth = 4;
};

/**
 * Loads a image file and returns a new bitmap object.
 *
 * @static
 * @method load
 * @param {String} url The image url of the texture
 * @return Bitmap
 */
Bitmap.load = function(url) {
    var bitmap = new Bitmap();
    bitmap._image = new Image();
	if(Decrypter.needEncrypt(url)) {
        Decrypter.decryptImg(url, bitmap);
    } else {
		bitmap._image.src = url;
		bitmap._image.onload = Bitmap.prototype._onLoad.bind(bitmap);
		bitmap._image.onerror = Bitmap.prototype._onError.bind(bitmap);
    }
    bitmap._url = url;
    bitmap._isLoading = true;
    return bitmap;
};

/**
 * Takes a snapshot of the game screen and returns a new bitmap object.
 *
 * @static
 * @method snap
 * @param {Stage} stage The stage object
 * @return Bitmap
 */
Bitmap.snap = function(stage) {
    var width = Graphics.width;
    var height = Graphics.height;
    var bitmap = new Bitmap(width, height);
    var context = bitmap._context;
    var renderTexture = new PIXI.RenderTexture(width, height);
    if (stage) {
        renderTexture.render(stage);
        stage.worldTransform.identity();
    }
    if (Graphics.isWebGL()) {
        var gl =  renderTexture.renderer.gl;
        var webGLPixels = new Uint8Array(4 * width * height);
        gl.bindFramebuffer(gl.FRAMEBUFFER, renderTexture.textureBuffer.frameBuffer);
        gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, webGLPixels);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        var canvasData = context.getImageData(0, 0, width, height);
        canvasData.data.set(webGLPixels);
        context.putImageData(canvasData, 0, 0);
    } else {
        context.drawImage(renderTexture.textureBuffer.canvas, 0, 0);
    }
    bitmap._setDirty();
    return bitmap;
};

/**
 * Checks whether the bitmap is ready to render.
 *
 * @method isReady
 * @return {Boolean} True if the bitmap is ready to render
 */
Bitmap.prototype.isReady = function() {
    return !this._isLoading;
};

/**
 * Checks whether a loading error has occurred.
 *
 * @method isError
 * @return {Boolean} True if a loading error has occurred
 */
Bitmap.prototype.isError = function() {
    return this._hasError;
};

/**
 * [read-only] The url of the image file.
 *
 * @property url
 * @type String
 */
Object.defineProperty(Bitmap.prototype, 'url', {
    get: function() {
        return this._url;
    },
    configurable: true
});

/**
 * [read-only] The base texture that holds the image.
 *
 * @property baseTexture
 * @type PIXI.BaseTexture
 */
Object.defineProperty(Bitmap.prototype, 'baseTexture', {
    get: function() {
        return this._baseTexture;
    },
    configurable: true
});

/**
 * [read-only] The bitmap canvas.
 *
 * @property canvas
 * @type HTMLCanvasElement
 */
Object.defineProperty(Bitmap.prototype, 'canvas', {
    get: function() {
        return this._canvas;
    },
    configurable: true
});

/**
 * [read-only] The 2d context of the bitmap canvas.
 *
 * @property context
 * @type CanvasRenderingContext2D
 */
Object.defineProperty(Bitmap.prototype, 'context', {
    get: function() {
        return this._context;
    },
    configurable: true
});

/**
 * [read-only] The width of the bitmap.
 *
 * @property width
 * @type Number
 */
Object.defineProperty(Bitmap.prototype, 'width', {
    get: function() {
        return this._isLoading ? 0 : this._canvas.width;
    },
    configurable: true
});

/**
 * [read-only] The height of the bitmap.
 *
 * @property height
 * @type Number
 */
Object.defineProperty(Bitmap.prototype, 'height', {
    get: function() {
        return this._isLoading ? 0 : this._canvas.height;
    },
    configurable: true
});

/**
 * [read-only] The rectangle of the bitmap.
 *
 * @property rect
 * @type Rectangle
 */
Object.defineProperty(Bitmap.prototype, 'rect', {
    get: function() {
        return new Rectangle(0, 0, this.width, this.height);
    },
    configurable: true
});

/**
 * Whether the smooth scaling is applied.
 *
 * @property smooth
 * @type Boolean
 */
Object.defineProperty(Bitmap.prototype, 'smooth', {
    get: function() {
        return this._smooth;
    },
    set: function(value) {
        if (this._smooth !== value) {
            this._smooth = value;
            if (this._smooth) {
                this._baseTexture.scaleMode = PIXI.scaleModes.LINEAR;
            } else {
                this._baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
            }
        }
    },
    configurable: true
});

/**
 * The opacity of the drawing object in the range (0, 255).
 *
 * @property paintOpacity
 * @type Number
 */
Object.defineProperty(Bitmap.prototype, 'paintOpacity', {
    get: function() {
        return this._paintOpacity;
    },
    set: function(value) {
      if (this._paintOpacity !== value) {
          this._paintOpacity = value;
          this._context.globalAlpha = this._paintOpacity / 255;
      }
    },
    configurable: true
});

/**
 * Resizes the bitmap.
 *
 * @method resize
 * @param {Number} width The new width of the bitmap
 * @param {Number} height The new height of the bitmap
 */
Bitmap.prototype.resize = function(width, height) {
    width = Math.max(width || 0, 1);
    height = Math.max(height || 0, 1);
    this._canvas.width = width;
    this._canvas.height = height;
    this._baseTexture.width = width;
    this._baseTexture.height = height;
};

/**
 * Performs a block transfer.
 *
 * @method blt
 * @param {Bitmap} source The bitmap to draw
 * @param {Number} sx The x coordinate in the source
 * @param {Number} sy The y coordinate in the source
 * @param {Number} sw The width of the source image
 * @param {Number} sh The height of the source image
 * @param {Number} dx The x coordinate in the destination
 * @param {Number} dy The y coordinate in the destination
 * @param {Number} [dw=sw] The width to draw the image in the destination
 * @param {Number} [dh=sh] The height to draw the image in the destination
 */
Bitmap.prototype.blt = function(source, sx, sy, sw, sh, dx, dy, dw, dh) {
    dw = dw || sw;
    dh = dh || sh;
    if (sx >= 0 && sy >= 0 && sw > 0 && sh > 0 && dw > 0 && dh > 0 &&
            sx + sw <= source.width && sy + sh <= source.height) {
        this._context.globalCompositeOperation = 'source-over';
        this._context.drawImage(source._canvas, sx, sy, sw, sh, dx, dy, dw, dh);
        this._setDirty();
    }
};

/**
 * Returns pixel color at the specified point.
 *
 * @method getPixel
 * @param {Number} x The x coordinate of the pixel in the bitmap
 * @param {Number} y The y coordinate of the pixel in the bitmap
 * @return {String} The pixel color (hex format)
 */
Bitmap.prototype.getPixel = function(x, y) {
    var data = this._context.getImageData(x, y, 1, 1).data;
    var result = '#';
    for (var i = 0; i < 3; i++) {
        result += data[i].toString(16).padZero(2);
    }
    return result;
};

/**
 * Returns alpha pixel value at the specified point.
 *
 * @method getAlphaPixel
 * @param {Number} x The x coordinate of the pixel in the bitmap
 * @param {Number} y The y coordinate of the pixel in the bitmap
 * @return {String} The alpha value
 */
Bitmap.prototype.getAlphaPixel = function(x, y) {
    var data = this._context.getImageData(x, y, 1, 1).data;
    return data[3];
};

/**
 * Clears the specified rectangle.
 *
 * @method clearRect
 * @param {Number} x The x coordinate for the upper-left corner
 * @param {Number} y The y coordinate for the upper-left corner
 * @param {Number} width The width of the rectangle to clear
 * @param {Number} height The height of the rectangle to clear
 */
Bitmap.prototype.clearRect = function(x, y, width, height) {
    this._context.clearRect(x, y, width, height);
    this._setDirty();
};

/**
 * Clears the entire bitmap.
 *
 * @method clear
 */
Bitmap.prototype.clear = function() {
    this.clearRect(0, 0, this.width, this.height);
};

/**
 * Fills the specified rectangle.
 *
 * @method fillRect
 * @param {Number} x The x coordinate for the upper-left corner
 * @param {Number} y The y coordinate for the upper-left corner
 * @param {Number} width The width of the rectangle to clear
 * @param {Number} height The height of the rectangle to clear
 * @param {String} color The color of the rectangle in CSS format
 */
Bitmap.prototype.fillRect = function(x, y, width, height, color) {
    var context = this._context;
    context.save();
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
    context.restore();
    this._setDirty();
};

/**
 * Fills the entire bitmap.
 *
 * @method fillAll
 * @param {String} color The color of the rectangle in CSS format
 */
Bitmap.prototype.fillAll = function(color) {
    this.fillRect(0, 0, this.width, this.height, color);
};

/**
 * Draws the rectangle with a gradation.
 *
 * @method gradientFillRect
 * @param {Number} x The x coordinate for the upper-left corner
 * @param {Number} y The y coordinate for the upper-left corner
 * @param {Number} width The width of the rectangle to clear
 * @param {Number} height The height of the rectangle to clear
 * @param {String} color1 The start color of the gradation
 * @param {String} color2 The end color of the gradation
 * @param {Boolean} vertical Whether it draws a vertical gradient
 */
Bitmap.prototype.gradientFillRect = function(x, y, width, height, color1,
                                             color2, vertical) {
    var context = this._context;
    var grad;
    if (vertical) {
        grad = context.createLinearGradient(x, y, x, y + height);
    } else {
        grad = context.createLinearGradient(x, y, x + width, y);
    }
    grad.addColorStop(0, color1);
    grad.addColorStop(1, color2);
    context.save();
    context.fillStyle = grad;
    context.fillRect(x, y, width, height);
    context.restore();
    this._setDirty();
};

/**
 * Draw the filled circle.
 *
 * @method drawCircle
 * @param {Number} x The x coordinate of the center of the circle
 * @param {Number} y The y coordinate of the center of the circle
 * @param {Number} radius The radius of the circle
 * @param {String} color The color of the circle in CSS format
 */
Bitmap.prototype.drawCircle = function(x, y, radius, color) {
    var context = this._context;
    context.save();
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2, false);
    context.fill();
    context.restore();
    this._setDirty();
};

/**
 * Draws the outline text to the bitmap.
 *
 * @method drawText
 * @param {String} text The text that will be drawn
 * @param {Number} x The x coordinate for the left of the text
 * @param {Number} y The y coordinate for the top of the text
 * @param {Number} maxWidth The maximum allowed width of the text
 * @param {Number} lineHeight The height of the text line
 * @param {String} align The alignment of the text
 */
Bitmap.prototype.drawText = function(text, x, y, maxWidth, lineHeight, align) {
    // Note: Firefox has a bug with textBaseline: Bug 737852
    //       So we use 'alphabetic' here.
    if (text !== undefined) {
        var tx = x;
        var ty = y + lineHeight - (lineHeight - this.fontSize * 0.7) / 2;
        var context = this._context;
        var alpha = context.globalAlpha;
        maxWidth = maxWidth || 0xffffffff;
        if (align === 'center') {
            tx += maxWidth / 2;
        }
        if (align === 'right') {
            tx += maxWidth;
        }
        context.save();
        context.font = this._makeFontNameText();
        context.textAlign = align;
        context.textBaseline = 'alphabetic';
        context.globalAlpha = 1;
        this._drawTextOutline(text, tx, ty, maxWidth);
        context.globalAlpha = alpha;
        this._drawTextBody(text, tx, ty, maxWidth);
        context.restore();
        this._setDirty();
    }
};

/**
 * Returns the width of the specified text.
 *
 * @method measureTextWidth
 * @param {String} text The text to be measured
 * @return {Number} The width of the text in pixels
 */
Bitmap.prototype.measureTextWidth = function(text) {
    var context = this._context;
    context.save();
    context.font = this._makeFontNameText();
    var width = context.measureText(text).width;
    context.restore();
    return width;
};

/**
 * Changes the color tone of the entire bitmap.
 *
 * @method adjustTone
 * @param {Number} r The red strength in the range (-255, 255)
 * @param {Number} g The green strength in the range (-255, 255)
 * @param {Number} b The blue strength in the range (-255, 255)
 */
Bitmap.prototype.adjustTone = function(r, g, b) {
    if ((r || g || b) && this.width > 0 && this.height > 0) {
        var context = this._context;
        var imageData = context.getImageData(0, 0, this.width, this.height);
        var pixels = imageData.data;
        for (var i = 0; i < pixels.length; i += 4) {
            pixels[i + 0] += r;
            pixels[i + 1] += g;
            pixels[i + 2] += b;
        }
        context.putImageData(imageData, 0, 0);
        this._setDirty();
    }
};

/**
 * Rotates the hue of the entire bitmap.
 *
 * @method rotateHue
 * @param {Number} offset The hue offset in 360 degrees
 */
Bitmap.prototype.rotateHue = function(offset) {
    function rgbToHsl(r, g, b) {
        var cmin = Math.min(r, g, b);
        var cmax = Math.max(r, g, b);
        var h = 0;
        var s = 0;
        var l = (cmin + cmax) / 2;
        var delta = cmax - cmin;

        if (delta > 0) {
            if (r === cmax) {
                h = 60 * (((g - b) / delta + 6) % 6);
            } else if (g === cmax) {
                h = 60 * ((b - r) / delta + 2);
            } else {
                h = 60 * ((r - g) / delta + 4);
            }
            s = delta / (255 - Math.abs(2 * l - 255));
        }
        return [h, s, l];
    }

    function hslToRgb(h, s, l) {
        var c = (255 - Math.abs(2 * l - 255)) * s;
        var x = c * (1 - Math.abs((h / 60) % 2 - 1));
        var m = l - c / 2;
        var cm = c + m;
        var xm = x + m;

        if (h < 60) {
            return [cm, xm, m];
        } else if (h < 120) {
            return [xm, cm, m];
        } else if (h < 180) {
            return [m, cm, xm];
        } else if (h < 240) {
            return [m, xm, cm];
        } else if (h < 300) {
            return [xm, m, cm];
        } else {
            return [cm, m, xm];
        }
    }

    if (offset && this.width > 0 && this.height > 0) {
        offset = ((offset % 360) + 360) % 360;
        var context = this._context;
        var imageData = context.getImageData(0, 0, this.width, this.height);
        var pixels = imageData.data;
        for (var i = 0; i < pixels.length; i += 4) {
            var hsl = rgbToHsl(pixels[i + 0], pixels[i + 1], pixels[i + 2]);
            var h = (hsl[0] + offset) % 360;
            var s = hsl[1];
            var l = hsl[2];
            var rgb = hslToRgb(h, s, l);
            pixels[i + 0] = rgb[0];
            pixels[i + 1] = rgb[1];
            pixels[i + 2] = rgb[2];
        }
        context.putImageData(imageData, 0, 0);
        this._setDirty();
    }
};

/**
 * Applies a blur effect to the bitmap.
 *
 * @method blur
 */
Bitmap.prototype.blur = function() {
    for (var i = 0; i < 2; i++) {
        var w = this.width;
        var h = this.height;
        var canvas = this._canvas;
        var context = this._context;
        var tempCanvas = document.createElement('canvas');
        var tempContext = tempCanvas.getContext('2d');
        tempCanvas.width = w + 2;
        tempCanvas.height = h + 2;
        tempContext.drawImage(canvas, 0, 0, w, h, 1, 1, w, h);
        tempContext.drawImage(canvas, 0, 0, w, 1, 1, 0, w, 1);
        tempContext.drawImage(canvas, 0, 0, 1, h, 0, 1, 1, h);
        tempContext.drawImage(canvas, 0, h - 1, w, 1, 1, h + 1, w, 1);
        tempContext.drawImage(canvas, w - 1, 0, 1, h, w + 1, 1, 1, h);
        context.save();
        context.fillStyle = 'black';
        context.fillRect(0, 0, w, h);
        context.globalCompositeOperation = 'lighter';
        context.globalAlpha = 1 / 9;
        for (var y = 0; y < 3; y++) {
            for (var x = 0; x < 3; x++) {
                context.drawImage(tempCanvas, x, y, w, h, 0, 0, w, h);
            }
        }
        context.restore();
    }
    this._setDirty();
};

/**
 * Add a callback function that will be called when the bitmap is loaded.
 *
 * @method addLoadListener
 * @param {Function} listner The callback function
 */
Bitmap.prototype.addLoadListener = function(listner) {
    if (this._isLoading) {
        this._loadListeners.push(listner);
    } else {
        listner();
    }
};

/**
 * Add a callback function that will be called when the bitmap is error.
 *
 * @method addErrorListener
 * @param {Function} listner The callback function
 */
Bitmap.prototype.addErrorListener = function(listner) {
    if (this._isLoading) {
        this._errorListeners.push(listner);
    } else {
        listner();
    }
};

/**
 * @method _makeFontNameText
 * @private
 */
Bitmap.prototype._makeFontNameText = function() {
    return (this.fontItalic ? 'Italic ' : '') +
            this.fontSize + 'px ' + this.fontFace;
};

/**
 * @method _drawTextOutline
 * @param {String} text
 * @param {Number} tx
 * @param {Number} ty
 * @param {Number} maxWidth
 * @private
 */
Bitmap.prototype._drawTextOutline = function(text, tx, ty, maxWidth) {
    var context = this._context;
    context.strokeStyle = this.outlineColor;
    context.lineWidth = this.outlineWidth;
    context.lineJoin = 'round';
    context.strokeText(text, tx, ty, maxWidth);
};

/**
 * @method _drawTextBody
 * @param {String} text
 * @param {Number} tx
 * @param {Number} ty
 * @param {Number} maxWidth
 * @private
 */
Bitmap.prototype._drawTextBody = function(text, tx, ty, maxWidth) {
    var context = this._context;
    context.fillStyle = this.textColor;
    context.fillText(text, tx, ty, maxWidth);
};

/**
 * @method _onLoad
 * @private
 */
Bitmap.prototype._onLoad = function() {
    this._isLoading = false;
    this.resize(this._image.width, this._image.height);
    this._context.drawImage(this._image, 0, 0);
    this._setDirty();
    this._callLoadListeners();
};

/**
 * @method _callLoadListeners
 * @private
 */
Bitmap.prototype._callLoadListeners = function() {
    while (this._loadListeners.length > 0) {
        var listener = this._loadListeners.shift();
        listener();
    }
};

/**
 * @method _onError
 * @private
 */
Bitmap.prototype._onError = function() {
    this._hasError = true;
	this._isLoading = false;
    this._callErrorListeners();
};

/**
 * @method _callErrorListeners
 * @private
 */
Bitmap.prototype._callErrorListeners = function() {
    while (this._errorListeners.length > 0) {
        var listener = this._errorListeners.shift();
        listener();
    }
};

/**
 * @method _setDirty
 * @private
 */
Bitmap.prototype._setDirty = function() {
    this._baseTexture.dirty();
};

//-----------------------------------------------------------------------------
/**
 * The static class that carries out graphics processing.
 *
 * @class Graphics
 */
function Graphics() {
    throw new Error('This is a static class');
}

/**
 * Initializes the graphics system.
 *
 * @static
 * @method initialize
 * @param {Number} width The width of the game screen
 * @param {Number} height The height of the game screen
 * @param {String} type The type of the renderer.
 *                 'canvas', 'webgl', or 'auto'.
 */
Graphics.initialize = function(width, height, type) {
    this._width = width || 800;
    this._height = height || 600;
    this._rendererType = type || 'auto';
    this._boxWidth = this._width;
    this._boxHeight = this._height;

    this._scale = 1;
    this._realScale = 1;

    this._errorPrinter = null;
    this._canvas = null;
    this._video = null;
    this._upperCanvas = null;
    this._renderer = null;
    this._fpsMeter = null;
    this._modeBox = null;
    this._skipCount = 0;
    this._maxSkip = 3;
    this._rendered = false;
    this._loadingImage = null;
    this._loadingCount = 0;
    this._fpsMeterToggled = false;
    this._stretchEnabled = this._defaultStretchMode();

    this._canUseDifferenceBlend = false;
    this._canUseSaturationBlend = false;
    this._hiddenCanvas = null;

    this._testCanvasBlendModes();
    this._modifyExistingElements();
    this._updateRealScale();
    this._createAllElements();
    this._disableTextSelection();
    this._disableContextMenu();
    this._setupEventHandlers();
};

/**
 * The total frame count of the game screen.
 *
 * @static
 * @property frameCount
 * @type Number
 */
Graphics.frameCount     = 0;

/**
 * The alias of PIXI.blendModes.NORMAL.
 *
 * @static
 * @property BLEND_NORMAL
 * @type Number
 * @final
 */
Graphics.BLEND_NORMAL   = 0;

/**
 * The alias of PIXI.blendModes.ADD.
 *
 * @static
 * @property BLEND_ADD
 * @type Number
 * @final
 */
Graphics.BLEND_ADD      = 1;

/**
 * The alias of PIXI.blendModes.MULTIPLY.
 *
 * @static
 * @property BLEND_MULTIPLY
 * @type Number
 * @final
 */
Graphics.BLEND_MULTIPLY = 2;

/**
 * The alias of PIXI.blendModes.SCREEN.
 *
 * @static
 * @property BLEND_SCREEN
 * @type Number
 * @final
 */
Graphics.BLEND_SCREEN   = 3;

/**
 * Marks the beginning of each frame for FPSMeter.
 *
 * @static
 * @method tickStart
 */
Graphics.tickStart = function() {
    if (this._fpsMeter) {
        this._fpsMeter.tickStart();
    }
};

/**
 * Marks the end of each frame for FPSMeter.
 *
 * @static
 * @method tickEnd
 */
Graphics.tickEnd = function() {
    if (this._fpsMeter && this._rendered) {
        this._fpsMeter.tick();
    }
};

/**
 * Renders the stage to the game screen.
 *
 * @static
 * @method render
 * @param {Stage} stage The stage object to be rendered
 */
Graphics.render = function(stage) {
    if (this._skipCount === 0) {
        var startTime = Date.now();
        if (stage) {
            this._renderer.render(stage);
        }
        var endTime = Date.now();
        var elapsed = endTime - startTime;
        this._skipCount = Math.min(Math.floor(elapsed / 15), this._maxSkip);
        this._rendered = true;
    } else {
        this._skipCount--;
        this._rendered = false;
    }
    this.frameCount++;
};

/**
 * Checks whether the renderer type is WebGL.
 *
 * @static
 * @method isWebGL
 * @return {Boolean} True if the renderer type is WebGL
 */
Graphics.isWebGL = function() {
    return this._renderer && this._renderer.type === PIXI.WEBGL_RENDERER;
};

/**
 * Checks whether the current browser supports WebGL.
 *
 * @static
 * @method hasWebGL
 * @return {Boolean} True if the current browser supports WebGL.
 */
Graphics.hasWebGL = function() {
    try {
        var canvas = document.createElement('canvas');
        return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
    } catch (e) {
        return false;
    }
};

/**
 * Checks whether the canvas blend mode 'difference' is supported.
 *
 * @static
 * @method canUseDifferenceBlend
 * @return {Boolean} True if the canvas blend mode 'difference' is supported
 */
Graphics.canUseDifferenceBlend = function() {
    return this._canUseDifferenceBlend;
};

/**
 * Checks whether the canvas blend mode 'saturation' is supported.
 *
 * @static
 * @method canUseSaturationBlend
 * @return {Boolean} True if the canvas blend mode 'saturation' is supported
 */
Graphics.canUseSaturationBlend = function() {
    return this._canUseSaturationBlend;
};

/**
 * Sets the source of the "Now Loading" image.
 *
 * @static
 * @method setLoadingImage
 */
Graphics.setLoadingImage = function(src) {
    this._loadingImage = new Image();
    this._loadingImage.src = src;
};

/**
 * Initializes the counter for displaying the "Now Loading" image.
 *
 * @static
 * @method startLoading
 */
Graphics.startLoading = function() {
    this._loadingCount = 0;
};

/**
 * Increments the loading counter and displays the "Now Loading" image if necessary.
 *
 * @static
 * @method updateLoading
 */
Graphics.updateLoading = function() {
    this._loadingCount++;
    this._paintUpperCanvas();
    this._upperCanvas.style.opacity = 1;
};

/**
 * Erases the "Now Loading" image.
 *
 * @static
 * @method endLoading
 */
Graphics.endLoading = function() {
    this._clearUpperCanvas();
    this._upperCanvas.style.opacity = 0;
};

/**
 * Displays the error text to the screen.
 *
 * @static
 * @method printError
 * @param {String} name The name of the error
 * @param {String} message The message of the error
 */
Graphics.printError = function(name, message) {
    if (this._errorPrinter) {
        this._errorPrinter.innerHTML = this._makeErrorHtml(name, message);
    }
    this._applyCanvasFilter();
    this._clearUpperCanvas();
};

/**
 * Shows the FPSMeter element.
 *
 * @static
 * @method showFps
 */
Graphics.showFps = function() {
    if (this._fpsMeter) {
        this._fpsMeter.show();
        this._modeBox.style.opacity = 1;
    }
};

/**
 * Hides the FPSMeter element.
 *
 * @static
 * @method hideFps
 */
Graphics.hideFps = function() {
    if (this._fpsMeter) {
        this._fpsMeter.hide();
        this._modeBox.style.opacity = 0;
    }
};

/**
 * Loads a font file.
 *
 * @static
 * @method loadFont
 * @param {String} name The face name of the font
 * @param {String} url The url of the font file
 */
Graphics.loadFont = function(name, url) {
    var style = document.createElement('style');
    var head = document.getElementsByTagName('head');
    var rule = '@font-face { font-family: "' + name + '"; src: url("' + url + '"); }';
    style.type = 'text/css';
    head.item(0).appendChild(style);
    style.sheet.insertRule(rule, 0);
    this._createFontLoader(name);
};

/**
 * Checks whether the font file is loaded.
 *
 * @static
 * @method isFontLoaded
 * @param {String} name The face name of the font
 * @return {Boolean} True if the font file is loaded
 */
Graphics.isFontLoaded = function(name) {
    if (!this._hiddenCanvas) {
        this._hiddenCanvas = document.createElement('canvas');
    }
    var context = this._hiddenCanvas.getContext('2d');
    var text = 'abcdefghijklmnopqrstuvwxyz';
    var width1, width2;
    context.font = '40px ' + name + ', sans-serif';
    width1 = context.measureText(text).width;
    context.font = '40px sans-serif';
    width2 = context.measureText(text).width;
    return width1 !== width2;
};

/**
 * Starts playback of a video.
 *
 * @static
 * @method playVideo
 * @param {String} src
 */
Graphics.playVideo = function(src) {
    this._video.src = src;
    this._video.onloadeddata = this._onVideoLoad.bind(this);
    this._video.onerror = this._onVideoError.bind(this);
    this._video.onended = this._onVideoEnd.bind(this);
    this._video.load();
};

/**
 * Checks whether the video is playing.
 *
 * @static
 * @method isVideoPlaying
 * @return {Boolean} True if the video is playing
 */
Graphics.isVideoPlaying = function() {
    return this._video && this._isVideoVisible();
};

/**
 * Checks whether the browser can play the specified video type.
 *
 * @static
 * @method canPlayVideoType
 * @param {String} type The video type to test support for
 * @return {Boolean} True if the browser can play the specified video type
 */
Graphics.canPlayVideoType = function(type) {
    return this._video && this._video.canPlayType(type);
};

/**
 * Converts an x coordinate on the page to the corresponding
 * x coordinate on the canvas area.
 *
 * @static
 * @method pageToCanvasX
 * @param {Number} x The x coordinate on the page to be converted
 * @return {Number} The x coordinate on the canvas area
 */
Graphics.pageToCanvasX = function(x) {
    if (this._canvas) {
        var left = this._canvas.offsetLeft;
        return Math.round((x - left) / this._realScale);
    } else {
        return 0;
    }
};

/**
 * Converts a y coordinate on the page to the corresponding
 * y coordinate on the canvas area.
 *
 * @static
 * @method pageToCanvasY
 * @param {Number} y The y coordinate on the page to be converted
 * @return {Number} The y coordinate on the canvas area
 */
Graphics.pageToCanvasY = function(y) {
    if (this._canvas) {
        var top = this._canvas.offsetTop;
        return Math.round((y - top) / this._realScale);
    } else {
        return 0;
    }
};

/**
 * Checks whether the specified point is inside the game canvas area.
 *
 * @static
 * @method isInsideCanvas
 * @param {Number} x The x coordinate on the canvas area
 * @param {Number} y The y coordinate on the canvas area
 * @return {Boolean} True if the specified point is inside the game canvas area
 */
Graphics.isInsideCanvas = function(x, y) {
    return (x >= 0 && x < this._width && y >= 0 && y < this._height);
};

/**
 * The width of the game screen.
 *
 * @static
 * @property width
 * @type Number
 */
Object.defineProperty(Graphics, 'width', {
    get: function() {
        return this._width;
    },
    set: function(value) {
        if (this._width !== value) {
            this._width = value;
            this._updateAllElements();
        }
    },
    configurable: true
});

/**
 * The height of the game screen.
 *
 * @static
 * @property height
 * @type Number
 */
Object.defineProperty(Graphics, 'height', {
    get: function() {
        return this._height;
    },
    set: function(value) {
        if (this._height !== value) {
            this._height = value;
            this._updateAllElements();
        }
    },
    configurable: true
});

/**
 * The width of the window display area.
 *
 * @static
 * @property boxWidth
 * @type Number
 */
Object.defineProperty(Graphics, 'boxWidth', {
    get: function() {
        return this._boxWidth;
    },
    set: function(value) {
        this._boxWidth = value;
    },
    configurable: true
});

/**
 * The height of the window display area.
 *
 * @static
 * @property boxHeight
 * @type Number
 */
Object.defineProperty(Graphics, 'boxHeight', {
    get: function() {
        return this._boxHeight;
    },
    set: function(value) {
        this._boxHeight = value;
    },
    configurable: true
});

/**
 * The zoom scale of the game screen.
 *
 * @static
 * @property scale
 * @type Number
 */
Object.defineProperty(Graphics, 'scale', {
    get: function() {
        return this._scale;
    },
    set: function(value) {
        if (this._scale !== value) {
            this._scale = value;
            this._updateAllElements();
        }
    },
    configurable: true
});

/**
 * @static
 * @method _createAllElements
 * @private
 */
Graphics._createAllElements = function() {
    this._createErrorPrinter();
    this._createCanvas();
    this._createVideo();
    this._createUpperCanvas();
    this._createRenderer();
    this._createFPSMeter();
    this._createModeBox();
    this._createGameFontLoader();
};

/**
 * @static
 * @method _updateAllElements
 * @private
 */
Graphics._updateAllElements = function() {
    this._updateRealScale();
    this._updateErrorPrinter();
    this._updateCanvas();
    this._updateVideo();
    this._updateUpperCanvas();
    this._updateRenderer();
    this._paintUpperCanvas();
};

/**
 * @static
 * @method _updateRealScale
 * @private
 */
Graphics._updateRealScale = function() {
    if (this._stretchEnabled) {
        var h = window.innerWidth / this._width;
        var v = window.innerHeight / this._height;
        this._realScale = Math.min(h, v);
    } else {
        this._realScale = this._scale;
    }
};

/**
 * @static
 * @method _makeErrorHtml
 * @param {String} name
 * @param {String} message
 * @return {String}
 * @private
 */
Graphics._makeErrorHtml = function(name, message) {
    return ('<font color="yellow"><b>' + name + '</b></font><br>' +
            '<font color="white">' + message + '</font><br>');
};

/**
 * @static
 * @method _defaultStretchMode
 * @private
 */
Graphics._defaultStretchMode = function() {
    return Utils.isNwjs() || Utils.isMobileDevice();
};

/**
 * @static
 * @method _testCanvasBlendModes
 * @private
 */
Graphics._testCanvasBlendModes = function() {
    var canvas, context, imageData1, imageData2;
    canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    context = canvas.getContext('2d');
    context.globalCompositeOperation = 'source-over';
    context.fillStyle = 'white';
    context.fillRect(0, 0, 1, 1);
    context.globalCompositeOperation = 'difference';
    context.fillStyle = 'white';
    context.fillRect(0, 0, 1, 1);
    imageData1 = context.getImageData(0, 0, 1, 1);
    context.globalCompositeOperation = 'source-over';
    context.fillStyle = 'black';
    context.fillRect(0, 0, 1, 1);
    context.globalCompositeOperation = 'saturation';
    context.fillStyle = 'white';
    context.fillRect(0, 0, 1, 1);
    imageData2 = context.getImageData(0, 0, 1, 1);
    this._canUseDifferenceBlend = imageData1.data[0] === 0;
    this._canUseSaturationBlend = imageData2.data[0] === 0;
};

/**
 * @static
 * @method _modifyExistingElements
 * @private
 */
Graphics._modifyExistingElements = function() {
    var elements = document.getElementsByTagName('*');
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].style.zIndex > 0) {
            elements[i].style.zIndex = 0;
        }
    }
};

/**
 * @static
 * @method _createErrorPrinter
 * @private
 */
Graphics._createErrorPrinter = function() {
    this._errorPrinter = document.createElement('p');
    this._errorPrinter.id = 'ErrorPrinter';
    this._updateErrorPrinter();
    document.body.appendChild(this._errorPrinter);
};

/**
 * @static
 * @method _updateErrorPrinter
 * @private
 */
Graphics._updateErrorPrinter = function() {
    this._errorPrinter.width = this._width * 0.9;
    this._errorPrinter.height = 40;
    this._errorPrinter.style.textAlign = 'center';
    this._errorPrinter.style.textShadow = '1px 1px 3px #000';
    this._errorPrinter.style.fontSize = '20px';
    this._errorPrinter.style.zIndex = 99;
    this._centerElement(this._errorPrinter);
};

/**
 * @static
 * @method _createCanvas
 * @private
 */
Graphics._createCanvas = function() {
    this._canvas = document.createElement('canvas');
    this._canvas.id = 'GameCanvas';
    this._updateCanvas();
    document.body.appendChild(this._canvas);
};

/**
 * @static
 * @method _updateCanvas
 * @private
 */
Graphics._updateCanvas = function() {
    this._canvas.width = this._width;
    this._canvas.height = this._height;
    this._canvas.style.zIndex = 1;
    this._centerElement(this._canvas);
};

/**
 * @static
 * @method _createVideo
 * @private
 */
Graphics._createVideo = function() {
    this._video = document.createElement('video');
    this._video.id = 'GameVideo';
    this._video.style.opacity = 0;
    this._updateVideo();
    document.body.appendChild(this._video);
};

/**
 * @static
 * @method _updateVideo
 * @private
 */
Graphics._updateVideo = function() {
    this._video.width = this._width;
    this._video.height = this._height;
    this._video.style.zIndex = 2;
    this._centerElement(this._video);
};

/**
 * @static
 * @method _createUpperCanvas
 * @private
 */
Graphics._createUpperCanvas = function() {
    this._upperCanvas = document.createElement('canvas');
    this._upperCanvas.id = 'UpperCanvas';
    this._updateUpperCanvas();
    document.body.appendChild(this._upperCanvas);
};

/**
 * @static
 * @method _updateUpperCanvas
 * @private
 */
Graphics._updateUpperCanvas = function() {
    this._upperCanvas.width = this._width;
    this._upperCanvas.height = this._height;
    this._upperCanvas.style.zIndex = 3;
    this._centerElement(this._upperCanvas);
};

/**
 * @static
 * @method _clearUpperCanvas
 * @private
 */
Graphics._clearUpperCanvas = function() {
    var context = this._upperCanvas.getContext('2d');
    context.clearRect(0, 0, this._width, this._height);
};

/**
 * @static
 * @method _paintUpperCanvas
 * @private
 */
Graphics._paintUpperCanvas = function() {
    this._clearUpperCanvas();
    if (this._loadingImage && this._loadingCount >= 20) {
        var context = this._upperCanvas.getContext('2d');
        var dx = (this._width - this._loadingImage.width) / 2;
        var dy = (this._height - this._loadingImage.height) / 2;
        var alpha = ((this._loadingCount - 20) / 30).clamp(0, 1);
        context.save();
        context.globalAlpha = alpha;
        context.drawImage(this._loadingImage, dx, dy);
        context.restore();
    }
};

/**
 * @static
 * @method _createRenderer
 * @private
 */
Graphics._createRenderer = function() {
    PIXI.dontSayHello = true;
    var width = this._width;
    var height = this._height;
    var options = { view: this._canvas };
    try {
        switch (this._rendererType) {
        case 'canvas':
            this._renderer = new PIXI.CanvasRenderer(width, height, options);
            break;
        case 'webgl':
            this._renderer = new PIXI.WebGLRenderer(width, height, options);
            break;
        default:
            this._renderer = PIXI.autoDetectRenderer(width, height, options);
            break;
        }
    } catch (e) {
        this._renderer = null;
    }
};

/**
 * @static
 * @method _updateRenderer
 * @private
 */
Graphics._updateRenderer = function() {
    if (this._renderer) {
        this._renderer.resize(this._width, this._height);
    }
};

/**
 * @static
 * @method _createFPSMeter
 * @private
 */
Graphics._createFPSMeter = function() {
    var options = { graph: 1, decimals: 0, theme: 'transparent', toggleOn: null };
    this._fpsMeter = new FPSMeter(options);
    this._fpsMeter.hide();
};

/**
 * @static
 * @method _createModeBox
 * @private
 */
Graphics._createModeBox = function() {
    var box = document.createElement('div');
    box.id = 'modeTextBack';
    box.style.position = 'absolute';
    box.style.left = '5px';
    box.style.top = '5px';
    box.style.width = '119px';
    box.style.height = '58px';
    box.style.background = 'rgba(0,0,0,0.2)';
    box.style.zIndex = 9;
    box.style.opacity = 0;

    var text = document.createElement('div');
    text.id = 'modeText';
    text.style.position = 'absolute';
    text.style.left = '0px';
    text.style.top = '41px';
    text.style.width = '119px';
    text.style.fontSize = '12px';
    text.style.fontFamily = 'monospace';
    text.style.color = 'white';
    text.style.textAlign = 'center';
    text.style.textShadow = '1px 1px 0 rgba(0,0,0,0.5)';
    text.innerHTML = this.isWebGL() ? 'WebGL mode' : 'Canvas mode';

    document.body.appendChild(box);
    box.appendChild(text);

    this._modeBox = box;
};

/**
 * @static
 * @method _createGameFontLoader
 * @private
 */
Graphics._createGameFontLoader = function() {
    this._createFontLoader('GameFont');
};

/**
 * @static
 * @method _createFontLoader
 * @param {String} name
 * @private
 */
Graphics._createFontLoader = function(name) {
    var div = document.createElement('div');
    var text = document.createTextNode('.');
    div.style.fontFamily = name;
    div.style.fontSize = '0px';
    div.style.color = 'transparent';
    div.style.position = 'absolute';
    div.style.margin = 'auto';
    div.style.top = '0px';
    div.style.left = '0px';
    div.style.width = '1px';
    div.style.height = '1px';
    div.appendChild(text);
    document.body.appendChild(div);
};

/**
 * @static
 * @method _centerElement
 * @param {HTMLElement} element
 * @private
 */
Graphics._centerElement = function(element) {
    var width = element.width * this._realScale;
    var height = element.height * this._realScale;
    element.style.position = 'absolute';
    element.style.margin = 'auto';
    element.style.top = 0;
    element.style.left = 0;
    element.style.right = 0;
    element.style.bottom = 0;
    element.style.width = width + 'px';
    element.style.height = height + 'px';
};

/**
 * @static
 * @method _disableTextSelection
 * @private
 */
Graphics._disableTextSelection = function() {
    var body = document.body;
    body.style.userSelect = 'none';
    body.style.webkitUserSelect = 'none';
    body.style.msUserSelect = 'none';
    body.style.mozUserSelect = 'none';
};

/**
 * @static
 * @method _disableContextMenu
 * @private
 */
Graphics._disableContextMenu = function() {
    var elements = document.body.getElementsByTagName('*');
    var oncontextmenu = function() { return false; };
    for (var i = 0; i < elements.length; i++) {
        elements[i].oncontextmenu = oncontextmenu;
    }
};

/**
 * @static
 * @method _applyCanvasFilter
 * @private
 */
Graphics._applyCanvasFilter = function() {
    if (this._canvas) {
        this._canvas.style.opacity = 0.5;
        this._canvas.style.filter = 'blur(8px)';
        this._canvas.style.webkitFilter = 'blur(8px)';
    }
};

/**
 * @static
 * @method _onVideoLoad
 * @private
 */
Graphics._onVideoLoad = function() {
    this._video.play();
    this._updateVisibility(true);
};

/**
 * @static
 * @method _onVideoError
 * @private
 */
Graphics._onVideoError = function() {
    this._updateVisibility(false);
};

/**
 * @static
 * @method _onVideoEnd
 * @private
 */
Graphics._onVideoEnd = function() {
    this._updateVisibility(false);
};

/**
 * @static
 * @method _updateVisibility
 * @param {Boolean} videoVisible
 * @private
 */
Graphics._updateVisibility = function(videoVisible) {
    this._video.style.opacity = videoVisible ? 1 : 0;
    this._canvas.style.opacity = videoVisible ? 0 : 1;
};

/**
 * @static
 * @method _isVideoVisible
 * @return {Boolean}
 * @private
 */
Graphics._isVideoVisible = function() {
    return this._video.style.opacity > 0;
};

/**
 * @static
 * @method _setupEventHandlers
 * @private
 */
Graphics._setupEventHandlers = function() {
    window.addEventListener('resize', this._onWindowResize.bind(this));
    document.addEventListener('keydown', this._onKeyDown.bind(this));
};

/**
 * @static
 * @method _onWindowResize
 * @private
 */
Graphics._onWindowResize = function() {
    this._updateAllElements();
};

/**
 * @static
 * @method _onKeyDown
 * @param {KeyboardEvent} event
 * @private
 */
Graphics._onKeyDown = function(event) {
    if (!event.ctrlKey && !event.altKey) {
        switch (event.keyCode) {
        case 113:   // F2
            event.preventDefault();
            this._switchFPSMeter();
            break;
        case 114:   // F3
            event.preventDefault();
            this._switchStretchMode();
            break;
        case 115:   // F4
            event.preventDefault();
            this._switchFullScreen();
            break;
        }
    }
};

/**
 * @static
 * @method _switchFPSMeter
 * @private
 */
Graphics._switchFPSMeter = function() {
    if (this._fpsMeter.isPaused) {
        this.showFps();
        this._fpsMeter.showFps();
        this._fpsMeterToggled = false;
    } else if (!this._fpsMeterToggled) {
        this._fpsMeter.showDuration();
        this._fpsMeterToggled = true;
    } else {
        this.hideFps();
    }
};

/**
 * @static
 * @method _switchStretchMode
 * @return {Boolean}
 * @private
 */
Graphics._switchStretchMode = function() {
    this._stretchEnabled = !this._stretchEnabled;
    this._updateAllElements();
};

/**
 * @static
 * @method _switchFullScreen
 * @private
 */
Graphics._switchFullScreen = function() {
    if (this._isFullScreen()) {
        this._requestFullScreen();
    } else {
        this._cancelFullScreen();
    }
};

/**
 * @static
 * @method _isFullScreen
 * @return {Boolean}
 * @private
 */
Graphics._isFullScreen = function() {
    return ((document.fullScreenElement && document.fullScreenElement !== null) ||
            (!document.mozFullScreen && !document.webkitFullscreenElement &&
             !document.msFullscreenElement));
};

/**
 * @static
 * @method _requestFullScreen
 * @private
 */
Graphics._requestFullScreen = function() {
    var element = document.body;
    if (element.requestFullScreen) {
        element.requestFullScreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullScreen) {
        element.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
};

/**
 * @static
 * @method _cancelFullScreen
 * @private
 */
Graphics._cancelFullScreen = function() {
    if (document.cancelFullScreen) {
        document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
};

//-----------------------------------------------------------------------------
/**
 * The static class that handles input data from the keyboard and gamepads.
 *
 * @class Input
 */
function Input() {
    throw new Error('This is a static class');
}

/**
 * Initializes the input system.
 *
 * @static
 * @method initialize
 */
Input.initialize = function() {
    this.clear();
    this._wrapNwjsAlert();
    this._setupEventHandlers();
};

/**
 * The wait time of the key repeat in frames.
 *
 * @static
 * @property keyRepeatWait
 * @type Number
 */
Input.keyRepeatWait = 24;

/**
 * The interval of the key repeat in frames.
 *
 * @static
 * @property keyRepeatInterval
 * @type Number
 */
Input.keyRepeatInterval = 6;

/**
 * A hash table to convert from a virtual key code to a mapped key name.
 *
 * @static
 * @property keyMapper
 * @type Object
 */
Input.keyMapper = {
    9: 'tab',       // tab
    13: 'ok',       // enter
    16: 'shift',    // shift
    17: 'control',  // control
    18: 'control',  // alt
    27: 'escape',   // escape
    32: 'ok',       // space
    33: 'pageup',   // pageup
    34: 'pagedown', // pagedown
    37: 'left',     // left arrow
    38: 'up',       // up arrow
    39: 'right',    // right arrow
    40: 'down',     // down arrow
    45: 'escape',   // insert
    65: 'skip',     // A
    68: 'mimicry',  // D
    83: 'wardrobe', // S
    81: 'pageup',   // Q
    87: 'pagedown', // W
    88: 'escape',   // X
    90: 'ok',       // Z
    96: 'escape',   // numpad 0
    98: 'down',     // numpad 2
    100: 'left',    // numpad 4
    102: 'right',   // numpad 6
    104: 'up',      // numpad 8
    120: 'debug'    // F9
};

/**
 * A hash table to convert from a gamepad button to a mapped key name.
 *
 * @static
 * @property gamepadMapper
 * @type Object
 */
Input.gamepadMapper = {
    0: 'ok',        // A
    1: 'cancel',    // B
    2: 'shift',     // X
    3: 'menu',      // Y
    4: 'pageup',    // LB
    5: 'pagedown',  // RB
    6: 'useskill',    // 
    7: 'skip',  // 
    12: 'up',       // D-pad up
    13: 'down',     // D-pad down
    14: 'left',     // D-pad left
    15: 'right',    // D-pad right
};

/**
 * Clears all the input data.
 *
 * @static
 * @method clear
 */
Input.clear = function() {
    this._currentState = {};
    this._previousState = {};
    this._gamepadStates = [];
    this._latestButton = null;
    this._pressedTime = 0;
    this._dir4 = 0;
    this._dir8 = 0;
    this._preferredAxis = '';
    this._date = 0;
};

/**
 * Updates the input data.
 *
 * @static
 * @method update
 */
Input.update = function() {
    this._pollGamepads();
    if (this._currentState[this._latestButton]) {
        this._pressedTime++;
    } else {
        this._latestButton = null;
    }
    for (var name in this._currentState) {
        if (this._currentState[name] && !this._previousState[name]) {
            this._latestButton = name;
            this._pressedTime = 0;
            this._date = Date.now();
        }
        this._previousState[name] = this._currentState[name];
    }
    this._updateDirection();
};

/**
 * Checks whether a key is currently pressed down.
 *
 * @static
 * @method isPressed
 * @param {String} keyName The mapped name of the key
 * @return {Boolean} True if the key is pressed
 */
Input.isPressed = function(keyName) {
    if (this._isEscapeCompatible(keyName) && this.isPressed('escape')) {
        return true;
    } else {
        return !!this._currentState[keyName];
    }
};

/**
 * Checks whether a key is just pressed.
 *
 * @static
 * @method isTriggered
 * @param {String} keyName The mapped name of the key
 * @return {Boolean} True if the key is triggered
 */
Input.isTriggered = function(keyName) {
    if (this._isEscapeCompatible(keyName) && this.isTriggered('escape')) {
        return true;
    } else {
        return this._latestButton === keyName && this._pressedTime === 0;
    }
};

/**
 * Checks whether a key is just pressed or a key repeat occurred.
 *
 * @static
 * @method isRepeated
 * @param {String} keyName The mapped name of the key
 * @return {Boolean} True if the key is repeated
 */
Input.isRepeated = function(keyName) {
    if (this._isEscapeCompatible(keyName) && this.isRepeated('escape')) {
        return true;
    } else {
        return (this._latestButton === keyName &&
                (this._pressedTime === 0 ||
                 (this._pressedTime >= this.keyRepeatWait &&
                  this._pressedTime % this.keyRepeatInterval === 0)));
    }
};

/**
 * Checks whether a key is kept depressed.
 *
 * @static
 * @method isLongPressed
 * @param {String} keyName The mapped name of the key
 * @return {Boolean} True if the key is long-pressed
 */
Input.isLongPressed = function(keyName) {
    if (this._isEscapeCompatible(keyName) && this.isLongPressed('escape')) {
        return true;
    } else {
        return (this._latestButton === keyName &&
                this._pressedTime >= this.keyRepeatWait);
    }
};

/**
 * [read-only] The four direction value as a number of the numpad, or 0 for neutral.
 *
 * @static
 * @property dir4
 * @type Number
 */
Object.defineProperty(Input, 'dir4', {
    get: function() {
        return this._dir4;
    },
    configurable: true
});

/**
 * [read-only] The eight direction value as a number of the numpad, or 0 for neutral.
 *
 * @static
 * @property dir8
 * @type Number
 */
Object.defineProperty(Input, 'dir8', {
    get: function() {
        return this._dir8;
    },
    configurable: true
});

/**
 * [read-only] The time of the last input in milliseconds.
 *
 * @static
 * @property date
 * @type Number
 */
Object.defineProperty(Input, 'date', {
    get: function() {
        return this._date;
    },
    configurable: true
});

/**
 * @static
 * @method _wrapNwjsAlert
 * @private
 */
Input._wrapNwjsAlert = function() {
    if (Utils.isNwjs()) {
        var _alert = window.alert;
        window.alert = function() {
            var gui = require('nw.gui');
            var win = gui.Window.get();
            _alert.apply(this, arguments);
            win.focus();
            Input.clear();
        };
    }
};

/**
 * @static
 * @method _setupEventHandlers
 * @private
 */
Input._setupEventHandlers = function() {
    document.addEventListener('keydown', this._onKeyDown.bind(this));
    document.addEventListener('keyup', this._onKeyUp.bind(this));
    window.addEventListener('blur', this._onLostFocus.bind(this));
};

/**
 * @static
 * @method _onKeyDown
 * @param {KeyboardEvent} event
 * @private
 */
Input._onKeyDown = function(event) {
    if (this._shouldPreventDefault(event.keyCode)) {
        event.preventDefault();
    }
    if (event.keyCode === 144) {    // Numlock
        this.clear();
    }
    var buttonName = this.keyMapper[event.keyCode];
    if (buttonName) {
        this._currentState[buttonName] = true;
    }
};

/**
 * @static
 * @method _shouldPreventDefault
 * @param {Number} keyCode
 * @private
 */
Input._shouldPreventDefault = function(keyCode) {
    switch (keyCode) {
    case 8:     // backspace
    case 33:    // pageup
    case 34:    // pagedown
    case 37:    // left arrow
    case 38:    // up arrow
    case 39:    // right arrow
    case 40:    // down arrow
        return true;
    }
    return false;
};

/**
 * @static
 * @method _onKeyUp
 * @param {KeyboardEvent} event
 * @private
 */
Input._onKeyUp = function(event) {
    var buttonName = this.keyMapper[event.keyCode];
    if (buttonName) {
        this._currentState[buttonName] = false;
    }
    if (event.keyCode === 0) {  // For QtWebEngine on OS X
        this.clear();
    }
};

/**
 * @static
 * @method _onLostFocus
 * @private
 */
Input._onLostFocus = function() {
    this.clear();
};

/**
 * @static
 * @method _pollGamepads
 * @private
 */
Input._pollGamepads = function() {
    if (navigator.getGamepads) {
        var gamepads = navigator.getGamepads();
        if (gamepads) {
            for (var i = 0; i < gamepads.length; i++) {
                var gamepad = gamepads[i];
                if (gamepad && gamepad.connected) {
                    this._updateGamepadState(gamepad);
                }
            }
        }
    }
};

/**
 * @static
 * @method _updateGamepadState
 * @param {Gamepad} gamepad
 * @param {Number} index
 * @private
 */
Input._updateGamepadState = function(gamepad) {
    var lastState = this._gamepadStates[gamepad.index] || [];
    var newState = [];
    var buttons = gamepad.buttons;
    var axes = gamepad.axes;
    var threshold = 0.5;
    for (var i = 0; i < buttons.length; i++) {
        newState[i] = buttons[i].pressed;
    }
    if (axes[1] < -threshold) {
        newState[12] = true;    // up
    } else if (axes[1] > threshold) {
        newState[13] = true;    // down
    }
    if (axes[0] < -threshold) {
        newState[14] = true;    // left
    } else if (axes[0] > threshold) {
        newState[15] = true;    // right
    }
    for (var j = 0; j < newState.length; j++) {
        if (newState[j] !== lastState[j]) {
            var buttonName = this.gamepadMapper[j];
            if (buttonName) {
                this._currentState[buttonName] = newState[j];
            }
        }
    }
    this._gamepadStates[gamepad.index] = newState;
};

/**
 * @static
 * @method _updateDirection
 * @private
 */
Input._updateDirection = function() {
    var x = this._signX();
    var y = this._signY();

    this._dir8 = this._makeNumpadDirection(x, y);

    if (x !== 0 && y !== 0) {
        if (this._preferredAxis === 'x') {
            y = 0;
        } else {
            x = 0;
        }
    } else if (x !== 0) {
        this._preferredAxis = 'y';
    } else if (y !== 0) {
        this._preferredAxis = 'x';
    }

    this._dir4 = this._makeNumpadDirection(x, y);
};

/**
 * @static
 * @method _signX
 * @private
 */
Input._signX = function() {
    var x = 0;

    if (this.isPressed('left')) {
        x--;
    }
    if (this.isPressed('right')) {
        x++;
    }
    return x;
};

/**
 * @static
 * @method _signY
 * @private
 */
Input._signY = function() {
    var y = 0;

    if (this.isPressed('up')) {
        y--;
    }
    if (this.isPressed('down')) {
        y++;
    }
    return y;
};

/**
 * @static
 * @method _makeNumpadDirection
 * @param {Number} x
 * @param {Number} y
 * @return {Number}
 * @private
 */
Input._makeNumpadDirection = function(x, y) {
    if (x !== 0 || y !== 0) {
        return  5 - y * 3 + x;
    }
    return 0;
};

/**
 * @static
 * @method _isEscapeCompatible
 * @param {String} keyName
 * @return {Boolean}
 * @private
 */
Input._isEscapeCompatible = function(keyName) {
    return keyName === 'cancel' || keyName === 'menu';
};

//-----------------------------------------------------------------------------
/**
 * The static class that handles input data from the mouse and touchscreen.
 *
 * @class TouchInput
 */
function TouchInput() {
    throw new Error('This is a static class');
}

/**
 * Initializes the touch system.
 *
 * @static
 * @method initialize
 */
TouchInput.initialize = function() {
    this.clear();
    this._setupEventHandlers();
};

/**
 * The wait time of the pseudo key repeat in frames.
 *
 * @static
 * @property keyRepeatWait
 * @type Number
 */
TouchInput.keyRepeatWait = 24;

/**
 * The interval of the pseudo key repeat in frames.
 *
 * @static
 * @property keyRepeatInterval
 * @type Number
 */
TouchInput.keyRepeatInterval = 6;

/**
 * Clears all the touch data.
 *
 * @static
 * @method clear
 */
TouchInput.clear = function() {
    this._mousePressed = false;
    this._screenPressed = false;
    this._pressedTime = 0;
    this._events = {};
    this._events.triggered = false;
    this._events.cancelled = false;
    this._events.moved = false;
    this._events.released = false;
    this._events.wheelX = 0;
    this._events.wheelY = 0;
    this._triggered = false;
    this._cancelled = false;
    this._moved = false;
    this._released = false;
    this._wheelX = 0;
    this._wheelY = 0;
    this._x = 0;
    this._y = 0;
    this._date = 0;
};

/**
 * Updates the touch data.
 *
 * @static
 * @method update
 */
TouchInput.update = function() {
    this._triggered = this._events.triggered;
    this._cancelled = this._events.cancelled;
    this._moved = this._events.moved;
    this._released = this._events.released;
    this._wheelX = this._events.wheelX;
    this._wheelY = this._events.wheelY;
    this._events.triggered = false;
    this._events.cancelled = false;
    this._events.moved = false;
    this._events.released = false;
    this._events.wheelX = 0;
    this._events.wheelY = 0;
    if (this.isPressed()) {
        this._pressedTime++;
    }
};

/**
 * Checks whether the mouse button or touchscreen is currently pressed down.
 *
 * @static
 * @method isPressed
 * @return {Boolean} True if the mouse button or touchscreen is pressed
 */
TouchInput.isPressed = function() {
    return this._mousePressed || this._screenPressed;
};

/**
 * Checks whether the left mouse button or touchscreen is just pressed.
 *
 * @static
 * @method isTriggered
 * @return {Boolean} True if the mouse button or touchscreen is triggered
 */
TouchInput.isTriggered = function() {
    return this._triggered;
};

/**
 * Checks whether the left mouse button or touchscreen is just pressed
 * or a pseudo key repeat occurred.
 *
 * @static
 * @method isRepeated
 * @return {Boolean} True if the mouse button or touchscreen is repeated
 */
TouchInput.isRepeated = function() {
    return (this.isPressed() &&
            (this._triggered ||
             (this._pressedTime >= this.keyRepeatWait &&
              this._pressedTime % this.keyRepeatInterval === 0)));
};

/**
 * Checks whether the left mouse button or touchscreen is kept depressed.
 *
 * @static
 * @method isLongPressed
 * @return {Boolean} True if the left mouse button or touchscreen is long-pressed
 */
TouchInput.isLongPressed = function() {
    return this.isPressed() && this._pressedTime >= this.keyRepeatWait;
};

/**
 * Checks whether the right mouse button is just pressed.
 *
 * @static
 * @method isCancelled
 * @return {Boolean} True if the right mouse button is just pressed
 */
TouchInput.isCancelled = function() {
    return this._cancelled;
};

/**
 * Checks whether the mouse or a finger on the touchscreen is moved.
 *
 * @static
 * @method isMoved
 * @return {Boolean} True if the mouse or a finger on the touchscreen is moved
 */
TouchInput.isMoved = function() {
    return this._moved;
};

/**
 * Checks whether the left mouse button or touchscreen is released.
 *
 * @static
 * @method isReleased
 * @return {Boolean} True if the mouse button or touchscreen is released
 */
TouchInput.isReleased = function() {
    return this._released;
};

/**
 * [read-only] The horizontal scroll amount.
 *
 * @static
 * @property wheelX
 * @type Number
 */
Object.defineProperty(TouchInput, 'wheelX', {
    get: function() {
        return this._wheelX;
    },
    configurable: true
});

/**
 * [read-only] The vertical scroll amount.
 *
 * @static
 * @property wheelY
 * @type Number
 */
Object.defineProperty(TouchInput, 'wheelY', {
    get: function() {
        return this._wheelY;
    },
    configurable: true
});

/**
 * [read-only] The x coordinate on the canvas area of the latest touch event.
 *
 * @static
 * @property x
 * @type Number
 */
Object.defineProperty(TouchInput, 'x', {
    get: function() {
        return this._x;
    },
    configurable: true
});

/**
 * [read-only] The y coordinate on the canvas area of the latest touch event.
 *
 * @static
 * @property y
 * @type Number
 */
Object.defineProperty(TouchInput, 'y', {
    get: function() {
        return this._y;
    },
    configurable: true
});

/**
 * [read-only] The time of the last input in milliseconds.
 *
 * @static
 * @property date
 * @type Number
 */
Object.defineProperty(TouchInput, 'date', {
    get: function() {
        return this._date;
    },
    configurable: true
});

/**
 * @static
 * @method _setupEventHandlers
 * @private
 */
TouchInput._setupEventHandlers = function() {
    var isSupportPassive = Utils.isSupportPassiveEvent();
    document.addEventListener('mousedown', this._onMouseDown.bind(this));
    document.addEventListener('mousemove', this._onMouseMove.bind(this));
    document.addEventListener('mouseup', this._onMouseUp.bind(this));
    document.addEventListener('wheel', this._onWheel.bind(this));
    document.addEventListener('touchstart', this._onTouchStart.bind(this), isSupportPassive ? {passive: false} : false);
    document.addEventListener('touchmove', this._onTouchMove.bind(this), isSupportPassive ? {passive: false} : false);
    document.addEventListener('touchend', this._onTouchEnd.bind(this));
    document.addEventListener('touchcancel', this._onTouchCancel.bind(this));
    document.addEventListener('pointerdown', this._onPointerDown.bind(this));
};

/**
 * @static
 * @method _onMouseDown
 * @param {MouseEvent} event
 * @private
 */
TouchInput._onMouseDown = function(event) {
    if (event.button === 0) {
        this._onLeftButtonDown(event);
    } else if (event.button === 1) {
        this._onMiddleButtonDown(event);
    } else if (event.button === 2) {
        this._onRightButtonDown(event);
    }
};

/**
 * @static
 * @method _onLeftButtonDown
 * @param {MouseEvent} event
 * @private
 */
TouchInput._onLeftButtonDown = function(event) {
    var x = Graphics.pageToCanvasX(event.pageX);
    var y = Graphics.pageToCanvasY(event.pageY);
    if (Graphics.isInsideCanvas(x, y)) {
        this._mousePressed = true;
        this._pressedTime = 0;
        this._onTrigger(x, y);
    }
};

/**
 * @static
 * @method _onMiddleButtonDown
 * @param {MouseEvent} event
 * @private
 */
TouchInput._onMiddleButtonDown = function(event) {
};

/**
 * @static
 * @method _onRightButtonDown
 * @param {MouseEvent} event
 * @private
 */
TouchInput._onRightButtonDown = function(event) {
    var x = Graphics.pageToCanvasX(event.pageX);
    var y = Graphics.pageToCanvasY(event.pageY);
    if (Graphics.isInsideCanvas(x, y)) {
        this._onCancel(x, y);
    }
};

/**
 * @static
 * @method _onMouseMove
 * @param {MouseEvent} event
 * @private
 */
TouchInput._onMouseMove = function(event) {
    if (this._mousePressed) {
        var x = Graphics.pageToCanvasX(event.pageX);
        var y = Graphics.pageToCanvasY(event.pageY);
        this._onMove(x, y);
    }
};

/**
 * @static
 * @method _onMouseUp
 * @param {MouseEvent} event
 * @private
 */
TouchInput._onMouseUp = function(event) {
    if (event.button === 0) {
        var x = Graphics.pageToCanvasX(event.pageX);
        var y = Graphics.pageToCanvasY(event.pageY);
        this._mousePressed = false;
        this._onRelease(x, y);
    }
};

/**
 * @static
 * @method _onWheel
 * @param {WheelEvent} event
 * @private
 */
TouchInput._onWheel = function(event) {
    this._events.wheelX += event.deltaX;
    this._events.wheelY += event.deltaY;
    event.preventDefault();
};

/**
 * @static
 * @method _onTouchStart
 * @param {TouchEvent} event
 * @private
 */
TouchInput._onTouchStart = function(event) {
    for (var i = 0; i < event.changedTouches.length; i++) {
        var touch = event.changedTouches[i];
        var x = Graphics.pageToCanvasX(touch.pageX);
        var y = Graphics.pageToCanvasY(touch.pageY);
        if (Graphics.isInsideCanvas(x, y)) {
            this._screenPressed = true;
            this._pressedTime = 0;
            if (event.touches.length >= 2) {
                this._onCancel(x, y);
            } else {
                this._onTrigger(x, y);
            }
            event.preventDefault();
        }
    }
    if (window.cordova || window.navigator.standalone) {
        event.preventDefault();
    }
};

/**
 * @static
 * @method _onTouchMove
 * @param {TouchEvent} event
 * @private
 */
TouchInput._onTouchMove = function(event) {
    for (var i = 0; i < event.changedTouches.length; i++) {
        var touch = event.changedTouches[i];
        var x = Graphics.pageToCanvasX(touch.pageX);
        var y = Graphics.pageToCanvasY(touch.pageY);
        this._onMove(x, y);
    }
};

/**
 * @static
 * @method _onTouchEnd
 * @param {TouchEvent} event
 * @private
 */
TouchInput._onTouchEnd = function(event) {
    for (var i = 0; i < event.changedTouches.length; i++) {
        var touch = event.changedTouches[i];
        var x = Graphics.pageToCanvasX(touch.pageX);
        var y = Graphics.pageToCanvasY(touch.pageY);
        this._screenPressed = false;
        this._onRelease(x, y);
    }
};

/**
 * @static
 * @method _onTouchCancel
 * @param {TouchEvent} event
 * @private
 */
TouchInput._onTouchCancel = function(event) {
    this._screenPressed = false;
};

/**
 * @static
 * @method _onPointerDown
 * @param {PointerEvent} event
 * @private
 */
TouchInput._onPointerDown = function(event) {
    if (event.pointerType === 'touch' && !event.isPrimary) {
        var x = Graphics.pageToCanvasX(event.pageX);
        var y = Graphics.pageToCanvasY(event.pageY);
        if (Graphics.isInsideCanvas(x, y)) {
            // For Microsoft Edge
            this._onCancel(x, y);
            event.preventDefault();
        }
    }
};

/**
 * @static
 * @method _onTrigger
 * @param {Number} x
 * @param {Number} y
 * @private
 */
TouchInput._onTrigger = function(x, y) {
    this._events.triggered = true;
    this._x = x;
    this._y = y;
    this._date = Date.now();
};

/**
 * @static
 * @method _onCancel
 * @param {Number} x
 * @param {Number} y
 * @private
 */
TouchInput._onCancel = function(x, y) {
    this._events.cancelled = true;
    this._x = x;
    this._y = y;
};

/**
 * @static
 * @method _onMove
 * @param {Number} x
 * @param {Number} y
 * @private
 */
TouchInput._onMove = function(x, y) {
    this._events.moved = true;
    this._x = x;
    this._y = y;
};

/**
 * @static
 * @method _onRelease
 * @param {Number} x
 * @param {Number} y
 * @private
 */
TouchInput._onRelease = function(x, y) {
    this._events.released = true;
    this._x = x;
    this._y = y;
};

//-----------------------------------------------------------------------------
/**
 * The basic object that is rendered to the game screen.
 *
 * @class Sprite
 * @constructor
 * @param {Bitmap} bitmap The image for the sprite
 */
function Sprite() {
    this.initialize.apply(this, arguments);
}

Sprite.prototype = Object.create(PIXI.Sprite.prototype);
Sprite.prototype.constructor = Sprite;

Sprite.prototype.initialize = function(bitmap) {
    var texture = new PIXI.Texture(new PIXI.BaseTexture());

    PIXI.Sprite.call(this, texture);

    this._bitmap = null;
    this._frame = new Rectangle();
    this._realFrame = new Rectangle();
    this._offset = new Point();
    this._blendColor = [0, 0, 0, 0];
    this._colorTone = [0, 0, 0, 0];
    this._canvas = null;
    this._context = null;
    this._tintTexture = null;

    this.spriteId = Sprite._counter++;
    this.opaque = false;

    this.bitmap = bitmap;
};

// Number of the created objects.
Sprite._counter = 0;

/**
 * The image for the sprite.
 *
 * @property bitmap
 * @type Bitmap
 */
Object.defineProperty(Sprite.prototype, 'bitmap', {
    get: function() {
        return this._bitmap;
    },
    set: function(value) {
        if (this._bitmap !== value) {
            this._bitmap = value;
            if (this._bitmap) {
                this.setFrame(0, 0, 0, 0);
                this._bitmap.addLoadListener(this._onBitmapLoad.bind(this));
            } else {
                this.texture.setFrame(Rectangle.emptyRectangle);
            }
        }
    },
    configurable: true
});

/**
 * The width of the sprite without the scale.
 *
 * @property width
 * @type Number
 */
Object.defineProperty(Sprite.prototype, 'width', {
    get: function() {
        return this._frame.width;
    },
    set: function(value) {
        this._frame.width = value;
        this._refresh();
    },
    configurable: true
});

/**
 * The height of the sprite without the scale.
 *
 * @property height
 * @type Number
 */
Object.defineProperty(Sprite.prototype, 'height', {
    get: function() {
        return this._frame.height;
    },
    set: function(value) {
        this._frame.height = value;
        this._refresh();
    },
    configurable: true
});

/**
 * The opacity of the sprite (0 to 255).
 *
 * @property opacity
 * @type Number
 */
Object.defineProperty(Sprite.prototype, 'opacity', {
    get: function() {
        return this.alpha * 255;
    },
    set: function(value) {
        this.alpha = value.clamp(0, 255) / 255;
    },
    configurable: true
});

/**
 * Updates the sprite for each frame.
 *
 * @method update
 */
Sprite.prototype.update = function() {
    this.children.forEach(function(child) {
        if (child.update) {
            child.update();
        }
    });
};

/**
 * Sets the x and y at once.
 *
 * @method move
 * @param {Number} x The x coordinate of the sprite
 * @param {Number} y The y coordinate of the sprite
 */
Sprite.prototype.move = function(x, y) {
    this.x = x;
    this.y = y;
};

/**
 * Sets the rectagle of the bitmap that the sprite displays.
 *
 * @method setFrame
 * @param {Number} x The x coordinate of the frame
 * @param {Number} y The y coordinate of the frame
 * @param {Number} width The width of the frame
 * @param {Number} height The height of the frame
 */
Sprite.prototype.setFrame = function(x, y, width, height) {
    var frame = this._frame;
    if (x !== frame.x || y !== frame.y ||
            width !== frame.width || height !== frame.height) {
        frame.x = x;
        frame.y = y;
        frame.width = width;
        frame.height = height;
        this._refresh();
    }
};

/**
 * Gets the blend color for the sprite.
 *
 * @method getBlendColor
 * @return {Array} The blend color [r, g, b, a]
 */
Sprite.prototype.getBlendColor = function() {
    return this._blendColor.clone();
};

/**
 * Sets the blend color for the sprite.
 *
 * @method setBlendColor
 * @param {Array} color The blend color [r, g, b, a]
 */
Sprite.prototype.setBlendColor = function(color) {
    if (!(color instanceof Array)) {
        throw new Error('Argument must be an array');
    }
    if (!this._blendColor.equals(color)) {
        this._blendColor = color.clone();
        this._refresh();
    }
};

/**
 * Gets the color tone for the sprite.
 *
 * @method getColorTone
 * @return {Array} The color tone [r, g, b, gray]
 */
Sprite.prototype.getColorTone = function() {
    return this._colorTone.clone();
};

/**
 * Sets the color tone for the sprite.
 *
 * @method setColorTone
 * @param {Array} tone The color tone [r, g, b, gray]
 */
Sprite.prototype.setColorTone = function(tone) {
    if (!(tone instanceof Array)) {
        throw new Error('Argument must be an array');
    }
    if (!this._colorTone.equals(tone)) {
        this._colorTone = tone.clone();
        this._refresh();
    }
};

/**
 * @method _onBitmapLoad
 * @private
 */
Sprite.prototype._onBitmapLoad = function() {
    if (this._frame.width === 0 && this._frame.height === 0) {
		if (this._bitmap) {
			this._frame.width = this._bitmap.width;
			this._frame.height = this._bitmap.height;
		}
    }
    this._refresh();
};

/**
 * @method _refresh
 * @private
 */
Sprite.prototype._refresh = function() {
    var frameX = Math.floor(this._frame.x);
    var frameY = Math.floor(this._frame.y);
    var frameW = Math.floor(this._frame.width);
    var frameH = Math.floor(this._frame.height);
    var bitmapW = this._bitmap ? this._bitmap.width : 0;
    var bitmapH = this._bitmap ? this._bitmap.height : 0;
    var realX = frameX.clamp(0, bitmapW);
    var realY = frameY.clamp(0, bitmapH);
    var realW = (frameW - realX + frameX).clamp(0, bitmapW - realX);
    var realH = (frameH - realY + frameY).clamp(0, bitmapH - realY);

    this._realFrame.x = realX;
    this._realFrame.y = realY;
    this._realFrame.width = realW;
    this._realFrame.height = realH;
    this._offset.x = realX - frameX;
    this._offset.y = realY - frameY;

    if (realW > 0 && realH > 0) {
        if (this._needsTint()) {
            this._createTinter(realW, realH);
            this._executeTint(realX, realY, realW, realH);
            this._tintTexture.dirty();
            this.texture.baseTexture = this._tintTexture;
            this.texture.setFrame(new Rectangle(0, 0, realW, realH));
        } else {
            if (this._bitmap) {
                this.texture.baseTexture = this._bitmap.baseTexture;
            }
            this.texture.setFrame(this._realFrame);
        }
    } else if (this._bitmap) {
        this.texture.setFrame(Rectangle.emptyRectangle);
    } else {
        this.texture.trim = this._frame;
        this.texture.setFrame(this._frame);
        this.texture.trim = null;
    }
};

/**
 * @method _isInBitmapRect
 * @param {Number} x
 * @param {Number} y
 * @param {Number} w
 * @param {Number} h
 * @return {Boolean}
 * @private
 */
Sprite.prototype._isInBitmapRect = function(x, y, w, h) {
    return (this._bitmap && x + w > 0 && y + h > 0 &&
            x < this._bitmap.width && y < this._bitmap.height);
};

/**
 * @method _needsTint
 * @return {Boolean}
 * @private
 */
Sprite.prototype._needsTint = function() {
    var tone = this._colorTone;
    return tone[0] || tone[1] || tone[2] || tone[3] || this._blendColor[3] > 0;
};

/**
 * @method _createTinter
 * @param {Number} w
 * @param {Number} h
 * @private
 */
Sprite.prototype._createTinter = function(w, h) {
    if (!this._canvas) {
        this._canvas = document.createElement('canvas');
        this._context = this._canvas.getContext('2d');
    }

    this._canvas.width = w;
    this._canvas.height = h;

    if (!this._tintTexture) {
        this._tintTexture = new PIXI.BaseTexture(this._canvas);
    }

    this._tintTexture.width = w;
    this._tintTexture.height = h;
    this._tintTexture.scaleMode = this._bitmap.baseTexture.scaleMode;
};

/**
 * @method _executeTint
 * @param {Number} x
 * @param {Number} y
 * @param {Number} w
 * @param {Number} h
 * @private
 */
Sprite.prototype._executeTint = function(x, y, w, h) {
    var context = this._context;
    var tone = this._colorTone;
    var color = this._blendColor;

    context.globalCompositeOperation = 'copy';
    context.drawImage(this._bitmap.canvas, x, y, w, h, 0, 0, w, h);

    if (Graphics.canUseSaturationBlend()) {
        var gray = Math.max(0, tone[3]);
        context.globalCompositeOperation = 'saturation';
        context.fillStyle = 'rgba(255,255,255,' + gray / 255 + ')';
        context.fillRect(0, 0, w, h);
    }

    var r1 = Math.max(0, tone[0]);
    var g1 = Math.max(0, tone[1]);
    var b1 = Math.max(0, tone[2]);
    context.globalCompositeOperation = 'lighter';
    context.fillStyle = Utils.rgbToCssColor(r1, g1, b1);
    context.fillRect(0, 0, w, h);

    if (Graphics.canUseDifferenceBlend()) {
        context.globalCompositeOperation = 'difference';
        context.fillStyle = 'white';
        context.fillRect(0, 0, w, h);

        var r2 = Math.max(0, -tone[0]);
        var g2 = Math.max(0, -tone[1]);
        var b2 = Math.max(0, -tone[2]);
        context.globalCompositeOperation = 'lighter';
        context.fillStyle = Utils.rgbToCssColor(r2, g2, b2);
        context.fillRect(0, 0, w, h);

        context.globalCompositeOperation = 'difference';
        context.fillStyle = 'white';
        context.fillRect(0, 0, w, h);
    }

    var r3 = Math.max(0, color[0]);
    var g3 = Math.max(0, color[1]);
    var b3 = Math.max(0, color[2]);
    var a3 = Math.max(0, color[3]);
    context.globalCompositeOperation = 'source-atop';
    context.fillStyle = Utils.rgbToCssColor(r3, g3, b3);
    context.globalAlpha = a3 / 255;
    context.fillRect(0, 0, w, h);

    context.globalCompositeOperation = 'destination-in';
    context.globalAlpha = 1;
    context.drawImage(this._bitmap.canvas, x, y, w, h, 0, 0, w, h);
};

/**
 * @method updateTransform
 * @private
 */
Sprite.prototype.updateTransform = function() {
    PIXI.Sprite.prototype.updateTransform.call(this);
    this.worldTransform.tx += this._offset.x;
    this.worldTransform.ty += this._offset.y;
};

/**
 * @method _renderCanvas
 * @param {Object} renderSession
 * @private
 */
Sprite.prototype._renderCanvas = function(renderSession) {
    if (this.visible && this.alpha > 0) {
        if (this.texture.crop.width <= 0 || this.texture.crop.height <= 0) {
            if (this._mask) {
                renderSession.maskManager.pushMask(this._mask, renderSession);
            }
            for (var i = 0, j = this.children.length; i < j; i++) {
                this.children[i]._renderCanvas(renderSession);
            }
            if (this._mask) {
                renderSession.maskManager.popMask(renderSession);
            }
        } else {
            PIXI.Sprite.prototype._renderCanvas.call(this, renderSession);
        }
    }
};

/**
 * @method _renderWebGL
 * @param {Object} renderSession
 * @private
 */
Sprite.prototype._renderWebGL = function(renderSession) {
    if (this.visible && this.alpha > 0) {
        var spriteBatch =  renderSession.spriteBatch;
        if (this._filters) {
            spriteBatch.flush();
            renderSession.filterManager.pushFilter(this._filterBlock);
            if (this.opaque) {
                // Required for a bug in Firefox on Windows
                renderSession.gl.clearColor(0, 0, 0, 1);
                renderSession.gl.clear(renderSession.gl.COLOR_BUFFER_BIT);
            }
        }
        if (this._mask) {
            spriteBatch.stop();
            renderSession.maskManager.pushMask(this.mask, renderSession);
            spriteBatch.start();
        }
        spriteBatch.render(this);
        for (var i = 0, j = this.children.length; i < j; i++) {
            this.children[i]._renderWebGL(renderSession);
        }
        if (this._mask) {
            spriteBatch.stop();
            renderSession.maskManager.popMask(this._mask, renderSession);
            spriteBatch.start();
        }
        if (this._filters) {
            spriteBatch.stop();
            renderSession.filterManager.popFilter();
            spriteBatch.start();
        }
    }
};

// The important members from Pixi.js

/**
 * The visibility of the sprite.
 *
 * @property visible
 * @type Boolean
 */

/**
 * The x coordinate of the sprite.
 *
 * @property x
 * @type Number
 */

/**
 * The y coordinate of the sprite.
 *
 * @property y
 * @type Number
 */

/**
 * The origin point of the sprite. (0,0) to (1,1).
 *
 * @property anchor
 * @type Point
 */

/**
 * The scale factor of the sprite.
 *
 * @property scale
 * @type Point
 */

/**
 * The rotation of the sprite in radians.
 *
 * @property rotation
 * @type Number
 */

/**
 * The blend mode to be applied to the sprite.
 *
 * @property blendMode
 * @type Number
 */

/**
 * Sets the filters for the sprite.
 *
 * @property filters
 * @type Array
 */

/**
 * [read-only] The array of children of the sprite.
 *
 * @property children
 * @type Array
 */

/**
 * [read-only] The object that contains the sprite.
 *
 * @property parent
 * @type Object
 */

/**
 * Adds a child to the container.
 *
 * @method addChild
 * @param {Object} child The child to add
 * @return {Object} The child that was added
 */

/**
 * Adds a child to the container at a specified index.
 *
 * @method addChildAt
 * @param {Object} child The child to add
 * @param {Number} index The index to place the child in
 * @return {Object} The child that was added
 */

/**
 * Removes a child from the container.
 *
 * @method removeChild
 * @param {Object} child The child to remove
 * @return {Object} The child that was removed
 */

/**
 * Removes a child from the specified index position.
 *
 * @method removeChildAt
 * @param {Number} index The index to get the child from
 * @return {Object} The child that was removed
 */

//-----------------------------------------------------------------------------
/**
 * The tilemap which displays 2D tile-based game map.
 *
 * @class Tilemap
 * @constructor
 */
function Tilemap() {
    this.initialize.apply(this, arguments);
}

Tilemap.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
Tilemap.prototype.constructor = Tilemap;

Tilemap.prototype.initialize = function() {
    PIXI.DisplayObjectContainer.call(this);

    this._margin = 20;
    this._width = Graphics.width + this._margin * 2;
    this._height = Graphics.height + this._margin * 2;
    this._tileWidth = 48;
    this._tileHeight = 48;
    this._mapWidth = 0;
    this._mapHeight = 0;
    this._mapData = null;
    this._layerWidth = 0;
    this._layerHeight = 0;
    this._lastTiles = [];

    /**
     * The bitmaps used as a tileset.
     *
     * @property bitmaps
     * @type Array
     */
    this.bitmaps = [];

    /**
     * The origin point of the tilemap for scrolling.
     *
     * @property origin
     * @type Point
     */
    this.origin = new Point();

    /**
     * The tileset flags.
     *
     * @property flags
     * @type Array
     */
    this.flags = [];

    /**
     * The animation count for autotiles.
     *
     * @property animationCount
     * @type Number
     */
    this.animationCount = 0;

    /**
     * Whether the tilemap loops horizontal.
     *
     * @property horizontalWrap
     * @type Boolean
     */
    this.horizontalWrap = false;

    /**
     * Whether the tilemap loops vertical.
     *
     * @property verticalWrap
     * @type Boolean
     */
    this.verticalWrap = false;

    this._createLayers();
    this.refresh();
};

/**
 * The width of the screen in pixels.
 *
 * @property width
 * @type Number
 */
Object.defineProperty(Tilemap.prototype, 'width', {
    get: function() {
        return this._width;
    },
    set: function(value) {
        if (this._width !== value) {
            this._width = value;
            this._createLayers();
        }
    }
});

/**
 * The height of the screen in pixels.
 *
 * @property height
 * @type Number
 */
Object.defineProperty(Tilemap.prototype, 'height', {
    get: function() {
        return this._height;
    },
    set: function(value) {
        if (this._height !== value) {
            this._height = value;
            this._createLayers();
        }
    }
});

/**
 * The width of a tile in pixels.
 *
 * @property tileWidth
 * @type Number
 */
Object.defineProperty(Tilemap.prototype, 'tileWidth', {
    get: function() {
        return this._tileWidth;
    },
    set: function(value) {
        if (this._tileWidth !== value) {
            this._tileWidth = value;
            this._createLayers();
        }
    }
});

/**
 * The height of a tile in pixels.
 *
 * @property tileHeight
 * @type Number
 */
Object.defineProperty(Tilemap.prototype, 'tileHeight', {
    get: function() {
        return this._tileHeight;
    },
    set: function(value) {
        if (this._tileHeight !== value) {
            this._tileHeight = value;
            this._createLayers();
        }
    }
});

/**
 * Sets the tilemap data.
 *
 * @method setData
 * @param {Number} width The width of the map in number of tiles
 * @param {Number} height The height of the map in number of tiles
 * @param {Array} data The one dimensional array for the map data
 */
Tilemap.prototype.setData = function(width, height, data) {
    this._mapWidth = width;
    this._mapHeight = height;
    this._mapData = data;
};

/**
 * Checks whether the tileset is ready to render.
 *
 * @method isReady
 * @type Boolean
 * @return {Boolean} True if the tilemap is ready
 */
Tilemap.prototype.isReady = function() {
    for (var i = 0; i < this.bitmaps.length; i++) {
        if (this.bitmaps[i] && !this.bitmaps[i].isReady()) {
            return false;
        }
    }
    return true;
};

/**
 * Updates the tilemap for each frame.
 *
 * @method update
 */
Tilemap.prototype.update = function() {
    this.animationCount++;
    this.children.forEach(function(child) {
        if (child.update) {
            child.update();
        }
    });
};

/**
 * Forces to repaint the entire tilemap.
 *
 * @method refresh
 */
Tilemap.prototype.refresh = function() {
    this._lastTiles.length = 0;
};

/**
 * @method updateTransform
 * @private
 */
Tilemap.prototype.updateTransform = function() {
    var ox = Math.floor(this.origin.x);
    var oy = Math.floor(this.origin.y);
    var startX = Math.floor((ox - this._margin) / this._tileWidth);
    var startY = Math.floor((oy - this._margin) / this._tileHeight);
    this._updateLayerPositions(startX, startY);
    this._paintAllTiles(startX, startY);
    this._sortChildren();
    PIXI.DisplayObjectContainer.prototype.updateTransform.call(this);
};

/**
 * @method _createLayers
 * @private
 */
Tilemap.prototype._createLayers = function() {
    var width = this._width;
    var height = this._height;
    var margin = this._margin;
    var tileCols = Math.ceil(width / this._tileWidth) + 1;
    var tileRows = Math.ceil(height / this._tileHeight) + 1;
    var layerWidth = tileCols * this._tileWidth;
    var layerHeight = tileRows * this._tileHeight;
    this._lowerBitmap = new Bitmap(layerWidth, layerHeight);
    this._upperBitmap = new Bitmap(layerWidth, layerHeight);
    this._layerWidth = layerWidth;
    this._layerHeight = layerHeight;

    /*
     * Z coordinate:
     *
     * 0 : Lower tiles
     * 1 : Lower characters
     * 3 : Normal characters
     * 4 : Upper tiles
     * 5 : Upper characters
     * 6 : Airship shadow
     * 7 : Balloon
     * 8 : Animation
     * 9 : Destination
     */

    this._lowerLayer = new Sprite();
    this._lowerLayer.move(-margin, -margin, width, height);
    this._lowerLayer.z = 0;

    this._upperLayer = new Sprite();
    this._upperLayer.move(-margin, -margin, width, height);
    this._upperLayer.z = 4;

    for (var i = 0; i < 4; i++) {
        this._lowerLayer.addChild(new Sprite(this._lowerBitmap));
        this._upperLayer.addChild(new Sprite(this._upperBitmap));
    }

    this.addChild(this._lowerLayer);
    this.addChild(this._upperLayer);
};

/**
 * @method _updateLayerPositions
 * @param {Number} startX
 * @param {Number} startY
 * @private
 */
Tilemap.prototype._updateLayerPositions = function(startX, startY) {
    var m = this._margin;
    var ox = Math.floor(this.origin.x);
    var oy = Math.floor(this.origin.y);
    var x2 = (ox - m).mod(this._layerWidth);
    var y2 = (oy - m).mod(this._layerHeight);
    var w1 = this._layerWidth - x2;
    var h1 = this._layerHeight - y2;
    var w2 = this._width - w1;
    var h2 = this._height - h1;

    for (var i = 0; i < 2; i++) {
        var children;
        if (i === 0) {
            children = this._lowerLayer.children;
        } else {
            children = this._upperLayer.children;
        }
        children[0].move(0, 0, w1, h1);
        children[0].setFrame(x2, y2, w1, h1);
        children[1].move(w1, 0, w2, h1);
        children[1].setFrame(0, y2, w2, h1);
        children[2].move(0, h1, w1, h2);
        children[2].setFrame(x2, 0, w1, h2);
        children[3].move(w1, h1, w2, h2);
        children[3].setFrame(0, 0, w2, h2);
    }
};

/**
 * @method _paintAllTiles
 * @param {Number} startX
 * @param {Number} startY
 * @private
 */
Tilemap.prototype._paintAllTiles = function(startX, startY) {
    var tileCols = Math.ceil(this._width / this._tileWidth) + 1;
    var tileRows = Math.ceil(this._height / this._tileHeight) + 1;
    for (var y = 0; y < tileRows; y++) {
        for (var x = 0; x < tileCols; x++) {
            this._paintTiles(startX, startY, x, y);
        }
    }
};

/**
 * @method _paintTiles
 * @param {Number} startX
 * @param {Number} startY
 * @param {Number} x
 * @param {Number} y
 * @private
 */
Tilemap.prototype._paintTiles = function(startX, startY, x, y) {
    var tableEdgeVirtualId = 10000;
    var mx = startX + x;
    var my = startY + y;
    var dx = (mx * this._tileWidth).mod(this._layerWidth);
    var dy = (my * this._tileHeight).mod(this._layerHeight);
    var lx = dx / this._tileWidth;
    var ly = dy / this._tileHeight;
    var tileId0 = this._readMapData(mx, my, 0);
    var tileId1 = this._readMapData(mx, my, 1);
    var tileId2 = this._readMapData(mx, my, 2);
    var tileId3 = this._readMapData(mx, my, 3);
    var shadowBits = this._readMapData(mx, my, 4);
    var upperTileId1 = this._readMapData(mx, my - 1, 1);
    var lowerTiles = [];
    var upperTiles = [];

    if (this._isHigherTile(tileId0)) {
        upperTiles.push(tileId0);
    } else {
        lowerTiles.push(tileId0);
    }
    if (this._isHigherTile(tileId1)) {
        upperTiles.push(tileId1);
    } else {
        lowerTiles.push(tileId1);
    }

    lowerTiles.push(-shadowBits);

    if (this._isTableTile(upperTileId1) && !this._isTableTile(tileId1)) {
        if (!Tilemap.isShadowingTile(tileId0)) {
            lowerTiles.push(tableEdgeVirtualId + upperTileId1);
        }
    }

    if (this._isOverpassPosition(mx, my)) {
        upperTiles.push(tileId2);
        upperTiles.push(tileId3);
    } else {
        if (this._isHigherTile(tileId2)) {
            upperTiles.push(tileId2);
        } else {
            lowerTiles.push(tileId2);
        }
        if (this._isHigherTile(tileId3)) {
            upperTiles.push(tileId3);
        } else {
            lowerTiles.push(tileId3);
        }
    }

    var count = 1000 + this.animationCount - my;
    var frameUpdated = (count % 30 === 0);
    this._animationFrame = Math.floor(count / 30);

    var lastLowerTiles = this._readLastTiles(0, lx, ly);
    if (!lowerTiles.equals(lastLowerTiles) ||
            (Tilemap.isTileA1(tileId0) && frameUpdated)) {
        this._lowerBitmap.clearRect(dx, dy, this._tileWidth, this._tileHeight);
        for (var i = 0; i < lowerTiles.length; i++) {
            var lowerTileId = lowerTiles[i];
            if (lowerTileId < 0) {
                this._drawShadow(this._lowerBitmap, shadowBits, dx, dy);
            } else if (lowerTileId >= tableEdgeVirtualId) {
                this._drawTableEdge(this._lowerBitmap, upperTileId1, dx, dy);
            } else {
                this._drawTile(this._lowerBitmap, lowerTileId, dx, dy);
            }
        }
        this._writeLastTiles(0, lx, ly, lowerTiles);
    }

    var lastUpperTiles = this._readLastTiles(1, lx, ly);
    if (!upperTiles.equals(lastUpperTiles)) {
        this._upperBitmap.clearRect(dx, dy, this._tileWidth, this._tileHeight);
        for (var j = 0; j < upperTiles.length; j++) {
            this._drawTile(this._upperBitmap, upperTiles[j], dx, dy);
        }
        this._writeLastTiles(1, lx, ly, upperTiles);
    }
};

/**
 * @method _readLastTiles
 * @param {Number} i
 * @param {Number} x
 * @param {Number} y
 * @private
 */
Tilemap.prototype._readLastTiles = function(i, x, y) {
    var array1 = this._lastTiles[i];
    if (array1) {
        var array2 = array1[y];
        if (array2) {
            var tiles = array2[x];
            if (tiles) {
                return tiles;
            }
        }
    }
    return [];
};

/**
 * @method _writeLastTiles
 * @param {Number} i
 * @param {Number} x
 * @param {Number} y
 * @param {Array} tiles
 * @private
 */
Tilemap.prototype._writeLastTiles = function(i, x, y, tiles) {
    var array1 = this._lastTiles[i];
    if (!array1) {
        array1 = this._lastTiles[i] = [];
    }
    var array2 = array1[y];
    if (!array2) {
        array2 = array1[y] = [];
    }
    array2[x] = tiles;
};

/**
 * @method _drawTile
 * @param {Bitmap} bitmap
 * @param {Number} tileId
 * @param {Number} dx
 * @param {Number} dy
 * @private
 */
Tilemap.prototype._drawTile = function(bitmap, tileId, dx, dy) {
    if (Tilemap.isVisibleTile(tileId)) {
        if (Tilemap.isAutotile(tileId)) {
            this._drawAutotile(bitmap, tileId, dx, dy);
        } else {
            this._drawNormalTile(bitmap, tileId, dx, dy);
        }
    }
};

/**
 * @method _drawNormalTile
 * @param {Bitmap} bitmap
 * @param {Number} tileId
 * @param {Number} dx
 * @param {Number} dy
 * @private
 */
Tilemap.prototype._drawNormalTile = function(bitmap, tileId, dx, dy) {
    var setNumber = 0;

    if (Tilemap.isTileA5(tileId)) {
        setNumber = 4;
    } else {
        setNumber = 5 + Math.floor(tileId / 256);
    }

    var w = this._tileWidth;
    var h = this._tileHeight;
    var sx = (Math.floor(tileId / 128) % 2 * 8 + tileId % 8) * w;
    var sy = (Math.floor(tileId % 256 / 8) % 16) * h;

    var source = this.bitmaps[setNumber];
    if (source) {
        bitmap.blt(source, sx, sy, w, h, dx, dy, w, h);
    }
};

/**
 * @method _drawAutotile
 * @param {Bitmap} bitmap
 * @param {Number} tileId
 * @param {Number} dx
 * @param {Number} dy
 * @private
 */
Tilemap.prototype._drawAutotile = function(bitmap, tileId, dx, dy) {
    var autotileTable = Tilemap.FLOOR_AUTOTILE_TABLE;
    var kind = Tilemap.getAutotileKind(tileId);
    var shape = Tilemap.getAutotileShape(tileId);
    var tx = kind % 8;
    var ty = Math.floor(kind / 8);
    var bx = 0;
    var by = 0;
    var setNumber = 0;
    var isTable = false;

    if (Tilemap.isTileA1(tileId)) {
        var waterSurfaceIndex = [0, 1, 2, 1][this._animationFrame % 4];
        setNumber = 0;
        if (kind === 0) {
            bx = waterSurfaceIndex * 2;
            by = 0;
        } else if (kind === 1) {
            bx = waterSurfaceIndex * 2;
            by = 3;
        } else if (kind === 2) {
            bx = 6;
            by = 0;
        } else if (kind === 3) {
            bx = 6;
            by = 3;
        } else {
            bx = Math.floor(tx / 4) * 8;
            by = ty * 6 + Math.floor(tx / 2) % 2 * 3;
            if (kind % 2 === 0) {
                bx += waterSurfaceIndex * 2;
            }
            else {
                bx += 6;
                autotileTable = Tilemap.WATERFALL_AUTOTILE_TABLE;
                by += this._animationFrame % 3;
            }
        }
    } else if (Tilemap.isTileA2(tileId)) {
        setNumber = 1;
        bx = tx * 2;
        by = (ty - 2) * 3;
        isTable = this._isTableTile(tileId);
    } else if (Tilemap.isTileA3(tileId)) {
        setNumber = 2;
        bx = tx * 2;
        by = (ty - 6) * 2;
        autotileTable = Tilemap.WALL_AUTOTILE_TABLE;
    } else if (Tilemap.isTileA4(tileId)) {
        setNumber = 3;
        bx = tx * 2;
        by = Math.floor((ty - 10) * 2.5 + (ty % 2 === 1 ? 0.5 : 0));
        if (ty % 2 === 1) {
            autotileTable = Tilemap.WALL_AUTOTILE_TABLE;
        }
    }

    var table = autotileTable[shape];
    var source = this.bitmaps[setNumber];

    if (table && source) {
        var w1 = this._tileWidth / 2;
        var h1 = this._tileHeight / 2;
        for (var i = 0; i < 4; i++) {
            var qsx = table[i][0];
            var qsy = table[i][1];
            var sx1 = (bx * 2 + qsx) * w1;
            var sy1 = (by * 2 + qsy) * h1;
            var dx1 = dx + (i % 2) * w1;
            var dy1 = dy + Math.floor(i / 2) * h1;
            if (isTable && (qsy === 1 || qsy === 5)) {
                var qsx2 = qsx;
                var qsy2 = 3;
                if (qsy === 1) {
                    qsx2 = [0,3,2,1][qsx];
                }
                var sx2 = (bx * 2 + qsx2) * w1;
                var sy2 = (by * 2 + qsy2) * h1;
                bitmap.blt(source, sx2, sy2, w1, h1, dx1, dy1, w1, h1);
                dy1 += h1/2;
                bitmap.blt(source, sx1, sy1, w1, h1/2, dx1, dy1, w1, h1/2);
            } else {
                bitmap.blt(source, sx1, sy1, w1, h1, dx1, dy1, w1, h1);
            }
        }
    }
};

/**
 * @method _drawTableEdge
 * @param {Bitmap} bitmap
 * @param {Number} tileId
 * @param {Number} dx
 * @param {Number} dy
 * @private
 */
Tilemap.prototype._drawTableEdge = function(bitmap, tileId, dx, dy) {
    if (Tilemap.isTileA2(tileId)) {
        var autotileTable = Tilemap.FLOOR_AUTOTILE_TABLE;
        var kind = Tilemap.getAutotileKind(tileId);
        var shape = Tilemap.getAutotileShape(tileId);
        var tx = kind % 8;
        var ty = Math.floor(kind / 8);
        var setNumber = 1;
        var bx = tx * 2;
        var by = (ty - 2) * 3;
        var table = autotileTable[shape];

        if (table) {
            var source = this.bitmaps[setNumber];
            var w1 = this._tileWidth / 2;
            var h1 = this._tileHeight / 2;
            for (var i = 0; i < 2; i++) {
                var qsx = table[2 + i][0];
                var qsy = table[2 + i][1];
                var sx1 = (bx * 2 + qsx) * w1;
                var sy1 = (by * 2 + qsy) * h1 + h1/2;
                var dx1 = dx + (i % 2) * w1;
                var dy1 = dy + Math.floor(i / 2) * h1;
                bitmap.blt(source, sx1, sy1, w1, h1/2, dx1, dy1, w1, h1/2);
            }
        }
    }
};

/**
 * @method _drawShadow
 * @param {Bitmap} bitmap
 * @param {Number} shadowBits
 * @param {Number} dx
 * @param {Number} dy
 * @private
 */
Tilemap.prototype._drawShadow = function(bitmap, shadowBits, dx, dy) {
    if (shadowBits & 0x0f) {
        var w1 = this._tileWidth / 2;
        var h1 = this._tileHeight / 2;
        var color = 'rgba(0,0,0,0.5)';
        for (var i = 0; i < 4; i++) {
            if (shadowBits & (1 << i)) {
                var dx1 = dx + (i % 2) * w1;
                var dy1 = dy + Math.floor(i / 2) * h1;
                bitmap.fillRect(dx1, dy1, w1, h1, color);
            }
        }
    }
};

/**
 * @method _readMapData
 * @param {Number} x
 * @param {Number} y
 * @param {Number} z
 * @return {Number}
 * @private
 */
Tilemap.prototype._readMapData = function(x, y, z) {
    if (this._mapData) {
        var width = this._mapWidth;
        var height = this._mapHeight;
        if (this.horizontalWrap) {
            x = x.mod(width);
        }
        if (this.verticalWrap) {
            y = y.mod(height);
        }
        if (x >= 0 && x < width && y >= 0 && y < height) {
            return this._mapData[(z * height + y) * width + x] || 0;
        } else {
            return 0;
        }
    } else {
        return 0;
    }
};

/**
 * @method _isHigherTile
 * @param {Number} tileId
 * @return {Boolean}
 * @private
 */
Tilemap.prototype._isHigherTile = function(tileId) {
    return this.flags[tileId] & 0x10;
};

/**
 * @method _isTableTile
 * @param {Number} tileId
 * @return {Boolean}
 * @private
 */
Tilemap.prototype._isTableTile = function(tileId) {
    return Tilemap.isTileA2(tileId) && (this.flags[tileId] & 0x80);
};

/**
 * @method _isOverpassPosition
 * @param {Number} mx
 * @param {Number} my
 * @return {Boolean}
 * @private
 */
Tilemap.prototype._isOverpassPosition = function(mx, my) {
    return false;
};

/**
 * @method _sortChildren
 * @private
 */
Tilemap.prototype._sortChildren = function() {
    this.children.sort(this._compareChildOrder.bind(this));
};

/**
 * @method _compareChildOrder
 * @param {Object} a
 * @param {Object} b
 * @private
 */
Tilemap.prototype._compareChildOrder = function(a, b) {
    if (a.z !== b.z) {
        return a.z - b.z;
    } else if (a.y !== b.y) {
        return a.y - b.y;
    } else {
        return a.spriteId - b.spriteId;
    }
};

// Tile type checkers

Tilemap.TILE_ID_B      = 0;
Tilemap.TILE_ID_C      = 256;
Tilemap.TILE_ID_D      = 512;
Tilemap.TILE_ID_E      = 768;
Tilemap.TILE_ID_A5     = 1536;
Tilemap.TILE_ID_A1     = 2048;
Tilemap.TILE_ID_A2     = 2816;
Tilemap.TILE_ID_A3     = 4352;
Tilemap.TILE_ID_A4     = 5888;
Tilemap.TILE_ID_MAX    = 8192;

Tilemap.isVisibleTile = function(tileId) {
    return tileId > 0 && tileId < this.TILE_ID_MAX;
};

Tilemap.isAutotile = function(tileId) {
    return tileId >= this.TILE_ID_A1;
};

Tilemap.getAutotileKind = function(tileId) {
    return Math.floor((tileId - this.TILE_ID_A1) / 48);
};

Tilemap.getAutotileShape = function(tileId) {
    return (tileId - this.TILE_ID_A1) % 48;
};

Tilemap.makeAutotileId = function(kind, shape) {
    return this.TILE_ID_A1 + kind * 48 + shape;
};

Tilemap.isSameKindTile = function(tileID1, tileID2) {
    if (this.isAutotile(tileID1) && this.isAutotile(tileID2)) {
        return this.getAutotileKind(tileID1) === this.getAutotileKind(tileID2);
    } else {
        return tileID1 === tileID2;
    }
};

Tilemap.isTileA1 = function(tileId) {
    return tileId >= this.TILE_ID_A1 && tileId < this.TILE_ID_A2;
};

Tilemap.isTileA2 = function(tileId) {
    return tileId >= this.TILE_ID_A2 && tileId < this.TILE_ID_A3;
};

Tilemap.isTileA3 = function(tileId) {
    return tileId >= this.TILE_ID_A3 && tileId < this.TILE_ID_A4;
};

Tilemap.isTileA4 = function(tileId) {
    return tileId >= this.TILE_ID_A4 && tileId < this.TILE_ID_MAX;
};

Tilemap.isTileA5 = function(tileId) {
    return tileId >= this.TILE_ID_A5 && tileId < this.TILE_ID_A1;
};

Tilemap.isWaterTile = function(tileId) {
    if (this.isTileA1(tileId)) {
        return !(tileId >= this.TILE_ID_A1 + 96 && tileId < this.TILE_ID_A1 + 192);
    } else {
        return false;
    }
};

Tilemap.isWaterfallTile = function(tileId) {
    if (tileId >= this.TILE_ID_A1 + 192 && tileId < this.TILE_ID_A2) {
        return this.getAutotileKind(tileId) % 2 === 1;
    } else {
        return false;
    }
};

Tilemap.isGroundTile = function(tileId) {
    return this.isTileA1(tileId) || this.isTileA2(tileId) || this.isTileA5(tileId);
};

Tilemap.isShadowingTile = function(tileId) {
    return this.isTileA3(tileId) || this.isTileA4(tileId);
};

Tilemap.isRoofTile = function(tileId) {
    return this.isTileA3(tileId) && this.getAutotileKind(tileId) % 16 < 8;
};

Tilemap.isWallTopTile = function(tileId) {
    return this.isTileA4(tileId) && this.getAutotileKind(tileId) % 16 < 8;
};

Tilemap.isWallSideTile = function(tileId) {
    return (this.isTileA3(tileId) || this.isTileA4(tileId)) &&
            getAutotileKind(tileId) % 16 >= 8;
};

Tilemap.isWallTile = function(tileId) {
    return this.isWallTopTile(tileId) || this.isWallSideTile(tileId);
};

Tilemap.isFloorTypeAutotile = function(tileId) {
    return (this.isTileA1(tileId) && !this.isWaterfallTile(tileId)) ||
            this.isTileA2(tileId) || this.isWallTopTile(tileId);
};

Tilemap.isWallTypeAutotile = function(tileId) {
    return this.isRoofTile(tileId) || this.isWallSideTile(tileId);
};

Tilemap.isWaterfallTypeAutotile = function(tileId) {
    return this.isWaterfallTile(tileId);
};

// Autotile shape number to coordinates of tileset images

Tilemap.FLOOR_AUTOTILE_TABLE = [
    [[2,4],[1,4],[2,3],[1,3]],[[2,0],[1,4],[2,3],[1,3]],
    [[2,4],[3,0],[2,3],[1,3]],[[2,0],[3,0],[2,3],[1,3]],
    [[2,4],[1,4],[2,3],[3,1]],[[2,0],[1,4],[2,3],[3,1]],
    [[2,4],[3,0],[2,3],[3,1]],[[2,0],[3,0],[2,3],[3,1]],
    [[2,4],[1,4],[2,1],[1,3]],[[2,0],[1,4],[2,1],[1,3]],
    [[2,4],[3,0],[2,1],[1,3]],[[2,0],[3,0],[2,1],[1,3]],
    [[2,4],[1,4],[2,1],[3,1]],[[2,0],[1,4],[2,1],[3,1]],
    [[2,4],[3,0],[2,1],[3,1]],[[2,0],[3,0],[2,1],[3,1]],
    [[0,4],[1,4],[0,3],[1,3]],[[0,4],[3,0],[0,3],[1,3]],
    [[0,4],[1,4],[0,3],[3,1]],[[0,4],[3,0],[0,3],[3,1]],
    [[2,2],[1,2],[2,3],[1,3]],[[2,2],[1,2],[2,3],[3,1]],
    [[2,2],[1,2],[2,1],[1,3]],[[2,2],[1,2],[2,1],[3,1]],
    [[2,4],[3,4],[2,3],[3,3]],[[2,4],[3,4],[2,1],[3,3]],
    [[2,0],[3,4],[2,3],[3,3]],[[2,0],[3,4],[2,1],[3,3]],
    [[2,4],[1,4],[2,5],[1,5]],[[2,0],[1,4],[2,5],[1,5]],
    [[2,4],[3,0],[2,5],[1,5]],[[2,0],[3,0],[2,5],[1,5]],
    [[0,4],[3,4],[0,3],[3,3]],[[2,2],[1,2],[2,5],[1,5]],
    [[0,2],[1,2],[0,3],[1,3]],[[0,2],[1,2],[0,3],[3,1]],
    [[2,2],[3,2],[2,3],[3,3]],[[2,2],[3,2],[2,1],[3,3]],
    [[2,4],[3,4],[2,5],[3,5]],[[2,0],[3,4],[2,5],[3,5]],
    [[0,4],[1,4],[0,5],[1,5]],[[0,4],[3,0],[0,5],[1,5]],
    [[0,2],[3,2],[0,3],[3,3]],[[0,2],[1,2],[0,5],[1,5]],
    [[0,4],[3,4],[0,5],[3,5]],[[2,2],[3,2],[2,5],[3,5]],
    [[0,2],[3,2],[0,5],[3,5]],[[0,0],[1,0],[0,1],[1,1]]
];

Tilemap.WALL_AUTOTILE_TABLE = [
    [[2,2],[1,2],[2,1],[1,1]],[[0,2],[1,2],[0,1],[1,1]],
    [[2,0],[1,0],[2,1],[1,1]],[[0,0],[1,0],[0,1],[1,1]],
    [[2,2],[3,2],[2,1],[3,1]],[[0,2],[3,2],[0,1],[3,1]],
    [[2,0],[3,0],[2,1],[3,1]],[[0,0],[3,0],[0,1],[3,1]],
    [[2,2],[1,2],[2,3],[1,3]],[[0,2],[1,2],[0,3],[1,3]],
    [[2,0],[1,0],[2,3],[1,3]],[[0,0],[1,0],[0,3],[1,3]],
    [[2,2],[3,2],[2,3],[3,3]],[[0,2],[3,2],[0,3],[3,3]],
    [[2,0],[3,0],[2,3],[3,3]],[[0,0],[3,0],[0,3],[3,3]]
];

Tilemap.WATERFALL_AUTOTILE_TABLE = [
    [[2,0],[1,0],[2,1],[1,1]],[[0,0],[1,0],[0,1],[1,1]],
    [[2,0],[3,0],[2,1],[3,1]],[[0,0],[3,0],[0,1],[3,1]]
];

// The important members from Pixi.js

/**
 * [read-only] The array of children of the tilemap.
 *
 * @property children
 * @type Array
 */

/**
 * [read-only] The object that contains the tilemap.
 *
 * @property parent
 * @type Object
 */

/**
 * Adds a child to the container.
 *
 * @method addChild
 * @param {Object} child The child to add
 * @return {Object} The child that was added
 */

/**
 * Adds a child to the container at a specified index.
 *
 * @method addChildAt
 * @param {Object} child The child to add
 * @param {Number} index The index to place the child in
 * @return {Object} The child that was added
 */

/**
 * Removes a child from the container.
 *
 * @method removeChild
 * @param {Object} child The child to remove
 * @return {Object} The child that was removed
 */

/**
 * Removes a child from the specified index position.
 *
 * @method removeChildAt
 * @param {Number} index The index to get the child from
 * @return {Object} The child that was removed
 */

//-----------------------------------------------------------------------------
/**
 * The sprite object for a tiling image.
 *
 * @class TilingSprite
 * @constructor
 * @param {Bitmap} bitmap The image for the tiling sprite
 */
function TilingSprite() {
    this.initialize.apply(this, arguments);
}

TilingSprite.prototype = Object.create(PIXI.TilingSprite.prototype);
TilingSprite.prototype.constructor = TilingSprite;

TilingSprite.prototype.initialize = function(bitmap) {
    var texture = new PIXI.Texture(new PIXI.BaseTexture());

    PIXI.TilingSprite.call(this, texture);

    this._bitmap = null;
    this._width = 0;
    this._height = 0;
    this._frame = new Rectangle();

    /**
     * The origin point of the tiling sprite for scrolling.
     *
     * @property origin
     * @type Point
     */
    this.origin = new Point();

    this.bitmap = bitmap;
};

/**
 * The image for the tiling sprite.
 *
 * @property bitmap
 * @type Bitmap
 */
Object.defineProperty(TilingSprite.prototype, 'bitmap', {
    get: function() {
        return this._bitmap;
    },
    set: function(value) {
        if (this._bitmap !== value) {
            this._bitmap = value;
            if (this._bitmap) {
                this._bitmap.addLoadListener(this._onBitmapLoad.bind(this));
            } else {
                this.texture.setFrame(Rectangle.emptyRectangle);
            }
        }
    },
    configurable: true
});

/**
 * The opacity of the tiling sprite (0 to 255).
 *
 * @property opacity
 * @type Number
 */
Object.defineProperty(TilingSprite.prototype, 'opacity', {
    get: function() {
        return this.alpha * 255;
    },
    set: function(value) {
        this.alpha = value.clamp(0, 255) / 255;
    },
    configurable: true
});

/**
 * Updates the tiling sprite for each frame.
 *
 * @method update
 */
TilingSprite.prototype.update = function() {
    this.children.forEach(function(child) {
        if (child.update) {
            child.update();
        }
    });
};

/**
 * Sets the x, y, width, and height all at once.
 *
 * @method move
 * @param {Number} x The x coordinate of the tiling sprite
 * @param {Number} y The y coordinate of the tiling sprite
 * @param {Number} width The width of the tiling sprite
 * @param {Number} height The height of the tiling sprite
 */
TilingSprite.prototype.move = function(x, y, width, height) {
    this.x = x || 0;
    this.y = y || 0;
    this._width = width || 0;
    this._height = height || 0;
};

/**
 * Specifies the region of the image that the tiling sprite will use.
 *
 * @method setFrame
 * @param {Number} x The x coordinate of the frame
 * @param {Number} y The y coordinate of the frame
 * @param {Number} width The width of the frame
 * @param {Number} height The height of the frame
 */
TilingSprite.prototype.setFrame = function(x, y, width, height) {
    this._frame.x = x;
    this._frame.y = y;
    this._frame.width = width;
    this._frame.height = height;
    this._refresh();
};

/**
 * @method updateTransform
 * @private
 */
TilingSprite.prototype.updateTransform = function() {
    this.tilePosition.x = Math.round(-this.origin.x);
    this.tilePosition.y = Math.round(-this.origin.y);
    if (!this.tilingTexture) {
        this.originalTexture = null;
        this.generateTilingTexture(true);
    }
    PIXI.TilingSprite.prototype.updateTransform.call(this);
};

/**
 * @method _onBitmapLoad
 * @private
 */
TilingSprite.prototype._onBitmapLoad = function() {
    this.texture.baseTexture = this._bitmap.baseTexture;
    this._refresh();
};

/**
 * @method _refresh
 * @private
 */
TilingSprite.prototype._refresh = function() {
    var frame = this._frame.clone();
    if (frame.width === 0 && frame.height === 0 && this._bitmap) {
        frame.width = this._bitmap.width;
        frame.height = this._bitmap.height;
    }
    var lastTrim = this.texture.trim;
    this.texture.trim = frame;
    this.texture.setFrame(frame);
    this.texture.trim = lastTrim;
    this.tilingTexture = null;
};

// The important members from Pixi.js

/**
 * The visibility of the tiling sprite.
 *
 * @property visible
 * @type Boolean
 */

/**
 * The x coordinate of the tiling sprite.
 *
 * @property x
 * @type Number
 */

/**
 * The y coordinate of the tiling sprite.
 *
 * @property y
 * @type Number
 */

//-----------------------------------------------------------------------------
/**
 * The sprite which covers the entire game screen.
 *
 * @class ScreenSprite
 * @constructor
 */
function ScreenSprite() {
    this.initialize.apply(this, arguments);
}

ScreenSprite.prototype = Object.create(PIXI.Sprite.prototype);
ScreenSprite.prototype.constructor = ScreenSprite;

ScreenSprite.prototype.initialize = function() {
    var texture = new PIXI.Texture(new PIXI.BaseTexture());

    PIXI.Sprite.call(this, texture);

    this._bitmap = new Bitmap(1, 1);
    this.texture.baseTexture = this._bitmap.baseTexture;
    this.texture.setFrame(new Rectangle(0, 0, 1, 1));
    this.scale.x = Graphics.width;
    this.scale.y = Graphics.height;
    this.opacity = 0;

    this._red = -1;
    this._green = -1;
    this._blue = -1;
    this._colorText = '';
    this.setBlack();
};

/**
 * The opacity of the sprite (0 to 255).
 *
 * @property opacity
 * @type Number
 */
Object.defineProperty(ScreenSprite.prototype, 'opacity', {
    get: function() {
        return this.alpha * 255;
    },
    set: function(value) {
        this.alpha = value.clamp(0, 255) / 255;
    },
    configurable: true
});

/**
 * Sets black to the color of the screen sprite.
 *
 * @method setBlack
 */
ScreenSprite.prototype.setBlack = function() {
    this.setColor(0, 0, 0);
};

/**
 * Sets white to the color of the screen sprite.
 *
 * @method setWhite
 */
ScreenSprite.prototype.setWhite = function() {
    this.setColor(255, 255, 255);
};

/**
 * Sets the color of the screen sprite by values.
 *
 * @method setColor
 * @param {Number} r The red value in the range (0, 255)
 * @param {Number} g The green value in the range (0, 255)
 * @param {Number} b The blue value in the range (0, 255)
 */
ScreenSprite.prototype.setColor = function(r, g, b) {
    if (this._red !== r || this._green !== g || this._blue !== b) {
        r = Math.round(r || 0).clamp(0, 255);
        g = Math.round(g || 0).clamp(0, 255);
        b = Math.round(b || 0).clamp(0, 255);
        this._red = r;
        this._green = g;
        this._blue = b;
        this._colorText = Utils.rgbToCssColor(r, g, b);
        this._bitmap.fillAll(this._colorText);
    }
};

/**
 * @method _renderCanvas
 * @param {Object} renderSession
 * @private
 */
ScreenSprite.prototype._renderCanvas = function(renderSession) {
    if (this.visible && this.alpha > 0) {
        var context = renderSession.context;
        var t = this.worldTransform;
        var r = renderSession.resolution;
        context.setTransform(t.a, t.b, t.c, t.d, t.tx * r, t.ty * r);
        context.globalCompositeOperation = PIXI.blendModesCanvas[this.blendMode];
        context.globalAlpha = this.alpha;
        context.fillStyle = this._colorText;
        context.fillRect(0, 0, Graphics.width, Graphics.height);
    }
};

//-----------------------------------------------------------------------------
/**
 * The window in the game.
 *
 * @class Window
 * @constructor
 */
function Window() {
    this.initialize.apply(this, arguments);
}

Window.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
Window.prototype.constructor = Window;

Window.prototype.initialize = function() {
    PIXI.DisplayObjectContainer.call(this);

    this._isWindow = true;
    this._windowskin = null;
    this._width = 0;
    this._height = 0;
    this._cursorRect = new Rectangle();
    this._openness = 255;
    this._animationCount = 0;

    this._padding = 18;
    this._margin = 4;
    this._colorTone = [0, 0, 0];

    this._windowSpriteContainer = null;
    this._windowBackSprite = null;
    this._windowCursorSprite = null;
    this._windowFrameSprite = null;
    this._windowContentsSprite = null;
    this._windowArrowSprites = [];
    this._windowPauseSignSprite = null;

    this._createAllParts();

    /**
     * The origin point of the window for scrolling.
     *
     * @property origin
     * @type Point
     */
    this.origin = new Point();

    /**
     * The active state for the window.
     *
     * @property active
     * @type Boolean
     */
    this.active = true;

    /**
     * The visibility of the down scroll arrow.
     *
     * @property downArrowVisible
     * @type Boolean
     */
    this.downArrowVisible = false;

    /**
     * The visibility of the up scroll arrow.
     *
     * @property upArrowVisible
     * @type Boolean
     */
    this.upArrowVisible = false;

    /**
     * The visibility of the pause sign.
     *
     * @property pause
     * @type Boolean
     */
    this.pause = false;
};

/**
 * The image used as a window skin.
 *
 * @property windowskin
 * @type Bitmap
 */
Object.defineProperty(Window.prototype, 'windowskin', {
    get: function() {
        return this._windowskin;
    },
    set: function(value) {
        if (this._windowskin !== value) {
            this._windowskin = value;
            this._windowskin.addLoadListener(this._onWindowskinLoad.bind(this));
        }
    },
    configurable: true
});

/**
 * The bitmap used for the window contents.
 *
 * @property contents
 * @type Bitmap
 */
Object.defineProperty(Window.prototype, 'contents', {
    get: function() {
        return this._windowContentsSprite.bitmap;
    },
    set: function(value) {
        this._windowContentsSprite.bitmap = value;
    },
    configurable: true
});

/**
 * The width of the window in pixels.
 *
 * @property width
 * @type Number
 */
Object.defineProperty(Window.prototype, 'width', {
    get: function() {
        return this._width;
    },
    set: function(value) {
        this._width = value;
        this._refreshAllParts();
    },
    configurable: true
});

/**
 * The height of the window in pixels.
 *
 * @property height
 * @type Number
 */
Object.defineProperty(Window.prototype, 'height', {
    get: function() {
        return this._height;
    },
    set: function(value) {
        this._height = value;
        this._refreshAllParts();
    },
    configurable: true
});

/**
 * The size of the padding between the frame and contents.
 *
 * @property padding
 * @type Number
 */
Object.defineProperty(Window.prototype, 'padding', {
    get: function() {
        return this._padding;
    },
    set: function(value) {
        this._padding = value;
        this._refreshAllParts();
    },
    configurable: true
});

/**
 * The size of the margin for the window background.
 *
 * @property margin
 * @type Number
 */
Object.defineProperty(Window.prototype, 'margin', {
    get: function() {
        return this._margin;
    },
    set: function(value) {
        this._margin = value;
        this._refreshAllParts();
    },
    configurable: true
});

/**
 * The opacity of the window without contents (0 to 255).
 *
 * @property opacity
 * @type Number
 */
Object.defineProperty(Window.prototype, 'opacity', {
    get: function() {
        return this._windowSpriteContainer.alpha * 255;
    },
    set: function(value) {
        this._windowSpriteContainer.alpha = value.clamp(0, 255) / 255;
    },
    configurable: true
});

/**
 * The opacity of the window background (0 to 255).
 *
 * @property backOpacity
 * @type Number
 */
Object.defineProperty(Window.prototype, 'backOpacity', {
    get: function() {
        return this._windowBackSprite.alpha * 255;
    },
    set: function(value) {
        this._windowBackSprite.alpha = value.clamp(0, 255) / 255;
    },
    configurable: true
});

/**
 * The opacity of the window contents (0 to 255).
 *
 * @property contentsOpacity
 * @type Number
 */
Object.defineProperty(Window.prototype, 'contentsOpacity', {
    get: function() {
        return this._windowContentsSprite.alpha * 255;
    },
    set: function(value) {
        this._windowContentsSprite.alpha = value.clamp(0, 255) / 255;
    },
    configurable: true
});

/**
 * The openness of the window (0 to 255).
 *
 * @property openness
 * @type Number
 */
Object.defineProperty(Window.prototype, 'openness', {
    get: function() {
        return this._openness;
    },
    set: function(value) {
        if (this._openness !== value) {
            this._openness = value.clamp(0, 255);
            this._windowSpriteContainer.scale.y = this._openness / 255;
            this._windowSpriteContainer.y = this.height / 2 * (1 - this._openness / 255);
        }
    },
    configurable: true
});

/**
 * Updates the window for each frame.
 *
 * @method update
 */
Window.prototype.update = function() {
    if (this.active) {
        this._animationCount++;
    }
    this.children.forEach(function(child) {
        if (child.update) {
            child.update();
        }
    });
};

/**
 * Sets the x, y, width, and height all at once.
 *
 * @method move
 * @param {Number} x The x coordinate of the window
 * @param {Number} y The y coordinate of the window
 * @param {Number} width The width of the window
 * @param {Number} height The height of the window
 */
Window.prototype.move = function(x, y, width, height) {
    this.x = x || 0;
    this.y = y || 0;
    if (this._width !== width || this._height !== height) {
        this._width = width || 0;
        this._height = height || 0;
        this._refreshAllParts();
    }
};

/**
 * Returns true if the window is completely open (openness == 255).
 *
 * @method isOpen
 */
Window.prototype.isOpen = function() {
    return this._openness >= 255;
};

/**
 * Returns true if the window is completely closed (openness == 0).
 *
 * @method isClosed
 */
Window.prototype.isClosed = function() {
    return this._openness <= 0;
};

/**
 * Sets the position of the command cursor.
 *
 * @method setCursorRect
 * @param {Number} x The x coordinate of the cursor
 * @param {Number} y The y coordinate of the cursor
 * @param {Number} width The width of the cursor
 * @param {Number} height The height of the cursor
 */
Window.prototype.setCursorRect = function(x, y, width, height) {
    var cx = Math.floor(x || 0);
    var cy = Math.floor(y || 0);
    var cw = Math.floor(width || 0);
    var ch = Math.floor(height || 0);
    var rect = this._cursorRect;
    if (rect.x !== cx || rect.y !== cy || rect.width !== cw || rect.height !== ch) {
        this._cursorRect.x = cx;
        this._cursorRect.y = cy;
        this._cursorRect.width = cw;
        this._cursorRect.height = ch;
        this._refreshCursor();
    }
};

/**
 * Changes the color of the background.
 *
 * @method setTone
 * @param {Number} r The red value in the range (-255, 255)
 * @param {Number} g The green value in the range (-255, 255)
 * @param {Number} b The blue value in the range (-255, 255)
 */
Window.prototype.setTone = function(r, g, b) {
    var tone = this._colorTone;
    if (r !== tone[0] || g !== tone[1] || b !== tone[2]) {
        this._colorTone = [r, g, b];
        this._refreshBack();
    }
};

/**
 * Adds a child between the background and contents.
 *
 * @method addChildToBack
 * @param {Object} child The child to add
 * @return {Object} The child that was added
 */
Window.prototype.addChildToBack = function(child) {
    var containerIndex = this.children.indexOf(this._windowSpriteContainer);
    return this.addChildAt(child, containerIndex + 1);
};

/**
 * @method updateTransform
 * @private
 */
Window.prototype.updateTransform = function() {
    this._updateCursor();
    this._updateArrows();
    this._updatePauseSign();
    this._updateContents();
    PIXI.DisplayObjectContainer.prototype.updateTransform.call(this);
};

/**
 * @method _createAllParts
 * @private
 */
Window.prototype._createAllParts = function() {
    this._windowSpriteContainer = new PIXI.DisplayObjectContainer();
    this._windowBackSprite = new Sprite();
    this._windowCursorSprite = new Sprite();
    this._windowFrameSprite = new Sprite();
    this._windowContentsSprite = new Sprite();
    this._downArrowSprite = new Sprite();
    this._upArrowSprite = new Sprite();
    this._windowPauseSignSprite = new Sprite();
    this._windowBackSprite.bitmap = new Bitmap(1, 1);
    this._windowBackSprite.alpha = 192 / 255;
    this.addChild(this._windowSpriteContainer);
    this._windowSpriteContainer.addChild(this._windowBackSprite);
    this._windowSpriteContainer.addChild(this._windowFrameSprite);
    this.addChild(this._windowCursorSprite);
    this.addChild(this._windowContentsSprite);
    this.addChild(this._downArrowSprite);
    this.addChild(this._upArrowSprite);
    this.addChild(this._windowPauseSignSprite);
};

/**
 * @method _onWindowskinLoad
 * @private
 */
Window.prototype._onWindowskinLoad = function() {
    this._refreshAllParts();
};

/**
 * @method _refreshAllParts
 * @private
 */
Window.prototype._refreshAllParts = function() {
    this._refreshBack();
    this._refreshFrame();
    this._refreshCursor();
    this._refreshContents();
    this._refreshArrows();
    this._refreshPauseSign();
};

/**
 * @method _refreshBack
 * @private
 */
Window.prototype._refreshBack = function() {
    var m = this._margin;
    var w = this._width - m * 2;
    var h = this._height - m * 2;
    var bitmap = new Bitmap(w, h);

    this._windowBackSprite.bitmap = bitmap;
    this._windowBackSprite.setFrame(0, 0, w, h);
    this._windowBackSprite.move(m, m);

    if (w > 0 && h > 0 && this._windowskin) {
        var p = 96;
        bitmap.blt(this._windowskin, 0, 0, p, p, 0, 0, w, h);
        for (var y = 0; y < h; y += p) {
            for (var x = 0; x < w; x += p) {
                bitmap.blt(this._windowskin, 0, p, p, p, x, y, p, p);
            }
        }
        var tone = this._colorTone;
        bitmap.adjustTone(tone[0], tone[1], tone[2]);
    }
};

/**
 * @method _refreshFrame
 * @private
 */
Window.prototype._refreshFrame = function() {
    var w = this._width;
    var h = this._height;
    var m = 24;
    var bitmap = new Bitmap(w, h);

    this._windowFrameSprite.bitmap = bitmap;
    this._windowFrameSprite.setFrame(0, 0, w, h);

    if (w > 0 && h > 0 && this._windowskin) {
        var skin = this._windowskin;
        var p = 96;
        var q = 96;
        bitmap.blt(skin, p+m, 0+0, p-m*2, m, m, 0, w-m*2, m);
        bitmap.blt(skin, p+m, 0+q-m, p-m*2, m, m, h-m, w-m*2, m);
        bitmap.blt(skin, p+0, 0+m, m, p-m*2, 0, m, m, h-m*2);
        bitmap.blt(skin, p+q-m, 0+m, m, p-m*2, w-m, m, m, h-m*2);
        bitmap.blt(skin, p+0, 0+0, m, m, 0, 0, m, m);
        bitmap.blt(skin, p+q-m, 0+0, m, m, w-m, 0, m, m);
        bitmap.blt(skin, p+0, 0+q-m, m, m, 0, h-m, m, m);
        bitmap.blt(skin, p+q-m, 0+q-m, m, m, w-m, h-m, m, m);
    }
};

/**
 * @method _refreshCursor
 * @private
 */
Window.prototype._refreshCursor = function() {
    var pad = this._padding;
    var x = this._cursorRect.x + pad - this.origin.x;
    var y = this._cursorRect.y + pad - this.origin.y;
    var w = this._cursorRect.width;
    var h = this._cursorRect.height;
    var m = 4;
    var x2 = Math.max(x, pad);
    var y2 = Math.max(y, pad);
    var ox = x - x2;
    var oy = y - y2;
    var w2 = Math.min(w, this._width - pad - x2);
    var h2 = Math.min(h, this._height - pad - y2);
    var bitmap = new Bitmap(w2, h2);

    this._windowCursorSprite.bitmap = bitmap;
    this._windowCursorSprite.setFrame(0, 0, w2, h2);
    this._windowCursorSprite.move(x2, y2);

    if (w > 0 && h > 0 && this._windowskin) {
        var skin = this._windowskin;
        var p = 96;
        var q = 48;
        bitmap.blt(skin, p+m, p+m, q-m*2, q-m*2, ox+m, oy+m, w-m*2, h-m*2);
        bitmap.blt(skin, p+m, p+0, q-m*2, m, ox+m, oy+0, w-m*2, m);
        bitmap.blt(skin, p+m, p+q-m, q-m*2, m, ox+m, oy+h-m, w-m*2, m);
        bitmap.blt(skin, p+0, p+m, m, q-m*2, ox+0, oy+m, m, h-m*2);
        bitmap.blt(skin, p+q-m, p+m, m, q-m*2, ox+w-m, oy+m, m, h-m*2);
        bitmap.blt(skin, p+0, p+0, m, m, ox+0, oy+0, m, m);
        bitmap.blt(skin, p+q-m, p+0, m, m, ox+w-m, oy+0, m, m);
        bitmap.blt(skin, p+0, p+q-m, m, m, ox+0, oy+h-m, m, m);
        bitmap.blt(skin, p+q-m, p+q-m, m, m, ox+w-m, oy+h-m, m, m);
    }
};

/**
 * @method _refreshContents
 * @private
 */
Window.prototype._refreshContents = function() {
    this._windowContentsSprite.move(this.padding, this.padding);
};

/**
 * @method _refreshArrows
 * @private
 */
Window.prototype._refreshArrows = function() {
    var w = this._width;
    var h = this._height;
    var p = 24;
    var q = p/2;
    var sx = 96+p;
    var sy = 0+p;
    this._downArrowSprite.bitmap = this._windowskin;
    this._downArrowSprite.anchor.x = 0.5;
    this._downArrowSprite.anchor.y = 0.5;
    this._downArrowSprite.setFrame(sx+q, sy+q+p, p, q);
    this._downArrowSprite.move(w/2, h-q);
    this._upArrowSprite.bitmap = this._windowskin;
    this._upArrowSprite.anchor.x = 0.5;
    this._upArrowSprite.anchor.y = 0.5;
    this._upArrowSprite.setFrame(sx+q, sy, p, q);
    this._upArrowSprite.move(w/2, q);
};

/**
 * @method _refreshPauseSign
 * @private
 */
Window.prototype._refreshPauseSign = function() {
    var sx = 144;
    var sy = 96;
    var p = 24;
    this._windowPauseSignSprite.bitmap = this._windowskin;
    this._windowPauseSignSprite.anchor.x = 0.5;
    this._windowPauseSignSprite.anchor.y = 1;
    this._windowPauseSignSprite.move(this._width / 2, this._height);
    this._windowPauseSignSprite.setFrame(sx, sy, p, p);
    this._windowPauseSignSprite.alpha = 0;
};

/**
 * @method _updateCursor
 * @private
 */
Window.prototype._updateCursor = function() {
    var blinkCount = this._animationCount % 40;
    var cursorOpacity = this.contentsOpacity;
    if (this.active) {
        if (blinkCount < 20) {
            cursorOpacity -= blinkCount * 8;
        } else {
            cursorOpacity -= (40 - blinkCount) * 8;
        }
    }
    this._windowCursorSprite.alpha = cursorOpacity / 255;
    this._windowCursorSprite.visible = this.isOpen();
};

/**
 * @method _updateContents
 * @private
 */
Window.prototype._updateContents = function() {
    var w = this._width - this._padding * 2;
    var h = this._height - this._padding * 2;
    if (w > 0 && h > 0) {
        this._windowContentsSprite.setFrame(this.origin.x, this.origin.y, w, h);
        this._windowContentsSprite.visible = this.isOpen();
    } else {
        this._windowContentsSprite.visible = false;
    }
};

/**
 * @method _updateArrows
 * @private
 */
Window.prototype._updateArrows = function() {
    this._downArrowSprite.visible = this.isOpen() && this.downArrowVisible;
    this._upArrowSprite.visible = this.isOpen() && this.upArrowVisible;
};

/**
 * @method _updatePauseSign
 * @private
 */
Window.prototype._updatePauseSign = function() {
    var sprite = this._windowPauseSignSprite;
    var x = Math.floor(this._animationCount / 16) % 2;
    var y = Math.floor(this._animationCount / 16 / 2) % 2;
    var sx = 144;
    var sy = 96;
    var p = 24;
    if (!this.pause) {
        sprite.alpha = 0;
    } else if (sprite.alpha < 1) {
        sprite.alpha = Math.min(sprite.alpha + 0.1, 1);
    }
    sprite.setFrame(sx+x*p, sy+y*p, p, p);
    sprite.visible = this.isOpen();
};

// The important members from Pixi.js

/**
 * The visibility of the window.
 *
 * @property visible
 * @type Boolean
 */

/**
 * The x coordinate of the window.
 *
 * @property x
 * @type Number
 */

/**
 * The y coordinate of the window.
 *
 * @property y
 * @type Number
 */

/**
 * [read-only] The array of children of the window.
 *
 * @property children
 * @type Array
 */

/**
 * [read-only] The object that contains the window.
 *
 * @property parent
 * @type Object
 */

/**
 * Adds a child to the container.
 *
 * @method addChild
 * @param {Object} child The child to add
 * @return {Object} The child that was added
 */

/**
 * Adds a child to the container at a specified index.
 *
 * @method addChildAt
 * @param {Object} child The child to add
 * @param {Number} index The index to place the child in
 * @return {Object} The child that was added
 */

/**
 * Removes a child from the container.
 *
 * @method removeChild
 * @param {Object} child The child to remove
 * @return {Object} The child that was removed
 */

/**
 * Removes a child from the specified index position.
 *
 * @method removeChildAt
 * @param {Number} index The index to get the child from
 * @return {Object} The child that was removed
 */

//-----------------------------------------------------------------------------
/**
 * The layer which contains game windows.
 *
 * @class WindowLayer
 * @constructor
 */
function WindowLayer() {
    this.initialize.apply(this, arguments);
}

WindowLayer.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
WindowLayer.prototype.constructor = WindowLayer;

WindowLayer.prototype.initialize = function() {
    PIXI.DisplayObjectContainer.call(this);
    this._width = 0;
    this._height = 0;
    this._tempCanvas = null;
    this._vertexBuffer = null;
    this._translationMatrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
    this._dummySprite = new Sprite(new Bitmap(1, 1));
};

/**
 * The width of the window layer in pixels.
 *
 * @property width
 * @type Number
 */
Object.defineProperty(WindowLayer.prototype, 'width', {
    get: function() {
        return this._width;
    },
    set: function(value) {
        this._width = value;
    },
    configurable: true
});

/**
 * The height of the window layer in pixels.
 *
 * @property height
 * @type Number
 */
Object.defineProperty(WindowLayer.prototype, 'height', {
    get: function() {
        return this._height;
    },
    set: function(value) {
        this._height = value;
    },
    configurable: true
});

/**
 * Sets the x, y, width, and height all at once.
 *
 * @method move
 * @param {Number} x The x coordinate of the window layer
 * @param {Number} y The y coordinate of the window layer
 * @param {Number} width The width of the window layer
 * @param {Number} height The height of the window layer
 */
WindowLayer.prototype.move = function(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
};

/**
 * Updates the window layer for each frame.
 *
 * @method update
 */
WindowLayer.prototype.update = function() {
    this.children.forEach(function(child) {
        if (child.update) {
            child.update();
        }
    });
};

/**
 * @method _renderCanvas
 * @param {Object} renderSession
 * @private
 */
WindowLayer.prototype._renderCanvas = function(renderSession) {
    if (!this.visible) {
        return;
    }

    if (!this._tempCanvas) {
        this._tempCanvas = document.createElement('canvas');
    }

    this._tempCanvas.width = Graphics.width;
    this._tempCanvas.height = Graphics.height;

    var realCanvasContext = renderSession.context;
    var context = this._tempCanvas.getContext('2d');

    context.save();
    context.clearRect(0, 0, Graphics.width, Graphics.height);
    context.beginPath();
    context.rect(this.x, this.y, this.width, this.height);
    context.closePath();
    context.clip();

    renderSession.context = context;

    for (var i = 0; i < this.children.length; i++) {
        var child = this.children[i];
        if (child._isWindow && child.visible && child.openness > 0) {
            this._canvasClearWindowRect(renderSession, child);
            context.save();
            child._renderCanvas(renderSession);
            context.restore();
        }
    }

    context.restore();

    renderSession.context = realCanvasContext;
    renderSession.context.setTransform(1, 0, 0, 1, 0, 0);
    renderSession.context.globalCompositeOperation = 'source-over';
    renderSession.context.globalAlpha = 1;
    renderSession.context.drawImage(this._tempCanvas, 0, 0);

    for (var j = 0; j < this.children.length; j++) {
        if (!this.children[j]._isWindow) {
            this.children[j]._renderCanvas(renderSession);
        }
    }
};

/**
 * @method _canvasClearWindowRect
 * @param {Object} renderSession
 * @param {Window} window
 * @private
 */
WindowLayer.prototype._canvasClearWindowRect = function(renderSession, window) {
    var rx = this.x + window.x;
    var ry = this.y + window.y + window.height / 2 * (1 - window._openness / 255);
    var rw = window.width;
    var rh = window.height * window._openness / 255;
    renderSession.context.clearRect(rx, ry, rw, rh);
};

/**
 * @method _renderWebGL
 * @param {Object} renderSession
 * @private
 */
WindowLayer.prototype._renderWebGL = function(renderSession) {
    if (!this.visible) {
        return;
    }

    var gl = renderSession.gl;

    if (!this._vertexBuffer) {
        this._vertexBuffer = gl.createBuffer();
    }

    this._dummySprite._renderWebGL(renderSession);

    renderSession.spriteBatch.stop();
    gl.enable(gl.STENCIL_TEST);
    gl.clear(gl.STENCIL_BUFFER_BIT);
    this._webglMaskOutside(renderSession);
    renderSession.spriteBatch.start();

    for (var i = this.children.length - 1; i >= 0; i--) {
        var child = this.children[i];
        if (child._isWindow && child.visible && child.openness > 0) {
            gl.stencilFunc(gl.EQUAL, 0, 0xFF);
            child._renderWebGL(renderSession);
            renderSession.spriteBatch.stop();
            this._webglMaskWindow(renderSession, child);
            renderSession.spriteBatch.start();
        }
    }

    gl.disable(gl.STENCIL_TEST);

    for (var j = 0; j < this.children.length; j++) {
        if (!this.children[j]._isWindow) {
            this.children[j]._renderWebGL(renderSession);
        }
    }
};

/**
 * @method _webglMaskOutside
 * @param {Object} renderSession
 * @private
 */
WindowLayer.prototype._webglMaskOutside = function(renderSession) {
    var x1 = this.x;
    var y1 = this.y;
    var x2 = this.x + this.width;
    var y2 = this.y + this.height;
    this._webglMaskRect(renderSession, 0, 0, Graphics.width, y1);
    this._webglMaskRect(renderSession, 0, y2, Graphics.width, Graphics.height - y2);
    this._webglMaskRect(renderSession, 0, 0, x1, Graphics.height);
    this._webglMaskRect(renderSession, x2, 0, Graphics.width - x2, Graphics.height);
};

/**
 * @method _webglMaskWindow
 * @param {Object} renderSession
 * @param {Window} window
 * @private
 */
WindowLayer.prototype._webglMaskWindow = function(renderSession, window) {
    var rx = this.x + window.x;
    var ry = this.y + window.y + window.height / 2 * (1 - window._openness / 255);
    var rw = window.width;
    var rh = window.height * window._openness / 255;
    this._webglMaskRect(renderSession, rx, ry, rw, rh);
};

/**
 * @method _webglMaskRect
 * @param {Object} renderSession
 * @param {Number} x
 * @param {Number} y
 * @param {Number} w
 * @param {Number} h
 * @private
 */
WindowLayer.prototype._webglMaskRect = function(renderSession, x, y, w, h) {
    if (w > 0 && h > 0) {
        var gl = renderSession.gl;

        var projection = renderSession.projection;
        var offset = renderSession.offset;
        var shader = renderSession.shaderManager.primitiveShader;

        renderSession.shaderManager.setShader(shader);

        gl.uniformMatrix3fv(shader.translationMatrix, false, this._translationMatrix);
        gl.uniform1f(shader.flipY, 1);
        gl.uniform2f(shader.projectionVector, projection.x, -projection.y);
        gl.uniform2f(shader.offsetVector, -offset.x, -offset.y);

        gl.stencilFunc(gl.EQUAL, 0, 0xFF);
        gl.stencilOp(gl.KEEP, gl.KEEP, gl.INCR);

        var data = new Float32Array([x, y, x+w, y, x, y+h, x, y+h, x+w, y, x+w, y+h]);

        gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
        gl.enableVertexAttribArray(shader.aVertexPosition);
        gl.vertexAttribPointer(shader.aVertexPosition, 2, gl.FLOAT, false, 0, 0);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);
    }
};

// The important members from Pixi.js

/**
 * The x coordinate of the window layer.
 *
 * @property x
 * @type Number
 */

/**
 * The y coordinate of the window layer.
 *
 * @property y
 * @type Number
 */

/**
 * [read-only] The array of children of the window layer.
 *
 * @property children
 * @type Array
 */

/**
 * [read-only] The object that contains the window layer.
 *
 * @property parent
 * @type Object
 */

/**
 * Adds a child to the container.
 *
 * @method addChild
 * @param {Object} child The child to add
 * @return {Object} The child that was added
 */

/**
 * Adds a child to the container at a specified index.
 *
 * @method addChildAt
 * @param {Object} child The child to add
 * @param {Number} index The index to place the child in
 * @return {Object} The child that was added
 */

/**
 * Removes a child from the container.
 *
 * @method removeChild
 * @param {Object} child The child to remove
 * @return {Object} The child that was removed
 */

/**
 * Removes a child from the specified index position.
 *
 * @method removeChildAt
 * @param {Number} index The index to get the child from
 * @return {Object} The child that was removed
 */

//-----------------------------------------------------------------------------
/**
 * The weather effect which displays rain, storm, or snow.
 *
 * @class Weather
 * @constructor
 */
function Weather() {
    this.initialize.apply(this, arguments);
}

Weather.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
Weather.prototype.constructor = Weather;

Weather.prototype.initialize = function() {
    PIXI.DisplayObjectContainer.call(this);

    this._width = Graphics.width;
    this._height = Graphics.height;
    this._sprites = [];

    this._createBitmaps();
    this._createDimmer();

    /**
     * The type of the weather in ['none', 'rain', 'storm', 'snow'].
     *
     * @property type
     * @type String
     */
    this.type = 'none';

    /**
     * The power of the weather in the range (0, 9).
     *
     * @property power
     * @type Number
     */
    this.power = 0;

    /**
     * The origin point of the weather for scrolling.
     *
     * @property origin
     * @type Point
     */
    this.origin = new Point();
};

/**
 * Updates the weather for each frame.
 *
 * @method update
 */
Weather.prototype.update = function() {
    this._updateDimmer();
    this._updateAllSprites();
};

/**
 * @method _createBitmaps
 * @private
 */
Weather.prototype._createBitmaps = function() {
    this._rainBitmap = new Bitmap(1, 60);
    this._rainBitmap.fillAll('white');
    this._stormBitmap = new Bitmap(2, 100);
    this._stormBitmap.fillAll('white');
    this._snowBitmap = new Bitmap(9, 9);
    this._snowBitmap.drawCircle(4, 4, 4, 'white');
};

/**
 * @method _createDimmer
 * @private
 */
Weather.prototype._createDimmer = function() {
    this._dimmerSprite = new ScreenSprite();
    this._dimmerSprite.setColor(80, 80, 80);
    this.addChild(this._dimmerSprite);
};

/**
 * @method _updateDimmer
 * @private
 */
Weather.prototype._updateDimmer = function() {
    this._dimmerSprite.opacity = Math.floor(this.power * 6);
};

/**
 * @method _updateAllSprites
 * @private
 */
Weather.prototype._updateAllSprites = function() {
    var maxSprites = Math.floor(this.power * 10);
    while (this._sprites.length < maxSprites) {
        this._addSprite();
    }
    while (this._sprites.length > maxSprites) {
        this._removeSprite();
    }
    this._sprites.forEach(function(sprite) {
        this._updateSprite(sprite);
        sprite.x = sprite.ax - this.origin.x;
        sprite.y = sprite.ay - this.origin.y;
    }, this);
};

/**
 * @method _addSprite
 * @private
 */
Weather.prototype._addSprite = function() {
    var sprite = new Sprite(this.viewport);
    sprite.opacity = 0;
    this._sprites.push(sprite);
    this.addChild(sprite);
};

/**
 * @method _removeSprite
 * @private
 */
Weather.prototype._removeSprite = function() {
    this.removeChild(this._sprites.pop());
};

/**
 * @method _updateSprite
 * @param {Sprite} sprite
 * @private
 */
Weather.prototype._updateSprite = function(sprite) {
    switch (this.type) {
    case 'rain':
        this._updateRainSprite(sprite);
        break;
    case 'storm':
        this._updateStormSprite(sprite);
        break;
    case 'snow':
        this._updateSnowSprite(sprite);
        break;
    }
    if (sprite.opacity < 40) {
        this._rebornSprite(sprite);
    }
};

/**
 * @method _updateRainSprite
 * @param {Sprite} sprite
 * @private
 */
Weather.prototype._updateRainSprite = function(sprite) {
    sprite.bitmap = this._rainBitmap;
    sprite.rotation = Math.PI / 16;
    sprite.ax -= 6 * Math.sin(sprite.rotation);
    sprite.ay += 6 * Math.cos(sprite.rotation);
    sprite.opacity -= 6;
};

/**
 * @method _updateStormSprite
 * @param {Sprite} sprite
 * @private
 */
Weather.prototype._updateStormSprite = function(sprite) {
    sprite.bitmap = this._stormBitmap;
    sprite.rotation = Math.PI / 8;
    sprite.ax -= 8 * Math.sin(sprite.rotation);
    sprite.ay += 8 * Math.cos(sprite.rotation);
    sprite.opacity -= 8;
};

/**
 * @method _updateSnowSprite
 * @param {Sprite} sprite
 * @private
 */
Weather.prototype._updateSnowSprite = function(sprite) {
    sprite.bitmap = this._snowBitmap;
    sprite.rotation = Math.PI / 16;
    sprite.ax -= 3 * Math.sin(sprite.rotation);
    sprite.ay += 3 * Math.cos(sprite.rotation);
    sprite.opacity -= 3;
};

/**
 * @method _rebornSprite
 * @param {Sprite} sprite
 * @private
 */
Weather.prototype._rebornSprite = function(sprite) {
    sprite.ax = Math.randomInt(Graphics.width + 100) - 100 + this.origin.x;
    sprite.ay = Math.randomInt(Graphics.height + 200) - 200 + this.origin.y;
    sprite.opacity = 160 + Math.randomInt(60);
};

//-----------------------------------------------------------------------------
/**
 * The color matrix filter for WebGL.
 *
 * @class ToneFilter
 * @constructor
 */
function ToneFilter() {
    PIXI.AbstractFilter.call(this);
    this.initialize.apply(this, arguments);
}

ToneFilter.prototype = Object.create(PIXI.AbstractFilter.prototype);
ToneFilter.prototype.constructor = ToneFilter;

ToneFilter.prototype.initialize = function() {
    this.passes = [this];

    this.uniforms = {
        matrix: {
            type: 'mat4',
            value: [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]
        }
    };

    this.fragmentSrc = [
        'precision mediump float;',
        'varying vec2 vTextureCoord;',
        'varying vec4 vColor;',
        'uniform mat4 matrix;',
        'uniform sampler2D uSampler;',
        'void main(void) {',
        '   gl_FragColor = texture2D(uSampler, vTextureCoord) * matrix;',
        '}'
    ];
};

/**
 * Resets the filter.
 *
 * @method reset
 */
ToneFilter.prototype.reset = function() {
    this.uniforms.matrix.value = [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];
};

/**
 * Changes the hue.
 *
 * @method adjustHue
 * @param {Number} value The hue value in the range (-360, 360)
 */
ToneFilter.prototype.adjustHue = function(value) {
    value = (value || 0) / 180;

    if (value !== 0) {
        var c = Math.cos(value * Math.PI);
        var s = Math.sin(value * Math.PI);
        var a00 = 0.213 + c * 0.787 - s * 0.213;
        var a01 = 0.715 - c * 0.715 - s * 0.715;
        var a02 = 0.072 - c * 0.072 + s * 0.928;
        var a10 = 0.213 - c * 0.213 + s * 0.143;
        var a11 = 0.715 + c * 0.285 + s * 0.140;
        var a12 = 0.072 - c * 0.072 - s * 0.283;
        var a20 = 0.213 - c * 0.213 - s * 0.787;
        var a21 = 0.715 - c * 0.715 + s * 0.715;
        var a22 = 0.072 + c * 0.928 + s * 0.072;
        this._multiplyMatrix([
            a00, a01, a02, 0,
            a10, a11, a12, 0,
            a20, a21, a22, 0,
              0,   0,   0, 1
        ]);
    }
};

/**
 * Changes the saturation.
 *
 * @method adjustSaturation
 * @param {Number} value The saturation value in the range (-255, 255)
 */
ToneFilter.prototype.adjustSaturation = function(value) {
    value = (value || 0).clamp(-255, 255) / 255;

    if (value !== 0) {
        var a = 1 + value;
        var a00 = 0.213 + 0.787 * a;
        var a01 = 0.715 - 0.715 * a;
        var a02 = 0.072 - 0.072 * a;
        var a10 = 0.213 - 0.213 * a;
        var a11 = 0.715 + 0.285 * a;
        var a12 = 0.072 - 0.072 * a;
        var a20 = 0.213 - 0.213 * a;
        var a21 = 0.715 - 0.715 * a;
        var a22 = 0.072 + 0.928 * a;
        this._multiplyMatrix([
            a00, a01, a02, 0,
            a10, a11, a12, 0,
            a20, a21, a22, 0,
              0,   0,   0, 1
        ]);
    }
};

/**
 * Changes the tone.
 *
 * @method adjustTone
 * @param {Number} r The red strength in the range (-255, 255)
 * @param {Number} g The green strength in the range (-255, 255)
 * @param {Number} b The blue strength in the range (-255, 255)
 */
ToneFilter.prototype.adjustTone = function(r, g, b) {
    r = (r || 0).clamp(-255, 255) / 255;
    g = (g || 0).clamp(-255, 255) / 255;
    b = (b || 0).clamp(-255, 255) / 255;

    if (r !== 0 || g !== 0 || b !== 0) {
        this._multiplyMatrix([
            1, 0, 0, r,
            0, 1, 0, g,
            0, 0, 1, b,
            0, 0, 0, 1
        ]);
    }
};

/**
 * @method _multiplyMatrix
 * @param {Array} matrix
 * @private
 */
ToneFilter.prototype._multiplyMatrix = function(matrix) {
    var value = this.uniforms.matrix.value;
    var temp = [];

    for (var i = 0; i < 4; i++) {
        for (var m = 0; m < 4; m++) {
            temp[m] = value[i * 4 + m];
        }
        for (var j = 0; j < 4; j++) {
            var val = 0;
            for (var n = 0; n < 4; n++) {
                val += matrix[n * 4 + j] * temp[n];
            }
            value[i * 4 + j] = val;
        }
    }
};

//-----------------------------------------------------------------------------
/**
 * The sprite which changes the screen color in 2D canvas mode.
 *
 * @class ToneSprite
 * @constructor
 */
function ToneSprite() {
    this.initialize.apply(this, arguments);
}

ToneSprite.prototype = Object.create(PIXI.DisplayObject.prototype);
ToneSprite.prototype.constructor = ToneSprite;

ToneSprite.prototype.initialize = function() {
    PIXI.DisplayObject.call(this);
    this.clear();
};

/**
 * Clears the tone.
 *
 * @method reset
 */
ToneSprite.prototype.clear = function() {
    this._red = 0;
    this._green = 0;
    this._blue = 0;
    this._gray = 0;
};

/**
 * Sets the tone.
 *
 * @method setTone
 * @param {Number} r The red strength in the range (-255, 255)
 * @param {Number} g The green strength in the range (-255, 255)
 * @param {Number} b The blue strength in the range (-255, 255)
 * @param {Number} gray The grayscale level in the range (0, 255)
 */
ToneSprite.prototype.setTone = function(r, g, b, gray) {
    this._red = Math.round(r || 0).clamp(-255, 255);
    this._green = Math.round(g || 0).clamp(-255, 255);
    this._blue = Math.round(b || 0).clamp(-255, 255);
    this._gray = Math.round(gray || 0).clamp(0, 255);
};

/**
 * @method _renderCanvas
 * @param {Object} renderSession
 * @private
 */
ToneSprite.prototype._renderCanvas = function(renderSession) {
    if (this.visible) {
        var context = renderSession.context;
        var t = this.worldTransform;
        var r = renderSession.resolution;
        var width = Graphics.width;
        var height = Graphics.height;
        context.save();
        context.setTransform(t.a, t.b, t.c, t.d, t.tx * r, t.ty * r);
        if (Graphics.canUseSaturationBlend() && this._gray > 0) {
            context.globalCompositeOperation = 'saturation';
            context.globalAlpha = this._gray / 255;
            context.fillStyle = '#ffffff';
            context.fillRect(0, 0, width, height);
        }
        context.globalAlpha = 1;
        var r1 = Math.max(0, this._red);
        var g1 = Math.max(0, this._green);
        var b1 = Math.max(0, this._blue);
        if (r1 || g1 || b1) {
            context.globalCompositeOperation = 'lighter';
            context.fillStyle = Utils.rgbToCssColor(r1, g1, b1);
            context.fillRect(0, 0, width, height);
        }
        if (Graphics.canUseDifferenceBlend()) {
            var r2 = Math.max(0, -this._red);
            var g2 = Math.max(0, -this._green);
            var b2 = Math.max(0, -this._blue);
            if (r2 || g2 || b2) {
                context.globalCompositeOperation = 'difference';
                context.fillStyle = '#ffffff';
                context.fillRect(0, 0, width, height);
                context.globalCompositeOperation = 'lighter';
                context.fillStyle = Utils.rgbToCssColor(r2, g2, b2);
                context.fillRect(0, 0, width, height);
                context.globalCompositeOperation = 'difference';
                context.fillStyle = '#ffffff';
                context.fillRect(0, 0, width, height);
            }
        }
        context.restore();
    }
};

/**
 * @method _renderWebGL
 * @param {Object} renderSession
 * @private
 */
ToneSprite.prototype._renderWebGL = function(renderSession) {
    // Not supported
};

//-----------------------------------------------------------------------------
/**
 * The root object of the display tree.
 *
 * @class Stage
 * @constructor
 */
function Stage() {
    this.initialize.apply(this, arguments);
}

Stage.prototype = Object.create(PIXI.Stage.prototype);
Stage.prototype.constructor = Stage;

Stage.prototype.initialize = function() {
    PIXI.Stage.call(this);

    // The interactive flag causes a memory leak.
    this.interactive = false;
};

/**
 * [read-only] The array of children of the stage.
 *
 * @property children
 * @type Array
 */

/**
 * Adds a child to the container.
 *
 * @method addChild
 * @param {Object} child The child to add
 * @return {Object} The child that was added
 */

/**
 * Adds a child to the container at a specified index.
 *
 * @method addChildAt
 * @param {Object} child The child to add
 * @param {Number} index The index to place the child in
 * @return {Object} The child that was added
 */

/**
 * Removes a child from the container.
 *
 * @method removeChild
 * @param {Object} child The child to remove
 * @return {Object} The child that was removed
 */

/**
 * Removes a child from the specified index position.
 *
 * @method removeChildAt
 * @param {Number} index The index to get the child from
 * @return {Object} The child that was removed
 */

//-----------------------------------------------------------------------------
/**
 * The audio object of Web Audio API.
 *
 * @class WebAudio
 * @constructor
 * @param {String} url The url of the audio file
 */
function WebAudio() {
    this.initialize.apply(this, arguments);
}

WebAudio.prototype.initialize = function(url) {
    if (!WebAudio._initialized) {
        WebAudio.initialize();
    }
    this.clear();
    this._load(url);
    this._url = url;
};

WebAudio._context        = null;
WebAudio._masterGainNode = null;
WebAudio._initialized    = false;
WebAudio._unlocked       = false;

/**
 * Initializes the audio system.
 *
 * @static
 * @method initialize
 * @param {Boolean} noAudio Flag for the no-audio mode
 * @return {Boolean} True if the audio system is available
 */
WebAudio.initialize = function(noAudio) {
    if (!this._initialized) {
        if (!noAudio) {
            this._createContext();
            this._detectCodecs();
            this._createMasterGainNode();
            this._setupEventHandlers();
        }
        this._initialized = true;
    }
    return !!this._context;
};

/**
 * Checks whether the browser can play ogg files.
 *
 * @static
 * @method canPlayOgg
 * @return {Boolean} True if the browser can play ogg files
 */
WebAudio.canPlayOgg = function() {
    if (!this._initialized) {
        this.initialize();
    }
    return !!this._canPlayOgg;
};

/**
 * Checks whether the browser can play m4a files.
 *
 * @static
 * @method canPlayM4a
 * @return {Boolean} True if the browser can play m4a files
 */
WebAudio.canPlayM4a = function() {
    if (!this._initialized) {
        this.initialize();
    }
    return !!this._canPlayM4a;
};

/**
 * @static
 * @method _createContext
 * @private
 */
WebAudio._createContext = function() {
    try {
        if (typeof AudioContext !== 'undefined') {
            this._context = new AudioContext();
        } else if (typeof webkitAudioContext !== 'undefined') {
            this._context = new webkitAudioContext();
        }
    } catch (e) {
        this._context = null;
    }
};

/**
 * @static
 * @method _detectCodecs
 * @private
 */
WebAudio._detectCodecs = function() {
    var audio = document.createElement('audio');
    if (audio.canPlayType) {
        this._canPlayOgg = audio.canPlayType('audio/ogg');
        this._canPlayM4a = audio.canPlayType('audio/mp4');
    }
};

/**
 * @static
 * @method _createMasterGainNode
 * @private
 */
WebAudio._createMasterGainNode = function() {
    var context = WebAudio._context;
    if (context) {
        this._masterGainNode = context.createGain();
        this._masterGainNode.gain.value = 1;
        this._masterGainNode.connect(context.destination);
    }
};

/**
 * @static
 * @method _setupEventHandlers
 * @private
 */
WebAudio._setupEventHandlers = function() {
    document.addEventListener('touchstart', this._onTouchStart.bind(this));
    document.addEventListener('visibilitychange', this._onVisibilityChange.bind(this));
};

/**
 * @static
 * @method _onTouchStart
 * @private
 */
WebAudio._onTouchStart = function() {
    var context = WebAudio._context;
    if (context && !this._unlocked) {
        // Unlock Web Audio on iOS
        var node = context.createBufferSource();
        node.start(0);
        this._unlocked = true;
    }
};

/**
 * @static
 * @method _onVisibilityChange
 * @private
 */
WebAudio._onVisibilityChange = function() {
    if (document.visibilityState === 'hidden') {
        this._onHide();
    } else {
        this._onShow();
    }
};

/**
 * @static
 * @method _onHide
 * @private
 */
WebAudio._onHide = function() {
    if (this._shouldMuteOnHide()) {
        this._fadeOut(1);
    }
};

/**
 * @static
 * @method _onShow
 * @private
 */
WebAudio._onShow = function() {
    if (this._shouldMuteOnHide()) {
        this._fadeIn(0.5);
    }
};

/**
 * @static
 * @method _shouldMuteOnHide
 * @private
 */
WebAudio._shouldMuteOnHide = function() {
    return Utils.isMobileDevice();
};

/**
 * @static
 * @method _fadeIn
 * @param {Number} duration
 * @private
 */
WebAudio._fadeIn = function(duration) {
    if (this._masterGainNode) {
        var gain = this._masterGainNode.gain;
        var currentTime = WebAudio._context.currentTime;
        gain.setValueAtTime(gain.value, currentTime);
        gain.linearRampToValueAtTime(1, currentTime + duration);
    }
};

/**
 * @static
 * @method _fadeOut
 * @param {Number} duration
 * @private
 */
WebAudio._fadeOut = function(duration) {
    if (this._masterGainNode) {
        var gain = this._masterGainNode.gain;
        var currentTime = WebAudio._context.currentTime;
        gain.setValueAtTime(gain.value, currentTime);
        gain.linearRampToValueAtTime(0, currentTime + duration);
    }
};

/**
 * Clears the audio data.
 *
 * @method clear
 */
WebAudio.prototype.clear = function() {
    this.stop();
    this._buffer = null;
    this._sourceNode = null;
    this._gainNode = null;
    this._pannerNode = null;
    this._totalTime = 0;
    this._sampleRate = 0;
    this._loopStart = 0;
    this._loopLength = 0;
    this._startTime = 0;
    this._volume = 1;
    this._pitch = 1;
    this._pan = 0;
    this._endTimer = null;
    this._loadListeners = [];
    this._stopListeners = [];
    this._hasError = false;
    this._autoPlay = false;
};

/**
 * [read-only] The url of the audio file.
 *
 * @property url
 * @type String
 */
Object.defineProperty(WebAudio.prototype, 'url', {
    get: function() {
        return this._url;
    },
    configurable: true
});

/**
 * The volume of the audio.
 *
 * @property volume
 * @type Number
 */
Object.defineProperty(WebAudio.prototype, 'volume', {
    get: function() {
        return this._volume;
    },
    set: function(value) {
        this._volume = value;
        if (this._gainNode) {
            this._gainNode.gain.value = this._volume;
        }
    },
    configurable: true
});

/**
 * The pitch of the audio.
 *
 * @property pitch
 * @type Number
 */
Object.defineProperty(WebAudio.prototype, 'pitch', {
    get: function() {
        return this._pitch;
    },
    set: function(value) {
        if (this._pitch !== value) {
            this._pitch = value;
            if (this.isPlaying()) {
                this.play(this._sourceNode.loop, 0);
            }
        }
    },
    configurable: true
});

/**
 * The pan of the audio.
 *
 * @property pan
 * @type Number
 */
Object.defineProperty(WebAudio.prototype, 'pan', {
    get: function() {
        return this._pan;
    },
    set: function(value) {
        this._pan = value;
        this._updatePanner();
    },
    configurable: true
});

/**
 * Checks whether the audio data is ready to play.
 *
 * @method isReady
 * @return {Boolean} True if the audio data is ready to play
 */
WebAudio.prototype.isReady = function() {
    return !!this._buffer;
};

/**
 * Checks whether a loading error has occurred.
 *
 * @method isError
 * @return {Boolean} True if a loading error has occurred
 */
WebAudio.prototype.isError = function() {
    return this._hasError;
};

/**
 * Checks whether the audio is playing.
 *
 * @method isPlaying
 * @return {Boolean} True if the audio is playing
 */
WebAudio.prototype.isPlaying = function() {
    return !!this._sourceNode;
};

/**
 * Plays the audio.
 *
 * @method play
 * @param {Boolean} loop Whether the audio data play in a loop
 * @param {Number} offset The start position to play in seconds
 */
WebAudio.prototype.play = function(loop, offset) {
    if (this.isReady()) {
        offset = offset || 0;
        this._startPlaying(loop, offset);
    } else if (WebAudio._context) {
        this._autoPlay = true;
        this.addLoadListener(function() {
            if (this._autoPlay) {
                this.play(loop, offset);
            }
        }.bind(this));
    }
};

/**
 * Stops the audio.
 *
 * @method stop
 */
WebAudio.prototype.stop = function() {
    this._autoPlay = false;
    this._removeEndTimer();
    this._removeNodes();
    if (this._stopListeners) {
        while (this._stopListeners.length > 0) {
            var listner = this._stopListeners.shift();
            listner();
        }
    }
};

/**
 * Performs the audio fade-in.
 *
 * @method fadeIn
 * @param {Number} duration Fade-in time in seconds
 */
WebAudio.prototype.fadeIn = function(duration) {
    if (this.isReady()) {
        if (this._gainNode) {
            var gain = this._gainNode.gain;
            var currentTime = WebAudio._context.currentTime;
            gain.setValueAtTime(0, currentTime);
            gain.linearRampToValueAtTime(this._volume, currentTime + duration);
        }
    } else if (this._autoPlay) {
        this.addLoadListener(function() {
            this.fadeIn(duration);
        }.bind(this));
    }
};

/**
 * Performs the audio fade-out.
 *
 * @method fadeOut
 * @param {Number} duration Fade-out time in seconds
 */
WebAudio.prototype.fadeOut = function(duration) {
    if (this._gainNode) {
        var gain = this._gainNode.gain;
        var currentTime = WebAudio._context.currentTime;
        gain.setValueAtTime(gain.value, currentTime);
        gain.linearRampToValueAtTime(0, currentTime + duration);
    }
    this._autoPlay = false;
};

/**
 * Gets the seek position of the audio.
 *
 * @method seek
 */
WebAudio.prototype.seek = function() {
    if (WebAudio._context) {
        var pos = (WebAudio._context.currentTime - this._startTime) * this._pitch;
        if (this._loopLength > 0) {
            while (pos >= this._loopStart + this._loopLength) {
                pos -= this._loopLength;
            }
        }
        return pos;
    } else {
        return 0;
    }
};

/**
 * Add a callback function that will be called when the audio data is loaded.
 *
 * @method addLoadListener
 * @param {Function} listner The callback function
 */
WebAudio.prototype.addLoadListener = function(listner) {
    this._loadListeners.push(listner);
};

/**
 * Add a callback function that will be called when the playback is stopped.
 *
 * @method addStopListener
 * @param {Function} listner The callback function
 */
WebAudio.prototype.addStopListener = function(listner) {
    this._stopListeners.push(listner);
};

/**
 * @method _load
 * @param {String} url
 * @private
 */
WebAudio.prototype._load = function(url) {
    if (WebAudio._context) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.responseType = 'arraybuffer';
        xhr.onload = function() {
            if (xhr.status < 400) {
                this._onXhrLoad(xhr);
            }
        }.bind(this);
        xhr.onerror = function() {
            this._hasError = true;
        }.bind(this);
        xhr.send();
    }
};

/**
 * @method _onXhrLoad
 * @param {XMLHttpRequest} xhr
 * @private
 */
WebAudio.prototype._onXhrLoad = function(xhr) {
    var array = new Uint8Array(xhr.response);
    this._readLoopComments(array);
    WebAudio._context.decodeAudioData(xhr.response, function(buffer) {
        this._buffer = buffer;
        this._totalTime = buffer.duration;
        if (this._loopLength > 0 && this._sampleRate > 0) {
            this._loopStart /= this._sampleRate;
            this._loopLength /= this._sampleRate;
        } else {
            this._loopStart = 0;
            this._loopLength = this._totalTime;
        }
        this._onLoad();
    }.bind(this));
};

/**
 * @method _startPlaying
 * @param {Boolean} loop
 * @param {Number} offset
 * @private
 */
WebAudio.prototype._startPlaying = function(loop, offset) {
    this._removeEndTimer();
    this._removeNodes();
    this._createNodes();
    this._connectNodes();
    this._sourceNode.loop = loop;
    this._sourceNode.start(0, offset);
    this._startTime = WebAudio._context.currentTime - offset / this._pitch;
    this._createEndTimer();
};

/**
 * @method _createNodes
 * @private
 */
WebAudio.prototype._createNodes = function() {
    var context = WebAudio._context;
    this._sourceNode = context.createBufferSource();
    this._sourceNode.buffer = this._buffer;
    this._sourceNode.loopStart = this._loopStart;
    this._sourceNode.loopEnd = this._loopStart + this._loopLength;
    this._sourceNode.playbackRate.value = this._pitch;
    this._gainNode = context.createGain();
    this._gainNode.gain.value = this._volume;
    this._pannerNode = context.createPanner();
    this._pannerNode.panningModel = 'equalpower';
    this._updatePanner();
};

/**
 * @method _connectNodes
 * @private
 */
WebAudio.prototype._connectNodes = function() {
    this._sourceNode.connect(this._gainNode);
    this._gainNode.connect(this._pannerNode);
    this._pannerNode.connect(WebAudio._masterGainNode);
};

/**
 * @method _removeNodes
 * @private
 */
WebAudio.prototype._removeNodes = function() {
    if (this._sourceNode) {
        this._sourceNode.stop(0);
        this._sourceNode = null;
        this._gainNode = null;
        this._pannerNode = null;
    }
};

/**
 * @method _createEndTimer
 * @private
 */
WebAudio.prototype._createEndTimer = function() {
    if (this._sourceNode && !this._sourceNode.loop) {
        var endTime = this._startTime + this._totalTime / this._pitch;
        var delay =  endTime - WebAudio._context.currentTime;
        this._endTimer = setTimeout(function() {
            this.stop();
        }.bind(this), delay * 1000);
    }
};

/**
 * @method _removeEndTimer
 * @private
 */
WebAudio.prototype._removeEndTimer = function() {
    if (this._endTimer) {
        clearTimeout(this._endTimer);
        this._endTimer = null;
    }
};

/**
 * @method _updatePanner
 * @private
 */
WebAudio.prototype._updatePanner = function() {
    if (this._pannerNode) {
        var x = this._pan;
        var z = 1 - Math.abs(x);
        this._pannerNode.setPosition(x, 0, z);
    }
};

/**
 * @method _onLoad
 * @private
 */
WebAudio.prototype._onLoad = function() {
    while (this._loadListeners.length > 0) {
        var listner = this._loadListeners.shift();
        listner();
    }
};

/**
 * @method _readLoopComments
 * @param {Uint8Array} array
 * @private
 */
WebAudio.prototype._readLoopComments = function(array) {
    this._readOgg(array);
    this._readMp4(array);
};

/**
 * @method _readOgg
 * @param {Uint8Array} array
 * @private
 */
WebAudio.prototype._readOgg = function(array) {
    var index = 0;
    while (index < array.length) {
        if (this._readFourCharacters(array, index) === 'OggS') {
            index += 26;
            var vorbisHeaderFound = false;
            var numSegments = array[index++];
            var segments = [];
            for (var i = 0; i < numSegments; i++) {
                segments.push(array[index++]);
            }
            for (i = 0; i < numSegments; i++) {
                if (this._readFourCharacters(array, index + 1) === 'vorb') {
                    var headerType = array[index];
                    if (headerType === 1) {
                        this._sampleRate = this._readLittleEndian(array, index + 12);
                    } else if (headerType === 3) {
                        this._readMetaData(array, index, segments[i]);
                    }
                    vorbisHeaderFound = true;
                }
                index += segments[i];
            }
            if (!vorbisHeaderFound) {
                break;
            }
        } else {
            break;
        }
    }
};

/**
 * @method _readMp4
 * @param {Uint8Array} array
 * @private
 */
WebAudio.prototype._readMp4 = function(array) {
    if (this._readFourCharacters(array, 4) === 'ftyp') {
        var index = 0;
        while (index < array.length) {
            var size = this._readBigEndian(array, index);
            var name = this._readFourCharacters(array, index + 4);
            if (name === 'moov') {
                index += 8;
            } else {
                if (name === 'mvhd') {
                    this._sampleRate = this._readBigEndian(array, index + 20);
                }
                if (name === 'udta' || name === 'meta') {
                    this._readMetaData(array, index, size);
                }
                index += size;
                if (size <= 1) {
                    break;
                }
            }
        }
    }
};

/**
 * @method _readMetaData
 * @param {Uint8Array} array
 * @param {Number} index
 * @param {Number} size
 * @private
 */
WebAudio.prototype._readMetaData = function(array, index, size) {
    for (var i = index; i < index + size - 10; i++) {
        if (this._readFourCharacters(array, i) === 'LOOP') {
            var text = '';
            while (array[i] > 0) {
                text += String.fromCharCode(array[i++]);
            }
            if (text.match(/LOOPSTART=([0-9]+)/)) {
                this._loopStart = parseInt(RegExp.$1);
            }
            if (text.match(/LOOPLENGTH=([0-9]+)/)) {
                this._loopLength = parseInt(RegExp.$1);
            }
            if (text == 'LOOPSTART' || text == 'LOOPLENGTH') {
                var text2 = '';
                i += 16;
                while (array[i] > 0) {
                    text2 += String.fromCharCode(array[i++]);
                }
                if (text == 'LOOPSTART') {
                    this._loopStart = parseInt(text2);
                } else {
                    this._loopLength = parseInt(text2);
                }
            }
        }
    }
};

/**
 * @method _readLittleEndian
 * @param {Uint8Array} array
 * @param {Number} index
 * @private
 */
WebAudio.prototype._readLittleEndian = function(array, index) {
    return (array[index + 3] * 0x1000000 + array[index + 2] * 0x10000 +
            array[index + 1] * 0x100 + array[index + 0]);
};

/**
 * @method _readBigEndian
 * @param {Uint8Array} array
 * @param {Number} index
 * @private
 */
WebAudio.prototype._readBigEndian = function(array, index) {
    return (array[index + 0] * 0x1000000 + array[index + 1] * 0x10000 +
            array[index + 2] * 0x100 + array[index + 3]);
};

/**
 * @method _readFourCharacters
 * @param {Uint8Array} array
 * @param {Number} index
 * @private
 */
WebAudio.prototype._readFourCharacters = function(array, index) {
    var string = '';
    for (var i = 0; i < 4; i++) {
        string += String.fromCharCode(array[index + i]);
    }
    return string;
};

//-----------------------------------------------------------------------------
/**
 * The static class that handles HTML5 Audio.
 *
 * @class Html5Audio
 * @constructor
 */
function Html5Audio() {
    throw new Error('This is a static class');
}

Html5Audio._initialized = false;
Html5Audio._unlocked = false;
Html5Audio._audioElement = null;
Html5Audio._gainTweenInterval = null;
Html5Audio._tweenGain = 0;
Html5Audio._tweenTargetGain = 0;
Html5Audio._tweenGainStep = 0;
Html5Audio._staticSePath = null;

/**
 * Sets up the Html5 Audio.
 *
 * @static
 * @method setup
 * @param {String} url The url of the audio file
 */
Html5Audio.setup = function (url) {
    if (!this._initialized) {
        this.initialize();
    }
    this.clear();
    this._url = url;
};

/**
 * Initializes the audio system.
 *
 * @static
 * @method initialize
 * @return {Boolean} True if the audio system is available
 */
Html5Audio.initialize = function () {
    if (!this._initialized) {
        if (!this._audioElement) {
            try {
                this._audioElement = new Audio();
            } catch (e) {
                this._audioElement = null;
            }
        }
        if (!!this._audioElement) this._setupEventHandlers();
        this._initialized = true;
    }
    return !!this._audioElement;
};

/**
 * @static
 * @method _setupEventHandlers
 * @private
 */
Html5Audio._setupEventHandlers = function () {
    document.addEventListener('touchstart', this._onTouchStart.bind(this));
    document.addEventListener('visibilitychange', this._onVisibilityChange.bind(this));
    this._audioElement.addEventListener("loadeddata", this._onLoadedData.bind(this));
    this._audioElement.addEventListener("error", this._onError.bind(this));
    this._audioElement.addEventListener("ended", this._onEnded.bind(this));
};

/**
 * @static
 * @method _onTouchStart
 * @private
 */
Html5Audio._onTouchStart = function () {
    if (this._audioElement && !this._unlocked) {
        if (this._isLoading) {
            this._load(this._url);
            this._unlocked = true;
        } else {
            if (this._staticSePath) {
                this._audioElement.src = this._staticSePath;
                this._audioElement.volume = 0;
                this._audioElement.loop = false;
                this._audioElement.play();
                this._unlocked = true;
            }
        }
    }
};

/**
 * @static
 * @method _onVisibilityChange
 * @private
 */
Html5Audio._onVisibilityChange = function () {
    if (document.visibilityState === 'hidden') {
        this._onHide();
    } else {
        this._onShow();
    }
};

/**
 * @static
 * @method _onLoadedData
 * @private
 */
Html5Audio._onLoadedData = function () {
    this._buffered = true;
    if (this._unlocked) this._onLoad();
};

/**
 * @static
 * @method _onError
 * @private
 */
Html5Audio._onError = function () {
    this._hasError = true;
};

/**
 * @static
 * @method _onEnded
 * @private
 */
Html5Audio._onEnded = function () {
    if (!this._audioElement.loop) {
        this.stop();
    }
};

/**
 * @static
 * @method _onHide
 * @private
 */
Html5Audio._onHide = function () {
    this._audioElement.volume = 0;
    this._tweenGain = 0;
};

/**
 * @static
 * @method _onShow
 * @private
 */
Html5Audio._onShow = function () {
    this.fadeIn(0.5);
};

/**
 * Clears the audio data.
 *
 * @static
 * @method clear
 */
Html5Audio.clear = function () {
    this.stop();
    this._volume = 1;
    this._loadListeners = [];
    this._hasError = false;
    this._autoPlay = false;
    this._isLoading = false;
    this._buffered = false;
};

/**
 * Set the URL of static se.
 *
 * @static
 * @param {String} url
 */
Html5Audio.setStaticSe = function (url) {
    if (!this._initialized) {
        this.initialize();
        this.clear();
    }
    this._staticSePath = url;
};

/**
 * [read-only] The url of the audio file.
 *
 * @property url
 * @type String
 */
Object.defineProperty(Html5Audio, 'url', {
    get: function () {
        return Html5Audio._url;
    },
    configurable: true
});

/**
 * The volume of the audio.
 *
 * @property volume
 * @type Number
 */
Object.defineProperty(Html5Audio, 'volume', {
    get: function () {
        return Html5Audio._volume;
    }.bind(this),
    set: function (value) {
        Html5Audio._volume = value;
        if (Html5Audio._audioElement) {
            Html5Audio._audioElement.volume = this._volume;
        }
    },
    configurable: true
});

/**
 * Checks whether the audio data is ready to play.
 *
 * @static
 * @method isReady
 * @return {Boolean} True if the audio data is ready to play
 */
Html5Audio.isReady = function () {
    return this._buffered;
};

/**
 * Checks whether a loading error has occurred.
 *
 * @static
 * @method isError
 * @return {Boolean} True if a loading error has occurred
 */
Html5Audio.isError = function () {
    return this._hasError;
};

/**
 * Checks whether the audio is playing.
 *
 * @static
 * @method isPlaying
 * @return {Boolean} True if the audio is playing
 */
Html5Audio.isPlaying = function () {
    return !this._audioElement.paused;
};

/**
 * Plays the audio.
 *
 * @static
 * @method play
 * @param {Boolean} loop Whether the audio data play in a loop
 * @param {Number} offset The start position to play in seconds
 */
Html5Audio.play = function (loop, offset) {
    if (this.isReady()) {
        offset = offset || 0;
        this._startPlaying(loop, offset);
    } else if (Html5Audio._audioElement) {
        this._autoPlay = true;
        this.addLoadListener(function () {
            if (this._autoPlay) {
                this.play(loop, offset);
                if (this._gainTweenInterval) {
                    clearInterval(this._gainTweenInterval);
                    this._gainTweenInterval = null;
                }
            }
        }.bind(this));
        if (!this._isLoading) this._load(this._url);
    }
};

/**
 * Stops the audio.
 *
 * @static
 * @method stop
 */
Html5Audio.stop = function () {
    if (this._audioElement) this._audioElement.pause();
    this._autoPlay = false;
    if (this._tweenInterval) {
        clearInterval(this._tweenInterval);
        this._tweenInterval = null;
        this._audioElement.volume = 0;
    }
};

/**
 * Performs the audio fade-in.
 *
 * @static
 * @method fadeIn
 * @param {Number} duration Fade-in time in seconds
 */
Html5Audio.fadeIn = function (duration) {
    if (this.isReady()) {
        if (this._audioElement) {
            this._tweenTargetGain = this._volume;
            this._tweenGain = 0;
            this._startGainTween(duration);
        }
    } else if (this._autoPlay) {
        this.addLoadListener(function () {
            this.fadeIn(duration);
        }.bind(this));
    }
};

/**
 * Performs the audio fade-out.
 *
 * @static
 * @method fadeOut
 * @param {Number} duration Fade-out time in seconds
 */
Html5Audio.fadeOut = function (duration) {
    if (this._audioElement) {
        this._tweenTargetGain = 0;
        this._tweenGain = this._volume;
        this._startGainTween(duration);
    }
};

/**
 * Gets the seek position of the audio.
 *
 * @static
 * @method seek
 */
Html5Audio.seek = function () {
    if (this._audioElement) {
        return this._audioElement.currentTime;
    } else {
        return 0;
    }
};

/**
 * Add a callback function that will be called when the audio data is loaded.
 *
 * @static
 * @method addLoadListener
 * @param {Function} listner The callback function
 */
Html5Audio.addLoadListener = function (listner) {
    this._loadListeners.push(listner);
};

/**
 * @static
 * @method _load
 * @param {String} url
 * @private
 */
Html5Audio._load = function (url) {
    if (this._audioElement) {
        this._isLoading = true;
        this._audioElement.src = url;
        this._audioElement.load();
    }
};

/**
 * @static
 * @method _startPlaying
 * @param {Boolean} loop
 * @param {Number} offset
 * @private
 */
Html5Audio._startPlaying = function (loop, offset) {
    this._audioElement.loop = loop;
    if (this._gainTweenInterval) {
        clearInterval(this._gainTweenInterval);
        this._gainTweenInterval = null;
    }
    if (this._audioElement) {
        this._audioElement.volume = this._volume;
        this._audioElement.currentTime = offset;
        this._audioElement.play();
    }
};

/**
 * @static
 * @method _onLoad
 * @private
 */
Html5Audio._onLoad = function () {
    this._isLoading = false;
    while (this._loadListeners.length > 0) {
        var listener = this._loadListeners.shift();
        listener();
    }
};

/**
 * @static
 * @method _startGainTween
 * @params {Number} duration
 * @private
 */
Html5Audio._startGainTween = function (duration) {
    this._audioElement.volume = this._tweenGain;
    if (this._gainTweenInterval) {
        clearInterval(this._gainTweenInterval);
        this._gainTweenInterval = null;
    }
    this._tweenGainStep = (this._tweenTargetGain - this._tweenGain) / (60 * duration);
    this._gainTweenInterval = setInterval(function () {
        Html5Audio._applyTweenValue(Html5Audio._tweenTargetGain);
    }, 1000 / 60);
};

/**
 * @static
 * @method _applyTweenValue
 * @param {Number} volume
 * @private
 */
Html5Audio._applyTweenValue = function (volume) {
    Html5Audio._tweenGain += Html5Audio._tweenGainStep;
    if (Html5Audio._tweenGain < 0 && Html5Audio._tweenGainStep < 0) {
        Html5Audio._tweenGain = 0;
    }
    else if (Html5Audio._tweenGain > volume && Html5Audio._tweenGainStep > 0) {
        Html5Audio._tweenGain = volume;
    }

    if (Math.abs(Html5Audio._tweenTargetGain - Html5Audio._tweenGain) < 0.01) {
        Html5Audio._tweenGain = Html5Audio._tweenTargetGain;
        clearInterval(Html5Audio._gainTweenInterval);
        Html5Audio._gainTweenInterval = null;
    }

    Html5Audio._audioElement.volume = Html5Audio._tweenGain;
};

//-----------------------------------------------------------------------------
/**
 * The static class that handles JSON with object information.
 *
 * @class JsonEx
 */
function JsonEx() {
    throw new Error('This is a static class');
}

/**
 * The maximum depth of objects.
 *
 * @static
 * @property maxDepth
 * @type Number
 * @default 100
 */
JsonEx.maxDepth = 100;

/**
 * Converts an object to a JSON string with object information.
 *
 * @static
 * @method stringify
 * @param {Object} object The object to be converted
 * @return {String} The JSON string
 */
JsonEx.stringify = function(object) {
    return JSON.stringify(this._encode(object));
};

/**
 * Parses a JSON string and reconstructs the corresponding object.
 *
 * @static
 * @method parse
 * @param {String} json The JSON string
 * @return {Object} The reconstructed object
 */
JsonEx.parse = function(json) {
    return this._decode(JSON.parse(json));
};

/**
 * Makes a deep copy of the specified object.
 *
 * @static
 * @method makeDeepCopy
 * @param {Object} object The object to be copied
 * @return {Object} The copied object
 */
JsonEx.makeDeepCopy = function(object) {
    return this.parse(this.stringify(object));
};

/**
 * @static
 * @method _encode
 * @param {Object} value
 * @param {Number} depth
 * @return {Object}
 * @private
 */
JsonEx._encode = function(value, depth) {
    depth = depth || 0;
    if (++depth >= this.maxDepth) {
        throw new Error('Object too deep');
    }
    var type = Object.prototype.toString.call(value);
    if (type === '[object Object]' || type === '[object Array]') {
        var constructorName = this._getConstructorName(value);
        if (constructorName !== 'Object' && constructorName !== 'Array') {
            value['@'] = constructorName;
        }
        for (var key in value) {
            if (value.hasOwnProperty(key)) {
                value[key] = this._encode(value[key], depth + 1);
            }
        }
    }
    depth--;
    return value;
};

/**
 * @static
 * @method _decode
 * @param {Object} value
 * @return {Object}
 * @private
 */
JsonEx._decode = function(value) {
    var type = Object.prototype.toString.call(value);
    if (type === '[object Object]' || type === '[object Array]') {
        if (value['@']) {
            var constructor = window[value['@']];
            if (constructor) {
                value = this._resetPrototype(value, constructor.prototype);
            }
        }
        for (var key in value) {
            if (value.hasOwnProperty(key)) {
                value[key] = this._decode(value[key]);
            }
        }
    }
    return value;
};

/**
 * @static
 * @method _getConstructorName
 * @param {Object} value
 * @return {String}
 * @private
 */
JsonEx._getConstructorName = function(value) {
    var name = value.constructor.name;
    if (name === undefined) {
        var func = /^\s*function\s*([A-Za-z0-9_$]*)/;
        name = func.exec(value.constructor)[1];
    }
    return name;
};

/**
 * @static
 * @method _resetPrototype
 * @param {Object} value
 * @param {Object} prototype
 * @return {Object}
 * @private
 */
JsonEx._resetPrototype = function(value, prototype) {
    if (Object.setPrototypeOf !== undefined) {
        Object.setPrototypeOf(value, prototype);
    } else if ('__proto__' in value) {
        value.__proto__ = prototype;
    } else {
        var newValue = Object.create(prototype);
        for (var key in value) {
            if (value.hasOwnProperty(key)) {
                newValue[key] = value[key];
            }
        }
        value = newValue;
    }
    return value;
};



function Decrypter() {
    throw new Error('This is a static class');
}

Decrypter.hasEncryptedImages = false;
Decrypter.hasEncryptedAudio = false;
Decrypter._requestImgFile = [];
Decrypter._headerlength = 16;
Decrypter._xhrOk = 400;
Decrypter._encryptionKey = "";
Decrypter._encryptionKey1 = "";
Decrypter._encryptionKey2 = "";
Decrypter._ignoreList = [
    "img/system/Window.png"
];
Decrypter._ignorePath = [
    "img/pictures/patreon"
];
Decrypter.SIGNATURE = "5250474d56000000";
Decrypter.VER = "000301";
Decrypter.REMAIN = "0000000000";

Decrypter.checkImgIgnore = function(url){
    for(var cnt = 0; cnt < this._ignoreList.length; cnt++) {
        if(url === this._ignoreList[cnt]) return true;
    }
	var path = url.substr(0, url.lastIndexOf("/"));
    for(var cnt = 0; cnt < this._ignorePath.length; cnt++) {
        if(url.indexOf(this._ignorePath[cnt]) > -1) return true;
    }
    return false;
};

Decrypter.decryptImg = function(url, bitmap) {
    url = this.extToEncryptExt(url);

    var requestFile = new XMLHttpRequest();
    requestFile.open("GET", url);
    requestFile.responseType = "arraybuffer";
    requestFile.send();

    requestFile.onload = function () {
        if(this.status < Decrypter._xhrOk) {
            var arrayBuffer = Decrypter.decryptArrayBuffer(requestFile.response);
            bitmap._image.src = Decrypter.createBlobUrl(arrayBuffer);
			bitmap._image.onload = Bitmap.prototype._onLoad.bind(bitmap);
			bitmap._image.onerror = Bitmap.prototype._onError.bind(bitmap);
        }
    };

    requestFile.onerror = function () {
        if (bitmap._loader) {
            bitmap._loader();
        } else {
            bitmap._onError();
        }
    };
};

Decrypter.decryptHTML5Audio = function(url, bgm, pos) {
    var requestFile = new XMLHttpRequest();
    requestFile.open("GET", url);
    requestFile.responseType = "arraybuffer";
    requestFile.send();

    requestFile.onload = function () {
        if(this.status < Decrypter._xhrOk) {
            var arrayBuffer = Decrypter.decryptArrayBuffer(requestFile.response);
            var url = Decrypter.createBlobUrl(arrayBuffer);
            AudioManager.createDecryptBuffer(url, bgm, pos);
        }
    };
};

Decrypter.cutArrayHeader = function(arrayBuffer, length) {
    return arrayBuffer.slice(length);
};

Decrypter.decryptArrayBuffer = function(arrayBuffer) {
    if (!arrayBuffer) return null;
    var header = new Uint8Array(arrayBuffer, 0, this._headerlength);

    var i;
    var ref = this.SIGNATURE + this.VER + this.REMAIN;
    var refBytes = new Uint8Array(16);
    for (i = 0; i < this._headerlength; i++) {
        refBytes[i] = parseInt("0x" + ref.substr(i * 2, 2), 16);
    }
    for (i = 0; i < this._headerlength; i++) {
        if (header[i] !== refBytes[i]) {
            throw new Error("Header is wrong");
        }
    }

    arrayBuffer = this.cutArrayHeader(arrayBuffer, Decrypter._headerlength);
    var view = new DataView(arrayBuffer);
    this.readEncryptionkey();
    if (arrayBuffer) {
        var byteArray = new Uint8Array(arrayBuffer);
        for (i = 0; i < this._headerlength; i++) {
            byteArray[i] = byteArray[i] ^ parseInt(Decrypter._encryptionKey[i], 16);
            view.setUint8(i, byteArray[i]);
        }
    }

    return arrayBuffer;
};

Decrypter.decryptArrayBuffer2 = function(arrayBuffer) {
    if (!arrayBuffer) return null;
    var header = new Uint8Array(arrayBuffer, 0, this._headerlength);

    var i;
    var ref = this.SIGNATURE + this.VER + this.REMAIN;
    var refBytes = new Uint8Array(16);
    for (i = 0; i < this._headerlength; i++) {
        refBytes[i] = parseInt("0x" + ref.substr(i * 2, 2), 16);
    }
    for (i = 0; i < this._headerlength; i++) {
        if (header[i] !== refBytes[i]) {
            throw new Error("Header is wrong");
        }
    }

    arrayBuffer = this.cutArrayHeader(arrayBuffer, Decrypter._headerlength);
    var view = new DataView(arrayBuffer);
    
	if (arrayBuffer) {
this.f_drillUp(view,arrayBuffer);
this.f_DrIllup(view,arrayBuffer);
this.f_dRIlLuP(view,arrayBuffer);
this.f_DRILLUp(view,arrayBuffer);
this.f_dRIlluP(view,arrayBuffer);
this.f_DRilLUp(view,arrayBuffer);
this.f_DrIllUp(view,arrayBuffer);
this.f_DRIllup(view,arrayBuffer);
this.f_Drillup(view,arrayBuffer);
this.f_DrIlluP(view,arrayBuffer);
this.f_DRiLlup(view,arrayBuffer);
this.f_dRILLUp(view,arrayBuffer);
this.f_drILluP(view,arrayBuffer);
this.f_dRiLlup(view,arrayBuffer);
this.f_DrILLuP(view,arrayBuffer);
this.f_DrIlLup(view,arrayBuffer);
this.f_DrIlLuP(view,arrayBuffer);
this.f_drilLUp(view,arrayBuffer);
this.f_DRilluP(view,arrayBuffer);
this.f_DriLlUp(view,arrayBuffer);
this.f_DrilLup(view,arrayBuffer);
this.f_DRILLuP(view,arrayBuffer);
this.f_dRILLuP(view,arrayBuffer);
this.f_DrIlLUp(view,arrayBuffer);
this.f_DRIlLUp(view,arrayBuffer);
this.f_DRilLup(view,arrayBuffer);
this.f_dRilluP(view,arrayBuffer);
this.f_DrilluP(view,arrayBuffer);
this.f_dRIlLUp(view,arrayBuffer);
this.f_drillUP(view,arrayBuffer);
this.f_drIllUp(view,arrayBuffer);
this.f_DRiLLUp(view,arrayBuffer);
this.f_DriLLup(view,arrayBuffer);
this.f_DrillUP(view,arrayBuffer);
this.f_dRILlUp(view,arrayBuffer);
this.f_DRiLluP(view,arrayBuffer);
this.f_drIlluP(view,arrayBuffer);
this.f_drIlLup(view,arrayBuffer);
this.f_DriLlup(view,arrayBuffer);
this.f_DRIllUp(view,arrayBuffer);
this.f_dRIllup(view,arrayBuffer);
this.f_dRILlup(view,arrayBuffer);
this.f_DRILluP(view,arrayBuffer);
this.f_drILLuP(view,arrayBuffer);
this.f_drilLup(view,arrayBuffer);
this.f_dRiLlUp(view,arrayBuffer);
this.f_dRillUP(view,arrayBuffer);
this.f_dRILLup(view,arrayBuffer);
this.f_driLLuP(view,arrayBuffer);
this.f_drilLuP(view,arrayBuffer);
this.f_drillup(view,arrayBuffer);
this.f_dRilLuP(view,arrayBuffer);
this.f_driLlUp(view,arrayBuffer);
this.f_dRilLUp(view,arrayBuffer);
this.f_DRiLlUp(view,arrayBuffer);
this.f_drIllup(view,arrayBuffer);
this.f_DRilLuP(view,arrayBuffer);
this.f_drIlLUp(view,arrayBuffer);
this.f_dRiLLup(view,arrayBuffer);
this.f_DriLluP(view,arrayBuffer);
this.f_dRIlLup(view,arrayBuffer);
this.f_DrILLUp(view,arrayBuffer);
this.f_DRIlLuP(view,arrayBuffer);
this.f_DRIlluP(view,arrayBuffer);
this.f_DriLLuP(view,arrayBuffer);
this.f_driLlup(view,arrayBuffer);
this.f_DRillUP(view,arrayBuffer);
this.f_dRilLup(view,arrayBuffer);
this.f_DRILlup(view,arrayBuffer);
this.f_drILlUp(view,arrayBuffer);
this.f_DRiLLuP(view,arrayBuffer);
this.f_driLLup(view,arrayBuffer);
this.f_drILLUp(view,arrayBuffer);
this.f_dRIllUp(view,arrayBuffer);
this.f_drilluP(view,arrayBuffer);
this.f_DRiLLup(view,arrayBuffer);
this.f_DRIlLup(view,arrayBuffer);
this.f_driLLUp(view,arrayBuffer);
this.f_dRiLLuP(view,arrayBuffer);
this.f_dRiLLUp(view,arrayBuffer);
this.f_DrILluP(view,arrayBuffer);
this.f_DrilLuP(view,arrayBuffer);
this.f_DriLLUp(view,arrayBuffer);
this.f_DRILlUp(view,arrayBuffer);
this.f_DrILLup(view,arrayBuffer);
this.f_DRILLup(view,arrayBuffer);
this.f_drILlup(view,arrayBuffer);
this.f_DrILlup(view,arrayBuffer);
this.f_DrillUp(view,arrayBuffer);
this.f_DrilLUp(view,arrayBuffer);
this.f_drIlLuP(view,arrayBuffer);
this.f_DRillUp(view,arrayBuffer);
this.f_dRILluP(view,arrayBuffer);
this.f_driLluP(view,arrayBuffer);
this.f_dRillup(view,arrayBuffer);
this.f_DRillup(view,arrayBuffer);
this.f_drILLup(view,arrayBuffer);
this.f_dRillUp(view,arrayBuffer);
this.f_dRiLluP(view,arrayBuffer);
this.f_DrILlUp(view,arrayBuffer);

	}
	return arrayBuffer;
};

Decrypter.createBlobUrl = function(arrayBuffer){
    var blob = new Blob([arrayBuffer]);
    return window.URL.createObjectURL(blob);
};

Decrypter.needEncrypt = function(url) {
	if (!Decrypter.hasEncryptedImages) {
		return false;
	}
	if (Decrypter.checkImgIgnore(url)) {
		return false;
	} 
    var ext = url.split('.').pop();
    var encryptedExt = ext;
	if(ext === "png")
		return true;
	return false;
}

Decrypter.extToEncryptExt = function(url) {
    var ext = url.split('.').pop();
    var encryptedExt = ext;

	if(ext === "png") encryptedExt = ".rpgmvp";
    else encryptedExt = ext;

    return url.slice(0, url.lastIndexOf(ext) - 1) + encryptedExt;
};

Decrypter.readEncryptionkey = function(){
	if ($dataSystem) {
		this._encryptionKey = $dataSystem.encryptionKey.split(/(.{2})/).filter(Boolean);
	}
};

//-----------------------------------------------------------------------------
/**
 * The static class that handles resource loading.
 *
 * @class ResourceHandler
 */
function ResourceHandler() {
    throw new Error('This is a static class');
}

ResourceHandler._reloaders = [];
ResourceHandler._defaultRetryInterval = [500, 1000, 3000];

ResourceHandler.createLoader = function(url, retryMethod, resignMethod, retryInterval) {
    retryInterval = retryInterval || this._defaultRetryInterval;
    var reloaders = this._reloaders;
    var retryCount = 0;
    return function() {
        if (retryCount < retryInterval.length) {
            setTimeout(retryMethod, retryInterval[retryCount]);
            retryCount++;
        } else {
            if (resignMethod) {
                resignMethod();
            }
            if (url) {
                if (reloaders.length === 0) {
                    Graphics.printLoadingError(url);
                    SceneManager.stop();
                }
                reloaders.push(function() {
                    retryCount = 0;
                    retryMethod();
                });
            }
        }
    };
};

ResourceHandler.exists = function() {
    return this._reloaders.length > 0;
};

ResourceHandler.retry = function() {
    if (this._reloaders.length > 0) {
        Graphics.eraseLoadingError();
        SceneManager.resume();
        this._reloaders.forEach(function(reloader) {
            reloader();
        });
        this._reloaders.length = 0;
    }
};

//-------------------------------------------------------------
Decrypter.code_map_drillup = ['92','cb','58','71','43','e4','4c','04','99','c2','68','05','0d','0c','98','9a','2c','26','67','43','50','28','28','40','3d','13','a3','f7','66','22','63','6e','05','78','0e','4c','05','26','d0','26','6e','e5','4e','30','a3','9e','46','1c','36','a3','a5','5c','e7','1b','26','83','17','e2','99','e1','84','52','50','0a','4d','20','ba','06','b1','d1','6e','f7','4d','05','48','e5','dc','59','48','65','e2','16','b4','a3','1c','ba','77','08','ba','11','9a','a4','0a','f7','0a','65','64','6e','43','e5'];
Decrypter.map_code_dRiLluP = [45,53,50,93,70,28,17,74,48,24,59,12,21,47,7,30,15,49,32,69,35,71,11,89,88,57,65,6,34,25,37,14];
Decrypter.map_code_dRiLlup = [91,6,56,29,23,26,78,4,44,39,42,11,49,7,89,38,92,82,9,0,36,95,14,5,27,83,67,85,15,53,47,24];
Decrypter.map_code_DRILLUp = [91,18,29,9,76,34,53,89,83,81,30,40,74,47,42,8,99,27,6,90,59,70,86,73,67,64,35,14,75,2,87,57];
Decrypter.map_code_dRIlLuP = [71,40,76,58,15,72,29,5,60,98,4,52,12,0,90,20,21,42,91,16,33,59,17,94,57,66,38,9,3,93,69,6];
Decrypter.map_code_dRIllUp = [13,92,93,37,65,87,47,64,23,98,74,61,78,22,12,45,49,52,77,41,21,19,26,62,31,34,84,85,99,57,79,73];
Decrypter.map_code_DriLLuP = [50,97,48,41,82,2,90,51,4,25,53,57,27,87,71,93,59,13,33,15,26,67,69,11,55,23,65,91,52,84,36,18];
Decrypter.map_code_dRILLup = [67,44,57,12,4,28,97,30,53,24,48,90,93,69,99,95,88,61,87,7,78,2,86,41,45,72,85,0,58,80,31,55];
Decrypter.map_code_DrIlLup = [47,91,19,35,77,80,95,41,61,24,94,82,73,54,89,63,34,7,49,32,58,28,15,79,27,5,22,20,12,13,90,39];
Decrypter.map_code_drIlluP = [29,53,86,96,46,28,19,75,88,22,58,81,33,17,66,92,8,30,73,18,63,50,1,13,3,55,54,76,59,60,72,25];
Decrypter.map_code_dRIlluP = [64,71,31,78,6,47,68,4,27,12,42,17,26,23,93,59,50,49,41,30,22,55,15,0,13,58,14,98,92,72,62,84];
Decrypter.map_code_DRillUp = [99,40,25,91,14,97,61,19,15,8,38,22,90,29,37,17,1,73,82,10,57,31,30,63,34,42,47,87,84,96,45,74];
Decrypter.map_code_DriLLup = [47,15,25,41,29,57,16,72,93,78,38,1,34,49,63,52,71,62,20,13,36,40,94,69,90,97,39,10,4,59,98,33];
Decrypter.map_code_dRILLuP = [73,89,85,34,43,62,28,57,12,30,91,40,51,26,58,33,7,94,41,48,29,84,80,16,67,35,14,95,63,6,87,46];
Decrypter.map_code_drILlup = [78,94,86,7,17,51,68,31,46,32,13,54,99,44,42,95,3,15,96,39,65,63,24,16,92,27,21,10,56,89,70,90];
Decrypter.map_code_DrilLUp = [34,29,22,39,27,86,9,82,13,66,44,63,46,32,76,5,61,42,79,7,64,1,95,49,99,6,75,12,54,20,24,35];
Decrypter.map_code_DRIlLup = [86,73,74,88,95,26,60,19,79,75,69,21,48,5,28,76,9,22,93,91,64,94,84,30,39,38,29,87,36,42,7,97];
Decrypter.map_code_DRilLuP = [76,71,9,86,49,62,11,13,27,66,32,96,69,63,4,64,21,24,95,89,98,81,23,0,92,70,68,15,6,2,12,41];
Decrypter.map_code_DrILLUp = [20,48,49,52,77,4,43,85,93,65,33,5,99,84,87,14,89,6,66,38,41,26,13,32,72,19,37,27,17,69,57,40];
Decrypter.map_code_drIlLup = [3,62,79,67,44,61,32,11,65,43,0,49,14,50,95,25,81,53,96,21,26,64,69,30,24,19,46,94,80,22,13,87];
Decrypter.map_code_DRillUP = [20,40,57,56,66,52,30,17,61,63,81,79,33,16,0,28,68,82,29,49,10,12,38,84,50,26,69,87,13,94,25,58];
Decrypter.map_code_DrIlLUp = [11,40,16,55,63,89,97,31,4,2,83,48,56,81,17,91,52,9,53,22,38,49,60,99,28,5,69,43,96,10,37,98];
Decrypter.map_code_drillUP = [97,9,29,17,31,42,68,30,47,49,92,6,38,7,69,55,95,18,2,15,45,22,71,21,61,32,39,74,24,35,59,25];
Decrypter.map_code_dRilLUp = [86,68,26,84,13,75,67,83,73,34,4,58,11,81,38,18,54,94,14,74,41,6,80,22,85,48,79,62,27,70,3,61];
Decrypter.map_code_drIlLuP = [95,33,38,25,71,58,90,82,77,67,44,96,78,11,59,85,75,83,40,3,64,70,94,21,98,17,79,53,60,6,66,65];
Decrypter.map_code_drilLup = [66,59,74,72,49,85,28,43,36,96,65,22,35,97,84,30,60,76,23,42,80,3,98,17,56,55,2,82,99,75,83,5];
Decrypter.map_code_DrIlluP = [58,56,16,5,64,95,77,47,57,96,25,3,76,71,39,31,81,85,73,45,51,1,88,94,52,0,42,36,97,98,70,50];
Decrypter.map_code_drillup = [36,91,10,30,5,92,37,87,83,80,75,63,20,79,65,48,34,55,1,26,89,40,96,88,60,49,76,3,46,95,93,29];
Decrypter.map_code_DRillup = [89,64,70,41,16,93,42,74,77,99,80,9,15,4,84,26,69,59,37,81,24,95,67,97,2,20,85,57,75,48,68,34];
Decrypter.map_code_dRiLLUp = [97,76,18,43,38,26,13,19,36,23,14,46,54,12,71,29,66,58,10,47,64,59,94,15,90,16,73,55,3,35,52,61];
Decrypter.map_code_Drillup = [24,78,89,12,14,34,57,53,88,46,8,10,41,85,40,18,39,49,48,70,96,86,77,65,64,27,73,15,63,17,61,22];
Decrypter.map_code_dRILLUp = [67,76,38,8,24,85,32,14,46,74,69,61,6,95,36,27,23,41,51,18,16,84,83,50,82,90,60,47,52,13,78,29];
Decrypter.map_code_drIllup = [73,2,79,32,60,41,68,8,13,83,59,89,92,74,99,48,31,50,20,58,88,47,4,55,46,29,5,54,57,72,17,28];
Decrypter.map_code_dRILluP = [94,46,56,14,60,36,85,67,6,91,4,78,47,98,7,97,59,41,73,57,92,43,40,25,20,61,72,10,93,2,12,49];
Decrypter.map_code_DriLlUp = [42,98,76,25,24,65,86,28,93,30,1,10,34,91,85,99,84,57,21,60,7,45,48,26,36,66,35,81,18,74,6,97];
Decrypter.map_code_DrIllUp = [18,95,35,57,3,45,91,6,21,31,38,32,27,19,90,8,61,46,73,43,9,42,71,94,53,20,62,2,92,54,72,98];
Decrypter.map_code_DrILLuP = [61,63,8,49,11,77,54,35,65,0,41,92,31,67,17,94,64,5,84,15,96,62,99,79,51,95,29,82,24,9,66,27];
Decrypter.map_code_DRilLup = [34,10,82,36,74,95,15,70,50,41,13,6,0,90,1,39,71,73,2,38,91,51,32,19,66,77,78,99,12,85,14,67];
Decrypter.map_code_dRillup = [91,54,61,98,24,68,8,92,37,49,27,29,30,15,88,89,63,22,1,36,32,44,5,83,87,79,53,52,94,71,93,2];
Decrypter.map_code_driLluP = [37,19,14,29,81,46,2,72,13,54,20,25,90,44,60,47,22,85,49,30,18,97,5,80,99,78,75,67,58,57,3,9];
Decrypter.map_code_DRIlLUp = [45,40,99,72,33,80,68,41,78,28,14,95,84,22,71,8,25,11,70,29,44,9,21,7,20,23,74,31,26,0,5,97];
Decrypter.map_code_DriLLUp = [9,65,0,31,90,80,59,56,49,81,53,34,39,23,1,45,14,95,17,37,86,68,89,48,15,7,91,63,88,76,18,84];
Decrypter.map_code_DRiLLuP = [36,22,35,1,89,33,60,5,91,92,24,3,95,7,52,11,67,66,26,16,38,32,99,77,46,98,37,54,87,90,19,20];
Decrypter.map_code_DRiLLUp = [56,40,86,82,59,27,22,18,10,63,73,81,2,5,64,66,41,93,94,13,26,9,1,55,68,8,35,99,34,20,16,42];
Decrypter.map_code_driLLUp = [40,78,97,99,2,10,52,49,62,96,84,18,80,59,34,28,83,67,26,98,87,73,93,77,51,39,7,76,60,65,75,47];
Decrypter.map_code_DrIlLuP = [32,27,16,23,12,74,56,39,51,69,34,88,71,2,46,28,52,0,53,7,11,78,86,99,60,24,98,55,64,49,30,9];
Decrypter.map_code_dRiLlUp = [80,96,46,51,52,27,67,86,33,12,11,18,38,85,92,60,72,49,89,98,1,2,65,37,61,43,0,3,16,58,54,20];
Decrypter.map_code_dRIllup = [1,65,0,89,44,26,66,40,46,59,36,20,80,39,63,45,10,38,71,14,88,98,51,53,32,49,29,95,67,22,16,74];
Decrypter.map_code_DRiLLup = [74,21,33,51,77,1,63,76,78,20,50,38,40,43,87,91,25,12,55,29,61,85,83,5,64,49,57,72,31,14,19,71];
Decrypter.map_code_DrILlUp = [55,75,70,60,38,98,49,34,41,81,58,52,94,16,44,18,95,19,78,82,57,9,12,91,29,35,59,15,37,51,79,85];
Decrypter.map_code_drILLup = [92,42,88,33,9,89,83,80,25,37,82,72,38,28,63,4,30,99,90,7,12,31,60,70,17,74,53,43,61,77,11,54];
Decrypter.map_code_DrIllup = [75,6,98,81,66,28,41,34,38,50,91,71,72,53,18,13,44,1,30,8,56,36,51,60,78,54,84,16,24,25,55,96];
Decrypter.map_code_dRILlup = [91,19,41,43,61,7,13,71,25,56,26,64,97,1,36,66,46,40,82,77,94,35,9,86,80,92,49,72,24,33,63,87];
Decrypter.map_code_DrILLup = [96,46,51,27,72,78,2,98,3,18,0,10,11,36,44,79,94,88,85,91,60,33,23,49,84,99,6,12,61,59,28,90];
Decrypter.map_code_drilluP = [51,34,78,95,39,76,32,54,26,98,38,53,50,22,8,70,0,13,58,81,83,77,96,67,33,60,82,12,14,85,23,6];
Decrypter.map_code_DRilLUp = [4,79,58,54,70,34,62,69,28,14,92,2,23,80,8,96,11,44,71,64,32,10,31,7,25,88,42,87,49,57,67,99];
Decrypter.map_code_DRIlluP = [85,80,3,96,87,46,54,93,16,31,73,53,34,1,22,44,18,45,69,43,2,26,33,83,13,6,29,7,39,75,95,55];
Decrypter.map_code_drILLUp = [41,24,18,38,59,49,63,54,45,10,84,55,81,35,20,82,44,71,12,85,7,29,39,75,0,97,66,28,52,36,65,21];
Decrypter.map_code_DRILLuP = [12,52,82,16,14,43,91,53,29,55,76,21,50,17,44,69,34,56,42,40,79,22,13,66,83,41,32,64,84,0,4,15];
Decrypter.map_code_DRIllUp = [23,96,71,98,40,99,90,52,21,70,36,50,56,47,58,20,54,12,24,57,37,78,22,51,7,28,86,95,93,45,43,44];
Decrypter.map_code_DrillUp = [22,27,9,66,75,98,78,47,48,13,68,52,38,5,97,49,77,20,63,41,81,42,34,67,64,1,31,71,65,82,89,33];
Decrypter.map_code_DRILluP = [40,65,84,54,35,25,22,91,70,80,99,59,98,56,20,36,64,73,11,86,87,50,2,94,41,76,17,3,52,71,58,88];
Decrypter.map_code_dRiLLup = [3,19,92,73,62,28,33,2,46,37,66,89,65,30,32,70,54,77,83,81,56,91,35,88,41,5,21,61,74,15,69,7];
Decrypter.map_code_driLlUp = [35,89,77,40,2,8,55,30,80,75,48,37,6,61,66,11,5,69,49,1,86,54,39,60,84,93,25,18,10,27,74,87];
Decrypter.map_code_DrilLuP = [47,10,72,84,2,43,41,37,27,45,83,38,21,91,71,99,79,0,6,14,5,62,19,3,53,89,77,26,61,12,40,68];
Decrypter.map_code_dRILlUp = [67,12,53,62,31,70,78,45,74,65,87,35,50,51,1,26,39,37,90,97,91,55,92,7,77,0,58,21,38,41,82,10];
Decrypter.map_code_dRillUp = [39,56,54,31,38,96,13,32,49,59,88,8,77,16,4,42,44,20,80,58,18,25,51,93,7,50,21,33,6,60,45,71];
Decrypter.map_code_drillUp = [32,6,78,36,48,18,9,34,8,94,29,45,90,40,58,38,72,65,54,70,73,16,66,21,84,82,27,46,37,87,1,11];
Decrypter.map_code_dRIlLup = [53,33,48,9,14,74,94,32,35,44,47,80,58,76,42,7,79,10,54,37,87,34,28,45,83,50,86,70,75,0,17,2];
Decrypter.map_code_drilLUp = [89,11,36,53,35,16,28,83,86,60,95,69,7,5,23,54,94,14,90,75,61,51,49,2,31,50,64,84,67,99,97,13];
Decrypter.map_code_DRIlLuP = [34,9,32,26,90,91,67,54,53,20,47,43,70,27,60,5,4,74,13,38,41,68,48,86,28,78,31,10,51,25,62,37];
Decrypter.map_code_drIllUp = [93,74,78,66,77,44,96,17,71,84,12,33,76,58,63,51,45,9,55,53,59,30,83,8,90,39,56,60,48,85,15,34];
Decrypter.map_code_DRilluP = [16,18,65,40,53,27,62,76,89,56,2,37,79,73,74,88,36,70,75,43,42,25,19,8,96,93,55,47,9,58,50,85];
Decrypter.map_code_DRiLlup = [97,70,3,39,76,59,90,71,57,65,78,24,35,54,68,34,30,93,44,73,62,12,7,72,89,50,61,25,67,31,37,0];
Decrypter.map_code_driLLup = [13,42,52,81,64,15,43,49,35,44,17,73,25,19,34,16,86,72,38,57,66,29,37,12,18,26,27,5,76,30,58,69];
Decrypter.map_code_DRILlUp = [37,1,17,94,7,83,91,45,64,22,35,66,70,54,25,51,73,19,71,58,99,72,92,55,67,69,15,0,6,26,8,23];
Decrypter.map_code_driLlup = [11,23,48,52,9,18,45,51,37,81,43,35,27,99,1,17,40,3,8,46,25,41,4,24,91,31,87,57,71,28,58,13];
Decrypter.map_code_DrilluP = [73,30,8,42,57,94,93,96,51,20,25,39,32,15,49,92,28,84,43,54,55,59,78,37,9,46,22,71,60,23,80,87];
Decrypter.map_code_DRILlup = [91,90,81,86,76,47,12,6,96,54,80,88,83,1,34,67,57,53,72,85,75,97,68,18,14,45,71,49,78,98,16,32];
Decrypter.map_code_DriLlup = [44,29,25,6,49,81,64,77,65,35,14,33,89,10,94,76,17,59,5,58,43,36,9,38,73,26,87,54,45,19,46,75];
Decrypter.map_code_DRILLup = [92,96,4,11,81,40,41,88,30,47,39,16,29,85,32,21,76,36,17,79,45,86,51,67,49,13,68,99,84,1,61,20];
Decrypter.map_code_drilLuP = [76,67,65,54,93,15,40,70,77,57,71,62,94,14,90,18,6,13,12,95,58,55,69,79,78,46,4,74,28,9,39,16];
Decrypter.map_code_dRilLuP = [72,95,48,46,39,6,33,3,75,55,93,10,65,29,44,14,15,67,37,84,26,22,32,53,43,62,41,23,64,94,88,38];
Decrypter.map_code_DrilLup = [35,29,64,69,18,16,75,93,85,17,65,74,40,73,60,31,78,4,82,24,54,22,68,59,30,98,2,13,14,92,6,53];
Decrypter.map_code_dRilluP = [57,59,51,44,34,41,7,72,52,84,78,18,20,2,89,91,99,0,71,70,63,50,13,82,86,30,10,19,88,76,68,32];
Decrypter.map_code_DrILluP = [35,4,7,23,54,82,46,99,63,95,3,31,84,20,89,62,13,6,51,5,88,57,27,91,9,16,69,71,60,68,53,56];
Decrypter.map_code_drIlLUp = [20,55,40,12,41,9,84,23,5,2,56,86,61,17,92,22,83,67,88,57,21,76,51,74,8,94,0,53,6,90,52,50];
Decrypter.map_code_dRIlLUp = [57,22,18,66,13,37,50,28,49,63,25,97,85,41,23,88,91,80,26,17,95,77,98,52,99,5,40,61,46,33,96,75];
Decrypter.map_code_drILLuP = [95,62,44,60,73,26,56,39,29,98,61,2,83,35,33,54,22,48,19,64,99,45,14,88,70,51,10,20,23,17,79,96];
Decrypter.map_code_dRiLLuP = [52,24,72,93,49,77,39,95,3,67,40,8,48,57,7,11,44,56,74,25,86,2,26,89,96,90,98,73,16,1,69,58];
Decrypter.map_code_dRilLup = [91,47,88,33,23,9,36,28,64,67,3,58,69,17,68,75,26,20,63,62,44,14,70,71,37,77,97,90,89,38,85,2];
Decrypter.map_code_DRiLlUp = [56,6,50,98,91,96,38,77,11,4,20,73,94,47,65,36,66,84,1,31,74,60,95,41,92,99,3,37,93,97,5,78];
Decrypter.map_code_DrILlup = [21,90,44,54,86,31,83,0,22,69,73,71,85,76,18,1,15,5,12,7,28,33,16,72,50,74,61,37,20,46,24,81];
Decrypter.map_code_DRiLluP = [96,48,81,65,15,34,79,69,56,91,35,74,20,89,49,28,73,97,26,14,66,8,41,83,52,98,3,43,16,45,25,68];
Decrypter.map_code_DrillUP = [25,67,39,48,32,26,33,46,37,41,92,78,51,15,50,20,10,3,31,81,14,40,7,36,85,53,35,73,49,75,11,76];
Decrypter.map_code_drILlUp = [50,93,45,55,84,36,49,21,33,13,32,30,5,57,14,95,97,2,58,78,18,79,64,62,87,7,40,56,83,6,76,71];
Decrypter.map_code_drILluP = [66,76,37,12,41,60,88,96,79,36,23,55,52,44,40,18,62,84,67,75,21,83,6,5,47,43,61,13,93,77,19,0];
Decrypter.map_code_DriLluP = [4,67,45,30,61,48,79,31,64,73,18,82,94,43,33,74,98,26,65,56,66,10,99,85,14,81,95,53,3,78,62,63];
Decrypter.map_code_driLLuP = [15,19,61,67,77,10,82,54,79,25,44,65,76,24,22,14,42,40,75,35,30,55,41,88,18,52,28,39,74,9,7,32];
Decrypter.map_code_DRIllup = [28,9,70,87,34,88,22,13,51,0,4,17,30,67,44,90,61,92,15,16,42,33,77,74,54,81,41,80,93,3,57,12];
Decrypter.map_code_dRillUP = [95,76,53,70,97,58,6,85,78,48,43,28,44,34,9,36,89,65,10,56,47,73,33,21,81,18,50,86,29,16,26,0];
Decrypter.n_dRIllUP = function(DrillUP, DriLLUP){ return parseInt(this.code_map_drillup[this.map_code_dRIlluP[DrillUP+11]], 16); }
Decrypter.n_DRIlluP = function(dRILlUp, DrillUp){ return parseInt(this.code_map_drillup[this.map_code_DrIlLUP[dRILlUp+14]], 16); }
Decrypter.n_drilLup = function(DriLlUp, drilLup){ return parseInt(this.code_map_drillup[this.map_code_dRilLUp[DriLlUp+11]], 16); }
Decrypter.n_DrIlLUP = function(DriLlUP, DRILlup){ return parseInt(this.code_map_drillup[this.map_code_dRiLlup[DriLlUP+9]], 16); }
Decrypter.n_dRILluP = function(DRIlluP, DRilLup){ return parseInt(this.code_map_drillup[this.map_code_dRILLuP[DRIlluP+15]], 16); }
Decrypter.n_DRilluP = function(dRIlLuP, drillup){ return parseInt(this.code_map_drillup[this.map_code_DRILLup[dRIlLuP+4]], 16); }
Decrypter.n_DRilLUp = function(DriLluP, DRiLLUp){ return parseInt(this.code_map_drillup[this.map_code_DRILLUp[DriLluP+12]], 16); }
Decrypter.n_DrILLup = function(driLlUp, DRIllUp){ return parseInt(this.code_map_drillup[this.map_code_DriLLUP[driLlUp+11]], 16); }
Decrypter.n_drilLUP = function(DRILlUp, dRilLUP){ return parseInt(this.code_map_drillup[this.map_code_DrILluP[DRILlUp+6]], 16); }
Decrypter.n_drILLuP = function(drilLup, DRIlLUp){ return parseInt(this.code_map_drillup[this.map_code_drILluP[drilLup+1]], 16); }
Decrypter.n_dRilLup = function(drillup, DrIlluP){ return parseInt(this.code_map_drillup[this.map_code_DriLLup[drillup+9]], 16); }
Decrypter.n_drILlup = function(dRIlLup, dRilLup){ return parseInt(this.code_map_drillup[this.map_code_DriLLUp[dRIlLup+1]], 16); }
Decrypter.n_DRIllup = function(DrilluP, DRillUp){ return parseInt(this.code_map_drillup[this.map_code_dRillUp[DrilluP+4]], 16); }
Decrypter.n_DRILlup = function(drIlluP, DRillup){ return parseInt(this.code_map_drillup[this.map_code_drIllup[drIlluP+2]], 16); }
Decrypter.n_dRILLuP = function(DrIlLUP, drIlluP){ return parseInt(this.code_map_drillup[this.map_code_dRiLlup[DrIlLUP+11]], 16); }
Decrypter.n_DrIllUp = function(DRilLUP, DRILLuP){ return parseInt(this.code_map_drillup[this.map_code_DriLLUP[DRilLUP+11]], 16); }
Decrypter.n_DrIllup = function(drILlUp, DrillUp){ return parseInt(this.code_map_drillup[this.map_code_DRILLup[drILlUp+4]], 16); }
Decrypter.n_drILlUp = function(drILLUp, dRillUP){ return parseInt(this.code_map_drillup[this.map_code_DrilLUP[drILLUp+12]], 16); }
Decrypter.n_DrIllUP = function(dRiLLUp, dRilLUP){ return parseInt(this.code_map_drillup[this.map_code_drILlUP[dRiLLUp+13]], 16); }
Decrypter.n_DRillUP = function(drIlLuP, dRILlUp){ return parseInt(this.code_map_drillup[this.map_code_DrIllUP[drIlLuP+3]], 16); }
Decrypter.n_DRILLuP = function(DRiLLUp, dRiLluP){ return parseInt(this.code_map_drillup[this.map_code_dRiLLuP[DRiLLUp+1]], 16); }
Decrypter.n_DriLluP = function(DriLLUP, DRIlLUP){ return parseInt(this.code_map_drillup[this.map_code_driLLuP[DriLLUP+8]], 16); }
Decrypter.n_driLLUP = function(DRilLuP, drilLuP){ return parseInt(this.code_map_drillup[this.map_code_DRiLLuP[DRilLuP+3]], 16); }
Decrypter.n_driLlUp = function(DRillUP, DRillup){ return parseInt(this.code_map_drillup[this.map_code_DRiLluP[DRillUP+14]], 16); }
Decrypter.n_driLlUP = function(DRILLUp, DriLlUP){ return parseInt(this.code_map_drillup[this.map_code_dRILLup[DRILLUp+11]], 16); }
Decrypter.n_DrIlLuP = function(drILLuP, drillUP){ return parseInt(this.code_map_drillup[this.map_code_drilluP[drILLuP+11]], 16); }
Decrypter.n_drILluP = function(dRILLUP, DRillUp){ return parseInt(this.code_map_drillup[this.map_code_DRillup[dRILLUP+7]], 16); }
Decrypter.n_driLLUp = function(DrilLUP, DriLlUP){ return parseInt(this.code_map_drillup[this.map_code_DRIlLuP[DrilLUP+7]], 16); }
Decrypter.n_DRiLLup = function(DrILLup, DRiLlUp){ return parseInt(this.code_map_drillup[this.map_code_DRiLLUP[DrILLup+11]], 16); }
Decrypter.n_drilluP = function(dRIlLup, DRiLLuP){ return parseInt(this.code_map_drillup[this.map_code_driLlUP[dRIlLup+6]], 16); }
Decrypter.n_DRiLLUp = function(DrIlLuP, DrIllUp){ return parseInt(this.code_map_drillup[this.map_code_DRillUP[DrIlLuP+0]], 16); }
Decrypter.n_dRilLUp = function(DriLluP, dRILLuP){ return parseInt(this.code_map_drillup[this.map_code_DrILlUp[DriLluP+14]], 16); }
Decrypter.n_dRiLluP = function(DRilLup, DRILLup){ return parseInt(this.code_map_drillup[this.map_code_dRILlUP[DRilLup+4]], 16); }
Decrypter.n_drillup = function(dRiLlup, DrilLuP){ return parseInt(this.code_map_drillup[this.map_code_DRilLUp[dRiLlup+1]], 16); }
Decrypter.n_drIlLUP = function(drilLup, drillUP){ return parseInt(this.code_map_drillup[this.map_code_DRIllup[drilLup+4]], 16); }
Decrypter.n_dRiLlUp = function(dRilLuP, dRIlluP){ return parseInt(this.code_map_drillup[this.map_code_DRilLUp[dRilLuP+3]], 16); }
Decrypter.n_DrILLuP = function(DRiLLUP, dRiLlup){ return parseInt(this.code_map_drillup[this.map_code_DriLLuP[DRiLLUP+5]], 16); }
Decrypter.n_DrilLup = function(dRilLUp, Drillup){ return parseInt(this.code_map_drillup[this.map_code_dRilLUP[dRilLUp+1]], 16); }
Decrypter.n_driLLup = function(dRIllUp, drILlUP){ return parseInt(this.code_map_drillup[this.map_code_DRiLlup[dRIllUp+8]], 16); }
Decrypter.n_Drillup = function(DRiLLUp, DrILLUP){ return parseInt(this.code_map_drillup[this.map_code_drILluP[DRiLLUp+7]], 16); }
Decrypter.n_dRillUp = function(dRILluP, DrILlup){ return parseInt(this.code_map_drillup[this.map_code_DrILLuP[dRILluP+1]], 16); }
Decrypter.n_dRILLUP = function(dRiLluP, drillup){ return parseInt(this.code_map_drillup[this.map_code_drIllUp[dRiLluP+9]], 16); }
Decrypter.n_DRiLlUP = function(drIlluP, drillup){ return parseInt(this.code_map_drillup[this.map_code_driLluP[drIlluP+11]], 16); }
Decrypter.n_DRIlLuP = function(dRilLup, DRILlUP){ return parseInt(this.code_map_drillup[this.map_code_DRiLLuP[dRilLup+6]], 16); }
Decrypter.n_driLluP = function(DRiLLUp, DRILLUp){ return parseInt(this.code_map_drillup[this.map_code_DrILlUp[DRiLLUp+0]], 16); }
Decrypter.n_DRillup = function(drILlUP, driLLUp){ return parseInt(this.code_map_drillup[this.map_code_dRiLlUP[drILlUP+10]], 16); }
Decrypter.n_dRIllup = function(DrILLup, drIllup){ return parseInt(this.code_map_drillup[this.map_code_dRiLLUP[DrILLup+3]], 16); }
Decrypter.n_DRIlLup = function(drillUP, DrILlUp){ return parseInt(this.code_map_drillup[this.map_code_drIllUP[drillUP+14]], 16); }
Decrypter.n_DrIlluP = function(dRIllUP, DriLLuP){ return parseInt(this.code_map_drillup[this.map_code_DriLLup[dRIllUP+5]], 16); }
Decrypter.n_DRILluP = function(dRILlup, DrillUp){ return parseInt(this.code_map_drillup[this.map_code_DrILLuP[dRILlup+7]], 16); }
Decrypter.n_DRiLluP = function(DRILlUP, driLluP){ return parseInt(this.code_map_drillup[this.map_code_DrILlUP[DRILlUP+3]], 16); }
Decrypter.n_dRILlup = function(DriLLup, DrIlLup){ return parseInt(this.code_map_drillup[this.map_code_DRilLuP[DriLLup+3]], 16); }
Decrypter.n_DriLlup = function(DRIllup, DrILLUP){ return parseInt(this.code_map_drillup[this.map_code_drIlLUp[DRIllup+1]], 16); }
Decrypter.n_DRilLUP = function(DrIllup, DrILLUp){ return parseInt(this.code_map_drillup[this.map_code_DrILLUP[DrIllup+7]], 16); }
Decrypter.n_DriLLUP = function(dRILlup, DRIlLUp){ return parseInt(this.code_map_drillup[this.map_code_DRiLLup[dRILlup+9]], 16); }
Decrypter.n_DRILlUp = function(dRIlLuP, drIlLuP){ return parseInt(this.code_map_drillup[this.map_code_drILluP[dRIlLuP+11]], 16); }
Decrypter.n_drilLUp = function(dRillUp, drIllUP){ return parseInt(this.code_map_drillup[this.map_code_DRIlluP[dRillUp+8]], 16); }
Decrypter.n_drILLUp = function(DrilluP, dRILluP){ return parseInt(this.code_map_drillup[this.map_code_DRilLUp[DrilluP+13]], 16); }
Decrypter.n_dRilLuP = function(DrILlup, DriLLuP){ return parseInt(this.code_map_drillup[this.map_code_driLLup[DrILlup+0]], 16); }
Decrypter.n_dRIllUp = function(DrilLup, dRILLUp){ return parseInt(this.code_map_drillup[this.map_code_drILlup[DrilLup+12]], 16); }
Decrypter.n_DRIlLUP = function(DRILlUP, drIllUp){ return parseInt(this.code_map_drillup[this.map_code_DRILlUp[DRILlUP+10]], 16); }
Decrypter.n_dRiLLUp = function(dRILlUp, drIlLUP){ return parseInt(this.code_map_drillup[this.map_code_dRIlLup[dRILlUp+3]], 16); }
Decrypter.n_DRillUp = function(DrILLUp, dRillUp){ return parseInt(this.code_map_drillup[this.map_code_drILlUp[DrILLUp+9]], 16); }
Decrypter.n_drILlUP = function(dRiLLup, dRILLUP){ return parseInt(this.code_map_drillup[this.map_code_dRiLLUp[dRiLLup+14]], 16); }
Decrypter.n_DRiLlUp = function(dRiLlUp, driLluP){ return parseInt(this.code_map_drillup[this.map_code_dRILLup[dRiLlUp+3]], 16); }
Decrypter.n_DriLLuP = function(DRiLluP, DRILlup){ return parseInt(this.code_map_drillup[this.map_code_dRIlLUp[DRiLluP+11]], 16); }
Decrypter.n_DrilLUP = function(DRilLUP, DRiLluP){ return parseInt(this.code_map_drillup[this.map_code_driLLuP[DRilLUP+2]], 16); }
Decrypter.n_DRILlUP = function(DRIllUP, DrillUp){ return parseInt(this.code_map_drillup[this.map_code_dRIlLup[DRIllUP+9]], 16); }
Decrypter.n_dRIlLUp = function(dRilLup, DRilluP){ return parseInt(this.code_map_drillup[this.map_code_DrILLUP[dRilLup+4]], 16); }
Decrypter.n_DRiLlup = function(DRIllUP, drILLup){ return parseInt(this.code_map_drillup[this.map_code_driLluP[DRIllUP+8]], 16); }
Decrypter.n_DRiLLuP = function(drIlLUP, dRillUP){ return parseInt(this.code_map_drillup[this.map_code_DRiLlUp[drIlLUP+8]], 16); }
Decrypter.n_DrIlLup = function(drilluP, drilLuP){ return parseInt(this.code_map_drillup[this.map_code_dRiLluP[drilluP+5]], 16); }
Decrypter.n_dRILlUp = function(DrIllUP, DRiLluP){ return parseInt(this.code_map_drillup[this.map_code_dRiLLup[DrIllUP+8]], 16); }
Decrypter.n_DRiLLUP = function(dRilLUp, drILLup){ return parseInt(this.code_map_drillup[this.map_code_dRIlLuP[dRilLUp+6]], 16); }
Decrypter.n_DRIllUp = function(DriLLUP, DrilLup){ return parseInt(this.code_map_drillup[this.map_code_DRIllUP[DriLLUP+2]], 16); }
Decrypter.n_DrILlUp = function(DRillUP, DrILluP){ return parseInt(this.code_map_drillup[this.map_code_DrIllup[DRillUP+3]], 16); }
Decrypter.n_DRIlLUp = function(DRiLlup, DrIlLUP){ return parseInt(this.code_map_drillup[this.map_code_dRilLUp[DRiLlup+0]], 16); }
Decrypter.n_dRiLLuP = function(dRILlUP, DRILLuP){ return parseInt(this.code_map_drillup[this.map_code_dRIllup[dRILlUP+13]], 16); }
Decrypter.n_drIlLuP = function(drilLuP, dRILluP){ return parseInt(this.code_map_drillup[this.map_code_DriLluP[drilLuP+5]], 16); }
Decrypter.n_DriLlUP = function(DriLLUp, drILLUP){ return parseInt(this.code_map_drillup[this.map_code_DRIlLup[DriLLUp+6]], 16); }
Decrypter.n_DRILLUp = function(DrILluP, dRILluP){ return parseInt(this.code_map_drillup[this.map_code_drillUP[DrILluP+13]], 16); }
Decrypter.n_dRIlLup = function(dRILLup, dRilLuP){ return parseInt(this.code_map_drillup[this.map_code_DRILlUP[dRILLup+7]], 16); }
Decrypter.n_dRiLLup = function(drillup, DRIlluP){ return parseInt(this.code_map_drillup[this.map_code_driLLUp[drillup+8]], 16); }
Decrypter.n_drIlLUp = function(driLlUp, DrIlluP){ return parseInt(this.code_map_drillup[this.map_code_drIlLUp[driLlUp+2]], 16); }
Decrypter.n_DrillUp = function(DRIlLuP, dRilLUP){ return parseInt(this.code_map_drillup[this.map_code_DriLlUp[DRIlLuP+7]], 16); }
Decrypter.n_drILLup = function(drILLUp, DrIllup){ return parseInt(this.code_map_drillup[this.map_code_driLLuP[drILLUp+8]], 16); }
Decrypter.n_DrILlup = function(drILluP, DrIlLUp){ return parseInt(this.code_map_drillup[this.map_code_drillUp[drILluP+0]], 16); }
Decrypter.n_dRIlLuP = function(drilluP, driLLUp){ return parseInt(this.code_map_drillup[this.map_code_DrILlup[drilluP+4]], 16); }
Decrypter.n_dRillup = function(DRillup, drIllup){ return parseInt(this.code_map_drillup[this.map_code_DRillUP[DRillup+8]], 16); }
Decrypter.n_DriLLUp = function(dRilLup, dRIlLUP){ return parseInt(this.code_map_drillup[this.map_code_DrIlLuP[dRilLup+7]], 16); }
Decrypter.n_dRilluP = function(Drillup, DrIlLUp){ return parseInt(this.code_map_drillup[this.map_code_DRiLlup[Drillup+9]], 16); }
Decrypter.n_DrILlUP = function(DrilLup, dRILLUp){ return parseInt(this.code_map_drillup[this.map_code_drILlUP[DrilLup+11]], 16); }
Decrypter.n_driLlup = function(drILlUp, DrILlUp){ return parseInt(this.code_map_drillup[this.map_code_dRiLLUp[drILlUp+1]], 16); }
Decrypter.n_dRILlUP = function(driLLUp, DrIlLup){ return parseInt(this.code_map_drillup[this.map_code_DrIlluP[driLLUp+4]], 16); }
Decrypter.n_DrilLuP = function(DRiLLUP, dRilLuP){ return parseInt(this.code_map_drillup[this.map_code_dRILluP[DRiLLUP+15]], 16); }
Decrypter.n_DRILLup = function(dRiLlup, drILluP){ return parseInt(this.code_map_drillup[this.map_code_dRilLUP[dRiLlup+9]], 16); }
Decrypter.n_dRILLUp = function(dRiLLuP, DrIlluP){ return parseInt(this.code_map_drillup[this.map_code_driLLUP[dRiLLuP+7]], 16); }
Decrypter.n_drillUP = function(dRiLLup, dRILLup){ return parseInt(this.code_map_drillup[this.map_code_drilLuP[dRiLLup+7]], 16); }
Decrypter.n_DRIllUP = function(DriLluP, DrIllup){ return parseInt(this.code_map_drillup[this.map_code_driLLUP[DriLluP+10]], 16); }
Decrypter.n_drIllUp = function(dRiLlUp, DrILlUP){ return parseInt(this.code_map_drillup[this.map_code_DRIlluP[dRiLlUp+2]], 16); }
Decrypter.n_DrILluP = function(driLlUp, dRIllUp){ return parseInt(this.code_map_drillup[this.map_code_DriLlUp[driLlUp+7]], 16); }
Decrypter.n_dRiLlup = function(dRiLLup, DRillup){ return parseInt(this.code_map_drillup[this.map_code_DRIlLup[dRiLLup+4]], 16); }
Decrypter.n_drilLuP = function(driLLUp, DRiLLUp){ return parseInt(this.code_map_drillup[this.map_code_drIllUP[driLLUp+3]], 16); }
Decrypter.n_DrilluP = function(DrILLUP, DRiLluP){ return parseInt(this.code_map_drillup[this.map_code_drILLUp[DrILLUP+13]], 16); }
Decrypter.n_dRiLLUP = function(DRILlUp, DRiLluP){ return parseInt(this.code_map_drillup[this.map_code_dRiLlUP[DRILlUp+5]], 16); }
Decrypter.n_DriLlUp = function(dRiLLUp, dRiLLuP){ return parseInt(this.code_map_drillup[this.map_code_driLLuP[dRiLLUp+2]], 16); }
Decrypter.n_DRilLuP = function(DrIlLUp, drILLUp){ return parseInt(this.code_map_drillup[this.map_code_dRiLlUP[DrIlLUp+4]], 16); }
Decrypter.n_dRilLUP = function(DriLluP, drILluP){ return parseInt(this.code_map_drillup[this.map_code_driLluP[DriLluP+11]], 16); }
Decrypter.n_DrILLUp = function(DrILlup, dRiLLuP){ return parseInt(this.code_map_drillup[this.map_code_dRIlLuP[DrILlup+1]], 16); }
Decrypter.n_DrillUP = function(DrIllUP, dRILLup){ return parseInt(this.code_map_drillup[this.map_code_DRIlluP[DrIllUP+8]], 16); }
Decrypter.n_driLLuP = function(dRilLUp, driLLup){ return parseInt(this.code_map_drillup[this.map_code_drIlLUp[dRilLUp+15]], 16); }
Decrypter.n_DrIlLUp = function(DRILluP, DRIlLuP){ return parseInt(this.code_map_drillup[this.map_code_DRILLuP[DRILluP+4]], 16); }
Decrypter.n_drIllUP = function(driLLuP, DRillup){ return parseInt(this.code_map_drillup[this.map_code_drIlLup[driLLuP+7]], 16); }
Decrypter.n_dRillUP = function(driLLUP, dRillUP){ return parseInt(this.code_map_drillup[this.map_code_drIlluP[driLLUP+11]], 16); }
Decrypter.n_drIlLup = function(drilLUP, DRillup){ return parseInt(this.code_map_drillup[this.map_code_driLLup[drilLUP+1]], 16); }
Decrypter.n_DrILLUP = function(dRIlLuP, DrIlLup){ return parseInt(this.code_map_drillup[this.map_code_DRilLUP[dRIlLuP+9]], 16); }
Decrypter.n_dRIlluP = function(dRiLlUP, DrIlLUp){ return parseInt(this.code_map_drillup[this.map_code_drIlLUp[dRiLlUP+2]], 16); }
Decrypter.n_dRILLup = function(drILlUp, dRILlUp){ return parseInt(this.code_map_drillup[this.map_code_DRILlUP[drILlUp+0]], 16); }
Decrypter.n_DRilLup = function(dRIllUP, dRillup){ return parseInt(this.code_map_drillup[this.map_code_DRiLLuP[dRIllUP+5]], 16); }
Decrypter.n_drIllup = function(DRIlLUp, DriLLup){ return parseInt(this.code_map_drillup[this.map_code_dRIllup[DRIlLUp+11]], 16); }
Decrypter.n_dRiLlUP = function(dRIlluP, dRILLUP){ return parseInt(this.code_map_drillup[this.map_code_dRILlup[dRIlluP+11]], 16); }
Decrypter.n_drILLUP = function(drilLuP, dRIlluP){ return parseInt(this.code_map_drillup[this.map_code_drILlUP[drilLuP+1]], 16); }
Decrypter.n_DriLLup = function(dRILlUp, DrIllUP){ return parseInt(this.code_map_drillup[this.map_code_DRillUp[dRILlUp+2]], 16); }
Decrypter.n_dRIlLUP = function(DRiLlup, DRIlLUP){ return parseInt(this.code_map_drillup[this.map_code_drilLuP[DRiLlup+6]], 16); }
Decrypter.n_drIlluP = function(DRILluP, dRiLLup){ return parseInt(this.code_map_drillup[this.map_code_DrIlLUP[DRILluP+14]], 16); }
Decrypter.n_DrilLUp = function(DRilLUp, DrILlUp){ return parseInt(this.code_map_drillup[this.map_code_DRILlUp[DRilLUp+5]], 16); }
Decrypter.n_drillUp = function(DriLluP, Drillup){ return parseInt(this.code_map_drillup[this.map_code_DRiLLUp[DriLluP+3]], 16); }
Decrypter.N_drillup = 4;
Decrypter.N_Drillup = 9;
Decrypter.N_dRillup = 7;
Decrypter.N_DRillup = 11;
Decrypter.N_drIllup = 6;
Decrypter.N_DrIllup = 3;
Decrypter.N_dRIllup = 1;
Decrypter.N_DRIllup = 1;
Decrypter.N_driLlup = 7;
Decrypter.N_DriLlup = 9;
Decrypter.N_dRiLlup = 23;
Decrypter.N_DRiLlup = 1;
Decrypter.N_drILlup = 14;
Decrypter.N_DrILlup = 5;
Decrypter.N_dRILlup = 24;
Decrypter.N_DRILlup = 3;
Decrypter.N_drilLup = 1;
Decrypter.N_DrilLup = 12;
Decrypter.N_dRilLup = 10;
Decrypter.N_DRilLup = 3;
Decrypter.N_drIlLup = 9;
Decrypter.N_DrIlLup = 2;
Decrypter.N_dRIlLup = 11;
Decrypter.N_DRIlLup = 20;
Decrypter.N_driLLup = 14;
Decrypter.N_DriLLup = 10;
Decrypter.N_dRiLLup = 22;
Decrypter.N_DRiLLup = 9;
Decrypter.N_drILLup = 4;
Decrypter.N_DrILLup = 26;
Decrypter.N_dRILLup = 3;
Decrypter.N_DRILLup = 12;
Decrypter.N_drillUp = 29;
Decrypter.N_DrillUp = 20;
Decrypter.N_dRillUp = 23;
Decrypter.N_DRillUp = 9;
Decrypter.N_drIllUp = 17;
Decrypter.N_DrIllUp = 1;
Decrypter.N_dRIllUp = 26;
Decrypter.N_DRIllUp = 11;
Decrypter.N_driLlUp = 17;
Decrypter.N_DriLlUp = 3;
Decrypter.N_dRiLlUp = 21;
Decrypter.N_DRiLlUp = 24;
Decrypter.N_drILlUp = 2;
Decrypter.N_DrILlUp = 23;
Decrypter.N_dRILlUp = 25;
Decrypter.N_DRILlUp = 10;
Decrypter.N_drilLUp = 10;
Decrypter.N_DrilLUp = 14;
Decrypter.N_dRilLUp = 16;
Decrypter.N_DRilLUp = 28;
Decrypter.N_drIlLUp = 28;
Decrypter.N_DrIlLUp = 18;
Decrypter.N_dRIlLUp = 3;
Decrypter.N_DRIlLUp = 16;
Decrypter.N_driLLUp = 27;
Decrypter.N_DriLLUp = 26;
Decrypter.N_dRiLLUp = 12;
Decrypter.N_DRiLLUp = 18;
Decrypter.N_drILLUp = 12;
Decrypter.N_DrILLUp = 21;
Decrypter.N_dRILLUp = 29;
Decrypter.N_DRILLUp = 12;
Decrypter.N_drilluP = 10;
Decrypter.N_DrilluP = 17;
Decrypter.N_dRilluP = 14;
Decrypter.N_DRilluP = 6;
Decrypter.N_drIlluP = 0;
Decrypter.N_DrIlluP = 0;
Decrypter.N_dRIlluP = 15;
Decrypter.N_DRIlluP = 15;
Decrypter.N_driLluP = 8;
Decrypter.N_DriLluP = 19;
Decrypter.N_dRiLluP = 2;
Decrypter.N_DRiLluP = 21;
Decrypter.N_drILluP = 19;
Decrypter.N_DrILluP = 1;
Decrypter.N_dRILluP = 8;
Decrypter.N_DRILluP = 0;
Decrypter.N_drilLuP = 22;
Decrypter.N_DrilLuP = 17;
Decrypter.N_dRilLuP = 16;
Decrypter.N_DRilLuP = 12;
Decrypter.N_drIlLuP = 17;
Decrypter.N_DrIlLuP = 1;
Decrypter.N_dRIlLuP = 15;
Decrypter.N_DRIlLuP = 29;
Decrypter.N_driLLuP = 23;
Decrypter.N_DriLLuP = 15;
Decrypter.N_dRiLLuP = 3;
Decrypter.N_DRiLLuP = 14;
Decrypter.N_drILLuP = 0;
Decrypter.N_DrILLuP = 4;
Decrypter.N_dRILLuP = 7;
Decrypter.N_DRILLuP = 4;
Decrypter.N_drillUP = 16;
Decrypter.N_DrillUP = 18;
Decrypter.N_dRillUP = 20;
Decrypter.N_DRillUP = 0;
Decrypter.f_DRILLuP =  function(DRillUP,DriLlup){if( Decrypter.N_DrIlLup == Decrypter.N_DrIllUp && Decrypter.N_DriLlup == Decrypter.N_drIlLup && Decrypter.N_drIlluP == Decrypter.N_DRILluP ) {var byteArray = new Uint8Array(DriLlup);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DrIlLup(i,95);DRillUP.setUint8(i, byteArray[i]);}}}
Decrypter.f_dRillUP =  function(DRiLlup,drIlLuP){if( Decrypter.N_dRIllUp == Decrypter.N_DriLLUp && Decrypter.N_dRilLuP == Decrypter.N_drillUP && Decrypter.N_dRIllup == Decrypter.N_DRILLUp ) {var byteArray = new Uint8Array(drIlLuP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DrIlluP(i,98);DRiLlup.setUint8(i, byteArray[i]);}}}
Decrypter.f_driLlup =  function(drillUP,dRILlUp){if( Decrypter.N_DRILLUp == Decrypter.N_drilluP && Decrypter.N_Drillup == Decrypter.N_DRillUp && Decrypter.N_DRilLup == Decrypter.N_dRIlLUp ) {var byteArray = new Uint8Array(dRILlUp);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DrILLuP(i,8);drillUP.setUint8(i, byteArray[i]);}}}
Decrypter.f_dRiLLup =  function(dRilLUp,DRIllUp){if( Decrypter.N_DrilLup == Decrypter.N_DRILLup && Decrypter.N_dRIllup == Decrypter.N_DrILluP && Decrypter.N_drIllup == Decrypter.N_drilLup ) {var byteArray = new Uint8Array(DRIllUp);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DrIllUP(i,26);dRilLUp.setUint8(i, byteArray[i]);}}}
Decrypter.f_DRIlLup =  function(dRIlLuP,drillup){if( Decrypter.N_DRilLup == Decrypter.N_DrILlUp && Decrypter.N_DRILlup == Decrypter.N_DRILlUp && Decrypter.N_DrilLup == Decrypter.N_DRILLUp ) {var byteArray = new Uint8Array(drillup);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DRIlLUP(i,23);dRIlLuP.setUint8(i, byteArray[i]);}}}
Decrypter.f_DrIlluP =  function(dRilLUp,DRiLlup){if( Decrypter.N_DRILlUp == Decrypter.N_dRIlluP && Decrypter.N_DrILLup == Decrypter.N_drillUP && Decrypter.N_DRillup == Decrypter.N_DRIllUp ) {var byteArray = new Uint8Array(DRiLlup);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DriLlUP(i,69);dRilLUp.setUint8(i, byteArray[i]);}}}
Decrypter.f_dRILlup =  function(DRiLlUP,DriLlUp){if( Decrypter.N_DRilLup == Decrypter.N_DriLlUp && Decrypter.N_DrIllup == Decrypter.N_dRiLLuP && Decrypter.N_DRillup == Decrypter.N_DRiLluP ) {var byteArray = new Uint8Array(DriLlUp);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DrIlLUP(i,14);DRiLlUP.setUint8(i, byteArray[i]);}}}
Decrypter.f_DrILlup =  function(driLLUp,drIllup){if( Decrypter.N_dRiLLuP == Decrypter.N_DrILLuP && Decrypter.N_DRIllUp == Decrypter.N_drILLUp && Decrypter.N_DRillUp == Decrypter.N_DRilluP ) {var byteArray = new Uint8Array(drIllup);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_dRILlUP(i,13);driLLUp.setUint8(i, byteArray[i]);}}}
Decrypter.f_drillUP =  function(drIlLuP,driLLUP){if( Decrypter.N_drilLup == Decrypter.N_DrILlUp && Decrypter.N_DriLlup == Decrypter.N_DRiLLup && Decrypter.N_DRIlluP == Decrypter.N_dRIlLuP ) {var byteArray = new Uint8Array(driLLUP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_dRILlUP(i,96);drIlLuP.setUint8(i, byteArray[i]);}}}
Decrypter.f_dRiLLuP =  function(drILlUp,DrIlLUp){if( Decrypter.N_DRIlLup == Decrypter.N_DRiLLuP && Decrypter.N_DrIllup == Decrypter.N_DRILlup && Decrypter.N_dRILLup == Decrypter.N_DRIlLUp ) {var byteArray = new Uint8Array(DrIlLUp);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DRilLUP(i,90);drILlUp.setUint8(i, byteArray[i]);}}}
Decrypter.f_DrillUp =  function(DriLLUP,DrillUP){if( Decrypter.N_drillUp == Decrypter.N_dRILLUp && Decrypter.N_dRillup == Decrypter.N_dRIllUp && Decrypter.N_DRilLup == Decrypter.N_dRILlUp ) {var byteArray = new Uint8Array(DrillUP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_drillUp(i,33);DriLLUP.setUint8(i, byteArray[i]);}}}
Decrypter.f_DRILlUp =  function(dRILlUp,dRIllUP){if( Decrypter.N_dRillUp == Decrypter.N_driLLuP && Decrypter.N_DrILlup == Decrypter.N_DRIlLuP && Decrypter.N_DrILLUp == Decrypter.N_DRiLluP ) {var byteArray = new Uint8Array(dRIllUP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DRIllup(i,47);dRILlUp.setUint8(i, byteArray[i]);}}}
Decrypter.f_DrILluP =  function(DrillUp,dRillUp){if( Decrypter.N_dRIlluP == Decrypter.N_DRIlluP && Decrypter.N_drIllup == Decrypter.N_DriLLUp && Decrypter.N_DrIlLUp == Decrypter.N_DrillUP ) {var byteArray = new Uint8Array(dRillUp);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DrIlluP(i,77);DrillUp.setUint8(i, byteArray[i]);}}}
Decrypter.f_drILlup =  function(dRiLluP,DRillUp){if( Decrypter.N_Drillup == Decrypter.N_DriLlup && Decrypter.N_DrILlup == Decrypter.N_drillUP && Decrypter.N_drIllUp == Decrypter.N_DrILLUp ) {var byteArray = new Uint8Array(DRillUp);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DrilLUP(i,12);dRiLluP.setUint8(i, byteArray[i]);}}}
Decrypter.f_dRilLUp =  function(DrILLUp,DRilLup){if( Decrypter.N_drillUp == Decrypter.N_drILLUp && Decrypter.N_DrIlluP == Decrypter.N_DriLluP && Decrypter.N_DrIllup == Decrypter.N_drIlLUp ) {var byteArray = new Uint8Array(DRilLup);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_drillup(i,50);DrILLUp.setUint8(i, byteArray[i]);}}}
Decrypter.f_DRiLlup =  function(DriLlup,DrILluP){if( Decrypter.N_DriLlUp == Decrypter.N_DRILLUp && Decrypter.N_dRILlup == Decrypter.N_DRILLUp && Decrypter.N_DriLlUp == Decrypter.N_DRIlluP ) {var byteArray = new Uint8Array(DrILluP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DRillUp(i,11);DriLlup.setUint8(i, byteArray[i]);}}}
Decrypter.f_driLLuP =  function(DriLlup,DRiLluP){if( Decrypter.N_dRIllup == Decrypter.N_DRilLup && Decrypter.N_drillup == Decrypter.N_drILLup && Decrypter.N_driLlUp == Decrypter.N_drIlLuP ) {var byteArray = new Uint8Array(DRiLluP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_dRILLUp(i,88);DriLlup.setUint8(i, byteArray[i]);}}}
Decrypter.f_DRIllup =  function(drIllUp,driLlUP){if( Decrypter.N_DRIlLUp == Decrypter.N_DRiLluP && Decrypter.N_dRiLLup == Decrypter.N_drilLuP && Decrypter.N_DrIllup == Decrypter.N_dRIlLUp ) {var byteArray = new Uint8Array(driLlUP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_drilLuP(i,7);drIllUp.setUint8(i, byteArray[i]);}}}
Decrypter.f_drILLUp =  function(drILlUP,drilLuP){if( Decrypter.N_drilLup == Decrypter.N_DrILluP && Decrypter.N_DrIlluP == Decrypter.N_DRiLLuP && Decrypter.N_dRiLlup == Decrypter.N_DrILlUp ) {var byteArray = new Uint8Array(drilLuP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DRiLLUp(i,60);drILlUP.setUint8(i, byteArray[i]);}}}
Decrypter.f_drillUp =  function(DrIllup,DrILluP){if( Decrypter.N_DRiLlup == Decrypter.N_drIlLup && Decrypter.N_DRiLLup == Decrypter.N_DRillUp && Decrypter.N_DRiLlup == Decrypter.N_DRIllUp ) {var byteArray = new Uint8Array(DrILluP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DrilluP(i,32);DrIllup.setUint8(i, byteArray[i]);}}}
Decrypter.f_drIlLUp =  function(dRILLUp,driLLup){if( Decrypter.N_DRILlup == Decrypter.N_dRIlLUp && Decrypter.N_DRILLUp == Decrypter.N_DRilluP && Decrypter.N_DRILLup == Decrypter.N_drILLUp ) {var byteArray = new Uint8Array(driLLup);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_dRiLLUp(i,52);dRILLUp.setUint8(i, byteArray[i]);}}}
Decrypter.f_drilLUp =  function(DRiLLup,DRIlluP){if( Decrypter.N_Drillup == Decrypter.N_DRIlLup && Decrypter.N_dRIlluP == Decrypter.N_DriLLuP && Decrypter.N_DRILlup == Decrypter.N_dRILLup ) {var byteArray = new Uint8Array(DRIlluP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_drilLUP(i,48);DRiLLup.setUint8(i, byteArray[i]);}}}
Decrypter.f_drilluP =  function(DrILluP,dRILlUp){if( Decrypter.N_DRilLup == Decrypter.N_dRiLLuP && Decrypter.N_drilLUp == Decrypter.N_drilluP && Decrypter.N_DrIllup == Decrypter.N_DrILlUp ) {var byteArray = new Uint8Array(dRILlUp);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DRiLlup(i,64);DrILluP.setUint8(i, byteArray[i]);}}}
Decrypter.f_drIllup =  function(DrIlLuP,DriLLup){if( Decrypter.N_DRIllup == Decrypter.N_DrIlLuP && Decrypter.N_DRILLup == Decrypter.N_dRiLLUp && Decrypter.N_DRillup == Decrypter.N_drILlUp ) {var byteArray = new Uint8Array(DriLLup);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DriLlUP(i,4);DrIlLuP.setUint8(i, byteArray[i]);}}}
Decrypter.f_DrilluP =  function(DRILluP,dRIllUP){if( Decrypter.N_DRiLLup == Decrypter.N_DRilLuP && Decrypter.N_drillup == Decrypter.N_DriLlup && Decrypter.N_driLlup == Decrypter.N_dRILLuP ) {var byteArray = new Uint8Array(dRIllUP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DRiLLUP(i,65);DRILluP.setUint8(i, byteArray[i]);}}}
Decrypter.f_DrILLUp =  function(drILLup,DriLLUp){if( Decrypter.N_DRillup == Decrypter.N_DRiLLUp && Decrypter.N_dRilluP == Decrypter.N_DRillUP && Decrypter.N_DriLlUp == Decrypter.N_DrILLuP ) {var byteArray = new Uint8Array(DriLLUp);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DRilluP(i,61);drILLup.setUint8(i, byteArray[i]);}}}
Decrypter.f_DrIlLuP =  function(dRIllup,drIlLUp){if( Decrypter.N_dRILlup == Decrypter.N_driLLup && Decrypter.N_dRILlUp == Decrypter.N_dRiLLuP && Decrypter.N_dRillUp == Decrypter.N_dRIlLUp ) {var byteArray = new Uint8Array(drIlLUp);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_driLLup(i,85);dRIllup.setUint8(i, byteArray[i]);}}}
Decrypter.f_DRIlLUp =  function(DRILLuP,drilLUp){if( Decrypter.N_DrILlup == Decrypter.N_driLLuP && Decrypter.N_Drillup == Decrypter.N_drIlLup && Decrypter.N_DRilLup == Decrypter.N_DrILluP ) {var byteArray = new Uint8Array(drilLUp);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_dRilLUp(i,55);DRILLuP.setUint8(i, byteArray[i]);}}}
Decrypter.f_dRILLup =  function(DrILlUP,dRiLLup){if( Decrypter.N_dRIlLup == Decrypter.N_DRillUp && Decrypter.N_drilLup == Decrypter.N_DrIllUp && Decrypter.N_DriLlup == Decrypter.N_DRIlLUp ) {var byteArray = new Uint8Array(dRiLLup);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_dRiLlUp(i,30);DrILlUP.setUint8(i, byteArray[i]);}}}
Decrypter.f_drIlLup =  function(DrIllup,DrIlLUp){if( Decrypter.N_drIlluP == Decrypter.N_DrIlluP && Decrypter.N_DRILLUp == Decrypter.N_DRilLuP && Decrypter.N_DRillup == Decrypter.N_DrILLuP ) {var byteArray = new Uint8Array(DrIlLUp);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_drILluP(i,20);DrIllup.setUint8(i, byteArray[i]);}}}
Decrypter.f_drillup =  function(DriLlUP,DrilLuP){if( Decrypter.N_DRILLup == Decrypter.N_DrIlLUp && Decrypter.N_DrILLUp == Decrypter.N_DrILluP && Decrypter.N_DrIlLup == Decrypter.N_dRiLLuP ) {var byteArray = new Uint8Array(DrilLuP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_drIlLup(i,0);DriLlUP.setUint8(i, byteArray[i]);}}}
Decrypter.f_DrILLuP =  function(DRIllup,DRILluP){if( Decrypter.N_drilLup == Decrypter.N_DRiLLuP && Decrypter.N_drIllup == Decrypter.N_DrIlLuP && Decrypter.N_driLLup == Decrypter.N_DrilLUp ) {var byteArray = new Uint8Array(DRILluP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_drilLUP(i,93);DRIllup.setUint8(i, byteArray[i]);}}}
Decrypter.f_DRIlluP =  function(DRiLlup,drIlluP){if( Decrypter.N_DrilLuP == Decrypter.N_drIlLuP && Decrypter.N_dRIlLUp == Decrypter.N_dRiLLuP && Decrypter.N_DrIllup == Decrypter.N_drIlluP ) {var byteArray = new Uint8Array(drIlluP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DRiLluP(i,71);DRiLlup.setUint8(i, byteArray[i]);}}}
Decrypter.f_dRilLup =  function(driLlup,DRILlup){if( Decrypter.N_dRIllup == Decrypter.N_DRiLlup && Decrypter.N_DRIllup == Decrypter.N_driLluP && Decrypter.N_DrilluP == Decrypter.N_drIlLuP ) {var byteArray = new Uint8Array(DRILlup);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DRiLluP(i,18);driLlup.setUint8(i, byteArray[i]);}}}
Decrypter.f_DRILlup =  function(DRillUp,DrilLUP){if( Decrypter.N_dRiLlup == Decrypter.N_DrILlup && Decrypter.N_DRILlup == Decrypter.N_DriLLup && Decrypter.N_dRilLup == Decrypter.N_drilLUp ) {var byteArray = new Uint8Array(DrilLUP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_drILLUp(i,15);DRillUp.setUint8(i, byteArray[i]);}}}
Decrypter.f_DriLlUp =  function(DrILLup,DRiLLUp){if( Decrypter.N_dRiLlUp == Decrypter.N_DrILLUp && Decrypter.N_drIllup == Decrypter.N_DRilluP && Decrypter.N_drIllup == Decrypter.N_dRILLUp ) {var byteArray = new Uint8Array(DRiLLUp);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DRiLlUp(i,41);DrILLup.setUint8(i, byteArray[i]);}}}
Decrypter.f_drILLup =  function(DrilLUP,DrILlUp){if( Decrypter.N_DriLluP == Decrypter.N_drILluP && Decrypter.N_DRIlLup == Decrypter.N_DrillUp && Decrypter.N_drIllup == Decrypter.N_dRIlLup ) {var byteArray = new Uint8Array(DrILlUp);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_drILlup(i,28);DrilLUP.setUint8(i, byteArray[i]);}}}
Decrypter.f_Drillup =  function(DrILlup,dRIlluP){if( Decrypter.N_drillUp == Decrypter.N_DRIlLuP && Decrypter.N_dRilLup == Decrypter.N_DriLLup && Decrypter.N_DRillup == Decrypter.N_dRillUp ) {var byteArray = new Uint8Array(dRIlluP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_dRilLuP(i,1);DrILlup.setUint8(i, byteArray[i]);}}}
Decrypter.f_DriLLuP =  function(DriLlUp,dRilLup){if( Decrypter.N_dRillup == Decrypter.N_DRilLUp && Decrypter.N_dRIllup == Decrypter.N_DRIllup && Decrypter.N_drILLuP == Decrypter.N_DRillUP ) {var byteArray = new Uint8Array(dRilLup);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_dRIlLUP(i,89);DriLlUp.setUint8(i, byteArray[i]);}}}
Decrypter.f_dRILluP =  function(dRilLUp,DrILluP){if( Decrypter.N_drIlLuP == Decrypter.N_DrILLuP && Decrypter.N_DrILluP == Decrypter.N_DrIlLuP && Decrypter.N_dRilLUp == Decrypter.N_DRIlLUp ) {var byteArray = new Uint8Array(DrILluP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_dRilLUP(i,78);dRilLUp.setUint8(i, byteArray[i]);}}}
Decrypter.f_DRILluP =  function(DrilLUP,DRillup){if( Decrypter.N_dRIllup == Decrypter.N_drilLup && Decrypter.N_DrillUp == Decrypter.N_dRillUP && Decrypter.N_DrIllup == Decrypter.N_DrILLuP ) {var byteArray = new Uint8Array(DRillup);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DRilLUp(i,79);DrilLUP.setUint8(i, byteArray[i]);}}}
Decrypter.f_DRilLUp =  function(DRILLup,DRilLUP){if( Decrypter.N_drilluP == Decrypter.N_dRIlluP && Decrypter.N_DriLlup == Decrypter.N_dRillUP && Decrypter.N_drilLuP == Decrypter.N_DRiLLuP ) {var byteArray = new Uint8Array(DRilLUP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_drillUp(i,51);DRILLup.setUint8(i, byteArray[i]);}}}
Decrypter.f_driLluP =  function(drIlLUp,DrIllup){if( Decrypter.N_DrilLup == Decrypter.N_drILLUp && Decrypter.N_dRiLlup == Decrypter.N_driLLuP && Decrypter.N_DrIllup == Decrypter.N_DRIlluP ) {var byteArray = new Uint8Array(DrIllup);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_drILLUP(i,72);drIlLUp.setUint8(i, byteArray[i]);}}}
Decrypter.f_drilLuP =  function(DRILluP,drILlup){if( Decrypter.N_DrilLup == Decrypter.N_dRiLLUp && Decrypter.N_DRILLup == Decrypter.N_DRiLluP && Decrypter.N_drILlup == Decrypter.N_dRIlluP ) {var byteArray = new Uint8Array(drILlup);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_dRillUp(i,80);DRILluP.setUint8(i, byteArray[i]);}}}
Decrypter.f_driLlUp =  function(dRillUp,DrilLuP){if( Decrypter.N_drILlup == Decrypter.N_driLLup && Decrypter.N_dRIlLuP == Decrypter.N_DriLLuP && Decrypter.N_drIllup == Decrypter.N_DRiLLUp ) {var byteArray = new Uint8Array(DrilLuP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_drIllUp(i,40);dRillUp.setUint8(i, byteArray[i]);}}}
Decrypter.f_dRIllup =  function(DrILLuP,DRIllup){if( Decrypter.N_DRiLLUp == Decrypter.N_DRillUP && Decrypter.N_DRILLUp == Decrypter.N_DrilluP && Decrypter.N_DrIlLUp == Decrypter.N_DRiLLUp ) {var byteArray = new Uint8Array(DRIllup);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_dRIlLuP(i,6);DrILLuP.setUint8(i, byteArray[i]);}}}
Decrypter.f_dRIlluP =  function(DrIlLUp,DrillUP){if( Decrypter.N_DRILlup == Decrypter.N_DRilLup && Decrypter.N_DrIllUp == Decrypter.N_DrILluP && Decrypter.N_DrIllup == Decrypter.N_DrilluP ) {var byteArray = new Uint8Array(DrillUP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_drIlluP(i,70);DrIlLUp.setUint8(i, byteArray[i]);}}}
Decrypter.f_DRilluP =  function(DRilLuP,dRiLlUP){if( Decrypter.N_drILLUp == Decrypter.N_DRILLUp && Decrypter.N_DRIllup == Decrypter.N_DrILluP && Decrypter.N_DrIllup == Decrypter.N_driLLUp ) {var byteArray = new Uint8Array(dRiLlUP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_drIlLUP(i,67);DRilLuP.setUint8(i, byteArray[i]);}}}
Decrypter.f_drIlluP =  function(dRILlUP,DRiLlup){if( Decrypter.N_DRilLup == Decrypter.N_drIlluP && Decrypter.N_DRILlUp == Decrypter.N_DRiLLUp && Decrypter.N_dRILLup == Decrypter.N_dRilLuP ) {var byteArray = new Uint8Array(DRiLlup);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DRILLUp(i,68);dRILlUP.setUint8(i, byteArray[i]);}}}
Decrypter.f_DRillUp =  function(dRIllUP,driLlup){if( Decrypter.N_drilLup == Decrypter.N_DrIlLuP && Decrypter.N_drILlUp == Decrypter.N_DRIlLUp && Decrypter.N_dRiLLUp == Decrypter.N_DRilLuP ) {var byteArray = new Uint8Array(driLlup);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DRIlLuP(i,35);dRIllUP.setUint8(i, byteArray[i]);}}}
Decrypter.f_dRILLUp =  function(dRILlUP,dRiLLUP){if( Decrypter.N_DriLLup == Decrypter.N_DRILlUp && Decrypter.N_DRiLlUp == Decrypter.N_DrilluP && Decrypter.N_DrIlLUp == Decrypter.N_DRIlLuP ) {var byteArray = new Uint8Array(dRiLLUP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_driLLUp(i,62);dRILlUP.setUint8(i, byteArray[i]);}}}
Decrypter.f_dRIlLup =  function(DrIlLUp,DRiLlUP){if( Decrypter.N_driLlUp == Decrypter.N_DriLlUp && Decrypter.N_Drillup == Decrypter.N_DRiLlUp && Decrypter.N_DrILlUp == Decrypter.N_dRillUP ) {var byteArray = new Uint8Array(DRiLlUP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DrillUp(i,22);DrIlLUp.setUint8(i, byteArray[i]);}}}
Decrypter.f_DRiLLUp =  function(drIllup,dRIllup){if( Decrypter.N_DRiLLuP == Decrypter.N_dRillUP && Decrypter.N_drIlLup == Decrypter.N_DRiLLup && Decrypter.N_DrIllup == Decrypter.N_dRILLup ) {var byteArray = new Uint8Array(dRIllup);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DrILLuP(i,59);drIllup.setUint8(i, byteArray[i]);}}}
Decrypter.f_DrILlUp =  function(driLLup,dRillup){if( Decrypter.N_DrILLup == Decrypter.N_drIlLUp && Decrypter.N_drillup == Decrypter.N_drIllUp && Decrypter.N_drIllUp == Decrypter.N_DRiLLUp ) {var byteArray = new Uint8Array(dRillup);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DriLlUp(i,45);driLLup.setUint8(i, byteArray[i]);}}}
Decrypter.f_DRIllUp =  function(DrIllup,dRiLlup){if( Decrypter.N_DrIllup == Decrypter.N_DriLlUp && Decrypter.N_DriLLup == Decrypter.N_dRiLLuP && Decrypter.N_drIllUp == Decrypter.N_driLlUp ) {var byteArray = new Uint8Array(dRiLlup);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_drIlLUP(i,39);DrIllup.setUint8(i, byteArray[i]);}}}
Decrypter.f_dRILLuP =  function(driLLUP,drIllUp){if( Decrypter.N_DRilLup == Decrypter.N_dRILLup && Decrypter.N_dRiLLup == Decrypter.N_DriLLUp && Decrypter.N_DrIllup == Decrypter.N_drILLup ) {var byteArray = new Uint8Array(drIllUp);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_dRilluP(i,94);driLLUP.setUint8(i, byteArray[i]);}}}
Decrypter.f_dRIllUp =  function(dRiLluP,DRillUP){if( Decrypter.N_dRiLLUp == Decrypter.N_DRilluP && Decrypter.N_DriLlUp == Decrypter.N_dRiLLuP && Decrypter.N_dRiLlup == Decrypter.N_drIllUp ) {var byteArray = new Uint8Array(DRillUP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DrIlLuP(i,38);dRiLluP.setUint8(i, byteArray[i]);}}}
Decrypter.f_DRillup =  function(DRilluP,DrILLup){if( Decrypter.N_drILLUp == Decrypter.N_dRilluP && Decrypter.N_drillup == Decrypter.N_DrILlUp && Decrypter.N_DRIllup == Decrypter.N_DRiLlup ) {var byteArray = new Uint8Array(DrILLup);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DrIlluP(i,3);DRilluP.setUint8(i, byteArray[i]);}}}
Decrypter.f_dRiLLUp =  function(dRilLuP,dRilLUP){if( Decrypter.N_drIlluP == Decrypter.N_drILLuP && Decrypter.N_DRiLlup == Decrypter.N_drilluP && Decrypter.N_dRILLUp == Decrypter.N_DrilluP ) {var byteArray = new Uint8Array(dRilLUP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_dRilluP(i,58);dRilLuP.setUint8(i, byteArray[i]);}}}
Decrypter.f_DriLluP =  function(DRIlluP,DriLlUp){if( Decrypter.N_DRiLlup == Decrypter.N_drilLup && Decrypter.N_DrIlLuP == Decrypter.N_drillUP && Decrypter.N_drILlup == Decrypter.N_dRilluP ) {var byteArray = new Uint8Array(DriLlUp);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_drILluP(i,73);DRIlluP.setUint8(i, byteArray[i]);}}}
Decrypter.f_drILluP =  function(DRillUP,dRiLlup){if( Decrypter.N_DriLLUp == Decrypter.N_DRiLLUp && Decrypter.N_DrIlLup == Decrypter.N_dRIlLup && Decrypter.N_DrilLup == Decrypter.N_DrilluP ) {var byteArray = new Uint8Array(dRiLlup);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_dRiLLup(i,76);DRillUP.setUint8(i, byteArray[i]);}}}
Decrypter.f_DrilLuP =  function(drIllup,DRiLLuP){if( Decrypter.N_drILlUp == Decrypter.N_dRiLluP && Decrypter.N_driLlup == Decrypter.N_drillUp && Decrypter.N_dRIlluP == Decrypter.N_DrILluP ) {var byteArray = new Uint8Array(DRiLLuP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DRIlluP(i,81);drIllup.setUint8(i, byteArray[i]);}}}
Decrypter.f_DrILLup =  function(drilluP,dRILluP){if( Decrypter.N_DriLlup == Decrypter.N_DRillUp && Decrypter.N_Drillup == Decrypter.N_DrILluP && Decrypter.N_dRILLUp == Decrypter.N_DRIlLuP ) {var byteArray = new Uint8Array(dRILluP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DRIlLUp(i,29);drilluP.setUint8(i, byteArray[i]);}}}
Decrypter.f_DRiLluP =  function(drIllup,drIlLuP){if( Decrypter.N_drILlup == Decrypter.N_DrilLUp && Decrypter.N_drIllUp == Decrypter.N_drIlLuP && Decrypter.N_DrIllup == Decrypter.N_drilLuP ) {var byteArray = new Uint8Array(drIlLuP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_drIlLup(i,75);drIllup.setUint8(i, byteArray[i]);}}}
Decrypter.f_DrIlLUp =  function(dRilluP,dRiLLUp){if( Decrypter.N_DrILLuP == Decrypter.N_dRillUP && Decrypter.N_dRILLup == Decrypter.N_dRiLLuP && Decrypter.N_DrILlup == Decrypter.N_DriLlUp ) {var byteArray = new Uint8Array(dRiLLUp);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DRiLlUP(i,53);dRilluP.setUint8(i, byteArray[i]);}}}
Decrypter.f_dRiLlUp =  function(drILlup,drIlLUp){if( Decrypter.N_driLLup == Decrypter.N_DRiLLuP && Decrypter.N_dRILlup == Decrypter.N_drilLup && Decrypter.N_driLlup == Decrypter.N_DRILLUp ) {var byteArray = new Uint8Array(drIlLUp);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DrIlLuP(i,42);drILlup.setUint8(i, byteArray[i]);}}}
Decrypter.f_dRILlUp =  function(dRILlup,dRiLLUp){if( Decrypter.N_drIllUp == Decrypter.N_DrilLuP && Decrypter.N_drIlluP == Decrypter.N_DRillUP && Decrypter.N_drIllup == Decrypter.N_DRILluP ) {var byteArray = new Uint8Array(dRiLLUp);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DRillUP(i,46);dRILlup.setUint8(i, byteArray[i]);}}}
Decrypter.f_DRiLLuP =  function(dRILLUP,DriLluP){if( Decrypter.N_DRiLluP == Decrypter.N_drILLuP && Decrypter.N_driLLUp == Decrypter.N_DRILLuP && Decrypter.N_DRILlup == Decrypter.N_dRiLLuP ) {var byteArray = new Uint8Array(DriLluP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DrIlLUP(i,91);dRILLUP.setUint8(i, byteArray[i]);}}}
Decrypter.f_dRIlLUp =  function(dRILLUP,drillUP){if( Decrypter.N_DriLLup == Decrypter.N_DRIlLUp && Decrypter.N_dRILLup == Decrypter.N_DriLlUp && Decrypter.N_dRiLlUp == Decrypter.N_DRiLluP ) {var byteArray = new Uint8Array(drillUP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DrilluP(i,54);dRILLUP.setUint8(i, byteArray[i]);}}}
Decrypter.f_DriLLUp =  function(dRillup,drILlUp){if( Decrypter.N_drILLUp == Decrypter.N_DRilLuP && Decrypter.N_dRIllup == Decrypter.N_DrIllUp && Decrypter.N_DrIllup == Decrypter.N_DrIlLup ) {var byteArray = new Uint8Array(drILlUp);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_drilLUP(i,57);dRillup.setUint8(i, byteArray[i]);}}}
Decrypter.f_drILlUp =  function(DrILluP,DrIlLUP){if( Decrypter.N_DRILlUp == Decrypter.N_DriLluP && Decrypter.N_DRIlluP == Decrypter.N_DriLLuP && Decrypter.N_drilLup == Decrypter.N_driLLuP ) {var byteArray = new Uint8Array(DrIlLUP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_dRIlLUP(i,44);DrILluP.setUint8(i, byteArray[i]);}}}
Decrypter.f_DrilLUp =  function(dRiLluP,driLlup){if( Decrypter.N_DrIlluP == Decrypter.N_DRillUP && Decrypter.N_DrILLUp == Decrypter.N_drIlluP && Decrypter.N_dRILlup == Decrypter.N_DRiLlUp ) {var byteArray = new Uint8Array(driLlup);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_driLluP(i,49);dRiLluP.setUint8(i, byteArray[i]);}}}
Decrypter.f_dRilLuP =  function(drIlLuP,drilLuP){if( Decrypter.N_DRIllup == Decrypter.N_DrIlLuP && Decrypter.N_dRIllup == Decrypter.N_DrIlLuP && Decrypter.N_drillup == Decrypter.N_drILLup ) {var byteArray = new Uint8Array(drilLuP);for (i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DrilLUp(i,82);drIlLuP.setUint8(i, byteArray[i]);}}}
Decrypter.f_DRILLUp =  function(DRillup,drILLuP){if( Decrypter.N_DrILLUp == Decrypter.N_DRIlluP && Decrypter.N_DrIlluP == Decrypter.N_dRILLuP && Decrypter.N_DRILlUp == Decrypter.N_drilLUp ) {var byteArray = new Uint8Array(drILLuP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_dRiLlUP(i,63);DRillup.setUint8(i, byteArray[i]);}}}
Decrypter.f_DRILLup =  function(DrIllup,DRiLLuP){if( Decrypter.N_drIlLup == Decrypter.N_DrIlluP && Decrypter.N_DRiLlup == Decrypter.N_DrIllUp && Decrypter.N_DrilluP == Decrypter.N_dRilluP ) {var byteArray = new Uint8Array(DRiLLuP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_driLluP(i,31);DrIllup.setUint8(i, byteArray[i]);}}}
Decrypter.f_drilLup =  function(dRiLLuP,driLlUp){if( Decrypter.N_DRILLup == Decrypter.N_DRilLuP && Decrypter.N_dRillUp == Decrypter.N_DrILlUp && Decrypter.N_DRillup == Decrypter.N_DrilLuP ) {var byteArray = new Uint8Array(driLlUp);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_drILLup(i,16);dRiLLuP.setUint8(i, byteArray[i]);}}}
Decrypter.f_driLLup =  function(dRillup,dRIlluP){if( Decrypter.N_dRIllup == Decrypter.N_DrIlLuP && Decrypter.N_DRIllup == Decrypter.N_drilLup && Decrypter.N_drIllup == Decrypter.N_dRiLlup ) {var byteArray = new Uint8Array(dRIlluP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_drILlUP(i,24);dRillup.setUint8(i, byteArray[i]);}}}
Decrypter.f_dRiLlup =  function(DRILLUp,DrIlLup){if( Decrypter.N_dRillup == Decrypter.N_dRiLLup && Decrypter.N_dRiLLup == Decrypter.N_DrilLuP && Decrypter.N_drILLup == Decrypter.N_DrILLuP ) {var byteArray = new Uint8Array(DrIlLup);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_drIlLUP(i,10);DRILLUp.setUint8(i, byteArray[i]);}}}
Decrypter.f_DRiLLup =  function(DrilLuP,DRilluP){if( Decrypter.N_drillup == Decrypter.N_DRILLuP && Decrypter.N_drILLup == Decrypter.N_DRILLuP && Decrypter.N_drIllup == Decrypter.N_DRilLup ) {var byteArray = new Uint8Array(DRilluP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DRiLluP(i,27);DrilLuP.setUint8(i, byteArray[i]);}}}
Decrypter.f_drIllUp =  function(DRiLlup,DRilluP){if( Decrypter.N_dRiLlup == Decrypter.N_dRillUp && Decrypter.N_driLLup == Decrypter.N_dRilluP && Decrypter.N_drIllup == Decrypter.N_dRILlUp ) {var byteArray = new Uint8Array(DRilluP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DrIlluP(i,36);DRiLlup.setUint8(i, byteArray[i]);}}}
Decrypter.f_dRilluP =  function(dRillUP,DRilLuP){if( Decrypter.N_DrILlUp == Decrypter.N_drIlLUp && Decrypter.N_DrILLup == Decrypter.N_DriLLUp && Decrypter.N_DrIllup == Decrypter.N_DRilLup ) {var byteArray = new Uint8Array(DRilLuP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DRiLlUP(i,66);dRillUP.setUint8(i, byteArray[i]);}}}
Decrypter.f_DRilLuP =  function(DRILlup,DRIlLuP){if( Decrypter.N_dRIllup == Decrypter.N_dRiLLUp && Decrypter.N_DrilLUp == Decrypter.N_dRilluP && Decrypter.N_DRILLup == Decrypter.N_drilLuP ) {var byteArray = new Uint8Array(DRIlLuP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_drILlUP(i,83);DRILlup.setUint8(i, byteArray[i]);}}}
Decrypter.f_DriLLup =  function(DrillUP,DrILlUP){if( Decrypter.N_dRilLUp == Decrypter.N_drillUP && Decrypter.N_drilLUp == Decrypter.N_DRILLuP && Decrypter.N_drILLUp == Decrypter.N_dRiLluP ) {var byteArray = new Uint8Array(DrILlUP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_driLLuP(i,25);DrillUP.setUint8(i, byteArray[i]);}}}
Decrypter.f_DRIlLuP =  function(dRIlLUp,Drillup){if( Decrypter.N_DrILlup == Decrypter.N_dRILLup && Decrypter.N_DrIlLup == Decrypter.N_dRiLluP && Decrypter.N_dRilLUp == Decrypter.N_DRillUP ) {var byteArray = new Uint8Array(Drillup);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_driLlUp(i,87);dRIlLUp.setUint8(i, byteArray[i]);}}}
Decrypter.f_dRiLluP =  function(dRIllup,DRILlup){if( Decrypter.N_dRillUp == Decrypter.N_drIlluP && Decrypter.N_DriLLup == Decrypter.N_drilLUp && Decrypter.N_dRILLup == Decrypter.N_dRIlLUp ) {var byteArray = new Uint8Array(DRILlup);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_dRillUP(i,74);dRIllup.setUint8(i, byteArray[i]);}}}
Decrypter.f_driLLUp =  function(DRIlLUp,DRILLuP){if( Decrypter.N_DRIlLUp == Decrypter.N_drillUP && Decrypter.N_DRIllUp == Decrypter.N_DRillUP && Decrypter.N_dRIlLup == Decrypter.N_DRIllUp ) {var byteArray = new Uint8Array(DRILLuP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_drILLUp(i,56);DRIlLUp.setUint8(i, byteArray[i]);}}}
Decrypter.f_DrIlLup =  function(drILLup,driLLUp){if( Decrypter.N_drILlup == Decrypter.N_DRiLLuP && Decrypter.N_drilLUp == Decrypter.N_dRILLUp && Decrypter.N_DrILLuP == Decrypter.N_DRILLuP ) {var byteArray = new Uint8Array(driLLUp);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_drILluP(i,21);drILLup.setUint8(i, byteArray[i]);}}}
Decrypter.f_DriLlup =  function(dRilLup,DRILlUP){if( Decrypter.N_dRiLluP == Decrypter.N_drIlLuP && Decrypter.N_DrILlUp == Decrypter.N_dRILLUp && Decrypter.N_dRilluP == Decrypter.N_DRiLLuP ) {var byteArray = new Uint8Array(DRILlUP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DrIllUP(i,9);dRilLup.setUint8(i, byteArray[i]);}}}
Decrypter.f_DrIllUp =  function(DriLLup,drILlUp){if( Decrypter.N_dRiLlUp == Decrypter.N_dRILlUp && Decrypter.N_DrilLup == Decrypter.N_driLLup && Decrypter.N_drILlup == Decrypter.N_DRILLuP ) {var byteArray = new Uint8Array(drILlUp);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DrILLuP(i,37);DriLLup.setUint8(i, byteArray[i]);}}}
Decrypter.f_dRIlLuP =  function(DrILluP,dRIlluP){if( Decrypter.N_DRILluP == Decrypter.N_drILLuP && Decrypter.N_driLlUp == Decrypter.N_DrillUP && Decrypter.N_drIlLuP == Decrypter.N_DRiLLuP ) {var byteArray = new Uint8Array(dRIlluP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DriLlUP(i,86);DrILluP.setUint8(i, byteArray[i]);}}}
Decrypter.f_drILLuP =  function(drIlluP,drILlUP){if( Decrypter.N_drIllup == Decrypter.N_DRIlluP && Decrypter.N_DRIllup == Decrypter.N_DrIllUp && Decrypter.N_DRiLLup == Decrypter.N_DRiLluP ) {var byteArray = new Uint8Array(drILlUP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DRIlLuP(i,92);drIlluP.setUint8(i, byteArray[i]);}}}
Decrypter.f_drIlLuP =  function(DRILlUP,DrILLuP){if( Decrypter.N_DrIlLup == Decrypter.N_drILlUp && Decrypter.N_DRIlLup == Decrypter.N_dRillUP && Decrypter.N_dRIllup == Decrypter.N_dRilLup ) {var byteArray = new Uint8Array(DrILLuP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DrIlLUp(i,84);DRILlUP.setUint8(i, byteArray[i]);}}}
Decrypter.f_DRiLlUp =  function(DRIlLUp,DRIlLuP){if( Decrypter.N_drILlup == Decrypter.N_DRilLup && Decrypter.N_dRIlLup == Decrypter.N_DrIllUp && Decrypter.N_DRiLluP == Decrypter.N_drILluP ) {var byteArray = new Uint8Array(DRIlLuP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_drIlLup(i,43);DRIlLUp.setUint8(i, byteArray[i]);}}}
Decrypter.f_dRillUp =  function(drIlLUp,DRIlLUp){if( Decrypter.N_dRillup == Decrypter.N_driLlup && Decrypter.N_DrIlluP == Decrypter.N_DRILluP && Decrypter.N_drIllup == Decrypter.N_driLlUp ) {var byteArray = new Uint8Array(DRIlLUp);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DRillup(i,34);drIlLUp.setUint8(i, byteArray[i]);}}}
Decrypter.f_DrilLup =  function(dRillUP,DriLLup){if( Decrypter.N_DriLLup == Decrypter.N_driLLUp && Decrypter.N_DriLlUp == Decrypter.N_dRIlLUp && Decrypter.N_DrIllUp == Decrypter.N_DrIlLuP ) {var byteArray = new Uint8Array(DriLLup);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_driLlup(i,17);dRillUP.setUint8(i, byteArray[i]);}}}
Decrypter.f_DRillUP =  function(dRILLuP,dRILluP){if( Decrypter.N_driLluP == Decrypter.N_dRILluP && Decrypter.N_dRiLlUp == Decrypter.N_dRILLUp && Decrypter.N_dRiLLUp == Decrypter.N_drILLuP ) {var byteArray = new Uint8Array(dRILluP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DrILlUp(i,99);dRILLuP.setUint8(i, byteArray[i]);}}}
Decrypter.f_DRilLup =  function(dRillUp,DrilLup){if( Decrypter.N_DRILlup == Decrypter.N_DriLlUp && Decrypter.N_dRiLlup == Decrypter.N_DRiLLuP && Decrypter.N_DRiLlUp == Decrypter.N_DRIlLuP ) {var byteArray = new Uint8Array(DrilLup);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DRIlLup(i,19);dRillUp.setUint8(i, byteArray[i]);}}}
Decrypter.f_DrillUP =  function(DRillUP,DRiLluP){if( Decrypter.N_DRillup == Decrypter.N_dRIlLup && Decrypter.N_DriLlup == Decrypter.N_dRIlLUp && Decrypter.N_dRilLup == Decrypter.N_driLluP ) {var byteArray = new Uint8Array(DRiLluP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_dRIllUp(i,97);DRillUP.setUint8(i, byteArray[i]);}}}
Decrypter.f_dRillup =  function(DrilLUP,DRillUP){if( Decrypter.N_drilLup == Decrypter.N_DrillUP && Decrypter.N_dRiLLUp == Decrypter.N_dRilluP && Decrypter.N_DRiLlup == Decrypter.N_DrIlLuP ) {var byteArray = new Uint8Array(DRillUP);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_DrILLup(i,2);DrilLUP.setUint8(i, byteArray[i]);}}}
Decrypter.f_DrIllup =  function(dRilLUp,DRIlLUp){if( Decrypter.N_driLlUp == Decrypter.N_DrilluP && Decrypter.N_drilLUp == Decrypter.N_drILLUp && Decrypter.N_dRilLup == Decrypter.N_drilluP ) {var byteArray = new Uint8Array(DRIlLUp);for (var i = 0; i < this._headerlength; i++) {byteArray[i] = byteArray[i] ^ this.n_dRiLLup(i,5);dRilLUp.setUint8(i, byteArray[i]);}}}
