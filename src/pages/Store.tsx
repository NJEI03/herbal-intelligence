import { useState, useEffect } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { getProducts, getUserProducts, testFirestoreConnection } from "@/lib/firestore";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext"; // Import useCart
import { ShoppingBag, Search, Heart, Star } from "lucide-react";
import { Link } from "react-router-dom"; // Import Link
import { ProductCard } from "@/components/product/ProductCard"; // Import ProductCard

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: 'teas' | 'tinctures' | 'supplements' | 'topicals';
  tags: string[];
  stock: number;
  rating: number;
  vendorId?: string;
}

export default function Store() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [userProducts, setUserProducts] = useState<Product[]>([]); // State for vendor's products
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();
  const { user, loading } = useAuth();
  const { addToCart } = useCart(); // Destructure addToCart from useCart

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
        setFilteredProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast({
          title: "Error",
          description: "Failed to load products. Please try again later.",
          variant: "destructive",
        });
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchUserSpecificProducts = async () => {
      if (user) {
        try {
          const productsData = await getUserProducts(user.uid);
          setUserProducts(productsData);
        } catch (error) {
          console.error("Error fetching user products:", error);
          toast({
            title: "Error",
            description: "Failed to load your products.",
            variant: "destructive",
          });
        }
      }
    };
    fetchUserSpecificProducts();
  }, [user]);

  useEffect(() => {
    let currentProducts = products;

    if (activeTab !== 'all') {
      currentProducts = currentProducts.filter(product => product.category === activeTab);
    }

    if (searchQuery) {
      currentProducts = currentProducts.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredProducts(currentProducts);
  }, [activeTab, searchQuery, products]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Filtering is already handled by useEffect based on searchQuery state
  };

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>, product: Product) => {
    e.stopPropagation();
    addToCart(product); // Use the addToCart function from useCart
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <Container>
      <SectionHeading 
        title="Our Herbal Store"
        subtitle="Ethically sourced herbal products for natural wellness"
        centered
      />
      
      <div className="mt-10 max-w-5xl mx-auto">
        <div className="flex justify-end mb-4 gap-2">
          <Button asChild>
            <Link to="/cart">View Cart</Link>
          </Button>
        </div>

        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="w-full">
            <Input
              placeholder="Search products by name or benefits..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <Button type="submit" className="md:w-auto">
            <Search className="mr-2 h-4 w-4" /> Search
          </Button>
        </form>
        
        {/* User Products Section - Only show if user has products */}
        {user && userProducts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Your Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={(e) => handleAddToCart(e, product)}
                  isVendor={true}
                />
              ))}
          </div>
        </div>
        )}
        
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
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={(e) => handleAddToCart(e, product)}
              />
            ))}
          </TabsContent>
          
          <TabsContent value="teas" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.filter(p => p.category === 'teas').map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={(e) => handleAddToCart(e, product)}
              />
            ))}
          </TabsContent>
          
          <TabsContent value="tinctures" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.filter(p => p.category === 'tinctures').map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={(e) => handleAddToCart(e, product)}
              />
            ))}
          </TabsContent>
          
          <TabsContent value="supplements" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.filter(p => p.category === 'supplements').map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={(e) => handleAddToCart(e, product)}
              />
            ))}
          </TabsContent>
          
          <TabsContent value="topicals" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.filter(p => p.category === 'topicals').map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={(e) => handleAddToCart(e, product)}
              />
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
