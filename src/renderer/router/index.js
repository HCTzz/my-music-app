import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export default new Router({
    routes: [{
            path: '/',
            name: 'content',
            component: require('@/components/Content').default,
            children: [{
                path: '/',
                name: 'ContentRight',
                component: require('@/components/ContentRight').default
            }]
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})