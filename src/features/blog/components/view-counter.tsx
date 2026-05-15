'use client';
import { useEffect } from 'react';
import { incrementPostViews } from '../actions/view-actions';

export function ViewCounter({ id }: { id: string }) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const key = `viewed:${id}`;
    try {
      const lastViewed = window.localStorage.getItem(key);
      const now = Date.now();
      const ONE_DAY = 24 * 60 * 60 * 1000;

      if (!lastViewed || now - parseInt(lastViewed, 10) > ONE_DAY) {
        incrementPostViews(id).catch(() => {});
        window.localStorage.setItem(key, String(now));
      }
    } catch {
      // localStorage may be unavailable (private mode, blocked storage)
      incrementPostViews(id).catch(() => {});
    }
  }, [id]);
  return null;
}
