import React, { FunctionComponent, ReactNode, ReactChild, forwardRef, useEffect, useState, useRef, ReactElement } from 'react';
// Functions
import clsx from 'clsx';
import useIsMounted from '../../../utils/hooks/useIsMounted';
import useWindowDimensions from '../../../utils/hooks/useWindowDimensions';
import useHover from '../../../utils/hooks/useHover';
// Components
import { Portal } from 'react-portal';
// Styles
import classes from './popover.module.scss';

export type TPopoverProps = {
  children: ReactNode;
  className?: string;
  targetElement: ReactElement;
  position?: 'top' | 'left' | 'right' | 'bottom';
  offset?: number;
  trigger?: 'hover' | 'custom';
  isOpen?: boolean;
  onClose?: () => void;
  overlayProps?: any;
};

/**
 * @param targetElement (string): Classname of element in which Portal should exist. Defaults to body.
 * @param trigger ('hover' | 'custom'): Controls how the popover will appear.
 * - If set to hover the hovering over the targetElement will make the popover appear
 * - If set to custom the isOpen prop will control when the popover will appear
 * @returns
 */
const Popover = ({ children, className, targetElement, position = 'top', offset = 8, trigger = 'custom', isOpen, onClose, overlayProps }: TPopoverProps) => {
  const targetElementRef = useRef<HTMLElement>(null);
  const [popoverRef, setPopoverRef] = useState<HTMLDivElement | null>(null);

  const isMounted = useIsMounted();
  const windowDimensions = useWindowDimensions();
  const { isHovered: isTargetElementHovered } = useHover({ refElement: targetElementRef.current });
  const { isHovered: isPopoverElementHovered } = useHover({ refElement: popoverRef });

  const [isLocallyOpen, setIsLocallyOpen] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState<null | { x: number; y: number }>(null);

  const TargetElement = React.cloneElement(targetElement, { ref: targetElementRef });

  useEffect(() => {
    if (trigger !== 'hover') {
      return;
    }

    let timeoutId: any = null;

    if (isTargetElementHovered) {
      setIsLocallyOpen(true);
    }

    if (!isTargetElementHovered && !isPopoverElementHovered) {
      timeoutId = setTimeout(() => {
        setIsLocallyOpen(isTargetElementHovered || isPopoverElementHovered);
      }, 300);
    }

    return () => clearTimeout(timeoutId);
  }, [isTargetElementHovered, isPopoverElementHovered]);

  useEffect(() => {
    if (targetElementRef.current && popoverRef) {
      const { x: targetElementX, y: targetElementY, width: targetElementWidth, height: targetElementHeight } = targetElementRef.current.getBoundingClientRect();
      const { width: popoverWidth, height: popoverHeight } = popoverRef.getBoundingClientRect();

      let newPopoverPosition = null;

      switch (position) {
        case 'bottom':
          newPopoverPosition = { x: targetElementX + targetElementWidth / 2 - popoverWidth / 2, y: targetElementY + offset + targetElementHeight };
          break;
        case 'left':
          newPopoverPosition = { x: targetElementX - offset - popoverWidth, y: targetElementY + targetElementHeight / 2 - popoverHeight / 2 };
          break;
        case 'right':
          newPopoverPosition = { x: targetElementX + offset + targetElementWidth, y: targetElementY + targetElementHeight / 2 - popoverHeight / 2 };
          break;
        case 'top':
        default:
          newPopoverPosition = { x: targetElementX + targetElementWidth / 2 - popoverWidth / 2, y: targetElementY - offset - popoverHeight };
          break;
      }

      setPopoverPosition(newPopoverPosition);
    }
  }, [popoverRef, windowDimensions, offset, position, isLocallyOpen, isOpen]);

  useEffect(() => {
    // TODO: position the popover above or below the targeted element based on the popovers position from the top of the browser
    // const getPopoverHeightFromTop = () => {
    //   console.log(popoverRef?.getBoundingClientRect());
    // };
    // document.addEventListener('scroll', getPopoverHeightFromTop);
    // return () => {
    //   document.addEventListener('scroll', getPopoverHeightFromTop);
    // };
  }, []);

  return (
    <>
      {TargetElement}
      {isMounted && (isLocallyOpen || isOpen) ? (
        <Portal>
          {onClose && <div {...overlayProps} className={clsx(classes['overlay'], overlayProps?.className)} onClick={onClose} />}
          <div ref={setPopoverRef} style={{ top: popoverPosition?.y, left: popoverPosition?.x }} className={clsx(classes['content'], className)}>
            {children}
          </div>
        </Portal>
      ) : null}
    </>
  );
};

Popover.displayName = 'Popover';

export default Popover;
