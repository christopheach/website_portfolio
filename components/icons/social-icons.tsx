import * as React from "react";

import type { SocialPlatform } from "@/types/content";

type IconProps = React.SVGProps<SVGSVGElement>;

const base = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

function InstagramIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

function YoutubeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="2.5" y="5" width="19" height="14" rx="4" />
      <path d="m10 9.5 4.5 2.5-4.5 2.5z" fill="currentColor" />
    </svg>
  );
}

function XIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 4h4.5L20 20h-4.5z" />
      <path d="M19.5 4 13.4 10.6M4.5 20l6.1-6.6" />
    </svg>
  );
}

function LinkedinIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path d="M8 11v5.5M8 7.75v.01M12 16.5V11m0 2.5a2.5 2.5 0 0 1 5 0v3" />
    </svg>
  );
}

const icons: Record<SocialPlatform, (props: IconProps) => React.JSX.Element> = {
  instagram: InstagramIcon,
  youtube: YoutubeIcon,
  x: XIcon,
  linkedin: LinkedinIcon,
};

export function SocialIcon({ platform, ...props }: IconProps & { platform: SocialPlatform }) {
  const Icon = icons[platform];
  return <Icon {...props} />;
}
