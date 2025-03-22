import "./contact.css";
import emailjs from "@emailjs/browser";
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import ContactSvg from "./ContactSvg";



const listVariant = {
  initial: {
    x: 100,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.2,
    },
  },
};

const Contact = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const ref = useRef();
  const form = useRef();

  
  useEffect(() => {
   
    const publicKey = "mnU50Uti66brErFTP";
    emailjs.init(publicKey);
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setSuccess(false);
    setErrorMessage("");

    
    const serviceId = "service_gidlmi4";
    const templateId = "template_st85jq2";

    const formData = new FormData(form.current);
    const templateParams = {
      from_name: formData.get('user_username'),
      reply_to: formData.get('user_email'),
      message: formData.get('user_message'),
      to_email: "ashishparab03@gmail.com"
    };

    emailjs
      .send(serviceId, templateId, templateParams)
      .then(
        (result) => {
          console.log('Email sent successfully:', result.text);
          setSuccess(true);
          setLoading(false);
          form.current.reset();
        },
        (error) => {
          console.error('Email error details:', error);
          setError(true);
          setLoading(false);
          setErrorMessage(
            `Error sending email: ${error.text || "Unknown error"}. Please try again or contact directly at ashishparab03@gmail.com`
          );
        }
      );
  };

  const isInView = useInView(ref, { margin: "-200px" });

  return (
    <div className="contact" ref={ref}>
      <div className="cSection">
        <motion.form
          ref={form}
          variants={listVariant}
          animate={isInView ? "animate" : "initial"}
          onSubmit={sendEmail}
        >
          <motion.h1 variants={listVariant} className="cTitle">
            Let's keep in touch
          </motion.h1>
          <motion.div variants={listVariant} className="formItem">
            <label>Name</label>
            <input type="text" name="user_username" placeholder="Ashish parab" required />
          </motion.div>
          <motion.div variants={listVariant} className="formItem">
            <label>Email</label>
            <input
              type="email"
              name="user_email"
              placeholder="your@email.com"
              required
            />
          </motion.div>
          <motion.div variants={listVariant} className="formItem">
            <label>Message</label>
            <textarea
              rows={10}
              name="user_message"
              placeholder="Write your message..."
              required
            ></textarea>
          </motion.div>
          <motion.button 
            variants={listVariant} 
            className="formButton"
            type="submit"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send"}
          </motion.button>
          {success && <span className="successMessage">Your message has been sent!</span>}
          {error && <span className="errorMessage">{errorMessage}</span>}
        </motion.form>
      </div>
      <div className="cSection"><ContactSvg/></div>
    </div>
  );
};

export default Contact;