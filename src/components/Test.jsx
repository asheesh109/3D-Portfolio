import { motion } from "framer-motion";

const shapeVariants = {
  initialRect: {
    x: -100,
    opacity: 0,
  },
  animateRect: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 2,
    },
  },
  initialCirc: {
    y: -100,
    opacity: 0,
  },
  animateCirc: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 3,
    },
  },
};

const listVariants = {
  initial: {
    x: -100,
    y: -100,
    opacity: 0,
  },
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      duration: 3,
      staggerChildren: 1,
    },
  },
};

const Test = () => {
  return (
    <section
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <motion.div
        // initial={{ x: 0, y: 0, opacity: 0 }}
        // animate={{ x: [0, 100], y: [0, -200], opacity: [0, 1] }}
        // transition={{
        //   duration: 2,
        //   // delay: 4,
        //   ease: "easeInOut",
        //   repeat: Infinity,
        // }}
        variants={shapeVariants}
        initial="initialRect"
        animate="animateRect"
        style={{ width: 300, height: 300, background: "red" }}
      ></motion.div>
      <motion.div
        variants={shapeVariants}
        initial="initialCirc"
        animate="animateCirc"
        style={{
          width: 300,
          height: 300,
          background: "green",
          borderRadius: "100%",
        }}
      ></motion.div>
      <motion.ul variants={listVariants} initial="initial" animate="animate">
        <motion.li variants={listVariants}>Javascript</motion.li>
        <motion.li variants={listVariants}>React</motion.li>
        <motion.li variants={listVariants}>Next.js</motion.li>
      </motion.ul>
    </section>
  );
};

export default Test;
