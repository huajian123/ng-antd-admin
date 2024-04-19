import { http, HttpResponse } from 'msw';

/*
 * redis超时
 * */
const sessionTimeout = http.get('/site/api/sessionTimeOut/', () => {
  return HttpResponse.json({ code: 1012, msg: '令牌已过期！', data: null });
});

export const other = [sessionTimeout];
