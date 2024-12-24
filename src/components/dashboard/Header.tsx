import { Bell, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header = ({ onMenuClick = () => {} }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Button variant="ghost" size="icon" onClick={onMenuClick}>
          <Menu className="h-5 w-5" />
        </Button>

        <div className="flex items-center gap-2 ml-4">
          <span className="font-bold text-xl">Agrevanna</span>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="hidden md:flex">
            <Input
              type="search"
              placeholder="Search..."
              className="w-[200px] md:w-[300px]"
            />
          </div>

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-600" />
          </Button>

          <Button variant="ghost" size="icon" className="rounded-full">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=farm-manager"
              alt="avatar"
              className="h-8 w-8 rounded-full"
            />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
