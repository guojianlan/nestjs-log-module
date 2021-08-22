## nestjs-log-module

### combine winston

### how use

```ts
// app.module.ts file add    impots
import { addDefaultContainer } from 'nestjs-log-module';
 LoggerModule.forRoot({
      logHttp: {},
      initWinston: async (winston) => {
        return [
          addDefaultContainer(),
        ]
      }
    }),
```

### how join container

```ts
// addContainer id winston options
import { addContainer } from "nestjs-log-module";
addContainer("id", {});
```

### how use at modules

```ts
import { InjectWinston, CustomLogger } from 'nestjs-log-module';
 constructor(){
    @InjectWinston() private readonly logger: CustomLogger
 }

```
