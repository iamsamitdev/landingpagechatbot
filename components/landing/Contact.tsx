"use client"

import Link from "next/link"

function Contact() {
  const contactChannels = [
    {
      name: "Line Official",
      value: "@SmartElecTH",
      link: "https://line.me/ti/p/@SmartElecTH",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
        </svg>
      ),
      bgColor: "bg-green-500",
      hoverColor: "hover:bg-green-600",
    },
    {
      name: "Facebook Page",
      value: "Smart Electronic Thailand",
      link: "https://facebook.com/SmartElectronicThailand",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14 13.5H16.5L17.5 9.5H14V7.5C14 6.47 14 5.5 16 5.5H17.5V2.14C17.174 2.097 15.943 2 14.643 2C11.928 2 10 3.657 10 6.7V9.5H7V13.5H10V22H14V13.5Z" />
        </svg>
      ),
      bgColor: "bg-blue-600",
      hoverColor: "hover:bg-blue-700",
    },
    {
      name: "Email",
      value: "support@smartelectronic.co.th",
      link: "mailto:support@smartelectronic.co.th",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      bgColor: "bg-red-500",
      hoverColor: "hover:bg-red-600",
    },
  ]

  return (
    <section id="contact" className="pt-14 sm:pt-20 lg:pt-32.5 pb-20 overflow-hidden">
      <div className="px-4 md:px-8 lg:px-12 xl:container mx-auto overflow-hidden">
        {/* Section Header */}
        <div className="relative mx-auto mb-12 max-w-155 pt-6 text-center md:mb-20 lg:pt-16">
          <span className="absolute left-1/2 top-0 -translate-x-1/2 text-[60px] font-bold leading-none text-slate-100 dark:text-slate-800/50 select-none lg:text-[80px]">
            CONTACT
          </span>
          <h2 className="relative mb-5 text-3xl font-semibold text-slate-900 dark:text-white sm:text-4xl md:text-[50px] md:leading-15">
            ติดต่อเรา
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400">
            สอบถามข้อมูลหรือแจ้งปัญหาได้ทุกช่องทาง แอดมินพร้อมให้บริการ
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Channels */}
          <div>
            <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-8">
              📞 ช่องทางการติดต่อ
            </h3>
            <div className="space-y-6">
              {contactChannels.map((channel, index) => (
                <Link
                  key={index}
                  href={channel.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-slate-200 dark:border-slate-700 group"
                >
                  <div className={`w-14 h-14 ${channel.bgColor} ${channel.hoverColor} rounded-full flex items-center justify-center text-white transition-colors`}>
                    {channel.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {channel.name}
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400">
                      {channel.value}
                    </p>
                  </div>
                  <svg className="w-5 h-5 ml-auto text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>

            {/* Business Hours */}
            <div className="mt-8 p-6 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
              <div className="flex items-center gap-3 mb-3">
                <svg className="w-6 h-6 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h4 className="font-semibold text-amber-800 dark:text-amber-300">เวลาทำการ</h4>
              </div>
              <p className="text-amber-700 dark:text-amber-400">
                <strong>วันจันทร์ – เสาร์:</strong> 09.00 – 18.00 น.
              </p>
              <p className="text-amber-600 dark:text-amber-500 text-sm mt-2">
                * นอกเวลาทำการอาจตอบกลับล่าช้าเล็กน้อย แต่เราจะรีบตอบกลับให้เร็วที่สุดในวันรุ่งขึ้น
              </p>
            </div>
          </div>

          {/* Store Location */}
          <div>
            <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-8">
              📍 ที่ตั้งหน้าร้าน
            </h3>
            
            {/* Map Placeholder */}
            <div className="bg-slate-200 dark:bg-slate-700 rounded-xl h-64 mb-6 overflow-hidden relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3873.8554045674413!2d100.60933!3d13.8190!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDQ5JzA4LjQiTiAxMDDCsDM2JzMzLjYiRQ!5e0!3m2!1sth!2sth!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale hover:grayscale-0 transition-all duration-300"
              ></iframe>
            </div>

            {/* Address Card */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 shrink-0 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                    Smart Electronic Thailand
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    เลขที่ 5 ซอยลาดพร้าววังหิน 68<br />
                    ถนนลาดพร้าววังหิน แขวงลาดพร้าว<br />
                    เขตลาดพร้าว กรุงเทพมหานคร 10230
                  </p>
                  <p className="text-sm text-blue-600 dark:text-blue-400 mt-3">
                    * กรุณานัดหมายล่วงหน้าก่อนมารับสินค้า
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wholesale Info */}
        <div className="mt-16 bg-linear-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 lg:p-12 text-white text-center">
          <h3 className="text-2xl lg:text-3xl font-bold mb-4">
            🏢 สนใจซื้อจำนวนมาก / ราคาส่ง?
          </h3>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            หากต้องการสั่งซื้อจำนวนมากสำหรับองค์กร หรือนำไปจำหน่ายต่อ ติดต่อฝ่ายขายโดยตรงเพื่อรับราคาพิเศษ
          </p>
          <Link
            href="https://line.me/ti/p/@SmartElecTH"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-purple-600 font-semibold px-8 py-4 rounded-full hover:bg-purple-50 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
            </svg>
            ติดต่อขอราคาส่ง
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Contact
