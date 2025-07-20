import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Grid, List, Heart, Eye, ShoppingCart, TrendingUp } from 'lucide-react';

const Marketplace = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const nfts = [
    {
      id: 1,
      name: 'Cyber Guardian #1247',
      collection: 'Cyber Punks',
      price: '2.5 ETH',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=400&fit=crop',
      likes: 342,
      views: 1250,
      verified: true,
      rarity: 'Legendary',
    },
    {
      id: 2,
      name: 'Neural Interface #891',
      collection: 'Neural Networks',
      price: '1.8 ETH',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=400&fit=crop',
      likes: 189,
      views: 890,
      verified: true,
      rarity: 'Epic',
    },
    {
      id: 3,
      name: 'Quantum Portal #3344',
      collection: 'Digital Cosmos',
      price: '0.9 ETH',
      image: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400&h=400&fit=crop',
      likes: 567,
      views: 2100,
      verified: false,
      rarity: 'Rare',
    },
    {
      id: 4,
      name: 'Holographic Dream #555',
      collection: 'Cyber Punks',
      price: '3.2 ETH',
      image: 'https://images.unsplash.com/photo-1439337153520-7082a56a81f4?w=400&h=400&fit=crop',
      likes: 789,
      views: 3200,
      verified: true,
      rarity: 'Mythic',
    },
    // Add more NFTs...
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Mythic': return 'bg-gradient-cyber text-white';
      case 'Legendary': return 'bg-gradient-neon text-black';
      case 'Epic': return 'bg-purple-500 text-white';
      case 'Rare': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dark">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-heading font-bold mb-4">
            <span className="text-gradient-cyber">Marketplace</span>
          </h1>
          <p className="text-xl text-muted-foreground font-body">
            Discover and collect extraordinary NFTs from verified creators
          </p>
        </div>

        {/* Filters & Search */}
        <div className="glass-card p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search NFTs, collections, or creators..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 glass-button border-white/20 focus:border-primary/50 bg-black/20"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4">
              <Select>
                <SelectTrigger className="glass-button border-white/20 w-[140px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="art">Art</SelectItem>
                  <SelectItem value="gaming">Gaming</SelectItem>
                  <SelectItem value="music">Music</SelectItem>
                  <SelectItem value="photography">Photography</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="glass-button border-white/20 w-[140px]">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="low">0 - 1 ETH</SelectItem>
                  <SelectItem value="mid">1 - 10 ETH</SelectItem>
                  <SelectItem value="high">10+ ETH</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="glass-button border-white/20 w-[140px]">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Recently Listed</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                </SelectContent>
              </Select>

              {/* View Mode Toggle */}
              <div className="flex rounded-lg border border-white/20 overflow-hidden">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className={viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className={viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* NFT Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {nfts.map((nft) => (
            <Card key={nft.id} className="nft-card group">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-xl">
                  <img
                    src={nft.image}
                    alt={nft.name}
                    className={`object-cover transition-transform duration-500 group-hover:scale-110 ${
                      viewMode === 'grid' ? 'w-full h-64' : 'w-32 h-32'
                    }`}
                  />
                  
                  {/* Rarity Badge */}
                  <Badge className={`absolute top-3 left-3 ${getRarityColor(nft.rarity)} font-tech`}>
                    {nft.rarity}
                  </Badge>

                  {/* Verification Badge */}
                  {nft.verified && (
                    <Badge className="absolute top-3 right-3 bg-primary/80 backdrop-blur-sm">
                      Verified
                    </Badge>
                  )}

                  {/* Hover Actions */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          className="btn-cyber flex-1"
                          onClick={() => navigate(`/nft/${nft.id}`)}
                        >
                          <ShoppingCart className="w-4 h-4 mr-1" />
                          Buy Now
                        </Button>
                        <Button size="sm" variant="outline" className="glass-button border-white/30">
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                  <div className="mb-3">
                    <h3 
                      className="text-lg font-heading font-bold text-gradient-cyber mb-1 line-clamp-1 cursor-pointer hover:text-primary transition-colors"
                      onClick={() => navigate(`/nft/${nft.id}`)}
                    >
                      {nft.name}
                    </h3>
                    <p className="text-sm text-muted-foreground font-body">{nft.collection}</p>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-sm text-muted-foreground font-body">Price</div>
                      <div className="text-lg font-tech font-bold text-gradient-neon">{nft.price}</div>
                    </div>
                    <div className="text-right">
                      <Button 
                        size="sm" 
                        className="btn-cyber"
                        onClick={() => navigate(`/nft/${nft.id}`)}
                      >
                        Buy Now
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <Heart className="w-4 h-4" />
                        <span className="font-tech">{nft.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span className="font-tech">{nft.views}</span>
                      </div>
                    </div>
                    {viewMode === 'list' && (
                      <div className="flex items-center space-x-1 text-accent">
                        <TrendingUp className="w-4 h-4" />
                        <span className="font-tech text-xs">Trending</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" className="glass-button border-white/30 px-8 py-3 font-tech hover:border-primary/50">
            Load More NFTs
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;