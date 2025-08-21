import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

export interface Hostel {
  id: string;
  userId: string;
  name: string;
  address: string;
  city: string;
  country: string;
  createdAt: any;
}

interface HostelCardProps {
  hostel: Hostel;
}

export default function HostelCard({ hostel }: HostelCardProps) {
  return (
    <Card className="overflow-hidden flex flex-col">
      <CardHeader className="p-0">
        <div className="relative aspect-video">
          <Image
            src="https://placehold.co/600x400.png"
            alt={hostel.name}
            fill
            className="object-cover"
            data-ai-hint="hostel room"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-xl font-headline mb-1">{hostel.name}</CardTitle>
        <CardDescription>{hostel.address}</CardDescription>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 mr-1.5" />
          <span>{hostel.city}, {hostel.country}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
