import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { ReactNode } from "react";


type AuthLayoutProps = {
    children: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return <div className="flex flex-col gap-6 w-[80%] mx-auto mt-12">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
         {
            children
         }
          <div className="relative order-2 h-[260px] md:h-auto">
            <Image src="/images/diet-and-nutrition.webp" alt="Nutrition Illustration" fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </CardContent>
      </Card>
    </div>
}
