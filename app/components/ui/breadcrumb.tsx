/* eslint-disable import/no-unresolved */
import { Link } from "@remix-run/react";
import { FaHome, FaCaretRight } from "react-icons/fa/index.js";
import { BreadCrumbProps } from "~/interface/component_interface";

const BreadCrumb = ({ navigation }: BreadCrumbProps) => {
  return (
    <nav
      aria-label="breadcrumb"
      className="w-full p-4 dark:bg-gray-800 dark:text-gray-100">
      <ol className="flex h-8 space-x-2">
        <li className="flex items-center">
          <Link to="/" title="Back to homepage" className="hover:underline">
            <FaHome className="w-5 h-5 pr-1 dark:text-gray-400" />
          </Link>
        </li>
        {navigation.map((item, index) => (
          <li key={index} className="flex items-center space-x-2">
            <FaCaretRight className="w-5 h-4 mt-1 fill-current dark:text-gray-600" />
            <Link
              to={item.link}
              className="flex items-center px-1 capitalize hover:underline  cursor-default">
              {item.name_nav}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BreadCrumb;
