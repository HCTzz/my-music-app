<template>
    <div class="recommend-list">
    <p>推荐歌单 <span>更多></span></p>
    <ul>
        <template v-for="(item, index) in recs">
            <li class="commend-item">
            <!-- @click="$router.push({name: 'songList', params: {id: item.id}})" -->
            <div class="copywrite" :class="{'show-copywrite' : index === showIndex}"
                @mouseover="showCopywrite(index)"
                @mouseout="showCopywrite(-2)"
                
                 :style="{height:item.copywriter.length > 10 ? '17%' : '12%'}">
                <div class="font"><span>{{item.copywriter}}</span></div>
            </div>
            <div class="listen-num" :class="{'hide-listen-num': index === showIndex}">
                <i class="iconfont icon-kefu"></i><span>{{~~ recs[index].playCount >= 100000 ? `${Math.floor(~~ recs[index].playCount / 10000)}万` : recs[index].playCount}}</span>
            </div>
            <div 
                class="item-img"
                :style="{background: `url(${item.picUrl}) no-repeat`,
                'background-size': 'cover',
                'background-position': 'center center'
                }"
                @mouseover="showCopywrite(index)"
                @mouseout="showCopywrite(-2)"
               
                >
                <!-- @click="$router.push({name: 'songList', params: {id: item.id}})" -->
                <!-- @click="$router.push({name: 'songList', params: {id: item.id}})" -->
            <div class="play-btn" :class="{'show-play': index === showIndex}" >
            </div>
        </div>
        <!-- @click="$router.push({name: 'songList', params: {id: item.id}})" -->
        <div class="dec" >
            <span>{{item.name}}</span>
        </div>
</li>
</template>
</ul>
</div>
</template>

<script>
    export default {
        name: 'recommonsong',
        props: {
            recommons: {
                type: Array,
                default: []
            }
        },
        data() {
            return {
                weekArr: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
                showIndex: -2,
                recs: this.recommons
            }
        },
        computed: {
            // commendList() {
            //     return this.$store.state.commendList.commendList
            // },
            week() {
                return this.weekArr[new Date().getDay()]
            },
            day() {
                return new Date().getDate()
            }
        },
        methods: {
            showCopywrite(index) {
                this.showIndex = index
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import './recommonsong'
</style>