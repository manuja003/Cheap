
import { CSSProperties } from "react";

export const formTransition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
  duration: 0.4
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// src/lib/animations.ts
export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export const slideIn = {
  hidden: { 
    opacity: 0,
    x: 30
  },
  show: {
    opacity: 1,
    x: 0,
    transition: formTransition
  },
  exit: {
    opacity: 0,
    x: -30,
    transition: {
      duration: 0.2
    }
  }
};

export const scaleIn = {
  hidden: { 
    opacity: 0,
    scale: 0.95
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 300
    }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.2
    }
  }
};

// For elements that should maintain a fixed position but fade opacity
export const fadeOnly = {
  hidden: { 
    opacity: 0
  },
  show: {
    opacity: 1,
    transition: {
      duration: 0.3
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2
    }
  }
};

// CSS keyframe animations for use with Tailwind classes
export const appleHoverEffect: CSSProperties = {
  transition: "all 0.35s cubic-bezier(0.65, 0, 0.35, 1)",
  transformOrigin: "center"
};

// For staggered list items
export const listItemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.3,
      ease: [0.65, 0, 0.35, 1]
    }
  }),
  exit: { opacity: 0, transition: { duration: 0.2 } }
};

// For selection cards to have a nice hover effect
export const hoverCardStyle = `
  transform transition-all duration-300 ease-smooth
  hover:scale-[1.02] hover:shadow-md active:scale-[0.98]
`;
