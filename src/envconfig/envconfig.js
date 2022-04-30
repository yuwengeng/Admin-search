/**
 * 全局配置文件
 */
let baseURL; 
let imgUrl = '//elm.cangdu.org/img/';
if(process.env.NODE_ENV === 'development'){
  baseURL = 'https://crud.ywg.workers.dev';
}else{
  baseURL = '//api.cangdu.org';
}


export default {imgUrl, baseURL}