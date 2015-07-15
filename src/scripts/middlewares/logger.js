export default function loggerMiddleware(next) {
  return (action) => {
    if (!process.env.NODE) {
      console.log('%c[action] %s:', 'background: #222; color: #bada55', action.type, action);
    }

    return next(action);
  };
}
