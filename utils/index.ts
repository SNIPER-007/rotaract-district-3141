export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function lerp(start: number, end: number, amount: number) {
  return start + (end - start) * amount;
}

export function mapRange(
  value: number,
  inputMin: number,
  inputMax: number,
  outputMin: number,
  outputMax: number,
  shouldClamp = false,
) {
  if (inputMin === inputMax) {
    return outputMin;
  }

  const progress = (value - inputMin) / (inputMax - inputMin);
  const mapped = outputMin + (outputMax - outputMin) * progress;

  if (!shouldClamp) {
    return mapped;
  }

  const lowerBound = Math.min(outputMin, outputMax);
  const upperBound = Math.max(outputMin, outputMax);

  return clamp(mapped, lowerBound, upperBound);
}

export function ease(current: number, target: number, factor: number) {
  return lerp(current, target, clamp(factor, 0, 1));
}

export function throttle<TArgs extends unknown[]>(
  fn: (...args: TArgs) => void,
  wait: number,
) {
  let lastExecution = 0;
  let timeoutId: ReturnType<typeof window.setTimeout> | undefined;

  return (...args: TArgs) => {
    const now = Date.now();
    const remaining = wait - (now - lastExecution);

    if (remaining <= 0) {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
        timeoutId = undefined;
      }

      lastExecution = now;
      fn(...args);
      return;
    }

    if (!timeoutId) {
      timeoutId = window.setTimeout(() => {
        lastExecution = Date.now();
        timeoutId = undefined;
        fn(...args);
      }, remaining);
    }
  };
}

export function debounce<TArgs extends unknown[]>(
  fn: (...args: TArgs) => void,
  wait: number,
) {
  let timeoutId: ReturnType<typeof window.setTimeout> | undefined;

  return (...args: TArgs) => {
    if (timeoutId) {
      window.clearTimeout(timeoutId);
    }

    timeoutId = window.setTimeout(() => {
      fn(...args);
    }, wait);
  };
}
