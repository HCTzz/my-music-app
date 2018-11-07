<template>
    <div class="right">
        <div class="banner">
            <div class="banner-left"></div>
            <div class="banner-center">
                <ul>
                    <li v-for="(item,index) in banners " :id="index" :class="{'active':item.active,'select':item.select}" @mouseout="outStyle(item)" @click="selThis(item)" @mouseover="selectStyle(item)">
                        <span>{{item.title}}</span>
                    </li>
                </ul>
            </div>
            <div class="banner-right"></div>
        </div>
        <div class="content-padding">
            <!-- 滚动图 -->
            <v-banner v-if="imgs.length > 0" :imgs="imgs"></v-banner>
            <!-- 滚动图 -->
            <!-- 推荐歌单 -->
            <recommonsong v-if="recommons.length > 0" :recommons="recommons"></recommonsong>
            <!-- 推荐歌单 -->
            <!-- 独家放送 -->
            <exclusivedelivery v-if="liver.length > 0" :liver="liver"></exclusivedelivery>
            <!-- 独家放送 -->
        </div>
    </div>
</template>
<script>
    import vBanner from '@/components/common/banner/banner'
    import recommonsong from '@/components/common/recommonsong/recommonsong'
    import exclusivedelivery from '@/components/common/exclusivedelivery/exclusivedelivery'
    let api = require('../api/api.js').default;
    export default {
        data() {
            return {
                banners: [{
                    title: '个性推荐',
                    path: '',
                    active: true,
                    select: true
                }, {
                    title: '歌单',
                    path: '',
                    active: false,
                    select: false
                }, {
                    title: '直播电台',
                    path: '',
                    active: false,
                    select: false
                }, {
                    title: '排行榜',
                    path: '',
                    active: false,
                    select: false
                }, {
                    title: '歌手',
                    path: '',
                    active: false,
                    select: false
                }, {
                    title: '最新音乐',
                    path: '',
                    active: false,
                    select: false
                }],
                imgs: [],
                recommons: [],
                liver: []
            }
        },
        created() {
            this.$nextTick(function() {
                this.loadBanner()
                this.loadTjGd()
                this.loadRecommonsong()
            })
        },
        methods: {
            loadBanner() {
                let that = this
                this.$http.get(api.banner, {
                        xhrFields: {
                            withCredentials: true
                        },

                        proxy: {
                            host: '127.0.0.1',
                            port: 3000,
                        },
                    })
                    .then(function(response) {
                        that.imgs = response.data.banners
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            },
            // 推荐歌单数据
            loadTjGd() {
                let that = this
                this.$http.get(api.personalized, {
                        xhrFields: {
                            withCredentials: true
                        },
                        proxy: {
                            host: '127.0.0.1',
                            port: 3000,
                        },
                    })
                    .then(function(response) {
                        let recs = response.data.result
                        if (recs && recs.length > 10) {
                            that.recommons = recs.slice(0, 10)
                        }
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            },
            // 独家放送
            loadRecommonsong() {
                let that = this
                this.$http.get(api.privatecontent, {
                        xhrFields: {
                            withCredentials: true
                        },
                        proxy: {
                            host: '127.0.0.1',
                            port: 3000,
                        },
                    })
                    .then(function(response) {
                        that.liver = response.data.result;
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            },
            outStyle(item) {
                if (!item.select) {
                    item.active = false;
                }
                // this.$set(item, 'active', false);
            },
            selectStyle(item) {
                if (!item.select) {
                    item.active = true;
                }
                // this.$set(item, 'active', true);
            },
            selThis(item) {
                for (let i of this.banners) {
                    i.active = false;
                    i.select = false;
                }
                item.active = true;
                item.select = true;
            }
        },
        components: {
            vBanner,
            recommonsong,
            exclusivedelivery
        }
    }
</script>
<style scoped>
    ul {
        -webkit-margin-before: 0em;
        -webkit-margin-after: 0em;
        -webkit-margin-start: 0px;
        -webkit-margin-end: 0px;
        -webkit-padding-start: 0px;
    }
    
    .right {
        padding: 0px 20px;
    }
    
    .banner {
        display: flex;
        flex-direction: row;
        height: 42px;
        border-bottom: 1px solid #ddd
    }
    
    .banner .banner-center {
        font-size: 14px;
        width: 500px;
        text-align: center
    }
    
    .banner .banner-center ul {
        display: flex;
        flex: row;
        justify-content: space-around;
        width: 100%;
        height: 100%;
    }
    
    .banner .banner-center ul li.select {
        border-bottom: 2px solid #C62F2F
    }
    
    .banner .banner-center ul li {
        list-style: none;
        line-height: 42px;
        padding: 0px 2px
    }
    
    .banner .banner-center ul li span {
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal;
        overflow: hidden;
        min-width: 70px;
    }
    
    .banner .banner-left {
        flex-grow: 2
    }
    
    .banner .banner-right {
        flex-grow: 2
    }
    
    .active {
        color: red
    }
    
    .pic {
        height: 100px;
    }
    
    @media screen and (min-width: 1100px) {
        .content-padding {
            padding: 0px 40px
        }
    }
</style>