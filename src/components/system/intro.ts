/** Shared constants for the entrance sequence. */
export const INTRO_STORAGE_KEY = "vamplaus:intro";

/** Total length of the entrance sequence, ms. Keep in sync with globals.css. */
export const INTRO_DURATION = 3200;

/**
 * Decides, before first paint, whether the entrance sequence plays:
 * only on a direct visit to "/", once per browser session, and never when the
 * visitor has asked the system to reduce motion. Writes the decision to
 * <html data-intro="play|off">; CSS does the rest.
 */
export const introDecisionScript = `(function(){var d=document.documentElement;try{var r=window.matchMedia("(prefers-reduced-motion: reduce)").matches;if(location.pathname==="/"&&!r&&!sessionStorage.getItem("${INTRO_STORAGE_KEY}")){d.dataset.intro="play";sessionStorage.setItem("${INTRO_STORAGE_KEY}","1");return}}catch(e){}d.dataset.intro="off"})();`;
