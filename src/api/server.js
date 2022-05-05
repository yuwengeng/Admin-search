import axios from 'axios';
import envconfig from '@/envconfig/envconfig';
/**
 * 主要params参数
 * @params method {string} 方法名
 * @params url {string} 请求地址  例如：/login 配合baseURL组成完整请求地址
 * @params baseURL {string} 请求地址统一前缀 ***需要提前指定***  例如：http://cangdu.org
 * @params timeout {number} 请求超时时间 默认 30000
 * @params params {object}  get方式传参key值
 * @params headers {string} 指定请求头信息
 * @params withCredentials {boolean} 请求是否携带本地cookies信息默认开启
 * @params validateStatus {func} 默认判断请求成功的范围 200 - 300
 * @return {Promise}
 * 其他更多拓展参看axios文档后 自行拓展
 * 注意：params中的数据会覆盖method url 参数，所以如果指定了这2个参数则不需要在params中带入
*/
export class Server {
  axios(method, url, params){
    return new Promise((resolve, reject) => {
      if(typeof params !== 'object') params = {};
      let _option = params;
      _option = {
        method,
        url,
        baseURL: envconfig.baseURL,
        timeout: 30000,
        params: null,
        data: null,
        headers: null,
        withCredentials: true, //是否携带cookies发起请求
        validateStatus:(status)=>{
            return status >= 200 && status < 300;
        },
        ...params,
      }
      axios.request(_option).then(res => {
        resolve(typeof res.data === 'object' ? res.data : JSON.parse(res.data))
      },error => {
        if(error.response){
            reject(error.response.data)
        }else{
            reject(error)
        }
      })
    })
  }
}

export async function save(store){
  const owner = 'yuwengeng';
  const repo = 'search-sites';
  const hookapi = `https://api.github.com/repos/${owner}/${repo}/dispatches`;
  const res = await fetch(envconfig.baseURL + '/put', {
    method: 'POST',
    headers: {  'Content-Type': 'application/json'  },
    body: JSON.stringify({
      "data":store
    }),
    mode: 'no-cors',
  });
  fetch(hookapi, {
    method: 'POST',
    headers: {  Accept: "application/vnd.github.everest-preview+json",Authorization: "token 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"  },
    body: JSON.stringify({"event_type": "webhook-1"}),
  });
  // const res_1 = await res.json();
  // return console.log('res', res_1);
}
// new Response({}, {headers: {'Content-Type': 'application/json','Access-Control-Allow-Origin': '*'}})}});
// new URLSearchParams(
export async function initData(){
  const res = await axios.get(envconfig.baseURL + '/get?key=searchData');
  console.log('res', typeof res.data);
  return res.data;
  // fetch(envconfig.baseURL + '/get?key=searchData', {
  //   method: 'GET',
  //   mode: 'no-cors',
  //   // params: {'key': 'searchData'},
  // }).then(res => {
  // console.log('res', res);

  //   // res.json();
  // }).catch(e=>console.log(`错误为${e}`));
  // const res_1 = await res.json();
  // console.log('res', res_1);
  // return {data:res.data}
  
}