export const item = {
  hidden: { opacity: 0, y: 200 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      ease: [0.6, 0.01, -0.05, 0.95],
      duration: 1.6,
    },
  },
  exit: {
    opacity: 0,
    y: -200,
    transition: {
      ease: "easeInOut",
      duration: 0.8,
    },
  },
};

export const itemOpp = {
  hidden: { opacity: 1, y: 0 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      ease: [0.6, 0.01, -0.05, 0.95],
      duration: 1.6,
    },
  },
  exit: {
    opacity: 0,
    y: -200,
    transition: {
      ease: "easeInOut",
      duration: 0.8,
    },
  },
};

export const griditem = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,

    transition: {
      ease: [0.6, 0.01, -0.05, 0.95],
      duration: 1.6,
    },
  },
  exit: {
    opacity: 0,

    transition: {
      ease: "easeInOut",
      duration: 0.8,
    },
  },
};

//anmation for iconbutton
export const itemBtn = {
  hidden: { opacity: 0, y: 200 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      ease: [0.6, 0.01, -0.05, 0.95],
      duration: 1.6,
    },
    scale: [1, 2, 2, 1, 1],
    rotate: [0, 0, 360, 360, 0],
    borderRadius: ["20%", "20%", "50%", "50%", "20%"],
  },
  exit: {
    opacity: 0,
    y: -200,
    transition: {
      ease: "backOut",
      duration: 0.8,
    },
  },
};

//anmation for iconbutton
export const itemLogo = {
  hidden: { opacity: 0, y: 0 },
  show: {
    opacity: 1,
    transition: {
      ease: [0.6, 0.01, -0.05, 0.95],
      duration: 1.6,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      ease: "easeInOut",
      duration: 0.8,
    },
  },
};

//main motion div animation to stagger childeren
export const container = {
  show: {
    transition: {
      staggerChildren: 0.35,
    },
  },
};
