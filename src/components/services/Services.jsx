import ComputerModelContainer from "./computer/ComputerModelContainer";
import JavaSphere from "./console/JavaSphere";
import AnimatedIcons from "./mug/AnimatedIcons";
import Counter from "./Counter";
import "./services.css";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const textVariants = {
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
      duration: 1,
    },
  },
};

const listVariants = {
  initial: {
    x: -100,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 1,
      staggerChildren: 0.5,
    },
  },
};

const services = [
  {
    id: 1,
    img: "/service1.png",
    title: "Web Development",
    counter: 8,
    label: "Projects"
  },
  {
    id: 2,
    img: "/service2.png",
    title: "Java Development",
    counter: 8,
    label: "Projects"
  },
  {
    id: 3,
    img: "/service3.png",
    title: "Skills",
    counter: 14,
    label: "Skills"
  },
];

const Services = () => {
  const [currentServiceId, setCurrentServiceId] = useState(1);
  const ref = useRef();
  const isInView = useInView(ref, { margin: "-200px" });
  
  return (
    <div className="services" ref={ref}>
      <div className="sSection left">
        <motion.h1
          variants={textVariants}
          animate={isInView ? "animate" : "initial"}
          className="sTitle"
        >
          How do I help?
        </motion.h1>
        <motion.div
          variants={listVariants}
          animate={isInView ? "animate" : "initial"}
          className="serviceList"
        >
          {services.map((service) => (
            <motion.div
              variants={listVariants}
              className={`service ${currentServiceId === service.id ? 'active' : ''}`}
              key={service.id}
              onClick={() => setCurrentServiceId(service.id)}
            >
              <div className="serviceIcon">
                <img src={service.img} alt={service.title} />
              </div>
              <div className="serviceInfo">
                <h2>{service.title}</h2>
                <h3>{service.counter} {service.label}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <div className="counterList">
          <Counter from={0} to={15} text="Projects Completed" />
          <Counter from={0} to={5} text="Clients" />
        </div>
      </div>
      <div className="sSection right">
        {currentServiceId === 1 ? (
          <ComputerModelContainer />
        ) : currentServiceId === 2 ? (
          <JavaSphere />
        ) : (
          <AnimatedIcons />
        )}
      </div>
    </div>
  );
};

export default Services;