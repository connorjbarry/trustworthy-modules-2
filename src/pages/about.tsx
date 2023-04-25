import { motion } from "framer-motion";

const About = (): JSX.Element => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 1 }}
      className="h-[60vh] flex flex-col justify-center items-center text-center"
    >
      <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold">
        About Our Team &#10024;
      </h1>
      <div className="text-base md:text-xl lg:text-2xl p-2 mx-1 my-8">
        <p>
          We are a group of 4 students from the Purdue University.
        </p>
      </div>
    </motion.div>
  );
};

export default About;
