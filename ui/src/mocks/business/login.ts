import { http, HttpResponse } from 'msw';

export const login = http.post('/site/api/auth/signin', () => {
  return HttpResponse.json({
    code: 200,
    msg: 'SUCCESS',
    data: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImFkbWluIiwic3ViIjoxLCJpYXQiOjE3NzQxOTIzMjIsImV4cCI6MTc3NDI3ODcyMn0.zzzquVffy_90BYPQOOummeEzkr1VWMQMi-sFW0prMAQ'
  });
});

export const loginOut = http.post('/site/api/auth/signout', () => {
  return HttpResponse.json({ code: 200, msg: 'SUCCESS', data: null });
});
