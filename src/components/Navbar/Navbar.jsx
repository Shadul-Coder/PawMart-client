import { Link, NavLink } from "react-router";
import logo from "/Logo.png";
import { useEffect, useRef } from "react";
import useAuth from "../../hooks/useAuth";
import { CgMenuRightAlt } from "react-icons/cg";
import navimg from "../../assets/Nav Design.png";
import navimgblack from "../../assets/Nav Design Black.png";
import avatar from "../../assets/Default Avatar.png";
import { FaShop, FaUser } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { MdPostAdd } from "react-icons/md";
import { LuLayoutDashboard } from "react-icons/lu";
import { FiShoppingBag } from "react-icons/fi";

const Navbar = () => {
  const { theme, setTheme, user, signOutuser } = useAuth();
  const themeButton1 = useRef(null);
  const themeButton2 = useRef(null);
  const navLinks = [
    ["/", "Home", <FaHome />],
    ["/adopt&shop", "Adopt & Shop", <FaShop />],
  ];
  const protectedLinks = [
    ["/create-post", "Create Post", <MdPostAdd />],
    ["/dashboard", "Dashboard", <LuLayoutDashboard />],
    ["/orders", "Orders", <FiShoppingBag />],
  ];
  useEffect(() => {
    if (theme === "dark") {
      themeButton1.current.checked = true;
      themeButton2.current.checked = true;
    }
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);
  const handleTheme = (e) => {
    setTheme(e.target.checked ? "dark" : "light");
    localStorage.setItem("theme", e.target.checked ? "dark" : "light");
  };
  const handleSignOut = () => {
    signOutuser().then().catch();
  };
  return (
    <nav>
      <div className="max-w-7xl mx-auto w-[95%] mt-5 mb-3 sm:mt-6 sm:mb-4 lg:mt-7 lg:mb-5 lg:w-[97%]">
        <div className="flex justify-between items-center">
          <Link to={"/"} className="flex items-center gap-3 cursor-default">
            <img src={logo} alt="" className="h-10 md:h-11" />
            <h1
              style={{ fontFamily: '"Sarina", cursive' }}
              className="text-xl md:text-2xl"
            >
              PawMart
            </h1>
          </Link>
          <div className="space-x-5">
            {navLinks.map((link) => (
              <NavLink
                key={link[1]}
                to={link[0]}
                className={
                  "hidden lg:inline-block cursor-pointer uppercase px-4 py-2 rounded-lg active:translate-x-0.5 active:translate-y-0.5 hover:shadow-[0.3rem_0.3rem_#f04336,-0.3rem_-0.3rem_#ff9266] transition"
                }
              >
                {link[1]}
              </NavLink>
            ))}
            {!user && (
              <NavLink
                to={"/profile"}
                className={
                  "hidden lg:inline-block cursor-pointer uppercase px-4 py-2 rounded-lg active:translate-x-0.5 active:translate-y-0.5 hover:shadow-[0.3rem_0.3rem_#f04336,-0.3rem_-0.3rem_#ff9266] transition"
                }
              >
                Profile
              </NavLink>
            )}
            {user &&
              protectedLinks.map((link) => (
                <NavLink
                  key={link[1]}
                  to={link[0]}
                  className={
                    "hidden lg:inline-block cursor-pointer uppercase px-4 py-2 rounded-lg active:translate-x-0.5 active:translate-y-0.5 hover:shadow-[0.3rem_0.3rem_#f04336,-0.3rem_-0.3rem_#ff9266] transition"
                  }
                >
                  {link[1]}
                </NavLink>
              ))}
          </div>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="hidden lg:block">
              {user?.photoURL ? (
                <div className="h-[50px] w-[50px] rounded-full border border-[#fc6940] overflow-hidden cursor-pointer hover:scale-103 transition-all duration-300">
                  <img
                    className="h-full w-full object-cover"
                    src={user.photoURL}
                    alt=""
                  />
                </div>
              ) : (
                <img
                  className="w-[50px] cursor-pointer hover:scale-103 transition-all duration-300"
                  src={avatar}
                  alt=""
                />
              )}
            </div>
            <div
              tabIndex="-1"
              className="dropdown-content bg-base-100 border border-base-300 mt-1.5 rounded-xl z-30 w-77 shadow-lg overflow-hidden"
            >
              <div className="flex items-center gap-3 p-4 border-b border-base-300">
                {user?.photoURL ? (
                  <div className="h-[45px] w-[45px] border border-[#fc6940] rounded-full overflow-hidden">
                    <img
                      src={user.photoURL}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <img className="w-[45px]" src={avatar} alt="" />
                )}
                <div className="flex flex-col">
                  <p className="font-semibold">
                    {user?.displayName || "Guest"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {user?.email || "user@email.com"}
                  </p>
                </div>
              </div>
              <div className="p-4 space-y-1">
                {user && (
                  <>
                    <Link
                      to={"/profile"}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-base-300 transition-all cursor-pointer"
                    >
                      <FaUser className="text-[#fc6940]" /> Profile
                    </Link>
                    <div className="border-t border-base-300 mt-3 mb-4.5"></div>
                  </>
                )}
                <div className="flex justify-between items-center px-3 pb-1.5">
                  <span className="text-[15px] font-medium">Theme</span>{" "}
                  <label className="inline-flex items-center relative cursor-pointer">
                    <input
                      onChange={handleTheme}
                      className="peer hidden"
                      ref={themeButton1}
                      type="checkbox"
                    />
                    <div className="relative w-15 h-[30px] bg-white peer-checked:bg-zinc-500 rounded-full after:absolute after:content-[''] after:w-6 after:h-6 peer-checked:after:bg-zinc-900 after:rounded-full after:top-[3px] after:left-1 active:after:w-7 peer-checked:after:left-[57px] peer-checked:after:-translate-x-full shadow-sm duration-300 after:duration-300 after:shadow-md">
                      <style>
                        {`label input:not(:checked) + div::after {background: linear-gradient(to right, #fc4422, #ff9266);}`}
                      </style>
                    </div>
                    <svg
                      height="0"
                      width="100"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      className="fill-white peer-checked:opacity-60 absolute w-3 h-3 left-2.5"
                    >
                      <path d="M12,17c-2.76,0-5-2.24-5-5s2.24-5,5-5,5,2.24,5,5-2.24,5-5,5ZM13,0h-2V5h2V0Zm0,19h-2v5h2v-5ZM5,11H0v2H5v-2Zm19,0h-5v2h5v-2Zm-2.81-6.78l-1.41-1.41-3.54,3.54,1.41,1.41,3.54-3.54ZM7.76,17.66l-1.41-1.41-3.54,3.54,1.41,1.41,3.54-3.54Zm0-11.31l-3.54-3.54-1.41,1.41,3.54,3.54,1.41-1.41Zm13.44,13.44l-3.54-3.54-1.41,1.41,3.54,3.54,1.41-1.41Z"></path>
                    </svg>
                    <svg
                      height="512"
                      width="512"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      className="fill-black opacity-60 peer-checked:opacity-70 peer-checked:fill-white absolute w-3 h-3 right-2.5"
                    >
                      <path d="M12.009,24A12.067,12.067,0,0,1,.075,10.725,12.121,12.121,0,0,1,10.1.152a13,13,0,0,1,5.03.206,2.5,2.5,0,0,1,1.8,1.8,2.47,2.47,0,0,1-.7,2.425c-4.559,4.168-4.165,10.645.807,14.412h0a2.5,2.5,0,0,1-.7,4.319A13.875,13.875,0,0,1,12.009,24Zm.074-22a10.776,10.776,0,0,0-1.675.127,10.1,10.1,0,0,0-8.344,8.8A9.928,9.928,0,0,0,4.581,18.7a10.473,10.473,0,0,0,11.093,2.734.5.5,0,0,0,.138-.856h0C9.883,16.1,9.417,8.087,14.865,3.124a.459.459,0,0,0,.127-.465.491.491,0,0,0-.356-.362A10.68,10.68,0,0,0,12.083,2ZM20.5,12a1,1,0,0,1-.97-.757l-.358-1.43L17.74,9.428a1,1,0,0,1,.035-1.94l1.4-.325.351-1.406a1,1,0,0,1,1.94,0l.355,1.418,1.418.355a1,1,0,0,1,0,1.94l-1.418.355-.355,1.418A1,1,0,0,1,20.5,12ZM16,14a1,1,0,0,0,2,0A1,1,0,0,0,16,14Zm6,4a1,1,0,0,0,2,0A1,1,0,0,0,22,18Z"></path>
                    </svg>
                  </label>
                </div>
                {user ? (
                  <button
                    onClick={handleSignOut}
                    className="btn p-5.5 w-full mt-2 bg-linear-to-r from-primary to-secondary text-white rounded-lg"
                  >
                    Log out
                  </button>
                ) : (
                  <div className="space-y-2 mt-2">
                    <Link
                      to={"/login"}
                      className="btn p-5.5 w-full border-2 border-primary text-primary rounded-lg"
                    >
                      Login
                    </Link>
                    <Link
                      to={"/register"}
                      className="btn p-5.5 w-full bg-linear-to-r from-primary to-secondary text-white rounded-lg"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
          <label
            htmlFor="my-drawer"
            className="text-[27px] sm:text-[30px] lg:hidden"
          >
            <CgMenuRightAlt />
          </label>
        </div>
        <div className="drawer drawer-end z-99">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-side">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <div className="bg-base-200 menu min-h-full w-55 p-4 sm:w-75">
              {user && (
                <div className="mx-auto py-5 space-y-3">
                  {user.photoURL ? (
                    <div className="mx-auto h-[70px] w-[70px] border border-[#fc6940] rounded-full overflow-hidden">
                      <img
                        className="h-full w-full object-cover"
                        src={user.photoURL}
                        alt=""
                      />
                    </div>
                  ) : (
                    <div className="mx-auto h-[70px] w-[70px] rounded-full overflow-hidden">
                      <img className="w-[70px]" src={avatar} alt="" />
                    </div>
                  )}
                  <h3 className="font-semibold">{user.displayName}</h3>
                </div>
              )}
              <div className="flex flex-col gap-1.5 sm:gap-2">
                {user && (
                  <NavLink
                    to={"/profile"}
                    className={"px-5 py-3 rounded-lg flex items-center gap-3"}
                  >
                    <FaUser /> Profile
                  </NavLink>
                )}
                {navLinks.map((link) => (
                  <NavLink
                    key={link[1]}
                    to={link[0]}
                    className={"px-5 py-3 rounded-lg flex items-center gap-3"}
                  >
                    {link[2]} {link[1]}
                  </NavLink>
                ))}
                {!user && (
                  <NavLink
                    to={"/profile"}
                    className={"px-5 py-3 rounded-lg flex items-center gap-3"}
                  >
                    <FaUser /> Profile
                  </NavLink>
                )}
                {user &&
                  protectedLinks.map((link) => (
                    <NavLink
                      key={link[1]}
                      to={link[0]}
                      className={"px-5 py-3 rounded-lg flex items-center gap-3"}
                    >
                      {link[2]} {link[1]}
                    </NavLink>
                  ))}
              </div>
              <div className="absolute bottom-4 flex flex-col gap-1.5 sm:gap-2">
                <div className="flex justify-between items-center py-5">
                  <span>Theme</span>{" "}
                  <label className="inline-flex items-center relative cursor-pointer">
                    <input
                      onChange={handleTheme}
                      className="peer hidden"
                      ref={themeButton2}
                      type="checkbox"
                    />
                    <div className="relative w-15 h-[30px] bg-white peer-checked:bg-zinc-500 rounded-full after:absolute after:content-[''] after:w-6 after:h-6 peer-checked:after:bg-zinc-900 after:rounded-full after:top-[3px] after:left-1 active:after:w-7 peer-checked:after:left-[57px] peer-checked:after:-translate-x-full shadow-sm duration-300 after:duration-300 after:shadow-md">
                      <style>
                        {`label input:not(:checked) + div::after {background: linear-gradient(to right, #fc4422, #ff9266);}`}
                      </style>
                    </div>
                    <svg
                      height="0"
                      width="100"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      className="fill-white peer-checked:opacity-60 absolute w-3 h-3 left-2.5"
                    >
                      <path d="M12,17c-2.76,0-5-2.24-5-5s2.24-5,5-5,5,2.24,5,5-2.24,5-5,5ZM13,0h-2V5h2V0Zm0,19h-2v5h2v-5ZM5,11H0v2H5v-2Zm19,0h-5v2h5v-2Zm-2.81-6.78l-1.41-1.41-3.54,3.54,1.41,1.41,3.54-3.54ZM7.76,17.66l-1.41-1.41-3.54,3.54,1.41,1.41,3.54-3.54Zm0-11.31l-3.54-3.54-1.41,1.41,3.54,3.54,1.41-1.41Zm13.44,13.44l-3.54-3.54-1.41,1.41,3.54,3.54,1.41-1.41Z"></path>
                    </svg>
                    <svg
                      height="512"
                      width="512"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      className="fill-black opacity-60 peer-checked:opacity-70 peer-checked:fill-white absolute w-3 h-3 right-2.5"
                    >
                      <path d="M12.009,24A12.067,12.067,0,0,1,.075,10.725,12.121,12.121,0,0,1,10.1.152a13,13,0,0,1,5.03.206,2.5,2.5,0,0,1,1.8,1.8,2.47,2.47,0,0,1-.7,2.425c-4.559,4.168-4.165,10.645.807,14.412h0a2.5,2.5,0,0,1-.7,4.319A13.875,13.875,0,0,1,12.009,24Zm.074-22a10.776,10.776,0,0,0-1.675.127,10.1,10.1,0,0,0-8.344,8.8A9.928,9.928,0,0,0,4.581,18.7a10.473,10.473,0,0,0,11.093,2.734.5.5,0,0,0,.138-.856h0C9.883,16.1,9.417,8.087,14.865,3.124a.459.459,0,0,0,.127-.465.491.491,0,0,0-.356-.362A10.68,10.68,0,0,0,12.083,2ZM20.5,12a1,1,0,0,1-.97-.757l-.358-1.43L17.74,9.428a1,1,0,0,1,.035-1.94l1.4-.325.351-1.406a1,1,0,0,1,1.94,0l.355,1.418,1.418.355a1,1,0,0,1,0,1.94l-1.418.355-.355,1.418A1,1,0,0,1,20.5,12ZM16,14a1,1,0,0,0,2,0A1,1,0,0,0,16,14Zm6,4a1,1,0,0,0,2,0A1,1,0,0,0,22,18Z"></path>
                    </svg>
                  </label>
                </div>
                {user ? (
                  <button
                    onClick={handleSignOut}
                    className="btn p-5.5 w-[188px] bg-linear-to-r from-primary to-secondary text-white rounded-lg sm:w-[268px]"
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <Link
                      to={"/login"}
                      className="btn p-5.5 w-[188px] border-2 border-primary text-primary rounded-lg sm:w-[268px]"
                    >
                      Login
                    </Link>
                    <Link
                      to={"/register"}
                      className="btn p-5.5 w-[188px] bg-linear-to-r from-primary to-secondary text-white rounded-lg sm:w-[268px]"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full overflow-hidden bg-base-200">
        <img
          src={theme === "light" ? navimg : navimgblack}
          alt=""
          className={`${
            theme === "light" ? "" : "drop-shadow-white"
          } w-full min-w-7xl mb-1`}
          style={{
            filter:
              theme === "light"
                ? "drop-shadow(3.5px 2.5px 0 rgba(0, 0, 0, 0.25))"
                : "drop-shadow(3.5px 2.5px 0 rgba(255, 255, 255, 0.25))",
          }}
        />
      </div>
    </nav>
  );
};

export default Navbar;
