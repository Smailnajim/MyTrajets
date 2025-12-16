import { Link } from 'react-router-dom';

const PageHeader = ({ title, breadcrumbs = [], actions }) => {
    return (
        <nav className="bg-white/5 backdrop-blur-lg border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center gap-4">
                        <Link to="/" className="text-2xl font-bold text-white">MyTrajets</Link>
                        {breadcrumbs.length > 0 && (
                            <span className="text-gray-400">
                                {breadcrumbs.map((crumb, idx) => (
                                    <span key={idx}>
                                        / {crumb.to ? (
                                            <Link to={crumb.to} className="hover:text-white">{crumb.label}</Link>
                                        ) : (
                                            crumb.label
                                        )}
                                    </span>
                                ))}
                            </span>
                        )}
                    </div>
                    {actions && <div className="flex items-center gap-4">{actions}</div>}
                </div>
            </div>
        </nav>
    );
};

export default PageHeader;
