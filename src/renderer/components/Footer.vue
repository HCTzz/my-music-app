<template>
    <div class="footer" ref="fooWidth">
        <audio autoplay controls
            :src="url"
            v-show="false"
            ref="audio"
            @ended="next(false)"
            @timeupdate="timeupdate">
        </audio>
        <div class="footer-left">
            <i class="iconfont icon-xiayishou prev"></i>
            <!-- 播放icon  icon-icon12 点击暂停 -->
            <i class="iconfont" @click="playOrPaus" :class="isPLay?'icon-icon12':'icon-jixubofang'"></i>
            <i class="iconfont icon-xiayishou last"></i>
        </div>
        <div class="footer-center" >
            <v-slider
                :value="curTimeNum"
                :totalVal="tolTimeNum"
                :width="width"
                :show=true
                @skip="skip"
                @move="move">
            </v-slider> 
        </div>
        <div class="footer-right">
            <div class="sound">
                <i class="iconfont icon-icon-system-fi-voice" :style="{'height':' 16px'}"></i>
                <span></span>
            </div>
            <v-slider
                :value="curTimeNum"
                :totalVal="tolTimeNum"
                :width="120"
                :show=false
                @skip="skip"
                :style="{'margin-left': '15px','margin-right': '0px'}"
                @move="move">
            </v-slider> 
            <div class="icon-center">
                <i class="iconfont " @click="changeType" :title="getTitle" :class="{'icon-single-loop':0 == typeIndex ,'icon-xunhuan':1 == typeIndex,'icon-suiji':2==typeIndex }"></i>
                <i class="iconfont icon-lrc"></i>
                <span :style="{'padding-top':'8px'}">
                    <i class="iconfont icon-plist"></i>
                    <span>12</span>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    import vSlider from './common/slider/slider.vue'
    export default {
        name: 'vFooter',
        components: {
            vSlider
        },
        data() {
            return {
                url: '',
                curTime: '00:00',
                tolTime: '00:00',
                curTimeNum: 0,
                tolTimeNum: 0,
                volume: 1,
                //timer: {},
                isVolumeOff: false,
                saveVolume: 1,
                playStateAll: ['loop', 'loopOne', 'random', 'order'],
                playStateIndex: 0,
                showDialog: false,
                typeIndex: 0
            }
        },
        created() {},
        mounted() {},
        computed: {
            getTitle() {
                let index = this.typeIndex;
                let title = index == 0 ? '单曲循环' : index == 1 ? '循环播放' : '随机播放'
                return title
            },
            isPLay() {
                return this.$store.state.allState.isPLay
            },
            width() {
                console.log(this.$refs)
                return '100%'
            }
        },
        methods: {
            changeType() {
                // console.log(this.typeIndex);
                this.typeIndex = this.typeIndex == 2 ? this.typeIndex = 0 : ++this.typeIndex
            },
            playOrPaus() {
                this.$store.commit('ISPLAY')
            },
            formatTime(time) {
                let second = time.toFixed() % 60
                let min = (time.toFixed() - second) / 60
                second = second > 9 ? second : `0${second}`
                min = min > 9 ? min : `0${min}`
                return `${min}:${second}`
            },
            formatDuration(time) {
                time = Math.floor(time / 1000)
                let second = time % 60
                let min = (time - second) / 60
                second = second > 9 ? second : `0${second}`
                min = min > 9 ? min : `0${min}`
                return `${min}:${second}`
            },
            timeupdate() {
                this.curTimeNum = this.$refs.audio && this.$refs.audio.currentTime
                this.curTime = this.$refs.audio && this.formatTime(this.$refs.audio.currentTime)
            },
            skip(skipWidth) {
                if (skipWidth === 0) {
                    this.$refs.audio.currentTime = 0
                    this.curTimeNum = 0
                    return
                }
                this.$refs.audio.currentTime = skipWidth / this.width * this.tolTimeNum
                this.curTimeNum = this.$refs.audio.currentTime
            },
            skipVolume(skipWidth) {
                if (skipWidth === 0) {
                    this.$refs.audio.volume = 0
                    this.volume = 0
                    this.saveVolume = 0
                    this.isVolumeOff = true
                    return
                }
                this.$refs.audio.volume = skipWidth / 100 * 1 > 0 ? skipWidth / 100 * 1 : 0
                this.volume = this.$refs.audio.volume
                this.saveVolume = this.volume
                this.isVolumeOff = false
            },
            volumeOff() {
                this.isVolumeOff = !this.isVolumeOff
                if (this.isVolumeOff) {
                    this.$refs.audio.volume = 0
                    this.volume = 0
                } else {
                    this.$refs.audio.volume = this.saveVolume
                    this.volume = this.$refs.audio.volume
                }
            },
            move(value) {
                if (value === 0) {
                    this.$refs.audio.currentTime = 0
                    this.curTimeNum = 0
                    return
                }
                this.$refs.audio.currentTime = value / this.width * this.tolTimeNum
                this.curTimeNum = this.$refs.audio.currentTime
            },
            moveVolume(value) {
                if (value === 0) {
                    this.$refs.audio.volume = 0
                    this.volume = 0
                    this.saveVolume = this.volume
                    this.isVolumeOff = true
                    return
                }
                this.$refs.audio.volume = value / 100 * 1 > 0 ? value / 100 * 1 : 0
                this.volume = this.$refs.audio.volume
                this.saveVolume = this.volume
                this.isVolumeOff = false
            },
            next(flag) {
                if (this.musicList.length === 0) return
                if (this.playStateIndex === 0) {
                    this.nowPlayIndex === this.musicList.length - 1 ? this.$store.commit('setPlayIndex', 0) : this.$store.commit('setPlayIndex', ++this.nowPlayIndex)
                    this.getURL(this.musicList[this.nowPlayIndex].id)
                    return
                }
                if (this.playStateIndex === 1) {
                    if (!flag) return this.$refs.audio.load()
                    this.nowPlayIndex === this.musicList.length - 1 ? this.$store.commit('setPlayIndex', 0) : this.$store.commit('setPlayIndex', ++this.nowPlayIndex)
                    this.getURL(this.musicList[this.nowPlayIndex].id)
                }
                if (this.playStateIndex === 2) {
                    this.$store.commit('setPlayIndex', Math.floor(Math.random() * this.musicList.length))
                    this.getURL(this.musicList[this.nowPlayIndex].id)
                    return
                }
                if (this.playStateIndex === 3) {
                    if (this.nowPlayIndex === this.musicList.length - 1 && !flag) {
                        return
                    }
                    this.nowPlayIndex === this.musicList.length - 1 ? this.$store.commit('setPlayIndex', 0) : this.$store.commit('setPlayIndex', ++this.nowPlayIndex)
                    this.getURL(this.musicList[this.nowPlayIndex].id)
                    return
                }
            },
            prev() {
                if (this.musicList.length === 0) return
                this.nowPlayIndex === 0 ? this.$store.commit('setPlayIndex', this.musicList.length - 1) : this.$store.commit('setPlayIndex', --this.nowPlayIndex)
                this.getURL(this.musicList[this.nowPlayIndex].id)
            },
            getURL(id) {
                this.axios.get(`http://localhost:3000/music/url?id=${id}`)
                    .then(res => this.url = res.data.data[0].url)
            },
            playOrPause() {
                if (this.isPlaying === true) {
                    this.$store.commit('pause')
                    this.$refs.audio.pause()
                    return
                }
                this.$store.commit('play')
                this.$refs.audio.play()
            },
            changeMusic(index) {
                this.$store.commit('setPlayIndex', index)
                this.getURL(this.musicList[this.nowPlayIndex].id)
            }
        },
        watch: {

            // showMiniAudio: {
            //     handler(newVal) {
            //         this.$store.commit('setShowMiniAudio', newVal)
            //     }
            // },
            // curTimeNum: {
            //     handler(newVal) {
            //         this.$store.commit('setCurTimeNum', newVal)
            //     }
            // },
            // id: {
            //     handler(newVal) {
            //         if (!newVal) return
            //         this.getURL(newVal)
            //     }
            // }
        }
    }
</script>

<style scoped>
    .footer-right i {
        height: 16px;
    }
</style>