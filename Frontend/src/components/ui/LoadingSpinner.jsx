const LoadingSpinner = ({ fullScreen = false }) => {
    const spinner = (
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
    );

    if (fullScreen) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                {spinner}
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center h-64">
            {spinner}
        </div>
    );
};

export default LoadingSpinner;
