export default function PaymentError() {
    return (
      <div className="h-full py-6">
        <div className="bg-phuoc mx-32">
          <div className="bg-white p-6 md:mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="true"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="text-white w-16 h-16 mx-auto my-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="red"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
  
            <div className="text-center">
              <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                Thanh toán thất bại!
              </h3>
              <p className="text-gray-600 my-2">
                Có lỗi xảy ra. Vui lòng thanh toán lại hóa đơn của bạn.
              </p>
              <p> Chúc bạn một ngày tốt lành! </p>
              <div className="py-10 text-center">
                <a
                  href="/"
                  className="px-12 bg-primary hover:bg-blue-500 text-white font-semibold rounded-md py-3"
                >
                  QUAY LẠI
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }