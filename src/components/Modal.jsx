const Modal = ({name,children,handle,title,close}) => {
const handleclose = () =>{
    close(false)
}
    return(
        <div>
            {name == true ?
                <div>
                    <div onClick={handleclose} className="w-full h-full bg-slate-300 absolute top-0 left-0 opacity-10"></div>
                    <div className="bg-white border-2 border-black w-80  p-4 left-[20%] md:left-[40%] top-[10%] rounded-xl absolute ">
                         <h2 className="text-center font-bold text-lg text-teal-600">{title}</h2>
                        <button onClick={handleclose} className="absolute top-4 right-6 rounded-full border-2 border-red-600 w-8 h-8">X</button>
                        {children}
                    </div>
                </div>
                : ''}
        </div>
    )
}

export default Modal