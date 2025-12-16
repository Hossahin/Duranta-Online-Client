
'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Navbar: React.FC = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [showLogout, setShowLogout] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    setEmail(userEmail);
  }, []);

  const handleLogout = async () => {
    await fetch("http://localhost:8000/api/logout", {
      method: "POST",
      credentials: "include",
    });

    localStorage.removeItem("userEmail");
    setEmail(null);
    setShowLogout(false);
  };

  const linkClass = (path: string) =>
    pathname === path
      ? "text-cyan-400"
      : "text-gray-300 hover:text-white transition";

  return (
    <nav className="bg-[#101828]/90 shadow-md py-3 fixed z-50 w-full">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        
        {/* Logo */}
        <div className="flex items-center">
          <Image
            src="/logo.png"
            alt="Duranta Online Logo"
            width={200}
            height={60}
            priority
          />
        </div>

        {/* Navigation Links */}
        <ul className="flex items-center space-x-8 text-sm font-semibold relative">
          <li>
            <Link href="/" className={linkClass("/")}>
              HOME
            </Link>
          </li>

          <li>
            <Link href="/about" className={linkClass("/about")}>
              ABOUT US
            </Link>
          </li>

          <li>
            <Link href="/support" className={linkClass("/support")}>
              SUPPORT
            </Link>
          </li>

          <li>
            <Link href="/packages" className={linkClass("/packages")}>
              PACKAGES
            </Link>
          </li>

          <li>
            <Link href="/contact" className={linkClass("/contact")}>
              CONTACTS
            </Link>
          </li>

          {/* Auth Section */}
          {email ? (
            <>
              <li>
                <Link href="/dashboard" className={linkClass("/dashboard")}>
                  DASHBOARD
                </Link>
              </li>

              <li className="relative text-cyan-400 font-medium cursor-pointer">
                <span onClick={() => setShowLogout(!showLogout)}>
                  {email}
                </span>

                {showLogout && (
                  <div className="absolute top-full left-0 mt-1 bg-[#1f2937] text-white text-xs px-3 py-2 rounded shadow-md w-max">
                    <button
                      onClick={handleLogout}
                      className="hover:bg-red-600 bg-red-500 px-3 py-1 rounded transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/login" className={linkClass("/login")}>
                  LOGIN
                </Link>
              </li>

              <li>
                <Link href="/register" className={linkClass("/register")}>
                  REGISTER
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
