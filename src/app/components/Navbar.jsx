"use client";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";

const Navbar = () => {
  return (
    <nav className="fixed mx-auto border border-[#33353F] top-0 left-0 right-0 z-10 bg-[#121212] bg-opacity-100">
      <div className="flex container lg:py-4 flex-wrap items-center mx-auto px-4 py-2">
        {/* <h1 className="text-white">LOGO</h1> */}
        <Image
          src="/images/hy-vee-logo.png"
          // className="bg-primary-500"
          // style={{ borderRadius: 30 }}
          height={100}
          width={100}
          alt="logo"
        />

        <div className="ml-10 flex">
          <span className="text-lg">Type your Name to predict your </span>

          <h1 className="ml-2 text-lg text-green-500">
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed out once, initially
                "AGE",
                1000, // wait 1s before replacing "Mice" with "Hamsters"
                "GENDER",
                1000,
                "NATIONALITY",
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </h1>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
