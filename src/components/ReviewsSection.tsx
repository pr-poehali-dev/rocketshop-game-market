import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

interface Review {
  id: number;
  author: string;
  rating: number;
  text: string;
  date: string;
  avatar?: string;
}

interface ReviewsSectionProps {
  reviews: Review[];
}

const ReviewsSection = ({ reviews }: ReviewsSectionProps) => {
  return (
    <section className="mt-16 rounded-2xl neon-border glass-effect p-8">
      <h2 className="text-3xl font-bold mb-6 neon-text text-center">
        <Icon name="MessageCircle" className="inline mr-2" size={32} />
        Отзывы клиентов
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {reviews.map(review => (
          <Card key={review.id} className="border-primary/20 glass-effect">
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="neon-border">
                  <AvatarImage src={review.avatar} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {review.author.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-base">{review.author}</CardTitle>
                  <div className="flex items-center gap-1 mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={16}
                        className={i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted'}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">{review.date}</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{review.text}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default ReviewsSection;
