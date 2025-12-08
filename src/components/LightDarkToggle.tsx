import { Switch } from "./ui/switch";
import Sun from "../assets/sun.svg?react";
import Moon from "../assets/moon.svg?react";
import { useTheme } from "./ThemeProvider";

const LightDarkToggle = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="flex items-center gap-2">
      <Sun className="size-5 invert" />
      <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
      <Moon className="size-5 invert" />
    </div>
  );
};

export default LightDarkToggle;
