import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import Icon from '@/components/ui/icon';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import ContactSections from '@/components/ContactSections';

interface Product {
  id: number;
  name: string;
  price: number;
  category: 'currency' | 'game' | 'subscription' | 'other';
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
  const [sortBy, setSortBy] = useState<string>('popular');
  const [priceRange, setPriceRange] = useState<number[]>([0, 5000]);
  const [telegramUsername, setTelegramUsername] = useState('');
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);

  const products: Product[] = [
    { id: 1, name: 'Robux (гейм пасс) 100', price: 119, category: 'currency', image: 'https://cdn.poehali.dev/projects/ed9aca59-b08a-48f4-a440-fecc0f8e48e8/files/325b93da-4deb-4197-8e4a-a430d263ba7d.jpg', popular: true },
    { id: 2, name: 'Robux (гейм пасс) 500', price: 439, category: 'currency', image: 'https://cdn.poehali.dev/projects/ed9aca59-b08a-48f4-a440-fecc0f8e48e8/files/325b93da-4deb-4197-8e4a-a430d263ba7d.jpg', popular: true },
    { id: 3, name: 'Robux (гейм пасс) 1000', price: 819, category: 'currency', image: 'https://cdn.poehali.dev/projects/ed9aca59-b08a-48f4-a440-fecc0f8e48e8/files/325b93da-4deb-4197-8e4a-a430d263ba7d.jpg' },
    { id: 4, name: 'Robux пак 100 (моментально)', price: 159, category: 'currency', image: 'https://cdn.poehali.dev/projects/ed9aca59-b08a-48f4-a440-fecc0f8e48e8/files/325b93da-4deb-4197-8e4a-a430d263ba7d.jpg' },
    { id: 5, name: 'Robux пак 800 (моментально)', price: 1000, category: 'currency', image: 'https://cdn.poehali.dev/projects/ed9aca59-b08a-48f4-a440-fecc0f8e48e8/files/325b93da-4deb-4197-8e4a-a430d263ba7d.jpg', popular: true },
    { id: 6, name: 'Brawl Pass (Особая скидка)', price: 359, category: 'currency', image: 'https://cdn.poehali.dev/projects/ed9aca59-b08a-48f4-a440-fecc0f8e48e8/files/325b93da-4deb-4197-8e4a-a430d263ba7d.jpg', discount: 45 },
    { id: 7, name: 'Brawl Pass (Обычный)', price: 639, category: 'currency', image: 'https://cdn.poehali.dev/projects/ed9aca59-b08a-48f4-a440-fecc0f8e48e8/files/325b93da-4deb-4197-8e4a-a430d263ba7d.jpg' },
    { id: 8, name: 'Brawl Pass Plus', price: 999, category: 'currency', image: 'https://cdn.poehali.dev/projects/ed9aca59-b08a-48f4-a440-fecc0f8e48e8/files/325b93da-4deb-4197-8e4a-a430d263ba7d.jpg' },
    { id: 9, name: 'Apple iTunes RU 1000₽', price: 1349, category: 'other', image: 'https://cdn.poehali.dev/projects/ed9aca59-b08a-48f4-a440-fecc0f8e48e8/files/325b93da-4deb-4197-8e4a-a430d263ba7d.jpg' },
    { id: 10, name: 'Apple iTunes RU 2000₽', price: 2599, category: 'other', image: 'https://cdn.poehali.dev/projects/ed9aca59-b08a-48f4-a440-fecc0f8e48e8/files/325b93da-4deb-4197-8e4a-a430d263ba7d.jpg' },
    { id: 11, name: 'Apple iTunes US 6$', price: 649, category: 'other', image: 'https://cdn.poehali.dev/projects/ed9aca59-b08a-48f4-a440-fecc0f8e48e8/files/325b93da-4deb-4197-8e4a-a430d263ba7d.jpg' },
    { id: 12, name: 'Spotify Premium 1 месяц', price: 259, category: 'subscription', image: 'https://cdn.poehali.dev/projects/ed9aca59-b08a-48f4-a440-fecc0f8e48e8/files/325b93da-4deb-4197-8e4a-a430d263ba7d.jpg', popular: true },
    { id: 13, name: 'Spotify Premium 12 месяцев', price: 2149, category: 'subscription', image: 'https://cdn.poehali.dev/projects/ed9aca59-b08a-48f4-a440-fecc0f8e48e8/files/325b93da-4deb-4197-8e4a-a430d263ba7d.jpg' },
    { id: 14, name: 'PUBG Mobile 60UC', price: 99, category: 'currency', image: 'https://cdn.poehali.dev/projects/ed9aca59-b08a-48f4-a440-fecc0f8e48e8/files/325b93da-4deb-4197-8e4a-a430d263ba7d.jpg' },
    { id: 15, name: 'PUBG Mobile 985UC', price: 1239, category: 'currency', image: 'https://cdn.poehali.dev/projects/ed9aca59-b08a-48f4-a440-fecc0f8e48e8/files/325b93da-4deb-4197-8e4a-a430d263ba7d.jpg' },
    { id: 16, name: 'PUBG Prime 1 месяц', price: 139, category: 'subscription', image: 'https://cdn.poehali.dev/projects/ed9aca59-b08a-48f4-a440-fecc0f8e48e8/files/325b93da-4deb-4197-8e4a-a430d263ba7d.jpg' },
    { id: 17, name: 'Standoff 2 - 100 gold', price: 129, category: 'currency', image: 'https://cdn.poehali.dev/projects/ed9aca59-b08a-48f4-a440-fecc0f8e48e8/files/325b93da-4deb-4197-8e4a-a430d263ba7d.jpg' },
    { id: 18, name: 'Standoff 2 - 3000 gold', price: 2199, category: 'currency', image: 'https://cdn.poehali.dev/projects/ed9aca59-b08a-48f4-a440-fecc0f8e48e8/files/325b93da-4deb-4197-8e4a-a430d263ba7d.jpg' },
    { id: 19, name: 'Valorant 240VP (RU)', price: 299, category: 'currency', image: 'https://cdn.poehali.dev/projects/ed9aca59-b08a-48f4-a440-fecc0f8e48e8/files/325b93da-4deb-4197-8e4a-a430d263ba7d.jpg', popular: true },
    { id: 20, name: 'Valorant 2050VP (RU)', price: 1949, category: 'currency', image: 'https://cdn.poehali.dev/projects/ed9aca59-b08a-48f4-a440-fecc0f8e48e8/files/325b93da-4deb-4197-8e4a-a430d263ba7d.jpg' },
    { id: 21, name: 'Valorant 1000VP (TR)', price: 639, category: 'currency', image: 'https://cdn.poehali.dev/projects/ed9aca59-b08a-48f4-a440-fecc0f8e48e8/files/325b93da-4deb-4197-8e4a-a430d263ba7d.jpg' },
    { id: 22, name: 'Telegram Premium 1 месяц', price: 309, category: 'subscription', image: 'https://cdn.poehali.dev/projects/ed9aca59-b08a-48f4-a440-fecc0f8e48e8/files/325b93da-4deb-4197-8e4a-a430d263ba7d.jpg' },
    { id: 23, name: 'Telegram Stars 100', price: 179, category: 'currency', image: 'https://cdn.poehali.dev/projects/ed9aca59-b08a-48f4-a440-fecc0f8e48e8/files/325b93da-4deb-4197-8e4a-a430d263ba7d.jpg' },
    { id: 24, name: 'Telegram Stars 1000', price: 1639, category: 'currency', image: 'https://cdn.poehali.dev/projects/ed9aca59-b08a-48f4-a440-fecc0f8e48e8/files/325b93da-4deb-4197-8e4a-a430d263ba7d.jpg' },
    { id: 25, name: 'GTA V Premium Edition', price: 1199, category: 'game', image: 'https://cdn.poehali.dev/projects/ed9aca59-b08a-48f4-a440-fecc0f8e48e8/files/27ef68be-cc9e-40ff-85b0-74b9ad3812b6.jpg', popular: true },
    { id: 26, name: 'Red Dead Redemption 2', price: 1099, category: 'game', image: 'https://cdn.poehali.dev/projects/ed9aca59-b08a-48f4-a440-fecc0f8e48e8/files/27ef68be-cc9e-40ff-85b0-74b9ad3812b6.jpg' },
    { id: 27, name: 'Metro Exodus Gold Edition', price: 650, category: 'game', image: 'https://cdn.poehali.dev/projects/ed9aca59-b08a-48f4-a440-fecc0f8e48e8/files/27ef68be-cc9e-40ff-85b0-74b9ad3812b6.jpg' },
    { id: 28, name: 'Assassins Creed Valhalla', price: 579, category: 'game', image: 'https://cdn.poehali.dev/projects/ed9aca59-b08a-48f4-a440-fecc0f8e48e8/files/27ef68be-cc9e-40ff-85b0-74b9ad3812b6.jpg' },
    { id: 29, name: 'Hollow Knight: Silksong', price: 799, category: 'game', image: 'https://cdn.poehali.dev/projects/ed9aca59-b08a-48f4-a440-fecc0f8e48e8/files/27ef68be-cc9e-40ff-85b0-74b9ad3812b6.jpg', popular: true },
    { id: 30, name: 'BioShock Remastered', price: 199, category: 'game', image: 'https://cdn.poehali.dev/projects/ed9aca59-b08a-48f4-a440-fecc0f8e48e8/files/27ef68be-cc9e-40ff-85b0-74b9ad3812b6.jpg' },
  ];

  const getFilteredProducts = () => {
    let filtered = [...products];
    
    filtered = filtered.filter(p => {
      const price = p.discount ? p.price * (1 - p.discount / 100) : p.price;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    if (sortBy === 'price-asc') {
      filtered.sort((a, b) => {
        const priceA = a.discount ? a.price * (1 - a.discount / 100) : a.price;
        const priceB = b.discount ? b.price * (1 - b.discount / 100) : b.price;
        return priceA - priceB;
      });
    } else if (sortBy === 'price-desc') {
      filtered.sort((a, b) => {
        const priceA = a.discount ? a.price * (1 - a.discount / 100) : a.price;
        const priceB = b.discount ? b.price * (1 - b.discount / 100) : b.price;
        return priceB - priceA;
      });
    } else if (sortBy === 'popular') {
      filtered.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
    }

    return filtered;
  };

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

  const totalWithCommission = totalPrice * 1.02;

  const handleSberbankPayment = () => {
    if (cart.length === 0) {
      toast.error('Корзина пуста!');
      return;
    }
    setPaymentDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cart={cart}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
        totalPrice={totalPrice}
      />

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

        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between glass-effect p-4 rounded-lg neon-border">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <Icon name="SlidersHorizontal" size={24} className="text-primary" />
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[200px] neon-border">
                <SelectValue placeholder="Сортировка" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">🔥 Популярное</SelectItem>
                <SelectItem value="price-asc">💰 Дешевле</SelectItem>
                <SelectItem value="price-desc">💎 Дороже</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <Label className="text-sm whitespace-nowrap">Цена: {priceRange[0]}₽ - {priceRange[1]}₽</Label>
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={5000}
              min={0}
              step={50}
              className="w-[200px]"
            />
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-12">
          <TabsList className="grid w-full grid-cols-4 mb-8 neon-border">
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
            <TabsTrigger value="subscription" className="text-base">
              <Icon name="Crown" className="mr-2" size={18} />
              Подписки
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
              {getFilteredProducts().filter(p => p.popular).map(product => (
                <ProductCard key={product.id} product={product} addToCart={addToCart} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="currency" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
              {getFilteredProducts().filter(p => p.category === 'currency').map(product => (
                <ProductCard key={product.id} product={product} addToCart={addToCart} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="games" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
              {getFilteredProducts().filter(p => p.category === 'game').map(product => (
                <ProductCard key={product.id} product={product} addToCart={addToCart} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="subscription" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
              {getFilteredProducts().filter(p => p.category === 'subscription' || p.category === 'other').map(product => (
                <ProductCard key={product.id} product={product} addToCart={addToCart} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <section className="mt-16 rounded-2xl neon-border glass-effect p-8">
          <h2 className="text-3xl font-bold mb-6 neon-text text-center">
            <Icon name="CreditCard" className="inline mr-2" size={32} />
            Способы оплаты
          </h2>
          <p className="text-center text-muted-foreground mb-8">
            Принимаем все популярные способы оплаты в России
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="flex flex-col items-center p-6 rounded-lg border-2 border-primary/20 bg-card hover:border-primary/50 transition-all">
              <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-green-500/20">
                <Icon name="Building2" size={32} className="text-green-500" />
              </div>
              <h3 className="text-xl font-bold mb-2 neon-text">Sberbank</h3>
              <p className="text-sm text-muted-foreground text-center mb-2">Моментальный перевод</p>
              <p className="text-xs text-yellow-400 mb-4">Комиссия 2%</p>
              <Button 
                className="w-full neon-border bg-green-500/20 hover:bg-green-500/30 text-green-400"
                onClick={handleSberbankPayment}
              >
                Оплатить
              </Button>
            </div>
            <div className="flex flex-col items-center p-6 rounded-lg border-2 border-primary/20 bg-card hover:border-primary/50 transition-all opacity-60">
              <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-yellow-500/20">
                <Icon name="Landmark" size={32} className="text-yellow-500" />
              </div>
              <h3 className="text-xl font-bold mb-2 neon-text">T-Bank</h3>
              <p className="text-sm text-muted-foreground text-center mb-4">Скоро</p>
              <Button className="w-full" disabled>
                Скоро
              </Button>
            </div>
            <div className="flex flex-col items-center p-6 rounded-lg border-2 border-primary/20 bg-card hover:border-primary/50 transition-all opacity-60">
              <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-blue-500/20">
                <Icon name="Smartphone" size={32} className="text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-2 neon-text">СБП</h3>
              <p className="text-sm text-muted-foreground text-center mb-4">Скоро</p>
              <Button className="w-full" disabled>
                Скоро
              </Button>
            </div>
          </div>
        </section>

        <section className="mt-16 rounded-2xl neon-border glass-effect p-8">
          <h2 className="text-3xl font-bold mb-6 neon-text text-center">
            <Icon name="MessageCircle" className="inline mr-2" size={32} />
            Отзывы клиентов
          </h2>
          <div className="text-center">
            <p className="text-muted-foreground mb-6">
              Все актуальные отзывы можете увидеть здесь:
            </p>
            <Button
              size="lg"
              className="neon-border bg-secondary hover:bg-secondary/80 text-secondary-foreground font-bold"
              onClick={() => window.open('https://t.me/RocketShopRate', '_blank')}
            >
              <Icon name="ExternalLink" className="mr-2" size={20} />
              Telegram - Отзывы
            </Button>
          </div>
        </section>

        <ContactSections
          telegramUsername={telegramUsername}
          setTelegramUsername={setTelegramUsername}
        />
      </main>

      <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
        <DialogContent className="glass-effect border-primary/20">
          <DialogHeader>
            <DialogTitle className="text-2xl neon-text">Оплата через Sberbank</DialogTitle>
            <DialogDescription>
              Переведите указанную сумму на реквизиты ниже
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-4 rounded-lg border border-primary/20 bg-card">
              <h3 className="font-bold text-lg mb-2">Товары в корзине:</h3>
              {cart.map(item => (
                <div key={item.id} className="flex justify-between text-sm py-1">
                  <span>{item.name} x{item.quantity}</span>
                  <span className="text-primary font-bold">
                    {Math.round((item.discount ? item.price * (1 - item.discount / 100) : item.price) * item.quantity)}₽
                  </span>
                </div>
              ))}
            </div>
            <div className="p-4 rounded-lg border-2 border-primary/50 bg-primary/10">
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg">Итого:</span>
                <span className="text-2xl font-bold neon-text">{Math.round(totalWithCommission)}₽</span>
              </div>
              <p className="text-xs text-yellow-400">Включена комиссия 2%</p>
            </div>
            <div className="p-4 rounded-lg border border-green-500/50 bg-green-500/10">
              <h3 className="font-bold text-green-400 mb-2">Реквизиты получателя:</h3>
              <p className="text-sm">
                <strong>СберБанк:</strong> 2202208395853485<br />
                <strong>Получатель:</strong> Никита Владимирович Т.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-blue-500/50 bg-blue-500/10">
              <p className="text-sm text-muted-foreground">
                ⚠️ После оплаты свяжитесь с нами в Telegram @rocketshopsup для подтверждения платежа и получения товара
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

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
              <p className="text-muted-foreground">Telegram: @rocketshopsup</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4 neon-text">Информация</h3>
              <p className="text-muted-foreground">Все покупки официальны</p>
              <p className="text-muted-foreground">Приятных покупок ❤️</p>
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
