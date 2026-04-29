import Link from 'next/link';
import { Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

export function Header() {
  const handleNavClick = (name: string) => {
    toast({
      title: `${name} Page`,
      description: "This section is currently under simulated maintenance.",
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center mx-auto px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary p-2 rounded-lg text-primary-foreground group-hover:scale-110 transition-transform">
            <Stethoscope className="h-6 w-6" />
          </div>
          <span className="text-xl font-bold tracking-tight text-primary font-headline">Clinic Hamani</span>
        </Link>
        <nav className="ml-auto flex items-center gap-2 text-sm font-medium">
          <Link href="/">
            <Button variant="ghost" size="sm" className="hidden md:flex">Directory</Button>
          </Link>
          <Button variant="ghost" size="sm" onClick={() => handleNavClick('About')}>About</Button>
          <Button variant="ghost" size="sm" onClick={() => handleNavClick('Contact')}>Contact</Button>
        </nav>
      </div>
    </header>
  );
}
