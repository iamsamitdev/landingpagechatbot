import ContactForm from '@/components/landing/ContactForm'

export default function ContactPage() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='text-2xl my-4'>ขอข้อมูลเพิ่มเติม</h1>
      <ContactForm />
    </div>
  )
}
