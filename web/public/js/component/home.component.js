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
        var gotoScrollY = Math.min(this.bgheight, (document.body.scrollHeight - window.innerWidth)), cosParameter = (window.scrollY - gotoScrollY) / 2, scrollCount = 0, oldTimestamp = performance.now(), duration = 500;
        function step(newTimestamp) {
            scrollCount += Math.PI / (duration / (newTimestamp - oldTimestamp));
            if (scrollCount >= Math.PI)
                window.scrollTo(0, 0);
            if (window.scrollY === 0)
                return;
            window.scrollTo(0, Math.round(cosParameter + cosParameter * Math.cos(scrollCount)));
            oldTimestamp = newTimestamp;
            window.requestAnimationFrame(step);
        }
        window.requestAnimationFrame(step);
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
