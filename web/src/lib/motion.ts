// Easing library — named by emotional intent, not mathematical description
export const ease = {
  enter:       [0.0,  0.0,  0.2,  1.0] as const,  // material enter — smooth deceleration
  enterHero:   [0.16, 1.0,  0.3,  1.0] as const,  // hero reveal — dramatic overshoot feel
  enterSnap:   [0.34, 1.56, 0.64, 1.0] as const,  // spring snap — tactile click
  exit:        [0.4,  0.0,  1.0,  1.0] as const,  // material exit — quick acceleration
  standard:    [0.4,  0.0,  0.2,  1.0] as const,  // balanced — use for most UI transitions
  micro:       [0.25, 0.1,  0.25, 1.0] as const,  // instant feel — hover states
  dramatic:    [0.76, 0.0,  0.24, 1.0] as const,  // tension — for reveals that command attention
  materialize: [0.22, 1.0,  0.36, 1.0] as const,  // slow build to confident presence
} as const;

// CSS string equivalents for non-Framer contexts (GSAP, inline style)
export const easeCss = {
  enter:       "cubic-bezier(0.0, 0.0, 0.2, 1.0)",
  enterHero:   "cubic-bezier(0.16, 1.0, 0.3, 1.0)",
  enterSnap:   "cubic-bezier(0.34, 1.56, 0.64, 1.0)",
  exit:        "cubic-bezier(0.4, 0.0, 1.0, 1.0)",
  standard:    "cubic-bezier(0.4, 0.0, 0.2, 1.0)",
  micro:       "cubic-bezier(0.25, 0.1, 0.25, 1.0)",
  dramatic:    "cubic-bezier(0.76, 0.0, 0.24, 1.0)",
  materialize: "cubic-bezier(0.22, 1.0, 0.36, 1.0)",
} as const;

// Duration scale — named by perception, not milliseconds
export const duration = {
  instant:     50,   // imperceptible — state change only
  flash:       100,  // barely there
  quick:       150,  // snappy feedback (hover response target)
  snappy:      200,  // confident and fast
  standard:    280,  // default for most UI transitions
  comfortable: 380,  // more deliberate — content reveals
  deliberate:  500,  // important moments
  ceremonial:  700,  // section headers, hero titles
  cinematic:   1100, // page transitions, full-screen reveals
  epic:        1800, // onboarding moments, brand statements
} as const;

// Legacy aliases — kept for backward compatibility with existing components
export const auraEase = ease.materialize;
export const auraEaseCss = easeCss.materialize;
export const auraGsapEase = "power3.out";

// Framer Motion variant presets
export const revealMotion = {
  hidden: { opacity: 0, y: 28, filter: "blur(10px)" },
  show:   { opacity: 1, y: 0,  filter: "blur(0px)"  },
};

export const revealMotionSubtle = {
  hidden: { opacity: 0, y: 14 },
  show:   { opacity: 1, y: 0  },
};

export const revealMotionUp = {
  hidden: { opacity: 0, y: 48, filter: "blur(14px)" },
  show:   { opacity: 1, y: 0,  filter: "blur(0px)"  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show:   { opacity: 1 },
};

export const slideRight = {
  hidden: { opacity: 0, x: -24 },
  show:   { opacity: 1, x: 0   },
};

export const revealTransition = {
  duration: duration.comfortable / 1000,
  ease: ease.materialize,
};

export const revealTransitionFast = {
  duration: duration.standard / 1000,
  ease: ease.enter,
};

export const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren:  0.12,
      delayChildren:    0.08,
    },
  },
};

export const staggerContainerFast = {
  hidden: {},
  show: {
    transition: {
      staggerChildren:  0.07,
      delayChildren:    0.04,
    },
  },
};

export const staggerContainerSlow = {
  hidden: {},
  show: {
    transition: {
      staggerChildren:  0.22,
      delayChildren:    0.16,
    },
  },
};
