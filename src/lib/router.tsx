"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useSyncExternalStore,
  type ReactNode,
} from "react";

/**
 * Hash-based SPA router.
 * The site runs entirely on the "/" route; every "page" of the original
 * KGE Properties site is rendered as an in-page view, and the current
 * view is synced to the URL hash (e.g. #/contact) so that deep links,
 * the browser back/forward buttons and bookmarking keep working.
 *
 * All internal <a href="/..."> clicks are intercepted globally and turned
 * into client-side navigation, so components can keep using plain links.
 */

const NAVIGATE_EVENT = "rgl:navigate";

interface RouterContextValue {
  /** Normalised internal path, always starting with "/" (e.g. "/contact") */
  path: string;
  navigate: (to: string, opts?: { scroll?: boolean }) => void;
}

const RouterContext = createContext<RouterContextValue>({
  path: "/",
  navigate: () => {},
});

function pathFromHash(): string {
  if (typeof window === "undefined") return "/";
  const raw = window.location.hash.replace(/^#/, "");
  if (!raw) return "/";
  const p = raw.startsWith("/") ? raw : `/${raw}`;
  return p.length > 1 ? p.replace(/\/+$/, "") : p;
}

function subscribe(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  window.addEventListener(NAVIGATE_EVENT, onChange);
  return () => {
    window.removeEventListener("hashchange", onChange);
    window.removeEventListener(NAVIGATE_EVENT, onChange);
  };
}

function getSnapshot(): string {
  return pathFromHash();
}

function getServerSnapshot(): string {
  return "/";
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const path = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const firstRender = useRef(true);

  const navigate = useCallback((to: string, opts?: { scroll?: boolean }) => {
    const target = to.startsWith("/") ? to : `/${to}`;
    const normalised = target.length > 1 ? target.replace(/\/+$/, "") : "/";
    if (`#${normalised}` !== window.location.hash) {
      window.location.hash = normalised;
    }
    if (opts?.scroll !== false) {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, []);

  // Back/forward (hashchange) should also scroll to top, like a fresh page
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [path]);

  // Global click interception: turn internal links into SPA navigation
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented) return;
      if (e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const el = e.target as HTMLElement | null;
      const anchor = el?.closest?.("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // External links / new tabs / downloads / mail / tel → default behaviour
      if (/^(https?:)?\/\//i.test(href) && !href.startsWith(window.location.origin)) return;
      if (/^(mailto:|tel:|javascript:|#)/i.test(href)) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      // Same-origin absolute or relative internal link → SPA navigation
      let pathname = href;
      if (href.startsWith(window.location.origin)) {
        pathname = href.slice(window.location.origin.length) || "/";
      }
      if (!pathname.startsWith("/")) return;
      if (pathname.startsWith("/images/") || pathname.startsWith("/api/")) return;

      e.preventDefault();
      navigate(pathname);
    };
    // Capture phase: runs before React's delegated handlers
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, [navigate]);

  const value = useMemo(() => ({ path, navigate }), [path, navigate]);

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export function useRouter() {
  return useContext(RouterContext);
}
