const Button = ({
    children,
    type = 'button',
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    onClick,
    className = ''
}) => {
    const variants = {
        primary: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700',
        secondary: 'bg-white/5 hover:bg-white/10 text-gray-300',
        danger: 'bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30',
        success: 'bg-green-500/20 hover:bg-green-500/30 text-green-300 border border-green-500/30',
        warning: 'bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 border border-orange-500/30'
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2',
        lg: 'px-6 py-3'
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={`${variants[variant]} ${sizes[size]} rounded-lg font-medium transition disabled:opacity-50 ${className}`}
        >
            {loading ? 'Loading...' : children}
        </button>
    );
};

export default Button;
