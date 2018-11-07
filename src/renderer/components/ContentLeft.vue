<template>
    <div class="left">
            <div class="left-content">
                <div v-for="(item,index) in sideBar" :class="item.cls" :id="index">
                    <span>{{item.name}}</span>
                    <ul>
                        <li v-for="(c_item,cIndex) in item.children" :id="index+'-'+cIndex" :class="{'active':c_item.active}" @mouseout="outStyle(c_item)" @mouseover="selectStyle(c_item)">
                            <i class="iconfont" :class="c_item.icon"></i>
                            <span>{{c_item.name}}</span>
                        </li>
                    </ul>
                </div>
                <div class="modual gedan">
                    <span>
                        <i class="text">创建的歌单</i>
                        <i class="iconfont icon-jiahao-copy"></i>
                        <i class="iconfont icon-jianyou" @click='openGedan'></i>
                    </span>
                    <ul :class="likeGedan == 'show'?'':'hide'">
                        <li>
                            <i class="iconfont icon-woxihuande"></i>
                            <span>我喜欢的音乐</span>
                        </li>
                    </ul>
                </div>
                <div class="modual gedan_">
                    <span>
                        <i class="text">收藏的歌单</i>
                        <i class="iconfont icon-jianyou"></i>
                    </span>
                </div>
            </div>
            <div class="left-bottom">
                <div class="modal" title="展开音乐详情页">
                    <img src="/static/images/header/wyicon.png" alt="">
                    <div class="hover_div">
                        <i class="iconfont icon-kuozhan"></i>
                    </div>
                </div>
                <div class="info">
                    <span><a href="javaScript:void(0)" id="mus_name">如约而至</a></span>
                    <span><a href="javaScript:void(0)" id="mus_per">许嵩</a></span>
                </div>
                <div class="icon">
                    <i class="iconfont icon-woxihuande" title="喜欢"></i>
                    <i class="iconfont icon-fenxiang" title="分享"></i>
                </div>
            </div>
        </div>
</template>

<script>
    export default {
        data() {
            return {
                sideBar: [{
                    cls: 'modual tuijian',
                    name: '推荐',
                    children: [{
                        icon: 'icon-yinyue',
                        name: ' 发现音乐'
                    }, {
                        icon: 'icon-guangbo',
                        name: '私人FM'
                    }, {
                        icon: 'icon-video',
                        name: '视频'
                    }, {
                        icon: 'icon-pengyou',
                        name: '朋友'
                    }]
                }, {
                    cls: 'modual',
                    name: '我的音乐',
                    children: [{
                        icon: 'icon-ttpodicon',
                        name: '本地音乐'
                    }, {
                        icon: 'icon-xiazaiguanli-xiazai',
                        name: '下载管理 '
                    }, {
                        icon: 'icon-yunpan',
                        name: '我的音乐云盘'
                    }, {
                        icon: 'icon-diantai',
                        name: '我的电台'
                    }, {
                        icon: 'icon-wodeshoucang',
                        name: '我的收藏'
                    }]
                }],
            }
        },
        methods: {
            openGedan() {
                let cls = this.likeGedan
                cls = cls == 'hide' ? 'show' : 'hide'
                this.$store.commit('GEDAN', cls)
            },
            hocerCls: function(ind) {
                this.selIndex = ind
            },
            selectStyle(item) {
                this.$set(item, 'active', true);
            },
            outStyle(item) {
                this.$set(item, 'active', false);
            }
        },
        computed: {
            likeGedan() {
                return this.$store.state.allState.likeGedan
            }
        }

    }
</script>

<style>

</style>