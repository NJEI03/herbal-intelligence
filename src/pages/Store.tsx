
import { useState } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: 'teas' | 'tinctures' | 'supplements' | 'topicals';
  tags: string[];
  stock: number;
}

const Store = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  
  const products: Product[] = [
    {
      id: "moringa-tea",
      name: "Organic Moringa Tea",
      description: "High-antioxidant herbal tea made from pure moringa leaves. Supports immune function and provides natural energy.",
      price: 12.99,
      imageUrl: "/placeholder.svg",
      category: 'teas',
      tags: ['immune support', 'energy', 'detox'],
      stock: 15
    },
    {
      id: "hibiscus-blend",
      name: "Hibiscus Flower Blend",
      description: "A refreshing blend of hibiscus flowers with natural citrus notes. Supports cardiovascular health and provides vitamin C.",
      price: 9.99,
      imageUrl: "/placeholder.svg",
      category: 'teas',
      tags: ['heart health', 'antioxidant', 'cooling'],
      stock: 22
    },
    {
      id: "ashwagandha-tincture",
      name: "Ashwagandha Root Tincture",
      description: "Potent adaptogenic tincture that helps the body manage stress and supports overall wellbeing.",
      price: 24.99,
      imageUrl: "/placeholder.svg",
      category: 'tinctures',
      tags: ['stress relief', 'adaptogen', 'sleep support'],
      stock: 8
    },
    {
      id: "elderberry-tincture",
      name: "Elderberry Immune Tincture",
      description: "Traditional immune-supporting tincture made from organic elderberries. Perfect for seasonal wellness.",
      price: 19.99,
      imageUrl: "/placeholder.svg",
      category: 'tinctures',
      tags: ['immune support', 'antiviral', 'seasonal'],
      stock: 12
    },
    {
      id: "turmeric-caps",
      name: "Turmeric & Black Pepper Capsules",
      description: "High-potency turmeric capsules with black pepper for enhanced absorption. Supports joint health and reduces inflammation.",
      price: 29.99,
      imageUrl: "/placeholder.svg",
      category: 'supplements',
      tags: ['anti-inflammatory', 'joint health', 'daily'],
      stock: 30
    },
    {
      id: "mushroom-complex",
      name: "5 Mushroom Immune Complex",
      description: "Powerful blend of reishi, chaga, lion's mane, turkey tail, and maitake mushrooms for comprehensive immune support.",
      price: 34.99,
      imageUrl: "/placeholder.svg",
      category: 'supplements',
      tags: ['immune support', 'adaptogen', 'vitality'],
      stock: 18
    },
    {
      id: "aloe-balm",
      name: "Aloe & Calendula Healing Balm",
      description: "Soothing balm for minor skin irritations, burns, and cuts. Made with organic aloe vera and calendula.",
      price: 15.99,
      imageUrl: "/placeholder.svg",
      category: 'topicals',
      tags: ['skin healing', 'burns', 'cuts'],
      stock: 25
    },
    {
      id: "arnica-salve",
      name: "Arnica Muscle Relief Salve",
      description: "Fast-acting relief for sore muscles and bruises. Made with arnica montana and essential oils.",
      price: 18.99,
      imageUrl: "/placeholder.svg",
      category: 'topicals',
      tags: ['pain relief', 'muscle soreness', 'bruises'],
      stock: 14
    }
  ];

  const addToCart = (product: Product) => {
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <Container className="py-16">
      <SectionHeading 
        title="Herbal Store" 
        subtitle="Ethically sourced herbal products for natural wellness"
        centered
      />
      
      <div className="mt-10 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="w-full">
            <Input
              placeholder="Search products by name or benefits..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-5 mb-6">
            <TabsTrigger value="all">All Products</TabsTrigger>
            <TabsTrigger value="teas">Herbal Teas</TabsTrigger>
            <TabsTrigger value="tinctures">Tinctures</TabsTrigger>
            <TabsTrigger value="supplements">Supplements</TabsTrigger>
            <TabsTrigger value="topicals">Topicals</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </TabsContent>
          
          <TabsContent value="teas" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.filter(product => product.category === 'teas').map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </TabsContent>
          
          <TabsContent value="tinctures" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.filter(product => product.category === 'tinctures').map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </TabsContent>
          
          <TabsContent value="supplements" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.filter(product => product.category === 'supplements').map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </TabsContent>
          
          <TabsContent value="topicals" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.filter(product => product.category === 'topicals').map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </TabsContent>
        </Tabs>
        
        <div className="mt-16 bg-herbal-muted p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-3">Our Quality Promise</h3>
          <p className="text-herbal-text-secondary mb-4">
            Every product in our store is carefully selected to meet our high standards for quality, sustainability, 
            and efficacy. We partner with ethical growers and producers to ensure that our herbal products are:
          </p>
          <ul className="grid md:grid-cols-3 gap-4">
            <li className="flex items-start gap-3">
              <div className="mt-1 w-5 h-5 rounded-full bg-herbal-primary flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-white">
                  <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-sm">Organic or wildcrafted whenever possible</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-1 w-5 h-5 rounded-full bg-herbal-primary flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-white">
                  <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-sm">Tested for purity and potency</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-1 w-5 h-5 rounded-full bg-herbal-primary flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-white">
                  <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-sm">Sustainably harvested and produced</span>
            </li>
          </ul>
        </div>
      </div>
    </Container>
  );
};

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-square bg-gray-100">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">{product.name}</CardTitle>
          <div className="text-lg font-semibold text-herbal-primary">${product.price}</div>
        </div>
        <CardDescription>
          <div className="flex flex-wrap gap-2 mt-2">
            {product.tags.map(tag => (
              <Badge key={tag} variant="outline" className="text-xs bg-herbal-muted/50">
                {tag}
              </Badge>
            ))}
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-herbal-text-secondary">{product.description}</p>
        <div className="mt-2 text-sm text-herbal-primary">
          {product.stock > 10 ? (
            <span>In Stock</span>
          ) : product.stock > 0 ? (
            <span>Low Stock - Only {product.stock} left</span>
          ) : (
            <span className="text-red-500">Out of Stock</span>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={() => onAddToCart(product)} 
          className="w-full"
          disabled={product.stock === 0}
        >
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Store;
