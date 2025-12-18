const FormSelect = ({
    label,
    name,
    value,
    onChange,
    options = [],
    required = false,
    placeholder = 'Select...',
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
            <select
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                disabled={disabled}
                className="w-full px-4 py-3 bg-slate-700 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 disabled:opacity-50"
            >
                <option value="">{placeholder}</option>
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default FormSelect;
