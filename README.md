## monitor-fe

JS SDK of web monitor for error 、performance and behavior, help developer known about usage of your website

### Install

Using pnpm:

```shell
pnpm add @monitor-fe/core
```

### Example

```typescript
import { init } from '@monitor-fe/core'

init({
  appId: 'your_app_id',
  userId: 'your_user_id'
})
```

### Development

Start project:
```shell
git clone git@github.com:wangkaiwd/monitor-fe.git
pnpm install
pnpm demo:js
```
If you want to debug source code, you can write `debugger` statement where you want to dive in, then debugger it in chrome devtool source panel. Please don't forget delete `debugger` after debug.

Publish to npm:
```shell
pnpm release patch
```

`patch` can replace with any release type
