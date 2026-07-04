"use client";

import { useEffect, useRef, useState } from "react";

export interface MousePositionState {
  mouseX: number;
  mouseY: number;
  velocity: number;
  isMoving: boolean;
}

const IDLE_TIMEOUT = 120;

export function useMousePosition(): MousePositionState {
  const [state, setState] = useState<MousePositionState>({
    mouseX: 0,
    mouseY: 0,
    velocity: 0,
    isMoving: false,
  });
  const lastPositionRef = useRef({ x: 0, y: 0, timestamp: 0 });
  const idleTimerRef = useRef<number | null>(null);
  const frameRef = useRef<number | null>(null);
  const latestStateRef = useRef(state);

  useEffect(() => {
    latestStateRef.current = state;
  }, [state]);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      const now = performance.now();
      const previous = lastPositionRef.current;
      const deltaTime = Math.max(now - previous.timestamp, 16);
      const deltaX = event.clientX - previous.x;
      const deltaY = event.clientY - previous.y;
      const velocity = previous.timestamp === 0 ? 0 : (Math.hypot(deltaX, deltaY) / deltaTime) * 1000;
      const nextState = {
        mouseX: event.clientX,
        mouseY: event.clientY,
        velocity,
        isMoving: true,
      };

      latestStateRef.current = nextState;
      setState(nextState);

      lastPositionRef.current = {
        x: event.clientX,
        y: event.clientY,
        timestamp: now,
      };

      if (frameRef.current === null) {
        frameRef.current = window.requestAnimationFrame(() => {
          frameRef.current = null;
          setState((currentState) => {
            const nextState = latestStateRef.current;

            return currentState.mouseX === nextState.mouseX &&
              currentState.mouseY === nextState.mouseY &&
              currentState.velocity === nextState.velocity &&
              currentState.isMoving === nextState.isMoving
              ? currentState
              : nextState;
          });
        });
      }

      if (idleTimerRef.current) {
        window.clearTimeout(idleTimerRef.current);
      }

      idleTimerRef.current = window.setTimeout(() => {
        setState((currentState) => ({
          ...currentState,
          isMoving: false,
          velocity: 0,
        }));
      }, IDLE_TIMEOUT);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }

      if (idleTimerRef.current) {
        window.clearTimeout(idleTimerRef.current);
      }
    };
  }, []);

  return state;
}
