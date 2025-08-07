import styles from './CheckMarkIcon.module.scss';

interface CheckMarkIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

// Checkmark icon component
const CheckMarkIcon = ({ className, ...props }: CheckMarkIconProps) => (
  <svg 
    className={`${styles.checkmark} ${className || ''}`} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" fill="currentColor" />
  </svg>
);

export default CheckmarkIcon;
