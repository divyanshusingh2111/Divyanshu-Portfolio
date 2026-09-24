"use client";

import { create } from "zustand";

/**
 * Global UI chrome state shared by the command palette, the shortcut
 * help sheet and any trigger (header chip, mobile menu, ⌘K listener).
 */
interface PaletteState {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
  helpOpen: boolean;
  setHelpOpen: (open: boolean) => void;
}

export const usePaletteStore = create<PaletteState>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
  toggle: () => set((s) => ({ open: !s.open })),
  helpOpen: false,
  setHelpOpen: (open) => set({ helpOpen: open }),
}));
