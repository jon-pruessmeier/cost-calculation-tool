import Link from 'next/link';
import { useRouter } from 'next/router';
import { PropsWithChildren, useMemo } from 'react';

export interface NavButtonProps extends PropsWithChildren {
  path: string;
  text: string;
}

export function NavButton({ path, children: icon, text }: NavButtonProps) {
  const router = useRouter();

  const isCurrentActivePathClasses = useMemo(
    () =>
      router.pathname.includes(path) ? ' !text-blue-400 !bg-gray-100' : '',
    [router, path]
  );

  return (
    <button
      className={'h-full py-3 px-4  active:bg-zinc-100 hover:bg-zinc-100'.concat(
        isCurrentActivePathClasses
      )}
    >
      <Link href={path} className="flex flex-col justify-center items-center">
        {icon}
        <span>{text}</span>
      </Link>
    </button>
  );
}
