import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingBag, Star } from "lucide-react";

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

interface ProductCardProps {
  product: Product;
  onAddToCart: (e: React.MouseEvent<HTMLButtonElement>, product: Product) => void;
  isVendor?: boolean;
}

export function ProductCard({
  product,
  onAddToCart,
  isVendor = false,
}: ProductCardProps) {
  return (
    <Card className="group relative flex flex-col overflow-hidden rounded-lg border shadow-sm transition-all hover:shadow-md">
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2">
          <Button variant="ghost" size="icon" className="text-white hover:text-red-500">
            <Heart className="h-5 w-5 fill-current" />
          </Button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent p-4">
          <h3 className="text-lg font-semibold text-white">{product.name}</h3>
          <p className="text-sm text-white/90">{product.description}</p>
        </div>
      </div>
      <CardContent className="flex flex-grow flex-col justify-between p-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xl font-bold text-herbal-primary">
            {product.price.toLocaleString()} FCFA
          </span>
          <Badge variant="secondary">{product.category}</Badge>
        </div>
        <div className="mb-3 flex flex-wrap gap-2">
          {product.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex items-center gap-1 text-sm text-yellow-500">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < product.rating ? 'fill-current text-yellow-500' : 'text-gray-300'}`}
            />
          ))}
          <span className="ml-1 text-herbal-text-secondary">({product.rating.toFixed(1)})</span>
        </div>
        {product.stock > 0 ? (
          <p className="text-sm text-green-600">In Stock ({product.stock} available)</p>
        ) : (
          <p className="text-sm text-red-600">Out of Stock</p>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full bg-herbal-primary hover:bg-herbal-primary/90"
          onClick={(e) => onAddToCart(e, product)}
          disabled={product.stock === 0 || isVendor}
        >
          <ShoppingBag className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
} 