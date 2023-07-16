import { PropsWithChildren } from 'react';

interface WrapperProps extends PropsWithChildren {
  onClickHandler?: (val?: unknown) => unknown;
}

export function CardWrapper({ children, onClickHandler }: WrapperProps) {
  return (
    <div
      onClick={() => onClickHandler && onClickHandler()}
      className="w-60 h-72 bg-white rounded-xl p-3 space-y-2 text-gray-700 shadow-xl flex flex-col justify-center items-center pb-12"
    >
      {children}
    </div>
  );
}
