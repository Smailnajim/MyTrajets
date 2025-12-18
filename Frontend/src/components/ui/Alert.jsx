const Alert = ({ type = 'error', message, onClose }) => {
    if (!message) return null;

    const styles = {
        error: 'bg-red-500/20 border-red-500/50 text-red-200',
        success: 'bg-green-500/20 border-green-500/50 text-green-200',
        warning: 'bg-orange-500/20 border-orange-500/50 text-orange-200',
        info: 'bg-blue-500/20 border-blue-500/50 text-blue-200'
    };

    return (
        <div className={`${styles[type]} border px-4 py-3 rounded-lg mb-4 flex justify-between items-center`}>
            <span>{message}</span>
            {onClose && (
                <button onClick={onClose} className="text-current opacity-70 hover:opacity-100 ml-4">
                    ✕
                </button>
            )}
        </div>
    );
};

export default Alert;
