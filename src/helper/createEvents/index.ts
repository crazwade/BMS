interface eventsType {
  [x: string]: string
}

type CallbackFunctionVariadic = (...args: any[]) => void;

export default function create (events: eventsType) {
  const eventCallbacks: Map<string, Set<CallbackFunctionVariadic>> = new Map();

  function extendEventCallbacks (extendEvents: eventsType) {
    Object.values(extendEvents).forEach((event) => {
      eventCallbacks.set(event, new Set());
    });
  }

  extendEventCallbacks(events);

  function extend (extendEvents: eventsType) {
    extendEventCallbacks(extendEvents);
  }

  function on (event: string, callback: CallbackFunctionVariadic) {
    eventCallbacks.get(event)?.add(callback);

    const unwatch = () => {
      eventCallbacks.get(event)?.delete(callback);
    };

    return unwatch;
  }

  function once (event: string, callback: CallbackFunctionVariadic) {
    let unwatch: () => void;
    const callbackWrapper = (eventData: any) => {
      unwatch();
      callback(eventData);
    };

    unwatch = on(event, callbackWrapper);

    return unwatch;
  }

  function off (event: string, callback: CallbackFunctionVariadic): (boolean | undefined) {
    return eventCallbacks.get(event)?.delete(callback);
  }

  function emit (event: string, payload?: any) {
    eventCallbacks.get(event)?.forEach((callback) => {
      callback(payload);
    });
  }

  function dispose () {
    eventCallbacks.forEach((eventCallback) => {
      eventCallback.clear();
    });
  }

  return {
    on,
    once,
    off,
    emit,
    dispose,
    extend,
  };
}
