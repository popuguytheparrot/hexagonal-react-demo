import './Badge.css';

interface BadgeProps {
  count: number;
  className?: string;
}

export function Badge({ count, className = '' }: BadgeProps) {
  if (count <= 0) return null;
  
  return (
    <span className={`badge ${className}`}>
      {count > 99 ? '99+' : count}
    </span>
  );
}
