import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";


const Speech = () => {
  return (
    <motion.div
      className="bubbleContainer"
      animate={{ opacity: [0, 1] }}
      transition={{ duration: 1 }}
    >
      <div className="bubble">
        <TypeAnimation
          sequence={[
            1000,
            "Hi, I'm Ashish Parab a passionate Java & Web Enthusiast !",
            1000,
            "Building scalable applications & exploring the world of AI and ML. ",
            1000,
          ]}
          wrapper="span"
          speed={40}
          deletionSpeed={60}
          
          repeat={Infinity}
        />
      </div>
      <img src="/man.png" alt="" />
    </motion.div>
  );
};

export default Speech;
