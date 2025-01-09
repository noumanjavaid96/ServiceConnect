import React from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Menu } from "lucide-react";

interface NavbarProps {
  isAuthenticated?: boolean;
  onSignIn?: () => void;
  onSignUp?: () => void;
  userName?: string;
}

const Navbar = ({
  isAuthenticated = false,
  onSignIn = () => console.log("Sign in clicked"),
  onSignUp = () => console.log("Sign up clicked"),
  userName = "Guest User",
}: NavbarProps) => {
  return (
    <header className="w-full h-20 bg-white border-b border-gray-200 fixed top-0 left-0 z-50">
      <div className="container mx-auto h-full px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <a href="/" className="text-2xl font-bold text-primary">
            ServiceConnect
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                  href="/how-it-works"
                >
                  How it Works
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                  href="/services"
                >
                  Services
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                  href="/about"
                >
                  About
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Authentication Buttons */}
          {!isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onSignIn}>
                Sign In
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button onClick={onSignUp}>Sign Up</Button>
                </DialogTrigger>
                <DialogContent>
                  <div className="p-6">
                    <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
                    <p className="text-gray-600">
                      Sign up form will be rendered here
                    </p>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">Welcome, {userName}</span>
              <Button variant="outline">Dashboard</Button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
