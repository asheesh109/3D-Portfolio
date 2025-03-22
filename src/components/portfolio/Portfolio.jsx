import { useEffect, useRef, useState } from "react";
import "./portfolio.css";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const items = [
  {
    id: 1,
    img: "/p1.jpg",
    title: "Restaurent Mangement System",
    desc: "My Restaurant Management System is built using Java, JDBC, and SQL, allowing seamless order management, billing, and inventory tracking. It provides an efficient interface for restaurant staff to handle customer orders and generate real-time reports.",
    link: "https://github.com/asheesh109/Restaurant-Management-System",
  },
  {
    id: 2,
    img: "/p2.jpg",
    title: "Bon Apetite",
    desc: "Bon Apétite is a recipe finder website built with HTML, CSS, and JavaScript, allowing users to search for recipes based on ingredients and cuisine. It provides an interactive and user-friendly interface to explore delicious recipes effortlessly.",
    link: "https://github.com/asheesh109/Bon_Apetite",
  },
  {
    id: 3,
    img: "/p3.jpg",
    title: "Virtual Bank System",
    desc: "Virtual Bank System is a Java-based banking application utilizing JDBC and SQL for secure transactions, account management, and balance tracking. It provides a user-friendly interface for seamless banking operations.",
    link: "https://github.com/asheesh109/Virtual-Bank-System",
  },
  {
    id: 4,
    img: "/p4.jpg",
    title: "Quiz Web App",
    desc: "My Quiz Website is an interactive platform built using Java Swing, AWT, and JavaFX, offering a dynamic and engaging quiz experience. It features a user-friendly interface with real-time score tracking and a variety of question formats.",
    link: "https://github.com/asheesh109/OIBSIP_Quiz_App",
  },
  
  {
    id: 5,
    img: "/p6.jpg",
    title: "Scotify",
    desc: "Scotify is a music player built using Java that offers a seamless audio experience with a user-friendly interface. It supports playlist management, playback controls, and a smooth UI for an immersive listening experience.",
    link: "https://github.com/asheesh109/scotify",
  },
];

const imgVariants = {
  initial: {
    x: -500,
    y: 500,
    opacity: 0,
  },
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

const textVariants = {
  initial: {
    x: 500,
    y: 500,
    opacity: 0,
  },
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
      staggerChildren: 0.05,
    },
  },
};

const ListItem = ({ item }) => {
  const ref = useRef();

  const isInView = useInView(ref, { margin: "-100px" });

  return (
    <div className="pItem" ref={ref}>
      <motion.div
        variants={imgVariants}
        animate={isInView ? "animate" : "initial"}
        className="pImg"
      >
        <img src={item.img} alt="" />
      </motion.div>
      <motion.div
        variants={textVariants}
        animate={isInView ? "animate" : "initial"}
        className="pText"
      >
        <motion.h1 variants={textVariants}>{item.title}</motion.h1>
        <motion.p variants={textVariants}>{item.desc}</motion.p>
        <motion.a variants={textVariants} href={item.link}>
          <button>View Project</button>
        </motion.a>
      </motion.div>
    </div>
  );
};

const Portfolio = () => {
  const [containerDistance, setContainerDistance] = useState(0);
  const ref = useRef(null);

  
  useEffect(() => {
    const calculateDistance = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setContainerDistance(rect.left);
      }
    };

    calculateDistance();

    window.addEventListener("resize", calculateDistance);

    return () => {
      window.removeEventListener("resize", calculateDistance);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: ref });

  const xTranslate = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -window.innerWidth * items.length]
  );

  return (
    <div className="portfolio" ref={ref}>
      <motion.div className="pList" style={{ x: xTranslate }}>
        <div
          className="empty"
          style={{
            width: window.innerWidth - containerDistance,
            // backgroundColor: "pink",
          }}
        />
        {items.map((item) => (
          <ListItem item={item} key={item.id} />
        ))}
      </motion.div>
      <section />
      <section />
      <section />
      <section />
      <section />
      <div className="pProgress">
        <svg width="100%" height="100%" viewBox="0 0 160 160">
          <circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke="#ddd"
            strokeWidth={20}
          />
          <motion.circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke="#dd4c62"
            strokeWidth={20}
            style={{ pathLength: scrollYProgress }}
            transform="rotate(-90 80 80)"
          />
        </svg>
      </div>
    </div>
  );
};

export default Portfolio;
