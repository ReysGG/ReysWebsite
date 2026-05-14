'use client';
import { useEffect } from 'react';
import { incrementPostViews } from '../actions/view-actions';

export function ViewCounter({ id }: { id: string }) {
  useEffect(() => { incrementPostViews(id); }, [id]);
  return null;
}
