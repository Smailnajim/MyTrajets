const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
    if (!isOpen) return null;

    const sizes = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl'
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className={`bg-slate-800 rounded-xl border border-white/10 p-6 w-full ${sizes[size]} mx-4`}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-white">{title}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white text-xl">✕</button>
                </div>
                {children}
            </div>
        </div>
    );
};

export default Modal;
