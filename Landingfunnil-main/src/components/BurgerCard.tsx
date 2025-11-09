import { Card } from "./ui/card";
import { RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

interface BurgerCardProps {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  value: string;
}

export function BurgerCard({ id, name, description, imageUrl, value }: BurgerCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg hover:shadow-red-900/30 border-2 border-red-900/20 bg-zinc-900/50 hover:border-red-700/40">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="text-red-500">{name}</h3>
          <p className="text-gray-400">{description}</p>
        </div>
        <div className="flex items-center space-x-2 pt-2">
          <RadioGroupItem value={value} id={id} className="border-red-500 text-red-500" />
          <Label htmlFor={id} className="cursor-pointer text-gray-300">
            Seleccionar esta hamburguesa
          </Label>
        </div>
      </div>
    </Card>
  );
}
