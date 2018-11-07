<template>
    <div class="header">
        <div class="header-left">
            <div class="img">
                <img :src="hearderLogo" alt="网易云音乐">
            </div>
            <span @click="openDevtolls">网易云音乐</span>
        </div>
        <div class="header-center">
            <i title="后退" class="arrow-left"></i>
            <i title="前进" class="arrow-right"></i>
            <input type="text" class="header-center-input" @change="seachSongs" placeholder="搜索音乐，视频，歌词，电台" id="search">
            <i class="input-search"></i>
        </div>
        <div class="header-right">
            <div class="person">
                <img :src="hearderLogo" alt="">
                <span title="神的孩子都在跳舞">神的孩子都在跳舞</span>
                <i class="iconfont icon-xsj"></i>
                <div class="hide tips">
                    <div class="tips-header"></div>
                    <div class="tips-center"></div>
                    <div class="tips-content"></div>
                </div>
            </div>
            <div class="tools">
                <i title="换肤" class="skin iconfont icon-pifu"></i>
                <i title="消息" class="mail iconfont icon-xinxiang"></i>
                <i title="设置" class="config iconfont icon-shezhi"></i>
            </div>
            <div class="split"></div>
            <div class="app">
                <i title="最小化" class="iconfont icon-zuixiaohua" @click="winMin"></i>
                <i title="最大化" class="iconfont icon-zuidahua" @click="winMax"></i>
                <i title="关闭" class="iconfont icon-guanbi" @click="winClose"></i>
            </div>
        </div>
    </div>
</template>
<script>
    let ipc = require('electron').ipcRenderer;

    export default {
        name: 'hearder',
        data() {
            return {
                hearderLogo: '/static/images/header/wyclound.png'
            }
        },
        methods: {
            openDevtolls() {
                ipc.send('open_devtools');
            },
            winMin() {
                ipc.send('window-min');
            },
            winMax() {
                ipc.send('window-max');
            },
            winClose() {
                ipc.send('window-close');
            },
            seachSongs() {

            }
        }
    }
</script>
<style>

</style>