import { useState } from "react";

type Return = [boolean, () => void, React.Dispatch<React.SetStateAction<boolean>>];

const useToggle = (initState?: boolean): Return => {
  const [value, setValue] = useState<boolean>(initState || false);

  const toggle = (): void => setValue((val) => !val);

  return [value, toggle, setValue];
};

export default useToggle;
