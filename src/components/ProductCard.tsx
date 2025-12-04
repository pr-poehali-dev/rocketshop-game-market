import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  category: 'currency' | 'game';
  image: string;
  discount?: number;
  popular?: boolean;
}

interface ProductCardProps {
  product: Product;
  addToCart: (product: Product) => void;
}

const ProductCard = ({ product, addToCart }: ProductCardProps) => {
  const finalPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price;

  return (
    <Card className="group relative overflow-hidden border-2 border-primary/20 bg-card hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/20">
      {product.popular && (
        <Badge className="absolute top-3 right-3 z-10 neon-border bg-primary text-primary-foreground">
          🔥 ХИТ
        </Badge>
      )}
      {product.discount && (
        <Badge className="absolute top-3 left-3 z-10 neon-border-blue bg-secondary text-secondary-foreground">
          -{product.discount}%
        </Badge>
      )}
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-60" />
      </div>
      <CardHeader>
        <CardTitle className="text-lg neon-text">{product.name}</CardTitle>
        <CardDescription className="flex items-center gap-2">
          {product.discount && (
            <span className="text-muted-foreground line-through text-sm">
              {product.price}₽
            </span>
          )}
          <span className="text-2xl font-bold text-primary">
            {Math.round(finalPrice)}₽
          </span>
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button
          onClick={() => addToCart(product)}
          className="w-full neon-border bg-primary hover:bg-primary/80 text-primary-foreground font-semibold"
        >
          <Icon name="ShoppingCart" className="mr-2" size={18} />
          В корзину
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
