import { useContext, useMemo } from 'react';
import type { Context } from 'react';

import { CONTEXT_ERROR_MESSAGE, DATA_SELECTOR_ERROR_MESSAGE } from '@constants';
import type { GenericAssetDataSelector } from '@types';

export function useDataSelector<Z, Y>(
  context: Context<Z | undefined>,
  selector: GenericAssetDataSelector<Z, Y>
): Y {
  const _context = useContext(context);

  if (!_context) {
    throw new Error(CONTEXT_ERROR_MESSAGE);
  }

  const selectedData = selector(_context);
  const selectedDataHash = JSON.stringify(selectedData);

  if (typeof selectedData === 'function') {
    throw new Error(DATA_SELECTOR_ERROR_MESSAGE);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => selectedData, [selectedDataHash]);
}
