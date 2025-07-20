import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Heart, Eye, Share2, ExternalLink, Clock, Zap, TrendingUp, 
  ShoppingCart, Bookmark, MoreHorizontal, ChevronLeft, Copy 
} from 'lucide-react';

const NFTDetail = () => {
  const { id } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);

  const nft = {
    id: 1,
    name: 'Cyber Guardian #1247',
    description: 'A legendary digital warrior from the blockchain metaverse. This unique NFT represents the pinnacle of cyberpunk artistry, featuring advanced neural interfaces and quantum-powered armor systems. Each Guardian possesses unique traits that determine their power level and rarity in the digital realm.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=800&fit=crop',
    price: '2.5 ETH',
    usdPrice: '$4,250',
    collection: 'Cyber Punks',
    creator: {
      name: 'CyberCreator',
      address: '0x742d35cc6ce4c5e848ff5e2b1e5c0f8e5d8f1234',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
      verified: true,
    },
    owner: {
      name: 'DigitalCollector',
      address: '0x9876543210abcdef1234567890abcdef12345678',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    },
    stats: {
      views: 12450,
      likes: 892,
      favorites: 234,
    },
    properties: [
      { trait: 'Background', value: 'Neon City', rarity: '12%' },
      { trait: 'Armor', value: 'Quantum Shield', rarity: '5%' },
      { trait: 'Weapon', value: 'Plasma Sword', rarity: '8%' },
      { trait: 'Eyes', value: 'Cyber Blue', rarity: '15%' },
      { trait: 'Accessory', value: 'Neural Interface', rarity: '3%' },
    ],
    history: [
      { type: 'Sale', price: '2.5 ETH', from: '0x1234...', to: '0x5678...', time: '2 hours ago' },
      { type: 'Transfer', from: '0x9abc...', to: '0x1234...', time: '2 days ago' },
      { type: 'Mint', to: '0x9abc...', time: '1 week ago' },
    ],
  };

  const relatedNFTs = [
    { id: 2, name: 'Cyber Guardian #1248', price: '2.8 ETH', image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=300&h=300&fit=crop' },
    { id: 3, name: 'Cyber Guardian #1249', price: '2.2 ETH', image: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=300&h=300&fit=crop' },
    { id: 4, name: 'Cyber Guardian #1250', price: '3.1 ETH', image: 'https://images.unsplash.com/photo-1439337153520-7082a56a81f4?w=300&h=300&fit=crop' },
  ];

  return (
    <div className="min-h-screen bg-gradient-dark">
      <div className="container mx-auto px-4 py-6 lg:py-8">
        {/* Back Button */}
        <Link to="/marketplace" className="inline-flex items-center text-muted-foreground hover:text-primary mb-6 font-tech">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Marketplace
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="relative group">
              <img
                src={nft.image}
                alt={nft.name}
                className="w-full aspect-square object-cover rounded-2xl"
              />
              <div className="absolute top-4 right-4 flex space-x-2">
                <Button
                  size="icon"
                  variant="outline"
                  className="glass-button border-white/30 hover:border-white/50"
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
                <Button size="icon" variant="outline" className="glass-button border-white/30 hover:border-white/50">
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="outline" className="glass-button border-white/30 hover:border-white/50">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            {/* Collection & Name */}
            <div>
              <Link to="/collections" className="text-primary hover:text-primary/80 font-tech text-sm mb-2 block">
                {nft.collection}
              </Link>
              <h1 className="text-3xl lg:text-4xl font-heading font-bold text-gradient-cyber mb-4">
                {nft.name}
              </h1>
              
              {/* Stats */}
              <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center space-x-1">
                  <Eye className="w-4 h-4" />
                  <span className="font-tech">{nft.stats.views.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Heart className="w-4 h-4" />
                  <span className="font-tech">{nft.stats.likes}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Bookmark className="w-4 h-4" />
                  <span className="font-tech">{nft.stats.favorites}</span>
                </div>
              </div>
            </div>

            {/* Price & Buy Section */}
            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="text-sm text-muted-foreground font-body mb-1">Current Price</div>
                    <div className="text-3xl font-heading font-bold text-gradient-cyber mb-1">{nft.price}</div>
                    <div className="text-lg text-muted-foreground font-tech">{nft.usdPrice}</div>
                  </div>
                  <Badge className="bg-accent/20 text-accent border-accent/30">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +12% 24h
                  </Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Button className="btn-cyber w-full" size="lg">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Buy Now
                  </Button>
                  <Button variant="outline" className="glass-button border-white/30 w-full" size="lg">
                    <Zap className="w-5 h-5 mr-2" />
                    Make Offer
                  </Button>
                </div>

                <div className="mt-4 p-4 bg-accent/10 rounded-lg border border-accent/20">
                  <div className="flex items-center text-sm">
                    <Clock className="w-4 h-4 mr-2 text-accent" />
                    <span className="text-accent font-tech">Sale ends in 2 days 14:32:16</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Creator & Owner */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="glass-card">
                <CardContent className="p-4">
                  <div className="text-sm text-muted-foreground font-body mb-2">Creator</div>
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={nft.creator.avatar} />
                      <AvatarFallback>CC</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-1">
                        <span className="font-tech font-medium text-gradient-cyber truncate">{nft.creator.name}</span>
                        {nft.creator.verified && <Zap className="w-3 h-3 text-primary flex-shrink-0" />}
                      </div>
                      <div className="text-xs text-muted-foreground font-tech flex items-center">
                        {nft.creator.address.slice(0, 6)}...{nft.creator.address.slice(-4)}
                        <Copy className="w-3 h-3 ml-1 cursor-pointer hover:text-foreground" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardContent className="p-4">
                  <div className="text-sm text-muted-foreground font-body mb-2">Owner</div>
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={nft.owner.avatar} />
                      <AvatarFallback>DC</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="font-tech font-medium text-gradient-neon truncate">{nft.owner.name}</div>
                      <div className="text-xs text-muted-foreground font-tech flex items-center">
                        {nft.owner.address.slice(0, 6)}...{nft.owner.address.slice(-4)}
                        <Copy className="w-3 h-3 ml-1 cursor-pointer hover:text-foreground" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Description */}
            <Card className="glass-card">
              <CardContent className="p-6">
                <h3 className="font-heading font-bold text-gradient-neon mb-3">Description</h3>
                <p className={`text-foreground/80 font-body leading-relaxed ${
                  showFullDesc ? '' : 'line-clamp-3'
                }`}>
                  {nft.description}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFullDesc(!showFullDesc)}
                  className="mt-2 p-0 h-auto text-primary hover:text-primary/80"
                >
                  {showFullDesc ? 'Show Less' : 'Show More'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-12">
          <Tabs defaultValue="properties" className="w-full">
            <TabsList className="glass-card grid w-full grid-cols-3 lg:w-auto lg:grid-cols-3">
              <TabsTrigger value="properties" className="font-tech">Properties</TabsTrigger>
              <TabsTrigger value="history" className="font-tech">History</TabsTrigger>
              <TabsTrigger value="offers" className="font-tech">Offers</TabsTrigger>
            </TabsList>

            <TabsContent value="properties" className="mt-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {nft.properties.map((prop, index) => (
                  <Card key={index} className="glass-card text-center">
                    <CardContent className="p-4">
                      <div className="text-sm text-primary font-tech mb-1">{prop.trait}</div>
                      <div className="font-heading font-bold text-gradient-cyber mb-2">{prop.value}</div>
                      <div className="text-xs text-muted-foreground">{prop.rarity} have this trait</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="history" className="mt-6">
              <Card className="glass-card">
                <CardContent className="p-0">
                  {nft.history.map((event, index) => (
                    <div key={index}>
                      <div className="p-4 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Badge className={
                            event.type === 'Sale' ? 'bg-accent/20 text-accent' :
                            event.type === 'Transfer' ? 'bg-primary/20 text-primary' :
                            'bg-secondary/20 text-secondary-foreground'
                          }>
                            {event.type}
                          </Badge>
                          <div>
                            {event.price && (
                              <div className="font-tech font-bold text-gradient-neon">{event.price}</div>
                            )}
                            <div className="text-sm text-muted-foreground">
                              {event.from && `${event.from.slice(0, 6)}...${event.from.slice(-4)} → `}
                              {event.to.slice(0, 6)}...{event.to.slice(-4)}
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground font-tech">{event.time}</div>
                      </div>
                      {index < nft.history.length - 1 && <Separator />}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="offers" className="mt-6">
              <Card className="glass-card">
                <CardContent className="p-8 text-center">
                  <div className="text-muted-foreground font-body">No offers yet</div>
                  <Button className="btn-cyber mt-4">
                    Make First Offer
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related NFTs */}
        <div className="mt-12">
          <h2 className="text-2xl font-heading font-bold text-gradient-cyber mb-6">More from this collection</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedNFTs.map((related) => (
              <Card key={related.id} className="nft-card group">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-xl">
                    <img
                      src={related.image}
                      alt={related.name}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-heading font-bold text-gradient-cyber mb-2 truncate">{related.name}</h3>
                    <div className="text-lg font-tech font-bold text-gradient-neon">{related.price}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTDetail;