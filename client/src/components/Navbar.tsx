import { Link } from "react-router-dom";
import { CreditCard } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="border-b bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary">
            <CreditCard className="h-6 w-6" />
            <span>CreditSea</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link 
              to="/upload" 
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Upload Report
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
