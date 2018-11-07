<template>
  <div id="app" class="main">
    <Hearder></Hearder>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
    import Hearder from './components/Hearder'
    import Footer from './components/Footer'
    let api = require('./api/api.js').default;
    export default {
        name: 'my-music-app',
        components: {
            Hearder,
            Footer
        },
        data() {
            return {
                songList: []
            }
        },
        created() {
            var that = this;
            // this.$http.get(api.loginCellphone + '?phone=13167677956&password=hhf930402', {
            //         xhrFields: {
            //             withCredentials: true
            //         },
            //         proxy: {
            //             host: '127.0.0.1',
            //             port: 3000,
            //         },
            //     })
            //     .then(function(response) {
            //         if (!response.msg) {
            //             that.$store.commit('USER_DATA_SAVE', response.data)
            //         }
            //     })
            //     .catch(function(error) {
            //         console.log(error);
            //     });
        },
    }
</script>
<style>

</style>