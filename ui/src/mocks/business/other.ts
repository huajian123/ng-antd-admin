import { http, HttpResponse } from 'msw';

/*
 * redis超时
 * */
const sessionTimeout = http.get('/site/api/sessionTimeOut/', () => {
  return HttpResponse.json({ code: 1012, msg: '令牌已过期！', data: null });
});

/*
 * 上传文档
 * */
const uploadDocument = http.post('/site/api/file/test/upload/document/', () => {
  return HttpResponse.json({
    code: 0,
    msg: 'SUCCESS',
    data: {
      code: 0,
      msg: 'SUCCESS',
      data: 'http://10.0.12.6:8003/api/file/图纸实际材料量导入模板.xlsx'
    }
  });
});

/*
 * 下载文档
 * */
const downloadDocument = http.post('/site/api/file/download/document', () => {
  return HttpResponse.json({
    code: 0,
    msg: 'SUCCESS',
    data: {
      code: 0,
      msg: 'SUCCESS',
      data: 'http://10.0.12.6:8003/api/file/图纸实际材料量导入模板.xlsx'
    }
  });
});

export const other = [sessionTimeout, uploadDocument, downloadDocument];
