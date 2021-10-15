# @arthurgeron/context-selector

Pratical native Context API selector without nasty side effects or heavy performance compromises.

https://www.npmjs.com/package/@arthurgeron/context-selector

## Objective

The goal of this project is to allow a simple, ligh, native and pratical solution to selecting properties from complex objects stored in a Context API provider without causing side effects on your hooks or dealing with performance compromises from complex and heavy memoization processes.

This is particularly powerfull when used with generic components, with TypeScript it allow you to have a greater flexibility when dealing with context data without having as many drawbacks with regular Context API usage.


## Installing and using

1. Run `yarn add @arthurgeron/context-selector`

2. Create your own hook selector using the package export

Configuring on a React Native project:
```typescript
import { useDataSelector } from '@arthurgeron/context-selector';
import { TableDataContext } from '@contexts/tableData';
import type {TableContextData} from '@types';

export function useSelectTableData<Y>(selector: (context: TableContextData) => Y) {
  return useDataSelector<TableContextData, Y>(TableDataContext, selector);
}

```

3. Use your selector as any other selector

```typescript
import { useSelectTableData } from '@hooks/useSelectTableData';
import type { TickerFields } from '@types';
import { memo, useEffect } from 'react';
import * as S from './styles';

interface Props {
  ticker: string;
  column: TickerFields;
}

function Cell({ticker, column}: Props) {
  const tickerData = useSelectTableData(data => data.tableData?.[ticker]);

  const label = tickerData?.[column] ?? '-';
  
  return <S.Container>
    <S.Text>{label ?? '-'}</S.Text>
  </S.Container>
}

export default memo(Cell);

```

The example above was taken from a real life situation, a real time financial data table that updates constantly, in other scenarios the code could become either very difficult to maintain due to duplication of similar components or extremely unperformatic as we have to access specific properties from the context. With the selector we can have a generic cell component that will automatically fetch the correct data according to what column it's at.


## Docs


### useDataSelector

Selector meant **only** for objects (not functions), accepts two arguments, *context* and a *selector*, it's expected that it's understood what those two mean. With TypeScript generics the typings are usually inferred.

### useFunctionSelector

Same as the one mentioned before with the caveat that it's meant to return functions **only** (not objects), this really isn't much necessary but it's there in case you want to keep a pattern and select data only through this lib. I have plans to improved this hook's usefullness soon.