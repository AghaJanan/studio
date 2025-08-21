'use client';

import { AddHostelDialog } from '@/components/add-hostel-dialog';
import HostelCard, { type Hostel } from '@/components/hostel-card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { getHostelsForUser } from '@/lib/firebase/firestore';
import { PlusCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const { user } = useAuth();
  const [hostels, setHostels] = useState<Hostel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const unsubscribe = getHostelsForUser(user.uid, (hostels) => {
        setHostels(hostels);
        setLoading(false);
      });
      return () => unsubscribe();
    }
  }, [user]);

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold font-headline">Your Hostels</h1>
        <AddHostelDialog />
      </div>

      {loading && <p>Loading hostels...</p>}

      {!loading && hostels.length === 0 && (
        <div className="flex flex-col items-center justify-center text-center py-20 border-2 border-dashed rounded-lg">
          <h2 className="text-2xl font-semibold">No hostels yet!</h2>
          <p className="text-muted-foreground mt-2 mb-4">Get started by adding your first hostel.</p>
          <AddHostelDialog>
             <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Hostel
             </Button>
          </AddHostelDialog>
        </div>
      )}

      {!loading && hostels.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {hostels.map((hostel) => (
            <HostelCard key={hostel.id} hostel={hostel} />
          ))}
        </div>
      )}
    </div>
  );
}
