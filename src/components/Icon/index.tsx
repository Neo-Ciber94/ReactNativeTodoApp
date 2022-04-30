import { Avatar } from "react-native-paper";

export interface IconProps {
  icon: string;
  size?: number;
  color?: string;
}

export default function Icon({ icon, size, color }: IconProps) {
  return (
    <Avatar.Icon
      icon={icon}
      size={size}
      color={color}
      style={{ backgroundColor: "#0000" }}
    />
  );
}
