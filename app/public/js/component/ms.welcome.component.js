"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
// import { MarketingSiteComponent } from './ms.component';
var app_component_1 = require("./app.component");
var anim_util_1 = require("../util/anim.util");
var WelcomeComponent = (function () {
    function WelcomeComponent(_app, router, http) {
        this._app = _app;
        this.router = router;
        this.http = http;
        this.videoId = "p00Q8pomuc0";
        this.YT = window.YT;
        this.playbackSpeed = 0.4;
        this.toolbarheight = 48;
        this.pageStart = window.innerHeight - (this.toolbarheight + 24);
        this.pagepos = this.pageStart;
    }
    WelcomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.setupSize();
        this.scrollSubscription = this._app.onScroll$.subscribe(function (scrollPos) {
            _this.pagepos = _this.pageStart - scrollPos;
            if (_this.pagepos > 20 || (scrollPos > _this.whiteBracketTop && scrollPos < _this.whiteBracketBottom)) {
                _this._app.showWhiteBrackets(true);
            }
            else {
                _this._app.showWhiteBrackets(false);
            }
        });
        this._app.showWhiteBrackets(true);
    };
    WelcomeComponent.prototype.login = function () {
        if (this._app.user) {
            this.router.navigate(['/app']);
        }
        else {
            this._app.login();
        }
    };
    WelcomeComponent.prototype.setupSize = function () {
        var targetRatio = 1920 / 1080, screenRatio = window.innerWidth / window.innerHeight;
        if (targetRatio >= screenRatio) {
            this.bgheight = window.innerHeight;
            this.bgwidth = 1920 * (this.bgheight / 1080);
            this.bgtop = 0;
            this.bgleft = (this.bgwidth - window.innerWidth) / 2;
        }
        else {
            this.bgwidth = window.innerWidth;
            this.bgheight = 1080 * (this.bgwidth / 1920);
            this.bgtop = (this.bgheight - window.innerHeight) / 2;
            this.bgleft = 0;
        }
        if (window.innerWidth < 768) {
            // don't do video on tablet or mobile
            if (this.player) {
                this.player.getIframe().remove();
                this.player = null;
            }
        }
        else {
            if (!this.player) {
                this.initVideoBG();
            }
            else {
                this.resizeVideo();
            }
        }
        var heroes = document.querySelectorAll('.hero');
        for (var i = 0; i < heroes.length; i++) {
            var h = heroes[i];
            var rect = h.getBoundingClientRect();
            // FIXME:
            this.whiteBracketTop = rect.top;
            this.whiteBracketBottom = rect.bottom;
        }
    };
    WelcomeComponent.prototype.resizeVideo = function () {
        var iframe = this.player.getIframe();
        iframe.style.width = this.bgwidth + 'px';
        iframe.style.height = this.bgheight + 'px';
        iframe.style.left = '-' + this.bgleft + 'px';
        iframe.style.top = '-' + this.bgtop + 'px';
    };
    WelcomeComponent.prototype.initVideoBG = function () {
        var _this = this;
        var currentTime = null;
        if (window.innerWidth < 768) {
            return;
        }
        if (this.YT.loaded !== 1) {
            setTimeout(function () { return _this.initVideoBG(); }, 500);
        }
        else {
            var frameCallback_1 = function () {
                if (!_this.player) {
                    return;
                }
                if (!_this.currentTime) {
                    // restart the player
                    if (_this.player.getCurrentTime() + 0.1 >= _this.player.getDuration()) {
                        _this.currentTime = _this.player.getCurrentTime();
                        _this.player.pauseVideo();
                        _this.player.seekTo(0);
                    }
                }
                else if (_this.player.getCurrentTime() < _this.currentTime) {
                    _this.currentTime = null;
                    _this.player.playVideo();
                }
                requestAnimationFrame(frameCallback_1);
            };
            this.player = new this.YT.Player('player', {
                height: "315",
                width: "560",
                videoId: this.videoId,
                playerVars: {
                    autohide: 1,
                    autoplay: 0,
                    controls: 0,
                    enablejsapi: 1,
                    iv_load_policy: 3,
                    loop: 0,
                    modestbranding: 1,
                    playsinline: 1,
                    rel: 0,
                    showinfo: 0,
                    wmode: "opaque"
                },
                events: {
                    onReady: function (event) {
                        //this.syncPlayer(); scale the video and set the speed
                        _this.resizeVideo();
                        _this.player.setPlaybackRate(_this.playbackSpeed);
                        _this.player.mute();
                        _this.player.playVideo();
                    },
                    onStateChange: function (newstate) {
                        //console.log('new state', newstate);
                        var player = _this.player, iframe = player.getIframe(), totalLength = player.getDuration() / _this.playbackSpeed;
                        if (newstate.data === _this.YT.PlayerState.BUFFERING
                            && 1 !== player.getVideoLoadedFraction()
                            && (0 === player.getCurrentTime() || player.getCurrentTime() > totalLength - -0.1)) {
                            // this.logger("BUFFERING")
                            // this.autoPlayTestTimeout();
                        }
                        else if (newstate.data === _this.YT.PlayerState.PLAYING) {
                            _this.player.getIframe().style.opacity = 1;
                            requestAnimationFrame(frameCallback_1);
                        }
                        else if (newstate.data === _this.YT.PlayerState.ENDED) {
                            player.playVideo();
                        }
                    }
                }
            });
        } // end of if YT is loaded yet
    }; // end of ngOnInit
    WelcomeComponent.prototype.scrollBelowLanding = function () {
        this._app.scrollTo(this.pageStart - 10, 800);
    };
    WelcomeComponent.prototype.showGetNotified = function () {
        this.getNotifiedDialogVisible = true;
    };
    WelcomeComponent.prototype.hideGetNotified = function () {
        this.getNotifiedDialogVisible = false;
        this.sent = false;
        this.sending = false;
    };
    WelcomeComponent.prototype.submitGetNotified = function () {
        var _this = this;
        if (!this.firstName || !this.lastName || !this.email) {
            this.error = "Please enter your name and email to be notified when ImprovPlus is ready.";
        }
        else {
            this.error = "";
            this.sending = true;
            this._app.showLoader();
            this.http.post('/getNotified', {
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email
            })
                .toPromise()
                .then(function (response) {
                _this._app.hideLoader();
                _this.sending = false;
                _this.sent = true;
            });
        }
    };
    return WelcomeComponent;
}());
WelcomeComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "welcome",
        templateUrl: "../template/ms.welcome.component.html",
        animations: [
            anim_util_1.DialogAnim.dialog,
            anim_util_1.FadeAnim.fade
        ]
    }),
    __metadata("design:paramtypes", [app_component_1.AppComponent,
        router_1.Router,
        http_1.Http])
], WelcomeComponent);
exports.WelcomeComponent = WelcomeComponent;

//# sourceMappingURL=ms.welcome.component.js.map
