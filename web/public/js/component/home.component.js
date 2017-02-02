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
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var app_component_1 = require("./app.component");
var HomeComponent = (function () {
    function HomeComponent(_app, router) {
        this._app = _app;
        this.router = router;
        this.videoId = "p00Q8pomuc0";
        this.YT = window.YT;
        this.player = {};
        this.playbackSpeed = 0.4;
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.bgheight = window.innerHeight,
            this.bgwidth = 1920 * (this.bgheight / 1080),
            this.bgleft = (this.bgwidth - window.innerWidth) / 2;
        var currentTime = null;
        if (this.YT.loaded !== 1) {
            //setTimeout(this.setVideoPlayer.bind(this), 100);
            // TODO: wait for it to load?
            console.log('the youtube api is not loaded yet');
        }
        else {
            var frameCallback_1 = function () {
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
                        var iframe = _this.player.getIframe();
                        iframe.style.width = _this.bgwidth + 'px';
                        iframe.style.height = _this.bgheight + 'px';
                        iframe.style.left = '-' + _this.bgleft + 'px';
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
    HomeComponent.prototype.scrollBelowLanding = function () {
        this._scrollTo(this.bgheight, 500);
    };
    HomeComponent.prototype._scrollTo = function (to, duration) {
        var maxScroll = document.body.scrollHeight - window.innerHeight;
        if (maxScroll < to) {
            duration = duration * (maxScroll / to);
            to = maxScroll;
        }
        var from = window.scrollY, difference = to - from, perTick = duration > 0 ? difference / duration * 10 : difference;
        var easeInOutQuad = function (time, start, end, duration) {
            time /= duration / 2;
            if (time < 1)
                return end / 2 * time * time + start;
            time--;
            return -end / 2 * (time * (time - 2) - 1) + start;
        };
        var startTime = 0;
        var scrollFunc = function (time) {
            if (startTime === 0) {
                startTime = time;
            }
            if (window.scrollY === to || (time - startTime) >= duration) {
                return;
            }
            window.scroll(0, easeInOutQuad((time - startTime), from, to, duration));
            // if (window.scrollY === to) return;
            // if (duration - 10 > 0) {
            //     this._scrollTo(to, duration - 10);
            // }
            requestAnimationFrame(scrollFunc);
        };
        requestAnimationFrame(scrollFunc);
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "home",
        templateUrl: "../template/home.component.html"
    }),
    __metadata("design:paramtypes", [app_component_1.AppComponent,
        router_1.Router])
], HomeComponent);
exports.HomeComponent = HomeComponent;

//# sourceMappingURL=home.component.js.map
