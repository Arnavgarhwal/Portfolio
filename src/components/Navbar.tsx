import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex flex-col md:flex-row items-center justify-between px-6 py-4 md:px-24 bg-black/40 backdrop-blur-md border-b border-white/5">
      <Link href="/" className="text-xl font-bold tracking-tighter text-white mb-4 md:mb-0">
        Arnav<span className="text-neutral-500">.</span>
      </Link>
      <ul className="flex items-center gap-6 text-sm font-medium text-neutral-400">
        <li>
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
        </li>
        <li>
          <Link href="#about" className="hover:text-white transition-colors">
            About
          </Link>
        </li>
        <li>
          <Link href="#projects" className="hover:text-white transition-colors">
            Projects
          </Link>
        </li>
        <li>
          <Link href="#contact" className="hover:text-white transition-colors">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}
