"use client";
import { event } from "@/lib/fpixel";
import Image from "next/image"
import Link from "next/link"

// Social Icons - defined outside component to avoid recreation on each render
const FacebookIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" className="fill-current">
    <path d="M14 13.5H16.5L17.5 9.5H14V7.5C14 6.47 14 5.5 16 5.5H17.5V2.14C17.174 2.097 15.943 2 14.643 2C11.928 2 10 3.657 10 6.7V9.5H7V13.5H10V22H14V13.5Z" />
  </svg>
)

const TwitterIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.9831 19.25L9.82094 13.3176L4.61058 19.25H2.40625L8.843 11.9233L2.40625 2.75H8.06572L11.9884 8.34127L16.9034 2.75H19.1077L12.9697 9.73737L19.6425 19.25H13.9831ZM16.4378 17.5775H14.9538L5.56249 4.42252H7.04674L10.808 9.6899L11.4584 10.6039L16.4378 17.5775Z"
      fill="currentColor"
    />
  </svg>
)

const LinkedInIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" className="fill-current">
    <path d="M6.93994 5.00002C6.93968 5.53046 6.72871 6.03906 6.35345 6.41394C5.97819 6.78883 5.46938 6.99929 4.93894 6.99902C4.40851 6.99876 3.89991 6.78779 3.52502 6.41253C3.15014 6.03727 2.93968 5.52846 2.93994 4.99802C2.94021 4.46759 3.15117 3.95899 3.52644 3.5841C3.9017 3.20922 4.41051 2.99876 4.94094 2.99902C5.47137 2.99929 5.97998 3.21026 6.35486 3.58552C6.72975 3.96078 6.94021 4.46959 6.93994 5.00002ZM6.99994 8.48002H2.99994V21H6.99994V8.48002ZM13.3199 8.48002H9.33994V21H13.2799V14.43C13.2799 10.77 18.0499 10.43 18.0499 14.43V21H21.9999V13.07C21.9999 6.90002 14.9399 7.13002 13.2799 10.16L13.3199 8.48002Z" />
  </svg>
)

const BehanceIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" className="fill-current">
    <path d="M7.443 5.34961C8.082 5.34961 8.673 5.39961 9.213 5.54761C9.70302 5.63765 10.1708 5.82244 10.59 6.09161C10.984 6.33861 11.279 6.68561 11.475 7.13061C11.672 7.57561 11.77 8.12061 11.77 8.71361C11.77 9.40661 11.623 9.99961 11.279 10.4446C10.984 10.8906 10.492 11.2856 9.902 11.5826C10.738 11.8306 11.377 12.2756 11.77 12.8686C12.164 13.4626 12.41 14.2046 12.41 15.0456C12.41 15.7386 12.262 16.3316 12.016 16.8266C11.77 17.3216 11.377 17.7666 10.934 18.0636C10.4528 18.382 9.92084 18.616 9.361 18.7556C8.771 18.9046 8.181 19.0036 7.591 19.0036H1V5.34961H7.443ZM7.049 10.8896C7.59 10.8896 8.033 10.7416 8.377 10.4946C8.721 10.2476 8.869 9.80161 8.869 9.25761C8.869 8.96061 8.819 8.66361 8.721 8.46661C8.623 8.26861 8.475 8.11961 8.279 7.97161C8.082 7.87261 7.885 7.77361 7.639 7.72461C7.393 7.67461 7.148 7.67461 6.852 7.67461H4V10.8906H7.05L7.049 10.8896ZM7.197 16.7276C7.492 16.7276 7.787 16.6776 8.033 16.6286C8.28138 16.5814 8.51628 16.48 8.721 16.3316C8.92139 16.1868 9.08903 16.0015 9.213 15.7876C9.311 15.5406 9.41 15.2436 9.41 14.8976C9.41 14.2046 9.213 13.7096 8.82 13.3636C8.426 13.0666 7.885 12.9186 7.246 12.9186H4V16.7286H7.197V16.7276ZM16.689 16.6776C17.082 17.0736 17.672 17.2716 18.459 17.2716C19 17.2716 19.492 17.1236 19.885 16.8766C20.279 16.5796 20.525 16.2826 20.623 15.9856H23.033C22.639 17.1726 22.049 18.0136 21.263 18.5576C20.475 19.0526 19.541 19.3496 18.41 19.3496C17.6864 19.3518 16.9688 19.2175 16.295 18.9536C15.6887 18.7262 15.148 18.3524 14.721 17.8656C14.2643 17.4102 13.9267 16.8494 13.738 16.2326C13.492 15.5896 13.393 14.8976 13.393 14.1056C13.393 13.3636 13.492 12.6716 13.738 12.0276C13.9745 11.4077 14.3245 10.8373 14.77 10.3456C15.213 9.90061 15.754 9.50561 16.344 9.25761C17.0007 8.99367 17.7022 8.8592 18.41 8.86161C19.246 8.86161 19.984 9.01061 20.623 9.35661C21.263 9.70261 21.754 10.0986 22.148 10.6926C22.5499 11.2631 22.8494 11.8993 23.033 12.5726C23.131 13.2646 23.18 13.9576 23.131 14.7486H16C16 15.5406 16.295 16.2826 16.689 16.6786V16.6776ZM19.787 11.4836C19.443 11.1376 18.902 10.9396 18.262 10.9396C17.82 10.9396 17.475 11.0386 17.18 11.1866C16.885 11.3356 16.689 11.5336 16.492 11.7316C16.311 11.9229 16.1912 12.1638 16.148 12.4236C16.098 12.6716 16.049 12.8686 16.049 13.0666H20.475C20.377 12.3246 20.131 11.8306 19.787 11.4836ZM15.459 6.28961H20.967V7.62561H15.46V6.28961H15.459Z" />
  </svg>
)

const SendIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" className="fill-current">
    <path d="M3.1175 1.17367L18.5025 9.63533C18.5678 9.6713 18.6223 9.72414 18.6602 9.78834C18.6982 9.85255 18.7182 9.92576 18.7182 10.0003C18.7182 10.0749 18.6982 10.1481 18.6602 10.2123C18.6223 10.2765 18.5678 10.3294 18.5025 10.3653L3.1175 18.827C3.05406 18.8619 2.98262 18.8797 2.91023 18.8785C2.83783 18.8774 2.76698 18.8575 2.70465 18.8206C2.64232 18.7838 2.59066 18.7313 2.55478 18.6684C2.51889 18.6056 2.50001 18.5344 2.5 18.462V1.53867C2.50001 1.46626 2.51889 1.39511 2.55478 1.33222C2.59066 1.26934 2.64232 1.21689 2.70465 1.18005C2.76698 1.1432 2.83783 1.12324 2.91023 1.12212C2.98262 1.121 3.05406 1.13877 3.1175 1.17367ZM4.16667 10.8337V16.3478L15.7083 10.0003L4.16667 3.65283V9.167H8.33333V10.8337H4.16667Z" />
  </svg>
)

function Footer() {
  const companyLinks = [
    { label: "หน้าแรก", href: "/" },
    { label: "สินค้าทั้งหมด", href: "/#features" },
    { label: "โปรโมชั่น", href: "/", badge: "Hot" },
    { label: "วิธีสั่งซื้อ", href: "/" },
  ]

  const supportLinks = [
    { label: "เกี่ยวกับเรา", href: "/#about" },
    { label: "นโยบายคืน/เปลี่ยนสินค้า", href: "/" },
    { label: "บทความ", href: "/blog" },
    { label: "ติดต่อเรา", href: "/#contact" },
  ]

  const onSubmit = async () => {
    // 1. ส่งข้อมูลเข้า Database/API
    // await saveToDatabase(data);

    // 2. ยิง Pixel บอก Facebook ว่าได้ Lead แล้ว
    event("Lead", {
      content_name: "Contact Form",
      value: 100, 
    });
    
    alert("ขอบคุณครับ เราจะติดต่อกลับโดยเร็ว");
  };

  return (
    <footer className="pt-14 sm:pt-20 lg:pt-32.5 overflow-hidden">
      <div className="px-4 md:px-8 lg:px-12 xl:container mx-auto overflow-hidden">
        <div className="-mx-4 flex flex-wrap">
          {/* Logo & Description */}
          <div className="w-full px-4 sm:w-1/2 md:w-5/12 lg:w-3/12 xl:w-3/12">
            <div className="mb-20 max-w-82.5">
              <Link href="/" className="mb-6 inline-block">
                <Image
                  alt="logo"
                  width={215}
                  height={50}
                  className="hidden dark:block"
                  src="/images/logo/logo-dark.svg"
                />
                <Image
                  alt="logo"
                  width={215}
                  height={50}
                  className="dark:hidden"
                  src="/images/logo/logo-light.svg"
                />
              </Link>
              <p className="mb-10 text-base text-slate-600 dark:text-slate-400">
                ร้านอุปกรณ์เสริมสมาร์ทโฟนครบวงจร สินค้าของแท้ 100% รับประกันสินค้าทุกชิ้น
              </p>
              {/* Social Links */}
              <div className="flex items-center space-x-5">
                <Link
                  href="#"
                  aria-label="Facebook"
                  className="text-slate-600 hover:text-blue-500 dark:text-slate-400 dark:hover:text-white transition"
                >
                  <FacebookIcon />
                </Link>
                <Link
                  href="#"
                  aria-label="Twitter"
                  className="text-slate-600 hover:text-blue-500 dark:text-slate-400 dark:hover:text-white transition"
                >
                  <TwitterIcon />
                </Link>
                <Link
                  href="#"
                  aria-label="LinkedIn"
                  className="text-slate-600 hover:text-blue-500 dark:text-slate-400 dark:hover:text-white transition"
                >
                  <LinkedInIcon />
                </Link>
                <Link
                  href="#"
                  aria-label="Behance"
                  className="text-slate-600 hover:text-blue-500 dark:text-slate-400 dark:hover:text-white transition"
                >
                  <BehanceIcon />
                </Link>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div className="w-1/2 px-4 md:w-3/12 lg:w-3/12 xl:w-2/12">
            <div className="mb-20">
              <h3 className="mb-9 text-2xl font-medium text-slate-900 dark:text-white">
                สินค้า
              </h3>
              <ul className="space-y-4">
                {companyLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-base text-slate-600 hover:text-blue-500 dark:text-slate-400 dark:hover:text-white transition"
                    >
                      {link.label}
                      {link.badge && (
                        <span className="ml-4 rounded-md bg-blue-600 px-2 py-1 text-xs text-white">
                          {link.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Support Links */}
          <div className="w-1/2 px-4 md:w-3/12 lg:w-3/12 xl:w-2/12">
            <div className="mb-20">
              <h3 className="mb-9 text-2xl font-medium text-slate-900 dark:text-white">
                ข้อมูล
              </h3>
              <ul className="space-y-4">
                {supportLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-base text-slate-600 hover:text-blue-500 dark:text-slate-400 dark:hover:text-white transition"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Get in Touch */}
          <div className="w-full px-4 sm:w-1/2 md:w-5/12 lg:w-3/12 xl:w-2/12">
            <div className="mb-20">
              <h3 className="mb-9 text-2xl font-medium text-slate-900 dark:text-white">
                ติดต่อเรา
              </h3>
              <div className="space-y-7">
                <div>
                  <p className="text-base text-slate-600 dark:text-slate-400">
                    Line Official
                  </p>
                  <Link
                    href="https://line.me/ti/p/@SmartElecTH"
                    className="text-base text-slate-900 hover:text-blue-600 underline dark:text-white dark:hover:text-blue-400 transition"
                  >
                    @SmartElecTH
                  </Link>
                </div>
                <div>
                  <p className="text-base text-slate-600 dark:text-slate-400">
                    Email Support
                  </p>
                  <Link
                    href="mailto:support@smartelectronic.co.th"
                    className="text-base text-slate-900 hover:text-blue-600 underline dark:text-white dark:hover:text-blue-400 transition"
                  >
                    support@smartelectronic.co.th
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="w-full px-4 sm:w-1/2 md:w-5/12 lg:w-5/12 xl:w-3/12">
            <div className="mb-20">
              <h3 className="text-slate-900 mb-9 text-2xl font-medium dark:text-white">
                รับข่าวสาร
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 text-base">
                สมัครรับข่าวสารโปรโมชั่นและสิทธิพิเศษ
              </p>
              <form className="relative" onSubmit={onSubmit}>
                <input
                  placeholder="Email address"
                  className="text-slate-600 dark:text-slate-300 outline-none focus:border-blue-500 placeholder:text-slate-400 w-full rounded-md border border-slate-200 py-3 pl-5 pr-12 text-base dark:border-slate-700 dark:bg-slate-800"
                  type="email"
                  name="email"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="text-slate-600 dark:text-slate-400 hover:text-blue-500 absolute right-0 top-0 flex h-full w-12 items-center justify-center border-l border-slate-200 dark:border-slate-700 transition"
                >
                  <SendIcon />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-200 dark:border-slate-700">
          <div className="-mx-4 flex flex-wrap py-5 md:py-7">
            {/* Bottom Links */}
            <div className="w-full px-4 md:w-1/2 lg:w-1/2">
              <div className="mb-5 flex items-center justify-center space-x-5 border-b border-slate-200 pb-5 dark:border-slate-700 md:mb-0 md:justify-start md:border-0 md:pb-0">
                <Link
                  href="#"
                  className="text-base text-slate-600 hover:text-blue-500 dark:text-slate-400 dark:hover:text-white transition"
                >
                  ภาษาอังกฤษ
                </Link>
                <Link
                  href="#"
                  className="text-base text-slate-600 hover:text-blue-500 dark:text-slate-400 dark:hover:text-white transition"
                >
                 นโยบายความเป็นส่วนตัว
                </Link>
                <Link
                  href="#"
                  className="text-base text-slate-600 hover:text-blue-500 dark:text-slate-400 dark:hover:text-white transition"
                >
                  ข้อตกลงการให้บริการ
                </Link>
              </div>
            </div>

            {/* Copyright */}
            <div className="w-full px-4 md:w-1/2 lg:w-1/2">
              <div>
                <p className="text-center text-base text-slate-600 dark:text-slate-400 lg:text-right">
                  © 2026 Smart Electronic Thailand. All rights reserved
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer