import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import Icon from '@/components/ui/icon';

interface ContactSectionsProps {
  telegramUsername: string;
  setTelegramUsername: (value: string) => void;
}

const ContactSections = ({ telegramUsername, setTelegramUsername }: ContactSectionsProps) => {
  return (
    <>
      <section className="mt-16 rounded-2xl neon-border glass-effect p-8">
        <h2 className="text-3xl font-bold mb-6 neon-text text-center">
          <Icon name="Send" className="inline mr-2" size={32} />
          Быстрая связь через Telegram
        </h2>
        <p className="text-center text-muted-foreground mb-6">
          Оставь свой Telegram и мы свяжемся с тобой для оформления заказа или консультации
        </p>
        <div className="max-w-md mx-auto space-y-4">
          <div className="space-y-2">
            <Label htmlFor="telegram">Твой Telegram</Label>
            <Input
              id="telegram"
              placeholder="@username"
              value={telegramUsername}
              onChange={(e) => setTelegramUsername(e.target.value)}
              className="neon-border"
            />
          </div>
          <Button
            size="lg"
            className="w-full neon-border bg-secondary hover:bg-secondary/80 text-secondary-foreground font-bold"
            onClick={() => {
              if (telegramUsername.trim()) {
                toast.success('✅ Заявка отправлена!', {
                  description: `Скоро свяжемся с тобой: ${telegramUsername}`,
                });
                setTelegramUsername('');
              } else {
                toast.error('Введи Telegram username');
              }
            }}
          >
            <Icon name="Send" className="mr-2" size={20} />
            Отправить заявку
          </Button>
        </div>
      </section>

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
    </>
  );
};

export default ContactSections;
