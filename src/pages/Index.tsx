import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import Icon from '@/components/ui/icon';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import ReviewsSection from '@/components/ReviewsSection';
import ContactSections from '@/components/ContactSections';

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

interface Review {
  id: number;
  author: string;
  rating: number;
  text: string;
  date: string;
  avatar?: string;
}

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeTab, setActiveTab] = useState('home');
  const [sortBy, setSortBy] = useState<string>('popular');
  const [priceRange, setPriceRange] = useState<number[]>([0, 3000]);
  const [telegramUsername, setTelegramUsername] = useState('');

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

  const reviews: Review[] = [
    { id: 1, author: 'Александр', rating: 5, text: 'Отличный магазин! Валюта пришла моментально, цены адекватные. Буду заказывать еще!', date: '2 дня назад', avatar: '' },
    { id: 2, author: 'Мария', rating: 5, text: 'Купила Cyberpunk 2077 со скидкой. Ключ активировался сразу. Спасибо!', date: '5 дней назад', avatar: '' },
    { id: 3, author: 'Дмитрий', rating: 4, text: 'Хороший сервис, быстрая доставка. Иногда бывают задержки, но в целом всё отлично.', date: '1 неделю назад', avatar: '' },
    { id: 4, author: 'Елена', rating: 5, text: 'Покупала V-Bucks для сына. Всё пришло быстро, ребенок доволен. Рекомендую!', date: '2 недели назад', avatar: '' },
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
              max={3000}
              min={0}
              step={50}
              className="w-[200px]"
            />
          </div>
        </div>

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
        </Tabs>

        <ReviewsSection reviews={reviews} />

        <ContactSections
          telegramUsername={telegramUsername}
          setTelegramUsername={setTelegramUsername}
        />
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
