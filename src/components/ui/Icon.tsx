"use client";

import "iconify-icon";
import type { HTMLAttributes } from "react";

type IconProps = Omit<HTMLAttributes<HTMLElement>, "icon"> & {
  icon: string;
  size?: number;
};

export function Icon({ icon, size = 20, className, ...rest }: IconProps) {
  return (
    <iconify-icon
      icon={icon}
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      {...rest}
    />
  );
}