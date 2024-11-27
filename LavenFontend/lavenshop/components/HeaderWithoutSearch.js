import Link from "next/link";
import { nunito } from "./ui/fonts";

const HeaderWithoutSearch = ({ pageTitle }) => {
  return (
    <>
      <div className="bg-white py-2 px-52 flex flex-row justify-between">
        <div className="text-primary">
          <div className="flex flex-row justify-center items-center">
            {/* Logo */}
            <Link href="/" className={`${nunito.className}`}>
              <div className="flex flex-col justify-center items-center">
                <div className="flex">
                  <div className="text-5xl font-extrabold">La</div>
                  <div className="text-5xl font-bold text-yellow-500">ven</div>
                </div>
                <div className="text-base font-bold">Tốt & Nhanh</div>
              </div>
            </Link>

            <div className="text-xl w-fit border-l-2 border-blue-600 h-8 ml-6 pl-6 flex items-center">
              {pageTitle}
            </div>
          </div>
        </div>

        <Link href="/" className="flex">
          <div className="flex flex-row text-gray-500 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
              <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
            </svg>
            <div className="text-sm ml-1">Trang chủ</div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default HeaderWithoutSearch;