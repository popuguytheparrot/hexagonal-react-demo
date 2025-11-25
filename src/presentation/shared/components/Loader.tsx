import './Loader.css';

interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export function Loader({ size = 'medium', className = '' }: LoaderProps) {
  return (
    <div className={`loader loader-${size} ${className}`}>
      <div className="loader-spinner"></div>
    </div>
  );
}
