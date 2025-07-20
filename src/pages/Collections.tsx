import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, TrendingUp, Users, Zap, ExternalLink } from 'lucide-react';

const Collections = () => {
  const collections = [
    {
      id: 1,
      name: 'Cyber Punks',
      description: 'Futuristic digital warriors living in the blockchain metaverse',
      floorPrice: '0.5 ETH',
      volume: '1,250 ETH',
      items: 10000,
      owners: 3420,
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=400&fit=crop',
      bannerImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=300&fit=crop',
      verified: true,
      trending: true,
      change: '+12.5%',
    },
    {
      id: 2,
      name: 'Neural Networks',
      description: 'AI-generated art exploring the boundaries of consciousness',
      floorPrice: '0.8 ETH',
      volume: '890 ETH',
      items: 5000,
      owners: 1820,
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=400&fit=crop',
      bannerImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=300&fit=crop',
      verified: true,
      trending: false,
      change: '+8.3%',
    },
    {
      id: 3,
      name: 'Digital Cosmos',
      description: 'Explore the infinite beauty of digital space and celestial bodies',
      floorPrice: '0.3 ETH',
      volume: '456 ETH',
      items: 7500,
      owners: 2105,
      image: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400&h=400&fit=crop',
      bannerImage: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=800&h=300&fit=crop',
      verified: false,
      trending: true,
      change: '+15.2%',
    },
    {
      id: 4,
      name: 'Holographic Dreams',
      description: 'Immersive holographic experiences from virtual reality',
      floorPrice: '1.2 ETH',
      volume: '2,100 ETH',
      items: 3333,
      owners: 987,
      image: 'https://images.unsplash.com/photo-1439337153520-7082a56a81f4?w=400&h=400&fit=crop',
      bannerImage: 'https://images.unsplash.com/photo-1439337153520-7082a56a81f4?w=800&h=300&fit=crop',
      verified: true,
      trending: false,
      change: '+5.7%',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-dark">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-heading font-bold mb-4">
            <span className="text-gradient-cyber">Collections</span>
          </h1>
          <p className="text-xl text-muted-foreground font-body">
            Discover amazing collections from top creators and verified artists
          </p>
        </div>

        {/* Search & Stats */}
        <div className="glass-card p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search collections..."
                className="pl-10 glass-button border-white/20 focus:border-primary/50 bg-black/20"
              />
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-lg font-heading font-bold text-gradient-cyber">{collections.length}</div>
                <div className="text-sm text-muted-foreground font-body">Collections</div>
              </div>
              <div>
                <div className="text-lg font-heading font-bold text-gradient-neon">4.8K ETH</div>
                <div className="text-sm text-muted-foreground font-body">Total Volume</div>
              </div>
              <div>
                <div className="text-lg font-heading font-bold text-gradient-cyber">8.3K</div>
                <div className="text-sm text-muted-foreground font-body">Owners</div>
              </div>
            </div>
          </div>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {collections.map((collection) => (
            <Card key={collection.id} className="nft-card group overflow-hidden">
              <CardContent className="p-0">
                {/* Banner Image */}
                <div className="relative h-32 overflow-hidden">
                  <img
                    src={collection.bannerImage}
                    alt={`${collection.name} banner`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  
                  {/* Badges */}
                  <div className="absolute top-4 right-4 flex space-x-2">
                    {collection.verified && (
                      <Badge className="bg-primary/80 backdrop-blur-sm">
                        <Zap className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                    {collection.trending && (
                      <Badge className="bg-accent/80 backdrop-blur-sm">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Trending
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Collection Avatar */}
                <div className="relative px-6 pt-6">
                  <div className="absolute -top-8 left-6">
                    <img
                      src={collection.image}
                      alt={collection.name}
                      className="w-16 h-16 rounded-xl border-4 border-card object-cover"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="px-6 pt-8 pb-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-heading font-bold text-gradient-cyber mb-2">
                        {collection.name}
                      </h3>
                      <p className="text-sm text-muted-foreground font-body line-clamp-2">
                        {collection.description}
                      </p>
                    </div>
                    <span className={`text-sm font-tech ml-4 ${
                      collection.change.startsWith('+') ? 'text-accent' : 'text-destructive'
                    }`}>
                      {collection.change}
                    </span>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <div className="text-xs text-muted-foreground font-body">Floor Price</div>
                      <div className="text-lg font-tech font-bold text-gradient-neon">{collection.floorPrice}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground font-body">Volume</div>
                      <div className="text-lg font-tech font-bold">{collection.volume}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground font-body">Items</div>
                      <div className="text-sm font-tech">{collection.items.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground font-body">Owners</div>
                      <div className="text-sm font-tech flex items-center">
                        <Users className="w-3 h-3 mr-1" />
                        {collection.owners.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button className="w-full btn-cyber group">
                    View Collection
                    <ExternalLink className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" className="glass-button border-white/30 px-8 py-3 font-tech hover:border-primary/50">
            Load More Collections
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Collections;