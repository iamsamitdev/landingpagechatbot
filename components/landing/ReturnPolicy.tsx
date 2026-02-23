"use client"

function ReturnPolicy() {
  const policies = [
    {
      title: "เปลี่ยน/คืนสินค้าได้ภายใน 7 วัน",
      description: "หากสินค้ามีปัญหาจากการผลิต หรือทางร้านส่งผิดรุ่น สามารถขอเปลี่ยน/คืนได้ภายใน 7 วัน นับจากวันที่ได้รับของ",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
    },
    {
      title: "ถ่ายคลิปตอนแกะกล่อง",
      description: "รบกวนลูกค้าถ่ายคลิปตอนแกะกล่องไว้เป็นหลักฐานเพื่อความรวดเร็วในการดำเนินการ",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: "สั่งผิดรุ่น เปลี่ยนได้",
      description: "กรณีลูกค้าสั่งผิดรุ่น สามารถส่งกลับมาเปลี่ยนได้ภายใน 7 วัน สินค้าต้องยังไม่แกะซีล/กล่องไม่บุบสลาย โดยลูกค้าจะเป็นผู้รับผิดชอบค่าจัดส่งไป-กลับ",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
    },
  ]

  const warranties = [
    { product: "สายชาร์จ / หัวชาร์จ", duration: "1 ปี" },
    { product: "Power Bank", duration: "1 ปี" },
    { product: "Gadget อื่นๆ", duration: "6 เดือน" },
  ]

  return (
    <section id="return-policy" className="pt-14 sm:pt-20 lg:pt-32.5 overflow-hidden">
      <div className="px-4 md:px-8 lg:px-12 xl:container mx-auto overflow-hidden">
        {/* Section Header */}
        <div className="relative mx-auto mb-12 max-w-155 pt-6 text-center md:mb-20 lg:pt-16">
          <span className="absolute left-1/2 top-0 -translate-x-1/2 text-[60px] font-bold leading-none text-slate-100 dark:text-slate-600/50 select-none lg:text-[80px]">
            POLICY
          </span>
          <h2 className="relative mb-5 text-3xl font-semibold text-slate-900 dark:text-white sm:text-4xl md:text-[50px] md:leading-15">
            นโยบายเปลี่ยน/คืนสินค้า
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400">
            เรามุ่งมั่นให้บริการหลังการขายที่ดีที่สุด เพื่อความพึงพอใจสูงสุดของลูกค้า
          </p>
        </div>

        {/* Policy Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {policies.map((policy, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700"
            >
              <div className="w-16 h-16 mb-6 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center text-orange-600 dark:text-orange-400">
                {policy.icon}
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                {policy.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {policy.description}
              </p>
            </div>
          ))}
        </div>

        {/* Warranty Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 lg:p-12 text-white">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-1/2">
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                🛡️ รับประกันสินค้าทุกชิ้น
              </h3>
              <p className="text-white/80 mb-6">
                สินค้าแต่ละประเภทมีประกันต่างกัน เงื่อนไข: ต้องเก็บกล่องสินค้าและใบเสร็จไว้เพื่อใช้ในการเคลม
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>เคลมง่าย ไม่ยุ่งยาก</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>เปลี่ยนใหม่หากเกิดจากการผลิต</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>ประสานงานรวดเร็ว</span>
                </li>
              </ul>
            </div>
            
            {/* Warranty Table */}
            <div className="lg:w-1/2">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-white/10">
                      <th className="px-6 py-4 text-left font-semibold">ประเภทสินค้า</th>
                      <th className="px-6 py-4 text-center font-semibold">ระยะเวลาประกัน</th>
                    </tr>
                  </thead>
                  <tbody>
                    {warranties.map((item, index) => (
                      <tr key={index} className="border-t border-white/10">
                        <td className="px-6 py-4">{item.product}</td>
                        <td className="px-6 py-4 text-center">
                          <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                            {item.duration}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Note */}
        <div className="mt-12 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 flex-shrink-0 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                🔒 ความเป็นส่วนตัวปลอดภัย 100% (PDPA)
              </h4>
              <p className="text-slate-600 dark:text-slate-400">
                ร้านใช้ระบบรักษาความปลอดภัยมาตรฐาน SSL และข้อมูลของท่านจะถูกใช้เพื่อการจัดส่งและแจ้งข่าวสารสิทธิพิเศษของร้าน Smart Electronic Thailand เท่านั้น ไม่มีการส่งต่อให้บุคคลภายนอกตามกฎหมาย PDPA
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ReturnPolicy
