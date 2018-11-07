import * as types from '../mutation-types'
import { local } from '@/utils/storage'

const obj = {}

const state = {
    user: local.getItem('user') || obj,
    path: obj,
    data: obj,
    songList: [],
    userDate: local.getItem('userDate') || obj,
    likeGedan: 'hide',
    commonList: [],
    isPLay: false
}

const getters = {
    getUserStatus: state => state.data,
    getUserPathStatus: state => state.path,
    getUserSongList: satte => state.songList,
    getUserDate: state => state.userDate,
    getLikeGedan: state => state.likeGedan,
    getCommonList: state => state.commonList,
    getIsPlay: state => state.isPLay
}

const actions = {
    userSignin({ commit }, user) {
        commit(types.USER_SIGNIN, user)
    },
    userSignout({ commit }) {
        commit(types.USER_SIGNOUT)
    },
    instructionRoute({ state, commit }, path) {
        commit(types.USER_ROUTER_PATH, path)
    },
    setUserData({ state, commit }, data) {
        commit(types.USER_DATA_SAVE, data)
    },
    setSmusicList({ state, commit }, song) {
        commit(types.SET_MUSIC_LIST, song)
    },
    setCommonList({ state, commit }, data) {
        commit(types.COMMONLIST, data)
    },
    setIsPlay({ sate, commit }) {
        commit(types.ISPLAY)
    }
}

const mutations = {
    [types.USER_SIGNIN](state, user) {
        local.setItem('user', user)
        state.user = user
    },
    [types.USER_SIGNOUT](state) {
        local.removeItem('user')
        state.user = {}
    },
    [types.USER_ROUTER_PATH](state, path) {
        state.path = path
    },
    [types.USER_DATA_SAVE](state, data) {
        state.data = data
    },
    [types.USER_DATA_SAVE](state, data) {
        if (!data) {
            data = obj
        }
        state.userDate = data
        local.setItem('userDate', data)
    },
    [types.GEDAN](state, data) {
        state.likeGedan = data
    },
    [types.COMMONLIST](state, data) {
        state.commonList = data
    },
    [types.ISPLAY](sate) {
        state.isPLay = !state.isPLay
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}