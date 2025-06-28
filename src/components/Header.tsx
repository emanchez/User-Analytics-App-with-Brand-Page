import Link from "next/link";

const Header = () => (
  <header className="bg-white shadow">
    <div className="container mx-auto px-4 py-4 flex items-center justify-between">
      <div className="flex items-center">
        <div className="text-2xl font-bold text-gray-800 mr-12">
          TemplateBrand
        </div>
        <nav className="flex space-x-8">
          <Link
            href="/"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Home
          </Link>
          <Link
            href="/blog"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Blog
          </Link>
          <Link
            href="/support"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Support
          </Link>
          <Link
            href="/about"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            About
          </Link>
        </nav>
      </div>
      <Link
        href="/pricing"
        className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
      >
        Get Pricing
      </Link>
    </div>
  </header>
);

export default Header;
