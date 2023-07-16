import { PropsWithChildren } from 'react';

export function DialogWrapper({ children }: PropsWithChildren) {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 !m-0">
      {children}
    </div>
  );
}
