import { useCallback, useContext } from 'react';
import type { Context } from 'react';

import { CONTEXT_ERROR_MESSAGE, FUNCTION_SELECTOR_ERROR_MESSAGE } from '@constants';
import type { GenericAssetDataSelector } from '@types';

export function useFunctionSelector<Z, Y>(
  context: Context<Z | undefined>,
  selector: GenericAssetDataSelector<Z, Y>
): Y {
  const _context = useContext(context);

  if (!_context) {
    throw new Error(CONTEXT_ERROR_MESSAGE);
  }

  const selectedData = selector(_context);

  if (typeof selectedData !== 'function') {
    throw new Error(FUNCTION_SELECTOR_ERROR_MESSAGE);
  }

  return useCallback(selectedData as unknown as (...args: unknown[]) => void, [
    selectedData,
  ]) as unknown as Y;
}
