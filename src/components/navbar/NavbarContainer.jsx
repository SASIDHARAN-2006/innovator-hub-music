import Logo from "./Logo";
import Menu from "./Menu";

const NavbarContainer = () => {
  return (
    <header className="h-[70px] w-[100%] bg-slate-600 sticky top-0 z-10 shadow-md">
      <article className="w-[95%] m-auto h-[100%] flex items-center justify-between">
        <Logo />
        <Menu />
      </article>
    </header>
  );
};

export default NavbarContainer;
