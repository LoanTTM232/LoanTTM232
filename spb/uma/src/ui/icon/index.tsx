import React from 'react';

import ArrowLeft from '@/ui/icon/arrowLeft';
import Eye from '@/ui/icon/eye';
import EyeHide from '@/ui/icon/eyeHide';
import Home from '@/ui/icon/home';

const icons = {
  home: Home,
  arrowLeft: ArrowLeft,
  eye: Eye,
  eyeHide: EyeHide,
};

interface IIconProps {
  icon: keyof typeof icons;
  size?: number;
  color?: string;
  strokeWidth?: number;
}

function Icon({ icon, ...props }: IIconProps) {
  const IconComponent = icons[icon];

  return (
    <IconComponent
      height={props.size || 24}
      width={props.size || 24}
      strokeWidth={props.strokeWidth || 1.9}
      {...props}
    />
  );
}

export default Icon;
