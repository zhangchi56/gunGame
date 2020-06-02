import axios from './axios'

export function getHomeMultidata() {
  return axios({
    url: 'http://m.wentuguoji.cn/API/mall/mall_index'
  })
}