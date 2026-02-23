"use client"

function HowToOrder() {
  const orderSteps = [
    {
      step: 1,
      title: "เลือกสินค้า",
      description: "เลือกสินค้าที่ชอบ ใส่ตะกร้า",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      step: 2,
      title: "Login รับส่วนลด",
      description: "อย่าลืม Login เพื่อรับส่วนลด 10% ทันที",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      step: 3,
      title: "ชำระเงิน",
      description: "โอนเงิน, QR พร้อมเพย์, บัตรเครดิต/เดบิต หรือ COD",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
    },
    {
      step: 4,
      title: "รอรับของที่บ้าน",
      description: "กรุงเทพฯ 1-2 วัน, ต่างจังหวัด 2-3 วัน",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
      ),
    },
  ]

  const paymentMethods = [
    { name: "โอนเงินผ่านธนาคาร", description: "Mobile Banking ทุกธนาคาร" },
    { name: "QR Code พร้อมเพย์", description: "ยอดเข้าทันที" },
    { name: "บัตรเครดิต/เดบิต", description: "ไม่มีค่าธรรมเนียมเพิ่ม" },
    { name: "เก็บเงินปลายทาง (COD)", description: "ค่าธรรมเนียม 3%" },
  ]

  return (
    <section id="how-to-order" className="pt-14 sm:pt-20 lg:pt-32.5 overflow-hidden">
      <div className="px-4 md:px-8 lg:px-12 xl:container mx-auto overflow-hidden">
        {/* Section Header */}
        <div className="relative mx-auto mb-12 max-w-155 pt-6 text-center md:mb-20 lg:pt-16">
          <span className="absolute left-1/2 top-0 -translate-x-1/2 text-[60px] font-bold leading-none text-slate-100 dark:text-slate-600/50 select-none lg:text-[80px]">
            ORDER
          </span>
          <h2 className="relative mb-5 text-3xl font-semibold text-slate-900 dark:text-white sm:text-4xl md:text-[50px] md:leading-15">
            คู่มือการสั่งซื้อสินค้า
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400">
            สั่งซื้อง่ายๆ เพียง 4 ขั้นตอน พร้อมรับส่วนลดสมาชิก 10% ทันที
          </p>
        </div>

        {/* Order Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {orderSteps.map((item) => (
            <div key={item.step} className="relative group">
              <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700 text-center">
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {item.step}
                </div>
                {/* Icon */}
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  {item.description}
                </p>
              </div>
              {/* Arrow (except last item) */}
              {item.step < 4 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-slate-300 dark:text-slate-600">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.293 5.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L16.586 13H4a1 1 0 110-2h12.586l-4.293-4.293a1 1 0 010-1.414z" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Payment Methods */}
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-8 lg:p-12">
          <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-8 text-center">
            💳 ช่องทางการชำระเงิน
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {paymentMethods.map((method, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow border border-slate-200 dark:border-slate-700"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  <h4 className="font-semibold text-slate-900 dark:text-white">
                    {method.name}
                  </h4>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 ml-6">
                  {method.description}
                </p>
              </div>
            ))}
          </div>
          
          {/* Note */}
          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-800 dark:text-blue-300 text-center">
              💡 <strong>หมายเหตุ:</strong> ราคาสินค้าหน้าเว็บเป็นราคาสุทธิที่รวมภาษีมูลค่าเพิ่ม (VAT 7%) เรียบร้อยแล้ว ไม่มีบวกเพิ่มตอนจ่ายเงิน
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowToOrder
