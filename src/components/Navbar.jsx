import logo from '../assets/logo.png'

const Navbar = () => {
  return (
    <div className='pt-4'>
      <nav className='flex items-center gap-2'>
        <img src={logo} alt="" className="w-12 h-12"/>
        <h1 className='text-4xl font-bold '>Tarjamili</h1>
     </nav>
    </div>
  )
}

export default Navbar