import axios from './axios'

export const BANNER = 'banner'
export const RECOMMEND = 'recommend'

export function getHomeMultidata() {
  return axios({
    url: 'http://m.wentuguoji.cn/API/mall/mall_index'
  })
}

export function getHomeData(type, page) {
  return axios({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}

