导出sql
https://blog.csdn.net/weixin_45244610/article/details/112680603
docker exec -it 68aac48072000820152d238bd7fc01d3d5fdf0170aa9475e00d4727d1bb5e79d bash 进入docker

导出操作
pg_dump -U admin  -x -c --inserts --if-exists --quote-all-identifiers -f /tmp/ng-antd-admin-db.sql  ng-antd-admin-db  执行的这个

pg_dump -U admin -O -x -c --inserts --if-exists --quote-all-identifiers -f /tmp/ng-antd-admin-db.sql  ng-antd-admin-db

推出
exit
拷贝到本地
docker cp postgres:/tmp/mydb.sql ~/Downloads/mydb.sql
docker cp 68aac48072000820152d238bd7fc01d3d5fdf0170aa9475e00d4727d1bb5e79d:/tmp/ng-antd-admin-db.sql ~/Downloads/

查看docker容器配置
docker inspect <container_name_or_id>

docker inspect 34f894b69f080cb0f959c952fbf865e339a228c826377af8a8cd82e966524053