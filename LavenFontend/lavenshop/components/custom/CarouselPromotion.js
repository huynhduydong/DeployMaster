import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import firstPromo from "@/public/pictures/promotion/firstPromo.jpeg";
import secondPromo from "@/public/pictures/promotion/secondPromo.jpeg";
import thirdPromo from "@/public/pictures/promotion/thirdPromo.jpeg";
import fourthPromo from "@/public/pictures/promotion/fourthPromo.jpeg";
import fifthPromo from "@/public/pictures/promotion/sixthPromo.jpeg";

const CarouselPromotion = ({ imgSrc }) => {
  const imrArr = [firstPromo, secondPromo, thirdPromo, fourthPromo, fifthPromo];
  return (
    <Carousel
      className="w-full"
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent className="">
        {imrArr.map((item, index) => (
          <CarouselItem className="flex basis-1/2 gap-4" key={index}>
            <div className="items-center justify-center">
              <Image src={item} alt="Promotion" className="rounded-sm" />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default CarouselPromotion;