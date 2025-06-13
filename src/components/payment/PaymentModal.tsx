import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { initiatePayment, pollPaymentStatus } from "@/lib/payment";
import { Loader2 } from "lucide-react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  description: string;
  type: 'SUBSCRIPTION' | 'PRODUCT';
  reference: string;
  onSuccess: () => void;
  payerPhoneNumber: string;
  paymentService: "MTN" | "ORANGE";
  payerEmail: string;
  payerFirstName: string;
}

export function PaymentModal({
  isOpen,
  onClose,
  amount,
  description,
  type,
  reference,
  onSuccess,
  payerPhoneNumber,
  paymentService,
  payerEmail,
  payerFirstName,
}: PaymentModalProps) {
  const [phoneNumber, setPhoneNumber] = useState(payerPhoneNumber);
  const [selectedService, setSelectedService] = useState<"MTN" | "ORANGE">(paymentService);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    setPhoneNumber(payerPhoneNumber);
    setSelectedService(paymentService);
  }, [payerPhoneNumber, paymentService]);

  const validatePhoneNumber = (number: string, service: "MTN" | "ORANGE"): boolean => {
    const cleanNumber = number.replace(/\D/g, '');
    
    if (cleanNumber.length !== 9) {
      return false;
    }

    if (service === "MTN") {
      return /^(67|68|69|65[0-9])/.test(cleanNumber);
    } else {
      return /^(69|65|66|67)/.test(cleanNumber);
    }
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setPhoneNumber(value);
  };

  const getStatusMessage = (status: string): string => {
    switch (status) {
      case "PENDING":
        return "Waiting for payment initiation...";
      case "INITIATED":
        return "Payment initiated. Please check your phone for the payment prompt.";
      case "SUCCESS":
        return "Payment successful!";
      case "FAILED":
        return "Payment failed. Please try again.";
      case "CANCELLED":
        return "Payment was cancelled.";
      default:
        return "Processing payment...";
    }
  };

  const handlePayment = async () => {
    if (!phoneNumber) {
      toast({
        title: "Error",
        description: "Please enter your phone number",
        variant: "destructive",
      });
      return;
    }

    if (!validatePhoneNumber(phoneNumber, selectedService)) {
      toast({
        title: "Invalid Phone Number",
        description: `Please enter a valid ${selectedService} Mobile Money number`,
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setPaymentStatus("PENDING");

    try {
      const response = await initiatePayment({
        amount,
        currency: "XAF",
        service: selectedService,
        payer: phoneNumber,
        description,
        type,
        reference,
        email: payerEmail,
        firstName: payerFirstName,
        subscriptionType: type === "SUBSCRIPTION" ? (reference.startsWith("SUB_") ? reference.split('_')[1] : null) : null,
      });

      if (response.success) {
        await pollPaymentStatus(
          response.transactionId,
          () => {
            setPaymentStatus("SUCCESS");
            toast({
              title: "Success",
              description: "Payment completed successfully",
            });
            onSuccess();
            onClose();
          },
          (error) => {
            setPaymentStatus("FAILED");
            toast({
              title: "Error",
              description: error,
              variant: "destructive",
            });
          },
          (status) => {
            setPaymentStatus(status);
            if (status === "INITIATED") {
              toast({
                title: "Payment Initiated",
                description: "Please check your phone for the payment prompt",
              });
            }
          }
        );
      }
    } catch (error) {
      setPaymentStatus("FAILED");
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Payment failed",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Mobile Money Payment</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label>Select Mobile Money Service</Label>
            <RadioGroup
              value={selectedService}
              onValueChange={(value) => setSelectedService(value as "MTN" | "ORANGE")}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="MTN" id="mtn" />
                <Label htmlFor="mtn">MTN Mobile Money</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ORANGE" id="orange" />
                <Label htmlFor="orange">Orange Money</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder={`Enter your ${selectedService} number`}
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              maxLength={9}
              disabled={isLoading}
            />
            <p className="text-sm text-herbal-text-secondary">
              {selectedService === "MTN" 
                ? "MTN numbers start with 67, 68, 69, 650-659"
                : "Orange numbers start with 69, 65, 66, 67"}
            </p>
          </div>
          <div className="space-y-2">
            <Label>Amount</Label>
            <div className="text-2xl font-bold">{amount.toLocaleString()} XAF</div>
          </div>
          {paymentStatus && (
            <div className="p-3 rounded-md bg-herbal-muted">
              <div className="flex items-center gap-2">
                {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                <p className="text-sm">{getStatusMessage(paymentStatus)}</p>
              </div>
            </div>
          )}
          <Button
            onClick={handlePayment}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Processing...
              </div>
            ) : (
              "Pay Now"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 