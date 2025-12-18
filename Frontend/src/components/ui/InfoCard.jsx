const InfoCard = ({ label, value, subValue }) => {
    return (
        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <h3 className="text-sm text-gray-400 mb-2">{label}</h3>
            <p className="text-white font-medium">{value || '-'}</p>
            {subValue && <p className="text-gray-400 text-sm">{subValue}</p>}
        </div>
    );
};

export default InfoCard;
