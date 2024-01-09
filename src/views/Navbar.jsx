const Navbar = () => {
    return (

        <div>
            <a href="#" className="absolute p-2">sda</a>
            <div id="sideNav" className="md:block hidden bg-slate-900  w-[20vw] h-screen  rounded-none border-none">

                <div class="p-4 space-y-4">

                    <a href="#" aria-label="dashboard"
                        className="relative px-4 py-3 flex items-center space-x-4 rounded-lg text-white bg-gradient-to-r from-sky-600 to-cyan-400">
                        <i className="fas fa-home text-white"></i>
                        <span className="-mr-1 font-medium">Inicio</span>
                    </a>

                    <a href="#" className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group">
                        <i class="fas fa-wallet"></i>
                        <span>Billetera</span>
                    </a>
                    <a href="#" className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group">
                        <i class="fas fa-exchange-alt"></i>
                        <span>Transacciones</span>
                    </a>
                    <a href="#" className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group">
                        <i class="fas fa-user"></i>
                        <span>Mi cuenta</span>
                    </a>
                    <a href="#" className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group">
                        <i class="fas fa-sign-out-alt"></i>
                        <span>Cerrar sesión</span>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Navbar