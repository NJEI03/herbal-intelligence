import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { Trash2 } from "lucide-react";
import { initiatePayment } from '@/lib/payment';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from "@/contexts/CartContext"; // Import useCart
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  category?: 'teas' | 'tinctures' | 'supplements' | 'topicals'; // Added for consistency with Product interface
  tags?: string[]; // Added for consistency with Product interface
  stock?: number; // Added for consistency with Product interface
  rating?: number; // Added for consistency with Product interface
  vendorId?: string; // Added for consistency with Product interface
}

export default function Cart() {
  const [loading, setLoading] = useState(true); // Keep loading for initial data fetch if needed
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth(); // Get user from AuthContext
  const { cartItems, updateQuantity, removeFromCart } = useCart(); // Destructure from useCart

  // State for payer details
  const [payerPhoneNumber, setPayerPhoneNumber] = useState<string>('');
  const [paymentService, setPaymentService] = useState<string>('MTN'); // Default to MTN or allow user selection

  useEffect(() => {
    // Cart items are now managed by useCart, so we don't need dummy data or separate cartItems state here
    setLoading(false); // Set loading to false once cart context is available
  }, []);

  const handleRemoveItem = (id: string) => {
    removeFromCart(id); // Use removeFromCart from useCart
    toast({
      title: "Item Removed",
      description: "Product has been removed from your cart.",
    });
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    updateQuantity(id, Math.max(1, newQuantity)); // Use updateQuantity from useCart
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleCheckout = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to proceed with payment.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    if (!payerPhoneNumber) {
      toast({
        title: "Missing Information",
        description: "Please enter your phone number for payment.",
        variant: "destructive",
      });
      return;
    }

    // Clean and validate phone number
    let cleanNumber = payerPhoneNumber.replace(/\D/g, "");
    if (cleanNumber.startsWith("237")) {
      cleanNumber = cleanNumber.substring(3);
    }
    cleanNumber = cleanNumber.slice(0, 9);

    if (cleanNumber.length !== 9) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 9-digit phone number",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Processing Payment",
      description: "Initiating payment...",
    });

    try {
      const totalAmount = parseFloat(calculateTotal());
      const orderId = `ORDER_${Date.now()}`;

      const response = await initiatePayment({
        amount: totalAmount,
        currency: "XAF",
        service: paymentService,
        payer: cleanNumber,
        description: `Order ${orderId}`,
        type: "PRODUCT",
        reference: orderId,
        email: user.email || '',
        firstName: user.displayName || '',
        products: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          amount: item.price * item.quantity,
          category: 'Product',
        })),
      });

      if (response.success) {
        toast({
          title: "Payment Successful",
          description: "Your order has been placed!",
        });
        cartItems.forEach(item => removeFromCart(item.id)); // Clear cart after successful payment
        navigate("/order-confirmation");
      } else {
        toast({
          title: "Payment Failed",
          description: response.message || "An error occurred during payment. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error("Error during checkout:", error);
      toast({
        title: "Payment Error",
        description: error.message || "Failed to process payment. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="container py-12 text-center">Loading cart...</div>;
  }

  return (
    <div className="container py-12">
      <h2 className="text-3xl font-bold text-herbal-text-primary mb-8">Your Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <Card className="text-center py-8">
          <CardContent>
            <p className="text-herbal-text-secondary">Your cart is empty.</p>
            <Button className="mt-4 bg-herbal-primary hover:bg-herbal-primary/90" onClick={() => navigate("/store")}>
              Continue Shopping
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id}>
                <CardContent className="flex items-center p-4">
                  {item.imageUrl && (
                    <img 
                      src={item.imageUrl} 
                      alt={item.name} 
                      className="w-24 h-24 object-cover rounded-md mr-4"
                    />
                  )}
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-herbal-text-primary">{item.name}</h3>
                    <p className="text-herbal-text-secondary">{(item.price).toFixed(2)} XAF</p>
                    <div className="flex items-center mt-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </Button>
                      <Input 
                        type="number" 
                        value={item.quantity} 
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                        className="w-16 text-center mx-2"
                        min="1"
                      />
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="lg:col-span-1 h-fit">
            <CardHeader>
              <CardTitle className="text-xl">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <p className="text-herbal-text-secondary">Subtotal ({cartItems.length} items)</p>
                <p className="font-semibold">{calculateTotal()} XAF</p>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg\">
                <p>Total</p>
                <p>{calculateTotal()} XAF</p>
              </div>
              
              {/* Payer Details Input */}
              <div className="space-y-2 mt-4">
                <label htmlFor="phoneNumber" className="text-sm font-medium">Payer Phone Number</label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  value={payerPhoneNumber}
                  onChange={(e) => setPayerPhoneNumber(e.target.value)}
                  placeholder="e.g., 670000000"
                  required
                />
              </div>

              {/* Payment Service Selection (Optional, if you have multiple) */}
              <div className="space-y-2">
                <label htmlFor="paymentService" className="text-sm font-medium">Payment Service</label>
                <select
                  id="paymentService"
                  value={paymentService}
                  onChange={(e) => setPaymentService(e.target.value as "MTN" | "ORANGE")}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="MTN">MTN Mobile Money</option>
                  <option value="ORANGE">Orange Money</option>
                </select>
              </div>

              <Button 
                className="w-full bg-herbal-primary hover:bg-herbal-primary/90"
                onClick={() => window.location.href = 'https://pay.mesomb.com/l/xSqE9t2qB0Vv1b9zibis'}
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
} 