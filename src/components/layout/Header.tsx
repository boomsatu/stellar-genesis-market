import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Search, Menu, Zap, Rocket, Globe } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Explore', href: '/marketplace', icon: Globe },
    { name: 'Collections', href: '/collections', icon: Zap },
    { name: 'Create', href: '/create', icon: Rocket },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 glass-card border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover-glow">
            <div className="w-8 h-8 bg-gradient-cyber rounded-lg flex items-center justify-center glow-primary">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-heading font-bold text-gradient-cyber">
              CyberNFT
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                    isActive(item.href)
                      ? 'bg-primary/20 text-primary glow-primary'
                      : 'text-foreground/80 hover:text-primary hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-tech font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center space-x-4 flex-1 max-w-md mx-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search collections, NFTs, users..."
                className="pl-10 glass-button border-white/20 focus:border-primary/50 bg-black/20"
              />
            </div>
          </div>

          {/* Wallet Connect & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <ConnectButton.Custom>
                {({
                  account,
                  chain,
                  openAccountModal,
                  openChainModal,
                  openConnectModal,
                  authenticationStatus,
                  mounted,
                }) => {
                  const ready = mounted && authenticationStatus !== 'loading';
                  const connected =
                    ready &&
                    account &&
                    chain &&
                    (!authenticationStatus || authenticationStatus === 'authenticated');

                  return (
                    <div
                      {...(!ready && {
                        'aria-hidden': true,
                        style: {
                          opacity: 0,
                          pointerEvents: 'none',
                          userSelect: 'none',
                        },
                      })}
                    >
                      {(() => {
                        if (!connected) {
                          return (
                            <Button
                              onClick={openConnectModal}
                              className="btn-cyber font-tech"
                            >
                              Connect Wallet
                            </Button>
                          );
                        }

                        if (chain.unsupported) {
                          return (
                            <Button
                              onClick={openChainModal}
                              variant="destructive"
                              className="font-tech"
                            >
                              Wrong network
                            </Button>
                          );
                        }

                        return (
                          <div className="flex items-center space-x-2">
                            <Button
                              onClick={openChainModal}
                              variant="outline"
                              size="sm"
                              className="glass-button border-white/20 hover:border-primary/50"
                            >
                              {chain.hasIcon && (
                                <div
                                  style={{
                                    background: chain.iconBackground,
                                    width: 16,
                                    height: 16,
                                    borderRadius: 999,
                                    overflow: 'hidden',
                                    marginRight: 8,
                                  }}
                                >
                                  {chain.iconUrl && (
                                    <img
                                      alt={chain.name ?? 'Chain icon'}
                                      src={chain.iconUrl}
                                      style={{ width: 16, height: 16 }}
                                    />
                                  )}
                                </div>
                              )}
                              {chain.name}
                            </Button>

                            <Button
                              onClick={openAccountModal}
                              className="glass-button border-white/20 hover:border-primary/50 font-tech"
                              variant="outline"
                            >
                              {account.displayName}
                              {account.displayBalance
                                ? ` (${account.displayBalance})`
                                : ''}
                            </Button>
                          </div>
                        );
                      })()}
                    </div>
                  );
                }}
              </ConnectButton.Custom>
            </div>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="glass-card border-white/10">
                <div className="flex flex-col h-full">
                  <div className="flex items-center space-x-2 mb-8">
                    <div className="w-8 h-8 bg-gradient-cyber rounded-lg flex items-center justify-center glow-primary">
                      <Zap className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <span className="text-xl font-heading font-bold text-gradient-cyber">
                      CyberNFT
                    </span>
                  </div>

                  {/* Mobile Search */}
                  <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search..."
                      className="pl-10 glass-button border-white/20"
                    />
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="flex-1 space-y-4">
                    {navigation.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                            isActive(item.href)
                              ? 'bg-primary/20 text-primary glow-primary'
                              : 'text-foreground/80 hover:text-primary hover:bg-white/5'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="font-tech font-medium">{item.name}</span>
                        </Link>
                      );
                    })}
                  </nav>

                  {/* Mobile Wallet Connect */}
                  <div className="pt-6 border-t border-white/10">
                    <ConnectButton />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;