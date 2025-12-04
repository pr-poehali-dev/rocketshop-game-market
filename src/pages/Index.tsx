import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
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

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeTab, setActiveTab] = useState('home');

  const products: Product[] = [
    { id: 1, name: 'Valorant Points', price: 500, category: 'currency', image: 'https://cdn.poehali.dev/projects/ed9aca59-b08a-48f4-a440-fecc0f8e48e8/files/325b93da-4deb-4197-8e4a-a430d263ba7d.jpg', discount: 20, popular: true },
    { id: 2, name: 'CS2 Коины', price: 350, category: 'currency', image: 'https://cdn.poehali.dev/projects/ed9aca59-b08a-48f4-a440-fecc0f8e48e8/files/325b93da-4deb-4197-8e4a-a430d263ba7d.jpg', popular: true },
    { id: 3, name: 'Fortnite V-Bucks', price: 450, category: 'currency', image: 'https://cdn.poehali.dev/projects/ed9aca59-b08a-48f4-a440-fecc0f8e48e8/files/325b93da-4deb-4197-8e4a-a430d263ba7d.jpg' },
    { id: 4, name: 'League of Legends RP', price: 400, category: 'currency', image: 'https://cdn.poehali.dev/projects/ed9aca59-b08a-48f4-a440-fecc0f8e48e8/files/325b93da-4deb-4197-8e4a-a430d263ba7d.jpg', discount: 15 },
    { id: 5, name: 'Cyberpunk 2077', price: 1999, category: 'game', image: 'https://cdn.poehali.dev/projects/ed9aca59-b08a-48f4-a440-fecc0f8e48e8/files/27ef68be-cc9e-40ff-85b0-74b9ad3812b6.jpg', popular: true },
    { id: 6, name: 'Elden Ring', price: 2499, category: 'game', image: 'https://cdn.poehali.dev/projects/ed9aca59-b08a-48f4-a440-fecc0f8e48e8/files/27ef68be-cc9e-40ff-85b0-74b9ad3812b6.jpg', discount: 30 },
    { id: 7, name: 'Red Dead Redemption 2', price: 1499, category: 'game', image: 'https://cdn.poehali.dev/projects/ed9aca59-b08a-48f4-a440-fecc0f8e48e8/files/27ef68be-cc9e-40ff-85b0-74b9ad3812b6.jpg' },
    { id: 8, name: 'GTA V', price: 999, category: 'game', image: 'https://cdn.poehali.dev/projects/ed9aca59-b08a-48f4-a440-fecc0f8e48e8/files/27ef68be-cc9e-40ff-85b0-74b9ad3812b6.jpg', popular: true },
  ];

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    toast.success('Товар добавлен в корзину!', {
      description: product.name,
      icon: '🎮',
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      ).filter(item => item.quantity > 0)
    );
  };

  const totalPrice = cart.reduce((sum, item) => {
    const price = item.discount ? item.price * (1 - item.discount / 100) : item.price;
    return sum + price * item.quantity;
  }, 0);

  const ProductCard = ({ product }: { product: Product }) => {
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

  return (
    <div className="min-h-screen bg-background">
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

      <main className="container mx-auto px-4 py-8">
        <section className="relative mb-16 rounded-2xl overflow-hidden neon-border">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 animate-glow-pulse" />
          <div className="relative z-10 py-20 px-8 text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 neon-text animate-fade-in">
              Игровая валюта и игры
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in">
              Лучшие цены на рынке. Моментальная доставка.
            </p>
            <Button
              size="lg"
              className="neon-border bg-primary hover:bg-primary/80 text-primary-foreground font-bold text-lg px-8 py-6 animate-scale-in"
              onClick={() => {
                toast.success('🚀 Акция активирована!', {
                  description: 'Скидка 20% на первый заказ',
                });
              }}
            >
              <Icon name="Zap" className="mr-2" size={24} />
              Получить скидку 20%
            </Button>
          </div>
        </section>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-12">
          <TabsList className="grid w-full grid-cols-3 mb-8 neon-border">
            <TabsTrigger value="home" className="text-base">
              <Icon name="Home" className="mr-2" size={18} />
              Популярное
            </TabsTrigger>
            <TabsTrigger value="currency" className="text-base">
              <Icon name="Coins" className="mr-2" size={18} />
              Валюта
            </TabsTrigger>
            <TabsTrigger value="games" className="text-base">
              <Icon name="Gamepad2" className="mr-2" size={18} />
              Игры
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
              {products.filter(p => p.popular).map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="currency" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
              {products.filter(p => p.category === 'currency').map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="games" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
              {products.filter(p => p.category === 'game').map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <section className="mt-16 rounded-2xl neon-border glass-effect p-8">
          <h2 className="text-3xl font-bold mb-6 neon-text text-center">
            <Icon name="Bell" className="inline mr-2 animate-glow-pulse" size={32} />
            Push-уведомления
          </h2>
          <p className="text-center text-muted-foreground mb-6">
            Подпишись на уведомления и получай информацию о новых товарах и акциях первым!
          </p>
          <div className="flex justify-center">
            <Button
              size="lg"
              className="neon-border bg-secondary hover:bg-secondary/80 text-secondary-foreground font-bold"
              onClick={() => {
                toast.success('🔔 Уведомления включены!', {
                  description: 'Теперь ты не пропустишь выгодные предложения',
                });
              }}
            >
              <Icon name="BellRing" className="mr-2" size={20} />
              Включить уведомления
            </Button>
          </div>
        </section>
      </main>

      <footer className="mt-20 border-t border-primary/20 glass-effect">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h3 className="font-bold text-lg mb-4 neon-text">RocketShop</h3>
              <p className="text-muted-foreground">
                Лучший магазин игровой валюты и игр
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4 neon-text">Контакты</h3>
              <p className="text-muted-foreground">support@rocketshop.com</p>
              <p className="text-muted-foreground">Telegram: @rocketshop</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4 neon-text">Информация</h3>
              <p className="text-muted-foreground">Отзывы клиентов</p>
              <p className="text-muted-foreground">Способы оплаты</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-primary/20 text-center text-muted-foreground">
            <p>© 2024 RocketShop. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
