'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsCookie = require('js-cookie');

var _jsCookie2 = _interopRequireDefault(_jsCookie);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SoundController = function () {
    function SoundController() {
        var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, SoundController);

        this.COOKIE_NAME = opts.COOKIE_NAME || 'isMute';
        this.EXPIRES_DATE = opts.EXPIRES_DATE;
        this.disableBlurPause = !!opts.disableBlurPause;

        this.audio = new Audio(opts.src);
        this.audio.volume = 0.2;
        this.audio.loop = !opts.disableLoop;
        this.audio.muted = this.getCookie();

        this.initListeners();
    }

    _createClass(SoundController, [{
        key: 'initListeners',
        value: function initListeners() {
            var _this = this;

            if (!this.disableBlurPause) {
                $(window).on('blur', function () {
                    _this.pause();
                }).on('focus', function () {
                    _this.play();
                });
            }
        }
    }, {
        key: 'play',
        value: function play() {
            if (this.audio.muted) return this;
            this.audio.play();
            return this;
        }
    }, {
        key: 'pause',
        value: function pause() {
            this.audio.pause();
            return this;
        }
    }, {
        key: 'togglePlay',
        value: function togglePlay(flag) {
            if (flag === undefined) {
                flag = !this.audio.paused;
            }
            flag ? this.play() : this.pause();
            return this;
        }
    }, {
        key: 'mute',
        value: function mute() {
            this.audio.muted = true;
            this.setCookie(this.audio.muted);
            return this;
        }
    }, {
        key: 'unmute',
        value: function unmute() {
            this.audio.muted = false;
            this.setCookie(this.audio.muted);
            return this;
        }
    }, {
        key: 'toggleMute',
        value: function toggleMute(flag) {
            if (flag === undefined) {
                flag = !this.getCookie();
            }
            flag ? this.mute() : this.unmute();
            return this;
        }
    }, {
        key: 'setCookie',
        value: function setCookie(value) {
            return _jsCookie2.default.set(this.COOKIE_NAME, value, { expires: this.EXPIRES_DATE });
        }
    }, {
        key: 'getCookie',
        value: function getCookie() {
            var value = _jsCookie2.default.get(this.COOKIE_NAME);
            return value === 'true';
        }
    }, {
        key: 'hasCookie',
        value: function hasCookie() {
            return _jsCookie2.default.get(this.COOKIE_NAME) !== undefined;
        }
    }]);

    return SoundController;
}();

exports.default = SoundController;