const FormInput = ({
    label,
    name,
    type = 'text',
    value,
    onChange,
    required = false,
    placeholder = '',
    min,
    max,
    disabled = false,
    className = ''
}) => {
    return (
        <div className={className}>
            {label && (
                <label className="block text-gray-300 text-sm font-medium mb-2">
                    {label}{required && ' *'}
                </label>
            )}
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                placeholder={placeholder}
                min={min}
                max={max}
                disabled={disabled}
                className="w-full px-4 py-3 bg-slate-700 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 disabled:opacity-50"
            />
        </div>
    );
};

export default FormInput;
