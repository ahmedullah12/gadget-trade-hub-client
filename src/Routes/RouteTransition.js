// RouteTransition.js
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const RouteTransition = ({ children }) => {
  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default RouteTransition;
