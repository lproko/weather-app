import type { Dispatch, SetStateAction } from "react";
import Menu from "../assets/menu.svg?react";

type Props = {
  setIsSidePanelOpen: Dispatch<SetStateAction<boolean>>;
};

const MobileHeader = (props: Props) => {
  return (
    <div className="w-full h-16 p-4 bg-background sticky top-0  flex justify-end md:hidden z-1001">
      <button onClick={() => props.setIsSidePanelOpen(true)}>
        <Menu className="size-8 invert ml-auto " />
      </button>
    </div>
  );
};

export default MobileHeader;
