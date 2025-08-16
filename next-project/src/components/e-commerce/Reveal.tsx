'use client';

import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

interface Props {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  stagger?: number; // tiempo entre hijos
  className?: string;
  distance?: number;
}

export default function Reveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.8,
  stagger = 0.15,
  className = '',
  distance = 50,
}: Props) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.20,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);

  // Distancia inicial según dirección
  let x = 0;
  let y = 0;
  if (direction === 'up') y = distance;
  if (direction === 'down') y = -distance;
  if (direction === 'left') x = distance;
  if (direction === 'right') x = -distance;

  // Variantes para el contenedor (maneja stagger)
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  // Variantes para cada hijo
  const childVariants: Variants = {
    hidden: { opacity: 0, x, y },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className={className}
    >
      {Array.isArray(children) ? (
        children.map((child, index) => (
          <motion.div
            key={index}
            variants={childVariants}
          >
            {child}
          </motion.div>
        ))
      ) : (
        <motion.div variants={childVariants}>{children}</motion.div>
      )}
    </motion.div>
  );
}
