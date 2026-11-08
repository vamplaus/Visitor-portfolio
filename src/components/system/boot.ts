/** Shared constants for the boot script and the motion system. */
export const INTRO_STORAGE_KEY = "vamplaus:intro";
export const MOTION_STORAGE_KEY = "vmp-motion";
export const MOTION_EVENT = "vmp:motion";

/** Total length of the entrance sequence, ms. Keep in sync with globals.css. */
export const INTRO_DURATION = 3200;

/**
 * Runs before first paint and writes two attributes on <html>:
 *
 *  data-motion="on|off" — the visitor's explicit choice (the "Motion" switch,
 *    stored in localStorage), otherwise the OS "reduce motion" setting.
 *    Everything that moves on its own is scoped to data-motion="on"; without
 *    JavaScript the attribute is absent and the archive is complete and still.
 *
 *  data-intro="play|off" — the entrance sequence plays only with motion on,
 *    on a direct visit to a home page (/ru, /en), once per browser session.
 */
export const bootScript = `(function(){var d=document.documentElement,m,i="off";var r=window.matchMedia("(prefers-reduced-motion: reduce)").matches;m=r?"off":"on";try{var s=localStorage.getItem("${MOTION_STORAGE_KEY}");if(s==="on"||s==="off")m=s}catch(e){}try{if(m==="on"&&/^\\/(ru|en)\\/?$/.test(location.pathname)&&!sessionStorage.getItem("${INTRO_STORAGE_KEY}")){i="play";sessionStorage.setItem("${INTRO_STORAGE_KEY}","1")}}catch(e){}d.dataset.motion=m;d.dataset.intro=i})();`;
