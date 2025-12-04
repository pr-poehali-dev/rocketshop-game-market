import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
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

interface CartItem extends Product {
  quantity: number;
}

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cart: CartItem[];
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, delta: number) => void;
  totalPrice: number;
}

const Header = ({ activeTab, setActiveTab, cart, removeFromCart, updateQuantity, totalPrice }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 glass-effect border-b border-primary/20">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="https://cdn.poehali.dev/projects/ed9aca59-b08a-48f4-a440-fecc0f8e48e8/files/accafdb8-ff24-4710-9327-071cd91b3803.jpg"
            alt="RocketShop"
            className="w-12 h-12 rounded-lg neon-border"
          />
          <h1 className="text-2xl md:text-3xl font-bold neon-text">RocketShop</h1>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Button
            variant={activeTab === 'home' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('home')}
            className="text-foreground hover:text-primary"
          >
            <Icon name="Home" className="mr-2" size={18} />
            Главная
          </Button>
          <Button
            variant={activeTab === 'currency' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('currency')}
            className="text-foreground hover:text-primary"
          >
            <Icon name="Coins" className="mr-2" size={18} />
            Валюта
          </Button>
          <Button
            variant={activeTab === 'games' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('games')}
            className="text-foreground hover:text-primary"
          >
            <Icon name="Gamepad2" className="mr-2" size={18} />
            Игры
          </Button>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button className="relative neon-border bg-primary hover:bg-primary/80">
              <Icon name="ShoppingCart" size={20} />
              {cart.length > 0 && (
                <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center bg-secondary text-secondary-foreground">
                  {cart.length}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full sm:max-w-lg glass-effect border-primary/20">
            <SheetHeader>
              <SheetTitle className="text-2xl neon-text">Корзина</SheetTitle>
              <SheetDescription>
                {cart.length === 0 ? 'Корзина пуста' : `Товаров: ${cart.length}`}
              </SheetDescription>
            </SheetHeader>
            <div className="mt-8 space-y-4">
              {cart.map(item => {
                const finalPrice = item.discount
                  ? item.price * (1 - item.discount / 100)
                  : item.price;
                return (
                  <Card key={item.id} className="border-primary/20">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-lg object-cover neon-border"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">{item.name}</h3>
                          <p className="text-primary font-bold">{Math.round(finalPrice)}₽</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, -1)}
                            className="h-8 w-8 p-0"
                          >
                            <Icon name="Minus" size={16} />
                          </Button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Icon name="Plus" size={16} />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => removeFromCart(item.id)}
                            className="h-8 w-8 p-0"
                          >
                            <Icon name="Trash2" size={16} />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            {cart.length > 0 && (
              <div className="mt-8 space-y-4">
                <div className="flex items-center justify-between text-xl font-bold">
                  <span>Итого:</span>
                  <span className="neon-text">{Math.round(totalPrice)}₽</span>
                </div>
                <Button className="w-full neon-border bg-primary hover:bg-primary/80 text-primary-foreground font-bold py-6 text-lg">
                  Оформить заказ
                </Button>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
