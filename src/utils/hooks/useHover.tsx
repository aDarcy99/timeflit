import React, { useEffect, useState } from 'react';

type TUseHoverProps = { refElement: HTMLElement | null; delay?: number };

const useHover = ({ refElement, delay }: TUseHoverProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const [hasLeft, setHasLeft] = useState(false);

  const onMouseEnter = () => {
    setHasEntered(true);
  };

  const onMouseLeave = () => {
    setHasLeft(true);
  };

  useEffect(() => {
    if (refElement) {
      refElement.addEventListener('mouseenter', onMouseEnter);
      refElement.addEventListener('mouseleave', onMouseLeave);
    }
    return () => {
      if (refElement) {
        refElement.removeEventListener('mouseenter', onMouseEnter);
        refElement.removeEventListener('mouseleave', onMouseLeave);
      }
    };
  }, [refElement]);

  useEffect(() => {
    if (hasEntered) {
      setHasEntered(false);
      setIsHovered(true);
    }

    if (hasLeft) {
      setHasLeft(false);
      setIsHovered(false);
    }
  }, [hasEntered, hasLeft]);

  return { isHovered, hasEntered, hasLeft };
};

export default useHover;
