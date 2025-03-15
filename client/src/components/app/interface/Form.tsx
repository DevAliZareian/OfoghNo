import { PropsWithChildren, MouseEventHandler } from "react";

interface FormProps extends PropsWithChildren {
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export default function Form({ children, onClick }: FormProps) {
  return (
    <div onClick={onClick} className="p-4 w-full min-h-screen bg-[#121212] flex flex-col items-center justify-start">
      <h1 className="text-4xl text-[#4A90E2] mt-4 transform flex items-center justify-center mb-8">Ali Zareian</h1>
      <main className="max-w-screen-md w-full flex flex-col items-center justify-center gap-4">{children}</main>
    </div>
  );
}
