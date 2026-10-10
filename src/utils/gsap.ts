import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { CustomEase } from 'gsap/CustomEase';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase, useGSAP);

// Signature curves for the whole experience.
CustomEase.create('gift', 'M0,0 C0.23,1 0.32,1 1,1');
CustomEase.create('giftInOut', 'M0,0 C0.77,0 0.175,1 1,1');

const touchPointer = () => window.matchMedia('(pointer: coarse)').matches;

/**
 * Soft-focus reveal for split text.
 *
 * Animating `filter: blur()` forces the browser to re-rasterise every single
 * word/char on every frame, which is what makes scroll-linked text stutter on
 * a phone. When the input device is a finger the blur is dropped and the reveal
 * runs on opacity/transform only — on a small high-DPR screen that reads the
 * same, and it hands the frame budget back to scrolling. Precise pointers
 * (mouse/trackpad) keep the original blur, so desktop is untouched.
 */
export function softFocus(px: number): gsap.TweenVars {
  return touchPointer() ? {} : { filter: `blur(${px}px)` };
}

/** `softFocus` for a two-endpoint tween (blurred → sharp). */
export function softFocusTo(px: number): { from: gsap.TweenVars; to: gsap.TweenVars } {
  return touchPointer() ? { from: {}, to: {} } : { from: { filter: `blur(${px}px)` }, to: { filter: 'blur(0px)' } };
}

export { gsap, ScrollTrigger, SplitText, CustomEase, useGSAP };