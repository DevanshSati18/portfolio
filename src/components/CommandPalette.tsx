"use client";

import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { links, site } from "@/data/profile";
import { routes } from "./routes";
import { useTheme } from "./theme";

type Item = { id: string; group: string; label: string; hint?: string; run: () => void };

export default function CommandPalette() {
  const router = useRouter();
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const restoreFocus = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQ("");
    setActive(0);
    restoreFocus.current?.focus?.();
  }, []);

  const flash = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(""), 1800);
  };

  const items: Item[] = useMemo(
    () => [
      ...routes.map((r) => ({
        id: "go-" + r.href,
        group: "Navigate",
        label: r.label,
        hint: r.hint,
        run: () => router.push(r.href),
      })),
      {
        id: "theme",
        group: "Actions",
        label: `Switch to ${theme === "dark" ? "light" : "dark"} theme`,
        hint: "T",
        run: toggle,
      },
      {
        id: "copy-email",
        group: "Actions",
        label: "Copy email address",
        hint: site.email,
        run: () => {
          navigator.clipboard?.writeText(site.email).then(
            () => flash("Email copied"),
            () => flash(site.email),
          );
        },
      },
      {
        id: "cv",
        group: "Actions",
        label: "Open CV (PDF)",
        hint: "PDF",
        run: () => window.open(site.cv, "_blank", "noopener"),
      },
      ...links.map((l) => ({
        id: "link-" + l.label,
        group: "Elsewhere",
        label: l.label,
        hint: l.handle,
        run: () => window.open(l.href, l.href.startsWith("http") ? "_blank" : "_self", "noopener"),
      })),
    ],
    [router, theme, toggle],
  );

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return items;
    return items.filter((i) => (i.label + " " + (i.hint || "") + " " + i.group).toLowerCase().includes(s));
  }, [items, q]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const typing = target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        restoreFocus.current = document.activeElement as HTMLElement;
        setOpen((o) => !o);
      } else if (!typing && !open && e.key === "/") {
        e.preventDefault();
        restoreFocus.current = document.activeElement as HTMLElement;
        setOpen(true);
      } else if (!typing && !open && e.key.toLowerCase() === "t" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        toggle();
      }
    };
    const onOpen = () => {
      restoreFocus.current = document.activeElement as HTMLElement;
      setOpen(true);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("cmdk:open", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("cmdk:open", onOpen);
    };
  }, [open, toggle]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 10);
  }, [open]);

  useEffect(() => setActive(0), [q]);

  const onListKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % Math.max(filtered.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a - 1 + filtered.length) % Math.max(filtered.length, 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const it = filtered[active];
      if (it) {
        close();
        it.run();
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "Tab") {
      e.preventDefault(); // keep focus inside the dialog
    }
  };

  let lastGroup = "";

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="cmdk-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onMouseDown={(e) => e.target === e.currentTarget && close()}
          >
            <motion.div
              className="cmdk"
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              onKeyDown={onListKey}
            >
              <div className="cmdk-input">
                <span className="prompt">~/ds $</span>
                <input
                  ref={inputRef}
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Jump to a page, copy email, open GitHub…"
                  aria-label="Search commands"
                  aria-controls="cmdk-list"
                  aria-activedescendant={filtered[active] ? "cmdk-" + filtered[active].id : undefined}
                  spellCheck={false}
                  autoComplete="off"
                />
              </div>
              <div className="cmdk-list" id="cmdk-list" role="listbox">
                {filtered.length === 0 && <div className="cmdk-empty">No match for “{q}”.</div>}
                {filtered.map((it, i) => {
                  const header = it.group !== lastGroup ? <div className="cmdk-group">{it.group}</div> : null;
                  lastGroup = it.group;
                  return (
                    <div key={it.id}>
                      {header}
                      <button
                        id={"cmdk-" + it.id}
                        role="option"
                        aria-selected={i === active}
                        className="cmdk-item"
                        data-active={i === active}
                        onMouseMove={() => setActive(i)}
                        onClick={() => {
                          close();
                          it.run();
                        }}
                        tabIndex={-1}
                      >
                        <span>{it.label}</span>
                        {it.hint && <span className="hint">{it.hint}</span>}
                      </button>
                    </div>
                  );
                })}
              </div>
              <div className="cmdk-foot">
                <span>↑↓ navigate</span>
                <span>↵ select</span>
                <span>esc close</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {toast && (
          <motion.div
            className="toast"
            role="status"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
