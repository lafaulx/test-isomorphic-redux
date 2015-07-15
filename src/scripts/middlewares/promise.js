export default function promiseMiddleware(getState) {
  return (next) => {
    const recurse = (action) => {
      if (typeof action === 'function') {
        return action(recurse, getState);
      }

      const { promise, types, ...rest } = action;

      if (!promise) {
        return next(action);
      }

      const [REQUEST, SUCCESS, FAILURE] = types;

      next({ ...rest, type: REQUEST });

      return promise.then(
        (result) => next({ ...rest, result, type: SUCCESS }),
        (error) => next({ ...rest, error, type: FAILURE })
      );
    };

    return recurse;
  };
}
