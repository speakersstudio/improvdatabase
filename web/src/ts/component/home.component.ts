import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Headers, Http } from '@angular/http';
import { FormsModule } from '@angular/forms';

import 'rxjs/add/operator/toPromise';

import { AppComponent } from './app.component';

import { DialogAnim, FadeAnim } from '../util/anim.util';

@Component({
    moduleId: module.id,
    selector: "home",
    templateUrl: "../template/home.component.html",
    animations: [
        DialogAnim.dialog,
        FadeAnim.fade
    ]
})
export class HomeComponent implements OnInit {

    videoId = "p00Q8pomuc0";

    bgheight: number;
    bgwidth: number;
    bgleft: number;
    bgtop: number;

    YT = (<any>window).YT;
    player: any;
    playbackSpeed: number = 0.4;
    currentTime: number;

    getNotifiedDialogVisible: boolean;

    firstName: string;
    lastName: string;
    email: string;

    error: string;

    sending: boolean;
    sent: boolean;

    constructor(
        private _app: AppComponent,
        private router: Router,
        private http: Http
    ) { }

    ngOnInit(): void {
        this.setupSize();
    }

    login(): void {
        window.location.href = "/app";
    }

    setupSize(): void {
        let targetRatio = 1920 / 1080,
            screenRatio = window.innerWidth / window.innerHeight;

        if (targetRatio >= screenRatio) {
            this.bgheight = window.innerHeight;
            this.bgwidth = 1920 * (this.bgheight / 1080);
            this.bgtop = 0;
            this.bgleft = (this.bgwidth - window.innerWidth) / 2;
        } else {
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
        } else {
            if (!this.player) {
                this.initVideoBG();
            } else {
                this.resizeVideo();
            }
        }

        let heroes = document.querySelectorAll('.hero');
        for (let i = 0; i < heroes.length; i++) {
            let h = heroes[i];
            let rect = h.getBoundingClientRect();
            this._app.whiteBracketTop = rect.top;
            this._app.whiteBracketBottom = rect.bottom;
        }
    }

    resizeVideo(): void {
        let iframe = this.player.getIframe();

        iframe.style.width = this.bgwidth + 'px';
        iframe.style.height = this.bgheight + 'px';
        iframe.style.left = '-' + this.bgleft + 'px';
        iframe.style.top = '-' + this.bgtop + 'px';
    }

    initVideoBG(): void {

        var currentTime = null;

        if (window.innerWidth < 768) {
            return;
        }
            
        if (this.YT.loaded !== 1) {
            setTimeout(() => this.initVideoBG(), 500);
        } else {
        
            let frameCallback = () => {
                if (!this.player) {
                    return;
                }

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

                            this.resizeVideo();

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

    scrollBelowLanding(): void {
        this._scrollTo(this._app.pageStart - 10, 800);
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

    showGetNotified(): void {
        this.getNotifiedDialogVisible = true;
    }
    hideGetNotified(): void {
        this.getNotifiedDialogVisible = false;
        this.sent = false;
        this.sending = false;
    }

    submitGetNotified(): void {
        if (!this.firstName || !this.lastName || !this.email) {
            this.error = "Please enter your name and email to be notified when ImprovPlus is ready."
        } else {
            this.error = "";
            
            this.sending = true;
            this._app.showLoader();
            this.http.post('/getNotified', {
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email
            })
                .toPromise()
                .then(response => {
                    this._app.hideLoader();
                    this.sending = false;
                    this.sent = true;
                });
        }
    }

}
