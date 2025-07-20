import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, TrendingUp, Users, Zap, Eye, Heart, ShoppingCart } from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';

const Home = () => {
  const featuredCollections = [
    {
      id: 1,
      name: 'Cyber Punks',
      items: 10000,
      floorPrice: '0.5 ETH',
      volume: '1,250 ETH',
      change: '+12.5%',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&h=300&fit=crop',
      verified: true,
    },
    {
      id: 2,
      name: 'Neural Networks',
      items: 5000,
      floorPrice: '0.8 ETH',
      volume: '890 ETH',
      change: '+8.3%',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=300&h=300&fit=crop',
      verified: true,
    },
    {
      id: 3,
      name: 'Digital Cosmos',
      items: 7500,
      floorPrice: '0.3 ETH',
      volume: '456 ETH',
      change: '+15.2%',
      image: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=300&h=300&fit=crop',
      verified: false,
    },
  ];

  const trendingNFTs = [
    {
      id: 1,
      name: 'Cyber Warrior #4521',
      collection: 'Cyber Punks',
      price: '2.5 ETH',
      lastSale: '2.1 ETH',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=400&fit=crop',
      likes: 342,
      views: 1250,
    },
    {
      id: 2,
      name: 'Neural Mind #891',
      collection: 'Neural Networks',
      price: '1.8 ETH',
      lastSale: '1.6 ETH',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=400&fit=crop',
      likes: 189,
      views: 890,
    },
    {
      id: 3,
      name: 'Starfield #3344',
      collection: 'Digital Cosmos',
      price: '0.9 ETH',
      lastSale: '0.7 ETH',
      image: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400&h=400&fit=crop',
      likes: 567,
      views: 2100,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-cyber opacity-20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-neon opacity-20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="mb-6">
            <Badge className="glass-button border-primary/30 text-primary mb-4 px-4 py-2 font-tech">
              Next-Gen NFT Marketplace
            </Badge>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 leading-tight">
            <span className="text-gradient-cyber">Trade the</span>
            <br />
            <span className="text-gradient-neon">Future</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-2xl mx-auto font-body leading-relaxed">
            Discover, collect, and trade extraordinary NFTs in the most advanced 
            marketplace built for the metaverse generation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/marketplace">
              <Button className="btn-cyber text-lg px-8 py-4 h-auto font-tech">
                Explore Marketplace
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/create">
              <Button variant="outline" className="glass-button border-white/30 text-lg px-8 py-4 h-auto font-tech hover:border-primary/50">
                Create NFT
              </Button>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            <div className="glass-card p-4 text-center">
              <div className="text-2xl font-heading font-bold text-gradient-cyber mb-1">2.5M+</div>
              <div className="text-sm text-muted-foreground font-body">NFTs</div>
            </div>
            <div className="glass-card p-4 text-center">
              <div className="text-2xl font-heading font-bold text-gradient-neon mb-1">150K+</div>
              <div className="text-sm text-muted-foreground font-body">Users</div>
            </div>
            <div className="glass-card p-4 text-center">
              <div className="text-2xl font-heading font-bold text-gradient-cyber mb-1">₿1.2K</div>
              <div className="text-sm text-muted-foreground font-body">Volume</div>
            </div>
            <div className="glass-card p-4 text-center">
              <div className="text-2xl font-heading font-bold text-gradient-neon mb-1">50K+</div>
              <div className="text-sm text-muted-foreground font-body">Collections</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Featured Collections Section */}
      <section className="py-20 bg-gradient-dark">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              <span className="text-gradient-cyber">Featured</span>{' '}
              <span className="text-foreground">Collections</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-body">
              Explore the most popular and trending NFT collections from top creators
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCollections.map((collection) => (
              <Card key={collection.id} className="nft-card group">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-xl">
                    <img
                      src={collection.image}
                      alt={collection.name}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {collection.verified && (
                      <Badge className="absolute top-4 right-4 bg-primary/80 backdrop-blur-sm">
                        <Zap className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-heading font-bold text-gradient-cyber">{collection.name}</h3>
                      <span className={`text-sm font-tech ${collection.change.startsWith('+') ? 'text-accent' : 'text-destructive'}`}>
                        {collection.change}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground font-body">Items</div>
                        <div className="font-tech font-medium">{collection.items.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground font-body">Floor Price</div>
                        <div className="font-tech font-medium">{collection.floorPrice}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground font-body">Volume</div>
                        <div className="font-tech font-medium">{collection.volume}</div>
                      </div>
                      <div className="flex items-center">
                        <TrendingUp className="w-4 h-4 text-accent mr-1" />
                        <span className="font-tech text-accent text-xs">Trending</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/collections">
              <Button variant="outline" className="glass-button border-white/30 px-8 py-3 font-tech hover:border-primary/50">
                View All Collections
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trending NFTs Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              <span className="text-foreground">Trending</span>{' '}
              <span className="text-gradient-neon">NFTs</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-body">
              Discover the hottest NFTs that are taking the market by storm
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trendingNFTs.map((nft) => (
              <Card key={nft.id} className="nft-card group">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-xl">
                    <img
                      src={nft.image}
                      alt={nft.name}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex space-x-2">
                        <Button size="sm" className="btn-cyber flex-1">
                          <ShoppingCart className="w-4 h-4 mr-1" />
                          Buy Now
                        </Button>
                        <Button size="sm" variant="outline" className="glass-button border-white/30">
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="mb-3">
                      <h3 className="text-lg font-heading font-bold text-gradient-cyber mb-1">{nft.name}</h3>
                      <p className="text-sm text-muted-foreground font-body">{nft.collection}</p>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-sm text-muted-foreground font-body">Current Price</div>
                        <div className="text-lg font-tech font-bold text-gradient-neon">{nft.price}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground font-body">Last Sale</div>
                        <div className="text-sm font-tech">{nft.lastSale}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Heart className="w-4 h-4" />
                        <span className="font-tech">{nft.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span className="font-tech">{nft.views}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/marketplace">
              <Button className="btn-neon px-8 py-3 font-tech">
                Explore All NFTs
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-cyber relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-white">
              Ready to Join the Revolution?
            </h2>
            <p className="text-xl text-white/80 mb-8 font-body">
              Start your NFT journey today. Create, collect, and trade with confidence 
              on the most advanced marketplace in the metaverse.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/create">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 px-8 py-4 h-auto font-tech">
                  Start Creating
                  <Zap className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/marketplace">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-4 h-auto font-tech">
                  Explore Marketplace
                  <Users className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;