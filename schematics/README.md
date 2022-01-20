
# 先在此项目根目录执行
```bash
$ npm run build 
$ npm link 
```
# 在业务项目中
```bash
$ npm link ng-ant-sch
```

# 生成模块,此命令为入口命令
```bash
$ ng g ng-ant-sch:g-m
```

# 生成组件
```bash
$ ng g ng-ant-sch:b-c
```

# 生成d.ts
```bash
$ dtsgen -o ./src/g-m/type.d.ts ./src/g-m/schema.json
```

# 生成模块
```bash
$ ng g ng-ant-sch:bis-module
```

# 生成空白的原理图 
```bash
$ schematics @angular-devkit/schematics-cli:blank name
```


