import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppComponent } from './app.component';

@Component({
    moduleId: module.id,
    selector: "home",
    templateUrl: "../template/home.component.html"
})
export class HomeComponent implements OnInit {

    videoId = "p00Q8pomuc0";

    bgheight: number;
    bgwidth: number;
    bgleft: number;

    YT = (<any>window).YT;
    player: any = {};
    playbackSpeed: number = 0.4;
    currentTime: number;

    constructor(
        private _app: AppComponent,
        private router: Router
    ) { }

    ngOnInit(): void {

        this.bgheight = window.innerHeight,
        this.bgwidth = 1920 * (this.bgheight / 1080),
        this.bgleft = (this.bgwidth - window.innerWidth) / 2;

        var currentTime = null;
            
        if (this.YT.loaded !== 1) {
            //setTimeout(this.setVideoPlayer.bind(this), 100);
            // TODO: wait for it to load?
            console.log('the youtube api is not loaded yet');
        } else {
        
            let frameCallback = () => {
                if (!this.currentTime){
                    // restart the player
                    if (this.player.getCurrentTime() + 0.1 >= this.player.getDuration()) {
                        this.currentTime = this.player.getCurrentTime();
                        this.player.pauseVideo();
                        this.player.seekTo(0);
                    }
                } else if (this.player.getCurrentTime() < this.currentTime) {
                    this.currentTime = null;
                    this.player.playVideo()
                }
                
                requestAnimationFrame(frameCallback)
            };

            this.player = new this.YT.Player(
                'player',
                {
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
                        onReady: (event) => {
                            //this.syncPlayer(); scale the video and set the speed

                            let iframe = this.player.getIframe();

                            iframe.style.width = this.bgwidth + 'px';
                            iframe.style.height = this.bgheight + 'px';
                            iframe.style.left = '-' + this.bgleft + 'px';

                            this.player.setPlaybackRate(this.playbackSpeed);

                            this.player.mute();
                            this.player.playVideo();
                        },
                        onStateChange: (newstate) => {
                            //console.log('new state', newstate);

                            let player = this.player,
                                iframe = player.getIframe(),
                                totalLength = player.getDuration() / this.playbackSpeed;

                            if (newstate.data === this.YT.PlayerState.BUFFERING 
                                && 1 !== player.getVideoLoadedFraction() 
                                    && (0 === player.getCurrentTime() || player.getCurrentTime() > totalLength - -0.1)) {

                                // this.logger("BUFFERING")
                                // this.autoPlayTestTimeout();

                            } else if (newstate.data === this.YT.PlayerState.PLAYING) {

                                this.player.getIframe().style.opacity = 1;
                                
                                requestAnimationFrame(frameCallback)

                            } else if (newstate.data === this.YT.PlayerState.ENDED) {

                                player.playVideo()

                            }
                        }
                    }
                });

        } // end of if YT is loaded yet

    } // end of ngOnInit

    scrollInterval: any;

    scrollBelowLanding(): void {
        this._scrollTo(this.bgheight, 500);
    }

    private _scrollTo(to, duration) {
        let maxScroll = document.body.scrollHeight - window.innerHeight;
        if (maxScroll < to) {
            duration = duration * (maxScroll / to);
            to = maxScroll;
        }
        
        let from = window.scrollY,
            difference = to - from,
            perTick = duration > 0 ? difference / duration * 10 : difference;

        let easeInOutQuad = function (time, start, end, duration) {
            time /= duration/2;
            if (time < 1) return end/2*time*time + start;
            time--;
            return -end/2 * (time*(time-2) - 1) + start;
        }

        let startTime = 0;

        let scrollFunc = function(time) {
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
    }

}
