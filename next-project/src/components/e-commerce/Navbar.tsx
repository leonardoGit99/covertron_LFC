import Link from 'next/link';
import { GiKangaroo } from 'react-icons/gi';
import NbDesktopItems from './NbDesktopItems';
import NbMobileItems from './NbMobileItems';
import { ModeToggle } from '../ui/toggle-theme';
import Logo from '../shared/Logo';

type Props = {
  type?: 'default' | 'transparent';
};

function Navbar({ type = 'default' }: Props) {
  return (
    <div
      className={` ${
        type == 'default'
          ? 'fixed inset-0 w-full z-50 h-[5.75rem] bg-background shadow-sm dark:bg-backgroundDark dark:shadow-sm dark:shadow-white/50'
          : 'bg-transparent absolute top-0 left-0 w-full z-50 h-[5.75rem] backdrop-blur-sm'
      }`}
    >
      <div className="flex items-center justify-between py-4 mx-auto sm:max-w-6xl">
        <Logo
          type={type}
          href="/"
        />
        <div className="items-center justify-between hidden sm:flex">
          <NbDesktopItems type={type} />
        </div>
        <div className="flex sm:hidden">
          <NbMobileItems />
        </div>
        <div className="flex items-center justify-between gap-2 sm:7">
          <ModeToggle type={type} />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
