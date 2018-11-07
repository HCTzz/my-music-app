<template>
    <div class="liver-list">
        <p>独家放送 <span>更多></span></p>
        <ul>
            <li v-for="(item, index) in livers" :id="index">
                <div class="sPicUrl" :style="{background:`url(${item.sPicUrl}) no-repeat`,
                                            'background-size': 'cover',
                                            'background-position': 'center center'
                                            }">
                    <div class="type">
                        <i :class="item.type == 6 ? 'iconfont icon-wenzhang' : 'iconfont icon-shipin'"></i>
                    </div>
                </div>
                <div class="copywriter">
                    <span>{{item.copywriter}}</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'exclusivedelivery',
        props: {
            liver: {
                type: Array,
                default: []
            }
        },
        data() {
            return {
                livers: this.liver
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import './exclusivedelivery'
</style>