import { Link } from 'react-router-dom';
import { Zap, Twitter, Github, MessageCircle, Globe } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    marketplace: [
      { name: 'Explore', href: '/marketplace' },
      { name: 'Collections', href: '/collections' },
      { name: 'Top Creators', href: '/creators' },
      { name: 'Activity', href: '/activity' },
    ],
    create: [
      { name: 'Mint NFT', href: '/create' },
      { name: 'Create Collection', href: '/create-collection' },
      { name: 'Drop Calendar', href: '/drops' },
      { name: 'Creator Tools', href: '/tools' },
    ],
    community: [
      { name: 'About', href: '/about' },
      { name: 'Blog', href: '/blog' },
      { name: 'Help Center', href: '/help' },
      { name: 'Partners', href: '/partners' },
    ],
    legal: [
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'DMCA', href: '/dmca' },
    ],
  };

  const socialLinks = [
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/cybernft' },
    { name: 'Discord', icon: MessageCircle, href: 'https://discord.gg/cybernft' },
    { name: 'Github', icon: Github, href: 'https://github.com/cybernft' },
    { name: 'Website', icon: Globe, href: 'https://cybernft.com' },
  ];

  return (
    <footer className="bg-gradient-dark border-t border-white/10">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4 hover-glow w-fit">
              <div className="w-10 h-10 bg-gradient-cyber rounded-xl flex items-center justify-center glow-primary">
                <Zap className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-heading font-bold text-gradient-cyber">
                CyberNFT
              </span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md font-body">
              The future of NFT trading. Discover, collect, and trade unique digital assets 
              in the most advanced marketplace in the metaverse.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 glass-button rounded-lg flex items-center justify-center hover:border-primary/50 hover:text-primary transition-all duration-300"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link Sections */}
          <div>
            <h3 className="font-heading font-semibold text-foreground mb-4">Marketplace</h3>
            <ul className="space-y-3">
              {footerLinks.marketplace.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 font-body"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-foreground mb-4">Create</h3>
            <ul className="space-y-3">
              {footerLinks.create.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 font-body"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-foreground mb-4">Community</h3>
            <ul className="space-y-3">
              {footerLinks.community.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 font-body"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 font-body"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 py-8 border-t border-b border-white/10">
          <div className="text-center">
            <div className="text-2xl font-heading font-bold text-gradient-cyber mb-1">2.5M+</div>
            <div className="text-muted-foreground font-body">NFTs Traded</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-heading font-bold text-gradient-neon mb-1">150K+</div>
            <div className="text-muted-foreground font-body">Users</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-heading font-bold text-gradient-cyber mb-1">50K+</div>
            <div className="text-muted-foreground font-body">Collections</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-heading font-bold text-gradient-neon mb-1">₿1.2K</div>
            <div className="text-muted-foreground font-body">Volume Traded</div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 text-sm text-muted-foreground">
          <div className="font-body">
            © 2024 CyberNFT. All rights reserved. Built for the future.
          </div>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <span className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-accent rounded-full pulse-glow"></div>
              <span className="font-tech">Network Status: Online</span>
            </span>
            <span className="font-tech">Gas: 21 gwei</span>
          </div>
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-gradient-cyber opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-gradient-neon opacity-10 rounded-full blur-3xl"></div>
      </div>
    </footer>
  );
};

export default Footer;