import React from 'react';
import { cn } from '../../lib/utils';

interface AdProps {
  className: string;
}

const Ad: React.FC<AdProps> = ({ className }) => {
  return <div className={cn(className)}>Ad</div>;
};

export default Ad;
