const Card = ({ children, className = '', title, actions }) => {
    return (
        <div className={`bg-white/5 rounded-xl border border-white/10 ${className}`}>
            {(title || actions) && (
                <div className="flex justify-between items-center p-4 border-b border-white/10">
                    {title && <h3 className="text-lg font-semibold text-white">{title}</h3>}
                    {actions && <div className="flex items-center gap-2">{actions}</div>}
                </div>
            )}
            <div className="p-4">
                {children}
            </div>
        </div>
    );
};

export default Card;
