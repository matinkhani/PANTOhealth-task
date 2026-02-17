import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen w-screen bg-gray-50 text-gray-900">
      {children}
    </div>
  );
};
