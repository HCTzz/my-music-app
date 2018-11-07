<template>
    <div class="content">
        <ContentLeft></ContentLeft>
        <router-view></router-view>
    </div>
</template>
<script>
    import ContentLeft from './ContentLeft'
    export default {
        name: "Content",
        components: {
            ContentLeft,
        }
    }
</script>
<style>

</style>